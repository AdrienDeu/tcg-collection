import { useEffect, useRef } from 'react'
import { parseRarity, RARITIES } from '../domain/card.js'

export function SearchBar({
  query,
  onQueryChange,
  rarity,
  onRarityChange,
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onQueryChange('')
      }
      if (event.key === '/' && document.activeElement !== inputRef.current) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onQueryChange])

  return (
    <div className="toolbar" role="search">
      <label>
        Recherche
        <input
          type="search"
          ref={inputRef}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>
      <button
        type="button"
        disabled={query === ''}
        onClick={() => {
          onQueryChange('')
          inputRef.current?.focus()
        }}
      >
        Effacer
      </button>
      <label>
        Rareté
        <select
          value={rarity}
          onChange={(event) =>
            onRarityChange(parseRarity(event.target.value) ?? 'toutes')
          }
        >
          <option value="toutes">Toutes</option>
          {RARITIES.map((rarityOption) => (
            <option key={rarityOption} value={rarityOption}>
              {rarityOption}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
