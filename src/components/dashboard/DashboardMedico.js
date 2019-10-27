import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavBar from "./Navbar"

let containerstyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    padding: 'auto',
};
let rowstyle = {
    alignItems: 'center',
    width: '300%',
    textAlign: 'center'
};

let { user } = 0;

class Solicitudes extends Component {
    constructor() {
        super()
        this.state = { solicitudes: [] }
    }

    componentDidMount() {
        var myRequest = 'https://ambulapp-main-server.herokuapp.com/api/solicitudes/filter/' + user.id;

        fetch(myRequest)
            .then(response => response.json())
            .then(data => {
                this.setState({ solicitudes: data })
            })
    }

    handleSubmit(event, idSolicitud, idCentroMedico, aceptada) {
        /*const {
          s
        } = this.state;*/
        event.preventDefault();

        // do something with form values, and then
        axios.post('/api/solicitudes/' + idSolicitud, {
            id: idCentroMedico,
            aceptada: aceptada.toString()
            // + any other parameters you want to send in the POST request
        }).then(response => {
            console.log('Respuesta exitosa del post');
            // do something with response, and on response
        }).catch(error => {
            console.log('error en el post');
            // do something when request was unsuccessful
        });
    }


    render() {
        user = this.props.auth.user;

        /*var listaSolicitudes = getSolicitudes();
        console.log(listaSolicitudes)
        const { listaSolicitudes } = this.props;*/

        function timeformat(fulldate) {
            const date = new Date(fulldate);
            return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            /*return date.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })*/
        }

        function colortriaje(numero) {
            var color = 'white'
            switch (numero) {
                case 1:
                    color = 'red'// accent-4'
                    break;
                case 2:
                    color = 'yellow'// darken-4'
                    break;
                case 3:
                    color = 'black'//'yellow accent-2'
                    break;
                default:
                    color = 'green'// darken-4'
            }
            return color;
        }

        const listItems = this.state.solicitudes.map((a, i) =>
            <li id={"solicitud_" + a.ID_solicitud} className="collection-item" style={{ borderLeft: '10px solid ' + colortriaje(a.nivel_triaje) , padding: '10px'}} key={'c' + a._id}>
                <div className="row valign-wrapper" style={{ margin: 0 , textAlign: 'center', padding: '0px'}}>
                    <div className="col s0.5">
                        <p className="collections-title"><b>{i + 1}</b></p>
                    </div>
                    <div className="col s2">
                        <p className="collections-content">{timeformat(a.fecha_creacion)}</p>
                    </div>
                    <div className="col s1" style={{margin: '0px', padding: '0px', alignContent: 'center'}}>
                        <span className={'new badge ' + colortriaje(a.nivel_triaje) + ' center-align'} data-badge-caption="" style={a.nivel_triaje === 2 ? { color: 'black', margin: 'auto'} : { color: 'white', margin: 'auto' }} >{'Nivel ' + a.nivel_triaje}</span>
                    </div>
                    <div className="col s4" style={{marginLeft: '40px'}}>
                        <p className="collections-content" align="justify" >{a.valoracion}</p>
                        {a.paciente.condiciones[0] ? <div className ='chip' align="left" style={{margin: '5px', color: 'rgb(171, 165, 165)'}}>Embarazada</div> : null}
                        {a.paciente.condiciones[1] ? <div className ='chip' align="left" style={{margin: '5px', color: 'rgb(171, 165, 165)'}}>Desplazado</div> : null}
                        {a.paciente.condiciones[2] ? <div className ='chip' align="left" style={{margin: '5px', color: 'rgb(171, 165, 165)'}}>Víctima de violencia</div> : null}
                        {a.paciente.condiciones[3] ? <div className ='chip' align="left" style={{margin: '5px', color: 'rgb(171, 165, 165)'}}>Discapacitado</div> : null}
                    </div>
                    <div className="col s2" style={{margin: '0px'}}>
                        <p className="collections-content">{a.paciente.edad ? a.paciente.edad + ' años' : 'Sin datos'} </p>
                    </div>
                    <div className="col s0.8">
                        <form
                            method="post"
                            onSubmit={event => {
                                this.handleSubmit(event, a._id, user.id, true);
                                this.setState({
                                    solicitudes: this.state.solicitudes.filter(function (solicitud) {
                                        console.log(solicitud)
                                        return solicitud !== a
                                    })
                                });
                            }}>
                            <button type="submit" className="waves-effect waves-light btn green accent-4">
                                <i className="material-icons">check</i>
                            </button>
                        </form>
                    </div>
                    <div className="col s0.8">
                        <form
                            method="post"
                            onSubmit={event => {
                                this.handleSubmit(event, a._id, user.id, false);
                                this.setState({
                                    solicitudes: this.state.solicitudes.filter(function (solicitud) {
                                        console.log(a)
                                        return solicitud !== a
                                    })
                                });
                            }}>
                            <button type="submit" className="waves-effect waves-light btn red accent-4">
                                <i className="material-icons">close</i>
                            </button>
                        </form>
                    </div>
                </div>
            </li>
        );

        return (
            <div style={{ textAlign: "left" }}>
                <div className="navbar-fixed">
                    <NavBar name = {user.nombre}/>
                </div>
                <div className="container" style={containerstyle}>
                    <div className="row " style={rowstyle}>
                        <div className="col s12 m12 l12 xl12">
                            <div id="work-collections">
                                <ul className="collection with-header">
                                    <li className="collection-header" style={{ borderLeft: '10px solid white' }}>
                                        <div className="row valign-wrapper" style={{ margin: 0 }} >
                                            <div className="col s1"><h6><b>#</b></h6></div>
                                            <div className="col s2"><h6><b>Hora</b></h6></div>
                                            <div className="col s1"><h6><b>Triaje</b></h6></div>
                                            <div className="col s5" style={{marginLeft: '50px'}}>
                                                <h6><b>Descripción de la emergencia</b></h6>
                                            </div>
                                            <div className="col s2.5"><h6><b>Edad del paciente</b></h6></div>
                                            <div className="col s1.6"><h6><b>Confirmar disponibilidad</b></h6></div>
                                        </div>
                                    </li>
                                    {listItems}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Solicitudes.propTypes = {
    auth: PropTypes.object.isRequired,
    placa: PropTypes.string
};
const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps
)(Solicitudes);