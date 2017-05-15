"use strict";

// ------------------ Area: Declaraciones 
require('./lib/connectMongoose'); // Se llama a BBDD y se conecta

const cargaAnuncios = require('./installDB/cargaAnuncios'); // Se importa las rutinas de BBDD de Anuncios
const cargaUsuarios = require('./installDB/cargaUsuarios'); // Se importa las rutinas de BBDD de Usuarios

// ------------- Area: Funciones  -------------
async function main() {

  console.log('Empieza el proceso de instalación');

  await cargaAnuncios(); // Proceso de gestión de anuncios pre-cargados
  await cargaUsuarios(); // Proceso de gestión de usuarios pre-cargados

  console.log('Fin el proceso de instalación');
  process.exit(0);
}

// ------------- Area: Proceso  -------------
main().then(() => { })
  .catch(err => {
    console.log('Hubo un error:', err);
  });

