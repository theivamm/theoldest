import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { branchCards, getBranch } from '../data/index.js'
import { whatsappLink, mapsLink } from '../lib/format.js'
import { DishArt, PhotoFrame } from '../components/DishArt.jsx'
import { OpenLamp, Ornament, SectionHead, WhatsAppButton, Stamp, ContactLines } from '../components/Bits.jsx'
import { Reveal, Stagger, SplitWords, Parallax, Marquee } from '../components/Motion.jsx'

/* ============================================================================
   Landing
   The first thing you meet is a question: which bar are you going to tonight?
   ========================================================================== */

const PROPUESTA = [
  {
    key: 'Historia',
    title: 'Un local chico en la calle Freire',
    body: 'Sus origenes se remontan a 1984/1985, con un primer local pequeno en el barrio de Belgrano, antes de mudarse y expandirse a Caballito y su ubicacion actual en Belgrano R.',
  },
  {
    key: 'Ambiente',
    title: 'Madera, murales y objetos de coleccion',
    body: 'Decoracion clasica de estilo antiguo con una iconica barra de madera, murales psicodelicos -- destacando a Los Beatles -- y objetos de coleccion aportados por los clientes.',
  },
  {
    key: 'Gastronomia y bebidas',
    title: 'Cocteleria de autor y cerveza tirada',
    body: 'Cocteleria de autor, picadas, hamburguesas como la Fat Cat, platos gourmet y variedad de cervezas tiradas, con pintas entre $ 4.000 y $ 7.000 ARS segun tipo.',
  },
  {
    key: 'Promociones',
    title: 'Lunes de pastas y sabados de Negroni',
    body: 'Lunes de pastas al 50% de descuento en la sucursal Belgrano R, y happy hour en Negroni y Gin & Tonic los sabados hasta las 20:00.',
  },
]

const PROPUESTA_ICON = {
  Historia: 'M34 6h20v14a10 10 0 01-10 10h0a10 10 0 01-10-10z M30 14h28 M30 20h28',
  Ambiente: 'M6 22V8l10-4 10 4v14z M30 22V8l10 4v10z M14 22v-6h4v6 M34 16h3',
  'Gastronomia y bebidas': 'M10 4h8l-4 8v8 M18 4l4 8 M12 20h4v6h-4z M28 8h12l-2 10h-8z M28 8l-1 10',
  Promociones: 'M20 4l2.6 6.4L29 11l-4.6 4 1.4 6.6L20 18.4 14.2 21.6 15.6 15 11 11l6.4-.6z',
}

const OFREZCAS = [
  {
    title: 'Cocteleria de Autor & Clasicos',
    body: 'Desde un Negroni perfecto hasta una imponente seleccion de whiskies y single malts premium para los verdaderos amantes del buen beber.',
    art: { kind: 'copa', name: 'Negroni' },
  },
  {
    title: 'Cerveza Tirada',
    body: 'Las mejores variedades artesanales e internacionales servidas siempre en su punto justo.',
    art: { kind: 'jarra', name: 'Pinta artesanal' },
  },
  {
    title: 'Cocina de Verdad',
    body: 'Platos abundantes, hamburguesas caseras epicas, las mejores picadas de la ciudad y nuestras famosas pastas que te hacen sentir como en casa.',
    art: { kind: 'plato', name: 'Milanesa The Oldest' },
  },
]

const TESTIMONIOS = [
  {
    quote:
      'Los mejores champignones rellenos de Buenos Aires y una atencion que te hace sentir un habite desde la primera noche. Un clasico que nunca falla.',
    who: 'Martin G.',
  },
  {
    quote:
      'La barra de madera, la musica de Los Beatles de fondo y la variedad de whiskies es de otro planeta. Ir a The Oldest es un viaje de ida.',
    who: 'Laura S.',
  },
]

export default function Home() {
  const heroRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-hero-bg]', { scale: 1.12, opacity: 0, duration: 1.5, ease: 'power2.out' })
        .from('[data-hero-logo]', { y: 30, opacity: 0, duration: 0.9 }, 0.2)
        .from('[data-hero-rule]', { scaleX: 0, duration: 0.9, transformOrigin: 'left' }, 0.35)
        .from('[data-hero-eyebrow]', { y: 16, opacity: 0, duration: 0.6 }, 0.4)
        .from('[data-hero-title]', { y: 46, opacity: 0, duration: 1 }, 0.5)
        .from('[data-hero-copy]', { y: 20, opacity: 0, duration: 0.8 }, 0.72)
        .from('[data-hero-card]', { y: 44, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.85)
        .from('[data-hero-stamp]', { scale: 0.7, opacity: 0, rotate: 26, duration: 0.9 }, 1.15)
    },
    { scope: heroRef },
  )

  return (
    <>
      {/* ==================================================== hero */}
      <section className="hero" ref={heroRef}>
        <div className="hero__bg" data-hero-bg aria-hidden="true">
          <Parallax amount={90}>
            <PhotoFrame label="La barra, de noche" caption="Espacio reservado para la foto del salon" ratio="16 / 10" />
          </Parallax>
        </div>
        <div className="hero__scrim" aria-hidden="true" />

        <div className="shell shell--wide hero__inner">
          <p className="hero__eyebrow" data-hero-eyebrow>
            Belgrano R. y Caballito · Buenos Aires
          </p>

          <img
            src="/the-oldest-logo.webp"
            alt="The Oldest Public Bar"
            className="hero__logo"
            data-hero-logo
            width="420"
            height="150"
          />

          <span className="hero__rule" data-hero-rule aria-hidden="true" />

          <h1 className="hero__title display display--xl">
            <SplitWords text="Elegi tu sucursal" delay={0.6} className="hero__title-line" />
            <SplitWords text="mas cercana" delay={0.78} className="hero__title-line" />
          </h1>

          <p className="hero__copy" data-hero-copy>
            The Oldest Public Bar es un clasico pub y restaurante de Buenos Aires que funciona desde la decada de
            1980. Elija el salon y le abrimos la carta completa: platos, tragos y la barra de siempre.
          </p>

          {/* -------------------------------------------- the gate */}
          <div className="gate">
            {branchCards.map((branch) => {
              const full = getBranch(branch.id)
              return (
                <article className="gate__card" data-hero-card key={branch.id}>
                  <Link to={`/${branch.id}`} className="gate__link">
                    <div className="gate__frame">
                      <DishArt kind="plato" name={`${branch.nombre} salon`} className="gate__art" />
                      <span className="gate__flag">{branch.lema}</span>
                    </div>

                    <div className="gate__body">
                      <h2 className="gate__name display display--m">{branch.nombre}</h2>
                      <p className="gate__addr">{branch.direccion}</p>
                      <OpenLamp hours={full.horarios} className="gate__lamp" />
                      <p className="gate__meta">
                        <span className="tnum">{branch.totalItems}</span> platos y tragos en la carta
                      </p>
                      <span className="gate__cta">
                        Entrar a {branch.nombre}
                        <span className="btn__arrow" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>

          <div className="hero__actions" data-hero-copy>
            <Link to="/belgrano/carta" className="btn btn--brass btn--lg">
              Hacé tu pedido ahora
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a
              className="btn btn--lg"
              href={whatsappLink(
                getBranch('belgrano').whatsapp,
                'Hola The Oldest! Quiero consultar por un pedido.',
              )}
              target="_blank"
              rel="noreferrer noopener"
            >
              Contactanos por WhatsApp
            </a>
          </div>

          <div className="hero__stamp" data-hero-stamp>
            <Stamp />
          </div>
        </div>
      </section>

      <Marquee
        items={[
          'Cerveza tirada',
          'Cocteleria de autor',
          'Hamburguesas gourmet',
          'Picadas para compartir',
          'Pastas de la casa',
          'Whiskies y single malts',
          'Postres caseros',
          'Happy hour',
        ]}
      />

      {/* ==================================================== propuesta */}
      <section className="band">
        <div className="shell">
          <SectionHead
            kicker="Caracteristicas y propuesta"
            title="Un clasico que empezo en una calle de Belgrano"
            lede="Cuatro cosas que definen lo que somos. Si las conoces de nombre, ya sabes que welcome you're in."
          />

          <Stagger className="propuesta">
            {PROPUESTA.map((entry) => (
              <article className="propuesta__card" key={entry.key}>
                <span className="propuesta__icon" aria-hidden="true">
                  <svg viewBox="0 0 40 40">
                    <path d={PROPUESTA_ICON[entry.key]} />
                  </svg>
                </span>
                <p className="propuesta__key">{entry.key}</p>
                <h3 className="propuesta__title display display--s">{entry.title}</h3>
                <p className="propuesta__body">{entry.body}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ==================================================== sabor */}
      <section className="band band--panelled">
        <div className="shell">
          <Reveal className="sabor__head">
            <p className="kicker kicker--center">El sabor de lo autentico</p>
            <h2 className="display display--l sabor__title">
              No somos solo un bar, somos una tradicion entre copas
            </h2>
            <p className="lede sabor__lede">
              En The Oldest combinamos un ambiente calido de madera y rock clasico con una propuesta gastronomica que te
              va a enamorar.
            </p>
          </Reveal>

          <Stagger className="ofrezcas">
            {OFREZCAS.map((entry) => (
              <article className="ofrezca" key={entry.title}>
                <DishArt kind={entry.art.kind} name={entry.art.name} className="ofrezca__art" showLabel />
                <h3 className="display display--s ofrezca__title">{entry.title}</h3>
                <p className="ofrezca__body">{entry.body}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ==================================================== sucursales */}
      <section className="band">
        <div className="shell">
          <SectionHead
            kicker="Donde la historia se junta con la buena barra"
            title="Encontranos en tu barrio favorito"
            lede="Te esperamos todas las noches para cortar la semana, festejar con amigos o disfrutar de una cita inolvidable."
          />

          <Stagger className="locs">
            {branchCards.map((branch) => {
              const full = getBranch(branch.id)
              return (
                <article className="loc" key={branch.id}>
                  <header className="loc__head">
                    <h3 className="display display--m loc__name">{branch.nombre}</h3>
                    <OpenLamp hours={full.horarios} />
                  </header>

                  <p className="serif-note loc__addr">{branch.direccion}</p>

                  <p className="muted loc__hours">{branch.horarioTexto}</p>

                  <div className="loc__cats">
                    {branch.categorias.map((category) => (
                      <Link
                        key={category.id}
                        to={`/${branch.id}/carta?seccion=${category.id}`}
                        className="loc__cat link-underline"
                      >
                        {category.name}
                        <span className="tnum">{category.count}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="loc__actions">
                    <Link to={`/${branch.id}/carta`} className="btn btn--sm">
                      Ver la carta
                    </Link>
                    <WhatsAppButton branch={full} label="WhatsApp" small />
                    <a
                      className="btn btn--sm btn--ghost"
                      href={mapsLink(branch.maps)}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Como llegar
                    </a>
                  </div>
                </article>
              )
            })}
          </Stagger>
        </div>
      </section>

      {/* ==================================================== testimonios */}
      <section className="band band--panelled">
        <div className="shell">
          <SectionHead kicker="Lo que dicen nuestros amigos" title="Un clasico que nunca falla" center />

          <Stagger className="quotes">
            {TESTIMONIOS.map((entry) => (
              <figure className="quote" key={entry.who}>
                <blockquote className="quote__text serif-note">“{entry.quote}”</blockquote>
                <figcaption className="quote__who">
                  <span className="quote__dash" aria-hidden="true" />
                  {entry.who}
                </figcaption>
              </figure>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ==================================================== cta */}
      <section className="band cta-band">
        <div className="shell">
          <Reveal className="cta">
            <Ornament>Reservas y pedidos</Ornament>
            <h2 className="display display--l cta__title">Estas listo para vivir la experiencia?</h2>
            <p className="lede cta__lede">
              Veni a disfrutar de nuestro Happy Hour, nuestras noches de promos y la mejor musica.
            </p>

            <div className="cta__actions">
              <Link to="/belgrano/carta" className="btn btn--brass btn--lg">
                Hacé tu pedido ahora
              </Link>
              <a
                className="btn btn--lg"
                href={whatsappLink(getBranch('belgrano').whatsapp, 'Hola The Oldest! Quiero reservar una mesa.')}
                target="_blank"
                rel="noreferrer noopener"
              >
                Reservá tu mesa
              </a>
            </div>

            <div className="cta__contacts">
              {branchCards.map((branch) => (
                <div key={branch.id} className="cta__contact">
                  <p className="cta__contact-name display display--s">{branch.nombre}</p>
                  <ContactLines branch={getBranch(branch.id)} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
