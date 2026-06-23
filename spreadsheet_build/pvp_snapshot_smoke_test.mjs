import fs from "node:fs/promises";
import vm from "node:vm";

const balanceCode = await fs.readFile("src/balance-config.js", "utf8");
const dataCode = await fs.readFile("src/game-data.js", "utf8");
const appCode = await fs.readFile("src/app.js", "utf8");
const start = appCode.indexOf("function escapeHtml");
const end = appCode.indexOf("function shopOdds", start);
if (start < 0 || end < 0) throw new Error("PvP snapshot functions not found");

const storage = new Map();
const context = vm.createContext({
  window: {}, console, Math, Map, Set, Date, JSON,
  TextEncoder, TextDecoder, Uint8Array, btoa, atob,
  pvpSchemaVersion: 1,
  pvpGameVersion: "1.0",
  pvpBalanceVersion: "test-balance",
  pvpLineupStorageKey: "lineup",
  pvpStatsStorageKey: "stats",
  localStorage: {
    getItem(key) { return storage.get(key) ?? null; },
    setItem(key, value) { storage.set(key, value); }
  },
  state: { board: [], level: 2 },
  crypto: { randomUUID: () => `unit-${Math.random()}` }
});
vm.runInContext(balanceCode, context);
vm.runInContext(dataCode, context);
context.units = context.window.GAME_DATA.units;
context.createUnit = (base, star) => ({ ...base, uid: `${base.id}-${star}`, baseId: base.id, origins: [...base.origins], stats: { ...base.stats }, star, permanentGrowth: 0, pigeonBuffNext: false });
vm.runInContext(`${appCode.slice(start, end)}\n;globalThis.pvpApi={createPvpSnapshot,encodePvpSnapshot,decodePvpCode,boardFromPvpSnapshot,updatePvpOpponentStats};`, context);

const unitA = context.createUnit(context.units[0], 2);
const unitB = context.createUnit(context.units[1], 1);
unitA.permanentGrowth = 0.06;
context.state.board = Array(32).fill(null);
context.state.board[3] = unitA;
context.state.board[19] = unitB;
const snapshot = context.pvpApi.createPvpSnapshot("玩家甲");
const code = context.pvpApi.encodePvpSnapshot(snapshot);
const decoded = context.pvpApi.decodePvpCode(code);
const restored = context.pvpApi.boardFromPvpSnapshot(decoded.snapshot);

if (!code.startsWith("MDF1-")) throw new Error("PvP code prefix is missing");
if (decoded.snapshot.p !== "玩家甲" || decoded.snapshotId.length !== 7) throw new Error("Player ID or snapshot ID was not preserved");
if (restored[3]?.star !== 2 || restored[19]?.star !== 1) throw new Error("Lineup stars or positions were not restored");
if (Math.abs(restored[3].permanentGrowth - 0.06) > 0.0001) throw new Error("Permanent growth was not restored");
try {
  context.pvpApi.decodePvpCode(`${code.slice(0, -1)}X`);
  throw new Error("Corrupted code was accepted");
} catch (error) {
  if (error.message === "Corrupted code was accepted") throw error;
}
context.pvpApi.updatePvpOpponentStats(decoded.snapshotId, decoded.snapshot, { imports: 1 });
context.pvpApi.updatePvpOpponentStats(decoded.snapshotId, decoded.snapshot, { battles: 1, wins: 1 });
const stats = JSON.parse(storage.get("stats"));
if (stats[decoded.snapshotId].imports !== 1 || stats[decoded.snapshotId].wins !== 1) throw new Error("Local PvP stats were not persisted");

console.log("PvP snapshot smoke test OK: ID, checksum, lineup restore, and local stats work");
