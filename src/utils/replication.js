import axios from "axios";

var main = "https://ambulapp-main-server.herokuapp.com/api";
var replica = "https://replica-ambulapp.herokuapp.com/api";
var activeService = main;

var Replication ={}

Replication.test = function() {
  activeService = "";

  return axios
    .get("https://ambulapp-main-server.herokuapp.com/api/test/1")
    .then(function(res) {
      if (res.status === 200) {
        activeService = main;
        console.log("Servidor principal activo");
      }
      //console.log("response1: " + res.status);
      console.log("Cambiado a "+activeService);
      return activeService
    })
    .catch(function(err) {
      if (err.statusCode === undefined) {
        console.log("Servidor principal caido");
        activeService = replica;
      }
      //console.log("error1: " + err.statusCode);
      console.log("Cambiado a "+activeService);
      return activeService
    });
}

export default Replication;
