import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/Users/Administrator/Downloads/自走棋无职业多阵营配置模板.xlsx";
const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const overview = await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 10000,
  tableMaxRows: 6,
  tableMaxCols: 8,
  tableMaxCellChars: 100,
});
console.log(overview.ndjson);

const output = {};
for (const sheetName of ["棋子配置", "阵营定义", "阵营羁绊"]) {
  const sheet = workbook.worksheets.getItem(sheetName);
  const used = sheet.getUsedRange(true);
  output[sheetName] = used.values;
}

await fs.writeFile(
  "spreadsheet_build/filled_config.json",
  JSON.stringify(output, null, 2),
  "utf8",
);
console.log("Extracted filled_config.json");
