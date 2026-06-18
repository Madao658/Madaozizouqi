const units = [
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

const traitRules = {
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

const finalRound = 25;

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
  traits: document.querySelector("#traits"),
  log: document.querySelector("#log"),
  benchCount: document.querySelector("#bench-count"),
  tooltip: null,
  modal: document.querySelector("#game-modal"),
  modalTitle: document.querySelector("#modal-title"),
  modalText: document.querySelector("#modal-text"),
  modalAction: document.querySelector("#modal-action"),
  reroll: document.querySelector("#reroll"),
  buyXp: document.querySelector("#buy-xp"),
  startBattle: document.querySelector("#start-battle"),
  clearLog: document.querySelector("#clear-log"),
  pieceTemplate: document.querySelector("#piece-template")
};

function createUnit(base, star = 1) {
  return {
    uid: crypto.randomUUID ? crypto.randomUUID() : `${base.id}-${Date.now()}-${Math.random()}`,
    baseId: base.id,
    name: base.name,
    cost: base.cost,
    origin: base.origin,
    class: base.class,
    role: base.role,
    range: base.range,
    skill: base.skill,
    skillDescription: base.skillDescription,
    star,
    stats: { ...base.stats }
  };
}

function weightedPool() {
  const maxCost = state.round < 3 ? 2 : state.round < 6 ? 3 : state.round < 9 ? 4 : 5;
  return units.filter((unit) => unit.cost <= maxCost);
}

function randomBase() {
  const pool = weightedPool();
  const weighted = pool.flatMap((unit) => Array(Math.max(1, 7 - unit.cost)).fill(unit));
  return weighted[Math.floor(Math.random() * weighted.length)];
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
  state.log.unshift(message);
  state.log = state.log.slice(0, 18);
}

function showModal(title, text, actionText = "继续") {
  els.modalTitle.innerHTML = title;
  els.modalText.textContent = text;
  els.modalAction.textContent = actionText;
  els.modal.classList.add("visible");
}

function hideModal() {
  els.modal.classList.remove("visible");
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
  state.log = ["新的乱斗开始。购买棋子，放到下半区，然后开战。"];
  refreshShop(true);
}

function endGame(kind) {
  state.gameOver = true;
  state.battleResolved = true;
  state.phase = "prepare";
  if (kind === "victory") {
    pushLog(`第 ${finalRound} 回合最终战胜利，游戏通关。`);
    showModal("MadaoFamily<br />乱斗胜利", "第 25 回合最终战已拿下。牌桌归你，家族传说开始流传。", "再来一局");
  } else {
    pushLog("生命值归零，乱斗失败。");
    showModal("乱斗失败", "牌桌暂时不站在你这边。重新整备，再杀回来。", "重新开局");
  }
}

function boardUnitCount() {
  return state.board.filter(Boolean).length;
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
    counts[unit.origin] = (counts[unit.origin] || 0) + 1;
    counts[unit.class] = (counts[unit.class] || 0) + 1;
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
  node.className = `piece origin-${unit.origin} ${extraClass} ${fxClass}`.trim();
  const avatar = node.querySelector(".piece-avatar");
  avatar.src = unitIconPath(unit);
  avatar.alt = unit.name;
  avatar.draggable = false;
  avatar.addEventListener("error", () => {
    avatar.hidden = true;
  });
  node.querySelector(".piece-cost").textContent = unit.cost;
  node.querySelector(".piece-name").textContent = unit.name;
  node.querySelector(".piece-meta").textContent = `${unit.origin} / ${unit.class}`;
  node.querySelector(".piece-star").textContent = "★".repeat(unit.star || 1);
  node.title = `${unit.name}｜${unit.origin} ${unit.class}\n${unit.role}\n技能：${unit.skill}\n${unit.skillDescription}`;
  attachTooltip(node, unit);
  if (Number.isFinite(unit.hp) && Number.isFinite(unit.maxHp)) {
    const hp = document.createElement("span");
    hp.className = "hp-bar";
    hp.innerHTML = `<span style="width:${Math.max(0, Math.min(100, (unit.hp / unit.maxHp) * 100))}%"></span>`;
    node.appendChild(hp);
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
  return `
    <div class="tooltip-title">
      <img src="${unitIconPath(unit)}" alt="${unit.name}" />
      <div>
        <strong>${unit.name}</strong>
        <span>${unit.cost}费 · ${"★".repeat(unit.star || 1)}</span>
      </div>
    </div>
    <div class="tooltip-tags">
      <span>${unit.origin}</span>
      <span>${unit.class}</span>
      <span>${unit.role}</span>
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
  tooltip.classList.add("visible");
  positionTooltip(event);
}

function hideTooltip() {
  ensureTooltip().classList.remove("visible");
}

function attachTooltip(node, unit) {
  node.addEventListener("mouseenter", (event) => showTooltip(unit, event));
  node.addEventListener("mousemove", positionTooltip);
  node.addEventListener("mouseleave", hideTooltip);
  node.addEventListener("focus", (event) => showTooltip(unit, event));
  node.addEventListener("blur", hideTooltip);
}

function unitAt(type, index) {
  return (type === "bench" ? state.bench : state.board)[index];
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

function renderBoard() {
  els.board.innerHTML = "";
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
      cell.className = `cell ${row < 4 ? "enemy-zone" : "player-zone"}`;
      const index = row * 8 + col;
      const playerIndex = (row - 4) * 8 + col;
      const enemyIndex = row * 8 + col;
      const combatUnit = combatByCell.get(`${row},${col}`);
      if (combatUnit) {
        cell.classList.add("locked", "combat-cell");
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
        if (unit) cell.appendChild(renderPiece(unit, "enemy"));
      }
      cell.style.gridRow = `${row + 1}`;
      cell.style.gridColumn = `${col + 1}`;
      cell.dataset.index = index;
      els.board.appendChild(cell);
    }
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
    const div = document.createElement("div");
    div.className = `trait ${tier ? "active" : ""}`;
    const next = nextTier(name, count);
    const summary = tier ? `${tier.count} ${tier.label}` : `未激活`;
    const detail = tier
      ? tier.effect
      : `下一档 ${next.count}：${next.effect}`;
    const progress = next ? `距离 ${next.count} 还差 ${next.count - count}` : "已达最高档";
    div.innerHTML = `
      <strong><span>${name}</span><span>${count} · ${summary}</span></strong>
      <p>${detail}</p>
      <small>${progress}</small>
    `;
    els.traits.appendChild(div);
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

function render() {
  els.round.textContent = state.round;
  els.hp.textContent = state.hp;
  els.gold.textContent = state.gold;
  els.level.textContent = state.level;
  els.xp.textContent = state.level >= 10 ? "MAX" : `${state.xp}/${xpRequirement()}`;
  els.unitCap.textContent = `${boardUnitCount()}/${state.level}`;
  els.phase.textContent = state.gameOver ? "结束" : state.phase === "combat" ? "战斗" : state.battleResolved ? "结算" : "备战";
  els.reroll.disabled = state.gameOver || state.phase === "combat" || state.battleResolved || state.gold < 2;
  els.buyXp.disabled = state.gameOver || state.phase === "combat" || state.battleResolved || state.gold < 4 || state.level >= 10;
  els.buyXp.textContent = state.level >= 10 ? "等级已满" : "购买经验 +4 -4金";
  els.startBattle.disabled = state.gameOver || state.phase === "combat" || state.battleResolved || !state.board.some(Boolean);
  els.startBattle.textContent = state.battleResolved ? "本回合已战斗" : "开始战斗";
  els.nextRound.disabled = state.gameOver || state.phase === "combat" || !state.battleResolved;
  els.nextRound.textContent = state.battleResolved ? "进入下一回合" : "等待战斗";
  renderBoard();
  renderBench();
  renderShop();
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
  render();
}

function buy(shopIndex) {
  if (state.gameOver || state.phase === "combat" || state.battleResolved) return;
  const base = state.shop[shopIndex];
  if (!base || state.gold < base.cost) {
    pushLog("金币不足，买不动。");
    render();
    return;
  }
  const benchIndex = state.bench.findIndex((slot) => !slot);
  if (benchIndex < 0) {
    pushLog("备战区满了。");
    render();
    return;
  }
  state.gold -= base.cost;
  state.bench[benchIndex] = createUnit(base);
  state.shop.splice(shopIndex, 1, randomBase());
  pushLog(`购买 ${base.name}。`);
  combineAll();
  render();
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
        const [keep, removeA, removeB] = entries;
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

function buildEnemy() {
  state.enemy = Array(32).fill(null);
  const count = Math.min(3 + Math.floor(state.round / 2), 8);
  const spots = [4, 3, 5, 2, 10, 11, 12, 13, 18, 19];
  for (let i = 0; i < count; i += 1) {
    const base = randomBase();
    const unit = createUnit(base, state.round > 8 && i === 0 ? 2 : 1);
    state.enemy[spots[i]] = unit;
  }
}

function toFighter(unit, side, boardIndex) {
  const rowOffset = side === "player" ? 4 : 0;
  const row = rowOffset + Math.floor(boardIndex / 8);
  const col = boardIndex % 8;
  const scale = 1 + (unit.star - 1) * 0.75;
  return {
    ...unit,
    side,
    row,
    col,
    hp: Math.round(unit.stats.health * scale),
    maxHp: Math.round(unit.stats.health * scale),
    attack: Math.round(unit.stats.attack * scale),
    mana: 0,
    maxMana: unit.stats.mana,
    cooldown: 0
  };
}

function distance(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function nearestEnemy(fighter, fighters) {
  return fighters
    .filter((item) => item.side !== fighter.side && item.hp > 0)
    .sort((a, b) => distance(fighter, a) - distance(fighter, b))[0];
}

function stepToward(fighter, target, occupied) {
  const candidates = [
    [fighter.row + Math.sign(target.row - fighter.row), fighter.col],
    [fighter.row, fighter.col + Math.sign(target.col - fighter.col)]
  ].filter(([row, col]) => row >= 0 && row < 8 && col >= 0 && col < 8 && !occupied.has(`${row},${col}`));
  if (candidates[0]) {
    fighter.row = candidates[0][0];
    fighter.col = candidates[0][1];
  }
}

function castSkill(fighter, fighters) {
  const enemies = fighters.filter((item) => item.side !== fighter.side && item.hp > 0);
  const allies = fighters.filter((item) => item.side === fighter.side && item.hp > 0);
  if (!enemies.length) return;
  fighter.mana = 0;
  if (fighter.class === "辅助") {
    const ally = allies.sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
    ally.hp = Math.min(ally.maxHp, ally.hp + 110 * fighter.star);
    pushLog(`${fighter.name} 释放 ${fighter.skill}，治疗 ${ally.name}。`);
    return;
  }
  if (fighter.class === "守卫" || fighter.class === "斗士") {
    fighter.hp = Math.min(fighter.maxHp, fighter.hp + 80 * fighter.star);
    const target = nearestEnemy(fighter, fighters);
    if (target) target.hp -= Math.round(fighter.attack * 1.2);
    pushLog(`${fighter.name} 释放 ${fighter.skill}，稳住前排。`);
    return;
  }
  const target = fighter.class === "射手"
    ? enemies.sort((a, b) => distance(fighter, b) - distance(fighter, a))[0]
    : enemies[Math.floor(Math.random() * enemies.length)];
  target.hp -= Math.round((fighter.attack * (fighter.class === "术士" ? 2.4 : 1.9)) * (1 + fighter.star * 0.25));
  pushLog(`${fighter.name} 释放 ${fighter.skill}，命中 ${target.name}。`);
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function createFighters() {
  return [
    ...state.board.map((unit, index) => (unit ? toFighter(unit, "player", index) : null)).filter(Boolean),
    ...state.enemy.map((unit, index) => (unit ? toFighter(unit, "enemy", index) : null)).filter(Boolean)
  ];
}

function resolveBattle(fighters) {
  const playerSurvivors = fighters.filter((item) => item.side === "player" && item.hp > 0);
  const enemySurvivors = fighters.filter((item) => item.side === "enemy" && item.hp > 0);
  if (playerSurvivors.length >= enemySurvivors.length) {
    const reward = 4 + Math.floor(state.round / 3);
    state.gold += reward;
    pushLog(`战斗胜利，获得 ${reward} 金。`);
    return "win";
  } else {
    const damage = Math.min(18, enemySurvivors.reduce((sum, unit) => sum + unit.star + unit.cost, 0));
    state.hp = Math.max(0, state.hp - damage);
    state.gold += 2;
    pushLog(`战斗失败，损失 ${damage} 生命，获得 2 安慰金。`);
    return "loss";
  }
}

function battleStep(fighters, tick) {
  let actionTaken = false;
  const actingOrder = fighters.filter((item) => item.hp > 0).sort((a, b) => b.stats.attackSpeed - a.stats.attackSpeed);
  actingOrder.forEach((fighter) => {
    const target = nearestEnemy(fighter, fighters);
    if (!target) return;
    if (fighter.cooldown > 0) fighter.cooldown -= 1;
    if (distance(fighter, target) <= fighter.range) {
      if (fighter.cooldown <= 0) {
        const traitBonus = fighter.origin === "暗巷" && tick < 4 ? 1.45 : 1;
        target.hp -= Math.max(8, Math.round(fighter.attack * traitBonus - target.stats.armor * 0.18));
        fighter.mana += fighter.origin === "星网" ? 18 : 12;
        target.mana += 4;
        fighter.cooldown = Math.max(1, Math.round(4 / fighter.stats.attackSpeed));
        state.combatFx = { attacker: fighter.uid, target: target.uid };
        actionTaken = true;
        if (fighter.mana >= fighter.maxMana) {
          castSkill(fighter, fighters);
          state.combatFx = { attacker: fighter.uid, target: target.uid };
        }
      }
    } else {
      const occupied = new Set(fighters.filter((item) => item.hp > 0 && item !== fighter).map((item) => `${item.row},${item.col}`));
      stepToward(fighter, target, occupied);
      state.combatFx = { attacker: fighter.uid, target: null };
      actionTaken = true;
    }
  });
  return actionTaken;
}

async function playBattle() {
  const fighters = createFighters();
  state.combatFighters = fighters;
  pushLog("战斗开始。");
  render();
  await sleep(450);

  for (let tick = 0; tick < 90; tick += 1) {
    battleStep(fighters, tick);
    state.combatFighters = fighters;
    render();
    await sleep(180);
    state.combatFx = null;
    const playerAlive = fighters.some((item) => item.side === "player" && item.hp > 0);
    const enemyAlive = fighters.some((item) => item.side === "enemy" && item.hp > 0);
    if (!playerAlive || !enemyAlive) break;
  }

  const result = resolveBattle(fighters);
  state.battleResolved = true;
  render();
  await sleep(700);
  state.combatFighters = null;
  state.combatFx = null;
  state.enemy = Array(32).fill(null);
  state.phase = "prepare";
  if (result === "win" && state.round >= finalRound) {
    endGame("victory");
  } else if (state.hp <= 0 || state.round >= finalRound) {
    endGame("defeat");
  }
  render();
}

function simulateBattle() {
  const fighters = [
    ...state.board.map((unit, index) => (unit ? toFighter(unit, "player", index) : null)).filter(Boolean),
    ...state.enemy.map((unit, index) => (unit ? toFighter(unit, "enemy", index) : null)).filter(Boolean)
  ];

  for (let tick = 0; tick < 80; tick += 1) {
    fighters.filter((item) => item.hp > 0).forEach((fighter) => {
      const target = nearestEnemy(fighter, fighters);
      if (!target) return;
      if (fighter.cooldown > 0) fighter.cooldown -= 1;
      if (distance(fighter, target) <= fighter.range) {
        if (fighter.cooldown <= 0) {
          const traitBonus = fighter.origin === "暗巷" && tick < 4 ? 1.45 : 1;
          target.hp -= Math.max(8, Math.round(fighter.attack * traitBonus - target.stats.armor * 0.18));
          fighter.mana += fighter.origin === "星网" ? 18 : 12;
          target.mana += 4;
          fighter.cooldown = Math.max(1, Math.round(4 / fighter.stats.attackSpeed));
          if (fighter.mana >= fighter.maxMana) castSkill(fighter, fighters);
        }
      } else {
        const occupied = new Set(fighters.filter((item) => item.hp > 0 && item !== fighter).map((item) => `${item.row},${item.col}`));
        stepToward(fighter, target, occupied);
      }
    });
    const playerAlive = fighters.some((item) => item.side === "player" && item.hp > 0);
    const enemyAlive = fighters.some((item) => item.side === "enemy" && item.hp > 0);
    if (!playerAlive || !enemyAlive) break;
  }

  const result = resolveBattle(fighters);
  state.battleResolved = true;
  if (result === "win" && state.round >= finalRound) endGame("victory");
  if (state.hp <= 0 || (result !== "win" && state.round >= finalRound)) endGame("defeat");
}

function startBattle() {
  if (state.gameOver || state.phase === "combat" || state.battleResolved || !state.board.some(Boolean)) return;
  state.phase = "combat";
  state.selected = null;
  buildEnemy();
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
  state.enemy = Array(32).fill(null);
  refreshShop(true);
}

els.reroll.addEventListener("click", () => refreshShop(false));
els.buyXp.addEventListener("click", buyExperience);
els.startBattle.addEventListener("click", startBattle);
els.nextRound.addEventListener("click", nextRound);
els.modalAction.addEventListener("click", () => {
  if (state.gameOver) {
    resetGame();
    hideModal();
    return;
  }
  hideModal();
});
els.clearLog.addEventListener("click", () => {
  state.log = [];
  render();
});

refreshShop(true);
