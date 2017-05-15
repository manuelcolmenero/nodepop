"use strict"

const fs = require('fs'); // Se importa la libreria fs para leer ficheros
const path = require('path');

// ------- Funciones

async function leerArchivo(nombreFichero, callback) {
    const fichero = path.join('./installDB', nombreFichero);
    let datosJSON ={};

    fs.readFile(fichero, (err, data) => {
      if(err) {
        return callback (err);
      } 
        // Se controla el error sincrono de JSON
        try {
          // Se parsea el contenido del fichero y se convierte en un objeto
          datosJSON = JSON.parse(data);

        } catch (err) {
            return callback(err);
            
        }

        // Se retorna null como error y la versión para dar el proceso acabado como OK
        callback (null, datosJSON);
    });
}

// ------------- Area: Retorno -------------
module.exports = leerArchivo;