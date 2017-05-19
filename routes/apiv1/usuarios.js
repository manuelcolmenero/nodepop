"use strict";

// ------------------ Area: Declaraciones 
// ------- require y asignaciones
const express = require('express');               // Módulo de express
const router = express.Router();                  // Creación de objeto enrutador 

const mongoose = require('mongoose');             // Módulo de mongoose
const Usuario = mongoose.model('Usuario');        // Creación de estructura Anuncios
const sha256 = require('sha256');                 // Módulo de encriptación

// ------------------ Area: Metodos
// Se hace un metodo de crear usuarios
router.post('/', (req, res, next) => {
    // Se crea un modelo de usuarios en base a lo recibido por body
    let usuario = new Usuario(req.body);
    let usuarioRespuesta = {};

    usuario.clave = sha256.x2(usuario.clave);

    // Se guarda en la BBDD el modelo
    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return next(err);
        }

        // Se devuelve el registro indicando que ha ido correctamente
        res.json({ ok: true, usuario: usuarioGuardado });
    });

});

// ------------------ Area: Retorno
module.exports = router;