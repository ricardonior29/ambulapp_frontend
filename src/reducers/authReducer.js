// Reducers are pure functions that specify how application state should change in response to an action. 
// Reducers respond with the new state, which is passed to store.js and, in turn, our UI.

import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  isambulance: false,
  solicitud: '',
  idsolicitud: '5da4f912dda04632e0cf90f1'
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        isambulance: action.isambulance
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case "GET_RESPONSE":
      return {
        ...state,
        solicitud: action.payload,
        idsolicitud: action.idSolicitud
      }
    default:
      return state;
  }
}
