"use strict";

// ------------------ Area: Declaraciones 
// ------- require y asignaciones

//require('./lib/connectMongoose'); // Se llama a BBDD y se conecta
const async = require('async');
const leerArchivo = require('./installDB/leerArchivo');

// ------- Borrado 

// ------- Regenerar tabla 

// ------- Area: Proceso
// ------- Borrado 


// ------- Regenerar tabla 


// ------- Proceso
leerArchivo ('initAnuncios.json', (err, datosJSON) => {
  if (err) {
    console.log ('Error:', err);
    return;
  }
  for (let indice = 0; indice < datosJSON.anuncios.length ; indice++) {
        console.log('anuncio' + indice, datosJSON.anuncios[indice].nombre);
        console.log('anuncio' + indice, datosJSON.anuncios[indice].venta);
        console.log('anuncio' + indice, datosJSON.anuncios[indice].precio);
        console.log('anuncio' + indice, datosJSON.anuncios[indice].foto);
        console.log('anuncio' + indice, datosJSON.anuncios[indice].tags);
    }
});

leerArchivo ('initUsuarios.json', (err, datosJSON) => {
  if (err) {
    console.log ('Error:', err);
    return;
  }
  for (let indice = 0; indice < datosJSON.usuarios.length ; indice++) {
        console.log('usuario' + indice, datosJSON.usuarios[indice].nombre);
        console.log('usuario' + indice, datosJSON.usuarios[indice].email);
        console.log('usuario' + indice, datosJSON.usuarios[indice].clave);

    }
});


