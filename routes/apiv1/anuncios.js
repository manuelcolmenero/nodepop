"use strict";

// ------------------ Area: Declaraciones 
// ------- require y asignaciones
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

// ------------------ Area: Metodos
// Se hace un metodo de crear anuncios
router.post('/', (req, res, next) => {
    // Se crea un modelo de anuncios en base a lo recibido por body
    let anuncio = new Anuncio(req.body);
    
    // Se guarda en la BBDD el modelo
    anuncio.save( (err, anuncioGuardado) => {
        if (err) {
            return next(err);
        }
        // Se devuelve el registro indicando que ha ido correctamente
        res.json({ok:true, anuncio:anuncioGuardado});
    });

});

// Se hace un metodo para recuperar una lista de anuncios
router.get('/', (req, res, next) => {
    // Se obtienen los campos de filtro
    const nombre = req.query.nombre;
    const venta  = req.query.venta;
    const precio = req.query.precio;
    const tags   = req.query.tags;
    const filter = {}; // Filtro vacio

    // Se informa el filtro segun los campos informados
    if (nombre) {
        filter.nombre = nombre;
    }
    if (venta) {
        filter.venta = venta;
    }    
    if (precio) {
        filter.precio = precio;
    }
    if (tags) {
        filter.tags = tags;
    }

    // Se obtienen y verifican los campos de parametros de la busqueda
    const fields = null;
    const limit = parseInt(req.query.limit);
    const skip  = parseInt(req.query.skip);
    const sort  = req.query.sort;

    // Se recuperan todos los registros 
    //Anuncio.find().exec( (err, list) => { // código para hacerlo por ruta en lugar de query
    Anuncio.list(filter, limit, skip, fields, sort, (err, anuncios) => {
        // Se valida si existe un error para no continuar
        if (err) {
            return next(err);
        }

        // Si no hubo error se devuelve la lista recuperada
        res.json({success: true, result: anuncios});
    });
});

// Se hace un metodo de actualizar anuncios
router.put('/:id', (req, res, next) => {
    let id = req.params.id;

    Anuncio.update({_id: id}, req.body, (err, anuncio) => {
        if (err) {
            return next(err);
        }
        // Se devuelve el registro indicando que ha ido correctamente
        res.json({ok:true, anuncio:anuncio});
    });
});

// Se hace un metodo de borrar anuncios
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;

    Anuncio.remove({_id: id}, (err, anuncio) => {
        if (err) {
            return next(err);
        }
        // Se devuelve el registro indicando que ha ido correctamente
        res.json({ok:true, anuncio:anuncio});
    });
});

// ------------------ Area: Retorno
module.exports = router;