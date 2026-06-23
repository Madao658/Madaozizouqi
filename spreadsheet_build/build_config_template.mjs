import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = path.resolve(".");
const outputDir = path.join(root, "outputs", "chess-multi-origin-template");
const data = JSON.parse(await fs.readFile(path.join(root, "data", "units.json"), "utf8"));

const workbook = Workbook.create();
const guide = workbook.worksheets.add("填写说明");
const unitsSheet = workbook.worksheets.add("棋子配置");
const originDefsSheet = workbook.worksheets.add("阵营定义");
const originsSheet = workbook.worksheets.add("阵营羁绊");

const colors = {
  navy: "#183B3A",
  teal: "#2E6862",
  mint: "#DDEFE9",
  pale: "#F7FBF9",
  input: "#FFF6D8",
  gray: "#E8ECEB",
  line: "#B9CEC7",
  text: "#243634",
  muted: "#5D716D",
  gold: "#D6A947",
  white: "#FFFFFF",
};

const titleFormat = {
  fill: colors.navy,
  font: { bold: true, color: colors.white, size: 18 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
const sectionFormat = {
  fill: colors.teal,
  font: { bold: true, color: colors.white, size: 11 },
  verticalAlignment: "center",
};
const headerFormat = {
  fill: colors.teal,
  font: { bold: true, color: colors.white, size: 10 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
  borders: { preset: "all", style: "thin", color: colors.line },
};
const bodyFormat = {
  fill: colors.input,
  font: { color: colors.text, size: 10 },
  verticalAlignment: "center",
  wrapText: true,
  borders: { preset: "all", style: "thin", color: colors.line },
};

function setColumnWidths(sheet, widths) {
  widths.forEach(([col, width]) => {
    sheet.getRange(`${col}:${col}`).format.columnWidthPx = width;
  });
}

function styleTitle(sheet, range, title, subtitleRange, subtitle) {
  sheet.getRange(range).merge();
  sheet.getRange(range).values = [[title]];
  sheet.getRange(range).format = titleFormat;
  sheet.getRange(range).format.rowHeightPx = 30;
  sheet.getRange(subtitleRange).merge();
  sheet.getRange(subtitleRange).values = [[subtitle]];
  sheet.getRange(subtitleRange).format = {
    fill: colors.mint,
    font: { color: colors.muted, italic: true, size: 10 },
    verticalAlignment: "center",
    wrapText: true,
  };
  sheet.getRange(subtitleRange).format.rowHeightPx = 34;
  sheet.showGridLines = false;
}

const targetingLabels = {
  lowestHealthAlly: "最低生命友军",
  currentTarget: "当前目标",
  frontArc: "前方扇形",
  self: "自身",
  randomEnemy: "随机敌人",
  backlineEnemy: "敌方后排",
  nearbyAllies: "附近友军",
  enemyLine: "一列/路径敌人",
  lowestHealthEnemy: "最低生命敌人",
  areaAroundSelf: "自身周围区域",
  allAllies: "全体友军",
  farthestEnemy: "最远敌人",
  enemyCluster: "敌人密集区域",
  lastAllySkill: "上一名施法友军",
  emptyAdjacentCells: "相邻空格",
  multipleEnemies: "多个敌人",
};

function damageType(description) {
  const hasPhysical = description.includes("物理伤害");
  const hasMagic = description.includes("魔法伤害");
  const hasSupport = /治疗|护盾/.test(description);
  const hasSummon = /召唤/.test(description);
  const hasControl = /冻结|沉默|嘲讽|减速|降低|击退/.test(description);
  const groups = [hasPhysical, hasMagic, hasSupport, hasSummon, hasControl].filter(Boolean).length;
  if (groups > 1) return "混合/其他";
  if (hasPhysical) return "物理伤害";
  if (hasMagic) return "魔法伤害";
  if (hasSupport) return "治疗/护盾";
  if (hasSummon) return "召唤";
  if (hasControl) return "控制/减益";
  return "增益/变身";
}

// 填写说明
guide.getRange("A1:H2").merge();
guide.getRange("A1:H2").values = [["自走棋多阵营配置模板（无职业）"]];
guide.getRange("A1:H2").format = titleFormat;
guide.getRange("A1:H2").format.rowHeightPx = 32;
guide.getRange("A4:H4").merge();
guide.getRange("A4:H4").values = [["使用方法"]];
guide.getRange("A4:H4").format = sectionFormat;
const guideRows = [
  ["1", "无职业规则", "职业概念已完全移除。“定位”仅用于描述棋子玩法，不会触发任何羁绊。"],
  ["2", "多阵营", "每个棋子可填写 1～3 个阵营。同一棋子的三个阵营不能重复，留空表示没有第二或第三阵营。"],
  ["3", "攻击射程", "射程按棋盘格计算：1 格通常为近战，2 格及以上为远程；每个棋子独立填写，不再依赖职业。"],
  ["4", "阵营配置", "先在“阵营定义”填写阵营名称，再在“阵营羁绊”中为每个激活档位单独填写一行。"],
  ["5", "技能描述", "请明确目标、1/2/3 星数值、伤害类型、范围、持续时间、控制效果和特殊触发条件。"],
  ["6", "提交方式", "填写完成后把此 Excel 文件交回，我会以表格内容为准重构游戏。"],
];
guide.getRange(`A5:C${4 + guideRows.length}`).values = guideRows;
guide.getRange(`A5:C${4 + guideRows.length}`).format = {
  ...bodyFormat,
  fill: colors.pale,
};
guide.getRange("A5:A10").format = { horizontalAlignment: "center", font: { bold: true, color: colors.teal } };
guide.getRange("A12:H12").merge();
guide.getRange("A12:H12").values = [["提交前检查清单"]];
guide.getRange("A12:H12").format = sectionFormat;
const checks = [
  ["□", "每个棋子至少填写阵营1，并确认阵营1/2/3没有重复"],
  ["□", "每个棋子都有独立射程、最大蓝量、技能名称和完整技能效果"],
  ["□", "技能中的所有数值均说明 1/2/3 星差异；没有差异时写明“全星级相同”"],
  ["□", "所有使用中的阵营都在“阵营定义”和“阵营羁绊”中出现"],
  ["□", "控制、增益、减益均写明持续时间及是否可以叠加"],
];
guide.getRange("A13:B17").values = checks;
guide.getRange("A13:B17").format = { ...bodyFormat, fill: colors.input };
for (let row = 13; row <= 17; row += 1) {
  guide.getRange(`B${row}:H${row}`).merge();
  guide.getRange(`B${row}:H${row}`).format = { ...bodyFormat, fill: colors.input };
}
guide.getRange("A19:H19").merge();
guide.getRange("A19:H19").values = [["颜色说明：黄色 = 请填写或确认；灰色 = 关联字段，通常不要修改；绿色标题 = 表结构。"]];
guide.getRange("A19:H19").format = {
  fill: colors.mint,
  font: { color: colors.text, bold: true },
  wrapText: true,
};
setColumnWidths(guide, [["A", 48], ["B", 145], ["C", 560], ["D", 28], ["E", 28], ["F", 28], ["G", 28], ["H", 28]]);
guide.getRange("5:10").format.rowHeightPx = 42;
guide.getRange("13:17").format.rowHeightPx = 32;
guide.freezePanes.freezeRows(4);

// 棋子配置
const unitHeaders = ["ID（勿改）", "棋子名", "费用", "阵营1", "阵营2", "阵营3", "定位（非职业）", "攻击射程（格）", "生命", "攻击", "攻速", "护甲", "魔抗", "初始蓝量", "最大蓝量", "技能名称", "技能目标", "效果类型", "施法方式", "技能效果（写清1/2/3星）", "实现备注"];
styleTitle(
  unitsSheet,
  "A1:U2",
  "棋子配置（无职业 / 最多三阵营）",
  "A3:U3",
  "阵营1必填，阵营2/3可选且不能重复；射程按格填写，1格为近战，2格及以上为远程。"
);
unitsSheet.getRange("A5:U5").values = [unitHeaders];
unitsSheet.getRange("A5:U5").format = headerFormat;
const unitRows = data.units.map((unit) => [
  unit.id,
  unit.name,
  unit.cost,
  unit.origin,
  "",
  "",
  unit.role,
  unit.range,
  unit.stats.health,
  unit.stats.attack,
  unit.stats.attackSpeed,
  unit.stats.armor,
  unit.stats.magicResist,
  0,
  unit.stats.mana,
  unit.skill.name,
  targetingLabels[unit.skill.targeting] || unit.skill.targeting,
  damageType(unit.skill.description),
  "主动技能（满蓝）",
  unit.skill.description,
  "",
]);
unitsSheet.getRange(`A6:U${5 + unitRows.length}`).values = unitRows;
unitsSheet.getRange(`A6:U${5 + unitRows.length}`).format = bodyFormat;
unitsSheet.getRange(`A6:A${5 + unitRows.length}`).format = {
  fill: colors.gray,
  font: { color: colors.muted },
  borders: { preset: "all", style: "thin", color: colors.line },
};
unitsSheet.getRange(`C6:O${5 + unitRows.length}`).format.horizontalAlignment = "center";
unitsSheet.getRange(`A6:U${5 + unitRows.length}`).format.rowHeightPx = 48;
unitsSheet.getRange(`K6:K${5 + unitRows.length}`).format.numberFormat = "0.00";
unitsSheet.getRange(`C6:C${5 + unitRows.length}`).dataValidation = { rule: { type: "whole", operator: "between", formula1: 1, formula2: 5 } };
unitsSheet.getRange(`D6:F${5 + unitRows.length}`).dataValidation = { rule: { type: "list", formula1: "'阵营定义'!$A$6:$A$25" } };
unitsSheet.getRange(`H6:H${5 + unitRows.length}`).dataValidation = { rule: { type: "whole", operator: "between", formula1: 1, formula2: 8 } };
unitsSheet.getRange(`I6:J${5 + unitRows.length}`).dataValidation = { rule: { type: "whole", operator: "between", formula1: 0, formula2: 9999 } };
unitsSheet.getRange(`L6:O${5 + unitRows.length}`).dataValidation = { rule: { type: "whole", operator: "between", formula1: 0, formula2: 9999 } };
unitsSheet.getRange(`R6:R${5 + unitRows.length}`).dataValidation = { rule: { type: "list", values: ["物理伤害", "魔法伤害", "真实伤害", "治疗/护盾", "增益/变身", "控制/减益", "召唤", "混合/其他"] } };
unitsSheet.getRange(`S6:S${5 + unitRows.length}`).dataValidation = { rule: { type: "list", values: ["主动技能（满蓝）", "被动技能", "开战触发", "普攻触发", "受击触发", "死亡触发", "其他"] } };
const unitTable = unitsSheet.tables.add(`A5:U${5 + unitRows.length}`, true, "UnitMultiOriginTable");
unitTable.style = "TableStyleMedium4";
unitTable.showFilterButton = true;
setColumnWidths(unitsSheet, [["A", 130], ["B", 105], ["C", 55], ["D", 90], ["E", 90], ["F", 90], ["G", 120], ["H", 95], ["I", 72], ["J", 65], ["K", 65], ["L", 62], ["M", 62], ["N", 75], ["O", 75], ["P", 125], ["Q", 135], ["R", 110], ["S", 135], ["T", 380], ["U", 260]]);
unitsSheet.freezePanes.freezeRows(5);
unitsSheet.freezePanes.freezeColumns(2);

// 阵营定义
styleTitle(
  originDefsSheet,
  "A1:E2",
  "阵营定义",
  "A3:E3",
  "每个阵营只占一行。棋子配置中的阵营1/2/3应从本表选择；可直接改名、删除或新增阵营。"
);
const originDefHeaders = ["阵营名称", "主题 / 战斗定位", "代表色（可选）", "阵营设计说明", "实现备注"];
originDefsSheet.getRange("A5:E5").values = [originDefHeaders];
originDefsSheet.getRange("A5:E5").format = headerFormat;
const originMeta = {
  星网: ["科技 / 法力", "#4FA3D1", "围绕技能、法力或科技联动。"],
  雪庭: ["冰霜 / 控制", "#9DD7E5", "围绕减速、冻结或控制。"],
  武馆: ["近战 / 生存", "#C28C52", "围绕前排、生存和持续作战。"],
  暗巷: ["爆发 / 收割", "#8C6FA8", "围绕切入、暴击或击杀收益。"],
  牧场: ["召唤 / 支援", "#75B879", "围绕召唤、治疗和团队支援。"],
  龙印: ["成长 / 核心", "#D6A947", "围绕成长或单核强化。"],
};
const originDefRows = Object.keys(data.traits.origins).map((name) => [
  name,
  originMeta[name]?.[0] || "",
  originMeta[name]?.[1] || "",
  originMeta[name]?.[2] || "",
  "",
]);
while (originDefRows.length < 20) originDefRows.push(["", "", "", "", ""]);
originDefsSheet.getRange("A6:E25").values = originDefRows;
originDefsSheet.getRange("A6:E25").format = bodyFormat;
originDefsSheet.getRange("A6:E25").format.rowHeightPx = 38;
const originDefTable = originDefsSheet.tables.add("A5:E25", true, "OriginDefinitionTable");
originDefTable.style = "TableStyleMedium4";
originDefTable.showFilterButton = true;
setColumnWidths(originDefsSheet, [["A", 125], ["B", 170], ["C", 125], ["D", 390], ["E", 280]]);
originDefsSheet.freezePanes.freezeRows(5);

const originLabels = {
  "星网-2": "回蓝", "星网-4": "技能强化", "雪庭-2": "减速", "雪庭-4": "冻结",
  "武馆-2": "双抗", "武馆-4": "吸血", "暗巷-2": "跳后", "暗巷-4": "暴击收割",
  "牧场-2": "召唤", "牧场-4": "召唤治疗", "龙印-1": "击杀成长",
};
function triggerFromEffect(effect) {
  if (effect.includes("战斗开始")) return "战斗开始";
  if (effect.includes("攻击") || effect.includes("每")) return "攻击时/持续生效";
  if (effect.includes("击杀")) return "击杀时";
  if (effect.includes("死亡")) return "死亡时";
  return "常驻效果";
}

function buildTraitSheet(sheet, title, subtitle, source, labels, tableName) {
  const headers = ["名称", "激活人数", "档位名称", "生效对象", "触发时机", "效果说明", "实现备注"];
  styleTitle(sheet, "A1:G2", title, "A3:G3", subtitle);
  sheet.getRange("A5:G5").values = [headers];
  sheet.getRange("A5:G5").format = headerFormat;
  const rows = [];
  for (const [name, config] of Object.entries(source)) {
    for (const tier of config.thresholds) {
      rows.push([
        name,
        tier.count,
        labels[`${name}-${tier.count}`] || `${tier.count}人效果`,
        "请按效果说明确认",
        triggerFromEffect(tier.effect),
        tier.effect,
        "",
      ]);
    }
  }
  while (rows.length < 24) rows.push(["", "", "", "", "", "", ""]);
  sheet.getRange("A6:G29").values = rows;
  sheet.getRange("A6:G29").format = bodyFormat;
  sheet.getRange("B6:B29").format.horizontalAlignment = "center";
  sheet.getRange("A6:G29").format.rowHeightPx = 42;
  sheet.getRange("A6:A29").dataValidation = { rule: { type: "list", formula1: "'阵营定义'!$A$6:$A$25" } };
  sheet.getRange("B6:B29").dataValidation = { rule: { type: "whole", operator: "between", formula1: 1, formula2: 20 } };
  sheet.getRange("E6:E29").dataValidation = { rule: { type: "list", values: ["常驻效果", "战斗开始", "攻击时", "受击时", "施法时", "击杀时", "死亡时", "回合开始", "其他"] } };
  const table = sheet.tables.add("A5:G29", true, tableName);
  table.style = "TableStyleMedium4";
  table.showFilterButton = true;
  setColumnWidths(sheet, [["A", 110], ["B", 80], ["C", 125], ["D", 150], ["E", 125], ["F", 500], ["G", 280]]);
  sheet.freezePanes.freezeRows(5);
  sheet.freezePanes.freezeColumns(1);
}

buildTraitSheet(
  originsSheet,
  "阵营羁绊",
  "每个档位单独一行；名称必须与“棋子配置”的阵营列完全一致。预留空白行可新增阵营或档位。",
  data.traits.origins,
  originLabels,
  "OriginTraitTable"
);

await fs.mkdir(outputDir, { recursive: true });
for (const [sheetName, range, filename] of [
  ["填写说明", "A1:H20", "preview-guide.png"],
  ["棋子配置", "A1:U12", "preview-units.png"],
  ["阵营定义", "A1:E18", "preview-origin-defs.png"],
  ["阵营羁绊", "A1:G18", "preview-origins.png"],
]) {
  const preview = await workbook.render({ sheetName, range, scale: 1, format: "png" });
  await fs.writeFile(path.join(outputDir, filename), new Uint8Array(await preview.arrayBuffer()));
}

const unitInspect = await workbook.inspect({
  kind: "table",
  range: "棋子配置!A5:U9",
  include: "values,formulas",
  tableMaxRows: 5,
  tableMaxCols: 21,
});
console.log(unitInspect.ndjson);
const errorScan = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
console.log(errorScan.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
const outputPath = path.join(outputDir, "自走棋无职业多阵营配置模板.xlsx");
await output.save(outputPath);
console.log(outputPath);
