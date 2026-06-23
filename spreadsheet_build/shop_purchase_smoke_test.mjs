import fs from "node:fs/promises";
import vm from "node:vm";

const appCode = await fs.readFile("src/app.js", "utf8");
const buyStart = appCode.indexOf("function buy(shopIndex)");
const buyEnd = appCode.indexOf("function sellOwnedUnit", buyStart);
const ownedStart = appCode.indexOf("function allOwnedEntries()");
const ownedEnd = appCode.indexOf("function mirrorBoardIndex", ownedStart);

if ([buyStart, buyEnd, ownedStart, ownedEnd].some((index) => index < 0)) {
  throw new Error("Purchase/combine functions not found");
}

const target = { id: "same", name: "同名角色", cost: 2 };
let uid = 0;
const makeUnit = (base, star = 1) => ({
  uid: `${base.id}-${uid += 1}`,
  baseId: base.id,
  name: base.name,
  cost: base.cost,
  star,
  permanentGrowth: 0,
  pigeonBuffNext: false
});
const filler = (index) => makeUnit({ id: `filler-${index}`, name: `填充${index}`, cost: 1 });
const logs = [];
const context = vm.createContext({
  state: {
    gameOver: false,
    phase: "prepare",
    battleResolved: false,
    gold: 10,
    shop: [target],
    bench: [makeUnit(target), makeUnit(target), ...Array.from({ length: 6 }, (_, index) => filler(index))],
    board: Array(32).fill(null)
  },
  createUnit: makeUnit,
  pushLog(message) { logs.push(message); },
  render() {},
  hideTooltip() {}
});

vm.runInContext(`${appCode.slice(buyStart, buyEnd)}\n${appCode.slice(ownedStart, ownedEnd)}\n;buy(0);`, context);

const ownedTargets = context.state.bench.filter((unit) => unit?.baseId === target.id);
if (context.state.gold !== 8) throw new Error("Purchase did not deduct gold");
if (context.state.shop[0] !== null) throw new Error("Shop slot was not consumed");
if (context.state.bench.filter(Boolean).length !== 7) throw new Error("Immediate merge did not free a bench slot");
if (ownedTargets.length !== 1 || ownedTargets[0].star !== 2) throw new Error("Three copies did not merge into a 2-star unit");
if (!logs.some((message) => message.includes("合成 2 星"))) throw new Error("Merge was not logged");

console.log("Shop purchase smoke test OK: full bench allows an immediate 2-star merge");
