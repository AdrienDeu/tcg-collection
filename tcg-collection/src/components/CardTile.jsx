import { formatPrice } from '../domain/card.js'
import RarityBadge from './RarityBadge.jsx'

function CardTile({ card }) {
  return (
    <article className={`card-tile rarity-${card.rarity}`}>
      <h3>{card.name}</h3>
      <RarityBadge rarity={card.rarity} />
      <p className="meta">{card.set}</p>
      <p className="price">{formatPrice(card.price)}</p>
    </article>
  )
}

export default CardTile
