import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { branchOrder, getBranch } from '../data/index.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/belgrano', label: 'Belgrano R.' },
  { to: '/caballito', label: 'Caballito' },
]

export function Nav() {
  const [condensed, setCondensed] = useState(false)
  const [open, setOpen] = useState(false)
  const barRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  // The bar shrinks and darkens once you leave the top of the page.
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(
    () => {
      gsap.from('[data-nav-item]', {
        y: -14,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.15,
      })
    },
    { scope: barRef },
  )

  return (
    <header ref={barRef} className={`nav ${condensed ? 'is-condensed' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner shell shell--wide">
        <Link to="/" className="nav__brand" aria-label="The Oldest Public Bar, inicio">
          <img src="/the-oldest-logo.webp" alt="" className="nav__logo" width="112" height="40" />
          <span className="nav__tagline">Public Bar · Bs. As.</span>
        </Link>

        <nav className="nav__links" aria-label="Principal">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              data-nav-item
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          {branchOrder.map((id) => {
            const branch = getBranch(id)
            return (
              <Link key={id} to={`/${id}/carta`} className="btn btn--sm nav__order" data-nav-item>
                Carta {branch.nombre.replace(' R.', '')}
              </Link>
            )
          })}
        </div>

        <button
          type="button"
          className="nav__toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="nav-drawer"
        >
          <span className="sr-only">{open ? 'Cerrar menu' : 'Abrir menu'}</span>
          <span className={`nav__burger ${open ? 'is-x' : ''}`} aria-hidden="true" />
        </button>
      </div>

      <div id="nav-drawer" className="nav__drawer" hidden={!open}>
        <div className="shell">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className="nav__drawer-link">
              {link.label}
            </NavLink>
          ))}
          <span className="nav__drawer-sep" />
          {branchOrder.map((id) => {
            const branch = getBranch(id)
            return (
              <Link key={id} to={`/${id}/carta`} className="nav__drawer-link nav__drawer-link--sub">
                Ver la carta de {branch.nombre}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell shell--wide">
        <div className="footer__top">
          <div className="footer__brand">
            <img src="/the-oldest-logo.webp" alt="The Oldest Public Bar" className="footer__logo" width="180" height="64" />
            <p className="serif-note">
              Donde la historia se junta con la buena barra.
            </p>
            <p className="footer__since tnum">Barra de madera · Rock clasico · Desde 1984</p>
          </div>

          <div className="footer__cols">
            {branchOrder.map((id) => {
              const branch = getBranch(id)
              return (
                <div key={id} className="footer__col">
                  <h3 className="footer__col-title display display--s">{branch.nombre}</h3>
                  <p className="muted">{branch.direccion}</p>
                  <p className="muted tnum">{branch.telefono}</p>
                  <Link to={`/${id}`} className="footer__link link-underline">
                    Ver la sucursal
                  </Link>
                  <Link to={`/${id}/carta`} className="footer__link link-underline">
                    Ver la carta
                  </Link>
                </div>
              )
            })}

            <div className="footer__col">
              <h3 className="footer__col-title display display--s">La Casa</h3>
              <p className="muted">Un clasico pub y restaurante de Buenos Aires que funciona desde la decada de 1980.</p>
              <p className="footer__legal">Los precios son en pesos argentinos y pueden variar sin aviso.</p>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="muted">© {new Date().getFullYear()} The Oldest Public Bar</p>
          <p className="muted">Belgrano R. y Caballito · Buenos Aires</p>
        </div>
      </div>
    </footer>
  )
}
