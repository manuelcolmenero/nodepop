"use strict"
const leerArchivo     = require('./leerArchivo');     // Se importa la rutina de leerFicheros
const paqueteUsuarios = require('./paqueteUsuarios'); // Se importa las rutinas de BBDD de Usuarios

function cargaUsuarios(callback) {
  paqueteUsuarios.recuperarUsuarios( (err, datosJSON) => {

    if (err) {
      return callback (err);
    }
    let indice = 0;
    for (indice = 0; indice < datosJSON.length ; indice++) {
      paqueteUsuarios.borrarUsuarios (datosJSON[indice]._id, (err, usuarioBorrado) => {
            if (err) {
              return callback (err);
            }
        });
      }
      console.log('Usuarios borrados:', indice);
  });

  leerArchivo ('initUsuarios.json', (err, datosJSON) => {
    if (err) {
      return callback (err);
    }
    for (let indice = 0; indice < datosJSON.usuarios.length ; indice++) {
          paqueteUsuarios.altaUsuarios (datosJSON.usuarios[indice], (err, nuevoUsuario) => {
            if (err) {
              return callback (err);
            }
            console.log('Usuario dado de alta:', nuevoUsuario._id);
          });
      }
  });

}

// ------------- Area: Retorno -------------
module.exports = cargaUsuarios;