"use strict";

// Require y asignaciones
const mongoose = require('mongoose');

// Se crea el esquema del registro
const usuarioSchema = mongoose.Schema({
    nombre: String,
     email: String,
     clave: String
});

// Se crea el módelo en base al esquema anterior
mongoose.model('Usuario', usuarioSchema);