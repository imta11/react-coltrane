import React from 'react';
import ReactDOM from 'react-dom';
import GuitarChord from 'react-guitar-chords';
import styled from 'styled-components';
import { createStore } from 'redux';
import coletraneApp from './reducers'

/* Import App Components */
import AppPane from './components/AppPane';

const StyledApp = styled.section`
  background: papayawhip;
`

let store = createStore(
  coletraneApp,
  window.STATE_FROM_SERVER,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
;

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

ReactDOM.render(
  <StyledApp>
    <AppPane store={store} />
  </StyledApp>,
  document.getElementById('main')
);
