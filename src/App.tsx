import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/pages/HomePage'

const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const CookiesPolicyPage = lazy(() =>
  import('@/pages/CookiesPolicyPage').then((m) => ({
    default: m.CookiesPolicyPage,
  })),
)
const PrivacyPolicyPage = lazy(() =>
  import('@/pages/PrivacyPolicyPage').then((m) => ({
    default: m.PrivacyPolicyPage,
  })),
)
const ServicesPage = lazy(() =>
  import('@/pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
)
const ServiceSessionExpressPage = lazy(() =>
  import('@/pages/ServiceSessionExpressPage').then((m) => ({
    default: m.ServiceSessionExpressPage,
  })),
)
const ServiceProgram8WeeksPage = lazy(() =>
  import('@/pages/ServiceProgram8WeeksPage').then((m) => ({
    default: m.ServiceProgram8WeeksPage,
  })),
)

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="sobre-mi" element={<AboutPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="politica-de-cookies" element={<CookiesPolicyPage />} />
          <Route
            path="politica-de-privacidad"
            element={<PrivacyPolicyPage />}
          />
          <Route path="servicios" element={<ServicesPage />} />
          <Route
            path="servicios/sesion-expres"
            element={<ServiceSessionExpressPage />}
          />
          <Route
            path="servicios/programa-4-semanas"
            element={<ServiceProgram8WeeksPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  )
}
