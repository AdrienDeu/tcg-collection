import { useState } from 'react'
import Panel from './Panel.jsx'

function CardNotes({ card }) {
  const [note, setNote] = useState('')

  return (
    <Panel title={`Notes : ${card.name}`}>
      <div className="details">
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Écrivez une note..."
        />
        <p className="hint">{note.length} caractère(s), non enregistré.</p>
      </div>
    </Panel>
  )
}

export default CardNotes
