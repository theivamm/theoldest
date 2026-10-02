import { slug } from '../data/build.js'

/* ============================================================================
   Placeholders
   ----------------------------------------------------------------------------
   Every dish, every drink and every "loose" photo in the landings gets a
   drawn plate instead of a real photograph. The point is that the menu should
   look finished now and be swappable for photos later: pass a `src` and the
   drawing steps aside.
   ========================================================================== */

/**
 * Six shared gradients, mounted once by <DishArtDefs />. Defining them per dish
 * would mean 700 copies of the same markup, and the carta only ever paints the
 * handful of dishes you are actually looking at.
 */
export const TONES = ['amber', 'copper', 'olive', 'plum', 'rust', 'gold']

function toneOf(seed) {
  return TONES[seed % TONES.length]
}

const VESSELS = {
  plato: (
    <>
      <ellipse cx="50" cy="62" rx="30" ry="9" className="ph-shade" />
      <circle cx="50" cy="56" r="27" className="ph-line" />
      <circle cx="50" cy="56" r="19" className="ph-line ph-dim" />
      <path d="M50 44c6-3 12 1 12 6s-6 9-12 6-6-9 0-12z" className="ph-fill" />
      <path d="M24 46l-8-16M76 46l8-16" className="ph-line ph-dim" />
      <path d="M14 28l4 4M86 28l-4 4" className="ph-line ph-thin" />
    </>
  ),
  copa: (
    <>
      <ellipse cx="50" cy="84" rx="20" ry="5" className="ph-shade" />
      <path d="M30 30h40l-18 22h-4z" className="ph-line" />
      <path d="M33 42h34l-16 18h-2z" className="ph-fill" />
      <path d="M50 52v28M38 80h24" className="ph-line" />
      <circle cx="45" cy="36" r="2.4" className="ph-bright" />
      <path d="M52 30v-6" className="ph-line ph-thin" />
    </>
  ),
  jarra: (
    <>
      <ellipse cx="50" cy="84" rx="24" ry="5" className="ph-shade" />
      <path d="M36 28h28v50a6 6 0 01-6 6H42a6 6 0 01-6-6z" className="ph-line" />
      <path d="M30 38h40v6H30zM30 38a20 8 0 0140 0" className="ph-line ph-dim" />
      <path d="M34 44h32v34a6 6 0 01-6 6H40a6 6 0 01-6-6z" className="ph-fill" />
      <path d="M64 44c10 2 10 14 0 16" className="ph-line" />
      <path d="M43 24h14" className="ph-line ph-thin" />
    </>
  ),
  botella: (
    <>
      <ellipse cx="50" cy="86" rx="18" ry="4" className="ph-shade" />
      <path d="M46 14h8v14c0 4 10 8 10 16v38a4 4 0 01-4 4H40a4 4 0 01-4-4V44c0-8 10-12 10-16z" className="ph-line" />
      <path d="M40 48h20v34H40z" className="ph-fill" />
      <path d="M43 58h14M43 64h10" className="ph-line ph-thin" />
      <path d="M44 10h12v5H44z" className="ph-line" />
    </>
  ),
  lata: (
    <>
      <ellipse cx="50" cy="86" rx="18" ry="4" className="ph-shade" />
      <rect x="36" y="24" width="28" height="60" rx="5" className="ph-line" />
      <ellipse cx="50" cy="27" rx="14" ry="5" className="ph-line ph-dim" />
      <path d="M36 36h28v34H36z" className="ph-fill" />
      <path d="M41 48h18M41 56h12" className="ph-line ph-thin" />
      <path d="M36 24v60M64 24v60" className="ph-line ph-thin" />
    </>
  ),
  taza: (
    <>
      <ellipse cx="50" cy="82" rx="26" ry="5" className="ph-shade" />
      <path d="M32 40h34v18a17 17 0 01-34 0z" className="ph-line" />
      <path d="M35 52h28v6a14 14 0 01-28 0z" className="ph-fill" />
      <path d="M66 44c10 0 10 12 0 12" className="ph-line" />
      <path d="M26 82h48" className="ph-line" />
      <path d="M44 28c-3 4 3 5 0 9M54 26c-3 4 3 5 0 9" className="ph-line ph-thin" />
    </>
  ),
  vaso: (
    <>
      <ellipse cx="50" cy="84" rx="20" ry="5" className="ph-shade" />
      <path d="M36 24l4 58h20l4-58z" className="ph-line" />
      <path d="M38 42l2 38h20l2-38z" className="ph-fill" />
      <path d="M46 20h8" className="ph-line ph-thin" />
      <path d="M44 52c6 2 10 4 14 6" className="ph-line ph-thin" />
    </>
  ),
  postre: (
    <>
      <ellipse cx="50" cy="70" rx="28" ry="8" className="ph-shade" />
      <path d="M28 64h44l-4 10H32z" className="ph-line" />
      <path d="M32 46h36l4 18H28z" className="ph-line" />
      <path d="M34 50h32l3 12H31z" className="ph-fill" />
      <path d="M32 46c2-8 8-10 18-10s16 2 18 10" className="ph-line ph-dim" />
      <path d="M50 30v-6" className="ph-line ph-thin" />
      <circle cx="50" cy="22" r="3" className="ph-bright" />
    </>
  ),
  pizza: (
    <>
      <ellipse cx="50" cy="64" rx="30" ry="8" className="ph-shade" />
      <circle cx="50" cy="56" r="28" className="ph-line" />
      <circle cx="50" cy="56" r="22" className="ph-line ph-dim" />
      <circle cx="42" cy="50" r="4" className="ph-fill" />
      <circle cx="58" cy="48" r="3.4" className="ph-fill" />
      <circle cx="54" cy="63" r="3.8" className="ph-fill" />
      <circle cx="45" cy="64" r="2.8" className="ph-fill" />
      <path d="M22 56h56M50 28v56M31 37l38 38M69 37L31 75" className="ph-line ph-thin" />
    </>
  ),
}

const LABELS = {
  plato: 'Plato',
  copa: 'Copa',
  jarra: 'Pinta',
  botella: 'Botella',
  lata: 'Lata',
  taza: 'Cafeteria',
  vaso: 'Vaso',
  postre: 'Postre',
  pizza: 'Pizza',
}

/** Cheap deterministic hash so each dish gets its own tone and fill level. */
function hash(text) {
  let value = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    value ^= text.charCodeAt(i)
    value = Math.imul(value, 16777619)
  }
  return Math.abs(value)
}

/** Rendered once, near the root. */
export function DishArtDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        {TONES.map((tone) => (
          <g key={tone}>
            <radialGradient id={`bg-${tone}`} cx="50%" cy="38%" r="70%">
              <stop offset="0%" className={`tone-bg-a tone-bg-a--${tone}`} />
              <stop offset="100%" className={`tone-bg-b tone-bg-b--${tone}`} />
            </radialGradient>
            <linearGradient id={`liq-${tone}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className={`tone-liq-a tone-liq-a--${tone}`} />
              <stop offset="100%" className={`tone-liq-b tone-liq-b--${tone}`} />
            </linearGradient>
          </g>
        ))}
      </defs>
    </svg>
  )
}

/**
 * The stand-in illustration for a dish or a drink.
 * `src` is the escape hatch: pass a real photo path and it renders instead.
 */
export function DishArt({ kind = 'plato', name, src, className = '', showLabel = false, eager = false }) {
  const seed = hash(name ?? kind)
  const tone = toneOf(seed)
  const fill = 3 + (seed % 4) // keeps the liquid level different from dish to dish

  if (src) {
    return (
      <span className={`dish-art ${className}`} data-kind={kind}>
        <img src={src} alt={name ?? ''} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </span>
    )
  }

  return (
    <span
      className={`dish-art ${className}`}
      data-kind={kind}
      data-tone={tone}
      data-fill={fill}
      role="img"
      aria-label={`Espacio reservado para la foto de ${name ?? 'este plato'}`}
    >
      <svg viewBox="0 0 100 100" className="dish-art__svg" aria-hidden="true" focusable="false">
        <rect width="100" height="100" className="ph-bg" />
        <circle cx="50" cy="50" r="44" className="ph-ring" />
        <g className="ph-art">{VESSELS[kind] ?? VESSELS.plato}</g>
        <path
          d="M6 6h10M6 6v10M94 6H84M94 6v10M6 94h10M6 94V84M94 94H84M94 94V84"
          className="ph-corner"
        />
      </svg>
      {showLabel ? (
        <span className="dish-art__label" aria-hidden="true">
          {LABELS[kind] ?? 'Foto'} · espacio reservado
        </span>
      ) : null}
    </span>
  )
}

/**
 * A larger "loose" image slot for the landings: the room, the bar, the murals.
 * Corner brackets and a caption, so the gap reads as intentional.
 */
export function PhotoFrame({ label, caption, ratio = '4 / 3', tone = 'room', children }) {
  return (
    <figure className="photo-frame" data-tone={tone} style={{ '--ratio': ratio }}>
      <div className="photo-frame__art" aria-hidden="true">
        {children ?? <RoomLines />}
      </div>
      <div className="photo-frame__mark" aria-hidden="true" />
      <figcaption className="photo-frame__cap">
        <span className="photo-frame__label">{label}</span>
        {caption ? <span className="photo-frame__note">{caption}</span> : null}
      </figcaption>
    </figure>
  )
}

/** A generic line drawing of a panelled room with a bar and a lit bottle shelf. */
function RoomLines() {
  return (
    <svg viewBox="0 0 200 150" className="room-lines">
      <rect x="0" y="0" width="200" height="150" />
      <path d="M0 104h200" className="rl-floor" />
      <path d="M22 104V40h156v64" className="rl-bar" />
      <path d="M30 62h140M30 76h140M30 90h140" className="rl-shelf" />
      <path d="M40 62V48h6v14M56 62V44h6v18M72 62V50h6v12M90 62V42h6v20M108 62V48h6v14M126 62V44h6v18M144 62V50h6v12" className="rl-bottle" />
      <path d="M18 104l14-16h136l14 16" className="rl-counter" />
      <path d="M100 118v22M84 140h32" className="rl-stool" />
      <circle cx="100" cy="24" r="7" className="rl-lamp" />
      <path d="M100 31v6" className="rl-lamp" />
    </svg>
  )
}

/** A stable key for a dish, handy for swapping in real photography later. */
export function artKey(item) {
  return slug(item)
}
