"use strict";

// ------------------ Area: Declaraciones 
// ------- require y asignaciones

require('./lib/connectMongoose'); // Se llama a BBDD y se conecta

const cargaAnuncios = require('./installDB/cargaAnuncios'); // Se llama al módulo que carga anuncios
const cargaUsuarios = require('./installDB/cargaUsuarios'); // Se llama al módulo que carga usuarios

// ------- Proceso
console.log('Comienza la instalación');

cargaAnuncios( (err, callback) => {
  if (err) {
    console.log('Error:', err);
    process.exit(1);
  }
  console.log('Carga anuncios terminada con exito.');
});

cargaUsuarios( (err, callback) => {
  if (err) {
    console.log('Error:', err);
    process.exit(1);
  }
  console.log('Carga usuarios terminada con exito.');
});

console.log('Instalación terminda');





