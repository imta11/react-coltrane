import React from 'react';
import Fretboard, { fretMatrixForPc, fretMatrixForChord } from 'react-fretboard'

const width = 21
const tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']

const GuitarTab = ({store}) => {
  return (
    <Fretboard
      settings={ { showOctaves: true, showNotes: true, showPositions: true } }
      fretMatrix={ fretMatrixForChord(tuning, width, store.getState().note, true) }
    />
  );
}

export default GuitarTab;