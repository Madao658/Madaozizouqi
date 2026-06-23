/*
 * 游戏平衡配置
 * --------------------------------------------------------------------------
 * 只需修改下面对象中的数字并保存，然后刷新游戏页面即可生效。
 * [a, b, c] 依次代表 1 星、2 星、3 星数值；0.25 代表 25%。
 * count / counts 是激活羁绊所需的不同角色数量。
 * 不建议修改字段名；字段名后的中文注释说明了该数值的用途。
 */

window.BALANCE_CONFIG = {
  version: "2026-06-19.4",

  combat: {
    manaOnAttack: 12,       // 普攻命中后，攻击者回复的法力
    manaOnDamageTaken: 4    // 每次实际受击后，受击者回复的法力
  },

  ai: {
    startingGold: 6,        // AI 初始金币（玩家仍为 4）
    baseIncome: 6,          // AI 每回合基础收入
    xpPerRound: 3,          // AI 每回合自动获得经验
    levelSchedule: [        // 到达对应回合时，AI 至少达到该等级
      [1, 2], [3, 3], [5, 4], [8, 5], [11, 6], [14, 7], [17, 8], [20, 9]
    ],
    catchup: [              // 低血量追赶：从低血量档位开始匹配
      { maxHp: 20, bonusGold: 8, bonusRolls: 2 },
      { maxHp: 40, bonusGold: 4, bonusRolls: 1 }
    ],
    maxInterest: 5,
    rollCount: { steady: 2, trait: 3, reroll: 4 },
    rosterExtra: { steady: 6, trait: 7, reroll: 9 },
    goldReserve: { steady: 10, trait: 4, reroll: 2 },
    duplicateWeight: { steady: 7, trait: 7, reroll: 12 },
    traitWeight: { steady: 1.8, trait: 4.2, reroll: 1.8 },
    boardTraitWeight: 18    // AI 选上阵角色时对羁绊配合的重视程度
  },

  skills: {
    tuantuan: { heal: [120, 180, 280], shield: [80, 120, 180], shieldDuration: 4 },
    jd: { damage: [55, 80, 125], hitCount: 3 },
    madao: { damage: [100, 150, 240], targetRadius: 1, castRange: 2 },
    jianlao: { duration: 2.5, damageReduction: [0.35, 0.45, 0.60], tauntRadius: 1 },
    ccg: { damage: [160, 230, 360] },
    aki: { damage: [170, 260, 420], killMana: 30 },
    yuo: { attackSpeed: [0.25, 0.35, 0.55], duration: 5, radius: 1 },
    yin: { damage: [140, 210, 330], slow: 0.30, duration: 3 },
    dage: { shield: [200, 300, 480], lowHealthThreshold: 0.40, lowHealthMultiplier: 1.50 },
    qianhan: { damage: [150, 230, 360], freezeDuration: [1.25, 1.50, 2] },
    shuangye: { damage: [220, 330, 540], silenceDuration: 2 },
    jinglao: { damageReduction: [0.25, 0.35, 0.55], duration: 4, radius: 2 },
    kobayashi: { healPerTick: [45, 70, 110], duration: 4, interval: 1 },
    nnm: { damage: [230, 350, 560] },
    wjj: { damage: [260, 390, 700], shield: [250, 350, 650], shieldRadius: 2, targetSearchRadius: 1, knockbackDistance: 1 },
    alao: { damage: [320, 480, 760], bounceRatio: 0.50, bounceTargets: [1, 2, 3] },
    muji: { summonCount: [2, 3, 5], inheritHealth: 0.25, inheritAttack: 0.25, summonAttackSpeed: 0.75, summonArmor: 10, summonMagicResist: 10, tauntRadius: 2, tauntDuration: 2 },
    xiyangyang: { damage: [260, 390, 720], maxTargets: 3, killMana: 50, rewardWindow: 3 },
    gmj: { damage: [420, 650, 1500], targetCount: [3, 4, 8], delay: 1.5, explosionRadius: 1 },
    lin: { attackSpeed: [0.45, 0.65, 1.20], duration: 8, omnivamp: 0.25, splashRatio: 0.50, splashRadius: 1 },
    ljl: { damage: [130, 200, 320], critChance: 0.25, critMultiplier: 2 },
    wty: { attackSpeed: [0.30, 0.45, 0.70], duration: 5 },
    ding: { damage: [140, 210, 340] },
    zijian: { damage: [180, 270, 440], radius: 1, healingRatio: 0.20 },
    szx: { damage: [180, 280, 500], radius: 1, shieldDuration: 10 },
    weige: { damage: [280, 420, 840], damagePerExtraTarget: 0.50 }
  },

  traits: {
    "我早已麻痹": { counts: [2, 4], damage: [12, 20], radius: [1, 2], interval: 1 },
    "米卫兵": { counts: [2, 4, 5], teamResist: [10, 15, 20], memberMultiplier: [2, 3, 4] },
    "欧派教徒": { counts: [2, 4], restoreHealth: [0.50, 1.00], triggerHealth: 0.50, duration: 10 },
    "撸狗": { counts: [2, 4], teamAttackSpeed: [0.15, 0.30], memberExtraAttackSpeed: [0, 0.50] },
    "管人Fan": { count: 2, summonHealth: 600, summonArmor: 20, summonMagicResist: 20, heal: 25, healRadius: 2, healInterval: 1 },
    "现充": { counts: [1, 2, 3], winGold: [1, 3, 6] },
    "酷狗": { counts: [2, 3], disableRiceGuard: true, counterResist: 12 },
    "你XP好怪啊": { count: 2, stunDuration: 5 },
    "阿卡林": { counts: [2, 3], attackImmunity: [5, 10] },
    "二次元": { counts: [2, 4], teamHealth: [0.10, 0.20], memberExtraHealth: [0.15, 0.35] },
    "洛克大王": { count: 1, summonCount: 2, inheritHealth: 0.35, inheritAttack: 0.30, inheritDefense: 0.50, attackSpeed: 0.70 },
    "鸽子王": { count: 1, absenceChance: 0.50, returnMultiplier: 2 },
    "TCG老板": { count: 1, teamHealth: 0.20, teamAttackSpeed: 0.20 },
    "刀斯林": { count: 2, permanentGrowth: 0.02 },
    "打卡王": { count: 1, bonusPerActiveTrait: 0.05, includeSelfTrait: true },
    "996": { counts: [2, 4], healthLoss: [10, 15], attackGain: [3, 5], resistGain: [0, 2], interval: 1 },
    "撸神": { count: 1, omnivampPerDog: 0.10, shieldRatioPerDog: 0.05 },
    "逃离塔科夫": { counts: [1, 2, 3], winGold: [1, 2, 3], lossGold: [-2, -1, 0] },
    "测评师": { counts: [2, 3], executeThreshold: [0.05, 0.10] },
    "卷王": { count: 1, teamOmnivamp: 0.10 }
  }
};

// 以下内容根据上面的数字自动生成游戏内说明，无需手动修改。
(() => {
  const B = window.BALANCE_CONFIG;
  const pct = (value) => `${Math.round(value * 100)}%`;
  const stars = (values) => values.join("/");
  const S = B.skills;
  B.skillDescriptions = {
    tuantuan: `治疗生命值最低的友军${stars(S.tuantuan.heal)}点，并提供${stars(S.tuantuan.shield)}点护盾，持续${S.tuantuan.shieldDuration}秒。`,
    jd: `连续射击当前目标${S.jd.hitCount}次，每次造成${stars(S.jd.damage)}物理伤害。`,
    madao: `挥刀横斩，对范围内敌人造成${stars(S.madao.damage)}物理伤害。`,
    jianlao: `进入封茧状态${S.jianlao.duration}秒，获得${S.jianlao.damageReduction.map(pct).join("/")}减伤并嘲讽周围敌人。`,
    ccg: `向随机敌人发射脉冲，造成${stars(S.ccg.damage)}魔法伤害。`,
    aki: `闪到敌方后排，造成${stars(S.aki.damage)}物理伤害；若击杀，回复${S.aki.killMana}点法力。`,
    yuo: `使相邻友军获得${S.yuo.attackSpeed.map(pct).join("/")}攻速，持续${S.yuo.duration}秒。`,
    yin: `对一列敌人造成${stars(S.yin.damage)}魔法伤害，并降低${pct(S.yin.slow)}移速和攻速，持续${S.yin.duration}秒。`,
    dage: `获得${stars(S.dage.shield)}护盾；生命低于${pct(S.dage.lowHealthThreshold)}时护盾提高${pct(S.dage.lowHealthMultiplier - 1)}。`,
    qianhan: `造成${stars(S.qianhan.damage)}物理伤害，并冻结目标${stars(S.qianhan.freezeDuration)}秒。`,
    shuangye: `闪至生命最低敌人身后，造成${stars(S.shuangye.damage)}物理伤害并沉默${S.shuangye.silenceDuration}秒。`,
    jinglao: `展开领域${S.jinglao.duration}秒，领域内敌人造成的技能伤害降低${S.jinglao.damageReduction.map(pct).join("/")}。`,
    kobayashi: `演奏${S.kobayashi.duration}秒，每${S.kobayashi.interval}秒治疗全体友军${stars(S.kobayashi.healPerTick)}点生命。`,
    nnm: `锁定最远敌人发射穿透弹，对路径敌人造成${stars(S.nnm.damage)}物理伤害。`,
    wjj: `冲锋造成${stars(S.wjj.damage)}物理伤害，并给附近友军${stars(S.wjj.shield)}护盾。`,
    alao: `造成${stars(S.alao.damage)}魔法伤害，并弹射${stars(S.alao.bounceTargets)}名敌人，弹射造成${pct(S.alao.bounceRatio)}伤害。`,
    muji: `召唤${stars(S.muji.summonCount)}只小鸡；小鸡继承${pct(S.muji.inheritHealth)}生命和${pct(S.muji.inheritAttack)}攻击。`,
    xiyangyang: `冲刺穿过最多${S.xiyangyang.maxTargets}名敌人，造成${stars(S.xiyangyang.damage)}物理伤害；参与击杀回复${S.xiyangyang.killMana}法力。`,
    gmj: `标记${stars(S.gmj.targetCount)}名敌人，${S.gmj.delay}秒后爆炸，造成${stars(S.gmj.damage)}魔法伤害。`,
    lin: `化身${S.lin.duration}秒，获得${S.lin.attackSpeed.map(pct).join("/")}攻速和${pct(S.lin.omnivamp)}全能吸血，普攻造成${pct(S.lin.splashRatio)}溅射。`,
    ljl: `闪至生命值最低的敌方后排，造成${stars(S.ljl.damage)}魔法伤害；有${pct(S.ljl.critChance)}概率造成${S.ljl.critMultiplier}倍伤害。`,
    wty: `获得${S.wty.attackSpeed.map(pct).join("/")}攻击速度，持续${S.wty.duration}秒。`,
    ding: `将最远敌人拉到己方前排空位并造成${stars(S.ding.damage)}魔法伤害；没有空位时只造成伤害。`,
    zijian: `对周围${S.zijian.radius}格敌人造成${stars(S.zijian.damage)}魔法伤害，并治疗自身实际总伤害的${pct(S.zijian.healingRatio)}。`,
    szx: `对周围${S.szx.radius}格敌人造成${stars(S.szx.damage)}真实伤害；周围其他友军获得等于实际总伤害的护盾，持续${S.szx.shieldDuration}秒。`,
    weige: `对一列敌人造成${stars(S.weige.damage)}魔法伤害；路径内每多命中1人，本次伤害增加${pct(S.weige.damagePerExtraTarget)}。`
  };

  const T = B.traits;
  B.traitRules = {
    "我早已麻痹": T["我早已麻痹"].counts.map((count, i) => ({ count, label: i ? "扩张电场" : "麻痹电场", effect: `本阵营单位每${T["我早已麻痹"].interval}秒对周围${T["我早已麻痹"].radius[i]}格敌人造成${T["我早已麻痹"].damage[i]}点魔法伤害。` })),
    "米卫兵": T["米卫兵"].counts.map((count, i) => ({ count, label: ["双抗支援", "强化支援", "铁壁支援"][i], effect: `全体友军获得${T["米卫兵"].teamResist[i]}双抗，米卫兵获得${T["米卫兵"].teamResist[i] * T["米卫兵"].memberMultiplier[i]}双抗。` })),
    "欧派教徒": T["欧派教徒"].counts.map((count, i) => ({ count, label: i ? "完全复苏" : "生命复苏", effect: `生命首次低于${pct(T["欧派教徒"].triggerHealth)}后，${T["欧派教徒"].duration}秒内恢复${pct(T["欧派教徒"].restoreHealth[i])}最大生命。` })),
    "撸狗": T["撸狗"].counts.map((count, i) => ({ count, label: i ? "狂热攻速" : "团队攻速", effect: `全体友军获得${pct(T["撸狗"].teamAttackSpeed[i])}攻速${T["撸狗"].memberExtraAttackSpeed[i] ? `，撸狗额外获得${pct(T["撸狗"].memberExtraAttackSpeed[i])}攻速` : ""}。` })),
    "管人Fan": [{ count: T["管人Fan"].count, label: "VTB应援", effect: `开战召唤VTB，每${T["管人Fan"].healInterval}秒治疗周围${T["管人Fan"].healRadius}格友军${T["管人Fan"].heal}生命。` }],
    "现充": T["现充"].counts.map((count, i) => ({ count, label: ["胜利奖金", "丰厚奖金", "人生赢家"][i], effect: `胜利时额外获得${T["现充"].winGold[i]}金币。` })),
    "酷狗": T["酷狗"].counts.map((count, i) => ({ count, label: i ? "反制装甲" : "克制米卫兵", effect: `使敌方米卫兵羁绊失效${i ? `；成功时全体友军获得${T["酷狗"].counterResist}双抗` : ""}。` })),
    "你XP好怪啊": [{ count: T["你XP好怪啊"].count, label: "怪异开局", effect: `开战使敌方全体眩晕${T["你XP好怪啊"].stunDuration}秒。` }],
    "阿卡林": T["阿卡林"].counts.map((count, i) => ({ count, label: i ? "完全隐身" : "攻击免疫", effect: `阿卡林单位免疫${T["阿卡林"].attackImmunity[i]}次普攻。` })),
    "二次元": T["二次元"].counts.map((count, i) => ({ count, label: i ? "生命超频" : "生命共鸣", effect: `全体友军+${pct(T["二次元"].teamHealth[i])}生命，二次元额外+${pct(T["二次元"].memberExtraHealth[i])}。` })),
    "洛克大王": [{ count: T["洛克大王"].count, label: "宠物伙伴", effect: `开战召唤${T["洛克大王"].summonCount}只宠物。` }],
    "鸽子王": [{ count: T["鸽子王"].count, label: "随机失踪", effect: `${pct(T["鸽子王"].absenceChance)}概率缺席本战；下战保证登场且全属性×${T["鸽子王"].returnMultiplier}。` }],
    "TCG老板": [{ count: T["TCG老板"].count, label: "老板加持", effect: `全体友军+${pct(T["TCG老板"].teamAttackSpeed)}攻速和${pct(T["TCG老板"].teamHealth)}生命。` }],
    "刀斯林": [{ count: T["刀斯林"].count, label: "永久狩猎", effect: `参与击杀敌方撸狗后永久获得${pct(T["刀斯林"].permanentGrowth)}生命、双抗、攻击和攻速。` }],
    "打卡王": [{ count: T["打卡王"].count, label: "到处打卡", effect: `打卡王按当前已激活羁绊数量，每个获得${pct(T["打卡王"].bonusPerActiveTrait)}生命、攻击、双抗和攻速（包括打卡王）。` }],
    "996": T["996"].counts.map((count, i) => ({ count, label: i ? "通宵加班" : "深夜加班", effect: `996单位每${T["996"].interval}秒失去${T["996"].healthLoss[i]}生命，并在本场战斗内累计获得${T["996"].attackGain[i]}攻击${T["996"].resistGain[i] ? `和${T["996"].resistGain[i]}双抗` : ""}；生命流失无视护盾和减伤。` })),
    "撸神": [{ count: T["撸神"].count, label: "撸王降世", effect: `撸神每有1个友方撸狗，获得${pct(T["撸神"].omnivampPerDog)}全能吸血，并将造成伤害的${pct(T["撸神"].shieldRatioPerDog)}刷新为不可叠加护盾。` }],
    "逃离塔科夫": T["逃离塔科夫"].counts.map((count, i) => ({ count, label: ["逃离失败", "逃了一半", "逃离成功"][i], effect: `战斗胜利获得${T["逃离塔科夫"].winGold[i]}金币，失败${T["逃离塔科夫"].lossGold[i] ? `失去${Math.abs(T["逃离塔科夫"].lossGold[i])}金币` : "不失去金币"}。` })),
    "测评师": T["测评师"].counts.map((count, i) => ({ count, label: i ? "高风险警告" : "部分符合", effect: `测评师的普通攻击和技能处决生命低于${pct(T["测评师"].executeThreshold[i])}的目标。` })),
    "卷王": [{ count: T["卷王"].count, label: "自觉的牛马", effect: `所有友军获得${pct(T["卷王"].teamOmnivamp)}全能吸血。` }]
  };
})();
