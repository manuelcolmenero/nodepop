"use strict";

// ------------------ Area: Declaraciones 
// ------- require y asignaciones
// Se llama a BBDD y se conecta
//require('./lib/connectMongoose');

// Se importa la libreria fs para leer ficheros
const fs = require('fs');

// ------- Funciones

// ------- Borrado 

// ------- Regenerar tabla 

// ------- Area: Proceso
// ------- Borrado 


// ------- Regenerar tabla 
fs.readFile('./installDB/initAnuncios.json', (err, data) => {
  if(err) {
    console.log('error: ', err);
  } else {
    let parseJSON = JSON.parse(data);
    for (let indice = 0; indice < parseJSON.anuncios.length ; indice++) {
        console.log('anuncio' + indice, parseJSON.anuncios[indice].nombre);
        console.log('anuncio' + indice, parseJSON.anuncios[indice].venta);
        console.log('anuncio' + indice, parseJSON.anuncios[indice].precio);
        console.log('anuncio' + indice, parseJSON.anuncios[indice].foto);
        console.log('anuncio' + indice, parseJSON.anuncios[indice].tags);
    }
  }
});


