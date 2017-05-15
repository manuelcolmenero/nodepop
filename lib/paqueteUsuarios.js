"use strict"

const mongoose = require('mongoose');
const path = require('path');

let Usuario = require('../models/Usuario');
const modelUsuario = mongoose.model('Usuario');

// -------- funcion: Alta
function altaUsuarios (nuevoUsuario, callback) {
    let Usuario = new modelUsuario(nuevoUsuario);
    
    // Se guarda en la BBDD el modelo
    Usuario.save( (err, UsuarioGuardado) => {
        if (err) {
            return callback (err);
        }
        // Se devuelve el registro indicando que ha ido correctamente
        callback (null, UsuarioGuardado);
    });
}

// -------- funcion: Recuperar
function recuperarUsuarios (callback) {
  modelUsuario.find().exec( (err, list) => {
        // Se valida si existe un error para no continuar
        if (err) {
            return callback (err);
        }
        // Si no hubo error se devuelve la lista recuperada
        callback (null, list);
    });
  };

// -------- funcion: Borrar
function borrarUsuarios (idBorrar, callback) {
  modelUsuario.remove({_id: idBorrar}, (err, Usuario) => {
        // Se valida si existe un error para no continuar
        if (err) {
            return callback (err);
        }

        // Si no hubo error se devuelve la lista recuperada
        callback (null, Usuario);
    });
  };

// ------------- Area: Retorno -------------
module.exports = {
    altaUsuarios: altaUsuarios,
    borrarUsuarios: borrarUsuarios,
    recuperarUsuarios: recuperarUsuarios
};