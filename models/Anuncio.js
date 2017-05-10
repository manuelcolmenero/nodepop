"use strict";

// Require y asignaciones
const mongoose = require('mongoose');

// Se crea el esquema del registro
const anuncioSchema = mongoose.Schema({
    nombre: String,
     venta: Boolean,
    precio: Number,
      foto: String,
      tags: [String]
});

// Se crea el módelo en base al esquema anterior
mongoose.model('Anuncio', anuncioSchema);