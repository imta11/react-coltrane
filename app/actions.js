/*
 * action types
 */

export const SET_NOTE = 'SET_NOTE'
export const SET_SCALE = 'SET_SCALE'
export const TOGGLE_NOTES = 'TOGGLE_NOTES'

/*
 * action creators
 */

export function toggleNotes() {
    return { type: TOGGLE_NOTES }
}

export function setNote(note) {
    toggleNotes(note);
    return { type: SET_NOTE, note }
}

export function setScale(scale) {
    return { type: SET_SCALE, scale }
}