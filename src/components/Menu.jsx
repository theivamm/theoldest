import { memo } from 'react'
import { highlight } from '../lib/search.jsx'
import { price } from '../lib/format.js'
import { DishArt } from './DishArt.jsx'
import { TagList } from './Bits.jsx'

/**
 * One line of the carta.
 *
 * The name and the description get `<mark>` around the words you typed, so the
 * search reads like a highlighter pen over a printed menu rather than a list
 * that silently got shorter.
 */
export const MenuItemRow = memo(function MenuItemRow({
  item,
  ranges,
  first = false,
  showCategory = false,
  categoryName,
  groupName,
}) {
  return (
    <li
      className={`dish ${first ? 'is-first' : ''}`}
      data-key={item.key}
      data-kind={item.kind}
      data-first={first ? '' : undefined}
    >
      <DishArt kind={item.kind} name={item.name} className="dish__art" />

      <div className="dish__body">
        {showCategory ? (
          <p className="dish__origin">
            {categoryName}
            <span className="dish__origin-sep">·</span>
            {groupName}
          </p>
        ) : null}

        <h3 className="dish__name">
          {highlight(item.name, ranges?.name, 'n')}
          {item.favorite ? (
            <span className="dish__star" title="Favorito de la casa" aria-label="Favorito de la casa">
              ★
            </span>
          ) : null}
        </h3>

        {item.desc ? <p className="dish__desc">{highlight(item.desc, ranges?.desc, 'd')}</p> : null}
        {item.options ? (
          <p className="dish__options">{highlight(item.options, ranges?.options, 'o')}</p>
        ) : null}

        {item.tags.length ? <TagList tags={item.tags} max={4} /> : null}
      </div>

      <div className="dish__price">
        <span className="dish__leader" aria-hidden="true" />
        <span className={`dish__amount tnum ${item.price === null ? 'is-none' : ''}`}>{price(item.price)}</span>
        {item.priceNote ? <span className="dish__price-note">{item.priceNote}</span> : null}
      </div>
    </li>
  )
})

/** A titled block of dishes, the way a printed carta groups them. */
export function MenuGroup({ group, matches, firstKey, showCategory, categoryName }) {
  return (
    <section className="menu-group" id={group.id} data-group={group.id}>
      <header className="menu-group__head">
        <h3 className="menu-group__title display display--s">{group.name}</h3>
        <span className="menu-group__count tnum" aria-hidden="true">
          {group.items.length}
        </span>
        {group.note ? <p className="menu-group__note">{group.note}</p> : null}
      </header>
      <ul className="menu-list">
        {group.items.map((item) => {
          const match = matches?.get(item.key)
          return (
            <MenuItemRow
              key={item.key}
              item={item}
              ranges={match?.ranges}
              first={item.key === firstKey}
              showCategory={showCategory}
              categoryName={categoryName}
              groupName={group.name}
            />
          )
        })}
      </ul>
    </section>
  )
}

/** Card layout, for when you want to see the pictures of everything. */
export function MenuItemCard({ item, ranges, first = false, showCategory = false, categoryName }) {
  return (
    <li className={`dish-card ${first ? 'is-first' : ''}`} data-key={item.key} data-first={first ? '' : undefined}>
      <DishArt kind={item.kind} name={item.name} className="dish-card__art" showLabel />
      <div className="dish-card__body">
        {showCategory ? <p className="dish-card__origin">{categoryName}</p> : null}
        <h3 className="dish-card__name">{highlight(item.name, ranges?.name, 'n')}</h3>
        {item.desc ? <p className="dish-card__desc">{highlight(item.desc, ranges?.desc, 'd')}</p> : null}
        {item.tags.length ? <TagList tags={item.tags} max={3} /> : null}
        <p className="dish-card__price tnum">{price(item.price)}</p>
      </div>
    </li>
  )
}
