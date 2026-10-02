import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Nav, Footer } from './components/Nav.jsx'
import { DishArtDefs } from './components/DishArt.jsx'
import Home from './pages/Home.jsx'
import Branch from './pages/Branch.jsx'
import Carta from './pages/Carta.jsx'
import NotFound from './pages/NotFound.jsx'

/** Every route change starts at the top, the way a new page would. */
function ScrollReset() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (search) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, search])

  return null
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>

      <div className="room" aria-hidden="true" />
      <DishArtDefs />

      <Nav />

      <main id="main">
        <ScrollReset />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:branchId" element={<Branch />} />
          <Route path="/:branchId/carta" element={<Carta />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}
