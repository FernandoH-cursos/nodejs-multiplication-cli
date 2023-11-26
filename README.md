# Multiplication App

Aplicación de consola que genera un tabla de multiplicación en un archivo txt pasando flags
en la CLI. Además contiene unit tests y código modular siguiendo una arquitectura limpia.


## Flags de Multiplication App:

### Comandos para levantar app:
- **Correr app en desarrollo**: 
```npm run dev```
- **Correr app en desarrollo con Hot reload**: 
```npm run dev:nodemon```
- **Generar build para producción**: 
```npm run build```
- **Correr app en producción**: 
```npm start```

### Flags

| Flag                           | Requerido | Tipo dato    | Valor default                   | Descripción             | 
| ------------------------------ | --------- | -------------| --------------------------------| ----------------------- |
| ```--base```, ```-b```         | Si        | `number`     | -                               | Tabla de multiplicación que queremos. |
| ```--limit```, ```-l```        | No        | `number`     | `10`                            | Límite de la tabla que queremos. |
| ```--show```, ```-s```         | No        | `boolean`    | `false`                         | Muestra la tabla en consola. |
| ```--name```, ```-n```         | No        | `string`     | `multiplication-table`          | Nombre del archivo de la tabla. |
| ```--destionation```, ```-d``` | No        | `string`     | `outputs`                       | Nombre de carpeta de archivo de la tabla. |

___

## Temas a tratar:

#### 1. Configuración módulo [Yargs](https://www.npmjs.com/package/yargs) para crear flags.
#### 2. Modularización de código NodeJS + TS siguiendo _arquitectura limpia_ y _código limpio_.
#### 3. Pruebas unitarias y de integración usando Jest + TS usando _Mocks_, _Spies_, _Métodos de expectación_,etc.

___

## Estructura de carpetas

| Carpeta o archivo       | Descripción                              | 
| ----------------------- | ---------------------------------------- | 
| **_/config/plugins_**   | En esta carpeta van configuraciones de dependencias externas (en este la configuración de flags de **Yargs**) | 
| **_/domain/use-cases_** | En esta carpeta van los casos de uso que son clases que ejecutan una función (en este caso una que crea la tabla y otra que la guarda en el archivo). | 
| **_/presentation_**     | Contiene un archivo con la clase `ServerApp` que ejecuta los casos de uso | 
| **_app.ts_**            | Contiene la función `main()` que corre la clase `ServerApp` con los casos de uso | 