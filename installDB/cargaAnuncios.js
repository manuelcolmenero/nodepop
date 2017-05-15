"use strict"

const mongoose = require('mongoose');
const Anuncio = require('../models/Anuncio');
const modelAnuncio = mongoose.model('Anuncio');

const leerArchivo = require('./leerArchivo'); // Se importa la rutina de leerFicheros

// ------------- Area: Funciones  -------------
// Funcion para recuperar los anuncios
function recuperarAnuncios() {
  return new Promise((resolve, reject) => {

    modelAnuncio.find().exec((err, list) => {
      if (err) {
        reject(err);
      }
      resolve(list);
    });
  });
}

// Funcion para borrar los anuncios
function borrarAnuncios(idBorrar) {
  return new Promise((resolve, reject) => {
    modelAnuncio.remove({ _id: idBorrar }, (err, anuncioBorrado) => {
      if (err) {
        reject(err);
      }
      resolve(anuncioBorrado);
    });
  });
}

// Funcion para dar de alta los anuncios
function altaAnuncios(nuevoAnuncio) {
  return new Promise((resolve, reject) => {
    let anuncio = new modelAnuncio(nuevoAnuncio);

    anuncio.save(nuevoAnuncio, (err, anuncioGuardado) => {
      if (err) {
        reject(err);
      }
      resolve(anuncioGuardado);
    });
  });
}

// Funcion que encapsula leerArchivo para hacerla promesa
function obtenerDatos() {
  return new Promise((resolve, reject) => {
    leerArchivo('initAnuncios.json', (err, datosJSON) => {
      if (err) {
        reject(err);
      }
      resolve(datosJSON);

    });
  });
}

// ------------- Area: Proceso  -------------
// Proceso que gestiona la carga de anuncios
async function cargaAnuncios() {

  console.log('Comienzo del proceso de anuncios')

  // Declaración de variables
  let listaAnuncios = {}; // variable para gestionar los datos en el proceso
  let indice = 0; // variable indice para los bucles

  // Se recuperan los anuncios de la BD
  listaAnuncios = await recuperarAnuncios();
  console.log('Anuncios recuperados:', listaAnuncios.length);

  // Se recorre el listado recuperado para borrar los registros
  for (indice = 0; indice < listaAnuncios.length; indice++) {
    await borrarAnuncios(listaAnuncios[indice]._id, (err, anuncioBorrado) => {
      if (err) {
        reject(err);
      }
    });
  }
  console.log('Anuncios borrados:', indice);

  // Se recorre el fichero de carga 
  listaAnuncios = await obtenerDatos();

  // Se recorre el listado recuperado para dar de alta los registros
  for (indice = 0; indice < listaAnuncios.anuncios.length; indice++) {
    await altaAnuncios(listaAnuncios.anuncios[indice], (err, nuevoAnuncio) => {
      if (err) {
        reject(err);
      }
    });
  }
  console.log('Anuncios cargados:', indice);
  console.log('Fin del proceso de anuncios')
}

// ------------- Area: Retorno -------------
module.exports = cargaAnuncios;