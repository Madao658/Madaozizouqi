import fs from "node:fs/promises";
import vm from "node:vm";

const appCode = await fs.readFile("src/app.js", "utf8");
const renderBlock = sliceFunction("function render()", "function select(");
if (renderBlock.includes("autoFillBoardFromBench()")) throw new Error("Auto-deploy must not run during ordinary preparation renders");
const startBattleBlock = sliceFunction("function startBattle()", "function nextRound()");
if (!startBattleBlock.includes("autoFillBoardFromBench()")) throw new Error("Start battle does not trigger auto-deploy");

function sliceFunction(startMarker, endMarker) {
  const start = appCode.indexOf(startMarker);
  const end = appCode.indexOf(endMarker, start);
  if (start < 0 || end < 0) throw new Error(`Function block not found: ${startMarker}`);
  return appCode.slice(start, end);
}

const boardHelpers = sliceFunction("function boardUnitCount()", "function xpRequirement()");
const rosterHelpers = sliceFunction("function allOwnedEntries()", "function mirrorBoardIndex");
const logs = [];
const state = {
  gameOver: false,
  phase: "prepare",
  battleResolved: false,
  level: 3,
  selected: null,
  board: Array(32).fill(null),
  bench: Array(8).fill(null),
};
const makeUnit = (id, star = 1) => ({
  uid: `${id}-${Math.random()}`,
  baseId: id,
  name: id,
  star,
  permanentGrowth: 0,
  pigeonBuffNext: false,
});

const context = vm.createContext({
  state,
  Math,
  invalidatePvpSetupCode() {},
  pushLog(message) { logs.push(message); },
});
vm.runInContext(`${boardHelpers}\n${rosterHelpers}`, context);

state.board[9] = makeUnit("same");
state.bench[0] = makeUnit("same");
state.bench[1] = makeUnit("same");
vm.runInContext("combineAll()", context);

if (!state.board[9] || state.board[9].star !== 2) throw new Error("Merged unit did not remain on its board cell");
if (state.bench.some((unit) => unit?.baseId === "same")) throw new Error("Consumed copies remained on bench");

state.board = Array(32).fill(null);
state.bench = [makeUnit("a"), makeUnit("b"), makeUnit("c"), makeUnit("d"), null, null, null, null];
const moved = vm.runInContext("autoFillBoardFromBench()", context);
if (moved !== 3) throw new Error(`Expected 3 auto-deployed units, got ${moved}`);
if (state.board.filter(Boolean).length !== 3) throw new Error("Board was not filled to the current level cap");
if (state.bench.filter(Boolean).length !== 1) throw new Error("Wrong number of units remained on bench");

state.phase = "combat";
state.board = Array(32).fill(null);
const blocked = vm.runInContext("autoFillBoardFromBench()", context);
if (blocked !== 0 || state.board.some(Boolean)) throw new Error("Auto-deploy ran during combat");

console.log("Roster rule smoke test OK: merge stays on board and start-battle auto-fill reaches cap");
