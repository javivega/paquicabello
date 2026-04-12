import { BrandButton } from '@/components/ui/button'

const specs = [
  { label: 'Primary · MD · default', node: '71:305', brandVariant: 'primary' as const, brandSize: 'md' as const, presentation: 'interactive' as const },
  { label: 'Secondary · MD · default', node: '288:3181', brandVariant: 'secondary' as const, brandSize: 'md' as const, presentation: 'interactive' as const },
  { label: 'Primary · MD · hover', node: '288:2976', brandVariant: 'primary' as const, brandSize: 'md' as const, presentation: 'hover' as const },
  { label: 'Secondary · MD · hover', node: '288:3188', brandVariant: 'secondary' as const, brandSize: 'md' as const, presentation: 'hover' as const },
  { label: 'Primary · LG · default', node: '71:309', brandVariant: 'primary' as const, brandSize: 'lg' as const, presentation: 'interactive' as const },
  { label: 'Secondary · LG · default', node: '288:3195', brandVariant: 'secondary' as const, brandSize: 'lg' as const, presentation: 'interactive' as const },
  { label: 'Primary · LG · hover', node: '288:2983', brandVariant: 'primary' as const, brandSize: 'lg' as const, presentation: 'hover' as const },
  { label: 'Secondary · LG · hover', node: '288:3202', brandVariant: 'secondary' as const, brandSize: 'lg' as const, presentation: 'hover' as const },
]

export function ButtonShowcase() {
  return (
    <section
      aria-labelledby="buttons-heading"
      className="mt-10 border-t border-border-divider pt-10"
    >
      <h2 id="buttons-heading" className="headline-2xs text-foreground">
        Buttons (Figma)
      </h2>
      <p className="paragraph-md mt-2 text-foreground-secondary">
        Eight frames from the Website file, implemented with the shadcn Base UI{' '}
        <code className="paragraph-xs rounded bg-surface-subtle-0 px-1.5 py-0.5 text-foreground-accent">
          Button
        </code>{' '}
        primitive and design tokens.
      </p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {specs.map((s) => (
          <li
            key={s.node}
            className="flex flex-col gap-3 rounded-xl border border-border-subtle-1 bg-surface-subtle-1 p-4"
          >
            <p className="paragraph-xs-bold text-foreground-brand">{s.label}</p>
            <p className="paragraph-xs text-foreground-tertiary">node {s.node}</p>
            <div className="flex flex-1 flex-col items-start justify-center pt-1">
              <BrandButton
                brandVariant={s.brandVariant}
                brandSize={s.brandSize}
                presentation={s.presentation}
              >
                Button
              </BrandButton>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
