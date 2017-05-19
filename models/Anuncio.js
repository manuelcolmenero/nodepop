"use strict";

// Require y asignaciones
const mongoose = require('mongoose');

// Se crea el esquema del registro
const anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: 'text',
        unique: true
    },
    venta: {
        type: Boolean,
        index: true
    },
    precio: {
        type: Number,
        index: true
    },
    foto: String,
    tags: {
        type: [String],
        index: true
    }
});

// Se crea un método estático para recuperar el listado
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