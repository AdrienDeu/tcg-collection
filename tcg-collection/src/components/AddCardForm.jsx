import { useState } from 'react'
import { parseRarity, RARITIES, SETS } from '../domain/card.js'

const EMPTY_DRAFT = {
  name: '',
  set: SETS[0],
  rarity: 'commune',
  price: '',
  quantity: '1',
}

function validate(draft) {
  const errors = []
  const name = draft.name.trim()
  const price = Number(draft.price)
  const quantity = Number(draft.quantity)

  if (name.length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères.')
  }
  if (draft.price.trim() === '' || !Number.isFinite(price) || price < 0) {
    errors.push('Le prix doit être un nombre positif ou nul.')
  }
  if (
    draft.quantity.trim() === '' ||
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    errors.push('La quantité doit être un entier supérieur ou égal à 1.')
  }

  return errors
}

function AddCardForm({ onAdd }) {
  const [draft, setDraft] = useState(EMPTY_DRAFT)
  const [submitted, setSubmitted] = useState(false)
  const errors = validate(draft)

  function update(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)

    if (errors.length > 0) {
      return
    }

    onAdd({
      name: draft.name.trim(),
      set: draft.set,
      rarity: draft.rarity,
      price: Number(draft.price),
      quantity: Number(draft.quantity),
    })
    setDraft(EMPTY_DRAFT)
    setSubmitted(false)
  }

  return (
    <form className="add-form" noValidate onSubmit={handleSubmit}>
      <label>
        Nom
        <input
          value={draft.name}
          onChange={(event) => update('name', event.target.value)}
        />
      </label>
      <label>
        Extension
        <select
          value={draft.set}
          onChange={(event) => update('set', event.target.value)}
        >
          {SETS.map((set) => (
            <option key={set} value={set}>
              {set}
            </option>
          ))}
        </select>
      </label>
      <label>
        Rareté
        <select
          value={draft.rarity}
          onChange={(event) =>
            update('rarity', parseRarity(event.target.value) ?? 'commune')
          }
        >
          {RARITIES.map((rarity) => (
            <option key={rarity} value={rarity}>
              {rarity}
            </option>
          ))}
        </select>
      </label>
      <label>
        Prix
        <input
          inputMode="decimal"
          value={draft.price}
          onChange={(event) => update('price', event.target.value)}
        />
      </label>
      <label>
        Quantité
        <input
          type="number"
          min="1"
          value={draft.quantity}
          onChange={(event) => update('quantity', event.target.value)}
        />
      </label>
      {submitted && errors.length > 0 && (
        <ul className="errors error">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <button type="submit">Ajouter la carte</button>
    </form>
  )
}

export default AddCardForm
