/**
 * Opening hours, and a live "abierto ahora" lamp for the door.
 *
 * Hours are stored per weekday as [openMinutes, closeMinutes] in Argentina
 * time. A close time earlier than the open time means the bar runs past
 * midnight, so the closing day owns the shift that starts the night before.
 */

export const WEEKDAYS = [
  { key: 1, short: 'Lun', long: 'Lunes' },
  { key: 2, short: 'Mar', long: 'Martes' },
  { key: 3, short: 'Mié', long: 'Miércoles' },
  { key: 4, short: 'Jue', long: 'Jueves' },
  { key: 5, short: 'Vie', long: 'Viernes' },
  { key: 6, short: 'Sáb', long: 'Sábado' },
  { key: 0, short: 'Dom', long: 'Domingo' },
]

export function clock(minutes) {
  const total = ((minutes % 1440) + 1440) % 1440
  const h = Math.floor(total / 60)
  const m = total % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/** "16:00" -> 960 */
export function parseClock(value) {
  const [h, m] = String(value).split(':').map(Number)
  return h * 60 + (m || 0)
}

function todayInArgentina(now) {
  // Argentina is UTC-3 year round, so build the local date from the UTC clock.
  const utc = new Date(now.getTime() - 3 * 60 * 60 * 1000)
  return { day: utc.getUTCDay(), minutes: utc.getUTCHours() * 60 + utc.getUTCMinutes() }
}

/**
 * @returns {{ open: boolean, label: string, detail: string }}
 */
export function openingState(hours, now = new Date()) {
  const { day, minutes } = todayInArgentina(now)
  const shiftFor = (d) => hours[d] ?? null

  const today = shiftFor(day)
  if (today && minutes >= today[0] && minutes < today[1]) {
    return {
      open: true,
      label: 'Abierto ahora',
      detail: `Cierra hoy a las ${clock(today[1])}`,
    }
  }

  // Still on last night's shift: the one that began the previous day.
  const previous = shiftFor(day === 0 ? 6 : day - 1)
  if (previous && previous[1] <= previous[0] && minutes < previous[1]) {
    return {
      open: true,
      label: 'Abierto ahora',
      detail: `Cierra hoy a las ${clock(previous[1])}`,
    }
  }

  // What time does it next swing open?
  for (let step = 0; step <= 7; step += 1) {
    const target = (day + step) % 7
    const shift = shiftFor(target)
    if (!shift) continue
    const startsIn = step === 0 ? shift[0] - minutes : null
    if (step === 0 && startsIn !== null && startsIn > 0) {
      return { open: false, label: 'Cerrado ahora', detail: `Abre hoy a las ${clock(shift[0])}` }
    }
    if (step > 0) {
      const when = step === 1 ? 'mañana' : WEEKDAYS.find((d) => d.key === target).long.toLowerCase()
      return {
        open: false,
        label: 'Cerrado ahora',
        detail: `Abre ${when} a las ${clock(shift[0])}`,
      }
    }
  }

  return { open: false, label: 'Cerrado ahora', detail: 'Consultá los horarios' }
}
