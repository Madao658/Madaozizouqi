import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = path.resolve(".");
const outputDir = path.join(root, "outputs", "new-content-template");
const outputPath = path.join(outputDir, "自走棋新增棋子与羁绊模板.xlsx");

const workbook = Workbook.create();
const guide = workbook.worksheets.add("填写说明");
const units = workbook.worksheets.add("01新增棋子");
const skills = workbook.worksheets.add("02技能数值");
const traits = workbook.worksheets.add("03新增羁绊");
const traitParams = workbook.worksheets.add("04羁绊数值");
const dictionary = workbook.worksheets.add("字段字典");

const C = {
  navy: "#183B3A",
  teal: "#2E6862",
  green: "#4D857A",
  mint: "#DDEFE9",
  pale: "#F7FBF9",
  input: "#FFF5CF",
  example: "#E8F2F7",
  gray: "#E8ECEB",
  line: "#B9CEC7",
  text: "#243634",
  muted: "#5D716D",
  gold: "#D6A947",
  red: "#B85C52",
  white: "#FFFFFF",
};

const titleFmt = {
  fill: C.navy,
  font: { bold: true, color: C.white, size: 18 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
const sectionFmt = {
  fill: C.teal,
  font: { bold: true, color: C.white, size: 11 },
  verticalAlignment: "center",
};
const headerFmt = {
  fill: C.teal,
  font: { bold: true, color: C.white, size: 10 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
  borders: { preset: "all", style: "thin", color: C.line },
};
const inputFmt = {
  fill: C.input,
  font: { color: C.text, size: 10 },
  verticalAlignment: "center",
  wrapText: true,
  borders: { preset: "all", style: "thin", color: C.line },
};
const exampleFmt = { ...inputFmt, fill: C.example, font: { color: C.muted, italic: true, size: 10 } };

function widths(sheet, items) {
  items.forEach(([col, px]) => { sheet.getRange(`${col}:${col}`).format.columnWidthPx = px; });
}

function title(sheet, endCol, main, sub) {
  sheet.getRange(`A1:${endCol}2`).merge();
  sheet.getRange(`A1:${endCol}2`).values = [[main]];
  sheet.getRange(`A1:${endCol}2`).format = titleFmt;
  sheet.getRange(`A1:${endCol}2`).format.rowHeightPx = 32;
  sheet.getRange(`A3:${endCol}3`).merge();
  sheet.getRange(`A3:${endCol}3`).values = [[sub]];
  sheet.getRange(`A3:${endCol}3`).format = {
    fill: C.mint,
    font: { color: C.muted, italic: true, size: 10 },
    verticalAlignment: "center",
    wrapText: true,
  };
  sheet.getRange(`A3:${endCol}3`).format.rowHeightPx = 38;
  sheet.showGridLines = false;
}

function prepareTable(sheet, endCol, headers, example, blankRows, tableName) {
  sheet.getRange(`A5:${endCol}5`).values = [headers];
  sheet.getRange(`A5:${endCol}5`).format = headerFmt;
  sheet.getRange(`A6:${endCol}6`).values = [example];
  sheet.getRange(`A6:${endCol}6`).format = exampleFmt;
  const blanks = Array.from({ length: blankRows }, () => Array(headers.length).fill(""));
  sheet.getRange(`A7:${endCol}${6 + blankRows}`).values = blanks;
  sheet.getRange(`A7:${endCol}${6 + blankRows}`).format = inputFmt;
  sheet.getRange(`A6:${endCol}${6 + blankRows}`).format.rowHeightPx = 48;
  const table = sheet.tables.add(`A5:${endCol}${6 + blankRows}`, true, tableName);
  table.style = "TableStyleMedium4";
  table.showFilterButton = true;
  sheet.freezePanes.freezeRows(5);
  sheet.freezePanes.freezeColumns(2);
}

// 使用说明
guide.getRange("A1:H2").merge();
guide.getRange("A1:H2").values = [["新增棋子与羁绊 · 增量配置模板"]];
guide.getRange("A1:H2").format = titleFmt;
guide.getRange("A1:H2").format.rowHeightPx = 32;
guide.getRange("A4:H4").merge();
guide.getRange("A4:H4").values = [["以后每次只填写本次要新增的内容，不需要复制旧棋子和旧羁绊"]];
guide.getRange("A4:H4").format = sectionFmt;

const guideRows = [
  ["1", "新增棋子", "在“01新增棋子”中每个角色填写一行。角色ID必须是唯一英文小写ID；阵营1必填，阵营2/3可留空。"],
  ["2", "技能参数", "在“02技能数值”中填写该角色技能用到的全部数字。一个参数一行，通过角色ID关联；百分比统一写小数，例如25%填写0.25。"],
  ["3", "新增羁绊", "在“03新增羁绊”中每个激活等级填写一行。同一羁绊有2/4/6三个档位，就填写三行。"],
  ["4", "羁绊参数", "在“04羁绊数值”中填写羁绊实现所需的全部参数。一个参数一行，通过羁绊名称关联。"],
  ["5", "特殊机制", "如果技能或羁绊不是单纯加数值，请在“完整机制描述”中写清目标、触发时机、范围、持续时间、能否叠加、死亡后是否消失等。"],
  ["6", "头像素材", "头像文件单独和Excel一起交给我；文件名建议与角色ID一致，例如 newhero.png。"],
  ["7", "提交方式", "填完后直接把Excel和新增头像发给我。我会只新增本批内容，不改动其他棋子和羁绊。"],
];
guide.getRange("A5:C11").values = guideRows;
guide.getRange("A5:C11").format = { ...inputFmt, fill: C.pale };
guide.getRange("A5:A11").format = { fill: C.mint, font: { bold: true, color: C.teal }, horizontalAlignment: "center", borders: { preset: "all", style: "thin", color: C.line } };
guide.getRange("A5:C11").format.rowHeightPx = 43;

guide.getRange("A13:H13").merge();
guide.getRange("A13:H13").values = [["我收到模板后会同步更新的程序位置"]];
guide.getRange("A13:H13").format = sectionFmt;
const syncRows = [
  ["game-data.js", "新增棋子基础属性、阵营归属、技能名、展示说明、羁绊档位与羁绊颜色"],
  ["balance-config.js", "新增技能的全部可调数值、新羁绊的全部可调数值，并生成对应展示文案"],
  ["app.js", "仅当出现新的技能/羁绊机制时，新增实际战斗逻辑；数值仍从 balance-config.js 读取"],
  ["assets", "加入新角色头像，并按角色ID建立对应关系"],
];
guide.getRange("A14:B17").values = syncRows;
guide.getRange("A14:B17").format = inputFmt;
for (let row = 14; row <= 17; row += 1) {
  guide.getRange(`B${row}:H${row}`).merge();
  guide.getRange(`B${row}:H${row}`).format = inputFmt;
}
guide.getRange("A14:A17").format = { fill: C.gray, font: { bold: true, color: C.teal }, borders: { preset: "all", style: "thin", color: C.line } };

guide.getRange("A19:H19").merge();
guide.getRange("A19:H19").values = [["提交前检查"]];
guide.getRange("A19:H19").format = sectionFmt;
const checks = [
  ["□", "每个新增角色都有唯一角色ID、基础属性、技能名和完整机制描述"],
  ["□", "技能描述中出现的每一个数字，都已在“02技能数值”建立参数行"],
  ["□", "所有新阵营都已填写颜色、全部激活人数档位和完整效果"],
  ["□", "羁绊描述中出现的每一个数字，都已在“04羁绊数值”建立参数行"],
  ["□", "百分比已按小数填写：15%=0.15；固定数值直接填写15"],
];
guide.getRange("A20:B24").values = checks;
guide.getRange("A20:B24").format = inputFmt;
for (let row = 20; row <= 24; row += 1) {
  guide.getRange(`B${row}:H${row}`).merge();
  guide.getRange(`B${row}:H${row}`).format = inputFmt;
}
guide.getRange("A26:H26").merge();
guide.getRange("A26:H26").values = [["颜色说明：浅蓝行 = 示例，请勿提交；浅黄行 = 你的填写区。可以增加行，但不要改列名。"]];
guide.getRange("A26:H26").format = { fill: C.mint, font: { bold: true, color: C.text }, wrapText: true };
widths(guide, [["A", 50], ["B", 150], ["C", 560], ["D", 32], ["E", 32], ["F", 32], ["G", 32], ["H", 32]]);
guide.freezePanes.freezeRows(4);
guide.showGridLines = false;

// 新增棋子
title(units, "W", "01 · 新增棋子", "每个新增角色填写一行。浅蓝色为示例；从第7行开始填写。角色ID会同时成为 balance-config.js 中的技能键名。除备注外尽量不要留空。");
const unitHeaders = [
  "本批次标记", "角色ID（英文小写）", "角色名称", "费用", "阵营1", "阵营2", "阵营3", "角色定位", "攻击距离（格）",
  "生命值", "攻击力", "攻击速度", "护甲", "魔抗", "最大法力", "技能名称", "施法目标", "伤害/效果类型",
  "完整机制描述", "头像文件名", "是否需要新机制", "显示文案偏好", "备注"
];
const unitExample = [
  "示例-不要提交", "examplehero", "示例侠", 3, "示例阵营", "", "", "远程持续输出", 4,
  700, 70, 0.75, 25, 25, 80, "星火连射", "当前目标", "魔法伤害",
  "满蓝后连续攻击当前目标3次，每次造成1/2/3星不同的魔法伤害；若目标死亡则自动更换目标。", "examplehero.png", "是", "突出三连击和换目标", "此行为填写示范"
];
prepareTable(units, "W", unitHeaders, unitExample, 15, "NewUnitsTable");
widths(units, [["A", 105], ["B", 145], ["C", 105], ["D", 55], ["E", 100], ["F", 100], ["G", 100], ["H", 135], ["I", 95], ["J", 75], ["K", 70], ["L", 75], ["M", 65], ["N", 65], ["O", 75], ["P", 125], ["Q", 130], ["R", 115], ["S", 430], ["T", 145], ["U", 110], ["V", 240], ["W", 220]]);
units.getRange("D7:D21").dataValidation = { rule: { type: "whole", operator: "between", formula1: 1, formula2: 5 } };
units.getRange("I7:I21").dataValidation = { rule: { type: "whole", operator: "between", formula1: 1, formula2: 8 } };
units.getRange("J7:K21").dataValidation = { rule: { type: "whole", operator: "between", formula1: 0, formula2: 9999 } };
units.getRange("L7:L21").dataValidation = { rule: { type: "decimal", operator: "between", formula1: 0.1, formula2: 10 } };
units.getRange("M7:O21").dataValidation = { rule: { type: "whole", operator: "between", formula1: 0, formula2: 9999 } };
units.getRange("R7:R21").dataValidation = { rule: { type: "list", values: ["物理伤害", "魔法伤害", "真实伤害", "治疗/护盾", "增益/变身", "控制/减益", "召唤", "混合/其他"] } };
units.getRange("U7:U21").dataValidation = { rule: { type: "list", values: ["是", "否", "不确定"] } };
units.getRange("D6:O21").format.horizontalAlignment = "center";
units.getRange("L6:L21").format.numberFormat = "0.00";

// 技能参数
title(skills, "M", "02 · 技能数值（同步至 balance-config.js）", "一个参数填写一行，角色ID必须与“01新增棋子”一致。参数键使用英文camelCase；有星级差异时填写1/2/3星值，无差异时只填通用值。");
const skillHeaders = ["本批次标记", "角色ID", "参数键（英文）", "参数中文含义", "数值类型", "1星值", "2星值", "3星值", "通用值", "单位", "写入技能说明", "作用方式/计算公式", "备注"];
const skillExample = ["示例-不要提交", "examplehero", "damage", "每次攻击伤害", "星级数组", 120, 180, 280, "", "点", "是", "每次命中造成该数值魔法伤害", "将生成 damage: [120,180,280]"];
prepareTable(skills, "M", skillHeaders, skillExample, 35, "SkillParamsTable");
widths(skills, [["A", 105], ["B", 135], ["C", 145], ["D", 170], ["E", 115], ["F", 75], ["G", 75], ["H", 75], ["I", 95], ["J", 75], ["K", 105], ["L", 320], ["M", 240]]);
skills.getRange("E7:E41").dataValidation = { rule: { type: "list", values: ["星级数组", "普通数字", "百分比", "布尔值", "整数数组", "文本", "其他"] } };
skills.getRange("K7:K41").dataValidation = { rule: { type: "list", values: ["是", "否"] } };
skills.getRange("F6:K41").format.horizontalAlignment = "center";

// 新增羁绊
title(traits, "N", "03 · 新增羁绊与全部等级效果", "同一羁绊每个激活档位填写一行。例如2/4/6人羁绊填写三行；名称与颜色重复填写，方便我直接导入和检查。");
const traitHeaders = ["本批次标记", "羁绊名称", "代表颜色（HEX）", "档位序号", "激活人数", "档位名称", "影响对象", "触发时机", "完整效果文案", "完整机制描述", "叠加规则", "是否需要新机制", "克制/联动关系", "备注"];
const traitExample = ["示例-不要提交", "示例阵营", "#4FA3D1", 1, 2, "星火共鸣", "本阵营单位", "战斗开始", "本阵营单位获得15%攻击速度。", "开战时给所有拥有该羁绊的友军添加永久攻击速度增益，本场持续，阵亡后结束。", "同档不叠加，高档覆盖低档", "否", "无", "第二档需另起一行"];
prepareTable(traits, "N", traitHeaders, traitExample, 20, "NewTraitsTable");
widths(traits, [["A", 105], ["B", 125], ["C", 120], ["D", 75], ["E", 80], ["F", 135], ["G", 135], ["H", 125], ["I", 330], ["J", 420], ["K", 190], ["L", 110], ["M", 220], ["N", 220]]);
traits.getRange("D7:D26").dataValidation = { rule: { type: "whole", operator: "between", formula1: 1, formula2: 8 } };
traits.getRange("E7:E26").dataValidation = { rule: { type: "whole", operator: "between", formula1: 1, formula2: 20 } };
traits.getRange("L7:L26").dataValidation = { rule: { type: "list", values: ["是", "否", "不确定"] } };
traits.getRange("D6:H26").format.horizontalAlignment = "center";

// 羁绊参数
title(traitParams, "N", "04 · 羁绊数值（同步至 balance-config.js）", "一个参数填写一行。按档位变化的参数填入档位1～4；全档通用参数填“通用值”。如超过4档，可在备注中继续写或复制新增档位列。");
const traitParamHeaders = ["本批次标记", "羁绊名称", "参数键（英文）", "参数中文含义", "数值类型", "档位1", "档位2", "档位3", "档位4", "通用值", "单位", "写入效果说明", "作用方式/计算公式", "备注"];
const traitParamExample = ["示例-不要提交", "示例阵营", "attackSpeed", "本阵营攻击速度", "档位数组", 0.15, 0.3, "", "", "", "%（填小数）", "是", "对本阵营存活单位增加基础攻速比例", "将生成 attackSpeed: [0.15,0.30]"];
prepareTable(traitParams, "N", traitParamHeaders, traitParamExample, 35, "TraitParamsTable");
widths(traitParams, [["A", 105], ["B", 125], ["C", 155], ["D", 180], ["E", 115], ["F", 75], ["G", 75], ["H", 75], ["I", 75], ["J", 95], ["K", 95], ["L", 115], ["M", 340], ["N", 240]]);
traitParams.getRange("E7:E41").dataValidation = { rule: { type: "list", values: ["档位数组", "普通数字", "百分比", "布尔值", "整数数组", "文本", "其他"] } };
traitParams.getRange("L7:L41").dataValidation = { rule: { type: "list", values: ["是", "否"] } };
traitParams.getRange("F6:L41").format.horizontalAlignment = "center";

// 字段字典
title(dictionary, "F", "字段字典与填写示例", "不确定怎么填时查这里。参数键只是建议；新机制可自定义英文键名，我会按模板内容实现。百分比永远填写小数。");
const dictHeaders = ["所属表", "字段/示例参数键", "填写规则", "正确示例", "错误示例", "同步位置"];
const dictRows = [
  ["01新增棋子", "角色ID", "唯一、英文小写，可含数字，不用空格", "newhero / hero2", "新英雄 / New Hero", "game-data + balance skills键"],
  ["01新增棋子", "攻击速度", "每秒攻击次数，建议0.40～1.20", "0.75", "75%", "game-data"],
  ["01新增棋子", "阵营1～3", "填写羁绊显示名称，阵营1必填", "星网", "xingwang", "game-data origins"],
  ["02技能数值", "damage", "技能伤害；有星级差异用星级数组", "120 / 180 / 280", "120点", "balance.skills[角色ID]"],
  ["02技能数值", "duration", "持续时间通常填通用值", "4，单位秒", "4秒（写在数值格）", "balance.skills[角色ID]"],
  ["02技能数值", "attackSpeed", "比例类统一用小数", "0.25 = 25%", "25", "balance.skills[角色ID]"],
  ["02技能数值", "targetCount", "目标数量可按星级变化", "2 / 3 / 5", "2个", "balance.skills[角色ID]"],
  ["03新增羁绊", "代表颜色", "使用#开头的6位HEX颜色", "#4FA3D1", "蓝色", "game-data originColors"],
  ["03新增羁绊", "激活人数", "达到该不同角色数时激活", "2 / 4 / 6", "两人", "balance.traits counts"],
  ["04羁绊数值", "teamHealth", "生命比例填写小数", "0.20 = 20%", "20", "balance.traits[羁绊]"],
  ["04羁绊数值", "count / counts", "不用单独重复填写；由03表激活人数生成", "03表写2/4", "这里再写一遍", "balance.traits[羁绊]"],
  ["所有表", "本批次标记", "同一次提交写相同短名称，便于追踪", "2026-07新角色", "留空也可但不推荐", "仅用于管理，不进游戏"],
];
dictionary.getRange("A5:F5").values = [dictHeaders];
dictionary.getRange("A5:F5").format = headerFmt;
dictionary.getRange("A6:F17").values = dictRows;
dictionary.getRange("A6:F17").format = { ...inputFmt, fill: C.pale };
dictionary.getRange("A6:F17").format.rowHeightPx = 38;
const dictTable = dictionary.tables.add("A5:F17", true, "FieldDictionaryTable");
dictTable.style = "TableStyleMedium4";
dictTable.showFilterButton = true;
widths(dictionary, [["A", 120], ["B", 175], ["C", 350], ["D", 180], ["E", 190], ["F", 220]]);
dictionary.freezePanes.freezeRows(5);

await fs.mkdir(outputDir, { recursive: true });
const guidePreview = await workbook.render({ sheetName: "填写说明", range: "A1:H26", scale: 1.4, format: "png" });
await fs.writeFile(path.join(outputDir, "preview-guide.png"), new Uint8Array(await guidePreview.arrayBuffer()));
const unitPreview = await workbook.render({ sheetName: "01新增棋子", range: "A1:W12", scale: 1.1, format: "png" });
await fs.writeFile(path.join(outputDir, "preview-units.png"), new Uint8Array(await unitPreview.arrayBuffer()));
const traitPreview = await workbook.render({ sheetName: "03新增羁绊", range: "A1:N12", scale: 1.1, format: "png" });
await fs.writeFile(path.join(outputDir, "preview-traits.png"), new Uint8Array(await traitPreview.arrayBuffer()));
const skillPreview = await workbook.render({ sheetName: "02技能数值", range: "A1:M12", scale: 1.1, format: "png" });
await fs.writeFile(path.join(outputDir, "preview-skills.png"), new Uint8Array(await skillPreview.arrayBuffer()));
const traitParamPreview = await workbook.render({ sheetName: "04羁绊数值", range: "A1:N12", scale: 1.1, format: "png" });
await fs.writeFile(path.join(outputDir, "preview-trait-params.png"), new Uint8Array(await traitParamPreview.arrayBuffer()));
const dictionaryPreview = await workbook.render({ sheetName: "字段字典", range: "A1:F17", scale: 1.2, format: "png" });
await fs.writeFile(path.join(outputDir, "preview-dictionary.png"), new Uint8Array(await dictionaryPreview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

const inspect = await workbook.inspect({
  kind: "table",
  range: "填写说明!A1:H26",
  include: "values,formulas",
  tableMaxRows: 30,
  tableMaxCols: 10,
});
await fs.writeFile(path.join(outputDir, "verification.ndjson"), inspect.ndjson, "utf8");

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
await fs.writeFile(path.join(outputDir, "formula-errors.ndjson"), errors.ndjson, "utf8");

console.log(outputPath);
