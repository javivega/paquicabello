import { SiteShell } from './components/layout/SiteShell'
import { ContentSection } from './components/sections/ContentSection'
import { HeroSection } from './components/sections/HeroSection'

function App() {
  return (
    <SiteShell>
      <HeroSection />
      <ContentSection />
    </SiteShell>
  )
}

export default App
