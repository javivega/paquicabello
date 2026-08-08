import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SiteShell } from '@/components/layout/SiteShell'

export function RootLayout() {
  return (
    <SiteShell header={<Navbar />} footer={<Footer />}>
      <ScrollToTop />
      <Outlet />
    </SiteShell>
  )
}
