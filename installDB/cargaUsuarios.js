"use strict"

const sha256 = require('sha256');
const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const modelUsuario = mongoose.model('Usuario');

const leerArchivo = require('./leerArchivo'); // Se importa la rutina de leerFicheros

// ------------- Area: Funciones  -------------
// Funcion para recuperar los usuarios
function recuperarUsuarios() {
  return new Promise((resolve, reject) => {

    modelUsuario.find().exec((err, list) => {
      if (err) {
        reject(err);
      }
      resolve(list);
    });
  });
}

// Funcion para eliminar los usuarios
function borrarUsuarios(idBorrar) {
  return new Promise((resolve, reject) => {
    modelUsuario.remove({ _id: idBorrar }, (err, usuarioBorrado) => {
      if (err) {
        reject(err);
      }
      resolve(usuarioBorrado);
    });
  });
}

// Funcion para dar de alta los usuarios
function altaUsuarios(nuevoUsuario) {
  return new Promise((resolve, reject) => {
    let usuario = new modelUsuario(nuevoUsuario);

    usuario.clave = sha256.x2(usuario.clave);

    usuario.save(nuevoUsuario, (err, usuarioGuardado) => {
      if (err) {
        reject(err);
      }
      resolve(usuarioGuardado);
    });
  });
}

// Funcion que encapsula leerArchivo para hacerla promesa
function obtenerDatos() {
  return new Promise((resolve, reject) => {
    leerArchivo('initUsuarios.json', (err, datosJSON) => {
      if (err) {
        reject(err);
      }
      resolve(datosJSON);

    });
  });
}

// ------------- Area: Proceso  -------------
// Proceso que gestiona la carga de usuarios
async function cargaUsuarios() {

  console.log('Comienzo del proceso de usuarios')
  // Declaración de variables
  let listaUsuarios = {}; // variable para gestionar los datos en el proceso
  let indice = 0; // variable indice para los bucles

  // Se recuperan los anuncios de la BD
  listaUsuarios = await recuperarUsuarios();
  console.log('Usuarios recuperados:', listaUsuarios.length);

  // Se recorre el listado recuperado para borrar los registros
  for (indice = 0; indice < listaUsuarios.length; indice++) {
    await borrarUsuarios(listaUsuarios[indice]._id, (err, usuarioBorrado) => {
      if (err) {
        reject(err);
      }
    });
  }
  console.log('Usuarios borrados:', indice);

  // Se recorre el fichero de carga 
  listaUsuarios = await obtenerDatos();

  // Se recorre el listado recuperado para dar de alta los registros
  for (indice = 0; indice < listaUsuarios.usuarios.length; indice++) {
    await altaUsuarios(listaUsuarios.usuarios[indice], (err, nuevoUsuario) => {
      if (err) {
        reject(err);
      }
    });
  }
  console.log('Usuarios cargados:', indice);
  console.log('Fin del proceso de usuarios')
}

// ------------- Area: Retorno -------------
module.exports = cargaUsuarios;