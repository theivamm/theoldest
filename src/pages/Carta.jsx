import { Navigate, useParams } from 'react-router-dom'
import { getBranch } from '../data/index.js'
import { CartaExplorer } from '../components/CartaExplorer.jsx'
import { BackLink, ContactLines, OpenLamp, WhatsAppButton } from '../components/Bits.jsx'
import { mapsLink } from '../lib/format.js'

export default function Carta() {
  const { branchId } = useParams()
  const branch = getBranch(branchId)

  if (!branch) return <Navigate to="/" replace />

  return (
    <>
      <header className="carta-head">
        <div className="shell">
          <BackLink to={`/${branch.id}`}>Volver a {branch.nombre}</BackLink>

          <div className="carta-head__main">
            <div>
              <p className="kicker">Carta completa</p>
              <h1 className="display display--l carta-head__title">
                {branch.nombre} · {branch.totalItems} platos y tragos
              </h1>
              <p className="muted carta-head__addr">
                {branch.direccion} · {branch.horarioTexto}
              </p>
            </div>

            <div className="carta-head__side">
              <OpenLamp hours={branch.horarios} />
              <div className="carta-head__actions">
                <WhatsAppButton branch={branch} label="Hacé tu pedido" small />
                <a
                  className="btn btn--sm btn--ghost"
                  href={mapsLink(branch.maps)}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Como llegar
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="carta-body">
        <div className="shell shell--wide">
          <CartaExplorer menu={branch} />
        </div>
      </section>

      <section className="band band--tight band--panelled">
        <div className="shell">
          <div className="carta-foot">
            <div>
              <p className="kicker">Contacto</p>
              <ContactLines branch={branch} />
            </div>
            <p className="muted carta-foot__note">
              {branch.envio.titulo}. {branch.envio.detalle}.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
