import yargs from "yargs";
import { hideBin } from "yargs/helpers";

//* hideBin() elemina el arreglo de las rutas de ejecucion o .bin en el objeto de banderas.
//* parseSync() permite acceder a las banderas de un comando de forma sincrona.

//* option('bandera'options) permite crear la bandera con sus opciones de configuracion pasando
//* la bandera abreviada como 1er argumento y el objecto de configuracion como 2do argumento.

//* check() recibe como 1er argumento 'argv' que contiene las flags con sus valores y como 2do
//* argumento 'options' que son opciones adicionales. check() permite validar los valores de
//* los flags para que controlemos que se debe ingresar enviando excepciones.  

//* Con esta configuracion esta constante 'yarg' devuelve las banderas configuradas 
export const yarg = yargs(hideBin(process.argv))
  .option("b", {
    //* Nombre de flag
    alias: "base",
    //* Tipo de dato del valor pasado en el flag
    type: "number",
    //* Booleano que habilita que si o si que se pase el valor del flag sino nos da un error
    demandOption: true,
    //* Descripcion del flag
    describe: "Multiplication table base",
  })
  .option("l", {
    alias: "limit",
    type: "number",
    //* Es el valor por defecto de la bandera, si no pasamos el valor al flag toma este que definimos
    default: 10,
    describe: "Multiplication table limit",
  })
  .option("s", {
    alias: "show",
    //* El tipo booleano no se pasa un valor reconoce si se define el flag o no(true o false)
    type: "boolean",
    default: false,
    describe: "Show multiplication table",
  })
  .option("n", {
    alias: "name",
    type: "string",
    default: "multiplication-table",
    describe: "File name",
  })
  .option("d", {
    alias: "destionation",
    type: "string",
    default: "outputs",
    describe: "File destionation",
  })
  .check((argv, options) => {
    if (argv.b < 1) throw "Error: base must be greater than 0";

    return true;
  })
  .parseSync();