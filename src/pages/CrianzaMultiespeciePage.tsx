import { CrianzaMultiespecieMain } from '@/components/crianza/CrianzaMultiespecieMain'
import { FullBleedPage } from '@/components/layout/FullBleedPage'
import { SectionReveal } from '@/components/layout/SectionReveal'

/** Crianza Multiespecie® — Figma node 1142:3030. */
export function CrianzaMultiespeciePage() {
  return (
    <FullBleedPage className="flex flex-col">
      <SectionReveal>
        <CrianzaMultiespecieMain />
      </SectionReveal>
    </FullBleedPage>
  )
}
