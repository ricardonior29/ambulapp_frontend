import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

class Landing extends Component {
  render() {
    return (
      <div>
      <br></br><br></br>  
      <div className="row"><Header /></div>
        <div style={{ height: "55vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 top-align">
              <h4>¡Evita el paseo de la muerte!</h4>
              <br />
              <br />
              <div className="col s12">
                <Link
                  to="/login"
                  style={{
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large waves-effect hoverable white black-text"
                >
                  Iniciar sesión
                </Link>
              </div>
              <br />
              <br />
              <br />
              <br />
              <h5>Crear cuenta como:</h5>
              <br />
              <div className="row">
                <div className="center-align">
                  <div className="row col s12 l6">
                    <Link
                      to="/ambulancia/register"
                      style={{
                        width: "180px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                      }}
                      className="btn btn-large waves-effect waves-light hoverable blue lighten-1"
                    >
                      Ambulancia
                    </Link>
                  </div>                 
                  <div className="row col s12 l6">
                    <Link
                      to="/centromedico/register"
                      style={{
                        width: "200px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                      }}
                      className="btn btn-large waves-effect waves-light hoverable red lighten-1 "
                    >
                      Centro Médico
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
