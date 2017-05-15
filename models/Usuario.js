"use strict";

// Require y asignaciones
const mongoose = require('mongoose');

// Se crea el esquema del registro
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true,
        unique: true
    },
    email: {
        type: String,
        index: true,
        unique: true
    },
    clave: String
});

// Se crea el módelo en base al esquema anterior
mongoose.model('Usuario', usuarioSchema);