import fs from "node:fs/promises";
import vm from "node:vm";

const originalBalance = await fs.readFile("src/balance-config.js", "utf8");
const dataCode = await fs.readFile("src/game-data.js", "utf8");
const appCode = await fs.readFile("src/app.js", "utf8");
const battleStart = appCode.indexOf("const BATTLE_TICK_SECONDS");
const battleEnd = appCode.indexOf("async function playBattle");
if (battleStart < 0 || battleEnd < 0) throw new Error("Battle engine section not found");

const editedBalance = originalBalance
  .replace("ccg: { damage: [160, 230, 360] }", "ccg: { damage: [9999, 9999, 9999] }")
  .replace('"TCG老板": { count: 1, teamHealth: 0.20', '"TCG老板": { count: 1, teamHealth: 0.50');
if (editedBalance === originalBalance) throw new Error("Test could not edit balance source");

const context = vm.createContext({
  window: { setTimeout }, console, Math, Set, Map, Infinity,
  state: { battleSpeed: 1, suppressLog: false, log: [], board: [], enemy: [], gold: 0, hp: 100, round: 1 },
  pushLog() {}, currentOpponent() { return null; }, survivorDamage() { return 0; }, eliminateAi() {}, render() {}
});
vm.runInContext(editedBalance, context);
vm.runInContext(dataCode, context);
context.traitRules = context.window.GAME_DATA.traits;
context.balance = context.window.BALANCE_CONFIG;
vm.runInContext(`${appCode.slice(battleStart, battleEnd)}\n;globalThis.api={toFighter,prepareBattleFighters,castSkill};`, context);

const units = context.window.GAME_DATA.units;
const clone = (unit) => ({ ...unit, origins: [...unit.origins], stats: { ...unit.stats }, star: 1, uid: unit.id, baseId: unit.id, permanentGrowth: 0, pigeonBuffNext: false });
const ccgUnit = units.find((unit) => unit.id === "ccg");
const targetUnit = units.find((unit) => unit.id === "lin");
const source = context.api.toFighter(clone(ccgUnit), "player", 0);
const target = context.api.toFighter(clone(targetUnit), "enemy", 0);
const fighters = context.api.prepareBattleFighters([source, target]);
context.api.castSkill(source, fighters, 0, target);

if (!ccgUnit.skillDescription.includes("9999")) throw new Error("Edited skill value did not update tooltip text");
if (source.damageDealt < 1000) throw new Error("Edited skill value did not update battle damage");
if (!context.window.GAME_DATA.traits["TCG老板"][0].effect.includes("50%")) throw new Error("Edited trait value did not update trait text");

const boss = context.api.toFighter(clone(units.find((unit) => unit.id === "gmj")), "player", 0);
context.api.prepareBattleFighters([boss]);
if (boss.maxHp !== Math.round(boss.stats.health * 1.5)) throw new Error("Edited trait value did not update battle stats");

console.log("Balance config smoke test OK: saved values drive both UI text and battle mechanics");
