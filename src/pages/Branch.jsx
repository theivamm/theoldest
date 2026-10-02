import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { getBranch, getFlatItems } from '../data/index.js'
import { mapsLink, whatsappLink } from '../lib/format.js'
import { DishArt, PhotoFrame } from '../components/DishArt.jsx'
import {
  ContactLines,
  OpenLamp,
  Ornament,
  PromoRow,
  ScheduleTable,
  SectionHead,
  Stamp,
  WhatsAppButton,
} from '../components/Bits.jsx'
import { Reveal, Stagger, SplitWords, Parallax, Marquee, Counter } from '../components/Motion.jsx'
import { MenuEjecutivo } from '../components/MenuEjecutivo.jsx'
import { MenuItemCard } from '../components/Menu.jsx'

export default function Branch() {
  const { branchId } = useParams()
  const branch = getBranch(branchId)
  const heroRef = useRef(null)

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-branch-bg]', { scale: 1.1, opacity: 0, duration: 1.3 })
        .from('[data-branch-eyebrow]', { y: 14, opacity: 0, duration: 0.6 }, 0.15)
        .from('[data-branch-title]', { y: 40, opacity: 0, duration: 0.9 }, 0.25)
        .from('[data-branch-addr]', { y: 18, opacity: 0, duration: 0.7 }, 0.42)
        .from('[data-branch-actions]', { y: 18, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.55)
    },
    { scope: heroRef, dependencies: [branchId] },
  )

  if (!branch) return <Navigate to="/" replace />

  const items = getFlatItems(branch.id)
  const favoritos = items.filter((item) => item.favorite).slice(0, 6)
  const heroKinds = branch.id === 'belgrano' ? 'botella' : 'copa'

  return (
    <>
      {/* ==================================================== hero */}
      <section className="branch-hero" ref={heroRef}>
        <div className="branch-hero__bg" data-branch-bg aria-hidden="true">
          <Parallax amount={80}>
            <PhotoFrame
              label={`${branch.nombre}: ${branch.direccion}`}
              caption="Espacio reservado para la foto de la sucursal"
              ratio="21 / 9"
              tone="bar"
            />
          </Parallax>
        </div>
        <div className="hero__scrim" aria-hidden="true" />

        <div className="shell branch-hero__inner">
          <p className="hero__eyebrow" data-branch-eyebrow>
            Sucursal {branch.lema} · {branch.barrioFull}
          </p>

          <h1 className="display display--xl branch-hero__title" data-branch-title>
            <SplitWords text={branch.nombre} className="hero__title-line" />
          </h1>

          <p className="branch-hero__addr serif-note" data-branch-addr>
            {branch.direccion}
          </p>

          <div className="branch-hero__actions" data-branch-actions>
            <Link to={`/${branch.id}/carta`} className="btn btn--brass btn--lg">
              Ver la carta
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a
              className="btn btn--lg"
              href={whatsappLink(branch.whatsapp, branch.whatsappTexto)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Hacé tu pedido ahora
            </a>
          </div>

          <div className="branch-hero__status" data-branch-actions>
            <OpenLamp hours={branch.horarios} />
            <span className="branch-hero__send">
              {branch.envio.titulo} · {branch.envio.detalle}
            </span>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          branch.horarioTexto,
          `${branch.totalItems} platos y tragos`,
          ...branch.categorias.map((category) => category.name),
        ]}
        speed={28}
      />

      {/* ==================================================== promos */}
      <section className="band band--tight">
        <div className="shell">
          <p className="kicker">Promos destacadas</p>
          <Reveal>
            <PromoRow promos={branch.promos} />
          </Reveal>
        </div>
      </section>

      {/* ==================================================== menu ejecutivo */}
      {branch.menuEjecutivo ? (
        <section className="band band--panelled">
          <div className="shell">
            <SectionHead
              kicker="Almuerzo, de lunes a viernes"
              title={branch.menuEjecutivo.titulo}
              lede="Tres menus con bebida y postre. Cambia todos los dias: elige el dia y mira que hay."
            />
            <Reveal>
              <MenuEjecutivo
                menu={branch.menuEjecutivo}
                whatsappHref={whatsappLink(
                  branch.whatsapp,
                  `Hola The Oldest! Quiero el menu ejecutivo de Belgrano R.`,
                )}
              />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ==================================================== carta resumida */}
      <section className="band">
        <div className="shell">
          <SectionHead
            kicker="Lo que no podes dejar de mirar"
            title="Favoritos de la barra"
            lede="Una seleccion corta de lo que mas se pide. La carta completa tiene mucho mas."
          />

          <Stagger className="dish-grid dish-grid--featured">
            {favoritos.map((item) => (
              <MenuItemCard
                key={item.key}
                item={{ ...item, tags: item.tags.filter((tag) => tag !== 'favorito') }}
                categoryName={branch.nombre}
                showCategory
              />
            ))}
          </Stagger>

          <div className="band__foot">
            <Link to={`/${branch.id}/carta`} className="btn btn--brass btn--lg">
              Ver los {branch.totalItems} platos y tragos
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================== secciones */}
      <section className="band band--panelled">
        <div className="shell">
          <SectionHead kicker="La carta" title="Elegi por donde empezar" />
          <Stagger className="cat-grid">
            {branch.categorias.map((category) => (
              <Link
                key={category.id}
                to={`/${branch.id}/carta?seccion=${category.id}`}
                className="cat-card"
              >
                <DishArt
                  kind={category.tipo === 'bebida' ? heroKinds : 'plato'}
                  name={category.nombre}
                  className="cat-card__art"
                />
                <div className="cat-card__body">
                  <h3 className="display display--s cat-card__name">{category.nombre}</h3>
                  {category.blurb ? <p className="muted cat-card__blurb">{category.blurb}</p> : null}
                  <p className="cat-card__count tnum">{category.total} items</p>
                </div>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ==================================================== visitanos */}
      <section className="band">
        <div className="shell">
          <SectionHead kicker="Ven a vernos" title={`${branch.nombre}: como pasar la noche`} />

          <div className="visit">
            <Reveal className="visit__col">
              <h3 className="visit__title display display--s">Horario de atencion al publico</h3>
              <OpenLamp hours={branch.horarios} />
              <ScheduleTable hours={branch.horarios} />

              <div className="visit__block">
                <h4 className="visit__block-title">Pedidos a domicilio</h4>
                <p className="muted">{branch.envio.detalle}</p>
                <p className="visit__apps">
                  {branch.envio.apps.map((app) => (
                    <span className="tag" key={app}>
                      {app}
                    </span>
                  ))}
                </p>
              </div>

              <div className="visit__block">
                <h4 className="visit__block-title">Contactanos</h4>
                <ContactLines branch={branch} />
              </div>

              <div className="visit__actions">
                <WhatsAppButton branch={branch} />
                <a
                  className="btn btn--sm"
                  href={mapsLink(branch.maps)}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Como llegar
                </a>
              </div>
            </Reveal>

            <Reveal className="visit__col" delay={0.1}>
              <PhotoFrame
                label="El salon"
                caption="Espacio reservado para la foto del ambiente"
                ratio="4 / 3"
                tone="room"
              />
              <div className="visit__stats">
                <div className="visit__stat">
                  <span className="visit__stat-num display display--m tnum">
                    <Counter to={branch.totalItems} />
                  </span>
                  <span className="visit__stat-label">items en la carta</span>
                </div>
                <div className="visit__stat">
                  <span className="visit__stat-num display display--m tnum">
                    <Counter to={branch.categorias.length} />
                  </span>
                  <span className="visit__stat-label">secciones</span>
                </div>
                <div className="visit__stat">
                  <span className="visit__stat-num display display--m tnum">1984</span>
                  <span className="visit__stat-label">desde el primer local</span>
                </div>
              </div>
              <Stamp sub={branch.barrio} />
            </Reveal>
          </div>

          {branch.avisos?.length ? (
            <Reveal className="avisos">
              <Ornament>Avisos</Ornament>
              <ul>
                {branch.avisos.map((aviso) => (
                  <li key={aviso} className="muted">
                    {aviso}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* ==================================================== cta */}
      <section className="band band--panelled cta-band">
        <div className="shell">
          <Reveal className="cta cta--tight">
            <h2 className="display display--l cta__title">Reservá tu mesa en {branch.nombre}</h2>
            <p className="lede cta__lede">
              Escribinos y te guardamos lugar. O pedí por Rappi y PedidosYa, todos los dias.
            </p>
            <div className="cta__actions">
              <WhatsAppButton branch={branch} label="Escribinos por WhatsApp" />
              <Link to={`/${branch.id}/carta`} className="btn btn--lg">
                Ver la carta
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
