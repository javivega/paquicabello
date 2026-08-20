import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { DocumentMeta } from '@/components/layout/DocumentMeta'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SiteShell } from '@/components/layout/SiteShell'
import { SmoothScroll } from '@/components/layout/SmoothScroll'

export function RootLayout() {
  return (
    <SmoothScroll>
      <SiteShell header={<Navbar />} footer={<Footer />}>
        <DocumentMeta />
        <ScrollToTop />
        <Outlet />
      </SiteShell>
    </SmoothScroll>
  )
}
