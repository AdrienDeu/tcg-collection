import { formatPrice, isRare } from '../domain/card.js'
import RarityBadge from './RarityBadge.jsx'
import QuantityControl from './QuantityControl.jsx'

function CardTile({ card }) {
  return (
    <article className={`card-tile rarity-${card.rarity}`}>
      <h3>{card.name}</h3>
      <RarityBadge rarity={card.rarity} />
      <p className="meta">{card.set}</p>
      {isRare(card) && <p className="highlight">★ Carte rare</p>}
      {card.quantity === 0 && (
        <p className="sold-out">Plus aucun exemplaire</p>
      )}
      <p className="price">{formatPrice(card.price)}</p>
      <QuantityControl initialQuantity={card.quantity} />
    </article>
  )
}

export default CardTile
