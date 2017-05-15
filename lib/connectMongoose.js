"use strict";

// ------------------ Area: Declaraciones 
// ------- require y asignaciones
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


// ------- variables
// Se obtiene el objeto de conexión a la base de datos
const db = mongoose.connection;

// ------------------ Area: Proceso
// Se controla si ocurre un error de conexión
db.on('error', (err) => {
    console.log(err);
});

// Se controla si ocurre un error de apertura de conexión
db.once('open', () => {
    console.info('Conectado a mongodb.');
});

// Se indica a mongoose que establezca la conexión
mongoose.connect('mongodb://localhost/nodepop')

// No se exporta nada por no hacer falta
