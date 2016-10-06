import {
        getNotes,
        getNote,
        createNote,
        updateNote,
        destroyNote
      } from '../util/note_api_util.js'

import {
        requestNotes,
        requestNote,
        receiveNotes,
        receiveNote,
        removeNote,
        receiveErrors,
        REQUEST_NOTES,
        REQUEST_NOTE,
        CREATE_NOTE,
        UPDATE_NOTE,
        DESTROY_NOTE
      } from '../actions/note_actions.js'


export default ({getState, dispatch}) => next => action => {
  const notesSuccess = notes => dispatch(receiveNotes(notes));
  const noteSuccess = note => dispatch(receiveNote(note));
  const noteRemoved = note => dispatch(removeNote(note));
  const noteError = xhr => {
    const errors = xhr.responseJSON;
    dispatch(receiveErrors(errors));
  };

  switch(action.type) {
    case REQUEST_NOTES:
      getNotes(notesSuccess, noteError);
      break;
    case REQUEST_NOTE:
      getNote(notesSuccess, noteError);
      break;
    case CREATE_NOTE:
      createNote(action.note, noteSuccess, noteError);
      break;
    case UPDATE_NOTE:
      updateNote(action.note, noteSuccess, noteError);
      break;
    case DESTROY_NOTE:
      destroyNote(action.note, noteRemoved, noteError);
      break;
    default:
      next(action);
  }
}