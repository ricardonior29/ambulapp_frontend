// Reducers are pure functions that specify how application state should change in response to an action. 
// Reducers respond with the new state, which is passed to store.js and, in turn, our UI.

import { GET_ERRORS } from "../actions/types";
const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
