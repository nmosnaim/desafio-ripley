## Referencias

Para la realización de esta tarea se usaron las siguientes páginas como referencia:

- https://nodesource.com/blog/microservices-in-nodejs
- https://expressjs.com/en/guide/routing.html
- https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824
- https://tutorialedge.net/nodejs/reading-writing-files-with-nodejs/
- https://mindicador.cl/
- https://code.visualstudio.com/docs/languages/markdown

## Instalación

Para instalar, se debe utilizar [npm](https://www.npmjs.com/) y ejecutar el siguiente comando en la carpeta raíz:

```
npm install
```

## Instrucciones de uso

Para ejecutar, se dbee ejecutar el siguiente comando:

```
npm start
```

Luego, el servidor de Node.js quedará montado en http://localhost:3000/, y ya es posible hacer consultas a los microservicios.
Para utilizar una interfaz web simple, dirigirse a http://localhost:3000/index.html.

Los endpoints del servidor son los siguientes:

- Consulta_de_Saldo: http://localhost:3000/balanceQuery/:rut (GET) donde ':rut' corresponde al RUT de la cuenta que se desea consultar.
- Realizar_Transferencia_Bancaria: http://localhost:3000/executeTransfer (POST), donde el cuerpo de la solicitud debe tener el siguiente formato:

```
{
	"originAccountNumber": 1,
	"destinationAccountNumber": 2,
	"amount": 10
}
```

- Consulta_Indicadores_Economicos: http://localhost:3000/getIndicator/:indicator (GET) donde ':indicator' corresponde a la abreviación del indicador económico que se desea consultar. Para realizar la consulta, se utiliza el API pública de https://mindicador.cl/, y es posible consultar por el dólar observado (usd), la UTM (utm) y la UF (uf).

Todas las respuestas son un objeto con un campo 'success' que es verdadero si la operación fue exitosa y falso en caso contrario, y un campo 'message' con un string que describe el resultado de la operación.
