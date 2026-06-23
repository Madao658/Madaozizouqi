const legacyUnits = [
  ["tuantuan", "团团", 1, "牧场", "辅助", "治疗", 3, 500, 35, 0.65, 20, 20, 40, "团团抱抱", "治疗生命值最低的友军 120/180/280 点，并提供 80/120/180 点护盾，持续 4 秒。"],
  ["jd", "JD", 1, "星网", "射手", "持续输出", 4, 450, 45, 0.75, 15, 15, 50, "三段校准", "连续射击当前目标 3 次，每次造成 55/80/125 物理伤害。"],
  ["madao", "马刀", 1, "武馆", "斗士", "前排战士", 1, 650, 55, 0.6, 35, 20, 60, "横斩", "挥刀横斩，对前方扇形敌人造成 100/150/240 物理伤害。"],
  ["jianlao", "茧佬", 1, "雪庭", "守卫", "控制坦克", 1, 700, 40, 0.55, 40, 25, 70, "封茧", "进入封茧状态 2.5 秒，获得 35%/45%/60% 减伤并嘲讽周围敌人。"],
  ["ccg", "CCG", 1, "星网", "术士", "法术输出", 3, 480, 35, 0.65, 15, 20, 60, "代码脉冲", "向随机敌人发射脉冲，造成 160/230/360 魔法伤害。"],
  ["aki", "AKI", 2, "暗巷", "刺客", "后排切入", 1, 650, 65, 0.75, 25, 25, 60, "影步首刀", "闪到敌方后排，对目标造成 170/260/420 物理伤害；若击杀，回复 30 点法力。"],
  ["yuo", "YUO", 2, "星网", "辅助", "团队增益", 3, 600, 40, 0.65, 20, 25, 70, "加速节点", "使相邻友军获得 25%/35%/55% 攻速，持续 5 秒。"],
  ["yin", "YIN", 2, "雪庭", "术士", "控制法师", 3, 560, 40, 0.6, 20, 25, 70, "寒音", "对一列敌人造成 140/210/330 魔法伤害，并降低 30% 移速和攻速，持续 3 秒。"],
  ["dage", "大哥", 2, "武馆", "斗士", "主坦", 1, 850, 60, 0.6, 40, 30, 80, "顶住", "获得 200/300/480 护盾；生命值低于 40% 时护盾提高 50%。"],
  ["qianhan", "千寒", 2, "雪庭", "射手", "控制射手", 4, 560, 55, 0.75, 20, 20, 60, "千寒箭", "射出寒箭造成 150/230/360 物理伤害，并冻结目标 1.25/1.5/2 秒。"],
  ["shuangye", "霜夜", 3, "雪庭", "刺客", "控制刺客", 1, 750, 75, 0.8, 30, 30, 70, "夜刃封喉", "闪至生命最低敌人身后，造成 220/330/540 物理伤害并沉默 2 秒。"],
  ["jinglao", "静佬", 3, "星网", "守卫", "法抗前排", 1, 900, 55, 0.55, 35, 45, 80, "静默领域", "展开领域 4 秒，领域内敌人造成的技能伤害降低 25%/35%/55%。"],
  ["kobayashi", "小林花音", 3, "牧场", "辅助", "群体治疗", 3, 680, 45, 0.65, 25, 30, 90, "花音小调", "演奏 4 秒，每秒治疗全体友军 45/70/110 点生命。"],
  ["nnm", "NNM", 3, "暗巷", "射手", "爆发输出", 4, 650, 80, 0.7, 25, 25, 70, "远点穿透", "锁定最远敌人发射穿透弹，对路径敌人造成 230/350/560 物理伤害。"],
  ["wjj", "WJJ", 4, "武馆", "守卫", "团队保护", 1, 1100, 70, 0.6, 55, 35, 90, "盾阵冲锋", "冲向敌人最密集区域，击退路径敌人并造成 260/390/700 物理伤害，同时给附近友军 250/350/650 护盾。"],
  ["alao", "A佬", 4, "星网", "术士", "核心法师", 3, 760, 50, 0.65, 25, 35, 100, "镜像编译", "复制上一名友军技能的 50%/70%/110% 效果；若无可复制技能，则对随机敌人造成 360/520/900 魔法伤害。"],
  ["muji", "母鸡", 4, "牧场", "辅助", "召唤辅助", 3, 820, 50, 0.7, 30, 35, 80, "咯咯集结", "召唤 2/3/5 只小鸡。小鸡继承母鸡 25% 攻击力和生命值，并会优先吸引附近敌人。"],
  ["xiyangyang", "喜羊羊", 4, "牧场", "刺客", "灵活收割", 1, 850, 85, 0.85, 35, 30, 70, "风驰冲刺", "冲刺穿过最多 3 名敌人，造成 260/390/720 物理伤害；若参与击杀，回复 50 点法力。"],
  ["gmj", "GMJ", 5, "暗巷", "术士", "终局爆发", 4, 900, 60, 0.7, 30, 40, 120, "黑巷终局", "标记 3/4/8 名敌人，1.5 秒后引爆，对目标及周围敌人造成 420/650/1500 魔法伤害。"],
  ["lin", "麟", 5, "龙印", "斗士", "终局主C", 1, 1200, 95, 0.8, 45, 45, 100, "麟影化身", "化身 8 秒，获得 45%/65%/120% 攻速、25% 全能吸血，普攻变为小范围溅射。"]
].map(([id, name, cost, origin, klass, role, range, health, attack, attackSpeed, armor, magicResist, mana, skill, skillDescription]) => ({
  id,
  name,
  cost,
  origin,
  class: klass,
  role,
  range,
  stats: { health, attack, attackSpeed, armor, magicResist, mana },
  skill,
  skillDescription
}));

const legacyTraitRules = {
  星网: [
    { count: 2, label: "回蓝", effect: "全体友军每次攻击额外回复 2 点法力。" },
    { count: 4, label: "技能强化", effect: "星网单位技能伤害提升 25%，全体友军每次攻击额外回复 4 点法力。" }
  ],
  雪庭: [
    { count: 2, label: "减速", effect: "雪庭单位攻击使目标攻速降低 15%，持续 3 秒。" },
    { count: 4, label: "冻结", effect: "战斗开始冻结敌方攻击力最高单位 2 秒，雪庭减速提高到 25%。" }
  ],
  武馆: [
    { count: 2, label: "双抗", effect: "武馆单位获得 15 护甲和 15 魔抗。" },
    { count: 4, label: "吸血", effect: "全体友军获得 10% 全能吸血，武馆单位双抗加成提高到 30。" }
  ],
  暗巷: [
    { count: 2, label: "跳后", effect: "暗巷单位开战跳向敌方后排，首次攻击必定暴击。" },
    { count: 4, label: "暴击收割", effect: "暗巷单位暴击伤害提高 40%，参与击杀后获得 40% 攻速，持续 4 秒。" }
  ],
  牧场: [
    { count: 2, label: "召唤", effect: "战斗开始召唤 1 只小鸡协助作战。" },
    { count: 4, label: "召唤治疗", effect: "战斗开始召唤 2 只小鸡；召唤物死亡时治疗生命最低友军 120 点。" }
  ],
  龙印: [
    { count: 1, label: "击杀成长", effect: "龙印单位参与击杀后，本场战斗永久获得 8% 攻击力和法术强度。" }
  ],
  斗士: [
    { count: 2, label: "生命", effect: "斗士获得 250 最大生命值。" },
    { count: 4, label: "濒死减伤", effect: "斗士获得 550 最大生命值；生命低于 40% 时额外获得 20% 减伤。" }
  ],
  刺客: [
    { count: 2, label: "暴击", effect: "刺客获得 20% 暴击率和 15% 暴击伤害。" },
    { count: 4, label: "高额暴击", effect: "刺客获得 35% 暴击率和 45% 暴击伤害。" }
  ],
  射手: [
    { count: 2, label: "额外弹", effect: "射手每 3 次攻击额外射出 1 次 70% 伤害的弹体。" },
    { count: 4, label: "连射", effect: "射手每 2 次攻击额外射出 1 次 80% 伤害的弹体。" }
  ],
  术士: [
    { count: 2, label: "法强", effect: "术士获得 20 法术强度。" },
    { count: 4, label: "施法回蓝", effect: "术士获得 45 法术强度，首次施法后回复 25 点法力。" }
  ],
  辅助: [
    { count: 2, label: "治疗护盾", effect: "辅助的治疗和护盾提高 20%。" },
    { count: 4, label: "开局护盾", effect: "辅助的治疗和护盾提高 45%，战斗开始全队获得 120 护盾。" }
  ],
  守卫: [
    { count: 2, label: "护甲", effect: "守卫获得 20 护甲；相邻友军获得 10 护甲。" },
    { count: 4, label: "邻格保护", effect: "守卫获得 45 护甲；相邻友军获得 25 护甲和 25 魔抗。" }
  ]
};

const units = window.GAME_DATA.units;
const traitRules = window.GAME_DATA.traits;
const balance = window.BALANCE_CONFIG;

const levelXpRequirements = {
  2: 2,
  3: 6,
  4: 10,
  5: 14,
  6: 20,
  7: 36,
  8: 48,
  9: 84
};

const shopOddsByLevel = {
  1: [100, 0, 0, 0, 0],
  2: [100, 0, 0, 0, 0],
  3: [70, 30, 0, 0, 0],
  4: [50, 35, 15, 0, 0],
  5: [35, 40, 20, 5, 0],
  6: [20, 35, 35, 10, 0],
  7: [14, 30, 40, 15, 1],
  8: [14, 20, 35, 25, 6],
  9: [10, 15, 25, 35, 15]
};

const finalRound = 25;
const pvpSchemaVersion = 1;
const pvpGameVersion = "1.0";
const pvpBalanceVersion = balance.version || "local";
const pvpLineupStorageKey = "madao-pvp-lineup-v1";
const pvpStatsStorageKey = "madao-pvp-stats-v1";

const aiProfiles = [
  { id: "ai-steady", prefix: "稳健派", style: "steady", description: "存钱升级，优先稳定上人口" },
  { id: "ai-trait", prefix: "羁绊派", style: "trait", description: "围绕已有多阵营组合补强" },
  { id: "ai-reroll", prefix: "毒狗派", style: "reroll", description: "频繁搜牌，执着追逐高星棋子" }
];

const state = {
  round: 1,
  hp: 100,
  gold: 4,
  level: 2,
  xp: 0,
  phase: "prepare",
  battleResolved: false,
  gameOver: false,
  bench: Array(8).fill(null),
  board: Array(32).fill(null),
  enemy: Array(32).fill(null),
  shop: [],
  selected: null,
  dragging: null,
  combatFighters: null,
  combatFx: null,
  combatTexts: [],
  battleIntro: false,
  traitTierProgress: {},
  battleSpeed: 1,
  aiPlayers: [],
  currentOpponentId: null,
  suppressLog: false,
  eliminationOrder: [],
  battleStats: null,
  matchStats: {
    battles: 0,
    wins: 0,
    losses: 0,
    damageDealt: 0,
    damageTaken: 0,
    healingDone: 0
  },
  gameResult: null,
  pvpOpponent: null,
  pvpBattleActive: false,
  pvpReturnState: null,
  pvpLastResult: null,
  welcomePending: true,
  log: ["欢迎来到异界牌桌。购买棋子，放到下半区，然后开战。"]
};

const els = {
  round: document.querySelector("#round"),
  hp: document.querySelector("#hp"),
  gold: document.querySelector("#gold"),
  level: document.querySelector("#level"),
  xp: document.querySelector("#xp"),
  unitCap: document.querySelector("#unit-cap"),
  phase: document.querySelector("#phase"),
  nextRound: document.querySelector("#next-round"),
  board: document.querySelector("#board"),
  bench: document.querySelector("#bench"),
  shop: document.querySelector("#shop"),
  shopOdds: document.querySelector("#shop-odds"),
  shopOddsHelp: document.querySelector("#shop-odds-help"),
  shopOddsToggle: document.querySelector("#shop-odds-toggle"),
  standings: document.querySelector("#standings"),
  battleStats: document.querySelector("#battle-stats"),
  traits: document.querySelector("#traits"),
  log: document.querySelector("#log"),
  benchCount: document.querySelector("#bench-count"),
  tooltip: null,
  modal: document.querySelector("#game-modal"),
  modalTitle: document.querySelector("#modal-title"),
  modalText: document.querySelector("#modal-text"),
  settlementSummary: document.querySelector("#settlement-summary"),
  modalAction: document.querySelector("#modal-action"),
  reroll: document.querySelector("#reroll"),
  buyXp: document.querySelector("#buy-xp"),
  sellUnit: document.querySelector("#sell-unit"),
  startBattle: document.querySelector("#start-battle"),
  battleSpeed: document.querySelector("#battle-speed"),
  clearLog: document.querySelector("#clear-log"),
  pieceTemplate: document.querySelector("#piece-template"),
  pvpOpen: document.querySelector("#pvp-open"),
  pvpModal: document.querySelector("#pvp-modal"),
  pvpClose: document.querySelector("#pvp-close"),
  pvpLobbyContent: document.querySelector("#pvp-lobby-content"),
  pvpSetupPanel: document.querySelector("#pvp-setup-panel"),
  pvpPlayerId: document.querySelector("#pvp-player-id"),
  pvpSaveLineup: document.querySelector("#pvp-save-lineup"),
  pvpSetupMessage: document.querySelector("#pvp-setup-message"),
  pvpCodeResult: document.querySelector("#pvp-code-result"),
  pvpOwnCode: document.querySelector("#pvp-own-code"),
  pvpCopyOwnCode: document.querySelector("#pvp-copy-own-code"),
  pvpFinishSetup: document.querySelector("#pvp-finish-setup"),
  announcementOpen: document.querySelector("#announcement-open"),
  announcementModal: document.querySelector("#announcement-modal"),
  announcementClose: document.querySelector("#announcement-close"),
  announcementConfirm: document.querySelector("#announcement-confirm"),
  announcementContent: document.querySelector("#announcement-content")
};

function createUnit(base, star = 1) {
  return {
    uid: crypto.randomUUID ? crypto.randomUUID() : `${base.id}-${Date.now()}-${Math.random()}`,
    baseId: base.id,
    name: base.name,
    cost: base.cost,
    origins: [...base.origins],
    origin: base.origins[0],
    role: base.role,
    range: base.range,
    skill: base.skill,
    skillDescription: base.skillDescription,
    star,
    permanentGrowth: 0,
    pigeonBuffNext: false,
    stats: { ...base.stats }
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function renderAnnouncement(selectedIndex = 0) {
  const history = Array.isArray(window.UPDATE_NOTES_HISTORY) && window.UPDATE_NOTES_HISTORY.length
    ? window.UPDATE_NOTES_HISTORY
    : [window.UPDATE_NOTES || {}];
  const safeIndex = Math.max(0, Math.min(history.length - 1, selectedIndex));
  const notes = history[safeIndex];
  const sections = Array.isArray(notes.sections) ? notes.sections : [];
  els.announcementContent.innerHTML = `
    ${history.length > 1 ? `<label class="announcement-history-picker">查看版本<select id="announcement-history-select">${history.map((item, index) => `<option value="${index}" ${index === safeIndex ? "selected" : ""}>${escapeHtml(item.version || `版本 ${index + 1}`)} · ${escapeHtml(item.title || "更新公告")}</option>`).join("")}</select></label>` : ""}
    <div class="announcement-version"><strong>${escapeHtml(notes.version || "未命名版本")}</strong><span>${escapeHtml(notes.date || "")}</span></div>
    <h2 id="announcement-title">${escapeHtml(notes.title || "更新公告")}</h2>
    ${notes.intro ? `<p class="announcement-intro">${escapeHtml(notes.intro)}</p>` : ""}
    <div class="announcement-sections">
      ${sections.map((section) => `
        <section>
          <h3>${escapeHtml(section.title || "本次改动")}</h3>
          <ul>${(Array.isArray(section.items) ? section.items : []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      `).join("")}
    </div>
    ${notes.footer ? `<p class="announcement-footer">${escapeHtml(notes.footer)}</p>` : ""}
  `;
  document.querySelector("#announcement-history-select")?.addEventListener("change", (event) => renderAnnouncement(Number(event.currentTarget.value)));
}

function openAnnouncement() {
  renderAnnouncement();
  els.announcementModal.classList.add("visible");
}

function closeAnnouncement() {
  els.announcementModal.classList.remove("visible");
}

function pvpHash(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36).toUpperCase().padStart(7, "0").slice(0, 7);
}

function encodeUtf8Base64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeUtf8Base64(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized + "=".repeat((4 - normalized.length % 4) % 4));
  return new TextDecoder().decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)));
}

function createPvpSnapshot(playerId, board = state.board, level = state.level) {
  const id = playerId.trim();
  if (!id || Array.from(id).length > 8 || /[\u0000-\u001f\u007f]/.test(id)) throw new Error("玩家 ID 需要为 1～8 位字符。");
  const lineup = board.map((unit, position) => unit ? [position, unit.baseId, unit.star, Math.round((unit.permanentGrowth || 0) * 10000)] : null).filter(Boolean);
  if (!lineup.length) throw new Error("至少需要上阵 1 名角色。");
  return { v: pvpSchemaVersion, g: pvpGameVersion, bv: pvpBalanceVersion, p: id, l: level, b: lineup };
}

function encodePvpSnapshot(snapshot) {
  const payload = encodeUtf8Base64(JSON.stringify(snapshot));
  return `MDF${pvpSchemaVersion}-${pvpHash(payload)}-${payload}`;
}

function decodePvpCode(rawCode) {
  const code = rawCode.trim();
  const match = code.match(/^MDF(\d+)-([A-Z0-9]{7})-([A-Za-z0-9_-]+)$/i);
  if (!match) throw new Error("阵容码格式不正确或复制不完整。");
  const [, schema, checksum, payload] = match;
  if (Number(schema) !== pvpSchemaVersion) throw new Error(`暂不支持 MDF${schema} 版本的阵容码。`);
  if (pvpHash(payload) !== checksum.toUpperCase()) throw new Error("阵容码校验失败，请重新完整复制。");
  let snapshot;
  try { snapshot = JSON.parse(decodeUtf8Base64(payload)); } catch { throw new Error("阵容码内容无法解析。"); }
  if (snapshot.v !== pvpSchemaVersion || typeof snapshot.p !== "string" || !snapshot.p.trim() || Array.from(snapshot.p).length > 8 || !Array.isArray(snapshot.b)) throw new Error("阵容码缺少必要数据。");
  if (!Number.isInteger(snapshot.l) || snapshot.l < 1 || snapshot.l > 10 || snapshot.b.length < 1 || snapshot.b.length > snapshot.l) throw new Error("阵容人口数据无效。");
  const occupied = new Set();
  snapshot.b.forEach((entry) => {
    if (!Array.isArray(entry) || entry.length < 3) throw new Error("阵容角色数据无效。");
    const [position, baseId, star, growth = 0] = entry;
    if (!Number.isInteger(position) || position < 0 || position >= 32 || occupied.has(position)) throw new Error("阵容站位数据无效。");
    if (!units.some((unit) => unit.id === baseId) || !Number.isInteger(star) || star < 1 || star > 3 || !Number.isFinite(growth)) throw new Error("阵容包含未知角色或星级。");
    occupied.add(position);
  });
  return { snapshot, code, snapshotId: checksum.toUpperCase() };
}

function boardFromPvpSnapshot(snapshot) {
  const board = Array(32).fill(null);
  snapshot.b.forEach(([position, baseId, star, growth = 0]) => {
    const base = units.find((unit) => unit.id === baseId);
    const unit = createUnit(base, star);
    unit.permanentGrowth = growth / 10000;
    unit.pigeonBuffNext = false;
    board[position] = unit;
  });
  return board;
}

function safeReadStorage(key, fallback = null) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

function safeWriteStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

function savedPvpLineup() {
  return safeReadStorage(pvpLineupStorageKey, null);
}

function pvpStats() {
  return safeReadStorage(pvpStatsStorageKey, {});
}

function updatePvpOpponentStats(snapshotId, snapshot, changes) {
  const stats = pvpStats();
  const current = stats[snapshotId] || { playerId: snapshot.p, imports: 0, battles: 0, wins: 0, losses: 0, lastPlayed: null };
  Object.entries(changes).forEach(([key, amount]) => { current[key] = (current[key] || 0) + amount; });
  current.playerId = snapshot.p;
  if (changes.battles) current.lastPlayed = new Date().toISOString();
  stats[snapshotId] = current;
  safeWriteStorage(pvpStatsStorageKey, stats);
  return current;
}

async function copyPvpCode(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}

function shopOdds(level) {
  const oddsLevel = Math.max(1, Math.min(9, level));
  return shopOddsByLevel[oddsLevel];
}

function randomBase(level = state.level) {
  const odds = shopOdds(level);
  const roll = Math.random() * 100;
  let cumulative = 0;
  let selectedCost = 1;
  for (let index = 0; index < odds.length; index += 1) {
    cumulative += odds[index];
    if (roll < cumulative) {
      selectedCost = index + 1;
      break;
    }
  }
  const pool = units.filter((unit) => unit.cost === selectedCost);
  return pool[Math.floor(Math.random() * pool.length)];
}

function createAiPlayer(profile) {
  return {
    ...profile,
    hp: 100,
    gold: balance.ai.startingGold,
    level: 2,
    xp: 0,
    roster: [],
    board: Array(32).fill(null),
    wins: 0,
    losses: 0,
    catchupRolls: 0,
    eliminated: false
  };
}

function addAiExperience(ai, amount) {
  if (ai.level >= 10) return;
  ai.xp += amount;
  let requirement = levelXpRequirements[ai.level] || null;
  while (requirement && ai.xp >= requirement && ai.level < 10) {
    ai.xp -= requirement;
    ai.level += 1;
    requirement = levelXpRequirements[ai.level] || null;
  }
  if (ai.level >= 10) ai.xp = 0;
}

function aiTraitCounts(ai) {
  const seen = new Set();
  return ai.roster.reduce((counts, unit) => {
    if (seen.has(unit.baseId)) return counts;
    seen.add(unit.baseId);
    unit.origins.forEach((origin) => { counts[origin] = (counts[origin] || 0) + 1; });
    return counts;
  }, {});
}

function aiPurchaseScore(ai, base) {
  const copies = ai.roster.filter((unit) => unit.baseId === base.id).reduce((sum, unit) => sum + (3 ** (unit.star - 1)), 0);
  const traits = aiTraitCounts(ai);
  const duplicateWeight = balance.ai.duplicateWeight[ai.style];
  const traitWeight = balance.ai.traitWeight[ai.style];
  const economyBias = ai.style === "steady" ? -base.cost * 0.45 : base.cost * 0.3;
  return copies * duplicateWeight
    + base.origins.reduce((sum, origin) => sum + (traits[origin] || 0), 0) * traitWeight
    + base.cost
    + economyBias
    + Math.random() * 2;
}

function combineAiRoster(ai) {
  let combined = true;
  while (combined) {
    combined = false;
    for (let star = 1; star < 3; star += 1) {
      const groups = new Map();
      ai.roster.forEach((unit) => {
        if (unit.star !== star) return;
        if (!groups.has(unit.baseId)) groups.set(unit.baseId, []);
        groups.get(unit.baseId).push(unit);
      });
      const match = [...groups.values()].find((group) => group.length >= 3);
      if (!match) continue;
      const upgraded = match[0];
      upgraded.permanentGrowth = Math.max(...match.slice(0, 3).map((unit) => unit.permanentGrowth || 0));
      upgraded.pigeonBuffNext = match.slice(0, 3).some((unit) => unit.pigeonBuffNext);
      upgraded.star += 1;
      const consumed = new Set(match.slice(1, 3).map((unit) => unit.uid));
      ai.roster = ai.roster.filter((unit) => !consumed.has(unit.uid));
      combined = true;
      break;
    }
  }
}

function aiUnitPower(unit) {
  const starScale = 1 + (unit.star - 1) * 1.15;
  return (unit.stats.health * 0.08 + unit.stats.attack * 1.8 + unit.cost * 28) * starScale;
}

function arrangeAiBoard(ai) {
  ai.board = Array(32).fill(null);
  const traits = aiTraitCounts(ai);
  const boardScore = (unit) => aiUnitPower(unit)
    + unit.origins.reduce((sum, origin) => sum + (traits[origin] || 0) * balance.ai.boardTraitWeight, 0);
  const selected = [...ai.roster].sort((a, b) => boardScore(b) - boardScore(a)).slice(0, ai.level);
  const front = selected.filter((unit) => unit.range <= 1 || /坦|前排|保护/.test(unit.role));
  const back = selected.filter((unit) => !front.includes(unit));
  const frontSlots = [3, 4, 2, 5, 1, 6, 0, 7, 11, 12];
  const backSlots = [27, 28, 26, 29, 19, 20, 18, 21, 10, 13];
  front.forEach((unit, index) => { ai.board[frontSlots[index]] = unit; });
  back.forEach((unit, index) => { ai.board[backSlots[index]] = unit; });
}

function scheduledAiLevel(round) {
  return balance.ai.levelSchedule.reduce((level, [requiredRound, targetLevel]) => round >= requiredRound ? targetLevel : level, 2);
}

function applyAiLevelSchedule(ai) {
  const targetLevel = scheduledAiLevel(state.round);
  if (ai.level >= targetLevel) return;
  ai.level = targetLevel;
  ai.xp = 0;
}

function aiCatchupBonus(ai) {
  return balance.ai.catchup.find((tier) => ai.hp <= tier.maxHp) || { bonusGold: 0, bonusRolls: 0 };
}

function aiPrepare(ai) {
  if (ai.eliminated) return;
  applyAiLevelSchedule(ai);

  const rollCount = balance.ai.rollCount[ai.style] + (ai.catchupRolls || 0);
  const desiredRoster = Math.min(18, ai.level + balance.ai.rosterExtra[ai.style]);
  for (let roll = 0; roll < rollCount; roll += 1) {
    if (roll > 0) {
      const reserve = balance.ai.goldReserve[ai.style];
      if (ai.gold < reserve + 2) break;
      ai.gold -= 2;
    }
    const shop = Array.from({ length: 5 }, () => randomBase(ai.level));
    shop.sort((a, b) => aiPurchaseScore(ai, b) - aiPurchaseScore(ai, a));
    shop.forEach((base) => {
      if (ai.roster.length >= desiredRoster || ai.gold < base.cost) return;
      const mustFillBoard = ai.roster.length < ai.level;
      const reserve = state.round > 3 ? balance.ai.goldReserve[ai.style] : 0;
      if (!mustFillBoard && ai.gold - base.cost < reserve) return;
      ai.gold -= base.cost;
      ai.roster.push(createUnit(base));
      combineAiRoster(ai);
    });
  }
  arrangeAiBoard(ai);
}

function initializeAiPlayers() {
  const randomNames = [...units]
    .sort(() => Math.random() - 0.5)
    .slice(0, aiProfiles.length)
    .map((unit) => unit.name);
  state.aiPlayers = aiProfiles.map((profile, index) => createAiPlayer({
    ...profile,
    name: `${profile.prefix}·${randomNames[index]}`
  }));
  state.currentOpponentId = null;
  state.eliminationOrder = [];
  state.aiPlayers.forEach(aiPrepare);
}

function advanceAiEconomies() {
  state.aiPlayers.forEach((ai) => {
    if (ai.eliminated) return;
    addAiExperience(ai, balance.ai.xpPerRound);
    applyAiLevelSchedule(ai);
    const interest = Math.min(balance.ai.maxInterest, Math.floor(ai.gold / 10));
    const catchup = aiCatchupBonus(ai);
    ai.gold += balance.ai.baseIncome + interest + catchup.bonusGold;
    ai.catchupRolls = catchup.bonusRolls;
    aiPrepare(ai);
    ai.catchupRolls = 0;
  });
}

function refreshShop(force = false) {
  if (state.gameOver) return;
  if (!force && state.gold < 2) {
    pushLog("金币不足，刷新需要 2 金。");
    return;
  }
  if (!force) state.gold -= 2;
  state.shop = Array.from({ length: 5 }, () => randomBase());
  if (force) state.battleResolved = false;
  render();
}

function pushLog(message) {
  if (state.suppressLog) return;
  state.log.unshift(message);
  state.log = state.log.slice(0, 18);
}

function showModal(title, text, actionText = "继续") {
  els.modalTitle.innerHTML = title;
  els.modalText.textContent = text;
  els.modal.classList.remove("settlement-mode");
  els.settlementSummary.innerHTML = "";
  els.modalAction.textContent = actionText;
  els.modal.classList.add("visible");
}

function hideModal() {
  els.modal.classList.remove("visible", "settlement-mode");
}

function settlementHtml() {
  const report = state.battleStats;
  const playerRows = report?.rows.filter((row) => row.side === "player") || [];
  const finalDamage = playerRows.reduce((sum, row) => sum + row.damageDealt, 0);
  const finalTaken = playerRows.reduce((sum, row) => sum + row.damageTaken, 0);
  const finalHealing = playerRows.reduce((sum, row) => sum + row.healingDone, 0);
  const mvp = [...playerRows].sort((a, b) => b.damageDealt - a.damageDealt)[0];
  const rowByUid = new Map(playerRows.map((row) => [row.uid, row]));
  const lineup = state.board.filter(Boolean);
  const traitCounts = countActiveTraits();
  const activeTraits = Object.entries(traitCounts)
    .map(([name, count]) => ({ name, count, tier: activeTier(name, count) }))
    .filter((trait) => trait.tier)
    .sort((a, b) => b.tier.count - a.tier.count || b.count - a.count);
  const standings = [
    { name: "你", hp: state.hp, wins: state.matchStats.wins, losses: state.matchStats.losses, human: true },
    ...state.aiPlayers.map((ai) => ({ name: ai.name, hp: ai.hp, wins: ai.wins, losses: ai.losses, human: false }))
  ].sort((a, b) => b.hp - a.hp || b.wins - a.wins);

  return `
    <section class="settlement-hero-stats">
      <div><span>最终名次</span><strong>第 1 名</strong></div>
      <div><span>结束回合</span><strong>${state.round}</strong></div>
      <div><span>剩余生命</span><strong>${state.hp}</strong></div>
      <div><span>最终等级</span><strong>${state.level}</strong></div>
      <div><span>最终金币</span><strong>${state.gold}</strong></div>
      <div><span>战绩</span><strong>${state.matchStats.wins}胜 ${state.matchStats.losses}负</strong></div>
    </section>

    <div class="settlement-columns">
      <section class="settlement-card settlement-lineup">
        <div class="settlement-card-head"><h3>终局阵容</h3><span>${lineup.length} 名角色</span></div>
        <div class="settlement-unit-grid">
          ${lineup.map((unit) => {
            const row = rowByUid.get(unit.uid);
            return `
              <article class="settlement-unit">
                <img src="${unitIconPath(unit)}" alt="${unit.name}" />
                <div><strong>${unit.name} ${"★".repeat(unit.star)}</strong><small>${unit.origins.join(" / ")}</small></div>
                <dl><div><dt>伤害</dt><dd>${row?.damageDealt || 0}</dd></div><div><dt>承伤</dt><dd>${row?.damageTaken || 0}</dd></div><div><dt>治疗</dt><dd>${row?.healingDone || 0}</dd></div></dl>
              </article>
            `;
          }).join("") || `<div class="settlement-empty">终局无上阵角色</div>`}
        </div>
      </section>

      <section class="settlement-card">
        <div class="settlement-card-head"><h3>激活羁绊</h3><span>${activeTraits.length} 项</span></div>
        <div class="settlement-trait-list">
          ${activeTraits.map(({ name, count, tier }) => `
            <article><strong>${name} <em>${count}</em></strong><span>${tier.count} · ${tier.label}</span><p>${tier.effect}</p></article>
          `).join("") || `<div class="settlement-empty">未激活羁绊</div>`}
        </div>
      </section>
    </div>

    <div class="settlement-columns compact-columns">
      <section class="settlement-card">
        <div class="settlement-card-head"><h3>最终战</h3><span>对阵 ${report?.opponent || "无"}</span></div>
        <div class="settlement-metrics">
          <div><span>团队伤害</span><strong>${finalDamage}</strong></div>
          <div><span>团队承伤</span><strong>${finalTaken}</strong></div>
          <div><span>团队治疗</span><strong>${finalHealing}</strong></div>
          <div><span>输出 MVP</span><strong>${mvp ? `${mvp.name} · ${mvp.damageDealt}` : "—"}</strong></div>
        </div>
      </section>

      <section class="settlement-card">
        <div class="settlement-card-head"><h3>整局累计</h3><span>${state.matchStats.battles} 场战斗</span></div>
        <div class="settlement-metrics">
          <div><span>累计伤害</span><strong>${state.matchStats.damageDealt}</strong></div>
          <div><span>累计承伤</span><strong>${state.matchStats.damageTaken}</strong></div>
          <div><span>累计治疗</span><strong>${state.matchStats.healingDone}</strong></div>
          <div><span>平均伤害</span><strong>${state.matchStats.battles ? Math.round(state.matchStats.damageDealt / state.matchStats.battles) : 0}</strong></div>
        </div>
      </section>
    </div>

    <section class="settlement-card settlement-standings">
      <div class="settlement-card-head"><h3>最终排名</h3><span>四人牌桌</span></div>
      <div class="settlement-ranking-list">
        ${standings.map((player, index) => `
          <div class="${player.human ? "human" : ""}"><b>${index + 1}</b><strong>${player.name}</strong><span>${player.hp} HP</span><small>${player.wins}胜 ${player.losses}负</small></div>
        `).join("")}
      </div>
    </section>
  `;
}

function showVictorySettlement(detail) {
  els.modalTitle.textContent = "乱斗胜利";
  els.modalText.textContent = detail;
  els.settlementSummary.innerHTML = settlementHtml();
  els.modalAction.textContent = "确认结算 · 配置 PvP 阵容";
  els.modal.classList.add("visible", "settlement-mode");
}

function resetGame() {
  state.round = 1;
  state.hp = 100;
  state.gold = 4;
  state.level = 2;
  state.xp = 0;
  state.phase = "prepare";
  state.battleResolved = false;
  state.gameOver = false;
  state.bench = Array(8).fill(null);
  state.board = Array(32).fill(null);
  state.enemy = Array(32).fill(null);
  state.selected = null;
  state.dragging = null;
  state.combatFighters = null;
  state.combatFx = null;
  state.combatTexts = [];
  state.battleIntro = false;
  state.traitTierProgress = {};
  state.suppressLog = false;
  state.battleStats = null;
  state.matchStats = { battles: 0, wins: 0, losses: 0, damageDealt: 0, damageTaken: 0, healingDone: 0 };
  state.gameResult = null;
  state.pvpBattleActive = false;
  state.pvpReturnState = null;
  state.log = ["新的四人乱斗开始。三家 AI 已经入座。"];
  initializeAiPlayers();
  refreshShop(true);
}

function endGame(kind, detail = "") {
  state.gameOver = true;
  state.gameResult = kind;
  state.battleResolved = true;
  state.phase = "prepare";
  if (kind === "victory") {
    pushLog("你成为四人牌桌最后的赢家。");
    showVictorySettlement(detail || "三家 AI 已全部出局。牌桌归你，家族传说开始流传。");
  } else {
    pushLog("你已从四人牌桌出局。");
    showModal("乱斗失败", detail || "你的生命值已经归零。重新整备，再杀回来。", "重新开局");
  }
}

function boardUnitCount() {
  return state.board.filter(Boolean).length;
}

function autoFillBoardFromBench() {
  if (state.gameOver || state.phase !== "prepare" || state.battleResolved) return 0;
  let moved = 0;
  while (boardUnitCount() < state.level) {
    const benchChoices = state.bench
      .map((unit, index) => unit ? index : -1)
      .filter((index) => index >= 0);
    const boardChoices = state.board
      .map((unit, index) => unit ? -1 : index)
      .filter((index) => index >= 0);
    if (!benchChoices.length || !boardChoices.length) break;
    const benchIndex = benchChoices[Math.floor(Math.random() * benchChoices.length)];
    const boardIndex = boardChoices[Math.floor(Math.random() * boardChoices.length)];
    state.board[boardIndex] = state.bench[benchIndex];
    state.bench[benchIndex] = null;
    moved += 1;
  }
  if (moved) {
    state.selected = null;
    invalidatePvpSetupCode();
    pushLog(`自动从备战区补充 ${moved} 个棋子上场。`);
  }
  return moved;
}

function xpRequirement() {
  return levelXpRequirements[state.level] || null;
}

function addExperience(amount, reason) {
  if (state.level >= 10) return;
  state.xp += amount;
  if (reason) pushLog(reason);
  let requirement = xpRequirement();
  while (requirement && state.xp >= requirement && state.level < 10) {
    state.xp -= requirement;
    state.level += 1;
    pushLog(`升到 ${state.level} 级，可上阵 ${state.level} 个棋子。`);
    requirement = xpRequirement();
  }
  if (state.level >= 10) state.xp = 0;
}

function buyExperience() {
  if (state.gameOver || state.phase === "combat" || state.battleResolved) return;
  if (state.level >= 10) {
    pushLog("已经达到最高等级。");
    render();
    return;
  }
  if (state.gold < 4) {
    pushLog("金币不足，购买经验需要 4 金。");
    render();
    return;
  }
  state.gold -= 4;
  addExperience(4, "花费 4 金购买 4 经验。");
  render();
}

function countActiveTraits() {
  const counts = {};
  const seen = new Set();
  state.board.filter(Boolean).forEach((unit) => {
    const key = unit.baseId;
    if (seen.has(key)) return;
    seen.add(key);
    unit.origins.forEach((origin) => { counts[origin] = (counts[origin] || 0) + 1; });
  });
  return counts;
}

function activeTier(name, count) {
  const rules = traitRules[name] || [];
  return rules.reduce((best, tier) => (count >= tier.count ? tier : best), null);
}

function nextTier(name, count) {
  return (traitRules[name] || []).find((tier) => count < tier.count) || null;
}

function renderPiece(unit, extraClass = "") {
  const node = els.pieceTemplate.content.firstElementChild.cloneNode(true);
  const fxClass = state.combatFx?.attacker === unit.uid ? "attacking" : state.combatFx?.target === unit.uid ? "damaged" : "";
  const side = unit.side || (extraClass.split(/\s+/).includes("enemy") ? "enemy" : null);
  const sideClass = side ? `side-${side}` : "";
  node.className = `piece origin-${unit.origin} ${extraClass} ${sideClass} ${fxClass}`.trim();
  node.style.setProperty("--origin-color", window.GAME_DATA.originColors[unit.origin] || "#477568");
  node.style.setProperty("--hit-duration", `${180 / state.battleSpeed}ms`);
  const avatar = node.querySelector(".piece-avatar");
  avatar.src = unitIconPath(unit);
  avatar.alt = unit.name;
  avatar.draggable = false;
  avatar.addEventListener("error", () => {
    avatar.hidden = true;
  });
  node.querySelector(".piece-cost").textContent = unit.cost;
  node.querySelector(".piece-name").textContent = unit.name;
  node.querySelector(".piece-meta").textContent = unit.origins.join(" / ");
  node.querySelector(".piece-star").textContent = "★".repeat(unit.star || 1);
  attachTooltip(node, unit);
  if (side) {
    const badge = document.createElement("span");
    badge.className = "side-badge";
    badge.textContent = side === "enemy" ? "敌" : "我";
    node.appendChild(badge);
  }
  if (Number.isFinite(unit.hp) && Number.isFinite(unit.maxHp)) {
    const ratio = Math.max(0, Math.min(1, unit.hp / unit.maxHp));
    const hp = document.createElement("span");
    hp.className = `hp-bar ${ratio <= 0.25 ? "critical" : ratio <= 0.5 ? "wounded" : "healthy"}`;
    hp.setAttribute("aria-label", `生命 ${Math.max(0, Math.ceil(unit.hp))}/${unit.maxHp}`);
    hp.innerHTML = `<span class="hp-fill" style="width:${ratio * 100}%"></span><strong>${Math.max(0, Math.ceil(unit.hp))}</strong>`;
    node.appendChild(hp);
  }
  if (Number.isFinite(unit.mana) && Number.isFinite(unit.maxMana) && unit.maxMana > 0) {
    const currentMana = Math.max(0, Math.min(unit.maxMana, Math.ceil(unit.mana)));
    const manaRatio = currentMana / unit.maxMana;
    const mana = document.createElement("span");
    mana.className = `mana-bar ${manaRatio >= 1 ? "ready" : ""}`.trim();
    mana.setAttribute("aria-label", `法力 ${currentMana}/${unit.maxMana}`);
    mana.innerHTML = `<span class="mana-fill" style="width:${manaRatio * 100}%"></span><strong>${currentMana}</strong>`;
    node.appendChild(mana);
  }
  const shieldTotal = unit.shields?.reduce((sum, shield) => sum + Math.max(0, shield.amount || 0), 0) || 0;
  if (shieldTotal > 0) {
    const shield = document.createElement("span");
    shield.className = "shield-bar";
    shield.textContent = `盾 ${Math.ceil(shieldTotal)}`;
    shield.setAttribute("aria-label", `护盾 ${Math.ceil(shieldTotal)}`);
    node.appendChild(shield);
  }
  return node;
}

function unitIconPath(unit) {
  return `icon/${encodeURIComponent(unit.name)}.jpg`;
}

function ensureTooltip() {
  if (els.tooltip) return els.tooltip;
  const tooltip = document.createElement("div");
  tooltip.className = "unit-tooltip";
  tooltip.setAttribute("role", "tooltip");
  document.body.appendChild(tooltip);
  els.tooltip = tooltip;
  return tooltip;
}

function scaledStats(unit) {
  const star = unit.star || 1;
  const scale = 1 + (star - 1) * 0.75;
  return {
    health: Math.round(unit.stats.health * scale),
    attack: Math.round(unit.stats.attack * scale),
    attackSpeed: unit.stats.attackSpeed.toFixed(2),
    armor: unit.stats.armor,
    magicResist: unit.stats.magicResist,
    mana: unit.stats.mana
  };
}

function tooltipHtml(unit) {
  const stats = scaledStats(unit);
  const currentHp = Number.isFinite(unit.hp) ? `<span>${Math.max(0, Math.round(unit.hp))}/${unit.maxHp}</span>` : `<span>${stats.health}</span>`;
  const traitEffects = unit.origins.map((origin) => {
    const tiers = traitRules[origin] || [];
    return `
      <section class="tooltip-trait">
        <b>${origin}</b>
        ${tiers.map((tier) => `<p><strong>${tier.count} · ${tier.label}</strong>${tier.effect}</p>`).join("")}
      </section>
    `;
  }).join("");
  return `
    <div class="tooltip-title">
      <img src="${unitIconPath(unit)}" alt="${unit.name}" />
      <div>
        <strong>${unit.name}</strong>
        <span>${unit.cost}费 · ${"★".repeat(unit.star || 1)}</span>
      </div>
    </div>
    <div class="tooltip-tag-group">
      <b>羁绊</b>
      <div class="tooltip-tags">
        ${unit.origins.map((origin) => `<span>${origin}</span>`).join("")}
      </div>
    </div>
    <div class="tooltip-tag-group">
      <b>角色定位</b>
      <div class="tooltip-tags">
        <span>${unit.role}</span>
      </div>
    </div>
    <dl class="tooltip-stats">
      <div><dt>生命</dt><dd>${currentHp}</dd></div>
      <div><dt>攻击</dt><dd>${stats.attack}</dd></div>
      <div><dt>攻速</dt><dd>${stats.attackSpeed}</dd></div>
      <div><dt>射程</dt><dd>${unit.range}</dd></div>
      <div><dt>护甲</dt><dd>${stats.armor}</dd></div>
      <div><dt>魔抗</dt><dd>${stats.magicResist}</dd></div>
      <div><dt>法力</dt><dd>${stats.mana}</dd></div>
    </dl>
    <div class="tooltip-skill">
      <b>${unit.skill}</b>
      <p>${unit.skillDescription}</p>
    </div>
    <div class="tooltip-traits">
      <h3>羁绊效果</h3>
      ${traitEffects}
    </div>
  `;
}

function positionTooltip(event) {
  const tooltip = ensureTooltip();
  const gap = 14;
  const width = tooltip.offsetWidth || 260;
  const height = tooltip.offsetHeight || 260;
  let left = event.clientX + gap;
  let top = event.clientY + gap;
  if (left + width > window.innerWidth - 8) left = event.clientX - width - gap;
  if (top + height > window.innerHeight - 8) top = event.clientY - height - gap;
  tooltip.style.left = `${Math.max(8, left)}px`;
  tooltip.style.top = `${Math.max(8, top)}px`;
}

function showTooltip(unit, event) {
  const tooltip = ensureTooltip();
  tooltip.innerHTML = tooltipHtml(unit);
  tooltip.classList.remove("trait-roster-tooltip");
  tooltip.classList.add("visible");
  positionTooltip(event);
}

function traitRosterHtml(name) {
  const activeIds = new Set(state.board.filter(Boolean).map((unit) => unit.baseId));
  const currentCount = countActiveTraits()[name] || 0;
  const currentTier = activeTier(name, currentCount);
  const tiers = traitRules[name] || [];
  const members = units
    .filter((unit) => unit.origins.includes(name))
    .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name, "zh-CN"));
  return `
    <div class="trait-roster-title">
      <strong>${name}</strong>
      <span>当前 ${currentCount} 人 · 共 ${members.length} 名角色</span>
    </div>
    <div class="trait-roster-tiers">
      ${tiers.map((tier) => `
        <article class="${currentTier?.count === tier.count ? "current" : currentCount >= tier.count ? "reached" : ""}">
          <strong>${tier.count} 人 · ${tier.label}</strong>
          <p>${tier.effect}</p>
        </article>
      `).join("")}
    </div>
    <div class="trait-roster-subtitle">所属角色</div>
    <div class="trait-roster-grid">
      ${members.map((unit) => `
        <div class="trait-member ${activeIds.has(unit.id) ? "fielded" : ""}">
          <img src="${unitIconPath(unit)}" alt="" />
          <span><b>${unit.name}</b><small>${unit.cost}费${activeIds.has(unit.id) ? " · 已上阵" : ""}</small></span>
        </div>
      `).join("")}
    </div>
  `;
}

function showTraitRoster(name, event) {
  const tooltip = ensureTooltip();
  tooltip.innerHTML = traitRosterHtml(name);
  tooltip.classList.add("visible", "trait-roster-tooltip");
  positionTooltip(event);
}

function hideTooltip() {
  ensureTooltip().classList.remove("visible", "trait-roster-tooltip");
}

function attachTooltip(node, unit) {
  node.addEventListener("mouseenter", (event) => showTooltip(unit, event));
  node.addEventListener("mousemove", positionTooltip);
  node.addEventListener("mouseleave", hideTooltip);
  node.addEventListener("focus", () => {
    const rect = node.getBoundingClientRect();
    showTooltip(unit, { clientX: rect.right, clientY: rect.top });
  });
  node.addEventListener("blur", hideTooltip);
}

function unitAt(type, index) {
  return (type === "bench" ? state.bench : state.board)[index];
}

function selectedUnit() {
  if (!state.selected) return null;
  return unitAt(state.selected.type, state.selected.index);
}

function sellPrice(unit) {
  return unit.cost * (3 ** (unit.star - 1));
}

function attachDragSource(node, type, index) {
  if (state.gameOver || state.phase === "combat" || state.battleResolved) return;
  node.draggable = true;
  node.addEventListener("dragstart", (event) => {
    if (!unitAt(type, index)) {
      event.preventDefault();
      return;
    }
    hideTooltip();
    state.dragging = { type, index };
    state.selected = { type, index };
    node.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", `${type}:${index}`);
  });
  node.addEventListener("dragend", () => {
    state.dragging = null;
    node.classList.remove("dragging");
    document.querySelectorAll(".drag-over").forEach((item) => item.classList.remove("drag-over"));
  });
}

function attachDropTarget(node, type, index) {
  if (state.gameOver || state.phase === "combat" || state.battleResolved) return;
  node.addEventListener("dragover", (event) => {
    if (!state.dragging) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    node.classList.add("drag-over");
  });
  node.addEventListener("dragleave", () => {
    node.classList.remove("drag-over");
  });
  node.addEventListener("drop", (event) => {
    event.preventDefault();
    node.classList.remove("drag-over");
    if (!state.dragging) return;
    moveUnit(state.dragging, { type, index });
    state.dragging = null;
  });
}

function attachSellDropTarget(node) {
  node.addEventListener("dragover", (event) => {
    if (!state.dragging || state.gameOver || state.phase === "combat" || state.phase === "pvp-setup" || state.battleResolved) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    node.classList.add("drag-over");
  });
  node.addEventListener("dragleave", (event) => {
    if (node.contains(event.relatedTarget)) return;
    node.classList.remove("drag-over");
  });
  node.addEventListener("drop", (event) => {
    event.preventDefault();
    node.classList.remove("drag-over");
    if (!state.dragging) return;
    sellOwnedUnit(state.dragging);
  });
}

function renderBoard() {
  els.board.innerHTML = "";
  els.board.classList.toggle("battle-intro", state.battleIntro);
  [
    ["board-zone-label enemy-label", "敌方阵地"],
    ["board-zone-label player-label", "我方阵地"],
    ["board-divider", ""],
    ["board-versus", "VS"],
    ["board-corner corner-tl", "◆"],
    ["board-corner corner-tr", "◆"],
    ["board-corner corner-bl", "◆"],
    ["board-corner corner-br", "◆"]
  ].forEach(([className, text]) => {
    const decoration = document.createElement("span");
    decoration.className = className;
    decoration.textContent = text;
    els.board.appendChild(decoration);
  });
  const combatByCell = new Map();
  if (state.combatFighters) {
    state.combatFighters
      .filter((unit) => unit.hp > 0)
      .forEach((unit) => combatByCell.set(`${unit.row},${unit.col}`, unit));
  }
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = `cell ${row < 4 ? "enemy-zone" : "player-zone"} ${(row + col) % 2 ? "tile-dark" : "tile-light"}`;
      const index = row * 8 + col;
      const playerIndex = (row - 4) * 8 + col;
      const enemyIndex = row * 8 + col;
      const combatUnit = combatByCell.get(`${row},${col}`);
      if (state.combatFighters) {
        state.combatTexts
          .filter((item) => item.row === row && item.col === col)
          .forEach((item, textIndex) => {
            const float = document.createElement("span");
            float.className = `combat-float ${item.type}`;
            float.textContent = item.text;
            float.style.setProperty("--float-offset", `${textIndex * 10}px`);
            float.style.animationDuration = `${1.08 / state.battleSpeed}s`;
            float.style.animationDelay = `${-Math.max(0, (state.combatFighters.currentTick || 0) - item.createdTick) * (0.18 / state.battleSpeed)}s`;
            cell.appendChild(float);
          });
      }
      if (combatUnit) {
        cell.classList.add("locked", "combat-cell", "occupied");
        if (state.combatFx?.kind === "skill" && state.combatFx.target === combatUnit.uid) cell.classList.add("skill-target");
        if (cell.classList.contains("skill-target")) cell.style.animationDuration = `${540 / state.battleSpeed}ms`;
        cell.appendChild(renderPiece(combatUnit, combatUnit.side === "enemy" ? "enemy combat-piece" : "combat-piece"));
        cell.style.gridRow = `${row + 1}`;
        cell.style.gridColumn = `${col + 1}`;
        cell.dataset.index = index;
        els.board.appendChild(cell);
        continue;
      }
      if (state.combatFighters) {
        cell.classList.add("locked");
        cell.style.gridRow = `${row + 1}`;
        cell.style.gridColumn = `${col + 1}`;
        cell.dataset.index = index;
        els.board.appendChild(cell);
        continue;
      }
      if (row >= 4) {
        const unit = state.board[playerIndex];
        cell.addEventListener("click", () => handleBoardClick(playerIndex));
        attachDropTarget(cell, "board", playerIndex);
        if (state.selected?.type === "board" && state.selected.index === playerIndex) {
          cell.classList.add("selected-cell");
        }
        if (unit) {
          cell.classList.add("occupied");
          const piece = renderPiece(unit);
          if (state.selected?.type === "board" && state.selected.index === playerIndex) {
            piece.classList.add("selected");
          }
          attachDragSource(piece, "board", playerIndex);
          cell.appendChild(piece);
        }
      } else {
        cell.classList.add("locked");
        const unit = state.enemy[enemyIndex];
        if (unit) {
          cell.classList.add("occupied");
          cell.appendChild(renderPiece(unit, "enemy"));
        }
      }
      cell.style.gridRow = `${row + 1}`;
      cell.style.gridColumn = `${col + 1}`;
      cell.dataset.index = index;
      els.board.appendChild(cell);
    }
  }
  if (state.battleIntro) {
    const overlay = document.createElement("div");
    overlay.className = "battle-start-overlay";
    overlay.innerHTML = "<span>敌方阵容</span><strong>VS</strong><span>我方阵容</span>";
    overlay.style.animationDuration = `${720 / state.battleSpeed}ms`;
    els.board.appendChild(overlay);
  }
}

function renderBench() {
  els.bench.innerHTML = "";
  state.bench.forEach((unit, index) => {
    if (unit) {
      const piece = renderPiece(unit, "bench-piece");
      if (state.selected?.type === "bench" && state.selected.index === index) piece.classList.add("selected");
      piece.addEventListener("click", () => select("bench", index));
      attachDragSource(piece, "bench", index);
      attachDropTarget(piece, "bench", index);
      els.bench.appendChild(piece);
      return;
    }
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = "empty-slot";
    slot.textContent = "空位";
    slot.addEventListener("click", () => handleBenchClick(index));
    attachDropTarget(slot, "bench", index);
    els.bench.appendChild(slot);
  });
  els.benchCount.textContent = `${state.bench.filter(Boolean).length}/8`;
}

function renderShop() {
  els.shop.innerHTML = "";
  state.shop.forEach((base, index) => {
    if (!base) {
      const empty = document.createElement("div");
      empty.className = "empty-shop-slot";
      empty.textContent = "已售出";
      els.shop.appendChild(empty);
      return;
    }
    const piece = renderPiece({ ...base, star: 1 }, "shop-piece");
    piece.addEventListener("click", () => buy(index));
    els.shop.appendChild(piece);
  });
}

function renderTraits() {
  const counts = countActiveTraits();
  els.traits.innerHTML = "";
  const activeNames = Object.keys(counts)
    .filter((name) => counts[name] > 0)
    .sort((a, b) => {
      const tierA = activeTier(a, counts[a]) ? 1 : 0;
      const tierB = activeTier(b, counts[b]) ? 1 : 0;
      return tierB - tierA || counts[b] - counts[a] || a.localeCompare(b, "zh-CN");
    });
  if (!activeNames.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "上阵棋子后显示羁绊";
    els.traits.appendChild(empty);
    return;
  }
  activeNames.forEach((name) => {
    const count = counts[name] || 0;
    const tier = activeTier(name, count);
    const previousTier = state.traitTierProgress[name] || 0;
    const newlyUnlocked = Boolean(tier && tier.count > previousTier && state.phase !== "combat");
    state.traitTierProgress[name] = tier?.count || 0;
    if (newlyUnlocked) pushLog(`羁绊达成：${name}（${tier.count}）！`);
    const div = document.createElement("div");
    div.className = `trait ${tier ? "active" : ""} ${newlyUnlocked ? "newly-unlocked" : ""}`;
    div.style.setProperty("--trait-color", window.GAME_DATA.originColors[name] || "#d9b15f");
    div.tabIndex = 0;
    div.setAttribute("aria-label", `${name}羁绊，悬停查看所属角色`);
    const next = nextTier(name, count);
    const summary = tier ? `${tier.count} ${tier.label}` : `未激活`;
    const detail = tier
      ? tier.effect
      : `下一档 ${next.count}：${next.effect}`;
    const progress = next ? `距离 ${next.count} 还差 ${next.count - count}` : "已达最高档";
    div.innerHTML = `
      ${tier ? `<i class="trait-active-mark">${newlyUnlocked ? "羁绊达成！" : "已激活"}</i>` : ""}
      <strong><span>${name}</span><span>${count} · ${summary}</span></strong>
      <p>${detail}</p>
      <small>${progress} · 悬停查看角色</small>
    `;
    div.addEventListener("mouseenter", (event) => showTraitRoster(name, event));
    div.addEventListener("mousemove", positionTooltip);
    div.addEventListener("mouseleave", hideTooltip);
    div.addEventListener("focus", () => {
      const rect = div.getBoundingClientRect();
      showTraitRoster(name, { clientX: rect.right, clientY: rect.top });
    });
    div.addEventListener("blur", hideTooltip);
    els.traits.appendChild(div);
  });
  Object.keys(state.traitTierProgress).forEach((name) => {
    if (!activeNames.includes(name)) state.traitTierProgress[name] = 0;
  });
}

function renderLog() {
  els.log.innerHTML = "";
  state.log.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    els.log.appendChild(li);
  });
}

function renderStandings() {
  const players = [
    { id: "human", name: "你", hp: state.hp, level: state.level, human: true, eliminated: state.hp <= 0, description: "真人玩家" },
    ...state.aiPlayers
  ].sort((a, b) => Number(a.eliminated) - Number(b.eliminated) || b.hp - a.hp);
  els.standings.innerHTML = "";
  players.forEach((player) => {
    const row = document.createElement("div");
    const isOpponent = player.id === state.currentOpponentId && state.phase === "combat";
    row.className = `standing-player ${player.human ? "human" : ""} ${isOpponent ? "opponent" : ""} ${player.eliminated ? "eliminated" : ""}`.trim();
    const record = player.human ? "由你操控" : `${player.wins}胜 ${player.losses}负 · ${player.description}`;
    row.innerHTML = `
      <strong>${player.name}${isOpponent ? " · 本轮对手" : ""}</strong>
      <span class="standing-hp">${player.eliminated ? "出局" : `${player.hp} HP`}</span>
      <small>${player.eliminated ? "已淘汰" : `${player.level}级 · ${record}`}</small>
    `;
    els.standings.appendChild(row);
  });
}

function renderBattleStats() {
  const report = state.battleStats;
  els.battleStats.classList.toggle("visible", Boolean(report));
  if (!report) {
    els.battleStats.innerHTML = "";
    return;
  }
  const rows = [...report.rows].sort((a, b) => {
    if (a.side !== b.side) return a.side === "player" ? -1 : 1;
    return b.damageDealt - a.damageDealt || b.damageTaken - a.damageTaken || b.healingDone - a.healingDone;
  });
  const body = rows.map((unit) => `
    <tr class="${unit.side}-row">
      <td>${unit.side === "player" ? "我" : "敌"} · ${unit.name} ${"★".repeat(unit.star)}</td>
      <td class="stat-damage">${unit.damageDealt}</td>
      <td class="stat-taken">${unit.damageTaken}</td>
      <td class="stat-healing">${unit.healingDone}</td>
    </tr>
  `).join("");
  els.battleStats.innerHTML = `
    <div class="battle-stats-head">
      <h2>${report.round === "PvP" ? "异步 PvP 战斗统计" : `第 ${report.round} 回合战斗统计`}</h2>
      <p>你 vs ${report.opponent} · ${report.result === "win" ? "胜利" : "失败"} · 仅统计有效数值</p>
    </div>
    <table class="battle-stats-table">
      <thead><tr><th>棋子</th><th>输出</th><th>承伤</th><th>治疗</th></tr></thead>
      <tbody>${body}</tbody>
    </table>
  `;
}

function renderShopOdds() {
  const currentOddsLevel = Math.min(9, state.level);
  const rows = Object.entries(shopOddsByLevel).map(([level, odds]) => `
    <tr class="${Number(level) === currentOddsLevel ? "current-level" : ""}">
      <td>${level === "9" ? "9～10" : level}</td>
      ${odds.map((chance) => `<td>${chance}%</td>`).join("")}
    </tr>
  `).join("");
  els.shopOdds.innerHTML = `
    <strong>商店刷新概率（当前 ${state.level} 级）</strong>
    <table class="shop-odds-table">
      <thead><tr><th>等级</th><th>1费</th><th>2费</th><th>3费</th><th>4费</th><th>5费</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function pvpSnapshotSummary(snapshot) {
  const stars = snapshot.b.reduce((sum, entry) => sum + entry[2], 0);
  const lineup = snapshot.b.map(([, baseId, star]) => {
    const unit = units.find((item) => item.id === baseId);
    return `${unit?.name || baseId}${"★".repeat(star)}`;
  });
  const counts = {};
  const seen = new Set();
  snapshot.b.forEach(([, baseId]) => {
    if (seen.has(baseId)) return;
    seen.add(baseId);
    units.find((unit) => unit.id === baseId)?.origins.forEach((origin) => { counts[origin] = (counts[origin] || 0) + 1; });
  });
  const active = Object.entries(counts).filter(([name, count]) => activeTier(name, count)).map(([name, count]) => `${name} ${count}`);
  return { unitCount: snapshot.b.length, stars, traits: active, lineup };
}

function pvpLineupCard(saved, kind) {
  if (!saved) return `<div class="pvp-empty">${kind === "own" ? "尚未保存通关阵容。通关 AI 后即可创建。" : "请粘贴并导入对方的阵容码。"}</div>`;
  const snapshot = saved.snapshot;
  const summary = pvpSnapshotSummary(snapshot);
  const id = saved.snapshotId || pvpHash(saved.code?.split("-").pop() || "");
  const versionWarning = snapshot.bv !== pvpBalanceVersion ? `<span class="pvp-version-warning">平衡版本 ${escapeHtml(snapshot.bv || "未知")}，将按当前版本战斗</span>` : "";
  return `
    <article class="pvp-lineup-card ${kind}">
      <div><strong>${escapeHtml(snapshot.p)}</strong><small>阵容编号 ${escapeHtml(id)}</small></div>
      <dl><div><dt>等级</dt><dd>${snapshot.l}</dd></div><div><dt>人口</dt><dd>${summary.unitCount}</dd></div><div><dt>星级总和</dt><dd>${summary.stars}</dd></div></dl>
      <p>${summary.traits.length ? summary.traits.map(escapeHtml).join(" · ") : "未激活羁绊"}</p>
      <p>${summary.lineup.map(escapeHtml).join(" · ")}</p>
      ${versionWarning}
    </article>
  `;
}

function renderPvpLobby(message = "", isError = false) {
  const own = savedPvpLineup();
  const opponent = state.pvpOpponent;
  const history = Object.entries(pvpStats()).sort((a, b) => String(b[1].lastPlayed || "").localeCompare(String(a[1].lastPlayed || ""))).slice(0, 8);
  const result = state.pvpLastResult;
  els.pvpLobbyContent.innerHTML = `
    ${result ? `<div class="pvp-result-banner ${result.result}"><strong>${result.result === "win" ? "挑战胜利" : "挑战失败"}</strong><span>对阵 ${escapeHtml(result.opponent)} · ${result.damage} 总输出</span></div>` : ""}
    <div class="pvp-lobby-grid">
      <section class="pvp-lobby-section">
        <div class="pvp-section-head"><h3>我的通关阵容</h3><span>自动读取本地存档</span></div>
        ${pvpLineupCard(own, "own")}
        ${own ? `<textarea id="pvp-share-code" class="pvp-code-textarea" readonly>${escapeHtml(own.code)}</textarea><button id="pvp-copy-share" class="secondary-button" type="button">复制我的阵容码</button>` : ""}
      </section>
      <section class="pvp-lobby-section">
        <div class="pvp-section-head"><h3>挑战其他玩家</h3><span>粘贴对方阵容码</span></div>
        <textarea id="pvp-import-input" class="pvp-code-textarea" placeholder="MDF1-..."></textarea>
        <button id="pvp-import-button" class="secondary-button" type="button">导入并预览</button>
        ${pvpLineupCard(opponent, "opponent")}
        <button id="pvp-start-challenge" class="primary-button pvp-start-button" type="button" ${!own || !opponent || state.pvpReturnState ? "disabled" : ""}>${state.pvpReturnState ? "关闭结果后可再次挑战" : "开始挑战"}</button>
      </section>
    </div>
    <p class="pvp-lobby-message ${isError ? "error" : ""}">${escapeHtml(message)}</p>
    <section class="pvp-history">
      <div class="pvp-section-head"><h3>本机交手记录</h3><span>仅保存在当前浏览器</span></div>
      ${history.length ? `<div class="pvp-history-list">${history.map(([id, item]) => `<div><strong>${escapeHtml(item.playerId)} <small>${escapeHtml(id)}</small></strong><span>导入 ${item.imports} 次</span><span>${item.battles} 战 · ${item.wins}胜 ${item.losses}负</span></div>`).join("")}</div>` : `<div class="pvp-empty compact">暂无交手记录</div>`}
    </section>
  `;
  document.querySelector("#pvp-copy-share")?.addEventListener("click", async (event) => {
    const copied = await copyPvpCode(own.code);
    event.currentTarget.textContent = copied ? "已复制" : "复制失败，请手动复制";
  });
  document.querySelector("#pvp-import-button")?.addEventListener("click", () => {
    const input = document.querySelector("#pvp-import-input");
    try {
      const decoded = decodePvpCode(input.value);
      state.pvpOpponent = decoded;
      const stats = updatePvpOpponentStats(decoded.snapshotId, decoded.snapshot, { imports: 1 });
      renderPvpLobby(`已导入 ${decoded.snapshot.p} 的阵容；本机累计导入 ${stats.imports} 次。`);
    } catch (error) {
      renderPvpLobby(error.message, true);
      const nextInput = document.querySelector("#pvp-import-input");
      if (nextInput) nextInput.value = input.value;
    }
  });
  document.querySelector("#pvp-start-challenge")?.addEventListener("click", () => playPvpChallenge());
}

function openPvpLobby() {
  if (state.phase === "combat") return;
  state.pvpLastResult = null;
  renderPvpLobby();
  els.pvpModal.classList.add("visible");
}

function closePvpLobby() {
  if (state.pvpBattleActive) return;
  els.pvpModal.classList.remove("visible");
  if (state.pvpReturnState) restoreAfterPvp();
}

function enterPvpSetup() {
  hideModal();
  state.gameOver = false;
  state.phase = "pvp-setup";
  state.battleResolved = false;
  state.combatFighters = null;
  state.combatFx = null;
  state.enemy = Array(32).fill(null);
  state.selected = null;
  const saved = savedPvpLineup();
  els.pvpPlayerId.value = saved?.snapshot?.p || "";
  els.pvpSetupMessage.textContent = "";
  els.pvpOwnCode.value = "";
  els.pvpCodeResult.classList.remove("visible");
  render();
}

function invalidatePvpSetupCode(message = "阵容或 ID 已改变，请重新保存并生成阵容码。") {
  if (state.phase !== "pvp-setup" || !els.pvpCodeResult.classList.contains("visible")) return;
  els.pvpCodeResult.classList.remove("visible");
  els.pvpOwnCode.value = "";
  els.pvpSetupMessage.textContent = message;
}

function savePvpDefenseLineup() {
  try {
    const snapshot = createPvpSnapshot(els.pvpPlayerId.value);
    const code = encodePvpSnapshot(snapshot);
    const decoded = decodePvpCode(code);
    const saved = { ...decoded, savedAt: new Date().toISOString() };
    if (!safeWriteStorage(pvpLineupStorageKey, saved)) throw new Error("浏览器未允许本地保存，请检查隐私设置。");
    els.pvpOwnCode.value = code;
    els.pvpSetupMessage.textContent = `已保存 ${snapshot.p} 的阵容，编号 ${decoded.snapshotId}。`;
    els.pvpSetupMessage.classList.remove("error");
    els.pvpCodeResult.classList.add("visible");
  } catch (error) {
    els.pvpSetupMessage.textContent = error.message;
    els.pvpSetupMessage.classList.add("error");
  }
}

async function copyOwnPvpCode() {
  const copied = await copyPvpCode(els.pvpOwnCode.value);
  els.pvpCopyOwnCode.textContent = copied ? "已复制" : "复制失败，请手动复制";
}

function finishPvpSetup() {
  if (!savedPvpLineup()) return;
  resetGame();
  hideModal();
  render();
}

function render() {
  const pvpSetup = state.phase === "pvp-setup";
  els.round.textContent = state.round;
  els.hp.textContent = state.hp;
  els.gold.textContent = state.gold;
  els.level.textContent = state.level;
  els.xp.textContent = state.level >= 10 ? "MAX" : `${state.xp}/${xpRequirement()}`;
  els.unitCap.textContent = `${boardUnitCount()}/${state.level}`;
  els.phase.textContent = pvpSetup ? "PvP布阵" : state.gameOver ? "结束" : state.phase === "combat" ? "战斗" : state.battleResolved ? "结算" : "备战";
  els.reroll.disabled = pvpSetup || state.gameOver || state.phase === "combat" || state.battleResolved || state.gold < 2;
  els.buyXp.disabled = pvpSetup || state.gameOver || state.phase === "combat" || state.battleResolved || state.gold < 4 || state.level >= 10;
  els.buyXp.textContent = state.level >= 10 ? "等级已满" : "购买经验 +4 -4金";
  const unitToSell = selectedUnit();
  const canSell = unitToSell && !pvpSetup && !state.gameOver && state.phase !== "combat" && !state.battleResolved;
  els.sellUnit.disabled = !canSell;
  els.sellUnit.textContent = canSell ? `出售 ${unitToSell.name} +${sellPrice(unitToSell)}金` : "选择棋子后出售";
  els.startBattle.disabled = pvpSetup || state.gameOver || state.phase === "combat" || state.battleResolved || !state.board.some(Boolean);
  els.startBattle.textContent = pvpSetup ? "请保存 PvP 阵容" : state.battleResolved ? "本回合已战斗" : "开始战斗";
  els.battleSpeed.disabled = pvpSetup || state.gameOver;
  els.battleSpeed.textContent = `战斗速度 ${state.battleSpeed}×`;
  els.battleSpeed.classList.toggle("active", state.battleSpeed === 2);
  els.battleSpeed.classList.toggle("slow", state.battleSpeed === 0.5);
  els.battleSpeed.setAttribute("aria-label", `当前战斗速度 ${state.battleSpeed} 倍，点击切换速度`);
  els.nextRound.disabled = pvpSetup || state.gameOver || state.phase === "combat" || !state.battleResolved;
  els.nextRound.textContent = pvpSetup ? "防守阵容布置中" : state.battleResolved ? "进入下一回合" : "等待战斗";
  els.pvpOpen.disabled = pvpSetup || state.phase === "combat";
  els.pvpSetupPanel.classList.toggle("visible", pvpSetup);
  renderBoard();
  renderBench();
  renderShop();
  renderShopOdds();
  renderStandings();
  renderBattleStats();
  renderTraits();
  renderLog();
}

function select(type, index) {
  if (state.gameOver || state.phase === "combat" || state.battleResolved) return;
  const source = type === "bench" ? state.bench : state.board;
  if (!source[index]) return;
  state.selected = state.selected?.type === type && state.selected.index === index ? null : { type, index };
  render();
}

function handleBoardClick(index) {
  if (state.gameOver || state.phase === "combat" || state.battleResolved) return;
  if (!state.selected) {
    select("board", index);
    return;
  }
  moveSelectedTo("board", index);
}

function handleBenchClick(index) {
  if (state.gameOver || state.phase === "combat" || state.battleResolved) return;
  if (!state.selected) return;
  moveSelectedTo("bench", index);
}

function moveSelectedTo(targetType, targetIndex) {
  moveUnit(state.selected, { type: targetType, index: targetIndex });
}

function moveUnit(source, target) {
  if (!source || !target) return;
  if (source.type === target.type && source.index === target.index) {
    state.selected = null;
    render();
    return;
  }
  const sourceArray = source.type === "bench" ? state.bench : state.board;
  const targetArray = target.type === "bench" ? state.bench : state.board;
  const sourceIndex = source.index;
  const moving = sourceArray[sourceIndex];
  if (!moving) return;
  const replaced = targetArray[target.index];
  const addsBoardUnit = source.type === "bench" && target.type === "board" && !replaced;
  if (addsBoardUnit && boardUnitCount() >= state.level) {
    pushLog(`当前 ${state.level} 级最多上阵 ${state.level} 个棋子。`);
    state.selected = null;
    render();
    return;
  }
  targetArray[target.index] = moving;
  sourceArray[sourceIndex] = replaced || null;
  state.selected = null;
  invalidatePvpSetupCode();
  render();
}

function buy(shopIndex) {
  if (state.gameOver || state.phase === "combat" || state.phase === "pvp-setup" || state.battleResolved) return;
  const base = state.shop[shopIndex];
  if (!base || state.gold < base.cost) {
    pushLog("金币不足，买不动。");
    render();
    return;
  }
  const benchIndex = state.bench.findIndex((slot) => !slot);
  const mergeEntries = benchIndex < 0
    ? allOwnedEntries()
        .filter((entry) => entry.unit.baseId === base.id && entry.unit.star === 1)
        .sort((a, b) => Number(b.area === "board") - Number(a.area === "board"))
        .slice(0, 2)
    : [];
  if (benchIndex < 0 && mergeEntries.length < 2) {
    pushLog("备战区满了。");
    render();
    return;
  }
  state.gold -= base.cost;
  if (benchIndex >= 0) {
    state.bench[benchIndex] = createUnit(base);
  } else {
    const [keep, remove] = mergeEntries;
    keep.unit.star = 2;
    setEntry(keep, keep.unit);
    setEntry(remove, null);
    pushLog(`${keep.unit.name} 合成 2 星。`);
  }
  state.shop[shopIndex] = null;
  hideTooltip();
  pushLog(`购买 ${base.name}。`);
  combineAll();
  render();
}

function sellOwnedUnit(location) {
  if (state.gameOver || state.phase === "combat" || state.phase === "pvp-setup" || state.battleResolved || !location) return;
  if (location.type !== "bench" && location.type !== "board") return;
  const source = location.type === "bench" ? state.bench : state.board;
  const unit = source[location.index];
  if (!unit) {
    state.selected = null;
    state.dragging = null;
    render();
    return;
  }
  const price = sellPrice(unit);
  source[location.index] = null;
  state.gold += price;
  state.selected = null;
  state.dragging = null;
  hideTooltip();
  pushLog(`出售 ${unit.name}，获得 ${price} 金。`);
  render();
}

function sellSelectedUnit() {
  sellOwnedUnit(state.selected);
}

function allOwnedEntries() {
  return [
    ...state.bench.map((unit, index) => ({ area: "bench", index, unit })),
    ...state.board.map((unit, index) => ({ area: "board", index, unit }))
  ].filter((entry) => entry.unit);
}

function setEntry(entry, unit) {
  (entry.area === "bench" ? state.bench : state.board)[entry.index] = unit;
}

function combineAll() {
  let combined = true;
  while (combined) {
    combined = false;
    const groups = new Map();
    allOwnedEntries().forEach((entry) => {
      if (entry.unit.star >= 3) return;
      const key = `${entry.unit.baseId}-${entry.unit.star}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(entry);
    });
    for (const entries of groups.values()) {
      if (entries.length >= 3) {
        const keep = entries.find((entry) => entry.area === "board") || entries[0];
        const [removeA, removeB] = entries.filter((entry) => entry !== keep).slice(0, 2);
        keep.unit.permanentGrowth = Math.max(keep.unit.permanentGrowth || 0, removeA.unit.permanentGrowth || 0, removeB.unit.permanentGrowth || 0);
        keep.unit.pigeonBuffNext = Boolean(keep.unit.pigeonBuffNext || removeA.unit.pigeonBuffNext || removeB.unit.pigeonBuffNext);
        keep.unit.star += 1;
        setEntry(keep, keep.unit);
        setEntry(removeA, null);
        setEntry(removeB, null);
        pushLog(`${keep.unit.name} 合成 ${keep.unit.star} 星。`);
        combined = true;
        break;
      }
    }
  }
}

function mirrorBoardIndex(index) {
  const row = Math.floor(index / 8);
  const col = index % 8;
  return (3 - row) * 8 + col;
}

function currentOpponent() {
  return state.aiPlayers.find((ai) => ai.id === state.currentOpponentId) || null;
}

function chooseHumanOpponent() {
  const alive = state.aiPlayers.filter((ai) => !ai.eliminated);
  if (!alive.length) return null;
  const preferred = (state.round - 1) % aiProfiles.length;
  const opponent = Array.from({ length: aiProfiles.length }, (_, offset) => aiProfiles[(preferred + offset) % aiProfiles.length])
    .map((profile) => alive.find((ai) => ai.id === profile.id))
    .find(Boolean) || alive[0];
  state.currentOpponentId = opponent.id;
  state.enemy = Array(32).fill(null);
  opponent.board.forEach((unit, index) => {
    if (unit) state.enemy[mirrorBoardIndex(index)] = unit;
  });
  pushLog(`本轮匹配：你 vs ${opponent.name}。`);
  return opponent;
}

function createMatchFighters(leftBoard, rightBoard) {
  return prepareBattleFighters([
    ...leftBoard.map((unit, index) => (unit ? toFighter(unit, "player", index) : null)).filter(Boolean),
    ...rightBoard.map((unit, index) => (unit ? toFighter(unit, "enemy", mirrorBoardIndex(index)) : null)).filter(Boolean)
  ]);
}

function survivorDamage(survivors) {
  return Math.min(18, survivors.filter((unit) => unit.countsForVictory).reduce((sum, unit) => sum + unit.star + unit.cost, 0));
}

function traitWinGold(fighters, side) {
  const tier = getSideTier(fighters, side, "现充");
  if (!tier) return 0;
  const config = balance.traits["现充"];
  return config.winGold[config.counts.indexOf(tier.count)] || 0;
}

function traitOutcomeGold(fighters, side, result) {
  const tier = getSideTier(fighters, side, "逃离塔科夫");
  if (!tier) return 0;
  const config = balance.traits["逃离塔科夫"];
  const index = config.counts.indexOf(tier.count);
  return result === "win" ? config.winGold[index] : config.lossGold[index];
}

function eliminateAi(ai) {
  if (ai.hp > 0 || ai.eliminated) return;
  ai.hp = 0;
  ai.eliminated = true;
  state.eliminationOrder.push(ai.id);
  pushLog(`${ai.name} 已被淘汰。`);
}

function simulateAiMatch(left, right) {
  state.suppressLog = true;
  const fighters = createMatchFighters(left.board, right.board);
  for (let tick = 0; tick < BATTLE_MAX_TICKS; tick += 1) {
    battleStep(fighters, tick);
    const leftAlive = activeCoreUnits(fighters, "player").length > 0;
    const rightAlive = activeCoreUnits(fighters, "enemy").length > 0;
    if (!leftAlive || !rightAlive) break;
  }
  state.suppressLog = false;
  state.combatFx = null;
  const leftSurvivors = activeCoreUnits(fighters, "player");
  const rightSurvivors = activeCoreUnits(fighters, "enemy");
  const leftScore = leftSurvivors.length * 100000 + leftSurvivors.reduce((sum, unit) => sum + unit.hp / unit.maxHp, 0);
  const rightScore = rightSurvivors.length * 100000 + rightSurvivors.reduce((sum, unit) => sum + unit.hp / unit.maxHp, 0);
  const reward = 4 + Math.floor(state.round / 3);
  if (leftScore >= rightScore) {
    const damage = survivorDamage(leftSurvivors);
    right.hp = Math.max(0, right.hp - damage);
    left.gold += reward + traitWinGold(fighters, "player") + traitOutcomeGold(fighters, "player", "win");
    right.gold = Math.max(0, right.gold + 2 + traitOutcomeGold(fighters, "enemy", "loss"));
    left.wins += 1;
    right.losses += 1;
    pushLog(`${left.name} 击败 ${right.name}，造成 ${damage} 点伤害。`);
  } else {
    const damage = survivorDamage(rightSurvivors);
    left.hp = Math.max(0, left.hp - damage);
    right.gold += reward + traitWinGold(fighters, "enemy") + traitOutcomeGold(fighters, "enemy", "win");
    left.gold = Math.max(0, left.gold + 2 + traitOutcomeGold(fighters, "player", "loss"));
    right.wins += 1;
    left.losses += 1;
    pushLog(`${right.name} 击败 ${left.name}，造成 ${damage} 点伤害。`);
  }
  eliminateAi(left);
  eliminateAi(right);
}

function resolveBackgroundMatch() {
  const candidates = state.aiPlayers.filter((ai) => !ai.eliminated && ai.id !== state.currentOpponentId);
  if (candidates.length >= 2) simulateAiMatch(candidates[0], candidates[1]);
  else if (candidates.length === 1) pushLog(`${candidates[0].name} 本轮轮空。`);
}

const BATTLE_TICK_SECONDS = 0.18;
const ticksFor = (seconds) => Math.max(1, Math.round(seconds / BATTLE_TICK_SECONDS));
const BATTLE_OVERTIME_START = 150;
const BATTLE_MAX_TICKS = 360;
const starValue = (fighter, values) => values[Math.max(0, Math.min(values.length - 1, fighter.star - 1))];
const hasOrigin = (fighter, origin) => fighter.origins?.includes(origin);

function toFighter(unit, side, boardIndex) {
  let pigeonBoosted = false;
  if (unit.origins.includes("鸽子王")) {
    const pigeon = balance.traits["鸽子王"];
    if (unit.pigeonBuffNext) { pigeonBoosted = true; unit.pigeonBuffNext = false; }
    else if (Math.random() < pigeon.absenceChance) {
      unit.pigeonBuffNext = true;
      pushLog(`${unit.name} 本场选择当鸽子，下一场将强化归来。`);
      return null;
    }
  }
  const pigeonMultiplier = pigeonBoosted ? balance.traits["鸽子王"].returnMultiplier : 1;
  const rowOffset = side === "player" ? 4 : 0;
  const row = rowOffset + Math.floor(boardIndex / 8);
  const col = boardIndex % 8;
  const starScale = 1 + (unit.star - 1) * 0.75;
  const growthScale = 1 + (unit.permanentGrowth || 0);
  const statScale = starScale * growthScale * pigeonMultiplier;
  const maxHp = Math.round(unit.stats.health * statScale);
  return {
    ...unit,
    sourceUnit: unit,
    side,
    row,
    col,
    hp: maxHp,
    maxHp,
    attack: Math.round(unit.stats.attack * statScale),
    armor: Math.round(unit.stats.armor * growthScale * pigeonMultiplier),
    magicResist: Math.round(unit.stats.magicResist * growthScale * pigeonMultiplier),
    baseAttackSpeed: unit.stats.attackSpeed * growthScale * pigeonMultiplier,
    attackSpeedBonus: 0,
    mana: 0,
    maxMana: unit.stats.mana,
    cooldown: 0,
    statuses: [],
    shields: [],
    attackImmunity: 0,
    contributors: new Set(),
    killRewards: [],
    effectTimers: {},
    deathHandled: false,
    countsForVictory: true,
    summon: false,
    damageDealt: 0,
    damageTaken: 0,
    healingDone: 0,
    omnivamp: 0,
    damageShieldRatio: 0,
    executeThreshold: 0
  };
}

function distance(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function activeCoreUnits(fighters, side) {
  return fighters.filter((item) => item.side === side && item.hp > 0 && item.countsForVictory);
}

function traitCountsForSide(fighters, side) {
  const seen = new Set();
  const counts = {};
  fighters.filter((fighter) => fighter.side === side && fighter.countsForVictory).forEach((fighter) => {
    if (seen.has(fighter.baseId)) return;
    seen.add(fighter.baseId);
    fighter.origins.forEach((origin) => { counts[origin] = (counts[origin] || 0) + 1; });
  });
  return counts;
}

function tierForCount(name, count) {
  return (traitRules[name] || []).reduce((best, tier) => count >= tier.count ? tier : best, null);
}

function getSideTier(fighters, side, name) {
  return fighters.traitTiers?.[side]?.[name] || null;
}

function balanceTier(name, tier) {
  const config = balance.traits[name];
  const index = config.counts ? config.counts.indexOf(tier.count) : 0;
  return { config, index: Math.max(0, index) };
}

function multiplyHealth(fighter, multiplier) {
  fighter.maxHp = Math.round(fighter.maxHp * multiplier);
  fighter.hp = Math.round(fighter.hp * multiplier);
}

function addStatus(target, type, untilTick, value = 0, extra = {}) {
  const existing = target.statuses.find((status) => status.type === type && status.sourceUid === extra.sourceUid);
  if (existing) {
    existing.untilTick = Math.max(existing.untilTick, untilTick);
    existing.value = Math.max(existing.value || 0, value || 0);
    Object.assign(existing, extra);
    return existing;
  }
  const status = { type, untilTick, value, ...extra };
  target.statuses.push(status);
  return status;
}

function hasStatus(target, type, tick) {
  return target.statuses.some((status) => status.type === type && status.untilTick > tick);
}

function statusValue(target, type, tick) {
  return target.statuses
    .filter((status) => status.type === type && status.untilTick > tick)
    .reduce((sum, status) => sum + (status.value || 0), 0);
}

function isHardControlled(fighter, tick) {
  return hasStatus(fighter, "stun", tick) || hasStatus(fighter, "freeze", tick) || hasStatus(fighter, "sealed", tick);
}

function effectiveAttackSpeed(fighter, tick) {
  const timedBonus = statusValue(fighter, "attackSpeedBuff", tick) + statusValue(fighter, "transformed", tick);
  const slow = Math.min(0.8, statusValue(fighter, "attackSpeedSlow", tick));
  return Math.max(0.1, fighter.baseAttackSpeed * (1 + fighter.attackSpeedBonus + timedBonus) * (1 - slow));
}

function addShield(target, amount, untilTick = Infinity) {
  const value = Math.max(0, Math.round(amount));
  if (!value) return;
  target.shields.push({ amount: value, untilTick });
  addCombatText(target, `+${value}盾`, "shield");
}

function refreshShield(target, amount, key, untilTick = Infinity) {
  const value = Math.max(0, Math.round(amount));
  if (!value) return;
  const existing = target.shields.find((shield) => shield.key === key && shield.untilTick > (state.combatFighters?.currentTick || 0));
  if (existing) {
    const gained = Math.max(0, value - existing.amount);
    existing.amount = Math.max(existing.amount, value);
    existing.untilTick = Math.max(existing.untilTick, untilTick);
    if (gained) addCombatText(target, `+${gained}盾`, "shield");
    return;
  }
  target.shields.push({ amount: value, untilTick, key });
  addCombatText(target, `+${value}盾`, "shield");
}

function applyUnpreventableHealthLoss(target, amount, fighters) {
  if (!target || target.hp <= 0) return 0;
  const loss = Math.min(target.hp, Math.max(0, Math.round(amount)));
  target.hp = Math.max(0, target.hp - loss);
  target.damageTaken += loss;
  if (loss) addCombatText(target, `-${loss}`, "damage", fighters);
  if (target.hp <= 0) handleDeath(target, fighters);
  return loss;
}

function applyHealing(healer, target, amount) {
  if (!target || target.hp <= 0) return 0;
  const rawHealing = Math.max(0, Math.round(amount));
  const effectiveHealing = Math.min(Math.max(0, target.maxHp - target.hp), rawHealing);
  target.hp = Math.min(target.maxHp, target.hp + rawHealing);
  if (healer) healer.healingDone += effectiveHealing;
  if (effectiveHealing > 0) addCombatText(target, `+${effectiveHealing}`, "healing");
  return effectiveHealing;
}

function addCombatText(target, text, type, fighters = state.combatFighters) {
  if (!target || !state.combatFighters || fighters !== state.combatFighters || !state.combatFighters.includes(target)) return;
  const createdTick = state.combatFighters.currentTick || 0;
  state.combatTexts.push({
    id: `${target.uid}-${createdTick}-${Math.random()}`,
    row: target.row,
    col: target.col,
    text,
    type,
    createdTick,
    expiresTick: createdTick + 6
  });
  state.combatTexts = state.combatTexts.slice(-36);
}

function handleDeath(target, fighters) {
  if (target.deathHandled) return;
  target.deathHandled = true;
  target.killRewards.forEach((reward) => {
    if (reward.untilTick >= fighters.currentTick) {
      const source = fighters.find((fighter) => fighter.uid === reward.sourceUid && fighter.hp > 0);
      if (source && (!reward.onceKey || !source[reward.onceKey])) {
        source.mana = Math.min(source.maxMana, source.mana + reward.mana);
        if (reward.onceKey) source[reward.onceKey] = true;
      }
    }
  });
  if (hasOrigin(target, "撸狗") && getSideTier(fighters, target.side === "player" ? "enemy" : "player", "刀斯林")) {
    const growth = balance.traits["刀斯林"].permanentGrowth;
    target.contributors.forEach((uid) => {
      const hunter = fighters.find((fighter) => fighter.uid === uid && fighter.hp > 0 && hasOrigin(fighter, "刀斯林"));
      if (!hunter || !hunter.sourceUnit) return;
      hunter.sourceUnit.permanentGrowth = (hunter.sourceUnit.permanentGrowth || 0) + growth;
      hunter.maxHp = Math.round(hunter.maxHp * (1 + growth));
      hunter.hp = Math.round(hunter.hp * (1 + growth));
      hunter.attack = Math.round(hunter.attack * (1 + growth));
      hunter.armor = Math.round(hunter.armor * (1 + growth));
      hunter.magicResist = Math.round(hunter.magicResist * (1 + growth));
      hunter.baseAttackSpeed *= 1 + growth;
      pushLog(`${hunter.name} 的刀斯林成长永久提高${Math.round(growth * 100)}%。`);
    });
  }
}

function applyDamage(attacker, target, amount, damageType = "physical", kind = "skill", fighters = null) {
  if (!target || target.hp <= 0) return 0;
  if (kind === "basic" && target.attackImmunity > 0) {
    target.attackImmunity -= 1;
    return 0;
  }
  let damage = Math.max(0, Number(amount) || 0);
  if (damageType === "physical") damage *= 100 / (100 + Math.max(-50, target.armor));
  else if (damageType === "magic") damage *= 100 / (100 + Math.max(-50, target.magicResist));
  const tick = fighters?.currentTick || 0;
  damage *= Math.max(0, 1 - statusValue(target, "damageReduction", tick));
  if (kind === "skill" && fighters) {
    const domain = fighters.find((unit) => {
      const status = unit.statuses.find((item) => item.type === "silentDomain" && item.untilTick > tick);
      return unit.side === target.side && unit.hp > 0 && status && distance(unit, attacker) <= (status.radius ?? balance.skills.jinglao.radius);
    });
    if (domain) damage *= Math.max(0, 1 - statusValue(domain, "silentDomain", tick));
  }
  let remaining = Math.max(0, Math.round(damage));
  let absorbed = 0;
  target.shields = target.shields.filter((shield) => shield.amount > 0 && shield.untilTick > tick).sort((a, b) => a.untilTick - b.untilTick);
  for (const shield of target.shields) {
    if (remaining <= 0) break;
    const blocked = Math.min(shield.amount, remaining);
    shield.amount -= blocked;
    remaining -= blocked;
    absorbed += blocked;
  }
  target.shields = target.shields.filter((shield) => shield.amount > 0 && shield.untilTick > tick);
  const hpDamage = Math.min(target.hp, remaining);
  target.hp = Math.max(0, target.hp - remaining);
  if (attacker) {
    attacker.damageDealt += hpDamage + absorbed;
    target.contributors.add(attacker.uid);
  }
  target.damageTaken += hpDamage + absorbed;
  if (hpDamage + absorbed > 0) {
    addCombatText(target, `-${hpDamage + absorbed}`, absorbed >= hpDamage + absorbed ? "shield-hit" : "damage", fighters);
  }
  if (attacker && hpDamage + absorbed > 0 && target.maxMana > 0 && kind !== "overtime") {
    target.mana = Math.min(target.maxMana, target.mana + balance.combat.manaOnDamageTaken);
  }
  const totalDamage = hpDamage + absorbed;
  if (attacker && totalDamage > 0) {
    if (attacker.omnivamp > 0 && attacker.hp > 0) applyHealing(attacker, attacker, totalDamage * attacker.omnivamp);
    if (attacker.damageShieldRatio > 0 && attacker.hp > 0) refreshShield(attacker, totalDamage * attacker.damageShieldRatio, "lushen");
    if (attacker.executeThreshold > 0 && ["basic", "basicSplash", "skill"].includes(kind) && target.hp > 0 && target.hp / target.maxHp <= attacker.executeThreshold) {
      const executeDamage = target.hp;
      target.hp = 0;
      target.damageTaken += executeDamage;
      attacker.damageDealt += executeDamage;
      addCombatText(target, "处决", "damage", fighters);
    }
  }
  if (target.hp <= 0 && fighters) handleDeath(target, fighters);
  return hpDamage + absorbed;
}

function nearestEnemy(fighter, fighters, tick = fighters.currentTick || 0) {
  const taunt = fighter.statuses.find((status) => status.type === "taunted" && status.untilTick > tick);
  if (taunt) {
    const source = fighters.find((item) => item.uid === taunt.targetUid && item.hp > 0);
    if (source) return source;
  }
  return fighters
    .filter((item) => item.side !== fighter.side && item.hp > 0)
    .sort((a, b) => distance(fighter, a) - distance(fighter, b))[0];
}

function occupiedCells(fighters, except = null) {
  return new Set(fighters.filter((item) => item.hp > 0 && item !== except).map((item) => `${item.row},${item.col}`));
}

function stepToward(fighter, target, occupied) {
  const startKey = `${fighter.row},${fighter.col}`;
  const visited = new Set([startKey]);
  const queue = [{ row: fighter.row, col: fighter.col, firstStep: null }];
  let fallback = null;
  while (queue.length) {
    const current = queue.shift();
    if (current.firstStep && distance(current, target) <= fighter.range) {
      [fighter.row, fighter.col] = current.firstStep;
      return true;
    }
    if (current.firstStep && (!fallback || distance(current, target) < fallback.distance)) {
      fallback = { step: current.firstStep, distance: distance(current, target) };
    }
    const directions = [
      [Math.sign(target.row - current.row), 0],
      [0, Math.sign(target.col - current.col)],
      [-Math.sign(target.row - current.row), 0],
      [0, -Math.sign(target.col - current.col)],
      [1, 0], [-1, 0], [0, 1], [0, -1]
    ].filter(([dr, dc]) => dr !== 0 || dc !== 0);
    directions.forEach(([dr, dc]) => {
      const row = current.row + dr;
      const col = current.col + dc;
      const key = `${row},${col}`;
      if (row < 0 || row >= 8 || col < 0 || col >= 8 || visited.has(key) || occupied.has(key)) return;
      visited.add(key);
      queue.push({
        row,
        col,
        firstStep: current.firstStep || [row, col]
      });
    });
  }
  if (fallback) {
    [fighter.row, fighter.col] = fallback.step;
    return true;
  }
  return false;
}

function adjacentOpenCell(target, fighters, preferredSide = null) {
  const occupied = occupiedCells(fighters);
  const candidates = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]
    .map(([dr, dc]) => [target.row + dr, target.col + dc])
    .filter(([row, col]) => row >= 0 && row < 8 && col >= 0 && col < 8 && !occupied.has(`${row},${col}`));
  if (!candidates.length) return null;
  if (preferredSide === "player") candidates.sort((a, b) => b[0] - a[0]);
  if (preferredSide === "enemy") candidates.sort((a, b) => a[0] - b[0]);
  return candidates[0];
}

function frontRowOpenCell(side, fighters) {
  const row = side === "player" ? 4 : 3;
  const occupied = occupiedCells(fighters);
  for (let col = 0; col < 8; col += 1) {
    if (!occupied.has(`${row},${col}`)) return [row, col];
  }
  return null;
}

function lineCells(from, to) {
  const cells = [];
  let x0 = from.col; let y0 = from.row;
  const x1 = to.col; const y1 = to.row;
  const dx = Math.abs(x1 - x0); const sx = x0 < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y0); const sy = y0 < y1 ? 1 : -1;
  let error = dx + dy;
  while (true) {
    cells.push(`${y0},${x0}`);
    if (x0 === x1 && y0 === y1) break;
    const twice = 2 * error;
    if (twice >= dy) { error += dy; x0 += sx; }
    if (twice <= dx) { error += dx; y0 += sy; }
  }
  return new Set(cells);
}

function createSummon(summoner, type, fighters, index = 0) {
  const cell = adjacentOpenCell(summoner, fighters, summoner.side);
  if (!cell) return null;
  const fan = balance.traits["管人Fan"];
  const pet = balance.traits["洛克大王"];
  const chick = balance.skills.muji;
  const base = {
    vtb: { name: "VTB", hp: fan.summonHealth, attack: 0, attackSpeed: 0, armor: fan.summonArmor, magicResist: fan.summonMagicResist, range: 0, role: "治疗召唤物" },
    pet: { name: "宠物", hp: summoner.maxHp * pet.inheritHealth, attack: summoner.attack * pet.inheritAttack, attackSpeed: pet.attackSpeed, armor: summoner.armor * pet.inheritDefense, magicResist: summoner.magicResist * pet.inheritDefense, range: 1, role: "战斗召唤物" },
    chick: { name: "小鸡", hp: summoner.maxHp * chick.inheritHealth, attack: summoner.attack * chick.inheritAttack, attackSpeed: chick.summonAttackSpeed, armor: chick.summonArmor, magicResist: chick.summonMagicResist, range: 1, role: "嘲讽召唤物" }
  }[type];
  const maxHp = Math.max(1, Math.round(base.hp));
  const summon = {
    uid: `${summoner.uid}-${type}-${index}-${Math.random()}`,
    baseId: `summon-${type}`,
    name: base.name,
    cost: 0,
    origins: [],
    origin: "召唤物",
    role: base.role,
    range: base.range,
    skill: "",
    skillDescription: "",
    star: summoner.star,
    stats: { health: maxHp, attack: base.attack, attackSpeed: base.attackSpeed, armor: base.armor, magicResist: base.magicResist, mana: 0 },
    side: summoner.side,
    row: cell[0], col: cell[1], hp: maxHp, maxHp,
    attack: Math.round(base.attack), armor: Math.round(base.armor), magicResist: Math.round(base.magicResist),
    baseAttackSpeed: base.attackSpeed, attackSpeedBonus: 0, mana: 0, maxMana: 0, cooldown: 0,
    statuses: [], shields: [], contributors: new Set(), killRewards: [], effectTimers: {}, deathHandled: false,
    attackImmunity: 0, countsForVictory: false, summon: true, summonType: type,
    damageDealt: 0, damageTaken: 0, healingDone: 0
  };
  fighters.push(summon);
  return summon;
}

function prepareBattleFighters(fighters) {
  fighters.events = [];
  fighters.currentTick = 0;
  fighters.traitTiers = { player: {}, enemy: {} };
  const counts = { player: traitCountsForSide(fighters, "player"), enemy: traitCountsForSide(fighters, "enemy") };
  ["player", "enemy"].forEach((side) => {
    Object.keys(traitRules).forEach((name) => { fighters.traitTiers[side][name] = tierForCount(name, counts[side][name] || 0); });
  });
  ["player", "enemy"].forEach((side) => {
    const opposite = side === "player" ? "enemy" : "player";
    const cooldog = fighters.traitTiers[opposite]["酷狗"];
    if (cooldog && balance.traits["酷狗"].disableRiceGuard && fighters.traitTiers[side]["米卫兵"]) fighters.traitTiers[side]["米卫兵"] = null;
  });
  ["player", "enemy"].forEach((side) => {
    const allies = fighters.filter((fighter) => fighter.side === side && fighter.hp > 0);
    const rice = getSideTier(fighters, side, "米卫兵");
    if (rice) {
      const { config, index } = balanceTier("米卫兵", rice);
      const base = config.teamResist[index];
      allies.forEach((fighter) => {
        const amount = hasOrigin(fighter, "米卫兵") ? base * config.memberMultiplier[index] : base;
        fighter.armor += amount; fighter.magicResist += amount;
      });
    }
    const ownCooldog = getSideTier(fighters, side, "酷狗");
    const cooldogConfig = balance.traits["酷狗"];
    const riceConfig = balance.traits["米卫兵"];
    if (ownCooldog?.count >= cooldogConfig.counts[1] && (counts[side === "player" ? "enemy" : "player"]["米卫兵"] || 0) >= riceConfig.counts[0]) {
      const amount = balance.traits["酷狗"].counterResist;
      allies.forEach((fighter) => { fighter.armor += amount; fighter.magicResist += amount; });
    }
    const dog = getSideTier(fighters, side, "撸狗");
    if (dog) {
      const { config, index } = balanceTier("撸狗", dog);
      allies.forEach((fighter) => {
        fighter.attackSpeedBonus += config.teamAttackSpeed[index];
        if (hasOrigin(fighter, "撸狗")) fighter.attackSpeedBonus += config.memberExtraAttackSpeed[index];
      });
    }
    const anime = getSideTier(fighters, side, "二次元");
    if (anime) {
      const { config, index } = balanceTier("二次元", anime);
      allies.forEach((fighter) => multiplyHealth(fighter, 1 + config.teamHealth[index] + (hasOrigin(fighter, "二次元") ? config.memberExtraHealth[index] : 0)));
    }
    if (getSideTier(fighters, side, "TCG老板")) {
      const config = balance.traits["TCG老板"];
      allies.forEach((fighter) => { multiplyHealth(fighter, 1 + config.teamHealth); fighter.attackSpeedBonus += config.teamAttackSpeed; });
    }
    const akarin = getSideTier(fighters, side, "阿卡林");
    if (akarin) {
      const { config, index } = balanceTier("阿卡林", akarin);
      allies.filter((fighter) => hasOrigin(fighter, "阿卡林")).forEach((fighter) => { fighter.attackImmunity = config.attackImmunity[index]; });
    }
    if (getSideTier(fighters, side, "打卡王")) {
      const config = balance.traits["打卡王"];
      const activeTraitCount = Object.values(fighters.traitTiers[side]).filter(Boolean).length - (config.includeSelfTrait ? 0 : 1);
      const bonus = activeTraitCount * config.bonusPerActiveTrait;
      allies.filter((fighter) => hasOrigin(fighter, "打卡王")).forEach((fighter) => {
        multiplyHealth(fighter, 1 + bonus);
        fighter.attack = Math.round(fighter.attack * (1 + bonus));
        fighter.armor = Math.round(fighter.armor * (1 + bonus));
        fighter.magicResist = Math.round(fighter.magicResist * (1 + bonus));
        fighter.baseAttackSpeed *= 1 + bonus;
      });
    }
    if (getSideTier(fighters, side, "撸神")) {
      const config = balance.traits["撸神"];
      const dogCount = allies.filter((fighter) => fighter.countsForVictory && hasOrigin(fighter, "撸狗")).length;
      allies.filter((fighter) => hasOrigin(fighter, "撸神")).forEach((fighter) => {
        fighter.omnivamp += dogCount * config.omnivampPerDog;
        fighter.damageShieldRatio += dogCount * config.shieldRatioPerDog;
      });
    }
    if (getSideTier(fighters, side, "卷王")) {
      const config = balance.traits["卷王"];
      allies.forEach((fighter) => { fighter.omnivamp += config.teamOmnivamp; });
    }
    const reviewer = getSideTier(fighters, side, "测评师");
    if (reviewer) {
      const { config, index } = balanceTier("测评师", reviewer);
      allies.filter((fighter) => hasOrigin(fighter, "测评师")).forEach((fighter) => { fighter.executeThreshold = config.executeThreshold[index]; });
    }
    const weird = getSideTier(fighters, side, "你XP好怪啊");
    if (weird) fighters.filter((fighter) => fighter.side !== side).forEach((fighter) => addStatus(fighter, "stun", ticksFor(balance.traits["你XP好怪啊"].stunDuration)));
    if (getSideTier(fighters, side, "管人Fan")) {
      const summoner = allies.find((fighter) => hasOrigin(fighter, "管人Fan"));
      if (summoner) createSummon(summoner, "vtb", fighters);
    }
    if (getSideTier(fighters, side, "洛克大王")) {
      const summoner = allies.find((fighter) => hasOrigin(fighter, "洛克大王"));
      if (summoner) for (let i = 0; i < balance.traits["洛克大王"].summonCount; i += 1) createSummon(summoner, "pet", fighters, i);
    }
  });
  return fighters;
}

function processTimedEffects(fighters, tick) {
  fighters.currentTick = tick;
  if (fighters === state.combatFighters) state.combatTexts = state.combatTexts.filter((item) => item.expiresTick > tick);
  fighters.forEach((fighter) => {
    fighter.statuses = fighter.statuses.filter((status) => status.untilTick > tick);
    fighter.shields = fighter.shields.filter((shield) => shield.amount > 0 && shield.untilTick > tick);
    if (fighter.hp <= 0) return;
    if (hasStatus(fighter, "channel", tick) && isHardControlled(fighter, tick)) fighter.channelCancelled = true;
    const faith = getSideTier(fighters, fighter.side, "欧派教徒");
    const faithConfig = balance.traits["欧派教徒"];
    if (faith && hasOrigin(fighter, "欧派教徒") && !fighter.faithTriggered && fighter.hp / fighter.maxHp < faithConfig.triggerHealth) {
      fighter.faithTriggered = true;
      const index = faithConfig.counts.indexOf(faith.count);
      const total = fighter.maxHp * faithConfig.restoreHealth[index];
      const steps = Math.max(1, Math.round(faithConfig.duration));
      for (let step = 1; step <= steps; step += 1) fighters.events.push({ tick: tick + ticksFor(step), type: "heal", sourceUid: fighter.uid, targetUid: fighter.uid, amount: total / steps });
    }
  });
  const workInterval = balance.traits["996"].interval;
  if (tick > 0 && tick % ticksFor(workInterval) === 0) {
    ["player", "enemy"].forEach((side) => {
      const workTier = getSideTier(fighters, side, "996");
      if (!workTier) return;
      const { config, index } = balanceTier("996", workTier);
      fighters.filter((fighter) => fighter.side === side && fighter.hp > 0 && hasOrigin(fighter, "996")).forEach((fighter) => {
        applyUnpreventableHealthLoss(fighter, config.healthLoss[index], fighters);
        if (fighter.hp <= 0) return;
        fighter.attack += config.attackGain[index];
        fighter.armor += config.resistGain[index];
        fighter.magicResist += config.resistGain[index];
      });
    });
  }
  const electricInterval = balance.traits["我早已麻痹"].interval;
  if (tick % ticksFor(electricInterval) === 0) {
    ["player", "enemy"].forEach((side) => {
      const electric = getSideTier(fighters, side, "我早已麻痹");
      if (electric) {
        const { config, index } = balanceTier("我早已麻痹", electric);
        const radius = config.radius[index];
        const damage = config.damage[index];
        fighters.filter((fighter) => fighter.side === side && fighter.hp > 0 && hasOrigin(fighter, "我早已麻痹")).forEach((source) => {
          fighters.filter((target) => target.side !== side && target.hp > 0 && distance(source, target) <= radius).forEach((target) => applyDamage(source, target, damage, "magic", "trait", fighters));
        });
      }
    });
  }
  const fanConfig = balance.traits["管人Fan"];
  if (tick % ticksFor(fanConfig.healInterval) === 0) {
    fighters.filter((fighter) => fighter.hp > 0 && fighter.summonType === "vtb").forEach((vtb) => {
      fighters.filter((ally) => ally.side === vtb.side && ally.hp > 0 && distance(vtb, ally) <= fanConfig.healRadius).forEach((ally) => applyHealing(vtb, ally, fanConfig.heal));
    });
  }
  const due = fighters.events.filter((event) => event.tick <= tick);
  fighters.events = fighters.events.filter((event) => event.tick > tick);
  due.forEach((event) => {
    const source = fighters.find((fighter) => fighter.uid === event.sourceUid);
    const target = fighters.find((fighter) => fighter.uid === event.targetUid);
    if (event.type === "heal" && source?.hp > 0 && target?.hp > 0) applyHealing(source, target, event.amount);
    if (event.type === "channelHeal" && source?.hp > 0 && !source.channelCancelled) fighters.filter((ally) => ally.side === source.side && ally.hp > 0).forEach((ally) => applyHealing(source, ally, event.amount));
    if (event.type === "explode" && source) {
      const center = target?.hp > 0 ? target : event.center;
      fighters.filter((enemy) => enemy.side !== source.side && enemy.hp > 0 && distance(enemy, center) <= balance.skills.gmj.explosionRadius).forEach((enemy) => applyDamage(source, enemy, event.amount, "magic", "skill", fighters));
    }
  });
}

function processOvertime(fighters, tick) {
  if (tick < BATTLE_OVERTIME_START) return;
  const interval = ticksFor(1);
  if ((tick - BATTLE_OVERTIME_START) % interval !== 0) return;
  const overtimeSecond = Math.floor((tick - BATTLE_OVERTIME_START) / interval);
  const damageRatio = Math.min(0.25, 0.04 + overtimeSecond * 0.025);
  if (overtimeSecond === 0) pushLog("战斗进入加时，所有单位将承受不断增强的真实伤害。");
  fighters.filter((fighter) => fighter.hp > 0).forEach((fighter) => {
    applyDamage(null, fighter, fighter.maxHp * damageRatio, "true", "overtime", fighters);
  });
}

function castSkill(fighter, fighters, tick, preferredTarget = null) {
  const enemies = fighters.filter((item) => item.side !== fighter.side && item.hp > 0);
  const allies = fighters.filter((item) => item.side === fighter.side && item.hp > 0);
  if (!enemies.length || hasStatus(fighter, "silence", tick)) return false;
  const target = preferredTarget?.hp > 0 ? preferredTarget : nearestEnemy(fighter, fighters, tick);
  fighter.mana = 0;
  const skill = balance.skills[fighter.baseId];
  const logCast = () => pushLog(`${fighter.name} 释放 ${fighter.skill}。`);
  switch (fighter.baseId) {
    case "tuantuan": {
      const ally = [...allies].sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
      applyHealing(fighter, ally, starValue(fighter, skill.heal));
      addShield(ally, starValue(fighter, skill.shield), tick + ticksFor(skill.shieldDuration));
      break;
    }
    case "jd": for (let i = 0; i < skill.hitCount && target.hp > 0; i += 1) applyDamage(fighter, target, starValue(fighter, skill.damage), "physical", "skill", fighters); break;
    case "madao": enemies.filter((enemy) => distance(target, enemy) <= skill.targetRadius && distance(fighter, enemy) <= skill.castRange).forEach((enemy) => applyDamage(fighter, enemy, starValue(fighter, skill.damage), "physical", "skill", fighters)); break;
    case "jianlao": {
      const until = tick + ticksFor(skill.duration);
      addStatus(fighter, "sealed", until);
      addStatus(fighter, "damageReduction", until, starValue(fighter, skill.damageReduction));
      enemies.filter((enemy) => distance(fighter, enemy) <= skill.tauntRadius).forEach((enemy) => addStatus(enemy, "taunted", until, 0, { targetUid: fighter.uid }));
      break;
    }
    case "ccg": applyDamage(fighter, enemies[Math.floor(Math.random() * enemies.length)], starValue(fighter, skill.damage), "magic", "skill", fighters); break;
    case "aki": {
      const backline = [...enemies].sort((a, b) => distance(fighter, b) - distance(fighter, a))[0];
      const cell = adjacentOpenCell(backline, fighters, fighter.side); if (cell) [fighter.row, fighter.col] = cell;
      const before = backline.hp;
      applyDamage(fighter, backline, starValue(fighter, skill.damage), "physical", "skill", fighters);
      if (before > 0 && backline.hp <= 0) fighter.mana = Math.min(fighter.maxMana, fighter.mana + skill.killMana);
      break;
    }
    case "yuo": allies.filter((ally) => distance(fighter, ally) <= skill.radius).forEach((ally) => addStatus(ally, "attackSpeedBuff", tick + ticksFor(skill.duration), starValue(fighter, skill.attackSpeed))); break;
    case "yin": enemies.filter((enemy) => enemy.col === target.col).forEach((enemy) => { applyDamage(fighter, enemy, starValue(fighter, skill.damage), "magic", "skill", fighters); addStatus(enemy, "attackSpeedSlow", tick + ticksFor(skill.duration), skill.slow); addStatus(enemy, "moveSlow", tick + ticksFor(skill.duration), skill.slow); }); break;
    case "dage": addShield(fighter, starValue(fighter, skill.shield) * (fighter.hp / fighter.maxHp < skill.lowHealthThreshold ? skill.lowHealthMultiplier : 1)); break;
    case "qianhan": applyDamage(fighter, target, starValue(fighter, skill.damage), "physical", "skill", fighters); addStatus(target, "freeze", tick + ticksFor(starValue(fighter, skill.freezeDuration))); break;
    case "shuangye": {
      const low = [...enemies].sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
      const cell = adjacentOpenCell(low, fighters, fighter.side); if (cell) [fighter.row, fighter.col] = cell;
      applyDamage(fighter, low, starValue(fighter, skill.damage), "physical", "skill", fighters);
      addStatus(low, "silence", tick + ticksFor(skill.silenceDuration));
      break;
    }
    case "jinglao": addStatus(fighter, "silentDomain", tick + ticksFor(skill.duration), starValue(fighter, skill.damageReduction), { radius: skill.radius }); break;
    case "kobayashi": {
      addStatus(fighter, "channel", tick + ticksFor(skill.duration)); fighter.channelCancelled = false;
      for (let elapsed = skill.interval; elapsed <= skill.duration; elapsed += skill.interval) fighters.events.push({ tick: tick + ticksFor(elapsed), type: "channelHeal", sourceUid: fighter.uid, amount: starValue(fighter, skill.healPerTick) });
      break;
    }
    case "nnm": {
      const farthest = [...enemies].sort((a, b) => distance(fighter, b) - distance(fighter, a))[0];
      const cells = lineCells(fighter, farthest);
      enemies.filter((enemy) => cells.has(`${enemy.row},${enemy.col}`)).forEach((enemy) => applyDamage(fighter, enemy, starValue(fighter, skill.damage), "physical", "skill", fighters));
      break;
    }
    case "wjj": {
      const dense = [...enemies].sort((a, b) => enemies.filter((enemy) => distance(b, enemy) <= skill.targetSearchRadius).length - enemies.filter((enemy) => distance(a, enemy) <= skill.targetSearchRadius).length)[0];
      const cells = lineCells(fighter, dense);
      enemies.filter((enemy) => cells.has(`${enemy.row},${enemy.col}`)).forEach((enemy) => {
        applyDamage(fighter, enemy, starValue(fighter, skill.damage), "physical", "skill", fighters);
        const row = enemy.row + Math.sign(enemy.row - fighter.row) * skill.knockbackDistance; const col = enemy.col + Math.sign(enemy.col - fighter.col) * skill.knockbackDistance;
        if (row >= 0 && row < 8 && col >= 0 && col < 8 && !occupiedCells(fighters, enemy).has(`${row},${col}`)) [enemy.row, enemy.col] = [row, col];
      });
      const cell = adjacentOpenCell(dense, fighters, fighter.side); if (cell) [fighter.row, fighter.col] = cell;
      allies.filter((ally) => distance(fighter, ally) <= skill.shieldRadius).forEach((ally) => addShield(ally, starValue(fighter, skill.shield)));
      break;
    }
    case "alao": {
      const damage = starValue(fighter, skill.damage);
      applyDamage(fighter, target, damage, "magic", "skill", fighters);
      [...enemies].filter((enemy) => enemy !== target).sort((a, b) => distance(target, a) - distance(target, b)).slice(0, starValue(fighter, skill.bounceTargets)).forEach((enemy) => applyDamage(fighter, enemy, damage * skill.bounceRatio, "magic", "skill", fighters));
      break;
    }
    case "muji": {
      const count = starValue(fighter, skill.summonCount);
      for (let i = 0; i < count; i += 1) { const chick = createSummon(fighter, "chick", fighters, i); if (chick) enemies.filter((enemy) => distance(chick, enemy) <= skill.tauntRadius).forEach((enemy) => addStatus(enemy, "taunted", tick + ticksFor(skill.tauntDuration), 0, { targetUid: chick.uid })); }
      break;
    }
    case "xiyangyang": {
      const candidates = [...enemies].sort((a, b) => distance(fighter, b) - distance(fighter, a)).slice(0, skill.maxTargets);
      candidates.forEach((enemy) => { enemy.killRewards.push({ sourceUid: fighter.uid, mana: skill.killMana, untilTick: tick + ticksFor(skill.rewardWindow), onceKey: `xiyangReward${tick}` }); applyDamage(fighter, enemy, starValue(fighter, skill.damage), "physical", "skill", fighters); });
      const cell = adjacentOpenCell(candidates[candidates.length - 1], fighters, fighter.side); if (cell) [fighter.row, fighter.col] = cell;
      break;
    }
    case "gmj": {
      const shuffled = [...enemies].sort(() => Math.random() - 0.5).slice(0, starValue(fighter, skill.targetCount));
      shuffled.forEach((enemy) => fighters.events.push({ tick: tick + ticksFor(skill.delay), type: "explode", sourceUid: fighter.uid, targetUid: enemy.uid, center: { row: enemy.row, col: enemy.col }, amount: starValue(fighter, skill.damage) }));
      break;
    }
    case "lin": addStatus(fighter, "transformed", tick + ticksFor(skill.duration), starValue(fighter, skill.attackSpeed), { omnivamp: skill.omnivamp, splashRatio: skill.splashRatio, splashRadius: skill.splashRadius }); break;
    case "ljl": {
      const rearEnemies = enemies.filter((enemy) => enemy.side === "enemy" ? enemy.row <= 1 : enemy.row >= 6);
      const candidates = rearEnemies.length ? rearEnemies : enemies;
      const low = [...candidates].sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
      const cell = adjacentOpenCell(low, fighters, fighter.side); if (cell) [fighter.row, fighter.col] = cell;
      const multiplier = Math.random() < skill.critChance ? skill.critMultiplier : 1;
      applyDamage(fighter, low, starValue(fighter, skill.damage) * multiplier, "magic", "skill", fighters);
      break;
    }
    case "wty": addStatus(fighter, "attackSpeedBuff", tick + ticksFor(skill.duration), starValue(fighter, skill.attackSpeed)); break;
    case "ding": {
      const farthest = [...enemies].sort((a, b) => distance(fighter, b) - distance(fighter, a))[0];
      const cell = frontRowOpenCell(fighter.side, fighters);
      if (cell) [farthest.row, farthest.col] = cell;
      applyDamage(fighter, farthest, starValue(fighter, skill.damage), "magic", "skill", fighters);
      break;
    }
    case "zijian": {
      let totalDamage = 0;
      enemies.filter((enemy) => distance(fighter, enemy) <= skill.radius).forEach((enemy) => {
        totalDamage += applyDamage(fighter, enemy, starValue(fighter, skill.damage), "magic", "skill", fighters);
      });
      applyHealing(fighter, fighter, totalDamage * skill.healingRatio);
      break;
    }
    case "szx": {
      let totalDamage = 0;
      enemies.filter((enemy) => distance(fighter, enemy) <= skill.radius).forEach((enemy) => {
        totalDamage += applyDamage(fighter, enemy, starValue(fighter, skill.damage), "true", "skill", fighters);
      });
      allies.filter((ally) => ally !== fighter && distance(fighter, ally) <= skill.radius).forEach((ally) => {
        addShield(ally, totalDamage, tick + ticksFor(skill.shieldDuration));
      });
      break;
    }
    case "weige": {
      const cells = lineCells(fighter, target);
      const hitEnemies = enemies.filter((enemy) => cells.has(`${enemy.row},${enemy.col}`));
      const multiplier = 1 + Math.max(0, hitEnemies.length - 1) * skill.damagePerExtraTarget;
      hitEnemies.forEach((enemy) => applyDamage(fighter, enemy, starValue(fighter, skill.damage) * multiplier, "magic", "skill", fighters));
      break;
    }
    default: applyDamage(fighter, target, fighter.attack * 2, "magic", "skill", fighters);
  }
  logCast();
  return true;
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms / state.battleSpeed));
}

function toggleBattleSpeed() {
  if (state.gameOver) return;
  const speeds = [0.5, 1, 2];
  const current = speeds.indexOf(state.battleSpeed);
  state.battleSpeed = speeds[(current + 1) % speeds.length];
  render();
}

function createFighters() {
  return prepareBattleFighters([
    ...state.board.map((unit, index) => (unit ? toFighter(unit, "player", index) : null)).filter(Boolean),
    ...state.enemy.map((unit, index) => (unit ? toFighter(unit, "enemy", index) : null)).filter(Boolean)
  ]);
}

function captureBattleStats(fighters, result) {
  const playerFighters = fighters.filter((fighter) => fighter.side === "player");
  state.matchStats.battles += 1;
  state.matchStats[result === "win" ? "wins" : "losses"] += 1;
  state.matchStats.damageDealt += Math.round(playerFighters.reduce((sum, fighter) => sum + fighter.damageDealt, 0));
  state.matchStats.damageTaken += Math.round(playerFighters.reduce((sum, fighter) => sum + fighter.damageTaken, 0));
  state.matchStats.healingDone += Math.round(playerFighters.reduce((sum, fighter) => sum + fighter.healingDone, 0));
  state.battleStats = {
    round: state.round,
    opponent: currentOpponent()?.name || "未知对手",
    result,
    rows: fighters.map((fighter) => ({
      uid: fighter.uid,
      name: fighter.name,
      star: fighter.star,
      side: fighter.side,
      damageDealt: Math.round(fighter.damageDealt),
      damageTaken: Math.round(fighter.damageTaken),
      healingDone: Math.round(fighter.healingDone)
    }))
  };
}

function resolveBattle(fighters) {
  const playerSurvivors = activeCoreUnits(fighters, "player");
  const enemySurvivors = activeCoreUnits(fighters, "enemy");
  const opponent = currentOpponent();
  const reward = 4 + Math.floor(state.round / 3);
  if (playerSurvivors.length >= enemySurvivors.length) {
    const extraGold = traitWinGold(fighters, "player");
    const escapeGold = traitOutcomeGold(fighters, "player", "win");
    state.gold += reward + extraGold + escapeGold;
    const damage = survivorDamage(playerSurvivors);
    if (opponent) {
      opponent.hp = Math.max(0, opponent.hp - damage);
      opponent.gold = Math.max(0, opponent.gold + 2 + traitOutcomeGold(fighters, "enemy", "loss"));
      opponent.losses += 1;
      eliminateAi(opponent);
    }
    pushLog(`战斗胜利，对 ${opponent?.name || "对手"} 造成 ${damage} 点伤害，获得 ${reward + extraGold + escapeGold} 金${extraGold ? `（现充额外${extraGold}）` : ""}${escapeGold ? `（逃离塔科夫${escapeGold > 0 ? "+" : ""}${escapeGold}）` : ""}。`);
    return "win";
  } else {
    const damage = survivorDamage(enemySurvivors);
    state.hp = Math.max(0, state.hp - damage);
    const escapeGold = traitOutcomeGold(fighters, "player", "loss");
    state.gold = Math.max(0, state.gold + 2 + escapeGold);
    if (opponent) {
      opponent.gold += reward + traitWinGold(fighters, "enemy") + traitOutcomeGold(fighters, "enemy", "win");
      opponent.wins += 1;
    }
    pushLog(`战斗失败，${opponent?.name || "对手"} 对你造成 ${damage} 点伤害，结算 ${Math.max(0, 2 + escapeGold)} 金${escapeGold < 0 ? `（逃离塔科夫${escapeGold}）` : ""}。`);
    return "loss";
  }
}

function battleStep(fighters, tick) {
  processTimedEffects(fighters, tick);
  processOvertime(fighters, tick);
  let actionTaken = false;
  const actingOrder = fighters.filter((item) => item.hp > 0).sort((a, b) => effectiveAttackSpeed(b, tick) - effectiveAttackSpeed(a, tick));
  actingOrder.forEach((fighter) => {
    if (fighter.hp <= 0 || fighter.summonType === "vtb") return;
    if (fighter.cooldown > 0) fighter.cooldown -= 1;
    if (isHardControlled(fighter, tick) || hasStatus(fighter, "channel", tick)) return;
    let target = nearestEnemy(fighter, fighters, tick);
    if (!target) return;
    if (fighter.maxMana > 0 && fighter.mana >= fighter.maxMana && !hasStatus(fighter, "silence", tick)) {
      castSkill(fighter, fighters, tick, target);
      state.combatFx = { attacker: fighter.uid, target: target.uid, kind: "skill" };
      actionTaken = true;
      target = nearestEnemy(fighter, fighters, tick);
      if (!target) return;
    }
    if (distance(fighter, target) <= fighter.range) {
      if (fighter.cooldown > 0) return;
      const dealt = applyDamage(fighter, target, fighter.attack, "physical", "basic", fighters);
      fighter.mana = Math.min(fighter.maxMana, fighter.mana + balance.combat.manaOnAttack);
      const transformed = fighter.statuses.find((status) => status.type === "transformed" && status.untilTick > tick);
      let totalDealt = dealt;
      if (transformed) {
        fighters.filter((enemy) => enemy.side !== fighter.side && enemy.hp > 0 && enemy !== target && distance(target, enemy) <= transformed.splashRadius).forEach((enemy) => { totalDealt += applyDamage(fighter, enemy, fighter.attack * transformed.splashRatio, "physical", "basicSplash", fighters); });
        applyHealing(fighter, fighter, totalDealt * (transformed.omnivamp ?? balance.skills.lin.omnivamp));
      }
      fighter.cooldown = Math.max(1, Math.round(4 / effectiveAttackSpeed(fighter, tick)));
      state.combatFx = { attacker: fighter.uid, target: target.uid, kind: "basic" };
      actionTaken = true;
      if (fighter.mana >= fighter.maxMana && fighter.maxMana > 0 && !hasStatus(fighter, "silence", tick)) castSkill(fighter, fighters, tick, target);
    } else {
      if (hasStatus(fighter, "moveSlow", tick)) {
        fighter.moveProgress = (fighter.moveProgress || 0) + Math.max(0.05, 1 - statusValue(fighter, "moveSlow", tick));
        if (fighter.moveProgress < 1) return;
        fighter.moveProgress -= 1;
      }
      stepToward(fighter, target, occupiedCells(fighters, fighter));
      state.combatFx = { attacker: fighter.uid, target: null, kind: "move" };
      actionTaken = true;
    }
  });
  return actionTaken;
}

async function playBattle() {
  const fighters = createFighters();
  state.combatFighters = fighters;
  state.combatTexts = [];
  state.battleIntro = true;
  pushLog("战斗开始。");
  render();
  await sleep(720);
  state.battleIntro = false;

  for (let tick = 0; tick < BATTLE_MAX_TICKS; tick += 1) {
    battleStep(fighters, tick);
    state.combatFighters = fighters;
    render();
    await sleep(180);
    state.combatFx = null;
    const playerAlive = activeCoreUnits(fighters, "player").length > 0;
    const enemyAlive = activeCoreUnits(fighters, "enemy").length > 0;
    if (!playerAlive || !enemyAlive) break;
  }

  const result = resolveBattle(fighters);
  captureBattleStats(fighters, result);
  resolveBackgroundMatch();
  state.battleResolved = true;
  render();
  await sleep(700);
  state.combatFx = null;
  state.phase = "prepare";
  const aliveAi = state.aiPlayers.filter((ai) => !ai.eliminated);
  let finalOutcome = null;
  let finalDetail = "";
  if (state.hp <= 0) finalOutcome = "defeat";
  else if (!aliveAi.length) {
    finalOutcome = "victory";
    finalDetail = "三家 AI 已全部出局。牌桌归你，家族传说开始流传。";
  } else if (state.round >= finalRound) {
    const bestAi = [...aliveAi].sort((a, b) => b.hp - a.hp)[0];
    if (state.hp >= bestAi.hp) {
      finalOutcome = "victory";
      finalDetail = `25 回合决胜结束，你以 ${state.hp} 点生命位列第一。`;
    } else {
      finalOutcome = "defeat";
      finalDetail = `25 回合决胜结束，${bestAi.name} 以 ${bestAi.hp} 点生命夺得第一。`;
    }
  }
  if (finalOutcome === "victory") {
    // 保留最终战 fighters，让结算层背后的棋盘停留在胜利瞬间。
    endGame("victory", finalDetail);
  } else {
    state.combatFighters = null;
    state.enemy = Array(32).fill(null);
    if (finalOutcome === "defeat") endGame("defeat", finalDetail);
  }
  render();
}

function savePvpReturnState() {
  return {
    round: state.round, hp: state.hp, gold: state.gold, level: state.level, xp: state.xp,
    phase: state.phase, battleResolved: state.battleResolved, gameOver: state.gameOver,
    board: state.board, bench: state.bench, enemy: state.enemy, selected: state.selected,
    combatFighters: state.combatFighters, combatFx: state.combatFx, combatTexts: state.combatTexts,
    battleIntro: state.battleIntro, battleStats: state.battleStats,
    currentOpponentId: state.currentOpponentId, log: state.log
  };
}

function restoreAfterPvp() {
  if (!state.pvpReturnState) return;
  Object.assign(state, state.pvpReturnState);
  state.pvpReturnState = null;
  state.pvpBattleActive = false;
  render();
}

function pvpBattleScore(fighters, side) {
  const survivors = activeCoreUnits(fighters, side);
  return survivors.length * 100000 + survivors.reduce((sum, unit) => sum + unit.hp / unit.maxHp, 0);
}

async function playPvpChallenge() {
  const own = savedPvpLineup();
  const opponent = state.pvpOpponent;
  if (!own || !opponent || state.pvpBattleActive) return;
  state.pvpReturnState = savePvpReturnState();
  state.pvpBattleActive = true;
  state.pvpLastResult = null;
  els.pvpModal.classList.remove("visible");
  state.round = 0;
  state.hp = 100;
  state.gold = 0;
  state.level = own.snapshot.l;
  state.xp = 0;
  state.phase = "combat";
  state.battleResolved = false;
  state.gameOver = false;
  state.board = boardFromPvpSnapshot(own.snapshot);
  state.bench = Array(8).fill(null);
  state.enemy = Array(32).fill(null);
  const enemyBoard = boardFromPvpSnapshot(opponent.snapshot);
  enemyBoard.forEach((unit, position) => { if (unit) state.enemy[mirrorBoardIndex(position)] = unit; });
  state.selected = null;
  state.combatFx = null;
  state.combatTexts = [];
  state.battleIntro = false;
  state.battleStats = null;
  state.log = [`异步 PvP：${own.snapshot.p} 挑战 ${opponent.snapshot.p}。`];
  const fighters = createFighters();
  state.combatFighters = fighters;
  state.battleIntro = true;
  render();
  await sleep(720);
  state.battleIntro = false;

  for (let tick = 0; tick < BATTLE_MAX_TICKS; tick += 1) {
    battleStep(fighters, tick);
    state.combatFighters = fighters;
    render();
    await sleep(180);
    state.combatFx = null;
    if (!activeCoreUnits(fighters, "player").length || !activeCoreUnits(fighters, "enemy").length) break;
  }

  const result = pvpBattleScore(fighters, "player") >= pvpBattleScore(fighters, "enemy") ? "win" : "loss";
  const playerRows = fighters.filter((fighter) => fighter.side === "player");
  const totalDamage = Math.round(playerRows.reduce((sum, fighter) => sum + fighter.damageDealt, 0));
  state.battleStats = {
    round: "PvP",
    opponent: opponent.snapshot.p,
    result,
    rows: fighters.map((fighter) => ({ uid: fighter.uid, name: fighter.name, star: fighter.star, side: fighter.side, damageDealt: Math.round(fighter.damageDealt), damageTaken: Math.round(fighter.damageTaken), healingDone: Math.round(fighter.healingDone) }))
  };
  updatePvpOpponentStats(opponent.snapshotId, opponent.snapshot, { battles: 1, [result === "win" ? "wins" : "losses"]: 1 });
  state.pvpLastResult = { result, opponent: opponent.snapshot.p, damage: totalDamage };
  state.phase = "pvp-result";
  state.battleResolved = true;
  state.pvpBattleActive = false;
  state.combatFx = null;
  state.log.unshift(result === "win" ? `挑战胜利：击败 ${opponent.snapshot.p}。` : `挑战失败：未能击败 ${opponent.snapshot.p}。`);
  render();
  renderPvpLobby();
  els.pvpModal.classList.add("visible");
}

function startBattle() {
  if (state.gameOver || state.phase === "combat" || state.battleResolved) return;
  autoFillBoardFromBench();
  if (!state.board.some(Boolean)) return;
  state.phase = "combat";
  state.selected = null;
  state.battleStats = null;
  const opponent = chooseHumanOpponent();
  if (!opponent) {
    endGame("victory");
    render();
    return;
  }
  render();
  playBattle();
}

function nextRound() {
  if (state.gameOver) return;
  if (state.phase === "combat" || !state.battleResolved) {
    pushLog("需要先完成本回合战斗。");
    render();
    return;
  }
  addExperience(2, "回合结束，获得 2 经验。");
  state.round += 1;
  const interest = Math.min(5, Math.floor(state.gold / 10));
  const income = 5 + interest;
  state.gold += income;
  pushLog(`进入第 ${state.round} 回合，获得 5 基础金币 + ${interest} 利息。`);
  advanceAiEconomies();
  state.currentOpponentId = null;
  state.enemy = Array(32).fill(null);
  refreshShop(true);
}

els.reroll.addEventListener("click", () => refreshShop(false));
els.buyXp.addEventListener("click", buyExperience);
els.sellUnit.addEventListener("click", sellSelectedUnit);
attachSellDropTarget(els.shop);
els.startBattle.addEventListener("click", startBattle);
els.battleSpeed.addEventListener("click", toggleBattleSpeed);
els.nextRound.addEventListener("click", nextRound);
els.pvpOpen.addEventListener("click", openPvpLobby);
els.pvpClose.addEventListener("click", closePvpLobby);
els.pvpModal.addEventListener("click", (event) => { if (event.target === els.pvpModal) closePvpLobby(); });
els.pvpSaveLineup.addEventListener("click", savePvpDefenseLineup);
els.pvpCopyOwnCode.addEventListener("click", copyOwnPvpCode);
els.pvpFinishSetup.addEventListener("click", finishPvpSetup);
els.pvpPlayerId.addEventListener("input", () => invalidatePvpSetupCode("玩家 ID 已改变，请重新保存并生成阵容码。"));
els.announcementOpen.addEventListener("click", openAnnouncement);
els.announcementClose.addEventListener("click", closeAnnouncement);
els.announcementConfirm.addEventListener("click", closeAnnouncement);
els.announcementModal.addEventListener("click", (event) => { if (event.target === els.announcementModal) closeAnnouncement(); });
els.shopOddsToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  const open = !els.shopOddsHelp.classList.contains("open");
  els.shopOddsHelp.classList.toggle("open", open);
  els.shopOddsToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
document.addEventListener("click", (event) => {
  if (els.shopOddsHelp.contains(event.target)) return;
  els.shopOddsHelp.classList.remove("open");
  els.shopOddsToggle.setAttribute("aria-expanded", "false");
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (els.announcementModal.classList.contains("visible")) closeAnnouncement();
  if (els.pvpModal.classList.contains("visible")) closePvpLobby();
  els.shopOddsHelp.classList.remove("open");
  els.shopOddsToggle.setAttribute("aria-expanded", "false");
});
els.modalAction.addEventListener("click", () => {
  if (state.gameOver) {
    if (state.gameResult === "victory") {
      enterPvpSetup();
      return;
    }
    resetGame();
    hideModal();
    return;
  }
  if (state.welcomePending) {
    state.welcomePending = false;
    hideModal();
    openAnnouncement();
    return;
  }
  hideModal();
});
els.clearLog.addEventListener("click", () => {
  state.log = [];
  render();
});

initializeAiPlayers();
refreshShop(true);
