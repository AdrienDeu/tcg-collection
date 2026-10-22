import './index.css'
import CardTile from './components/CardTile.jsx'
import {
  SAMPLE_CARDS,
  collectionValue,
  copyCount,
  formatPrice,
} from './domain/card.js'

console.log('Élément :', <CardTile />)

function App() {
  return (
    <main className="App">
      <header className="app-header" />
      <h1>Ma collection TCG</h1>
      <p className="summary">
        {SAMPLE_CARDS.length} cartes · {copyCount(SAMPLE_CARDS)} exemplaires ·{' '}
        {formatPrice(collectionValue(SAMPLE_CARDS))}
      </p>
      <div className="grid">
        <CardTile />
        <CardTile />
        <CardTile />
      </div>
    </main>
  )
}

export default App
