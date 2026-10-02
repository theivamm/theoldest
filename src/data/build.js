import { fold } from '../lib/search.jsx'

/* ============================================================================
   Carta data model
   ----------------------------------------------------------------------------
   The two menus are transcribed as plain objects so they stay easy to edit:

     n  name      d  description      p  price (ARS, integer)
     o  options / "a eleccion"        t  extra tags
     f  favourite (shows in the "Favoritos" filter)   n2 alternate name
     d2 secondary description line    k  art kind override

   Everything else -- ids, search keys, tags, artwork -- is derived here so the
   menu files never have to repeat themselves.
   ========================================================================== */

/** Ordered because this is the order the filter pills appear in. */
export const TAGS = [
  { id: 'favorito', label: 'Favoritos', tone: 'hot' },
  { id: 'nuevo', label: 'Nuevo', tone: 'hot' },
  { id: 'compartir', label: 'Para compartir', tone: '' },
  { id: 'veggie', label: 'Veggie', tone: 'green' },
  { id: 'sin-tacc', label: 'Sin TACC', tone: 'green' },
  { id: 'picante', label: 'Picante', tone: 'red' },
  { id: 'bar', label: 'Botellas', tone: '' },
  { id: 'premium', label: 'Premium', tone: 'hot' },
  { id: 'sin-alcohol', label: 'Sin alcohol', tone: '' },
  { id: 'autor', label: 'De autor', tone: '' },
]

export const TAG_BY_ID = Object.fromEntries(TAGS.map((tag) => [tag.id, tag]))

/** Everything below is folded once, at build time, so matching is a plain test. */
const RULES = [
  ['sin-tacc', /sin\s*tacc|celiacos|gluten\s*free/],
  ['picante', /picante|jalape|chilli|chili|tabasco/],
  ['compartir', /compartir|para\s*\d|\bduo\b|dúo|tabla|picada|personas|fetas/],
  ['veggie', /vegan|vegetarian|verdura|alcapar|champin|champiñ|portobello|caprese|ensalada|quinoa|berenjena|palta/],
  ['bar', /whisk|scotch|bourbon|single malt|licor|ron |gin |tequila|vodka|aperitiv|vermut|coñac|cognac/],
]

const PREMIUM_FROM = 34000

export function slug(text) {
  return fold(text)
    .normalize('NFD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function inferTags(item, category, group) {
  const haystack = fold([item.n, item.n2, item.d, item.d2, item.o, category.nombre, group.nombre].join(' '))
  const tags = new Set(item.t ?? [])

  if (item.f) tags.add('favorito')
  for (const [id, pattern] of RULES) if (pattern.test(haystack)) tags.add(id)

  if (category.sinAlcohol) tags.add('sin-alcohol')
  if (fold(group.nombre).includes('de autor')) tags.add('autor')
  if (typeof item.p === 'number' && item.p >= PREMIUM_FROM) tags.add('premium')
  if (item.o) tags.add('compartir')

  return TAGS.filter((tag) => tags.has(tag.id)).map((tag) => tag.id)
}

/**
 * Which vessel to draw for the placeholder art. Overridable per dish with `k`.
 */
function inferKind(item, category, group) {
  if (item.k) return item.k

  const t = fold([category.nombre, group.nombre, item.n, item.n2].join(' '))

  if (/jarra/.test(t)) return 'jarra'
  if (/lata|porron|botellin/.test(t)) return 'lata'
  if (/vino|espumante|malbec|cabernet|chardonnay|viognier|sauvignon|merlot|petit verdot|blend|rose|rosado|pinot/.test(t))
    return 'botella'
  if (/bar$|whisk|scotch|bourbon|single malt|licor|ron |gin |tequila|vodka|aperitiv|vermut|bitter/.test(t)) return 'botella'
  if (/copa/.test(t)) return 'copa'
  if (/cafe|te |capuccino|latte|cortado|espresso|expresso|affogato|frappuccino|mocha|capuc|capuch|machiato/.test(t))
    return 'taza'
  if (/licuado|milshake|mil\s?sake|batido|minerva|licuado/.test(t)) return 'vaso'

  if (category.sinAlcohol) return 'vaso'
  if (category.tipo === 'bebida') return 'copa'

  if (
    /postre|flan|torta|brownie|panqueque|helado|alfajor|cookie|medialuna|chocotorta|cheesecake|mousse|rogel|apple|banana|ensalada de fruta|key lime|crumbl|roll/.test(
      t,
    )
  )
    return 'postre'

  return 'plato'
}

function normalizeItem(raw, ctx) {
  const name = raw.n
  const desc = [raw.d2, raw.d].filter(Boolean).join(' — ')
  const options = [raw.o].filter(Boolean).join(' · ')

  const item = {
    key: `${ctx.branchId}:${ctx.categoryId}:${ctx.groupId}:${ctx.index}:${slug(name)}`,
    name,
    alias: raw.n2 ?? null,
    desc,
    options,
    price: typeof raw.p === 'number' ? raw.p : null,
    priceNote: raw.pn ?? null,
    favorite: Boolean(raw.f),
    tags: inferTags(raw, ctx.category, ctx.group),
    kind: inferKind(raw, ctx.category, ctx.group),
  }

  // one flat string to search against, built once
  item.haystack = [name, raw.n2, desc, options, ctx.category.nombre, ctx.group.nombre]
    .filter(Boolean)
    .join(' ~ ')

  return item
}

/** @returns {object} a branch ready to render: categories with groups of items */
export function buildMenu(source) {
  let total = 0

  const categories = source.categorias.map((category) => {
    let groupIndex = 0

    const groups = category.grupos
      .filter((group) => group.items?.length)
      .map((group) => {
        const groupId = `${category.id}-${groupIndex}`
        const ctx = {
          branchId: source.id,
          category,
          categoryId: category.id,
          group,
          groupId,
        }

        const items = group.items.map((raw, index) => {
          const item = normalizeItem(raw, { ...ctx, index })
          total += 1
          return item
        })

        groupIndex += 1

        return {
          id: groupId,
          name: group.nombre,
          note: group.nota ?? null,
          items,
        }
      })

    return {
      id: category.id,
      name: category.nombre,
      blurb: category.glosa ?? null,
      tipo: category.tipo ?? 'comida',
      sinAlcohol: Boolean(category.sinAlcohol),
      icon: category.icono ?? null,
      total: groups.reduce((sum, group) => sum + group.items.length, 0),
      groups,
    }
  })

  return {
    ...source,
    categorias: categories,
    totalItems: total,
  }
}

/** Flat list of every dish, used by the global search. */
export function flatten(menu) {
  return menu.categorias.flatMap((category) =>
    category.groups.flatMap((group) =>
      group.items.map((item) => ({ ...item, categoryId: category.id, categoryName: category.nombre, groupName: group.name })),
    ),
  )
}

/** Counts for the filter pills, restricted to the dishes currently in scope. */
export function tagCounts(items) {
  const counts = new Map()
  for (const item of items) {
    for (const tag of item.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return TAGS.filter((tag) => counts.has(tag.id)).map((tag) => ({ ...tag, count: counts.get(tag.id) }))
}
