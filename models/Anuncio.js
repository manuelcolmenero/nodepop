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
    //query.select(fields); // Código para que el llamante filtre los campos 
    // Se deja filtrado la consulta por los campos existentes de forma fija para
    // que no pueda ser alterada
    query.select({
        nombre: 1,
        venta: 1,
        precio: 1,
        foto: 1,
        tags: 1,

    })
    query.sort(sort);
    query.exec(callback);
};

// Se crea el módelo en base al esquema anterior
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;