import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavBar from "./Navbar"
import FormSolicitud from "./FormSolicitud"
import Countdown from "./Countdown";

class DashboardAmbulancia extends Component {

  constructor() {
    super();
    this.parentmethod = this.parentmethod.bind(this);
    this.state = {
      estadoSolicitud: false
    }
  }

  // ----- REDUX - REACT -----
  UNSAFE_componentWillReceiveProps(nextProps) {
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
    // ----- REDUX - REACT -----
    //this.props.enviarSolicitud(newPeticion, this.props.history);
    // -------------------------
  };

  parentmethod(solicitudEnviada) {
    this.setState({
      estadoSolicitud: solicitudEnviada
    });
    //console.log(this.state)
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="navbar-fixed" style={{ textAlign: "left" }}>
          <NavBar name = {user.placa}/>
        </div>
          {this.state.estadoSolicitud? <Countdown/> : <FormSolicitud methodfromparent = {this.parentmethod}/>}
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