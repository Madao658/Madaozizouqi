import fs from "node:fs/promises";
import vm from "node:vm";

const appCode = await fs.readFile("src/app.js", "utf8");
const start = appCode.indexOf("function settlementHtml()");
const end = appCode.indexOf("function resetGame()", start);
if (start < 0 || end < 0) throw new Error("Settlement functions not found");

const classes = new Set();
const context = vm.createContext({
  state: {
    round: 12,
    hp: 37,
    gold: 24,
    level: 8,
    board: [{ uid: "hero-1", name: "测试角色", star: 2, origins: ["测试羁绊"] }],
    battleStats: {
      opponent: "测试对手",
      rows: [{ uid: "hero-1", name: "测试角色", side: "player", damageDealt: 1234, damageTaken: 456, healingDone: 78 }]
    },
    matchStats: { battles: 6, wins: 5, losses: 1, damageDealt: 5000, damageTaken: 2000, healingDone: 800 },
    aiPlayers: [
      { name: "AI甲", hp: 0, wins: 1, losses: 4 },
      { name: "AI乙", hp: 0, wins: 2, losses: 3 },
      { name: "AI丙", hp: 0, wins: 0, losses: 5 }
    ]
  },
  els: {
    modalTitle: { textContent: "" },
    modalText: { textContent: "" },
    settlementSummary: { innerHTML: "" },
    modalAction: { textContent: "" },
    modal: { classList: { add(...names) { names.forEach((name) => classes.add(name)); } } }
  },
  countActiveTraits() { return { 测试羁绊: 2 }; },
  activeTier() { return { count: 2, label: "测试档位", effect: "测试效果" }; },
  unitIconPath() { return "icon/test.jpg"; },
  Map
});

vm.runInContext(`${appCode.slice(start, end)}\n;showVictorySettlement("测试胜利");`, context);
const html = context.els.settlementSummary.innerHTML;
for (const text of ["终局阵容", "激活羁绊", "最终战", "整局累计", "最终排名", "测试角色", "输出 MVP"]) {
  if (!html.includes(text)) throw new Error(`Settlement is missing: ${text}`);
}
if (!classes.has("visible") || !classes.has("settlement-mode")) throw new Error("Settlement modal was not opened");
if (!context.els.modalAction.textContent.includes("配置 PvP 阵容")) throw new Error("PvP setup confirmation action is missing");

console.log("Settlement smoke test OK: detailed victory report and manual confirmation are present");
