import { useEffect } from 'react'
import { parseRarity, RARITIES } from '../domain/card.js'

export function SearchBar({
  query,
  onQueryChange,
  rarity,
  onRarityChange,
}) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onQueryChange('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    console.log('écouteur installé')

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      console.log('écouteur retiré')
    }
  }, [onQueryChange])

  return (
    <div className="toolbar" role="search">
      <label>
        Recherche
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>
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
