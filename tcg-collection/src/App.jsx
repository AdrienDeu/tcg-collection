import './index.css'
import { useState } from 'react'
import CardGrid from './components/CardGrid.jsx'
import Panel from './components/Panel.jsx'
import { SearchBar } from './components/SearchBar.jsx'
import Summary from './components/Summary.jsx'
import { collectionValue, formatPrice } from './domain/card.js'
import { useCards } from './hooks/useCards.js'
import { useDocumentTitle } from './hooks/useDocumentTitle.js'

function App() {
  const {
    state,
    retry,
    changeQuantity,
    removeCard,
    resetQuantities,
  } = useCards()
  const [query, setQuery] = useState('')
  const [rarity, setRarity] = useState('toutes')

  const cards = state.status === 'success' ? state.cards : []

  const normalizedQuery = query.trim().toLowerCase()
  const visibleCards = cards.filter((card) => {
    const matchesQuery =
      normalizedQuery === '' ||
      card.name.toLowerCase().includes(normalizedQuery) ||
      card.set.toLowerCase().includes(normalizedQuery)
    const matchesRarity = rarity === 'toutes' || card.rarity === rarity

    return matchesQuery && matchesRarity
  })
  const value = collectionValue(cards)
  useDocumentTitle(`Ma collection (${formatPrice(value)})`)

  if (state.status === 'loading') {
    return <main className="App">Chargement de la collection…</main>
  }

  if (state.status === 'error') {
    return (
      <main className="App">
        <p className="error">{state.message}</p>
        <button type="button" onClick={retry}>
          Réessayer
        </button>
      </main>
    )
  }

  return (
    <main className="App">
      <header className="app-header">
        <h1>Ma collection TCG</h1>
        <button type="button" onClick={resetQuantities}>
          Tout à 1 exemplaire
        </button>
      </header>
      <Summary cards={cards} />
      <Panel title={`Mes cartes (${visibleCards.length} / ${cards.length})`}>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          rarity={rarity}
          onRarityChange={setRarity}
        />
        <CardGrid
          cards={visibleCards}
          onQuantityChange={changeQuantity}
          onRemove={removeCard}
        />
      </Panel>
    </main>
  )
}

export default App
