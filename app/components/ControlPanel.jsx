import React from 'react';
import { setNote, setScale, toggleNotes } from '../actions'
import { Note, Interval, Distance, Scale, Chord } from "tonal";
import { List } from 'immutable'
import styled from 'styled-components';
import titleize from 'titleize';

const Label = styled.label`
  display: block;
`

const octaves = ['', 1, 2, 3, 4, 5]

let ControlPanel = props => {
  window.Note, window.Scale = Note, Scale
  const { handleSubmit, store } = props
  const { note, scale, octave } = store.getState()
  const scaleNames = Scale.names().map( name => { return { label: name, value: name } } )
  const noteNames = List(octaves).flatMap(o => {
    return Scale.notes(`${note} ${scale}`).map(name => {
      const noteName = Note.pc(name)
      const label = `${noteName}${o}`
      return { label: label, value: label }
    } )
  })

  return <form onSubmit={handleSubmit}>
    <div>
      <Label htmlFor="scale">Scale</Label>
      <select name="scale" value={scale} onChange={ e => { store.dispatch(setScale(e.target.value)) } }>
        {scaleNames.map(({ value, label}) =>
          <option key={`scale-option-${value}`} value={value}>{titleize(label)}</option>
        )}
      </select>
      <Label htmlFor="note">Note</Label>
      <select name="note" value={note} onChange={ e => { store.dispatch(setNote(e.target.value)) } }>
        {noteNames.map(({ value, label}) =>
          <option key={`note-option-${value}`} value={value}>{label}</option>
        )}
      </select>
      <br/>
      <button onClick={e => { store.dispatch(toggleNotes()); e.preventDefault(); } }>Toggle Notes</button>
    </div>
  </form>
}

export default ControlPanel;