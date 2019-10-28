import React, { Component } from "react";

const styleImg = {
    maxWidth: "50%",
    textAlign: "left",
    margin: 'auto',
    padding: 'auto',
}

class CentroMedicoSel extends Component {

    componentDidMount() {
        //
    }

    render() {
        return (
            <div className="card" style={styleImg}>
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src="http://noticias.canaltro.com/wp-content/uploads/2019/07/HUS-Bucarmanga.jpeg" alt="HUS" />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                    <p><a href="/#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
            </div>
        );
    }
}

export default CentroMedicoSel;