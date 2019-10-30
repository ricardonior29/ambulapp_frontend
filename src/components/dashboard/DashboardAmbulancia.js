import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavBar from "./Navbar"
import FormSolicitud from "./FormSolicitud"
//import Countdown from "./Countdown";
import SeleccionCentroMedico from "./SeleccionCentroMedico";

const host = 'https://ambulapp-main-server.herokuapp.com/api';

class DashboardAmbulancia extends Component {

  constructor() {
    super();
    this.parentmethod = this.parentmethod.bind(this);
    this.state = {
      estadoSolicitud: false,
      latitud: 0,
      longitud: 0,
      idSolicitud: '',
      respuestas: '',
      centros_medicos: []
    }
  }

  // ----- REDUX - REACT -----
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.auth.solicitud)
    {
      this.setState({
        idSolicitud: nextProps.auth.solicitud._id,
      });
    }
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
    // ----- REDUX - REACT -----
    //this.props.enviarSolicitud(newPeticion, this.props.history);
    // -------------------------
  };

  parentmethod(solicitudEnviada, lat, long) {
    this.setState({
      estadoSolicitud: solicitudEnviada,
      latitud: lat,
      longitud: long
    });

    const solicitud = host + '/solicitudes/' + this.state.idSolicitud;
        fetch(solicitud)
            .then(response => response.json())
            .then(data => {
                this.setState({
                  respuestas: data.centros_medicos
                });
            })
  }

  /*componentDidUpdate(){
    if(this.state.respuestas !== '')
    {
      
    }
    
  }*/

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="navbar-fixed" style={{ textAlign: "left" }}>
          <NavBar name = {user.placa}/>
        </div>
          {this.state.estadoSolicitud? <SeleccionCentroMedico latitud = {this.state.latitud} longitud = {this.state.longitud} rtas ={this.state.respuestas}/> : <FormSolicitud methodfromparent = {this.parentmethod}/>}
          
      </div>
    );
  }
}

DashboardAmbulancia.propTypes = {
  //enviarSolicitud: PropTypes.func.isRequired,
  //solicitudEnviada: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  placa: PropTypes.string,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps
)(DashboardAmbulancia);
