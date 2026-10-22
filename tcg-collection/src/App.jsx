import './index.css'
import { useState } from 'react'
import CardGrid from './components/CardGrid.jsx'
import Panel from './components/Panel.jsx'
import { SearchBar } from './components/SearchBar.jsx'
import Summary from './components/Summary.jsx'
import { SAMPLE_CARDS } from './domain/card.js'

function App() {
  const [cards, setCards] = useState(SAMPLE_CARDS)
  const [query, setQuery] = useState('')
  const [rarity, setRarity] = useState('toutes')

  function handleQuantityChange(id, delta) {
    setCards((previous) =>
      previous.map((card) =>
        card.id === id
          ? { ...card, quantity: Math.max(0, card.quantity + delta) }
          : card,
      ),
    )
  }

  function handleRemove(id) {
    setCards((previous) => previous.filter((card) => card.id !== id))
  }

  function handleResetQuantities() {
    setCards((previous) =>
      previous.map((card) => ({ ...card, quantity: 1 })),
    )
  }

  const normalizedQuery = query.trim().toLowerCase()
  const visibleCards = cards.filter((card) => {
    const matchesQuery =
      normalizedQuery === '' ||
      card.name.toLowerCase().includes(normalizedQuery) ||
      card.set.toLowerCase().includes(normalizedQuery)
    const matchesRarity = rarity === 'toutes' || card.rarity === rarity

    return matchesQuery && matchesRarity
  })

  return (
    <main className="App">
      <header className="app-header">
        <h1>Ma collection TCG</h1>
        <button type="button" onClick={handleResetQuantities}>
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
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      </Panel>
    </main>
  )
}

export default App
