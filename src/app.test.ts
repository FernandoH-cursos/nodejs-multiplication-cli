// process.argv = ['node','app.ts','-b','10'];
// import './app';
import { ServerApp } from './presentation/server-app';


describe('Test App.ts', () => {
  test('should call ServerApp.run() with values', async() => {
    //* Mock que espia al método run() de ServerApp 
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    //* Pasando flags a 'argv' para simular los argumentos 
    process.argv = [
      "node",
      "app.ts",
      "-b",
      "10",
      "-l",
      "5",
      "-s",
      "-n",
      "test-file",
      "-d",
      "test-destination",
    ];

    //* Importando asincronamente app.ts para que ejecute el ServerApp.run()
    await import('./app');

    //* Probando que el metodo ServerApp.run() tenga como argumento el objeto especificado
    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 5,
      showTable: true,
      fileName: 'test-file',
      fileDestination: 'test-destination',
    });
  });
});