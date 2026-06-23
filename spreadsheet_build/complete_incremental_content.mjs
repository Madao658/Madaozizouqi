import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/Users/Administrator/Downloads/自走棋新增棋子与羁绊模板.xlsx";
const outputDir = "outputs/filled-template-review";
const outputPath = path.join(outputDir, "自走棋新增棋子与羁绊模板-已补全.xlsx");
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(inputPath));
const units = workbook.worksheets.getItem("01新增棋子");
const skills = workbook.worksheets.getItem("02技能数值");
const traits = workbook.worksheets.getItem("03新增羁绊");
const traitParams = workbook.worksheets.getItem("04羁绊数值");

units.getRange("A7:A12").values = Array.from({ length: 6 }, () => ["2026-06新增"]);
units.getRange("U7:U12").values = Array.from({ length: 6 }, () => ["是"]);
units.getRange("V7:V12").values = [
  ["突出范围伤害与自我治疗"], ["突出5秒自我攻速强化"], ["突出后排低血目标与技能暴击"],
  ["突出真实伤害和队友护盾"], ["突出命中人数越多伤害越高"], ["突出把最远敌人拉到己方前排"]
];

const skillRows = [
  ["2026-06新增", "ljl", "damage", "技能魔法伤害", "星级数组", 130, 200, 320, null, "点", "是", "对生命最低的敌方后排造成伤害", "偏保守的一费爆发数值"],
  ["2026-06新增", "ljl", "critChance", "技能暴击概率", "百分比", null, null, null, 0.25, "%（填小数）", "是", "每次施法独立判定", ""],
  ["2026-06新增", "ljl", "critMultiplier", "技能暴击倍率", "普通数字", null, null, null, 2, "倍", "是", "暴击时技能伤害乘以该值", ""],
  ["2026-06新增", "wty", "attackSpeed", "自身攻击速度提升", "星级数组", 0.30, 0.45, 0.70, null, "%（填小数）", "是", "仅强化自己", ""],
  ["2026-06新增", "wty", "duration", "攻速持续时间", "普通数字", null, null, null, 5, "秒", "是", "重复施法刷新持续时间并保留更高数值", ""],
  ["2026-06新增", "ding", "damage", "拉人技能魔法伤害", "星级数组", 140, 210, 340, null, "点", "是", "无空位时仍然造成伤害", ""],
  ["2026-06新增", "zijian", "damage", "范围魔法伤害", "星级数组", 180, 270, 440, null, "点", "是", "对自身周围敌人分别造成伤害", ""],
  ["2026-06新增", "zijian", "radius", "技能半径", "普通数字", null, null, null, 1, "格", "是", "曼哈顿距离不超过1格", ""],
  ["2026-06新增", "zijian", "healingRatio", "伤害转治疗比例", "百分比", null, null, null, 0.20, "%（填小数）", "是", "按技能对全部目标的实际总伤害治疗自己", ""],
  ["2026-06新增", "szx", "damage", "范围真实伤害", "星级数组", 180, 280, 500, null, "点", "是", "无视护甲与魔抗", ""],
  ["2026-06新增", "szx", "radius", "技能与护盾半径", "普通数字", null, null, null, 1, "格", "是", "护盾不包含自己", ""],
  ["2026-06新增", "szx", "shieldDuration", "护盾持续时间", "普通数字", null, null, null, 10, "秒", "是", "每名邻近队友获得等于实际总伤害的护盾", ""],
  ["2026-06新增", "weige", "damage", "直线基础魔法伤害", "星级数组", 280, 420, 840, null, "点", "是", "路径内所有目标受到相同倍率伤害", ""],
  ["2026-06新增", "weige", "damagePerExtraTarget", "每多命中一人的伤害增幅", "百分比", null, null, null, 0.50, "%（填小数）", "是", "倍率=1+(命中人数-1)×该值", ""],
];
skills.getRange(`A7:M${6 + skillRows.length}`).values = skillRows;

const traitColors = ["#E09F3E", "#6C63A8", "#6C63A8", "#D35478", "#4D8C57", "#4D8C57", "#4D8C57", "#3E86B8", "#3E86B8", "#C65D3B"];
traits.getRange("A7:A16").values = Array.from({ length: 10 }, () => ["2026-06新增"]);
traits.getRange("C7:C16").values = traitColors.map((color) => [color]);
traits.getRange("D7:D16").values = [[1], [1], [2], [1], [1], [2], [3], [1], [2], [1]];
traits.getRange("J7:J16").values = [
  ["开战时统计己方当前已激活羁绊种类数，包括打卡王本身；按每种5%同时乘算打卡王单位的生命、攻击、护甲、魔抗和基础攻速。"],
  ["每1秒让存活996单位直接失去10生命，绕过护盾、减伤和双抗且可以死亡；存活后在本场战斗内累计增加3攻击。"],
  ["每1秒让存活996单位直接失去15生命，绕过护盾、减伤和双抗且可以死亡；存活后在本场战斗内累计增加5攻击、2护甲和2魔抗。"],
  ["开战统计己方实际在场的撸狗单位数量；每个给撸神10%全能吸血和5%伤害转护盾。护盾不累加，只保留当前值与新值中的较大值。"],
  ["普通对局胜利结算额外获得2金币；失败结算扣除2金币，金币最低为0。"],
  ["普通对局胜利结算额外获得4金币；失败结算扣除1金币，金币最低为0。"],
  ["普通对局胜利结算额外获得6金币；失败不扣金币。"],
  ["测评师单位的普通攻击或主动技能造成伤害后，若目标剩余生命不高于5%，立即处决。"],
  ["测评师单位的普通攻击或主动技能造成伤害后，若目标剩余生命不高于10%，立即处决。"],
  ["开战时所有友军获得10%全能吸血，普通攻击和技能造成实际伤害时均可治疗。"],
];
traits.getRange("K7:K16").values = [
  ["按已激活羁绊种类计算一次"], ["每秒仅在本场战斗内叠加属性"], ["高档覆盖低档，每秒仅在本场战斗内叠加属性"],
  ["吸血按撸狗数量相加；护盾不叠加，只刷新最大值"], ["高档覆盖低档"], ["高档覆盖低档"], ["高档覆盖低档"],
  ["高档覆盖低档"], ["高档覆盖低档"], ["固定10%，不重复叠加"]
];
traits.getRange("L7:L16").values = Array.from({ length: 10 }, () => ["是"]);
traits.getRange("M7:M16").values = [["包括打卡王自身羁绊"], ["可导致自身死亡"], ["可导致自身死亡"], ["读取实际撸狗单位数量"], ["仅普通对局经济结算"], ["仅普通对局经济结算"], ["仅普通对局经济结算"], ["普通攻击与技能均可触发"], ["普通攻击与技能均可触发"], ["无"]];

const traitParamRows = [
  ["2026-06新增", "打卡王", "bonusPerActiveTrait", "每个已激活羁绊提供的全属性比例", "百分比", null, null, null, null, 0.05, "%（填小数）", "是", "包括打卡王羁绊自身", ""],
  ["2026-06新增", "打卡王", "includeSelfTrait", "是否包括自身羁绊", "布尔值", null, null, null, null, true, "是/否", "否", "true表示包括", ""],
  ["2026-06新增", "996", "healthLoss", "每秒无视防御的生命流失", "档位数组", 10, 15, null, null, null, "点", "是", "可以导致自身死亡", ""],
  ["2026-06新增", "996", "attackGain", "每秒局内攻击提升", "档位数组", 3, 5, null, null, null, "点", "是", "仅在本场战斗内累计", ""],
  ["2026-06新增", "996", "resistGain", "每秒局内双抗提升", "档位数组", 0, 2, null, null, null, "点", "是", "仅在本场战斗内累计", ""],
  ["2026-06新增", "996", "interval", "效果触发间隔", "普通数字", null, null, null, null, 1, "秒", "是", "战斗开始1秒后首次触发", ""],
  ["2026-06新增", "撸神", "omnivampPerDog", "每个撸狗提供的全能吸血", "百分比", null, null, null, null, 0.10, "%（填小数）", "是", "按实际友方撸狗单位数量相加", ""],
  ["2026-06新增", "撸神", "shieldRatioPerDog", "每个撸狗提供的伤害转护盾比例", "百分比", null, null, null, null, 0.05, "%（填小数）", "是", "同名护盾不相加，只刷新更大值", ""],
  ["2026-06新增", "逃离塔科夫", "winGold", "胜利金币变化", "档位数组", 2, 4, 6, null, null, "金币", "是", "额外加入普通胜利奖励", ""],
  ["2026-06新增", "逃离塔科夫", "lossGold", "失败金币变化", "档位数组", -2, -1, 0, null, null, "金币", "是", "与安慰金共同结算，金币最低为0", ""],
  ["2026-06新增", "测评师", "executeThreshold", "处决生命阈值", "档位数组", 0.05, 0.10, null, null, null, "%（填小数）", "是", "普攻或主动技能伤害后检查", ""],
  ["2026-06新增", "卷王", "teamOmnivamp", "全体友军全能吸血", "百分比", null, null, null, null, 0.10, "%（填小数）", "是", "所有友军获得", ""],
];
traitParams.getRange(`A7:N${6 + traitParamRows.length}`).values = traitParamRows;

await fs.mkdir(outputDir, { recursive: true });
for (const [sheetName, range, fileName] of [
  ["02技能数值", "A1:M22", "completed-skills.png"],
  ["03新增羁绊", "A1:N16", "completed-traits.png"],
  ["04羁绊数值", "A1:N18", "completed-trait-params.png"],
]) {
  const preview = await workbook.render({ sheetName, range, scale: 1, format: "png" });
  await fs.writeFile(path.join(outputDir, fileName), new Uint8Array(await preview.arrayBuffer()));
}

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "completed template formula error scan",
});
await fs.writeFile(path.join(outputDir, "completed-formula-errors.ndjson"), errors.ndjson, "utf8");
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
