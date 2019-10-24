import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerMedico } from "../../actions/authActions";
import classnames from "classnames";
import Header from "../layout/Header";

class RegisterMedico extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      direccion: "",
      latitud: "",
      longitud: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  // componentDidMount() {
  //   // If logged in and user navigates to Login page, should redirect them to dashboard
  //   if (this.props.auth.isAuthenticated) {

  //     if (this.props.auth.isambulance) {    
  //       this.props.history.push("ambulancia/dashboard");
  //     }else{
  //       this.props.history.push("centromedico/dashboard");
  //     }
  //   }
  // }
  
  // ----- REDUX - REACT -----
  componentWillReceiveProps(nextProps) {
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

    const newMedico = {
      nombre: this.state.nombre,
      direccion: this.state.direccion,
      latitud: this.state.latitud,
      longitud: this.state.longitud,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    console.log(newMedico);

    // ----- REDUX - REACT -----
    this.props.registerMedico(newMedico, this.props.history);
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
                <h5>Registro de cuenta para Centros Médicos</h5>
                <p className="grey-text text-darken-1">
                  Ya tiene una cuenta? <Link to="/login">Log in</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.nombre}
                    error={errors.nombre}
                    id="nombre"
                    type="text"
                    className={classnames("", {
                      invalid: errors.nombre,
                    })}
                  />
                  <label htmlFor="nombre">Nombre</label>
                  <span className="red-text">{errors.nombre}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.direccion}
                    error={errors.direccion}
                    id="direccion"
                    type="text"
                    className={classnames("", {
                      invalid: errors.direccion,
                    })}
                  />
                  <label htmlFor="direccion">Direccion</label>
                  <span className="red-text">{errors.direccion}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.latitud}
                    error={errors.latitud}
                    id="latitud"
                    type="number"
                    className={classnames("", {
                      invalid: errors.latitud,
                    })}
                  />
                  <label htmlFor="latitud">Latitud</label>
                  <span className="red-text">{errors.latitud}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.longitud}
                    error={errors.longitud}
                    id="longitud"
                    type="number"
                    className={classnames("", {
                      invalid: errors.longitud,
                    })}
                  />
                  <label htmlFor="longitud">Longitud</label>
                  <span className="red-text">{errors.longitud}</span>
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
RegisterMedico.propTypes = {
  registerMedico: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { registerMedico }
)(withRouter(RegisterMedico));
