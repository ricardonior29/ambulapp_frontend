import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavBar from "./Navbar"
import FormSolicitud from "./FormSolicitud"
import SeleccionCentroMedico from "./SeleccionCentroMedico";

class DashboardAmbulancia extends Component {

  constructor() {
    super();
    this.parentmethod = this.parentmethod.bind(this);
    this.state = {
      estadoSolicitud: false,
      latitud: 0,
      longitud: 0,
      idsolicitud: '',
    }
  }

  // ----- REDUX - REACT -----
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.auth.solicitud)
    {
      this.setState({
        idsolicitud: nextProps.auth.idsolicitud
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
  };

  parentmethod(solicitudEnviada, lat, long, id) {
    this.setState({
      estadoSolicitud: solicitudEnviada,
      latitud: lat,
      longitud: long
    });
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="navbar-fixed" style={{ textAlign: "left" }}>
          <NavBar name = {user.placa}/>
        </div>
          {this.state.estadoSolicitud? <SeleccionCentroMedico latitud = {this.state.latitud} longitud = {this.state.longitud} idsolicitud ={this.state.idsolicitud}/> : <FormSolicitud methodfromparent = {this.parentmethod}/>}
      </div>
    );
  }
}

DashboardAmbulancia.propTypes = {
  auth: PropTypes.object.isRequired,
  placa: PropTypes.string,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps
)(DashboardAmbulancia);
