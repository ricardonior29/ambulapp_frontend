import React, { Component } from "react";
import M from "materialize-css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { enviarSolicitud } from "../../actions/authActions";

class DashboardAmbulancia extends Component {

  constructor() {
    super();
    this.state = {
      nivel_triaje: "",
      latitud: "",
      longitud: "",
      valoracion: "",
      paciente: {
        nombre: "",
        apellido: "",
        documento: "",
        edad: "",
        grupo_sanguineo: "",
        rh: "",
        condiciones: []
      },      
      ambulancia: "",
      solicitudEnviada: false//,
      /*embarazada: "",
      desplazado: "",
      victima_violencia: "",
      discapacitado: "",*/
    };
  }
  
 /* static navigationOptions = {
    headerTitle:'Disable back Options',
    headerTitleStyle: {color:'white'},
    headerStyle: {backgroundColor:'black'},
    headerTintColor: 'red',
    headerForceInset: {vertical: 'never'},
    headerLeft: " "
 }*/
 
  componentDidMount() {
    //set ambulancia in solicitud
    

    //form select para tipo de sangre
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, { inDuration: 300, outDuration: 255 });

    //button group para los niveles de triaje
    var nivelesTriaje = document.querySelectorAll('#botonesTriaje div label');
    for(var i = 0; i < 4; i++){
      let actual = nivelesTriaje[i]
      nivelesTriaje[i].addEventListener('click', () => {
        actual.classList.add('active');
        //set state
        //valorTriaje = this.firstChild.value
        this.setState({ nivel_triaje: actual.firstChild.value})
        const clicked = actual;
        const siblings = Array.prototype.filter.call(actual.parentNode.parentNode.children, function(child){
          return child.firstChild !== clicked;
        });
        for(var i = 0; i < siblings.length; i++){
          siblings[i].firstChild.classList.remove('active');
        }
      } )
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
    this.setState({ [e.target.id]: e.target.value,
      paciente: { ...this.state.paciente, [e.target.id]: e.target.value} }
      );
  };

  onChangeCondiciones = e => {
    const cond = document.querySelectorAll('input[type="checkbox"]:checked');
    var allCond = []
    for(var i = 0; i < cond.length; i++)
    {
      allCond.push(cond[i].value)
    }
    this.setState({paciente: { ...this.state.paciente, condiciones: allCond}});
  };

  onChangeTipoSangre = e => {
    if(e.target.nodeName === "SELECT")
    {
      //get selected option
      const elems = document.querySelectorAll('select');
      var instance = M.FormSelect.getInstance(elems[0]);
      var grupo = instance.input.value;
      this.setState({paciente: { ...this.state.paciente, grupo_sanguineo: grupo}});
    }
    else
    {
      //test radio button
      const selectedRH = document.querySelectorAll('input[name="rh"]:checked')[0].value;
      this.setState({paciente: { ...this.state.paciente, rh: selectedRH}});
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const newPaciente = {
      nombre: this.state.paciente.nombre,
      apellido: this.state.paciente.apellido,
      documento: this.state.paciente.documento,
      tipo_sangre: this.state.paciente.grupo_sanguineo + this.state.paciente.rh,
      edad: this.state.paciente.edad,
      condiciones: this.state.paciente.condiciones
    }

    const newPeticion = {
      nivel_triaje: this.state.nivel_triaje,
      valoracion: this.state.valoracion,
      paciente: newPaciente,
      latitud: this.state.latitud,
      longitud: this.state.longitud,
      ambulancia: this.state.ambulancia
    };
    // ----- REDUX - REACT -----
    //this.props.enviarSolicitud(newPeticion, this.props.history);
    console.log('solicitud ', JSON.stringify(newPeticion));
    this.setState({ solicitudEnviada: true });
    //console.log(this.state)
    //console.log(this.state.solicitudEnviada)
    //this.props.methodfromparent(this.state.solicitudEnviada);
    this.props.methodfromparent(true);
    // -------------------------
    // do something with form values, and then

  };

  render() {
    const { user } = this.props.auth;
  
    if ("geolocation" in navigator) {
      console.log("Geolocalización disponible");
      navigator.geolocation.getCurrentPosition(position => {
        /*console.log(position.coords.accuracy);
        console.log("Mi posición: "+position.coords.latitude+", "+position.coords.longitude);
        console.log("Posición del hospital: 7.063977,-73.086824"); */
        console.log("Distancia en km: "+getDistance(position.coords.latitude,position.coords.longitude,7.063977,-73.086824));
        this.setState({ latitud: position.coords.latitude, longitud: position.coords.longitude, ambulancia: user.id});
      });
    } else {
      console.log("Geolocalización no disponible");
    }

    return (
      <div style={{ textAlign: "left" }}>
        <div className="section no-pad-bot center" id="index-banner">
          <div className="container">
            <h4 className="header center light-blue-text">
              Formulario de Solicitud
            </h4>
            <div className="row">
              <form method="post" onSubmit={this.onSubmit} className="col s12">
                <div className="row">
                  <div className="input-field col s3 offset-m3">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      onChange={this.onChange}
                      value={this.state.paciente.nombre}
                      id="nombre"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="icon_prefix">Nombre</label>
                  </div>
                  <div className="input-field col s3 offset-3">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      onChange={this.onChange}
                      value={this.state.paciente.apellido}
                      id="apellido"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="icon_circle">Apellido</label>
                  </div>
                  <div className="input-field col s3 offset-m3">
                    <i className="material-icons prefix">credit_card</i>
                    <input
                      onChange={this.onChange}
                      value={this.state.paciente.documento}
                      id="documento"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="icon_card">Documento de identidad</label>
                  </div>
                  <div className="input-field col s3 offset-3">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      onChange={this.onChange}
                      value={this.state.paciente.edad}
                      id="edad"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="icon_circle">Edad</label>
                  </div>
                </div>
                <div className="row">
                  <div className="container col s8 offset-m2 offset-2" onChange={this.onChangeCondiciones}>
                    <p>
                      <label className="left">
                        <input type="checkbox" className="filled-in" value="embarazada"/>
                        <span>Embarazada</span>
                      </label>
                      <label className="col s3 offset-m1">
                        <input type="checkbox" className="filled-in" value="desplazado"/>
                        <span>Desplazado(a)</span>
                      </label>
                      <label>
                        <input type="checkbox" className="filled-in" value="victima_violencia"/>
                        <span>Víctima violencia</span>
                      </label>
                      <label className="right">
                        <input type="checkbox" className="filled-in" value="discapacitado"/>
                        <span>Discapacitado(a)</span>
                      </label>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="container col s6 offset-m3 offset-3">
                    <h6 className="header light-blue-text">
                      Selecciona el tipo de sangre
                    </h6>
                  </div>
                  <div className="input-field col s2 offset-m4">
                    <select defaultValue={'DEFAULT'} onChange={this.onChangeTipoSangre}>
                      <option value="DEFAULT" disabled>Grupo sanguíneo</option>
                      <option value="O">O</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                    </select>
                  </div>
                  <div className="input-field col s3 radioRequired">
                    <p>
                      <label className="left">
                        <input className="with-gap" name="rh" type="radio" value="+" onChange={this.onChangeTipoSangre}/>
                        <span>Positivo (+)</span>
                      </label>
                      <label>
                        <input className="with-gap" name="rh" type="radio" value="-" onChange={this.onChangeTipoSangre}/>
                        <span>Negativo (-)</span>
                      </label>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="container col s6 offset-m3 offset-3">
                    <h6 className="header light-blue-text">
                      Selecciona el nivel de Triaje
                    </h6>
                  </div>
                  <div className="container col s6 offset-m4 offset-4">
                    <br></br>
                    <div id="botonesTriaje" className="btn-group" data-toggle="buttons">
                    <div className="col s2">
                      <label className="btn-primary btn-floating btn-large" style={{backgroundColor: 'red',
                          boxShadow: 'inset 0 0 0 99999px rgba(255,255,255,0.5)'}}>
                        <input type="radio" name="options" id="option1" autoComplete="off" value="1"/><h5>1</h5>
                      </label>
                    </div>
                    <div className="col s2 offset-1">
                      <label className="btn-primary btn-floating btn-large" style={{backgroundColor: 'yellow',
                          boxShadow: 'inset 0 0 0 99999px rgba(255,255,255,0.5)'}}>
                        <input type="radio" name="options" id="option2" autoComplete="off" value="2"/><h5 className="black-text">2</h5>
                      </label>
                    </div>
                    <div className="col s2 offset-1">
                      <label className="btn-primary btn-floating btn-large" style={{backgroundColor: 'black',
                          boxShadow: 'inset 0 0 0 99999px rgba(255,255,255,0.5)'}}>
                        <input type="radio" name="options" id="option3" autoComplete="off" value="3"/><h5>3</h5>
                      </label>
                    </div>
                    <div className="col s2 offset-3">
                      <label className="btn-primary btn-floating btn-large" style={{backgroundColor: 'green',
                          boxShadow: 'inset 0 0 0 99999px rgba(255,255,255,0.5)'}}>
                        <input type="radio" name="options" id="option3" autoComplete="off" value="4"/><h5>4</h5>
                      </label>
                    </div>
                    </div>
                    <div className="col s1"></div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="container col s6 offset-m3 offset-3">
                    <h6 className="header light-blue-text">
                      Descripción del Triaje
                    </h6>
                  </div>

                  <div className="container col s6 offset-m3 offset-3">
                    <div className="row">
                      <div className="row">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">mode_edit</i>
                          <textarea
                            onChange={this.onChange}
                            value={this.state.valoracion}
                            id="valoracion"
                            type="text"
                            className="materialize-textarea"
                          ></textarea>
                          <label htmlFor="icon_prefix2">Descripción...</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container center top">
                  <button
                    type="submit"
                    id="enviar-button"
                    className="btn-large waves-effect waves-light blue"
                  >
                    {" "}
                    Enviar solicitud
                  </button>
                </div>
                <br></br>
                <br></br>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardAmbulancia.propTypes = {
  enviarSolicitud: PropTypes.func.isRequired,
  methodfromparent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  placa: PropTypes.string,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
    mapStateToProps,
    //{ methodfromparent },
  { enviarSolicitud }
)(DashboardAmbulancia);

function getDistance(lat1, lon1, lat2, lon2) {
  var toRad = Math.PI/180;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * toRad)/2 + 
          c(lat1 * toRad) * c(lat2 * toRad) * 
          (1 - c((lon2 - lon1) * toRad))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

//export default DashboardAmbulancia;