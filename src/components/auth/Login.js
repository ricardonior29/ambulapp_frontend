import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Header from "../layout/Header";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  /*componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("ambulancia/dashboard");
    }
  }*/

  // ----- REDUX - REACT -----
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      if (nextProps.auth.isambulance)
        this.props.history.push("ambulancia/dashboard");
      // push user to dashboard when they login
      else this.props.history.push("centromedico/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  // -------------------------

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    // ----- REDUX - REACT -----
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    // -------------------------

    console.log(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <br></br>
        <br></br>
        <Header />
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left"> keyboard_backspace </i>{" "}
                INICIO
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4> Inicio de sesión </h4>
                <p className="grey-text text-darken-1">
                  No ha registrado una cuenta ?<Link to="/"> Registro </Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email,
                    })}
                  />
                  <label htmlFor="email"> Email </label>
                  <span className="red-text">{errors.email}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password,
                    })}
                  />
                  <label htmlFor="password"> Password </label>
                  <span className="red-text">{errors.password}</span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }}
                    type="submit"
                  >
                    iniciar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ----- REDUX - REACT -----
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
