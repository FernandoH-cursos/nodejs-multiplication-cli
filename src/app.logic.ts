import fs from "fs";
import { yarg } from "./config/plugins/args.plugin";


//? Logica de crear un archivo con tabl de multiplicacion sin arquitectura limpia 

const { b: base, l: limit, s: showTable } = yarg;


let outputMessage = "";
const headerMessage = `
=============================================
                Table del ${base}
=============================================\n
`;

outputMessage += headerMessage;

for (let i = 1; i <= limit; i++) {
  const multiplication = base * i;

  outputMessage += `${base} x ${i} = ${multiplication}\n`;
}

const outputPath = "outputs/table-5";

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);

if (showTable) console.log(outputMessage);
console.log(`File created!`);
