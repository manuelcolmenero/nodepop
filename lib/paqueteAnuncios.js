"use strict"

const mongoose = require('mongoose');

const Anuncio = require('../models/Anuncio');
const modelAnuncio = mongoose.model('Anuncio');

// -------- funcion: Alta
function altaAnuncios(nuevoAnuncio, callback) {
    let anuncio = new modelAnuncio(nuevoAnuncio);

    // Se guarda en la BBDD el modelo
    anuncio.save((err, anuncioGuardado) => {
        if (err) {
            return callback(err);
        }
        // Se devuelve el registro indicando que ha ido correctamente
        callback(null, anuncioGuardado);
    });
}

// -------- funcion: Recuperar
function recuperarAnuncios(callback) {
    modelAnuncio.find().exec((err, list) => {
        // Se valida si existe un error para no continuar
        if (err) {
            return callback(err);
        }
        // Si no hubo error se devuelve la lista recuperada
        callback(null, list);
    });
};

// -------- funcion: Borrar
function borrarAnuncios(idBorrar, callback) {
    modelAnuncio.remove({ _id: idBorrar }, (err, anuncio) => {
        // Se valida si existe un error para no continuar
        if (err) {
            return callback(err);
        }

        // Si no hubo error se devuelve la lista recuperada
        callback(null, anuncio);
    });
};

// ------------- Area: Retorno -------------
module.exports = {
    altaAnuncios: altaAnuncios,
    borrarAnuncios: borrarAnuncios,
    recuperarAnuncios: recuperarAnuncios
};