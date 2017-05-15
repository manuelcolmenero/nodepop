"use strict"

const sha256 = require('sha256');
const basicAuth = require('basic-auth'); // Se carga el módulo de autentificación
const paqueteUsuarios = require('../lib/paqueteUsuarios'); // Se importa las rutinas de BBDD de Usuarios

// Se realiza un export directo de la rutina
module.exports = (req, res, next) => {

    // Se obtienen los datos de pantalla introducidos
    const user = basicAuth(req);

    // Buscar en la BBDD el usuario y comprobar password
    paqueteUsuarios.recuperarUsuarios((err, datosJSON) => {

        if (err) {
            return callback(err);
        }

        if (!user) { // Se verifica que vengan datos informados para validar
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.send(401);
            return;
        }

        let usuarioEncontrado = false; // Variable para verificar si usuario encontrado

        // Se busca el usuario para validar
        for (let indice = 0; indice < datosJSON.length; indice++) {
            if (user.name === datosJSON[indice].nombre && sha256.x2(user.pass) === datosJSON[indice].clave) {
                usuarioEncontrado = true;
                break;
            }
        }

        if (usuarioEncontrado === false) { // Si los datos no son validos se devuelve un error
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.send(401);
            return;
        }

        next(); // Se devuelve el control al módulo llamador
    });
}