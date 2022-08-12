# DevsKillsHero
## Autor

- [Sicardi, Julián Nicolas](https://github.com/Jsicardi)

## Indice
- [Autor](#autor)
- [Indice](#indice)
- [Compilacion](#compilacion)
- [Importacion](#importacion)
- [Ejecucion de la API](#ejecucion-de-la-api)
- [Ejemplos](#ejemplos)

## Compilacion

El proyecto se compila ejecutando el siguiente comando posicionado en la carpeta raiz de este: 

```bash
$ npm install
```

## Importacion

El proyecto prevee un script para la creacion de una tabla en una base de datos PostgreSQL local, asi como tambien la importacion de los datos del archivo `heroes.json` a esta. Una vez elegida la base de datos a utilizar para albergar la tabla, edite los campos del archivo `credentials.json` para adecuarse a su base de datos elegida (la tabla sera generada en el schema public de esta). Para generar las tablas adecuadas e importar los datos, se utilizara el script `populate_db.js`. El campo `abs_path` corresponde al path absoluto hacia un directorio donde la base de datos PostgreSQL posea accesos de lectura, y sera utilizado para la creacion de un archivo `heroes.csv` temporal generado a partir del archivo `heroes.json`. Este archivo sera utilizado para importar los datos a la base de datos y sera generado y removido por `populate_db.js`.

Para ejecutar el script mencionado, posicionado desde la carpeta raiz del proyecto, ejecutar el comando:

```bash
$ node populate_db.js
```

## Ejecucion de la API

Para ejecutar la misma, en el directorio raiz del proyecto se ejecutan el comando:

```bash
$ node index.js
```
La API estara disponible en el puerto 3000 por default, o en el puerto donde se haya definido por terminal la variable de entorno "PORT". Por ejemplo, si se desea que la API se ejecute en http://localhost:4000, deben realizarse alguno de los siguientes comandos dependiendo del sistema operativo donde se quiera correr la misma

- $env:PORT=4000 (Windows)
- export PORT=4000 (Linux/Mac)

Si no se define dicha variable de entorno, por default la API corre en http://localhost:3000

Teniendo en cuenta todo esto, al correrse el comando de node mencionado previamente, en la consola se observara un mensaje que dice "Listening to port PORT. . .", lo que indica que la API ya esta en ejecucion.

## Ejemplos

Si se desea dar un voto al heroe Batman, se puede utilizar el metodo POST `/api/v1/votes` utilizando como body:

```json
{
    "superhero" : "Batman"
}
```

Pueden consultarse los votos de cada superheroe utilizando el metodo GET `/api/v1/votes/heroes` o por cada editor utilizando el metodo GET `api/v1/votes/publisher`


