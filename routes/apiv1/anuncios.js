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
    // Se recuperan todos los registros 
    Anuncio.find().exec( (err, list) => {
        // Se valida si existe un error para no continuar
        if (err) {
            return next(err);
        }

        // Si no hubo error se devuelve la lista recuperada
        res.json({ok: true, list: list});
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