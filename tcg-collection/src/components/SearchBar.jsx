import { parseRarity, RARITIES } from '../domain/card.js'

export function SearchBar({
  query,
  onQueryChange,
  rarity,
  onRarityChange,
}) {
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
