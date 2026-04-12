import { Route, Routes } from 'react-router-dom'

import { RootLayout } from './layout/RootLayout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ServiceProgram8WeeksPage } from './pages/ServiceProgram8WeeksPage'
import { ServiceSessionExpressPage } from './pages/ServiceSessionExpressPage'
import { ServicesPage } from './pages/ServicesPage'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="sobre-mi" element={<AboutPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="servicios" element={<ServicesPage />} />
        <Route
          path="servicios/sesion-expres"
          element={<ServiceSessionExpressPage />}
        />
        <Route
          path="servicios/programa-8-semanas"
          element={<ServiceProgram8WeeksPage />}
        />
      </Route>
    </Routes>
  )
}
