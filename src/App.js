import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Landing from "./components/layout/Landing";
import PrivateRoute from "./components/private-route/PrivateRoute";

import RegisterAmbulancia from "./components/auth/RegisterAmbulancia";
import RegisterMedico from "./components/auth/RegisterMedico";
import Login from "./components/auth/Login";
import DashboardAmbulancia from "./components/dashboard/DashboardAmbulancia";
import DashboardMedico from "./components/docs/OpenApi";

import OpenApi from "./components/dashboard/DashboardMedico";

import { Provider } from "react-redux"; //used to manage state between components
import store from "./store";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info 
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser()); // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">  
          <Route exact path="/" component={Landing} />
          <Route exact path="/ambulancia/register" component={RegisterAmbulancia} />
          <Route exact path="/centromedico/register" component={RegisterMedico} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/openapi" component={OpenApi} />
          <Switch>
            <PrivateRoute exact path="/ambulancia/dashboard" component={DashboardAmbulancia} />
            <PrivateRoute exact path="/centromedico/dashboard" component={DashboardMedico} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
