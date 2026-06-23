import fs from "node:fs/promises";
import vm from "node:vm";

const balanceCode = await fs.readFile("src/balance-config.js", "utf8");
const dataCode = await fs.readFile("src/game-data.js", "utf8");
const appCode = await fs.readFile("src/app.js", "utf8");
const start = appCode.indexOf("const BATTLE_TICK_SECONDS");
const end = appCode.indexOf("async function playBattle");
if (start < 0 || end < 0) throw new Error("Battle engine section not found");

const logs = [];
const context = vm.createContext({
  window: { setTimeout },
  console,
  Math,
  Set,
  Map,
  Infinity,
  state: { battleSpeed: 1, suppressLog: false, log: [], board: [], enemy: [], gold: 0, hp: 100, round: 1 },
  pushLog(message) { logs.push(message); },
  currentOpponent() { return null; },
  survivorDamage() { return 0; },
  eliminateAi() {},
  render() {},
});
vm.runInContext(balanceCode, context);
vm.runInContext(dataCode, context);
context.traitRules = context.window.GAME_DATA.traits;
context.balance = context.window.BALANCE_CONFIG;
vm.runInContext(`${appCode.slice(start, end)}\n;globalThis.battleApi={toFighter,prepareBattleFighters,battleStep,castSkill,processTimedEffects,activeCoreUnits,applyDamage,addShield,getSideTier,stepToward};`, context);

const { units } = context.window.GAME_DATA;
const api = context.battleApi;
const cloneUnit = (unit) => ({ ...unit, origins: [...unit.origins], stats: { ...unit.stats }, star: 1, uid: `${unit.id}-${Math.random()}`, baseId: unit.id, permanentGrowth: 0, pigeonBuffNext: unit.origins.includes("鸽子王") });

for (const unit of units) {
  const source = api.toFighter(cloneUnit(unit), "player", 0);
  const ally = api.toFighter(cloneUnit(units[1]), "player", 1);
  const enemies = [0, 1, 2].map((index) => api.toFighter(cloneUnit(units[(index + 7) % units.length]), "enemy", index)).filter(Boolean);
  const fighters = api.prepareBattleFighters([source, ally, ...enemies].filter(Boolean));
  const target = fighters.find((fighter) => fighter.side === "enemy" && fighter.hp > 0);
  if (!source || !target) throw new Error(`Missing test fighter for ${unit.id}`);
  api.castSkill(source, fighters, 0, target);
  for (let tick = 0; tick < 12; tick += 1) api.processTimedEffects(fighters, tick);
}

const playerBoard = units.map((unit, index) => api.toFighter(cloneUnit(unit), "player", index)).filter(Boolean);
const enemyBoard = units.map((unit, index) => api.toFighter(cloneUnit(unit), "enemy", index)).filter(Boolean);
const battle = api.prepareBattleFighters([...playerBoard, ...enemyBoard]);
for (let tick = 0; tick < 90; tick += 1) {
  api.battleStep(battle, tick);
  if (!api.activeCoreUnits(battle, "player").length || !api.activeCoreUnits(battle, "enemy").length) break;
}
if (!battle.some((fighter) => fighter.damageDealt > 0)) throw new Error("No battle damage was produced");

const shieldTarget = battle.find((fighter) => fighter.side === "enemy" && fighter.hp > 0);
const shieldAttacker = battle.find((fighter) => fighter.side === "player" && fighter.hp > 0);
const hpBeforeShield = shieldTarget.hp;
const manaBeforeHit = shieldTarget.mana;
api.addShield(shieldTarget, 100);
api.applyDamage(shieldAttacker, shieldTarget, 50, "true", "skill", battle);
if (shieldTarget.hp !== hpBeforeShield) throw new Error("Shield did not absorb damage first");
if (shieldTarget.maxMana > 0 && shieldTarget.mana !== Math.min(shieldTarget.maxMana, manaBeforeHit + context.balance.combat.manaOnDamageTaken)) throw new Error("Damage taken did not restore mana");

const akarin = battle.find((fighter) => fighter.origins.includes("阿卡林") && fighter.hp > 0);
if (akarin) {
  akarin.attackImmunity = 1;
  const hpBeforeImmunity = akarin.hp;
  api.applyDamage(shieldAttacker, akarin, 100, "true", "basic", battle);
  if (akarin.hp !== hpBeforeImmunity) throw new Error("Basic attack immunity failed");
}

if (api.getSideTier(battle, "player", "二次元")?.count !== 4) throw new Error("Highest trait tier was not selected");

const overtimeLeft = api.toFighter(cloneUnit(units[4]), "player", 0);
const overtimeRight = api.toFighter(cloneUnit(units[18]), "enemy", 0);
const overtimeBattle = api.prepareBattleFighters([overtimeLeft, overtimeRight]);
const overtimeHp = overtimeLeft.hp;
api.battleStep(overtimeBattle, 150);
if (overtimeLeft.hp >= overtimeHp) throw new Error("Overtime damage did not start");
for (let tick = 151; tick < 360; tick += 1) {
  api.battleStep(overtimeBattle, tick);
  if (!api.activeCoreUnits(overtimeBattle, "player").length || !api.activeCoreUnits(overtimeBattle, "enemy").length) break;
}
if (api.activeCoreUnits(overtimeBattle, "player").length && api.activeCoreUnits(overtimeBattle, "enemy").length) throw new Error("Overtime failed to end the battle");

const alignedMover = { row: 4, col: 0, range: 1 };
const alignedTarget = { row: 4, col: 3 };
api.stepToward(alignedMover, alignedTarget, new Set(["4,3"]));
if (alignedMover.row !== 4 || alignedMover.col !== 1) throw new Error("Aligned movement stayed in place");

const blockedMover = { row: 4, col: 0, range: 1 };
api.stepToward(blockedMover, alignedTarget, new Set(["4,1", "4,3"]));
if (blockedMover.row === 4 && blockedMover.col === 0) throw new Error("Blocked movement failed to find a detour");
console.log(`Battle smoke test OK: ${units.length} skills, ${battle.length} fighters/summons, ${logs.length} log events`);
