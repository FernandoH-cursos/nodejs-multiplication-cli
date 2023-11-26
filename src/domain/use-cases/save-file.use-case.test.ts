import { SaveFile } from "./save-file.use-case";
import fs from 'fs';

describe('SaveFileUseCase', () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs/file-destination",
    fileName: "custom-table-name",
  };
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  //* Esta funcion se ejecuta despues de ejecutar cada test
  afterEach(() => {
    const outputFolderExists = fs.existsSync("outputs");
    const customOutputFolderExists = fs.existsSync(
      customOptions.fileDestination
    );

    //* Verificamos si existen las rutas de los directorios
    if (outputFolderExists) {
      //* Borrando carpeta /outputs
      fs.rmSync("outputs", { recursive: true });
    }

    if (customOutputFolderExists) {
      //* Borrando carpeta /custom-outputs/file-destination
      fs.rmSync("custom-outputs", { recursive: true });
    }
  });

  const saveFile = new SaveFile();

  test("should save file with default values", () => {
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
    };

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    //* Probando que el resultado de guardar el archivo sea 'true'
    expect(result).toBeTruthy();
    //* Probando que exista el archivo de la tabla
    expect(fileExists).toBe(true);
    //*  Probando que el contenido existente del archivo sea igual al de su entrada
    expect(fileContent).toBe(options.fileContent);
  });

  test("should save file with custom values", () => {
    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test("should return false if directory could not be created", () => {
    //* Espiando metodo mkdirSync() del modulo 'fs' para que su logica
    //* sea lanzarnos un error personalizado
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom error message from testing");
    });

    const result = saveFile.execute(customOptions);

    //* Probando que no se cree el directorio del archivo ya que nos da un error 
    expect(result).toBe(false);

    //* Restaurando metodo mkdirSync() del spy anterior para que vuelva a su logica
    //* original y no al mock que definimos para así evitar errores en la siguiente
    //* prueba que ejecutemos 
    mkdirSpy.mockRestore();
  });

  test("should return false if file could not be created", () => {
    const writeFileSpy = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("This is a custom writing error message");
    });

    const result = saveFile.execute({ fileContent: "Hola" });

    expect(result).toBe(false);

    //* Limpiando mock implementation 
    writeFileSpy.mockRestore();
  });
});