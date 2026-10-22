import './index.css'
import CardGrid from './components/CardGrid.jsx'
import Panel from './components/Panel.jsx'
import {
  SAMPLE_CARDS,
  collectionValue,
  copyCount,
  formatPrice,
} from './domain/card.js'

function App() {
  return (
    <main className="App">
      <header className="app-header" />
      <h1>Ma collection TCG</h1>
      <p className="summary">
        {SAMPLE_CARDS.length} cartes · {copyCount(SAMPLE_CARDS)} exemplaires ·{' '}
        {formatPrice(collectionValue(SAMPLE_CARDS))}
      </p>
      <Panel title="Mes cartes">
        <CardGrid cards={SAMPLE_CARDS} />
      </Panel>
    </main>
  )
}

export default App
