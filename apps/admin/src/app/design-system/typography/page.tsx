export default function TypographyPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-4">Typography</h2>
      <div className="space-y-12">
        {/* Headings */}
        <div>
          <h3 className="font-display text-h3 border-b border-border-light pb-2 mb-6">
            Headings
          </h3>
          <div className="space-y-4">
            <h1 className="text-h1">
              Heading 1 – The quick brown fox jumps over the lazy dog
            </h1>
            <h2 className="text-h2">
              Heading 2 – The quick brown fox jumps over the lazy dog
            </h2>
            <h3 className="text-h3">
              Heading 3 – The quick brown fox jumps over the lazy dog
            </h3>
            <h4 className="text-h4">Heading 4 – The quick brown fox jumps</h4>
            <h5 className="text-h5">Heading 5 – The quick brown fox</h5>
            <h6 className="text-h6">Heading 6 – Quick brown fox</h6>
          </div>
        </div>

        {/* Body text */}
        <div>
          <h3 className="font-display text-h3 border-b border-border-light pb-2 mb-6">
            Body
          </h3>
          <div className="space-y-2">
            <p className="text-body">
              Body – The school was founded in 1873 as Sri Lanka’s first Central
              College. Dr. C.W.W. Kannangara’s vision changed the nation.
            </p>
            <p className="text-body-sm text-text-muted">
              Body small – Used for secondary text, card descriptions, and
              metadata.
            </p>
            <p className="text-caption uppercase tracking-caption">
              Caption – Fine print, timestamps, and legal notes.
            </p>
            <p className="text-label uppercase tracking-label">
              Label – Button text, form labels, and tab titles.
            </p>
          </div>
        </div>

        {/* Font families */}
        <div>
          <h3 className="font-display text-h3 border-b border-border-light pb-2 mb-6">
            Font Families
          </h3>
          <div className="space-y-2">
            <p className="font-display">
              Display – Cormorant Garamond (headings, hero text)
            </p>
            <p className="font-body">Body – Inter (UI elements, paragraphs)</p>
            <p className="font-mono">Mono – IBM Plex Mono (code blocks)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
