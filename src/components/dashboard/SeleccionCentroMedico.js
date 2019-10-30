import React, { Component } from "react";
import Countdown from "./Countdown";

const styleImg = {
    maxWidth: "50%",
    textAlign: "left",
    margin: 'auto',
    padding: 'auto',
}

const host = 'https://ambulapp-main-server.herokuapp.com/api';

class CardCentroMedico extends Component {
    render() {
        return (
            <div>
                <br /><br />
                <div className="card" style={styleImg}>
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src={this.props.img} alt="HUS" />
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4"><b>{this.props.nombre}</b></span>
                        <p>{this.props.dir}</p>
                        <p>Distancia estimada de aproximadamente {Math.ceil(this.props.distancia, 2)} km</p>
                    </div>
                </div>
            </div>
        );
    }
}

class SeleccionCentroMedico extends Component {

    constructor() {
        super();
        this.parentmethod = this.parentmethod.bind(this);
        this.state = {
            timeout: false,
            centromedico: '',
            rendered: false
        }
    }

    componentDidUpdate() {
        const centrosmedicos = host + '/centrosmedicos';
        let comp = this;
        if (this.state.timeout && !this.state.rendered) {
            let centromedico = {
                nombre: '',
                direccion: '',
                distancia: Number.MAX_VALUE,
                imagen: ''
            }

            fetch(centrosmedicos)
                .then(response => response.json())
                .then(data => {
                    var listaRtas = this.props.rtas
                    console.log(listaRtas)
                    if (listaRtas === undefined) {
                        console.log('no hay respuestas')
                        for (var k = 0; k < data.length; k++) {
                            var d = getDistance(data[k].latitud, data[k].longitud, this.props.latitud, this.props.longitud);
                            console.log(data[k].nombre, d)
                            if (d < centromedico.distancia) {
                                centromedico = {
                                    nombre: data[k].nombre,
                                    direccion: data[k].direccion,
                                    distancia: d,
                                    imagen: data[k].imagen
                                }
                                comp.setState({ centromedico: centromedico, rendered: true })
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < listaRtas.length; i++) {
                            if (listaRtas[i].aceptada === 'true') {
                                for (var j = 0; j < data.length; j++) {
                                    if (data[j]._id === listaRtas[i].id) {
                                        var distancia = getDistance(data[j].latitud, data[j].longitud, this.props.latitud, this.props.longitud);
                                        if (distancia < centromedico.distancia) {
                                            centromedico = {
                                                nombre: data[j].nombre,
                                                direccion: data[j].direccion,
                                                distancia: distancia,
                                                imagen: data[k].imagen
                                            }
                                            comp.setState({ centromedico: centromedico, rendered: true })
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
        }
    }

    parentmethod(estado) {
        this.setState({
            timeout: estado
        });
    }

    render() {
        return (
            <div>
                {this.state.timeout ?
                    <CardCentroMedico nombre={this.state.centromedico.nombre} dir={this.state.centromedico.direccion} distancia={this.state.centromedico.distancia} img={this.state.centromedico.imagen} /> :
                    <Countdown methodfromparent={this.parentmethod} />}
            </div>
        );
    }
}

function getDistance(lat1, lon1, lat2, lon2) {
    var toRad = Math.PI / 180;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * toRad) / 2 +
        c(lat1 * toRad) * c(lat2 * toRad) *
        (1 - c((lon2 - lon1) * toRad)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export default SeleccionCentroMedico;