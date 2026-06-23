import fs from "node:fs/promises";
import vm from "node:vm";

const notesCode = await fs.readFile("src/update-notes.js", "utf8");
const appCode = await fs.readFile("src/app.js", "utf8");
const start = appCode.indexOf("function escapeHtml");
const end = appCode.indexOf("function pvpHash", start);
if (start < 0 || end < 0) throw new Error("Announcement functions not found");

const classes = new Set();
const context = vm.createContext({
  window: {},
  document: { querySelector() { return null; } },
  els: {
    announcementContent: { innerHTML: "" },
    announcementModal: { classList: {
      add(name) { classes.add(name); },
      remove(name) { classes.delete(name); }
    } }
  }
});
vm.runInContext(notesCode, context);
vm.runInContext(`${appCode.slice(start, end)}\n;openAnnouncement();`, context);

const html = context.els.announcementContent.innerHTML;
for (const value of [context.window.UPDATE_NOTES.version, context.window.UPDATE_NOTES.title, "新增棋子", "平衡与配置"]) {
  if (!html.includes(value)) throw new Error(`Announcement is missing: ${value}`);
}
if (context.window.UPDATE_NOTES_HISTORY.length < 2 || !html.includes("v0.3.0")) throw new Error("Historical announcement options are missing");
vm.runInContext("renderAnnouncement(1);", context);
if (!context.els.announcementContent.innerHTML.includes("四人乱斗与完整羁绊")) throw new Error("Historical announcement did not render");
if (!classes.has("visible")) throw new Error("Announcement modal did not open");
vm.runInContext("closeAnnouncement();", context);
if (classes.has("visible")) throw new Error("Announcement modal did not close");

console.log("Announcement smoke test OK: editable notice data renders and modal reopens");
