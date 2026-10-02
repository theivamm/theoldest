/**
 * A small search engine for the carta.
 *
 * The requirement: as you type, the letters you wrote should light up inside
 * the dishes — and it must not matter whether you type accents.
 *
 * The trick is that we never search the original string. We search a folded
 * copy (lowercased, diacritics stripped, ñ -> n) and we carry, for every
 * character of the folded copy, the index it came from in the original. That
 * index map is what lets us highlight the *real* text: typing "cafe" lights up
 * "Café" from the C to the e, accents and all.
 */

const COMBINING = /[\u0300-\u036f]/g

/** ñ has no decomposition to strip, so it is transliterated by hand. */
const TRANSLIT = { ñ: 'n', Ñ: 'n' }

/**
 * Fold a string for comparison, remembering where every character came from.
 * @returns {{ text: string, map: number[] }} `map[i]` = index in the source.
 */
export function foldWithMap(source) {
  let text = ''
  const map = []
  let index = 0

  // for..of iterates code points, so accents made of two chars stay intact
  for (const char of source) {
    text += TRANSLIT[char] ?? char.normalize('NFD').replace(COMBINING, '').toLowerCase()
    map.push(index)
    index += char.length
  }

  return { text, map }
}

/** Fold without keeping a map. For haystacks we build once and reuse. */
export function fold(source) {
  return foldWithMap(source).text
}

/** Collapse anything that is not a letter or a digit into a single space. */
function squash(text) {
  return text.replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
}

/**
 * A second view of the same text with every separator removed, so that
 * "gintonic" can still find "Gin Tonic". Keeps its own index map.
 */
function packWithMap(source) {
  const { text: folded, map } = foldWithMap(source)

  let packed = ''
  const packedMap = []

  for (let i = 0; i < folded.length; i += 1) {
    if (!/[\p{L}\p{N}]/u.test(folded[i])) continue
    packed += folded[i]
    packedMap.push(map[i])
  }

  return { text: packed, map: packedMap }
}

/** A query split into the individual words the user typed. */
export function parseQuery(raw) {
  return squash(fold(raw ?? ''))
    .split(' ')
    .filter(Boolean)
}

/** Map a hit range in a folded copy back to a range in the original text. */
function toOriginalRange(map, start, length) {
  const from = map[start]
  const last = map[start + length - 1]
  if (from === undefined || last === undefined) return null
  return [from, last + 1]
}

/** Sort and merge overlapping ranges so highlighting never nests badly. */
function mergeRanges(ranges) {
  if (ranges.length < 2) return ranges

  const sorted = [...ranges].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const out = [sorted[0]]

  for (let i = 1; i < sorted.length; i += 1) {
    const last = out[out.length - 1]
    const range = sorted[i]
    if (range[0] <= last[1]) last[1] = Math.max(last[1], range[1])
    else out.push(range)
  }

  return out
}

/** Every occurrence of `token` in `text`, as original-string ranges. */
function rangesForToken(text, token, views) {
  const ranges = []

  for (const view of views) {
    let from = 0
    while (from <= view.text.length - token.length) {
      const at = view.text.indexOf(token, from)
      if (at === -1) break
      const range = toOriginalRange(view.map, at, token.length)
      if (range) ranges.push(range)
      from = at + token.length
    }
  }

  return ranges
}

/**
 * Every place inside `text` where any of the `tokens` appears.
 * @returns {Array<[number, number]>} ranges in original-string coordinates
 */
export function findRanges(text, tokens) {
  if (!text || tokens.length === 0) return []

  const views = [foldWithMap(text), packWithMap(text)]
  const ranges = []

  for (const token of tokens) {
    if (!token) continue
    ranges.push(...rangesForToken(text, token, views))
  }

  return mergeRanges(ranges)
}

/** Pre-bake the searchable text of an item once, instead of per keystroke. */
export function makeIndexable(rawText) {
  const { text: folded, map } = foldWithMap(squash(rawText))
  const packed = []
  for (let i = 0; i < folded.length; i += 1) {
    if (folded[i] === ' ') continue
    packed.push(folded[i])
  }
  return { folded, compact: packed.join('') }
}

/**
 * Score + highlight a single item.
 * @returns `null` when the item does not match every token.
 */
export function matchItem(item, tokens, cache) {
  if (tokens.length === 0) {
    return { ranges: { name: [], desc: [], options: [] }, score: 0 }
  }

  let index = cache?.get(item.key)
  if (!index) {
    index = makeIndexable(item.haystack)
    cache?.set(item.key, index)
  }

  for (const token of tokens) {
    const needle = token.replace(/ /g, '')
    if (!index.folded.includes(token) && !(needle.length > 1 && index.compact.includes(needle))) {
      return null
    }
  }

  // Ranking: a hit in the dish name outranks a hit buried in the description,
  // and a hit on the whole name outranks a hit on a fragment of it.
  const nameRanges = findRanges(item.name, tokens)
  const descRanges = findRanges(item.desc ?? '', tokens)
  const optionRanges = findRanges(item.options ?? '', tokens)

  const foldedName = fold(item.name)
  let score = nameRanges.length * 12 + descRanges.length * 3 + optionRanges.length

  if (nameRanges.length) {
    const exact = tokens.some((t) => foldedName === t)
    const starts = tokens.some((t) => foldedName.startsWith(t))
    score += exact ? 60 : starts ? 26 : 10
  }

  if (item.favorite) score += 4

  return { ranges: { name: nameRanges, desc: descRanges, options: optionRanges }, score }
}

/**
 * Split `text` into plain and highlighted slices.
 * @returns {Array<{ text: string, hit: boolean }>}
 */
export function sliceByRanges(text, ranges) {
  if (!text) return []
  if (!ranges || ranges.length === 0) return [{ text, hit: false }]

  const parts = []
  let cursor = 0

  for (const [from, to] of ranges) {
    if (from > cursor) parts.push({ text: text.slice(cursor, from), hit: false })
    parts.push({ text: text.slice(from, to), hit: true })
    cursor = to
  }

  if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false })

  return parts
}

/** Renders highlighted slices as React nodes. */
export function highlight(text, ranges, keyPrefix = 'h') {
  return sliceByRanges(text, ranges).map((part, i) =>
    part.hit ? (
      <mark key={`${keyPrefix}-${i}`} className="hl">
        {part.text}
      </mark>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{part.text}</span>
    ),
  )
}
