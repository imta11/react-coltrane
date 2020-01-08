import { SET_NOTE, SET_SCALE, TOGGLE_NOTES } from './actions'
import { moeScales, initialNoteTransitions } from './examples/songs'

function coletraneApp(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case TOGGLE_NOTES:
            return Object.assign({}, state, {
                noteTransitions: (
                    state.noteTransitions === initialNoteTransitions ? moeScales : initialNoteTransitions
                ),
            })
        case SET_NOTE:
            return Object.assign({}, state, { note: action.note });
        case SET_SCALE:
            return Object.assign({}, state, { scale: action.scale });
        default:
            return state
    }
}

const initialState = {
    note: 'C',
    scale: 'major',
    noteTransitions: initialNoteTransitions,
}

export default coletraneApp;