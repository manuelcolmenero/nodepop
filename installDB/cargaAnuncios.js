"use strict"
const leerArchivo     = require('./leerArchivo');     // Se importa la rutina de leerFicheros
const paqueteAnuncios = require('./paqueteAnuncios'); // Se importa las rutinas de BBDD de Anuncios

function cargaAnuncios(callback) {
  paqueteAnuncios.recuperarAnuncios( (err, datosJSON) => {

    if (err) {
      return callback (err);
    }
    let indice = 0;
    for (indice = 0; indice < datosJSON.length ; indice++) {
      paqueteAnuncios.borrarAnuncios (datosJSON[indice]._id, (err, anuncioBorrado) => {
            if (err) {
              return callback (err);
            }
      });
    }
    console.log('Anuncios borrados:', indice);
  });

  leerArchivo ('initAnuncios.json', (err, datosJSON) => {
    if (err) {
      return callback (err);
    }
    for (let indice = 0; indice < datosJSON.anuncios.length ; indice++) {
          paqueteAnuncios.altaAnuncios (datosJSON.anuncios[indice], (err, nuevoAnuncio) => {
            if (err) {
              return callback (err);
            }
            console.log('Anuncio dado de alta:', nuevoAnuncio._id);
          });
      }
  });

  callback(null);

}

// ------------- Area: Retorno -------------
module.exports = cargaAnuncios;