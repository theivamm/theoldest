import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { openingState, clock, WEEKDAYS } from '../lib/hours.js'
import { whatsappLink, telLink, mapsLink } from '../lib/format.js'
import { TAG_BY_ID } from '../data/build.js'

/** The tilted door sticker. */
export function Stamp({ year = '1984', sub = 'Belgrano' }) {
  return (
    <div className="stamp" aria-hidden="true">
      <span className="stamp__in">
        <span className="stamp__since">Desde</span>
        <span className="stamp__year">{year}</span>
        <span className="stamp__sub">{sub}</span>
      </span>
    </div>
  )
}

/** Live open/shut lamp, driven by the branch schedule in Argentina time. */
export function OpenLamp({ hours, className = '' }) {
  const [state, setState] = useState(() => openingState(hours))

  useEffect(() => {
    const tick = () => setState(openingState(hours))
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [hours])

  return (
    <span className={`status ${state.open ? 'is-open' : ''} ${className}`}>
      <span className="status__lamp" />
      <span>{state.label}</span>
      <span className="status__detail">· {state.detail}</span>
    </span>
  )
}

/** A week rendered as a table, the way a bar prints it on the door. */
export function ScheduleTable({ hours }) {
  return (
    <table className="schedule">
      <tbody>
        {WEEKDAYS.map(({ key, long }) => {
          const shift = hours[key]
          return (
            <tr key={key}>
              <th scope="row">{long}</th>
              <td className="tnum">
                {shift ? (
                  <>
                    {clock(shift[0])}
                    <span className="schedule__dash">—</span>
                    {clock(shift[1])}
                  </>
                ) : (
                  <span className="muted">Cerrado</span>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/** The kicker + display + optional lede header used all over the landings. */
export function SectionHead({ kicker, title, lede, center = false, as: Tag = 'h2' }) {
  return (
    <header className={`section-head ${center ? 'section-head--center' : ''}`}>
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <Tag className="display display--l section-head__title">{title}</Tag>
      {lede ? <p className="lede section-head__lede">{lede}</p> : null}
    </header>
  )
}

/** Promotions, printed like a hand-lettered poster. */
export function PromoCard({ promo, index = 0, accent = false }) {
  return (
    <article className={`promo ${accent ? 'promo--accent' : ''}`}>
      <span className="promo__num tnum">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="promo__title display display--s">{promo.titulo}</h3>
      {promo.detalle ? <p className="promo__body">{promo.detalle}</p> : null}
      {promo.cuando ? <p className="promo__when">{promo.cuando}</p> : null}
    </article>
  )
}

export function PromoRow({ promos }) {
  return (
    <div className="promo-row">
      {promos.map((promo, i) => (
        <PromoCard key={promo.titulo} promo={promo} index={i} accent={promo.destacado} />
      ))}
    </div>
  )
}

/** Filter / category chips. */
export function Pill({ active, onClick, children, count, title }) {
  return (
    <button type="button" className="pill" aria-pressed={active} onClick={onClick} title={title}>
      {children}
      {count !== undefined ? <span className="pill__count tnum">{count}</span> : null}
    </button>
  )
}

export function TagList({ tags, max }) {
  const shown = max ? tags.slice(0, max) : tags
  const rest = max ? tags.length - shown.length : 0

  return (
    <span className="tag-list">
      {shown.map((id) => {
        const tag = TAG_BY_ID[id]
        if (!tag) return null
        return (
          <span key={id} className={`tag ${tag.tone ? `tag--${tag.tone}` : ''}`}>
            {tag.label}
          </span>
        )
      })}
      {rest > 0 ? <span className="tag tag--more">+{rest}</span> : null}
    </span>
  )
}

export function WhatsAppButton({ branch, label = 'Escribinos', className = 'btn btn--brass', small = false }) {
  return (
    <a
      className={`${className} ${small ? 'btn--sm' : ''}`}
      href={whatsappLink(branch.whatsapp, branch.whatsappTexto)}
      target="_blank"
      rel="noreferrer noopener"
    >
      {label}
      <span className="btn__arrow" aria-hidden="true">
        →
      </span>
    </a>
  )
}

export function ContactLines({ branch }) {
  return (
    <ul className="contact-lines">
      <li>
        <span className="contact-lines__key">Direccion</span>
        <a href={mapsLink(branch.maps)} target="_blank" rel="noreferrer noopener" className="contact-lines__val link-underline">
          {branch.direccion}
        </a>
      </li>
      <li>
        <span className="contact-lines__key">Telefono</span>
        <a href={telLink(branch.telefono)} className="contact-lines__val tnum link-underline">
          {branch.telefono}
        </a>
      </li>
      <li>
        <span className="contact-lines__key">WhatsApp</span>
        <a
          href={whatsappLink(branch.whatsapp, branch.whatsappTexto)}
          target="_blank"
          rel="noreferrer noopener"
          className="contact-lines__val tnum link-underline"
        >
          {branch.whatsapp}
        </a>
      </li>
    </ul>
  )
}

/** Small uppercase label with a hairline, used between blocks. */
export function Ornament({ children }) {
  return (
    <div className="rule rule--ornate" role="presentation">
      <span>{children}</span>
    </div>
  )
}

export function BackLink({ to, children }) {
  return (
    <Link to={to} className="back-link">
      <span aria-hidden="true">←</span> {children}
    </Link>
  )
}
