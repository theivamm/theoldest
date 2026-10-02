import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { price } from '../lib/format.js'
import { Pill } from './Bits.jsx'

/** The Belgrano R. weekday lunch menu. */
export function MenuEjecutivo({ menu, whatsappHref }) {
  const [day, setDay] = useState(0)
  const panelRef = useRef(null)
  const current = menu.dias[day]

  useGSAP(
    () => {
      gsap.from('[data-menuej-line]', {
        y: 14,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.07,
      })
    },
    { dependencies: [day], scope: panelRef },
  )

  return (
    <div className="ejecutivo">
      <div className="ejecutivo__prices" role="list">
        {menu.precios.map((option) => (
          <div key={option.id} className="ejecutivo__price" role="listitem">
            <span className="ejecutivo__price-name">{option.nombre}</span>
            <span className="ejecutivo__price-leader" aria-hidden="true" />
            <span className="ejecutivo__price-amount tnum">{price(option.precio)}</span>
          </div>
        ))}
        <p className="ejecutivo__note">{menu.nota}</p>
      </div>

      <div className="ejecutivo__days">
        <div className="pill-row" role="tablist" aria-label="Dias del menu ejecutivo">
          {menu.dias.map((entry, index) => (
            <Pill key={entry.dia} active={day === index} onClick={() => setDay(index)}>
              {entry.dia}
            </Pill>
          ))}
        </div>

        <div className="ejecutivo__panel" ref={panelRef} role="tabpanel" key={current.dia}>
          <ol className="ejecutivo__courses">
            {current.entradas.map((line) => (
              <li key={line} className="ejecutivo__course" data-menuej-line>
                <span className="ejecutivo__course-key">Entrada</span>
                <span className="ejecutivo__course-body">{line}</span>
              </li>
            ))}
            {current.principales.map((line) => (
              <li key={line} className="ejecutivo__course" data-menuej-line>
                <span className="ejecutivo__course-key">Principal</span>
                <span className="ejecutivo__course-body">{line}</span>
              </li>
            ))}
            <li className="ejecutivo__course" data-menuej-line>
              <span className="ejecutivo__course-key">Postre</span>
              <span className="ejecutivo__course-body">{current.postre}</span>
            </li>
          </ol>

          <a
            className="btn btn--sm"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
          >
            Pedir el menu del {current.dia}
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
