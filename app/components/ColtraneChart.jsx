import React from 'react';
import ChordDiagram from 'react-chord-diagram';
import GuitarChord from 'react-guitar-chords';
import { setNote } from '../actions'
import styled from 'styled-components';

//This needs to match the array in Tuner.jsx
export const notes = [
  "C", "C#",  "D", " D#",  "E",  "F",  "F#",  "G", " G#",  "A",  "A#",  "B", 
  "C2","C2#", "D2", "D2#", "E2", "F2", "F2#", "G2", "G2#", "A2", "A2#", "B2", 
  "C3","C3#", "D3", "D3#", "E3", "F3", "F3#", "G3", "G3#", "A3", "A3#", "B3", 
  "C4","C4#", "D4", "D4#", "E4", "F4", "F4#", "G4", "G4#", "A4", "A4#", "B4", 
  "C5","C5#", "D5", "D5#", "E5", "F5", "F5#", "G5", "G5#", "A5", "A5#", "B5", 
];

const solarizedColors = [
  "#002b36",
  "#073642",
  "#586e75",
  "#657b83",
  "#839496",
  "#93a1a1",
  "#eee8d5",
  "#fdf6e3",
  "#b58900",
  "#cb4b16",
  "#dc322f",
  "#d33682",
  "#6c71c4",
  "#268bd2",
  "#2aa198",
  "#859900",
];

const Title = styled.h1`
  font-family: helvetica, arial, sans-serif;
  font-size: 2em;
  font-weight: bold;
  color: rgb(43, 114, 205);

`
const noteEventRegex = /component(\d+)-group(\d+)/i;

/* the main page for the index route of this app */
const ColtraneChart = function({store}) {
  return (
    <div>
      <Title>It's Music Times!</Title>
      <p>It sounds like you're playing...</p>
        <h1 id="note-name"></h1>
        <p>
          <span>frequency (Hz):</span>
          <span id="frequency"></span>
      </p>
      <div onClick={ e => {
          if(e.target.id.length > 0) {
            var [noteDomId, componentId, groupIndex] = e.target.id.match(noteEventRegex)
            console.log(`Chord Diagram ID: ${componentId} Note Index: ${groupIndex}`)
            store.dispatch(setNote(notes[groupIndex]))
          }
        }}>
        <ChordDiagram
          matrix={store.getState().noteTransitions}
          groupLabels={notes}
          groupColors={solarizedColors}
        />
      </div>
    </div>
  );
}

export default ColtraneChart;
