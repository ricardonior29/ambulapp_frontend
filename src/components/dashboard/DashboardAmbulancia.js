import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavBar from "./Navbar"
import FormSolicitud from "./FormSolicitud"

class DashboardAmbulancia extends Component {

  /*constructor() {
    super();
  }*/


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

  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ textAlign: "left" }}>
        <div className="navbar-fixed">
          <NavBar name = {user.placa}/>
        </div>
          <FormSolicitud/>
      </div>
    );
  }
}

DashboardAmbulancia.propTypes = {
  //enviarSolicitud: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  placa: PropTypes.string,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps
)(DashboardAmbulancia);