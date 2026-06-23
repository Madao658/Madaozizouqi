import fs from "node:fs/promises";
import vm from "node:vm";

const balanceCode = await fs.readFile("src/balance-config.js", "utf8");
const dataCode = await fs.readFile("src/game-data.js", "utf8");
const appCode = await fs.readFile("src/app.js", "utf8");
const battleStart = appCode.indexOf("const BATTLE_TICK_SECONDS");
const battleEnd = appCode.indexOf("async function playBattle");
const goldStart = appCode.indexOf("function traitWinGold");
const goldEnd = appCode.indexOf("function eliminateAi", goldStart);
if ([battleStart, battleEnd, goldStart, goldEnd].some((index) => index < 0)) throw new Error("Required game sections not found");

const context = vm.createContext({
  window: { setTimeout }, console, Math, Set, Map, Infinity,
  state: { battleSpeed: 1, suppressLog: true, log: [], board: [], enemy: [], gold: 0, hp: 100, round: 1, combatFighters: null, combatTexts: [] },
  pushLog() {}, currentOpponent() { return null; }, survivorDamage() { return 0; }, eliminateAi() {}, render() {},
});
vm.runInContext(balanceCode, context);
vm.runInContext(dataCode, context);
context.balance = context.window.BALANCE_CONFIG;
context.traitRules = context.window.GAME_DATA.traits;
vm.runInContext(`${appCode.slice(battleStart, battleEnd)}\n${appCode.slice(goldStart, goldEnd)}\n;globalThis.api={toFighter,prepareBattleFighters,processTimedEffects,castSkill,applyDamage,addShield,traitOutcomeGold,ticksFor};`, context);

const units = context.window.GAME_DATA.units;
const api = context.api;
const unit = (id) => units.find((item) => item.id === id);
const clone = (id) => {
  const base = unit(id);
  if (!base) throw new Error(`Missing unit ${id}`);
  return { ...base, origins: [...base.origins], stats: { ...base.stats }, star: 1, uid: `${id}-${Math.random()}`, baseId: id, permanentGrowth: 0, pigeonBuffNext: false };
};

for (const id of ["ljl", "wty", "ding", "zijian", "szx", "weige"]) {
  if (!context.balance.skills[id]) throw new Error(`Missing balance skill ${id}`);
}
for (const name of ["打卡王", "996", "撸神", "逃离塔科夫", "测评师", "卷王"]) {
  if (!context.balance.traits[name] || !context.window.GAME_DATA.originColors[name]) throw new Error(`Missing trait data ${name}`);
}
if (unit("madao").origins.includes("撸狗") || !unit("madao").origins.includes("逃离塔科夫") || !unit("madao").origins.includes("测评师")) throw new Error("Madao trait reassignment is incorrect");
if (!unit("shuangye").origins.includes("逃离塔科夫") || !unit("muji").origins.includes("逃离塔科夫")) throw new Error("Escape from Tarkov trait additions are missing");

const workA = api.toFighter(clone("ljl"), "player", 0);
const workB = api.toFighter(clone("wty"), "player", 1);
const workEnemy = api.toFighter(clone("lin"), "enemy", 0);
const workBattle = api.prepareBattleFighters([workA, workB, workEnemy]);
api.addShield(workA, 999);
const workHp = workA.hp;
const workShield = workA.shields[0].amount;
api.processTimedEffects(workBattle, api.ticksFor(1));
if (workA.hp !== workHp - 10 || workA.shields[0].amount !== workShield || workA.attack !== 68 || workA.sourceUnit.stats.attack !== 65) throw new Error("996 tier-1 health loss or battle-only growth is incorrect");

const teacher = api.toFighter(clone("szx"), "player", 0);
const teacherAlly = api.toFighter(clone("wty"), "player", 1);
const teacherEnemy = api.toFighter(clone("lin"), "enemy", 0);
teacher.row = 4; teacher.col = 3; teacherAlly.row = 4; teacherAlly.col = 4; teacherEnemy.row = 3; teacherEnemy.col = 3;
const teacherBattle = api.prepareBattleFighters([teacher, teacherAlly, teacherEnemy]);
if (teacher.omnivamp !== 0.10 || teacherAlly.omnivamp !== 0.10) throw new Error("Workaholic omnivamp did not apply to all allies");
api.castSkill(teacher, teacherBattle, 0, teacherEnemy);
if (teacher.shields.length || !teacherAlly.shields.length || teacherAlly.shields[0].untilTick !== api.ticksFor(10)) throw new Error("Teacher shield targeting or duration is incorrect");

const reviewer = api.toFighter(clone("zijian"), "player", 0);
const reviewerAlly = api.toFighter(clone("ljl"), "player", 1);
const reviewTarget = api.toFighter(clone("lin"), "enemy", 0);
const reviewBattle = api.prepareBattleFighters([reviewer, reviewerAlly, reviewTarget]);
reviewTarget.hp = Math.floor(reviewTarget.maxHp * 0.04);
api.applyDamage(reviewer, reviewTarget, 1, "true", "skill", reviewBattle);
if (reviewTarget.hp !== 0) throw new Error("Reviewer execute did not trigger from skill damage");

const checkin = api.toFighter(clone("zijian"), "player", 0);
const checkinReviewer = api.toFighter(clone("ljl"), "player", 1);
const checkinWorker = api.toFighter(clone("wty"), "player", 2);
api.prepareBattleFighters([checkin, checkinReviewer, checkinWorker]);
if (checkin.maxHp !== 720) throw new Error(`Check-in King expected 20% bonus including itself, got ${checkin.maxHp}`);

const god = api.toFighter(clone("weige"), "player", 0);
const dog = api.toFighter(clone("ding"), "player", 1);
const godTarget = api.toFighter(clone("lin"), "enemy", 0);
const godBattle = api.prepareBattleFighters([god, dog, godTarget]);
god.hp -= 100;
api.applyDamage(god, godTarget, 100, "true", "skill", godBattle);
if (god.hp !== god.maxHp - 90 || !god.shields.some((shield) => shield.key === "lushen" && shield.amount === 5)) throw new Error("Lushen omnivamp or non-stacking shield is incorrect");

const escape = api.toFighter(clone("wty"), "player", 0);
const escapeBattle = api.prepareBattleFighters([escape]);
if (api.traitOutcomeGold(escapeBattle, "player", "win") !== 2 || api.traitOutcomeGold(escapeBattle, "player", "loss") !== -2) throw new Error("Escape from Tarkov economy values are incorrect");

console.log("New content smoke test OK: 6 units, 6 traits, combat and economy mechanics verified");
