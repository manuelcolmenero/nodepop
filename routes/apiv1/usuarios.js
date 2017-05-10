"use strict";

// ------------------ Area: Declaraciones 
// ------- require y asignaciones
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

// Se hace un middelware que devuelva anuncios
router.get('/', (req, res, next) => {
    // Se recuperan todos los registros 
    Usuario.find().exec( (err, list) => {
        // Se valida si existe un error para no continuar
        if (err) {
            next(err);
            return;
        }

        // Si no hubo error se devuelve la lista recuperada
        res.json({ok: true, list: list});
    });
});

// ------------------ Area: Retorno
module.exports = router;