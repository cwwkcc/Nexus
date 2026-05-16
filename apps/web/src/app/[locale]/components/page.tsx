'use client';

import { useState } from 'react';
import {
  // Typography & Display
  EyebrowLabel,
  InlineHelpText,
  InlineLink,
  // Status & Feedback
  Badge,
  Tag,
  FormErrorMessage,
  ToolTip,
  // Form
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Toggle,
  FormFieldGroup,
  // Actions
  Button,
  // Spinners
  BeatLoader,
  BarLoader,
  ScaleLoader,
} from '@nexus/ui';

// ─── Local helpers ────────────────────────────────────────────────────────────

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="relative mt-4 rounded-sm overflow-hidden"
      style={{ background: 'var(--surface-inverse)' }}
    >
      <button
        onClick={copy}
        className="absolute top-3 right-3 text-xs px-2 py-1 rounded-sm transition-all"
        style={{
          fontFamily: 'var(--font-body)',
          color: copied ? 'var(--color-gold-light)' : 'var(--text-muted)',
          border: '1px solid var(--border-default)',
          background: 'transparent',
          cursor: 'pointer',
          opacity: 0.8,
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre
        className="overflow-x-auto text-sm p-5 leading-relaxed"
        style={{
          color: 'var(--color-gold-pale)',
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SectionTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10">
      <p
        className="text-xs uppercase tracking-widest mb-3"
        style={{
          color: 'var(--color-gold-base)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {label}
      </p>
      <h2
        className="text-4xl mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--text-primary)',
          fontWeight: 500,
        }}
      >
        {title}
      </h2>
      <p
        className="text-base max-w-xl"
        style={{
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>
    </div>
  );
}

function DemoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-widest mb-4"
      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
    >
      {children}
    </p>
  );
}

function DemoCell({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex items-center justify-center w-full rounded-sm p-6"
        style={{
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-light)',
        }}
      >
        {children}
      </div>
      <span
        className="text-xs"
        style={{
          color: 'var(--text-muted)',
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function DemoRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-wrap items-center gap-4 p-6 rounded-sm mb-8"
      style={{
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-light)',
      }}
    >
      {children}
    </div>
  );
}

function ChapterDivider({ title }: { title: string }) {
  return (
    <div className="my-24 flex items-center gap-6">
      <div
        className="flex-1"
        style={{ borderTop: '1px solid var(--border-light)' }}
      />
      <span
        className="text-xs uppercase tracking-widest shrink-0"
        style={{
          color: 'var(--color-gold-base)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {title}
      </span>
      <div
        className="flex-1"
        style={{ borderTop: '1px solid var(--border-light)' }}
      />
    </div>
  );
}

function Divider() {
  return (
    <div
      className="my-16"
      style={{ borderTop: '1px solid var(--border-light)' }}
    />
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ComponentGuidePage() {
  // Button
  const [buttonLoading, setButtonLoading] = useState(false);
  const simulateLoad = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2500);
  };

  // Tag
  const [activeTag, setActiveTag] = useState<string | null>('React');

  // Checkbox / Radio / Toggle
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState('option-a');
  const [toggled, setToggled] = useState(false);

  // Spinner controls
  const [spinnerVariant, setSpinnerVariant] = useState<
    'green' | 'gold' | 'muted'
  >('green');
  const [spinnerSize, setSpinnerSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [spinnerSpeed, setSpinnerSpeed] = useState<'fast' | 'normal' | 'slow'>(
    'normal',
  );

  return (
    <div style={{ background: 'var(--surface-base)', minHeight: '100vh' }}>
      <div className="content-width py-20">
        {/* ── Page Header ───────────────────────────────────────────────────── */}
        <div
          className="mb-20 pb-16"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{
              color: 'var(--color-gold-base)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Nexus Design System
          </p>
          <h1
            className="text-6xl mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              color: 'var(--text-primary)',
            }}
          >
            Component Reference
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.7,
            }}
          >
            Every available prop, variant, and usage pattern for the core UI
            primitives. All components live in{' '}
            <code
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.85em',
                color: 'var(--color-gold-base)',
              }}
            >
              packages/ui/src/components/atoms
            </code>{' '}
            and are exported from{' '}
            <code
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.85em',
                color: 'var(--color-gold-base)',
              }}
            >
              @nexus/ui
            </code>
            .
          </p>
        </div>

        {/* ════════════════════════════════════════════════
            CHAPTER — TYPOGRAPHY
        ════════════════════════════════════════════════ */}
        <ChapterDivider title="Typography" />

        {/* ── EyebrowLabel ──────────────────────────────────────────────────── */}
        <SectionTitle
          label="Typography 01"
          title="EyebrowLabel"
          description="Small uppercase label with wide tracking. Used above headings and section titles to provide category or context labels."
        />

        <DemoLabel>Default</DemoLabel>
        <DemoRow>
          <EyebrowLabel>Design System</EyebrowLabel>
          <EyebrowLabel>Component Reference</EyebrowLabel>
          <EyebrowLabel>Nexus — 2025</EyebrowLabel>
        </DemoRow>

        <DemoLabel>Polymorphic — as legend inside fieldset</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <fieldset className="flex flex-col gap-space-3">
            <EyebrowLabel as="legend">Notification preferences</EyebrowLabel>
            <Checkbox label="Email updates" defaultChecked />
            <Checkbox label="SMS alerts" />
          </fieldset>
        </div>

        <CodeBlock
          code={`<EyebrowLabel>Design System</EyebrowLabel>\n\n// Polymorphic — renders as <legend> inside a fieldset\n<EyebrowLabel as="legend">Notification preferences</EyebrowLabel>`}
        />

        <Divider />

        {/* ── InlineHelpText ────────────────────────────────────────────────── */}
        <SectionTitle
          label="Typography 02"
          title="InlineHelpText"
          description="Small supplemental text used beneath form fields. Supports three tones: default (muted), success, and error."
        />

        <DemoLabel>Tones</DemoLabel>
        <div
          className="flex flex-col gap-space-3 p-6 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <InlineHelpText tone="default">
            Must be at least 8 characters.
          </InlineHelpText>
          <InlineHelpText tone="success">
            Your username is available.
          </InlineHelpText>
          <InlineHelpText tone="error">
            This email is already registered.
          </InlineHelpText>
        </div>

        <CodeBlock
          code={`<InlineHelpText>Must be at least 8 characters.</InlineHelpText>\n<InlineHelpText tone="success">Your username is available.</InlineHelpText>\n<InlineHelpText tone="error">This email is already registered.</InlineHelpText>`}
        />

        <Divider />

        {/* ── InlineLink ────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Typography 03"
          title="InlineLink"
          description="Gold underlined link for use inside body copy. Supports internal Next.js routing and external links with automatic aria annotation."
        />

        <DemoLabel>Internal and external</DemoLabel>
        <DemoRow>
          <InlineLink href="/about">About this project</InlineLink>
          <InlineLink href="https://nextjs.org" external>
            Next.js documentation
          </InlineLink>
        </DemoRow>

        <CodeBlock
          code={`// Internal — uses Next.js <Link>\n<InlineLink href="/about">About this project</InlineLink>\n\n// External — opens in new tab, announces to screen readers\n<InlineLink href="https://nextjs.org" external>\n  Next.js documentation\n</InlineLink>`}
        />

        {/* ════════════════════════════════════════════════
            CHAPTER — STATUS & FEEDBACK
        ════════════════════════════════════════════════ */}
        <ChapterDivider title="Status & Feedback" />

        {/* ── Badge ─────────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Feedback 01"
          title="Badge"
          description="Non-interactive label. Three variants: status (maps a fixed set of states to colour), category (neutral surface), and achievement (gold accent)."
        />

        <DemoLabel>Status variant — all states</DemoLabel>
        <DemoRow>
          <Badge variant="status" status="draft" />
          <Badge variant="status" status="published" />
          <Badge variant="status" status="archived" />
          <Badge variant="status" status="unread" />
          <Badge variant="status" status="reviewed" />
        </DemoRow>

        <DemoLabel>Category and achievement</DemoLabel>
        <DemoRow>
          <Badge variant="category" label="Mathematics" />
          <Badge variant="category" label="Physics" />
          <Badge variant="achievement" label="Top scorer" />
          <Badge variant="achievement" label="Perfect attendance" />
        </DemoRow>

        <CodeBlock
          code={`// Status — label and colour are derived from the status value\n<Badge variant="status" status="draft" />\n<Badge variant="status" status="published" />\n<Badge variant="status" status="unread" />\n\n// Category — neutral surface, custom label\n<Badge variant="category" label="Mathematics" />\n\n// Achievement — gold accent, custom label\n<Badge variant="achievement" label="Top scorer" />`}
        />

        <Divider />

        {/* ── Tag ───────────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Feedback 02"
          title="Tag"
          description="Compact pill for filtering and categorisation. Can be static (no onClick) or interactive. Active state fills with brand green."
        />

        <DemoLabel>Static tags</DemoLabel>
        <DemoRow>
          {['React', 'TypeScript', 'Next.js', 'Tailwind'].map((t) => (
            <Tag key={t} label={t} />
          ))}
        </DemoRow>

        <DemoLabel>Interactive — click to toggle active (try it)</DemoLabel>
        <DemoRow>
          {['React', 'TypeScript', 'Next.js', 'Tailwind'].map((t) => (
            <Tag
              key={t}
              label={t}
              active={activeTag === t}
              onClick={() => setActiveTag(activeTag === t ? null : t)}
            />
          ))}
        </DemoRow>

        <CodeBlock
          code={`// Static\n<Tag label="React" />\n\n// Interactive with active state\n<Tag\n  label="React"\n  active={selected === 'React'}\n  onClick={() => setSelected('React')}\n/>`}
        />

        <Divider />

        {/* ── FormErrorMessage ──────────────────────────────────────────────── */}
        <SectionTitle
          label="Feedback 03"
          title="FormErrorMessage"
          description="Accessible inline message for form validation. Three variants control both colour and ARIA announcement behaviour — error is assertive, warning and success are polite."
        />

        <DemoLabel>All variants</DemoLabel>
        <div
          className="flex flex-col gap-space-3 p-6 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <FormErrorMessage variant="error">
            This field is required.
          </FormErrorMessage>
          <FormErrorMessage variant="warning">
            Password is weak — consider adding symbols.
          </FormErrorMessage>
          <FormErrorMessage variant="success">
            Email verified successfully.
          </FormErrorMessage>
        </div>

        <CodeBlock
          code={`// error — role="alert", assertive. Best for post-submit validation.\n<FormErrorMessage variant="error">This field is required.</FormErrorMessage>\n\n// warning — aria-live="polite". Better for live typing feedback.\n<FormErrorMessage variant="warning">Password is weak.</FormErrorMessage>\n\n// success — aria-live="polite".\n<FormErrorMessage variant="success">Email verified.</FormErrorMessage>`}
        />

        <Divider />

        {/* ── ToolTip ───────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Feedback 04"
          title="ToolTip"
          description="Hover and focus tooltip with a 300ms show delay to avoid accidental triggers. Wraps any child element and injects aria-describedby automatically."
        />

        <DemoLabel>Four positions</DemoLabel>
        <div
          className="grid grid-cols-2 gap-4 p-6 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
            <div key={pos} className="flex items-center justify-center py-8">
              <ToolTip content={`Tooltip on the ${pos}`} position={pos}>
                <Button variant="secondary" size="sm">
                  Hover ({pos})
                </Button>
              </ToolTip>
            </div>
          ))}
        </div>

        <CodeBlock
          code={`<ToolTip content="Saves your progress automatically" position="top">\n  <Button variant="ghost" size="icon" aria-label="Save">\n    <SaveIcon />\n  </Button>\n</ToolTip>`}
        />

        {/* ════════════════════════════════════════════════
            CHAPTER — ACTIONS
        ════════════════════════════════════════════════ */}
        <ChapterDivider title="Actions" />

        {/* ── Button ────────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Actions 01"
          title="Button"
          description="Six variants, four sizes, loading state with optional loading text, full-width mode, and left/right icon slots."
        />

        <DemoLabel>Variants</DemoLabel>
        <DemoRow>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </DemoRow>

        <DemoLabel>Sizes</DemoLabel>
        <DemoRow>
          <Button size="lg">Large</Button>
          <Button size="md">Medium</Button>
          <Button size="sm">Small</Button>
        </DemoRow>

        <DemoLabel>States</DemoLabel>
        <DemoRow>
          <Button disabled>Disabled</Button>
          <Button
            loading={buttonLoading}
            loadingText="Saving…"
            onClick={simulateLoad}
          >
            {buttonLoading ? 'Saving…' : 'Simulate load'}
          </Button>
        </DemoRow>

        <DemoLabel>Full width</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Button fullWidth>Full width button</Button>
        </div>

        <CodeBlock
          code={`<Button variant="primary">Primary</Button>\n<Button variant="destructive" size="sm">Delete</Button>\n<Button loading={isLoading} loadingText="Saving…" onClick={save}>\n  Save changes\n</Button>\n<Button fullWidth>Full width</Button>`}
        />

        {/* ════════════════════════════════════════════════
            CHAPTER — FORM CONTROLS
        ════════════════════════════════════════════════ */}
        <ChapterDivider title="Form Controls" />

        {/* ── Input ─────────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Form 01"
          title="Input"
          description="Text input with label, helper text, error state, required marker, and seven type variants. IDs are auto-generated via useId — never collide when rendered multiple times."
        />

        <DemoLabel>Default with helper text</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8 max-w-sm"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Input
            label="Email address"
            type="email"
            placeholder="name@example.com"
            helperText="We'll never share your email."
          />
        </div>

        <DemoLabel>Required field</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8 max-w-sm"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Input label="Full name" required placeholder="John Doe" />
        </div>

        <DemoLabel>Error state</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8 max-w-sm"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Input
            label="Username"
            defaultValue="usr!"
            error="Username can only contain letters, numbers, and underscores."
          />
        </div>

        <DemoLabel>Disabled</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8 max-w-sm"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Input label="Locked field" defaultValue="Read only value" disabled />
        </div>

        <CodeBlock
          code={`<Input\n  label="Email address"\n  type="email"\n  placeholder="name@example.com"\n  helperText="We'll never share your email."\n/>\n\n<Input label="Username" required />\n\n<Input\n  label="Username"\n  defaultValue="usr!"\n  error="Only letters, numbers, and underscores."\n/>`}
        />

        <Divider />

        {/* ── Textarea ──────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Form 02"
          title="Textarea"
          description="Multi-line text input. Shares the same label, helper text, error, required, and disabled API as Input. Vertically resizable, minimum height 120px."
        />

        <DemoLabel>Default</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8 max-w-lg"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Textarea
            label="Message"
            placeholder="Write your message here…"
            helperText="Maximum 500 characters."
            rows={4}
          />
        </div>

        <DemoLabel>Error state</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8 max-w-lg"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Textarea
            label="Bio"
            defaultValue="x"
            error="Bio must be at least 20 characters."
            rows={3}
          />
        </div>

        <CodeBlock
          code={`<Textarea\n  label="Message"\n  placeholder="Write your message here…"\n  helperText="Maximum 500 characters."\n  rows={4}\n/>\n\n<Textarea\n  label="Bio"\n  error="Bio must be at least 20 characters."\n  required\n/>`}
        />

        <Divider />

        {/* ── Select ────────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Form 03"
          title="Select"
          description="Native select with a custom chevron, appearance-none reset, and the same label/helper/error API as Input and Textarea."
        />

        <DemoLabel>With placeholder and options</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8 max-w-sm"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Select
            label="Subject"
            placeholder="Choose a subject"
            options={[
              { value: 'maths', label: 'Combined Mathematics' },
              { value: 'physics', label: 'Physics' },
              { value: 'ict', label: 'Information Technology' },
            ]}
            helperText="Select the subject this relates to."
          />
        </div>

        <DemoLabel>Error state</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8 max-w-sm"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Select
            label="Grade"
            placeholder="Choose a grade"
            options={[
              { value: '10', label: 'Grade 10' },
              { value: '11', label: 'Grade 11' },
              { value: '12', label: 'Grade 12' },
            ]}
            error="Please select a grade to continue."
          />
        </div>

        <CodeBlock
          code={`<Select\n  label="Subject"\n  placeholder="Choose a subject"\n  options={[\n    { value: 'maths', label: 'Combined Mathematics' },\n    { value: 'physics', label: 'Physics' },\n  ]}\n  helperText="Select the subject this relates to."\n/>`}
        />

        <Divider />

        {/* ── Checkbox ──────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Form 04"
          title="Checkbox"
          description="Custom checkbox using a hidden native input and a peer-driven visual. Supports controlled and uncontrolled modes, disabled state, and an optional description line."
        />

        <DemoLabel>Uncontrolled defaults</DemoLabel>
        <div
          className="flex flex-col gap-space-4 p-6 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Checkbox label="I agree to the terms and conditions" />
          <Checkbox label="Subscribe to newsletter" defaultChecked />
          <Checkbox label="This option is disabled" disabled />
          <Checkbox label="Disabled and pre-checked" disabled defaultChecked />
        </div>

        <DemoLabel>Controlled (click to toggle)</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Checkbox
            label="Receive email notifications"
            description="We'll send you weekly digests and important updates."
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </div>

        <CodeBlock
          code={`// Uncontrolled\n<Checkbox label="I agree to the terms" defaultChecked />\n\n// Controlled\n<Checkbox\n  label="Receive notifications"\n  description="Weekly digests and important updates."\n  checked={checked}\n  onChange={(e) => setChecked(e.target.checked)}\n/>\n\n// Disabled\n<Checkbox label="This option is disabled" disabled />`}
        />

        <Divider />

        {/* ── Radio ─────────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Form 05"
          title="Radio"
          description="Radio button following the same architecture as Checkbox. Group them with a shared name prop. Value is required."
        />

        <DemoLabel>Controlled radio group (click to change)</DemoLabel>
        <div
          className="flex flex-col gap-space-4 p-6 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          {[
            { value: 'option-a', label: 'Option A — Standard access' },
            { value: 'option-b', label: 'Option B — Admin access' },
            { value: 'option-c', label: 'Option C — Read only' },
          ].map(({ value, label }) => (
            <Radio
              key={value}
              name="access-level"
              value={value}
              label={label}
              checked={radio === value}
              onChange={() => setRadio(value)}
            />
          ))}
        </div>

        <DemoLabel>Disabled</DemoLabel>
        <div
          className="flex flex-col gap-space-4 p-6 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Radio
            name="disabled-group"
            value="x"
            label="Unavailable option"
            disabled
          />
        </div>

        <CodeBlock
          code={`const [plan, setPlan] = useState('free');\n\n<Radio\n  name="plan"\n  value="free"\n  label="Free plan"\n  checked={plan === 'free'}\n  onChange={() => setPlan('free')}\n/>\n<Radio\n  name="plan"\n  value="pro"\n  label="Pro plan"\n  checked={plan === 'pro'}\n  onChange={() => setPlan('pro')}\n/>`}
        />

        <Divider />

        {/* ── Toggle ────────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Form 06"
          title="Toggle"
          description="Switch control with an animated thumb. role='switch' ensures screen readers announce on/off rather than checked/unchecked. Same controlled/uncontrolled API as Checkbox."
        />

        <DemoLabel>Controlled (click to toggle)</DemoLabel>
        <div
          className="flex flex-col gap-space-4 p-6 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <Toggle
            label="Enable dark mode"
            checked={toggled}
            onChange={(e) => setToggled(e.target.checked)}
          />
          <Toggle label="Email notifications" defaultChecked />
          <Toggle label="This setting is disabled" disabled />
        </div>

        <CodeBlock
          code={`// Controlled\n<Toggle\n  label="Enable dark mode"\n  checked={enabled}\n  onChange={(e) => setEnabled(e.target.checked)}\n/>\n\n// Uncontrolled\n<Toggle label="Email notifications" defaultChecked />`}
        />

        <Divider />

        {/* ── FormFieldGroup ────────────────────────────────────────────────── */}
        <SectionTitle
          label="Form 07"
          title="FormFieldGroup"
          description="Layout primitive that stacks fields with consistent vertical rhythm. Renders as div by default, or as a native fieldset for grouped controls like radio buttons."
        />

        <DemoLabel>As div — stacked form fields</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8 max-w-sm"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <FormFieldGroup>
            <Input label="First name" placeholder="John" />
            <Input label="Last name" placeholder="Doe" />
            <Input label="Email" type="email" placeholder="john@example.com" />
          </FormFieldGroup>
        </div>

        <DemoLabel>As fieldset — grouped checkboxes with legend</DemoLabel>
        <div
          className="p-6 rounded-sm mb-8 max-w-sm"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <FormFieldGroup as="fieldset" legend="Subjects taught">
            <Checkbox label="Combined Mathematics" defaultChecked />
            <Checkbox label="Physics" defaultChecked />
            <Checkbox label="Chemistry" />
            <Checkbox label="ICT" />
          </FormFieldGroup>
        </div>

        <CodeBlock
          code={`// Default div — for stacking any fields\n<FormFieldGroup>\n  <Input label="First name" />\n  <Input label="Last name" />\n</FormFieldGroup>\n\n// Fieldset with legend — for grouped controls\n<FormFieldGroup as="fieldset" legend="Subjects taught">\n  <Checkbox label="Mathematics" />\n  <Checkbox label="Physics" />\n</FormFieldGroup>`}
        />

        {/* ════════════════════════════════════════════════
            CHAPTER — LOADERS
        ════════════════════════════════════════════════ */}
        <ChapterDivider title="Loaders" />

        {/* Shared live controls */}
        <div
          className="mb-10 p-5 rounded-sm flex flex-wrap gap-6 items-end"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <div className="flex flex-col gap-2">
            <DemoLabel>Variant</DemoLabel>
            <div className="flex gap-2">
              {(['green', 'gold', 'muted'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setSpinnerVariant(v)}
                  className="px-3 py-1 rounded-sm text-xs transition-all"
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    background:
                      spinnerVariant === v
                        ? 'var(--color-gold-base)'
                        : 'var(--surface-deep)',
                    color:
                      spinnerVariant === v
                        ? 'var(--text-inverse)'
                        : 'var(--text-muted)',
                    border: '1px solid var(--border-default)',
                    cursor: 'pointer',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <DemoLabel>Size</DemoLabel>
            <div className="flex gap-2">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpinnerSize(s)}
                  className="px-3 py-1 rounded-sm text-xs transition-all"
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    background:
                      spinnerSize === s
                        ? 'var(--color-gold-base)'
                        : 'var(--surface-deep)',
                    color:
                      spinnerSize === s
                        ? 'var(--text-inverse)'
                        : 'var(--text-muted)',
                    border: '1px solid var(--border-default)',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <DemoLabel>Speed</DemoLabel>
            <div className="flex gap-2">
              {(['fast', 'normal', 'slow'] as const).map((sp) => (
                <button
                  key={sp}
                  onClick={() => setSpinnerSpeed(sp)}
                  className="px-3 py-1 rounded-sm text-xs transition-all"
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    background:
                      spinnerSpeed === sp
                        ? 'var(--color-gold-base)'
                        : 'var(--surface-deep)',
                    color:
                      spinnerSpeed === sp
                        ? 'var(--text-inverse)'
                        : 'var(--text-muted)',
                    border: '1px solid var(--border-default)',
                    cursor: 'pointer',
                  }}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── BeatLoader ────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Loader 01"
          title="BeatLoader"
          description="Three dots that bounce vertically with squash and stretch. Use for inline loading states — inside buttons, next to text, or within small UI regions."
        />

        <DemoLabel>Live preview</DemoLabel>
        <div
          className="flex items-center justify-center p-10 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <BeatLoader
            variant={spinnerVariant}
            size={spinnerSize}
            speed={spinnerSpeed}
          />
        </div>

        <DemoLabel>All variants at md</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='variant="green"'>
            <BeatLoader variant="green" />
          </DemoCell>
          <DemoCell label='variant="gold"'>
            <BeatLoader variant="gold" />
          </DemoCell>
          <DemoCell label='variant="muted"'>
            <BeatLoader variant="muted" />
          </DemoCell>
        </div>

        <CodeBlock
          code={`<BeatLoader variant="green" size="md" speed="normal" />`}
        />

        <Divider />

        {/* ── BarLoader ─────────────────────────────────────────────────────── */}
        <SectionTitle
          label="Loader 02"
          title="BarLoader"
          description="Horizontal shimmer bar. Best for full-width loading states — top of a page, beneath a navigation, or inside a card header."
        />

        <DemoLabel>Live preview</DemoLabel>
        <div
          className="flex items-center justify-center p-10 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <BarLoader
            variant={spinnerVariant}
            size={spinnerSize}
            speed={spinnerSpeed}
          />
        </div>

        <DemoLabel>All variants at md</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='variant="green"'>
            <BarLoader variant="green" />
          </DemoCell>
          <DemoCell label='variant="gold"'>
            <BarLoader variant="gold" />
          </DemoCell>
          <DemoCell label='variant="muted"'>
            <BarLoader variant="muted" />
          </DemoCell>
        </div>

        <CodeBlock
          code={`<BarLoader variant="gold" size="lg" speed="slow" />`}
        />

        <Divider />

        {/* ── ScaleLoader ───────────────────────────────────────────────────── */}
        <SectionTitle
          label="Loader 03"
          title="ScaleLoader"
          description="Five bars that scale vertically in a sine-wave pattern. Best for modal or overlay loading states where a more prominent indicator is needed."
        />

        <DemoLabel>Live preview</DemoLabel>
        <div
          className="flex items-center justify-center p-10 rounded-sm mb-8"
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
          }}
        >
          <ScaleLoader
            variant={spinnerVariant}
            size={spinnerSize}
            speed={spinnerSpeed}
          />
        </div>

        <DemoLabel>All variants at md</DemoLabel>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <DemoCell label='variant="green"'>
            <ScaleLoader variant="green" />
          </DemoCell>
          <DemoCell label='variant="gold"'>
            <ScaleLoader variant="gold" />
          </DemoCell>
          <DemoCell label='variant="muted"'>
            <ScaleLoader variant="muted" />
          </DemoCell>
        </div>

        <CodeBlock
          code={`<ScaleLoader variant="green" size="md" speed="normal" />`}
        />

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <div
          className="mt-24 pt-10 flex items-center justify-between"
          style={{ borderTop: '1px solid var(--border-default)' }}
        >
          <p
            className="text-xs uppercase tracking-widest"
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Nexus Design System — packages/ui
          </p>
          <p
            className="text-xs uppercase tracking-widest"
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {
              Object.keys({
                EyebrowLabel: 1,
                InlineHelpText: 1,
                InlineLink: 1,
                Badge: 1,
                Tag: 1,
                FormErrorMessage: 1,
                ToolTip: 1,
                Button: 1,
                Input: 1,
                Textarea: 1,
                Select: 1,
                Checkbox: 1,
                Radio: 1,
                Toggle: 1,
                FormFieldGroup: 1,
                BeatLoader: 1,
                BarLoader: 1,
                ScaleLoader: 1,
              }).length
            }{' '}
            components documented
          </p>
        </div>
      </div>
    </div>
  );
}
