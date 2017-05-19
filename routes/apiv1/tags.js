"use strict";

// ------------------ Area: Declaraciones 
// ------- require y asignaciones
const express = require('express');               // Módulo de express
const router = express.Router();                  // Creación de objeto enrutador 

const mongoose = require('mongoose');             // Módulo de mongoose
const Anuncio = mongoose.model('Anuncio');        // Creación de estructura Anuncios

const basicAuth = require('../../lib/basicAuth'); // Módulo de autentificación

// ------------------ Area: Funciones

// Función para dejar un único registro de cada valor que haya en un array
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// ------------------ Area: Metodos
// Se hace un metodo para recuperar una lista de anuncios
router.get('/', basicAuth, (req, res, next) => {
    const filter = {}; // Filtro vacio

    // Se obtienen y verifican los campos de parametros de la busqueda
    const fields = req.query.fields; // Se recuperan los filtros solicitados por cliente 

    // Pero se ignoran por filtrado en el módulo
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;

    // Se recuperan todos los registros 
    //Anuncio.find().exec( (err, list) => { // código para hacerlo por ruta en lugar de query
    Anuncio.list(filter, limit, skip, fields, sort, (err, anuncios) => {
        // Se valida si existe un error para no continuar
        let arrayTag = [];

        if (err) {
            return next(err);
        }

        for (let indice = 0; indice < anuncios.length; indice++) {
            arrayTag = arrayTag.concat(anuncios[indice].tags);
        }

        // Si no hubo error se devuelve la lista recuperada

        res.json({ success: true, result: arrayTag.filter(onlyUnique) });
    });
});

// ------------------ Area: Retorno
module.exports = router;