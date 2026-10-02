import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { parseQuery, matchItem, makeIndexable } from '../lib/search.jsx'
import { flatten, tagCounts } from '../data/build.js'
import { Pill } from './Bits.jsx'
import { MenuGroup, MenuItemCard } from './Menu.jsx'

/** Beyond this, the carta stops being a menu and starts being a database. */
const RESULT_CAP = 140

const VIEWS = [
  { id: 'lista', label: 'Lista' },
  { id: 'cards', label: 'Fotos' },
]

export function CartaExplorer({ menu }) {
  const [params, setParams] = useSearchParams()

  const query = params.get('q') ?? ''
  const scope = params.get('todo') === '1' ? 'carta' : 'seccion'
  const view = params.get('vista') === 'cards' ? 'cards' : 'lista'
  const categoryId = params.get('seccion') ?? menu.categorias[0].id

  const [draft, setDraft] = useState(query)
  const [tags, setTags] = useState(() => new Set())
  const inputRef = useRef(null)
  const listRef = useRef(null)

  /** Every dish of this branch, folded once. */
  const allItems = useMemo(() => flatten(menu), [menu])
  const indexCache = useMemo(() => new Map(), [menu])

  useEffect(() => {
    // Warm the index for the whole branch on mount, in one idle pass.
    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 200))
    const handle = idle(() => {
      for (const item of allItems) {
        if (!indexCache.has(item.key)) indexCache.set(item.key, makeIndexable(item.haystack))
      }
    })
    return () => window.cancelIdleCallback?.(handle)
  }, [allItems, indexCache])

  // Keep the input in step when the URL changes from the back button.
  useEffect(() => setDraft(query), [query])

  const patch = useCallback(
    (next) => {
      const merged = new URLSearchParams(params)
      for (const [key, value] of Object.entries(next)) {
        if (value === null || value === '') merged.delete(key)
        else merged.set(key, value)
      }
      setParams(merged, { replace: true })
    },
    [params, setParams],
  )

  const tokens = useMemo(() => parseQuery(draft), [draft])
  const searching = tokens.length > 0

  const category = useMemo(
    () => menu.categorias.find((c) => c.id === categoryId) ?? menu.categorias[0],
    [menu, categoryId],
  )

  /** Where the search looks: this section, or the whole carta. */
  const scopeItems = useMemo(() => {
    if (searching && scope === 'carta') return allItems
    return flatten({ ...menu, categorias: [category] })
  }, [searching, scope, allItems, menu, category])

  const tagPills = useMemo(() => tagCounts(scopeItems), [scopeItems])

  const tagFiltered = useMemo(
    () => (tags.size ? scopeItems.filter((item) => [...tags].every((tag) => item.tags.includes(tag))) : scopeItems),
    [scopeItems, tags],
  )

  /** Match + rank. This is the whole search. */
  const results = useMemo(() => {
    if (!searching) return tagFiltered.map((item) => ({ item, ranges: null, score: 0 }))
    return tagFiltered
      .map((item) => {
        const match = matchItem(item, tokens, indexCache)
        return match ? { item, ranges: match.ranges, score: match.score } : null
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || (a.item.name > b.item.name ? 1 : -1))
  }, [searching, tagFiltered, tokens, indexCache])

  const capped = results.length > RESULT_CAP
  const visible = capped ? results.slice(0, RESULT_CAP) : results
  const firstKey = visible[0]?.item.key ?? null

  /** Group the results back into sections, or keep the current section's shape. */
  const sections = useMemo(() => {
    if (searching || scope === 'carta') {
      const bySection = new Map()
      for (const result of visible) {
        const { categoryId: catId, categoryName, groupName } = result.item
        const sectionKey = `${catId}::${groupName}`
        if (!bySection.has(sectionKey)) {
          bySection.set(sectionKey, { id: sectionKey, name: groupName, categoryName, categoryId: catId, entries: [] })
        }
        bySection.get(sectionKey).entries.push(result)
      }
      return [...bySection.values()]
    }

    return category.groups
      .map((group) => ({
        ...group,
        categoryName: category.nombre,
        entries: group.items.map((item) => ({ item, ranges: null, score: 0 })),
      }))
      .filter((group) => group.entries.length)
  }, [searching, scope, visible, category])

  const matchesByKey = useMemo(() => {
    const map = new Map()
    for (const result of visible) map.set(result.item.key, result)
    return map
  }, [visible])

  // Typing carries you to the first hit, and the row gives a small kick.
  useEffect(() => {
    if (!searching || !listRef.current) return
    const node = listRef.current.querySelector('[data-first]')
    if (!node) return
    node.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    gsap.fromTo(
      node,
      { backgroundColor: 'rgba(217,164,65,0.16)' },
      { backgroundColor: 'rgba(217,164,65,0)', duration: 1.5, ease: 'power2.out', overwrite: true },
    )
  }, [searching, firstKey])

  // "/" jumps to the search box, Escape lets you out.
  useEffect(() => {
    const onKey = (event) => {
      const typing = ['INPUT', 'TEXTAREA'].includes(event.target.tagName)
      if (event.key === '/' && !typing) {
        event.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
      }
      if (event.key === 'Escape' && typing) {
        setDraft('')
        patch({ q: null })
        inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [patch])

  const toggleTag = (id) => {
    setTags((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const clearAll = () => {
    setDraft('')
    setTags(new Set())
    patch({ q: null, seccion: null })
  }

  useGSAP(
    () => {
      gsap.from('[data-explore]', {
        y: 18,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.06,
      })
    },
    { dependencies: [] },
  )

  return (
    <div className="explorer" data-explorer>
      {/* ------------------------------------------------ the search box */}
      <div className="explorer__bar" data-explore>
        <div className="search">
          <svg viewBox="0 0 24 24" className="search__icon" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.5 15.5L21 21" />
          </svg>

          <input
            ref={inputRef}
            type="search"
            className="search__input"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value)
              patch({ q: event.target.value || null })
            }}
            placeholder="Buscar un plato, un trago, una marca..."
            aria-label="Buscar en la carta"
            autoComplete="off"
            spellCheck="false"
          />

          {draft ? (
            <button
              type="button"
              className="search__clear"
              onClick={() => {
                setDraft('')
                patch({ q: null })
                inputRef.current?.focus()
              }}
            >
              <span className="sr-only">Limpiar busqueda</span>
              <span aria-hidden="true">×</span>
            </button>
          ) : (
            <kbd className="search__kbd" aria-hidden="true">
              /
            </kbd>
          )}
        </div>

        <div className="explorer__bar-side">
          <p className="explorer__count" aria-live="polite">
            {searching ? (
              <>
                <strong className="tnum">{results.length}</strong> {results.length === 1 ? 'coincidencia' : 'coincidencias'}
              </>
            ) : (
              <>
                <strong className="tnum">{tagFiltered.length}</strong> {tagFiltered.length === 1 ? 'plato' : 'platos'}
              </>
            )}
          </p>

          <div className="toggle" role="group" aria-label="Alcance de la busqueda">
            {[
              { id: 'seccion', label: 'Esta seccion' },
              { id: 'carta', label: 'Toda la carta' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                className={`toggle__btn ${scope === option.id ? 'is-on' : ''}`}
                aria-pressed={scope === option.id}
                onClick={() => patch({ todo: option.id === 'carta' ? '1' : null })}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="toggle" role="group" aria-label="Forma de ver la carta">
            {VIEWS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`toggle__btn ${view === option.id ? 'is-on' : ''}`}
                aria-pressed={view === option.id}
                onClick={() => patch({ vista: option.id === 'cards' ? 'cards' : null })}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ sections */}
      <nav className="section-nav" aria-label="Secciones de la carta" data-explore>
        <div className="section-nav__track">
          <Pill
            active={scope === 'carta' && !searching}
            onClick={() => patch({ seccion: null, todo: '1' })}
            title="Ver toda la carta de una vez"
          >
            Toda la carta
            <span className="pill__count tnum">{allItems.length}</span>
          </Pill>
          {menu.categorias.map((item) => (
            <Pill
              key={item.id}
              active={scope === 'seccion' && !searching && item.id === category.id}
              onClick={() => {
                setTags(new Set())
                patch({ seccion: item.id, todo: null })
              }}
            >
              {item.nombre}
              <span className="pill__count tnum">{item.total}</span>
            </Pill>
          ))}
        </div>
      </nav>

      {/* ------------------------------------------------ filters */}
      {tagPills.length ? (
        <div className="filter-bar" data-explore>
          <span className="filter-bar__label">Filtros</span>
          <div className="pill-row">
            <Pill active={tags.size === 0} onClick={() => setTags(new Set())}>
              Todos
            </Pill>
            {tagPills.map((tag) => (
              <Pill key={tag.id} active={tags.has(tag.id)} onClick={() => toggleTag(tag.id)}>
                {tag.label}
                <span className="pill__count tnum">{tag.count}</span>
              </Pill>
            ))}
          </div>
        </div>
      ) : null}

      {/* ------------------------------------------------ the carta */}
      {searching || scope === 'carta' ? (
        <div className="explorer__head" data-explore>
          <p className="kicker">{searching ? 'Resultados' : `${category.nombre} · toda la carta`}</p>
          {searching ? (
            <h2 className="display display--m">
              {tokens.map((token, i) => (
                <span key={`${token}-${i}`}>
                  «{token}»
                  {i < tokens.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>
          ) : (
            <h2 className="display display--m">{category.nombre}</h2>
          )}
          {category.blurb ? <p className="lede">{category.blurb}</p> : null}
        </div>
      ) : null}

      <div ref={listRef} className="explorer__results">
        {sections.length === 0 ? (
          <div className="empty">
            <p className="empty__title display display--s">No encontramos nada con eso</p>
            <p className="muted">
              {searching
                ? 'Probá con menos palabras, o con el nombre del trago o del plato.'
                : 'No hay platos con esos filtros.'}
            </p>
            <button type="button" className="btn btn--sm" onClick={clearAll}>
              Limpiar todo
            </button>
          </div>
        ) : null}

        {sections.map((section) => (
          <div key={section.id} className="explorer__section">
            {searching || scope === 'carta' ? (
              <header className="explorer__section-head">
                <h3 className="display display--s">
                  {section.categoryName}
                  <span className="explorer__section-group"> · {section.name}</span>
                </h3>
                <span className="menu-group__count tnum" aria-hidden="true">
                  {section.entries.length}
                </span>
              </header>
            ) : null}

            {view === 'cards' ? (
              <ul className="dish-grid">
                {section.entries.map(({ item, ranges }) => (
                  <MenuItemCard
                    key={item.key}
                    item={item}
                    ranges={ranges}
                    first={item.key === firstKey}
                    showCategory={searching || scope === 'carta'}
                    categoryName={section.categoryName}
                  />
                ))}
              </ul>
            ) : (
              <MenuGroup
                group={{
                  id: section.id,
                  name: section.name,
                  note: section.note,
                  items: section.entries.map((entry) => entry.item),
                }}
                matches={matchesByKey}
                firstKey={firstKey}
                showCategory={searching || scope === 'carta'}
                categoryName={section.categoryName}
              />
            )}
          </div>
        ))}

        {capped ? (
          <p className="explorer__cap muted">
            Mostrando los primeros {RESULT_CAP} resultados de {results.length}. Afina la busqueda para ver el resto.
          </p>
        ) : null}
      </div>
    </div>
  )
}
