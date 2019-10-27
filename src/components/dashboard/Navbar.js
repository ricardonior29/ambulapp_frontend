import React, { Component } from "react";
import logo from "../../logo.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class NavBar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    
    render() {
        return (
        <nav className="grey darken-4">
            <div className="nav-wrapper">
                <img
                    className="responsive-img" alt="logo ambulapp"
                    style={{
                        maxWidth: "12%",
                        marginLeft: "10px",
                        marginTop: "15px",
                    }}
                    src={logo}
                />
                <ul className="right hide-on-med-and-down">
                    <li>{this.props.name}</li>
                    <li>
                        <a onClick={this.onLogoutClick} href="/#">
                            <i className="material-icons right">exit_to_app</i>
                            <b>SALIR</b>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        );}
}
NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(NavBar);