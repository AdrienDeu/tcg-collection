import { useState } from 'react'

function QuantityControl({ initialQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity)

  function handleDecrement() {
    setQuantity((currentQuantity) => Math.max(0, currentQuantity - 1))
  }

  function handleIncrement() {
    setQuantity((currentQuantity) => currentQuantity + 1)
  }

  return (
    <div className="quantity-control">
      <button
        type="button"
        aria-label="Retirer un exemplaire"
        onClick={handleDecrement}
        disabled={quantity === 0}
      >
        −
      </button>
      <strong>{quantity}</strong>
      <button
        type="button"
        aria-label="Ajouter un exemplaire"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  )
}

export default QuantityControl
