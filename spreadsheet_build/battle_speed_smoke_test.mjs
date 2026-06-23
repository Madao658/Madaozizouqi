import fs from "node:fs/promises";
import vm from "node:vm";

const code = await fs.readFile("src/app.js", "utf8");
const start = code.indexOf("function sleep(ms)");
const end = code.indexOf("function createFighters()", start);
if (start < 0 || end < 0) throw new Error("Battle speed functions not found");

let timeoutDelay = null;
const context = vm.createContext({
  state: { battleSpeed: 1, gameOver: false },
  render() {},
  window: { setTimeout(resolve, delay) { timeoutDelay = delay; resolve(); } },
});
vm.runInContext(code.slice(start, end), context);

vm.runInContext("toggleBattleSpeed()", context);
if (context.state.battleSpeed !== 2) throw new Error("1x did not switch to 2x");
vm.runInContext("toggleBattleSpeed()", context);
if (context.state.battleSpeed !== 0.5) throw new Error("2x did not switch to 0.5x");
await vm.runInContext("sleep(100)", context);
if (timeoutDelay !== 200) throw new Error(`0.5x sleep expected 200ms, got ${timeoutDelay}`);
vm.runInContext("toggleBattleSpeed()", context);
if (context.state.battleSpeed !== 1) throw new Error("0.5x did not switch to 1x");

console.log("Battle speed smoke test OK: 1x -> 2x -> 0.5x -> 1x");
