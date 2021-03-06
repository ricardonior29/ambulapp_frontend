import replication from "../utils/replication";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

export const registerAmbulancia = (userData, history) => dispatch => {
  replication.test().then(base => {
    axios
      .post(base + "/ambulancias/register", userData)
      .then(res => history.push("/login")) // re-direct to login on successful register
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  });
};

export const registerMedico = (userData, history) => dispatch => {
  replication.test().then(base => {
    axios
      .post(base + "/centrosmedicos/register", userData)
      .then(res => history.push("/login")) // re-direct to login on successful register
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  });
};

export const enviarSolicitud = (userData, history) => dispatch => {
  replication.test().then(base => {
    axios
      .post(base + "/solicitudes/nueva", userData)
      .then(res => {
        dispatch({
          type: "GET_RESPONSE",
          payload: res.data,
          idsolicitud: res.data._id
        })
        //history.push("/countdown") // re-direct to login on successful register
      }) 
      .catch(err => {
        console.log(err)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })}
      );
  });
};

/*export const getSolicitudes = (userData, history) => dispatch => {
  replication.test().then(base => {
    axios
      .get(base + "/solicitudes/filter", userData)
      .then((data) => {
        console.log('Update Complete');
        this.setState({ classroom: data })
      }) // re-direct to login on successful register
      .catch(err =>
        dispatch(
          {
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  });
};*/

// Login - get user token
export const loginUser = userData => dispatch => {
  replication.test().then(base => {
    axios
      .post(base + "/users/login", userData)
      .then(res => {
        // Save to localStorage// Set token to localStorage
        const { token, isambulance } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        //var isAmbulancia = decoded

        // Set current user
        dispatch(setCurrentUser(decoded, isambulance));
      })
      .catch(err => {
        console.info(err.config);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  });
}; // Set logged in user
export const setCurrentUser = (decoded, a) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    isambulance: a,
  };
}; // User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
}; // Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
