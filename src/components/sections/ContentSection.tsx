export function ContentSection() {
  return (
    <section
      aria-labelledby="content-heading"
      className="rounded-xl border border-border-subtle-1 bg-surface-subtle-1 p-6"
    >
      <h2 id="content-heading" className="headline-2xs text-foreground">
        Main content
      </h2>
      <p className="paragraph-md mt-2 text-foreground-secondary">
        Add sections as separate components (for example{' '}
        <code className="paragraph-xs rounded bg-surface-subtle-0 px-1.5 py-0.5 text-foreground-accent">
          ServicesSection.tsx
        </code>
        ,{' '}
        <code className="paragraph-xs rounded bg-surface-subtle-0 px-1.5 py-0.5 text-foreground-accent">
          ContactSection.tsx
        </code>
        ) and compose them in{' '}
        <code className="paragraph-xs rounded bg-surface-subtle-0 px-1.5 py-0.5 text-foreground-accent">
          App.tsx
        </code>
        .
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="paragraph-xs-bold rounded-lg px-4 py-2 text-btn-primary-text transition-colors bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-active"
        >
          Primary
        </button>
        <button
          type="button"
          className="paragraph-xs-bold rounded-lg border px-4 py-2 transition-[color,box-shadow] bg-btn-secondary-bg text-btn-secondary-text border-btn-secondary-border hover:shadow-[0_1px_3px_rgba(28,28,28,0.08)]"
        >
          Secondary
        </button>
      </div>
    </section>
  )
}
