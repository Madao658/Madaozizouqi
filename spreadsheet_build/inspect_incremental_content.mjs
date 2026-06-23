import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/Users/Administrator/Downloads/自走棋新增棋子与羁绊模板.xlsx";
const outputDir = "outputs/filled-template-review";
const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sheetNames = ["填写说明", "01新增棋子", "02技能数值", "03新增羁绊", "04羁绊数值", "字段字典"];
const extracted = {};

await fs.mkdir(outputDir, { recursive: true });
for (const sheetName of sheetNames) {
  const sheet = workbook.worksheets.getItem(sheetName);
  const used = sheet.getUsedRange(true);
  extracted[sheetName] = used.values;
  const preview = await workbook.render({ sheetName, range: used.address, scale: 1, format: "png" });
  const safeName = sheetName.replace(/[^\p{L}\p{N}]+/gu, "-");
  await fs.writeFile(path.join(outputDir, `${safeName}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "filled template formula error scan",
});

await fs.writeFile(path.join(outputDir, "filled-template.json"), JSON.stringify(extracted, null, 2), "utf8");
await fs.writeFile(path.join(outputDir, "formula-errors.ndjson"), errors.ndjson, "utf8");
console.log(JSON.stringify(Object.fromEntries(Object.entries(extracted).map(([name, rows]) => [name, { rows: rows.length, cols: Math.max(0, ...rows.map((row) => row.length)) }])), null, 2));
