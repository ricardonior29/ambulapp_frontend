import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerAmbulancia } from "../../actions/authActions";
import classnames from "classnames";
import Header from "../layout/Header";

class RegisterAmbulancia extends Component {
  constructor() {
    super();
    this.state = {
      placa: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  // componentDidMount() {
  //   // If logged in and user navigates to Register page, should redirect them to dashboard
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/ambulancia/dashboard");
  //   }
  // }

  // ----- REDUX - REACT -----
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  // -------------------------
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const newAmbulancia = {
      placa: this.state.placa,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    //console.log(newAmbulancia);

    // ----- REDUX - REACT -----
    this.props.registerAmbulancia(newAmbulancia, this.props.history);
    // -------------------------
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <br></br>
        <br></br>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> INICIO
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h5>Registro de cuenta para ambulancias</h5>
                <p className="grey-text text-darken-1">
                  Ya tiene una cuenta? <Link to="/login">Log in</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    placeholder="Ej: ABC-123"
                    onChange={this.onChange}
                    value={this.state.placa}
                    error={errors.placa}
                    id="placa"
                    type="text"
                    className={classnames("", {
                      invalid: errors.placa,
                    })}
                  />
                  <label htmlFor="placa">Placa</label>
                  <span className="red-text">{errors.placa}</span>
                </div>
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
                  <label htmlFor="email">Email</label>
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
                  <label htmlFor="password">Contraseña</label>
                  <span className="red-text">{errors.password}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2,
                    })}
                  />
                  <label htmlFor="password2">Confirmar Contraseña</label>
                  <span className="red-text">{errors.password2}</span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "180px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Crear cuenta
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
RegisterAmbulancia.propTypes = {
  registerAmbulancia: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { registerAmbulancia }
)(withRouter(RegisterAmbulancia));
