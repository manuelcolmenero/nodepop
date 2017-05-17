# **Nodepop**
--
### **Práctica JS/Node.js/MongoDB**
### **KeepCoding Startup Engineering Master V (2017)**

## **Sinopsis**

Servicio API de venta de artículos de segunda mano que muestra una lista de anuncios y permite tanto buscar como
poner filtros por varios criterios. 

Los usuarios no pueden subir anuncios. Sólo pueden consultar los anuncios precargados. Dichos usuarios tienen que estar registrados con nombre, email y contraseña. El API solo devolverá anuncios a usuarios dados de alta.

## **Instalación**

### Prerrequisitos API
Para poder trabajar con la API se necesitan tener el siguiente software instalado.
- Node >= 4.0 
- MongoDB 
- Git 

### Instalación API
Una vez se posean el entorno preparado se procederá a descargar el API desde gitHub e instalar los módulos de dependencias.

Para ello habrá que ejecutar los siguientes comandos:
```
$ git clone https://github.com/manuelcolmenero/nodepop.git
$ cd nodepop
$ npm install
```

Módulos que se instalaran:
- basic-auth
- body-parser
- cookie-parser
- debug
- ejs
- express
- mongoose
- morgan
- serve-favicon
- sha256


### Instalación de base de datos
Una vez instaladas todas las dependencias se procederá a ejecutar el script de preparación de la base de datos y carga de valores iniciales.
```
$ npm run installDB
```

Esta instrucción ejecutará el script de borrado e inicialización de la base de datos utilizando registros a cargar aquellos que se encuentren dentro de los ficheros con formato json de la carpeta installDB:

- initAnuncios.json - para cargar anuncios
- initUsuarios.json - para cargar usuarios

Si la ejecución es correcta se podrá ver por consola una salida similar a lo siguiente: 

```
> nodepop@0.0.0 installDB ~/nodepop
> DEBUG=nodepop:* node ./install_db.js

Empieza el proceso de instalación
Comienzo del proceso de anuncios
Conectado a mongodb.
Anuncios recuperados: 2
Anuncios borrados: 2
Anuncios cargados: 6
Fin del proceso de anuncios
Comienzo del proceso de usuarios
Usuarios recuperados: 1
Usuarios borrados: 1
Usuarios cargados: 2
Fin del proceso de usuarios
Fin el proceso de instalación
```

## **Arrancar servidor API**
Para arrancar el API y que empiece a dar servicio se usará la siguiente instrucción: 
```
$ npm start
```

Una vez ejecutada dicha instrucción el servidor devolverá en consola el arranque del servidor 
```
> nodepop@0.0.0 start ~/nodepop
> node ./bin/www

Conectado a mongodb.
Conectado a mongodb.
Conectado a mongodb.
Conectado a mongodb.
Conectado a mongodb.
```
Para comprobar que realmente se ha arrancado el servidor correctamente se abrirá un explorador de internet con la siguiente URL
```
http://localhost:3000
```

Si dicha URL responde favorablemente es que el servidor se encuentra operativo y listo para funcionar.

## **Operaciones**
### Gestión usuarios
#### Alta usuarios
Sólo los usuarios registrados pueden realizar peticiones a la API. Para ello se encuentra habilitado un acceso de alta de usuarios.

Para poder registrar un usuario se ha de llamar de la siguiente forma:
- Método: POST 
- Ruta: '/apiv1/usuarios'
- Formato: Body x-www-form-urlencoded

Los parametros que se han de pasar son:
- nombre: String
- email: String
- clave: String

### Gestión anuncios
La gestión de anuncios sólo puede realizarse mediante usuarios registrados. Dichos usuarios tendran acceso a las siguientes peticiones:

#### Listado de anuncios
La API devuelve una lista con todos los articulos que existen en la base de datos con filtros de búsqueda y paginación.

Para poder listar se ha de llamar de la siguiente forma:
- Método: GET 
- Ruta: '/apiv1/anuncios' 
- Formato: Query

Parámetros de búsqueda posibles y opcionales:
- nombre: String completo o que empiece por el dato buscado.
- venta: Boolean ó "búsqueda" 
- precio: Number ó Number- ó -Number ó Number-Number
- tags: String 

Paginación
- sort: Ordenación ascendente o descendente de los campos de la presentación.
- start: Posición desde donde empiezan a mostrarse los anuncios.
- limit: Cantidad de anuncios que se devuelven.

Un ejemplo de construcción sería:
```
GET http://localhost:3000/apiv1/anuncios?&nombre=bici&precio=50-&venta=true&tag=motorstart=0&limit=2&sort=precio
```

Y como resultado
```
{
  "success": true,
  "result": [
    {
   _id": "591c9ed644d582051a3b694a",
   nombre": "Bicicleta",
   venta": true,
   precio": 230.15,
   foto": "/public/images/bici.jpg",
   tags": [
     lifestyle",
     motor"
      ]
    }
  ]
}
```

#### Listado de tags
La API devuelve una lista con todos los tags usados en los diferentes articulos.

Para poder listar se ha de llamar de la siguiente forma:
- Método: GET
- Ruta: '/apiv1/tags' 
- Formato: Query

Obteniendo un resultado parecido al siguiente:
```
{
  "success": true,
  "result": [ "lifestyle", "motor", "mobile", "work" ]
}
```

## *Modo Debug*
En caso de querer hacer un seguimiento con trazas de la ejecución del API se ha habilitado un modo Debugger que se activa con la siguiente sentencia:

```
npm run dev
```