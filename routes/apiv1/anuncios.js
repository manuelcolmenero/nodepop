"use strict";

// ------------------ Area: Declaraciones 
// ------- require y asignaciones
const express = require('express');               // Módulo de express
const router = express.Router();                  // Creación de objeto enrutador 

const mongoose = require('mongoose');             // Módulo de mongoose
const Anuncio = mongoose.model('Anuncio');        // Creación de estructura Anuncios

const basicAuth = require('../../lib/basicAuth'); // Módulo de autentificación

const path = require('path');                     // Módulo de trabajo con rutas

// ------------------ Area: Metodos

// Se hace un metodo para recuperar una lista de anuncios
router.get('/', basicAuth, (req, res, next) => {
    // Se obtienen los campos de filtro
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tags = req.query.tags;
    const filter = {}; // Filtro vacio

    // Se informa el filtro segun los campos informados

    // Se pregunta si se ha informado el nombre.
    // En caso de estar informado se realiza una busqueda en el campo texto
    if (nombre) {
        filter.nombre = new RegExp('^' + nombre, "i"); // Se pone i para que sea case-insensitive
    }

    // Se pregunta si se ha informado el campo venta.
    // En caso de estar informado se valida si es true, false o búsquerda (false)
    if (venta && (venta === 'true' || venta === 'false' || venta.toLowerCase() == 'búsqueda')) {

        if (venta.toLowerCase() === 'búsqueda') {
            filter.venta = 'false';
        } else {
            filter.venta = venta;
        }
    }

    // Se pregunta si se ha informado el campo precio.
    // En caso de estar informado se valida el rango de precio (precio min. y precio max)
    if (precio) {
        // El rango viene dividido por un signo "-" así que se convierte en un array de 2 registros
        let rangoPrecio = precio.toString().split("-")

        // Se controla que el valor recibido sea numerico.
        if (isNaN(parseInt(rangoPrecio[0]))) {
            rangoPrecio[0] = '';
        }

        if (isNaN(parseInt(rangoPrecio[1]))) {
            rangoPrecio[1] = '';
        }

        // Si los dos campos vienen informados
        if (rangoPrecio[0] && rangoPrecio[1]) {
            filter.precio = {
                $gte: rangoPrecio[0],
                $lte: rangoPrecio[1]
            };
        } else {
            // Si el campo viene informado con el signo "-" por detras del número es que
            // se ha enviado un filtro Desde
            if (isNaN(precio)) {
                if (rangoPrecio[0]) {
                    filter.precio = { $gte: rangoPrecio[0] };
                }
                // Si era un numero y tenia signo es que se ha informado el filtro Hasta
            } else if (rangoPrecio[1]) {
                filter.precio = { $lte: rangoPrecio[1] };
            } else {
                // Si llega a este punto se está filtrando por un precio determinado
                filter.precio = precio;
            }
        }
    }

    // Se pregunta si se ha informado el campo tags.
    // En caso de estar informado se genera un rango para el array
    if (tags) {
        // Los diferentes tags vienen divididos por un signo "-" así que se convierte en un array
        let arrayTag = tags.toString().split("-")

        // Como puede que vengan más de un registro se realiza la busqueda recuperando todos
        filter.tags = { $in: arrayTag };
    }

    // Se obtienen y verifican los campos de parametros de la busqueda
    const fields = req.query.fields; // Se recuperan los filtros solicitados por cliente 
    // Pero se ignoran por filtrado en el modelo
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;

    // Se recuperan todos los registros 
    //Anuncio.find().exec( (err, list) => { // código para hacerlo por ruta en lugar de query
    Anuncio.list(filter, limit, skip, fields, sort, (err, anuncios) => {
        // Se valida si existe un error para no continuar
        if (err) {
            return next(err);
        }
        for (let indice = 0; indice < anuncios.length; indice++) {
            anuncios[indice].foto = path.join('/images/', anuncios[indice].foto);
        }

        // Si no hubo error se devuelve la lista recuperada
        res.json({ success: true, result: anuncios });
    });
});

// ------------------ Area: Retorno
module.exports = router;