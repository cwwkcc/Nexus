'use client';

// apps/admin/src/features/media/UploadZone.tsx
//
// Drag-and-drop upload zone — wraps @nexus/ui's FileUploadZone (a generic
// file-picker primitive with no upload logic of its own) with the actual
// two-step presigned-upload flow (F-067, fixing the stale F-101/F-116
// comment references the stub had — the real feature IDs are F-067
// "Media Upload Router" and F-115 "Image Optimisation Pipeline"):
//
//   1. requestMediaUpload  — server action, returns a presigned PUT URL.
//   2. XHR PUT             — straight from this browser to R2. Plain
//                            `fetch()` can't report upload progress; XHR's
//                            `upload.onprogress` can, which matters for
//                            anything beyond a tiny image.
//   3. confirmMediaUpload  — server action; server downloads (images only),
//                            runs Sharp, and registers the MediaAsset.
//
// FileUploadZone manages its own file-selection state internally and has
// no controlled `value`/reset prop, so this component tracks upload
// progress in its own state keyed by a synthetic id (not the File object,
// which isn't guaranteed to survive a fast-refresh/dev remount cleanly) and
// remounts FileUploadZone via a bumped `key` once a batch finishes, which
// is the standard way to reset an otherwise-uncontrolled child.

import { DEFAULT_UPLOAD_LIMIT } from '@nexus/contracts';
import { Button, FileUploadZone, ProgressIndicator } from '@nexus/ui';
import { useState } from 'react';

import { confirmMediaUpload, requestMediaUpload } from '../../app/media/actions.js';
import { folderForMimeType, type AdminMediaAsset, type MediaFolder } from '../../lib/media.js';

type UploadStatus = 'uploading' | 'processing' | 'done' | 'error';

interface UploadTask {
  id: string;
  fileName: string;
  status: UploadStatus;
  progress: number;
  error?: string;
}

/** Promisified XHR PUT with real upload progress — fetch() doesn't expose this. */
function putWithProgress(url: string, file: File, onProgress: (pct: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed (HTTP ${xhr.status}).`));
      }
    };
    xhr.onerror = () => reject(new Error('Upload failed — check your connection and try again.'));
    xhr.send(file);
  });
}

const ACCEPT_BY_FOLDER: Record<MediaFolder, string> = {
  images: 'image/*',
  avatars: 'image/*',
  documents: 'application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip',
  media: 'video/*,audio/*',
};

interface UploadZoneProps {
  /** Target folder for every file in this zone. When omitted, each file's folder is inferred from its own mime type (used by the Media Library's general-purpose upload tab, which isn't scoped to one folder). */
  folder?: MediaFolder;
  multiple?: boolean;
  onUploaded: (asset: AdminMediaAsset) => void;
  label?: string;
}

export function UploadZone({ folder, multiple = true, onUploaded, label = 'Upload files' }: UploadZoneProps) {
  const [tasks, setTasks] = useState<UploadTask[]>([]);
  const [resetKey, setResetKey] = useState(0);

  const updateTask = (id: string, patch: Partial<UploadTask>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...patch } : task)));
  };

  const uploadOne = async (file: File) => {
    const id = crypto.randomUUID();
    const targetFolder = folder ?? folderForMimeType(file.type);

    setTasks((prev) => [...prev, { id, fileName: file.name, status: 'uploading', progress: 0 }]);

    const requested = await requestMediaUpload({ fileName: file.name, fileType: file.type, fileSize: file.size, folder: targetFolder });
    if (!requested.ok) {
      updateTask(id, { status: 'error', error: requested.error });
      return;
    }

    try {
      await putWithProgress(requested.data.uploadUrl, file, (pct) => updateTask(id, { progress: Math.min(pct, 90) }));
    } catch (err) {
      updateTask(id, { status: 'error', error: err instanceof Error ? err.message : 'Upload failed.' });
      return;
    }

    updateTask(id, { status: 'processing', progress: 95 });

    const confirmed = await confirmMediaUpload({
      stagingKey: requested.data.stagingKey,
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      folder: targetFolder,
    });

    if (!confirmed.ok) {
      updateTask(id, { status: 'error', error: confirmed.error });
      return;
    }

    updateTask(id, { status: 'done', progress: 100 });
    onUploaded(confirmed.data);
  };

  const handleFilesChange = (files: File[]) => {
    // FileUploadZone's onChange fires with the *full* accumulated
    // selection each time (see its own source), not just newly-added
    // files — a fresh batch always starts from an empty `tasks`, so every
    // file here is genuinely new for that batch.
    for (const file of files) {
      void uploadOne(file);
    }
  };

  const accept = folder ? ACCEPT_BY_FOLDER[folder] : undefined;
  const allDone = tasks.length > 0 && tasks.every((task) => task.status === 'done' || task.status === 'error');

  return (
    <div className="flex flex-col gap-space-4">
      <FileUploadZone key={resetKey} label={label} accept={accept} multiple={multiple} maxSizeMb={DEFAULT_UPLOAD_LIMIT / (1024 * 1024)} onChange={handleFilesChange} hint={folder ? undefined : 'Images, documents, audio, and video are all accepted.'} />

      {tasks.length > 0 && (
        <div className="flex flex-col gap-space-3 rounded-md border border-border-default bg-surface-default p-space-4">
          <ul className="flex flex-col gap-space-3">
            {tasks.map((task) => (
              <li key={task.id} className="flex flex-col gap-space-1.5">
                <div className="flex items-center justify-between gap-space-3">
                  <span className="truncate font-body text-body-sm text-text-primary">{task.fileName}</span>
                  <span className="font-body text-caption uppercase tracking-caption text-text-muted">{task.status === 'error' ? 'Failed' : task.status === 'done' ? 'Done' : task.status === 'processing' ? 'Processing…' : 'Uploading…'}</span>
                </div>
                {task.status === 'error' ? <p className="font-body text-caption text-semantic-error-base">{task.error}</p> : <ProgressIndicator variant="bar" value={task.progress} showPercentage={false} barAriaLabel={`Upload progress for ${task.fileName}`} />}
              </li>
            ))}
          </ul>

          {allDone && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTasks([]);
                setResetKey((key) => key + 1);
              }}
            >
              Clear
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
