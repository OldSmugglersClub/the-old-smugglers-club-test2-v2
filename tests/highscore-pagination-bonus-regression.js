
const fs=require("fs"),assert=require("assert");
const js=fs.readFileSync("highscore.js","utf8");
const css=fs.readFileSync("highscore.css","utf8");

assert(js.includes("window.OSCHighscoreGoToPage=function(requested)"));
assert(js.includes('onclick="return window.OSCHighscoreGoToPage('));
assert(js.includes("if(view==='bonus')return rankBonusRows(copy);"));
assert(js.includes("function renderTable(){const list=rows();"));
assert(css.includes("z-index:1000"));
assert(css.includes("z-index:1001"));
assert(css.includes("pointer-events:auto"));

console.log("OK: Bonus-Pagination nutzt direkte Seitenfunktion; Pagination liegt im Vordergrund.");
