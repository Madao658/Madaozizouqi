import fs from "node:fs/promises";
import vm from "node:vm";

const balanceCode = await fs.readFile("src/balance-config.js", "utf8");
const appCode = await fs.readFile("src/app.js", "utf8");
const start = appCode.indexOf("function scheduledAiLevel");
const end = appCode.indexOf("function aiPrepare", start);
if (start < 0 || end < 0) throw new Error("AI progression helpers not found");

const context = vm.createContext({ window: {}, state: { round: 1 } });
vm.runInContext(balanceCode, context);
context.balance = context.window.BALANCE_CONFIG;
vm.runInContext(`${appCode.slice(start, end)}\n;globalThis.aiApi={scheduledAiLevel,applyAiLevelSchedule,aiCatchupBonus};`, context);

const expected = [[1, 2], [3, 3], [5, 4], [8, 5], [11, 6], [14, 7], [17, 8], [20, 9]];
for (const [round, level] of expected) {
  if (context.aiApi.scheduledAiLevel(round) !== level) throw new Error(`AI level schedule failed at round ${round}`);
}
context.state.round = 20;
const ai = { level: 6, xp: 9, hp: 18 };
context.aiApi.applyAiLevelSchedule(ai);
if (ai.level !== 9 || ai.xp !== 0) throw new Error("AI minimum level was not enforced");
const low = context.aiApi.aiCatchupBonus(ai);
const medium = context.aiApi.aiCatchupBonus({ hp: 35 });
const healthy = context.aiApi.aiCatchupBonus({ hp: 80 });
if (low.bonusGold !== 8 || low.bonusRolls !== 2) throw new Error("Low-health AI catch-up tier failed");
if (medium.bonusGold !== 4 || medium.bonusRolls !== 1) throw new Error("Mid-health AI catch-up tier failed");
if (healthy.bonusGold !== 0 || healthy.bonusRolls !== 0) throw new Error("Healthy AI incorrectly received catch-up bonuses");

console.log("AI progression smoke test OK: level schedule and low-health catch-up work");
