import type { CSSProperties } from 'react'

/** Sets `--section-enter-delay` for `.section-enter` / `.section-enter-photo` / `.section-enter-fade`. */
export function sectionEnterStyle(delayMs: number): CSSProperties {
  return { ['--section-enter-delay' as string]: `${delayMs}ms` }
}
