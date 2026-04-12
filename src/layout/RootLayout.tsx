import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { SiteShell } from '@/components/layout/SiteShell'
import { ScrollToTop } from '@/layout/ScrollToTop'

export function RootLayout() {
  return (
    <SiteShell header={<Navbar />} footer={<Footer />}>
      <ScrollToTop />
      <Outlet />
    </SiteShell>
  )
}
