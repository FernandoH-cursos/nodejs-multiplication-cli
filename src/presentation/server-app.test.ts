import { ServerApp } from "./server-app";
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

describe("Server App", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: "test-destination",
    fileName: "test-filename",
  };


  //* Se ejecuta antes de cada test 
  beforeEach(() => {
    //* Limpia todos los mocks creados con jest.fn() 
    jest.clearAllMocks();
  });

  test("should create ServerApp instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  //? Prueba de integración
  test("should run ServerApp with options", () => {
    
    //* Espiando log() de objeto 'console'
    const logSpy = jest.spyOn(console, "log");
    //* Espiando execute() de nuestra clase 'CreateTable' que crea la tabla de multiplicacion
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    //* Espiando execute() de nuestra clase 'SaveFile' que guarda la tabla de multiplicacion
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");


    ServerApp.run(options);

    //* Probando que el metodo console.log() se haya llamado 2 veces
    expect(logSpy).toHaveBeenCalledTimes(2);
    //* Probando que uno de los console.log() llamados lo haga con el argumento "Server running..."
    expect(logSpy).toHaveBeenCalledWith("Server running...");
    //* Probando que el último console.log() llamado lo haga con el argumento "File created!"
    expect(logSpy).toHaveBeenLastCalledWith("File created!");

    //* Probando que el método execute() se haya invocado 1 vez
    expect(createTableSpy).toHaveBeenCalledTimes(1);
    //* Probando que el método execute() se haya invocado con el argumento: { base: 2, limit: 10 }
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    //* Probando que el método execute() se haya invocado 1 vez
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    //* Probando que el método execute() se haya invocado con el argumento: { base: 2, limit: 10 }
    expect(saveFileSpy).toHaveBeenCalledWith({
      //* El 'fileContent' espera cualquier string 
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    }); 
   
  });

  //? Prueba unitaria
  test('should run with custom values mocked', () => {
    //* Creando mocks para los console.log(), console.error() y execute() de CreateTable y SaveFile.
    //* Al usar 'jest.fn()' no se ejecuta la logica de la funcion solo se espian los métodos
    //* para validar con los metodos de expectacion.
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    //* Mock de de execute() de la clase CreateTable que retorna "1 x 2 = 2"
    const createMock = jest.fn().mockReturnValue("1 x 2 = 2");
    //* Mock de de execute() de la clase SaveFile que retorna `true`
    const saveFileMock = jest.fn().mockReturnValue(true);

    //* Asignando mock a su respectiva funcion usando objetos y prototipos de clase
    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    //* Probando que el mock console.log() tenga el argumento "Server running..."
    expect(logMock).toHaveBeenCalledWith("Server running...");
    //* Probando que el mock execute() de CreateTable tenga el argumento especificado
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    //* Probando que el mock execute() de SaveFile tenga el argumento especif
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: "1 x 2 = 2",
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
    //* Probando que el mock console.log tenga el argumento "File created!"
    expect(logMock).toHaveBeenCalledWith("File created!");
    //* Probando que el mock console.error no se haya invocado
    expect(logErrorMock).not.toHaveBeenCalled();
  });
});
