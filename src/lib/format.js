const ARS = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 })

/** 23000 -> "$ 23.000" */
export function price(value) {
  if (value === null || value === undefined) return 'Consultar'
  return `$ ${ARS.format(value)}`
}

/** Just the number, no symbol: "23.000" */
export function priceBare(value) {
  if (value === null || value === undefined) return '—'
  return ARS.format(value)
}

export function whatsappLink(phone, text) {
  const digits = String(phone).replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

export function telLink(phone) {
  return `tel:+549${String(phone).replace(/\D/g, '')}`
}

export function mapsLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/** "2 fetas" -> the leading number, when a dish is priced per portion. */
export function leadingNumber(text) {
  const match = String(text ?? '').match(/\d+/)
  return match ? match[0] : null
}
