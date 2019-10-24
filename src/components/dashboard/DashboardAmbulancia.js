import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import M from "materialize-css";
import NavBar from "./Navbar"

class DashboardAmbulancia extends Component {

  constructor() {
    super();
    this.state = {
      nombre: "",
      apellido: "",
      documento: "",
      nivel_triaje: "",
      tipo_sangre: "",
      edad: "",
      valoración: "",

      latitud: "",
      longitud: "",
      ambulancia: "",

      embarazada: "",
      desplazado: "",
      victima_violencia: "",
      discapacitado: "",
    };
  }
  
  static navigationOptions = {
    headerTitle:'Disable back Options',
    headerTitleStyle: {color:'white'},
    headerStyle: {backgroundColor:'black'},
    headerTintColor: 'red',
    headerForceInset: {vertical: 'never'},
    headerLeft: " "
 }
 
  componentDidMount() {
    //form select para tipo de sangre
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, { inDuration: 300, outDuration: 255 });

    //button group para los niveles de triaje
    var nivelesTriaje = document.querySelectorAll('#botonesTriaje div label');
    for(var i = 0; i < nivelesTriaje.length; i++){
      nivelesTriaje[i].addEventListener('click', function(){ 
        this.classList.add('active');
        const clicked = this;
        const siblings = Array.prototype.filter.call(this.parentNode.parentNode.children, function(child){
          return child.firstChild !== clicked;
        });
        for(var i = 0; i < siblings.length; i++){
          siblings[i].firstChild.classList.remove('active');
        }
      } )
    }
  }

  // ----- REDUX - REACT -----
  componentWillReceiveProps(nextProps) {
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

    const newPeticion = {
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      documento: this.state.documento,
      nivel_triaje: this.state.nivel_triaje,
      tipo_sangre: this.state.tipo_sangre,
      edad: this.state.edad,
      valoración: this.state.valoración,

      latitud: this.state.latitud,
      longitud: this.state.longitud,
      ambulancia: this.state.ambulancia,

      embarazada: this.state.embarazada,
      desplazado: this.state.desplazado,
      victima_violencia: this.state.victima_violencia,
      discapacitado: this.state.discapacitado,
    };
    // ----- REDUX - REACT -----
    //this.props.enviarSolicitud(newPeticion, this.props.history);
    // -------------------------
  };

  render() {
    
    if ("geolocation" in navigator) {
      console.log("Geolocalización disponible");
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.accuracy);
        console.log("Mi posición: "+position.coords.latitude+", "+position.coords.longitude);
        console.log("Posición del hospital: 7.063977,-73.086824"); 
        console.log("Distancia en km: "+getDistance(position.coords.latitude,position.coords.longitude,7.063977,-73.086824));
        //this.state.latitud = position.coords.latitude;
        //this.state.longitud = position.coords.latitude;
      });
    } else {
      console.log("Geolocalización no disponible");
    }

    const { user } = this.props.auth;
    return (
      <div style={{ textAlign: "left" }}>
        <div className="navbar-fixed">
          <NavBar name = {user.placa}/>
        </div>
        <div className="section no-pad-bot center" id="index-banner">
          <div className="container">
            <h4 className="header center light-blue-text">
              Formulario de Solicitud
            </h4>
            <div className="row">
              <form noValidate onSubmit={this.onSubmit} className="col s12">
                <div className="row">
                  <div className="input-field col s3 offset-m3">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      onChange={this.onChange}
                      value={this.state.nombre}
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
                      value={this.state.apellido}
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
                      value={this.state.documento}
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
                      value={this.state.edad}
                      id="edad"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="icon_circle">Edad</label>
                  </div>
                </div>
                <div className="row">
                  <div className="container col s8 offset-m2 offset-2">
                    <p>
                      <label className="left">
                        <input type="checkbox" className="filled-in" />
                        <span>Embarazada</span>
                      </label>
                      <label className="col s3 offset-m1">
                        <input type="checkbox" className="filled-in" />
                        <span>Desplazado(a)</span>
                      </label>
                      <label>
                        <input type="checkbox" className="filled-in" />
                        <span>Víctima violencia</span>
                      </label>
                      <label className="right">
                        <input type="checkbox" className="filled-in" />
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
                    <select>
                      <option value="" disabled selected>Grupo sanguíneo</option>
                      <option value="O">O</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="B">AB</option>
                    </select>
                  </div>
                  <div className="input-field col s3">
                    <p>
                      <label className="left">
                        <input class="with-gap" name="group3" type="radio" checked />
                        <span>Positivo (+)</span>
                      </label>
                      <label>
                        <input class="with-gap" name="group3" type="radio" checked />
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
                      <label className="btn-primary btn-floating btn-large" style={{backgroundColor: 'green',
                          boxShadow: 'inset 0 0 0 99999px rgba(255,255,255,0.5)'}}>
                        <input type="radio" name="options" id="option1" autocomplete="off"/><h5>1</h5>
                      </label>
                    </div>
                    <div className="col s2 offset-1">
                      <label className="btn-primary btn-floating btn-large" style={{backgroundColor: 'yellow',
                          boxShadow: 'inset 0 0 0 99999px rgba(255,255,255,0.5)'}}>
                        <input type="radio" name="options" id="option2" autocomplete="off"/><h5 className="black-text">2</h5>
                      </label>
                    </div>
                    <div className="col s2 offset-1">
                      <label className="btn-primary btn-floating btn-large" style={{backgroundColor: 'red',
                          boxShadow: 'inset 0 0 0 99999px rgba(255,255,255,0.5)'}}>
                        <input type="radio" name="options" id="option3" autocomplete="off"/><h5>3</h5>
                      </label>
                    </div>
                    <div className="col s2 offset-3">
                      <label className="btn-primary btn-floating btn-large" style={{backgroundColor: 'black',
                          boxShadow: 'inset 0 0 0 99999px rgba(255,255,255,0.5)'}}>
                        <input type="radio" name="options" id="option3" autocomplete="off"/><h5>4</h5>
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
                    <div class="row">
                      <div class="row">
                        <div class="input-field col s12">
                          <i class="material-icons prefix">mode_edit</i>
                          <textarea
                            id="icon_prefix2"
                            class="materialize-textarea"
                          ></textarea>
                          <label for="icon_prefix2">Descripción...</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container center top">
                  <a
                    href="http://materializecss.com/getting-started.html"
                    id="enviar-button"
                    className="btn-large waves-effect waves-light blue"
                  >
                    {" "}
                    Enviar solicitud
                  </a>
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

function getDistance(lat1, lon1, lat2, lon2) {
  var toRad = Math.PI/180;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * toRad)/2 + 
          c(lat1 * toRad) * c(lat2 * toRad) * 
          (1 - c((lon2 - lon1) * toRad))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
