/*
 * 更新公告填写处
 * --------------------------------------------------------------------------
 * 只修改下方两个 ` 之间的文字即可，不需要填写逗号或引号。
 * 固定信息使用“名称：内容”；分组使用“## 分组名”；改动使用“- 内容”。
 * 使用单独一行“===”分隔不同版本；最新版本请放在最上方。
 * 修改并保存后，刷新游戏页面即可生效。
 */

const UPDATE_NOTICE_TEXT = `
版本号：v0.6.0
发布日期：2026-06-19
标题：新棋子、新羁绊与战场体验升级
简介：本版本扩充了角色与羁绊体系，并进一步提升布阵、合成、战斗反馈和棋盘辨识度。

## 新增棋子
- 新增子健、carrot、鹰无、宋老师、威哥、小丁，共6名棋子。
- 新棋子拥有范围吸血、攻速强化、技能暴击、真实伤害护盾、路径增伤和拉人控制等全新技能机制。
- 新棋子的头像、技能说明和全部可调数值均已接入游戏。

## 新增羁绊
- 新增打卡王、996、撸神、逃离塔科夫、测评师、卷王，共6种羁绊。
- 打卡王会根据当前已激活羁绊数量获得全属性成长。
- 996单位会持续消耗生命并叠加攻击与双抗，生命流失可直接导致死亡。
- 撸神可根据友方撸狗数量获得全能吸血和不可叠加的伤害转护盾。
- 逃离塔科夫会根据战斗胜负改变金币收益。
- 测评师可通过普通攻击和技能处决低生命目标；卷王单位获得全能吸血。

## 羁绊归属调整
- 马刀移除撸狗，新增逃离塔科夫和测评师。
- 霜夜新增逃离塔科夫。
- 母鸡新增逃离塔科夫。

## 战斗与布阵
- 战斗速度新增0.5倍速，现可在0.5倍、1倍和2倍之间循环切换。
- 点击开始战斗时，如果上阵人数未达到当前等级上限，会从备战区随机补充棋子后开战。
- 三个相同棋子合成时，只要参与合成的棋子中有场上棋子，升星结果会保留在原场上位置。
- 新增伤害、治疗和护盾浮字，以及技能命中格脉冲提示。

## 棋盘与界面
- 棋盘加入木质外框、阵地标签、中线VS标识、交错格纹、棋子落地阴影和开战演出。
- 敌我区域和棋子标记进一步强化，双方阵容更容易辨认。
- 商店资源区现在会在等级旁同步显示当前经验。
- 羁绊达到激活人数后会显示彩色光效、流光动画和醒目的“羁绊达成”提示。

## 平衡与配置
- 为6名新棋子配置了偏保守的初始技能数值，并按照同费用角色强度进行校准。
- 新棋子技能与新羁绊的数值全部同步至 balance-config.js，可继续实时调整。
- 新增增量配置模板，后续可单独提交新棋子、技能参数、羁绊档位和羁绊参数。

页脚：如果发现问题，欢迎记录出现问题时的阵容、回合数和战斗速度。
===

版本号：v0.5.0
发布日期：2026-06-19
标题：棋盘及背景优化
简介：感谢参与 MadaoFamily 乱斗自走棋测试，以下是本版本的主要改动。

## 新增内容
- 目前能够查看历史公告

## 战斗与界面
- 背景已调整为更明亮轻松的风格。
- 棋盘优化。

## 平衡调整
- 再次加强 AI 的经济、升级、搜牌与阵容选择能力。

页脚：如果发现问题，欢迎记录出现问题时的阵容和回合数。
===

版本号：v0.4.0
发布日期：2026-06-19
标题：本地异步 PvP 上线
简介：感谢参与 MadaoFamily 乱斗自走棋测试，以下是本版本的主要改动。

## 新增内容
- 通关后可重新布置 PvP 防守阵容，并生成带玩家 ID 的阵容码。
- 支持导入其他玩家的阵容码进行本地异步 PvP。
- 新增本机导入次数、挑战次数和胜负记录。

## 战斗与界面
- 新增受击回蓝机制。
- 羁绊悬浮卡现在会展示全部人数档位和所属角色。
- 胜利后新增详细结算画面，并保留最终战棋盘。

## 平衡调整
- 加强 AI 的经济、升级、搜牌与阵容选择能力。
- 技能、羁绊和 AI 参数可通过 balance-config.js 统一调整。
- 削弱二次元羁绊数值。
- 加强米卫兵羁绊的双抗数值。

页脚：如果发现问题，欢迎记录出现问题时的阵容和回合数。

===

版本号：v0.3.0
发布日期：2026-06-18
标题：四人乱斗与完整羁绊
简介：本版本建立了游戏的主要单机循环和战斗框架。

## 核心玩法
- 加入一名真人与三家 AI 的四人牌桌。
- 完成商店、备战区、棋盘布阵、升级和经济系统。
- 加入完整角色技能、羁绊和自动战斗。

## 界面改进
- 新增角色悬浮信息与商店概率查看。
- 新增战斗统计、胜利结算与羁绊角色预览。

页脚：这是历史版本公告示例，可以直接替换或继续添加更早版本。
`;

(() => {
  const parseNotice = (text) => {
    const notes = { version: "", date: "", title: "", intro: "", sections: [], footer: "" };
    let currentSection = null;
    text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).forEach((line) => {
      if (line.startsWith("## ")) {
        currentSection = { title: line.slice(3).trim(), items: [] };
        notes.sections.push(currentSection);
        return;
      }
      if (line.startsWith("- ")) {
        if (!currentSection) {
          currentSection = { title: "本次改动", items: [] };
          notes.sections.push(currentSection);
        }
        currentSection.items.push(line.slice(2).trim());
        return;
      }
      const chineseSeparator = line.indexOf("：");
      const englishSeparator = line.indexOf(":");
      const separator = chineseSeparator >= 0 ? chineseSeparator : englishSeparator;
      if (separator < 0) return;
      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim();
      if (key === "版本号") notes.version = value;
      if (key === "发布日期") notes.date = value;
      if (key === "标题") notes.title = value;
      if (key === "简介") notes.intro = value;
      if (key === "页脚") notes.footer = value;
    });
    return notes;
  };
  window.UPDATE_NOTES_HISTORY = UPDATE_NOTICE_TEXT.split(/^\s*===\s*$/m).map(parseNotice).filter((notes) => notes.version || notes.title);
  window.UPDATE_NOTES = window.UPDATE_NOTES_HISTORY[0] || {};
})();
