import { BrandButton } from '@/components/ui/button'

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
        <BrandButton brandVariant="primary" brandSize="md" type="button">
          Primary
        </BrandButton>
        <BrandButton brandVariant="secondary" brandSize="md" type="button">
          Secondary
        </BrandButton>
      </div>
    </section>
  )
}
