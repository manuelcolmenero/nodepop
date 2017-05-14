"use strict";

// ------------------ Area: Declaraciones 
// ------- require y asignaciones
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

const path = require('path');

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
        
        // Si los dos campos vienen informados
        if (rangoPrecio[0] && rangoPrecio[1]){
            filter.precio = { $gte: rangoPrecio[0], 
                              $lte: rangoPrecio[1]
                            };
        } else {
            // Si el campo viene informado con el signo "-" por detras del número es que
            // se ha enviado un filtro Desde
            if (isNaN(precio)) {
                if (rangoPrecio[0]){
                    filter.precio = { $gte: rangoPrecio[0] };
                } 
            // Si era un numero y tenia signo es que se ha informado el filtro Hasta
            } else if (rangoPrecio[1]){
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
                                     // Pero se ignoran por filtrado en el módulo
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
        for (let indice = 0; indice < anuncios.length ; indice++) {
            anuncios[indice].foto = path.join('/public/images/', anuncios[indice].foto);
        }
        console.log(anuncios);

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