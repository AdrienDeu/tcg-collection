import './index.css'
import { useEffect, useState } from 'react'
import { fetchCards } from './api/cards.js'
import CardGrid from './components/CardGrid.jsx'
import Panel from './components/Panel.jsx'
import { SearchBar } from './components/SearchBar.jsx'
import Summary from './components/Summary.jsx'
import {
  collectionValue,
  formatPrice,
} from './domain/card.js'

function App() {
  const [state, setState] = useState({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const [query, setQuery] = useState('')
  const [rarity, setRarity] = useState('toutes')

  useEffect(() => {
    let ignore = false

    fetchCards()
      .then((loadedCards) => {
        if (!ignore) {
          setState({ status: 'success', cards: loadedCards })
        }
      })
      .catch((error) => {
        if (!ignore) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : String(error),
          })
        }
      })

    return () => {
      ignore = true
    }
  }, [attempt])

  const cards = state.status === 'success' ? state.cards : []

  function updateCards(transform) {
    setState((previous) =>
      previous.status === 'success'
        ? { status: 'success', cards: transform(previous.cards) }
        : previous,
    )
  }

  function handleQuantityChange(id, delta) {
    updateCards((previous) =>
      previous.map((card) =>
        card.id === id
          ? { ...card, quantity: Math.max(0, card.quantity + delta) }
          : card,
      ),
    )
  }

  function handleRemove(id) {
    updateCards((previous) => previous.filter((card) => card.id !== id))
  }

  function handleResetQuantities() {
    updateCards((previous) =>
      previous.map((card) => ({ ...card, quantity: 1 })),
    )
  }

  function handleRetry() {
    setState({ status: 'loading' })
    setAttempt((previous) => previous + 1)
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
  const value = collectionValue(cards)

  useEffect(() => {
    document.title = `Ma collection (${formatPrice(value)})`
  }, [value])

  if (state.status === 'loading') {
    return <main className="App">Chargement de la collection…</main>
  }

  if (state.status === 'error') {
    return (
      <main className="App">
        <p className="error">{state.message}</p>
        <button type="button" onClick={handleRetry}>
          Réessayer
        </button>
      </main>
    )
  }

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
