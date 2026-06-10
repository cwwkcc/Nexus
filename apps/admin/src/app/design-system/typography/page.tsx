export default function TypographyPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Typography</h2>

      <div className="space-y-space-12">
        {/* Display + Headings */}
        <div>
          <h3 className="font-display text-h3 border-b border-border-light pb-space-2 mb-space-6">
            Headings
          </h3>
          <div className="space-y-space-4">
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                display
              </p>
              <p className="font-display text-display">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                h1
              </p>
              <h1 className="font-display text-h1">
                Heading 1 – The quick brown fox jumps over the lazy dog
              </h1>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                h2
              </p>
              <h2 className="font-display text-h2">
                Heading 2 – The quick brown fox jumps over the lazy dog
              </h2>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                h3
              </p>
              <h3 className="font-display text-h3">
                Heading 3 – The quick brown fox jumps over the lazy dog
              </h3>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                h4
              </p>
              <h4 className="font-display text-h4">
                Heading 4 – The quick brown fox jumps
              </h4>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                h5
              </p>
              <h5 className="font-display text-h5">
                Heading 5 – The quick brown fox
              </h5>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                h6
              </p>
              <h6 className="font-display text-h6">
                Heading 6 – Quick brown fox
              </h6>
            </div>
          </div>
        </div>

        {/* Body text */}
        <div>
          <h3 className="font-display text-h3 border-b border-border-light pb-space-2 mb-space-6">
            Body
          </h3>
          <div className="space-y-space-4">
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                body
              </p>
              <p className="font-body text-body">
                The school was founded in 1873 as Sri Lanka's first Central
                College. Dr. C.W.W. Kannangara's vision changed the nation.
              </p>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                body-sm
              </p>
              <p className="font-body text-body-sm text-text-muted">
                Body small – Used for secondary text, card descriptions, and
                metadata.
              </p>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                pullquote
              </p>
              <blockquote className="font-display text-pullquote">
                "Education is the great equaliser; it is the force that brings
                all people to a common platform."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Small-scale tokens */}
        <div>
          <h3 className="font-display text-h3 border-b border-border-light pb-space-2 mb-space-6">
            Labels &amp; Captions
          </h3>
          <div className="space-y-space-4">
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                eyebrow
              </p>
              <p className="font-body text-eyebrow tracking-extended">
                Eyebrow – Section headers, category labels
              </p>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                label
              </p>
              <p className="font-body text-label tracking-label">
                Label – Button text, form labels, tab titles
              </p>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                caption
              </p>
              <p className="font-body text-caption tracking-caption">
                Caption – Fine print, timestamps, and legal notes
              </p>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                code
              </p>
              <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">
                const platform = 'nexus';
              </code>
            </div>
          </div>
        </div>

        {/* Font families */}
        <div>
          <h3 className="font-display text-h3 border-b border-border-light pb-space-2 mb-space-6">
            Font Families
          </h3>
          <div className="space-y-space-4">
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                display
              </p>
              <p className="font-display text-h4">
                Cormorant Garamond – headings, hero text, pull quotes
              </p>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                quote
              </p>
              <p className="font-quote text-h4">
                Cormorant Upright – pull quotes, testimonials
              </p>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                body
              </p>
              <p className="font-body text-body">
                Inter – UI elements, body text, navigation, forms
              </p>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                mono
              </p>
              <p className="font-mono text-body">
                IBM Plex Mono – code blocks, token values, timestamps
              </p>
            </div>
          </div>
        </div>

        {/* Sinhala */}
        <div>
          <h3 className="font-display text-h3 border-b border-border-light pb-space-2 mb-space-6">
            Sinhala
          </h3>
          <div className="space-y-space-4">
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                sinhala-display
              </p>
              <p className="font-sinhala-display text-sinhala-h1 mb-space-10">
                මුහුදු මංකොල්ලකරුවන් පිළිබඳ සාමාන්‍ය ඉතිහාසය
              </p>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted tracking-extended">
                sinhala-h2
              </p>
              <p className="font-sinhala-display text-sinhala-h2 mb-space-1">
                චරිතාපදාන ද්වාරය
              </p>
            </div>
            <div>
              <p className="font-body text-eyebrow text-text-muted mb-space-1 tracking-extended">
                sinhala-body
              </p>
              <p className="font-sinhala-body text-sinhala-body">
                චරිතාපදානයක් යනු, යමෙකුගේ ජීවිතය පිළිබඳ සවිස්තරාත්මක සටහනක් හෝ
                විස්තරයක් හෝ වෙයි. ප්‍රධාන තතු (අධ්‍යාපනය, කර්මාන්ත, සබැඳියාවන්
                සහ, මරණය) ලැයිස්තුවකට වඩා වැඩිමනත් තොරතුරු සපයන චරිතාපදානයක්
                විසින්, මෙම සිද්ධීන් තුල පරික්ෂ්‍යමානයාගේ පළපුරුද්ද විදහා
                දක්වයි.
              </p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
