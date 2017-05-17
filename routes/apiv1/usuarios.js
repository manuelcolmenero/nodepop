"use strict";

// ------------------ Area: Declaraciones 
// ------- require y asignaciones
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const sha256 = require('sha256');

const basicAuthAdmin = require('../../lib/basicAuthAdmin'); // Módulo de autentificación de Administradores

// Se hace un metodo de crear usuarios
router.post('/', (req, res, next) => {
    // Se crea un modelo de usuarios en base a lo recibido por body
    let usuario = new Usuario(req.body);
    let usuarioRespuesta = {};

    usuario.clave = sha256.x2(usuario.clave);

    console.log('Datos usuario llamada: ', usuario);

    // Se guarda en la BBDD el modelo
    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return next(err);
        }

        // Se devuelve el registro indicando que ha ido correctamente
        res.json({ ok: true, usuario: usuarioGuardado });
    });

});

// Se hace un metodo para recuperar una lista de usuarios
router.get('/', basicAuthAdmin, (req, res, next) => {
    // Se recuperan todos los registros 
    Usuario.find().exec((err, list) => {
        // Se valida si existe un error para no continuar
        if (err) {
            return next(err);
        }

        // Si no hubo error se devuelve la lista recuperada
        res.json({ ok: true, list: list });
    });
});

// Se hace un metodo de actualizar usuarios
router.put('/:id', basicAuthAdmin, (req, res, next) => {
    let id = req.params.id;

    id.clave = sha256.x2(id.clave);
    id.admin = false;

    Usuario.update({ _id: id }, req.body, (err, usuario) => {
        if (err) {
            return next(err);
        }
        // Se devuelve el registro indicando que ha ido correctamente
        res.json({ ok: true, usuario: usuario });
    });
});

// Se hace un metodo de borrar usuarios
router.delete('/:id', basicAuthAdmin, (req, res, next) => {
    let id = req.params.id;

    Usuario.remove({ _id: id }, (err, usuario) => {
        if (err) {
            return next(err);
        }
        // Se devuelve el registro indicando que ha ido correctamente
        res.json({ ok: true, usuario: usuario });
    });
});


// ------------------ Area: Retorno
module.exports = router;