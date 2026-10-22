import './index.css'
import { useState } from 'react'
import CardGrid from './components/CardGrid.jsx'
import Panel from './components/Panel.jsx'
import Summary from './components/Summary.jsx'
import { SAMPLE_CARDS } from './domain/card.js'

function App() {
  const [cards, setCards] = useState(SAMPLE_CARDS)

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

  return (
    <main className="App">
      <header className="app-header">
        <h1>Ma collection TCG</h1>
        <button type="button" onClick={handleResetQuantities}>
          Tout à 1 exemplaire
        </button>
      </header>
      <Summary cards={cards} />
      <Panel title="Mes cartes">
        <CardGrid
          cards={cards}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      </Panel>
    </main>
  )
}

export default App
