# **Nodepop**
## **KeepCoding Startup Engineering Master V (2017)**

- - -

# **Práctica del curso de DevOps**
## **Sinopsis**
La práctica consiste en desplegar en un servidor su desarrollo para la práctica del curso de Programación Backend con Node (Nodepop).

La arquitectura utilizada para la puesta en producción es la siguiente:

• Se utiliza node como servidor de aplicación utilizando PM2 como gestor de procesos node para que siempre esté en ejecución. La aplicación node deberá reiniciarse automáticamente al arrancar el servidor.

• Se utiliza nginx como proxy inverso que se encargue de recibir las peticiones HTTP y derivárselas a node.

• Los archivos estáticos de la aplicación (imágenes, css, etc.) se sirven desde el servidor por nginx. Para poder diferenciar se incluye una cabecera HTTP cuando se sirvan estáticos cuyo valor es: X-Owner: manuelcolmenero. Dado que la aplicación posee estáticos se facilita la ruta para su visualización.

• Si se accede al servidor web indicando la dirección IP del servidor en lugar del nombre de dominio, se deberá mostrar el contenido de alguna plantilla de startbootstrap.com. 

## **Datos de verificación**
La url donde se ha desplegado el servidor de nodepop es: [nodepop.manuelcolmenero.es](http://nodepop.manuelcolmenero.es). Si se desea comprobar la resolción de peticiones se puede ejecutar la URL [nodepop.manuelcolmenero.es/apiv1/anuncios](http://nodepop.manuelcolmenero.es/apiv1/anuncios) en POSTMAN utilizando en la BasicAuth el usuario "Son Goku" y contraseña "Bola4".

La url donde se ha desplegado el servidor web es: [www.manuelcolmenero.es](http://www.manuelcolmenero.es). La IP [52.5.154.106](http://52.5.154.106) se ha redirigido al dominio.

La url donde se puede verificar la cabecera HTTP para estáticos es: [nodepop.manuelcolmenero.es/images/falcon.png](http://nodepop.manuelcolmenero.es/images/falcon.png) 

## **Datos añadidos**
Se ha incorporado SSL al dominio web y a la aplicación nodepop con redirección automatica a la url segura.

- - -

# **Práctica JS/Node.js/MongoDB**
## **Sinopsis**

Servicio API de venta de artículos de segunda mano que muestra una lista de anuncios y permite tanto buscar como poner filtros por varios criterios. 

Los usuarios no pueden subir anuncios. Sólo pueden consultar los anuncios precargados. Dichos usuarios tienen que estar registrados con nombre, email y contraseña. El API solo devolverá anuncios a usuarios dados de alta.

## **Instalación**

### Prerrequisitos API
Para poder trabajar con la API se necesitan tener el siguiente software instalado.
- Node >= 4.0 
- MongoDB 
- Git 

### Instalación API
Una vez preparado el entorno se procederá a descargar el API desde gitHub e instalar los módulos de dependencias.

Para ello habrá que ejecutar los siguientes comandos:
```
$ git clone https://github.com/manuelcolmenero/nodepop.git
$ cd nodepop
$ npm install
```

Módulos que se instalarán:
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

Esta instrucción ejecutará el script de borrado e inicialización de la base de datos utilizando registros a cargar aquellos que se encuentren dentro de los ficheros con formato JSON de la carpeta installDB:

- initAnuncios.json - para cargar anuncios
- initUsuarios.json - para cargar usuarios

Si la ejecución es correcta se podrá ver por consola una salida similar a lo siguiente: 

```
> nodepop@0.0.0 installDB ~/nodepop
> DEBUG=nodepop:* node ./install_db.js

Empieza el proceso de instalación
Comienzo del proceso de anuncios
Conectado a mongodb.
Anuncios recuperados: 6
Anuncios borrados: 6
Anuncios cargados: 4
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

No se permite que existan varios usuarios con mismo nombre o email y la clave siempre se guardará encriptada para preservar la privacidad.

### Gestión anuncios
La gestión de anuncios sólo puede realizarse mediante usuarios registrados. Dichos usuarios tendrán acceso a las siguientes peticiones:

#### Listado de anuncios
La API devuelve una lista con todos los artículos que existen en la base de datos con filtros de búsqueda y paginación.

Para poder listar se ha de llamar de la siguiente forma:
- Método: GET 
- Ruta: '/apiv1/anuncios' 
- Formato: Query

Parámetros de búsqueda posibles y opcionales:
- nombre: Texto (string) completo o que empiece por el dato buscado.
- venta: true, false ó "búsqueda" (equivale a false)
- precio: Números separados con '-'. Se pude informar un valor fijo, un desde o un hasta 
- tags: Texto (string). Los diferentes valores estaran separados con '-'

Paginación
- sort: Ordenación ascendente o descendente de los campos de la presentación.
- start: Posición desde donde empiezan a mostrarse los anuncios.
- limit: Cantidad de anuncios que se devuelven.

Un ejemplo de construcción sería:
```
GET http://localhost:3000/apiv1/anuncios?nombre=bici&precio=50-500&venta=true&tag=motor-lifestyle&start=0&limit=2&sort=precio
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
   foto": "/images/bici.jpg",
   tags": [
     "lifestyle",
     "motor"
      ]
    }
  ]
}
```

#### Listado de tags
La API devuelve una lista con todos los tags usados en los diferentes artículos.

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

Para ejecutar este modo se necesitará tener instalado el módulo de nodemon. En caso de no tenerlo se ha de ejecutar la sentencia siguiente:

```
npm install nodemon -g
``
