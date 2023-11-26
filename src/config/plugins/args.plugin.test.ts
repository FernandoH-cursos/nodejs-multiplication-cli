// import { yarg } from './args.plugin';

//* Esta funcion permite simular que enviamos flags con yargs en nuestros tests,
//* ya que no podemos pasar los flags en la consola al momento de ejecutar tests.  
const runCommand = async (args: string[]) => {
  //* Agrando los argumentos pasamos en nuestr argv(donde estan los flags) 
  process.argv = [...process.argv, ...args];

  //* Importamos asincronamente la configuración de yargs con nuestros flags 
  const { yarg } = await import('./args.plugin');

  return yarg;
}


//* Se ejecuta antes de cada test.
//* Ejutamos este código para que se reseteen los flags simulados de runCommand() y así
//* se cambien los 'argv' de yargs a medida que ejecutamos los test con nuevos flags 
const originalArgv = process.argv;
beforeEach(() => {
  process.argv = originalArgv;
  jest.resetModules();
});


describe('Test args.plugin.ts', () => { 
  test("should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);
    // console.log(argv);

    //* Probando que 'argv' de Yargs contenga solo los flags con los valores especificados y lospor defecto
    //* Se usa 'objectContaining()' porque solo me interesa probar las 5 flags principales y no flags o valores
    //* externos de 'argv'
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });


  test("should return configuration with custom values", async () => {
    const argv = await runCommand([
      "-b",
      "12",
      "-l",
      "12",
      "-s",
      "-n",
      "mult-table",
      "-d",
      "directory",
    ]);
    // console.log(argv);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 12,
        l: 12,
        s: true,
        n: "mult-table",
        d: "directory",
      })
    );
  });
 })