import './index.css'
import CardTile from './components/CardTile.jsx'
import Panel from './components/Panel.jsx'
import {
  SAMPLE_CARDS,
  collectionValue,
  copyCount,
  formatPrice,
} from './domain/card.js'

console.log('Élément avec props :', <CardTile card={SAMPLE_CARDS[0]} />)

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
        <div className="grid">
          <CardTile card={SAMPLE_CARDS[0]} />
          <CardTile card={SAMPLE_CARDS[1]} />
          <CardTile card={SAMPLE_CARDS[2]} />
        </div>
      </Panel>
    </main>
  )
}

export default App
