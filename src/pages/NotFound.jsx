import { Link } from 'react-router-dom'
import { branchCards } from '../data/index.js'
import { Stamp } from '../components/Bits.jsx'

export default function NotFound() {
  return (
    <section className="band notfound">
      <div className="shell">
        <p className="kicker kicker--center">Error 404</p>
        <h1 className="display display--xl notfound__title">Esa mesa no existe</h1>
        <p className="lede notfound__lede">
          La pagina que buscas no esta. Volve al inicio y elegi sucursal: Belgrano R. o Caballito.
        </p>

        <div className="notfound__actions">
          {branchCards.map((branch) => (
            <Link key={branch.id} to={`/${branch.id}`} className="btn">
              {branch.nombre}
            </Link>
          ))}
          <Link to="/" className="btn btn--brass">
            Ir al inicio
          </Link>
        </div>

        <div className="notfound__stamp">
          <Stamp />
        </div>
      </div>
    </section>
  )
}
