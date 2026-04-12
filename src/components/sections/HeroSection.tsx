export function HeroSection() {
  return (
    <header className="mb-12 border-b border-border-divider pb-10">
      <p className="paragraph-xs-bold mb-2 tracking-wide text-foreground-brand uppercase">
        Paquicabello
      </p>
      <h1 className="headline-xs sm:headline-sm md:headline-md text-balance text-foreground">
        Your static site starts here
      </h1>
      <p className="paragraph-lg mt-4 max-w-2xl text-pretty text-foreground-tertiary">
        Replace this hero with your design: typography, imagery, and layout live
        in components under{' '}
        <code className="paragraph-xs rounded bg-surface-subtle-1 px-1.5 py-0.5 text-foreground-accent">
          src/components/
        </code>
        .
      </p>
    </header>
  )
}
