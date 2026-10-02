import { belgrano } from './belgrano.js'
import { caballito } from './caballito.js'
import { buildMenu, flatten } from './build.js'

/** Both menus are normalized once, here, at import time. */
export const menus = {
  belgrano: buildMenu(belgrano),
  caballito: buildMenu(caballito),
}

export const branchOrder = ['belgrano', 'caballito']

export function getBranch(id) {
  return menus[id] ?? null
}

export function getFlatItems(id) {
  return menus[id] ? flatten(menus[id]) : []
}

/** Used by the branch picker and the footer. */
export const branchCards = branchOrder.map((id) => {
  const branch = menus[id]
  return {
    id,
    nombre: branch.nombre,
    barrio: branch.barrio,
    lema: branch.lema,
    direccion: branch.direccion,
    telefono: branch.telefono,
    whatsapp: branch.whatsapp,
    horarioTexto: branch.horarioTexto,
    totalItems: branch.totalItems,
    categorias: branch.categorias.map((category) => ({
      id: category.id,
      name: category.nombre,
      count: category.total,
    })),
  }
})

export { TAGS, TAG_BY_ID, tagCounts, flatten } from './build.js'
