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

// Se crea un método estático
anuncioSchema.statics.list = function (filter, limit, skip, fields, sort, callback) {
    const query = Anuncio.find(filter);

    query.limit(limit);
    query.skip(skip);
    query.select(fields); // Campos a filtrar { nombredecampo: 1, campoquenoquiero: 0 }
    query.sort(sort);
    query.exec(callback);
};

// Se crea el módelo en base al esquema anterior
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;