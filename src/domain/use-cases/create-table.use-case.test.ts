import { CreateTable } from './create-table.use-case';

describe("CreateTableUseCase", () => {
  const createTable = new CreateTable();

  test("should create table with default values", () => {

    const table = createTable.execute({ base: 2 });
    const rows = table.split('\n').length;
    // console.log(table);

    //* Probando que el objeto sea una instancia de la clase 'CreateTable'
    expect(createTable).toBeInstanceOf(CreateTable);
    //* Probando que la cadena de la tabla contengan las multiplicaciones especificadas
    expect(table).toContain('2 x 1 = 2');
    expect(table).toContain('2 x 10 = 20');
    //* Probando que el límite de la multiplicacion sea 10 
    expect(rows).toBe(10);
  });

  test('should create table with custom values', () => {
    const options = {
      base: 3,
      limit: 20,
    };

    const table = createTable.execute(options);
    const rows = table.split("\n").length;
    // console.log(table);

    expect(table).toContain("3 x 5 = 15");
    expect(table).toContain("3 x 15 = 45");
    //* Probando que el límite de la multiplicacion sea 20
    expect(rows).toBe(options.limit);
  });
});