
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const js=fs.readFileSync("highscore.js","utf8");
const css=fs.readFileSync("highscore.css","utf8");

// Einheitlicher Daten-/Pagingpfad bleibt erhalten.
assert(js.includes("function renderTable(){const list=rows();"));
assert(js.includes("if(view==='bonus')return rankBonusRows(copy);"));

// Mobile Touchpfad + Desktop/Keyboard-Fallback.
assert(js.includes("function activatePaginationButton(button)"));
assert(js.includes("container.onpointerup=event=>"));
assert(js.includes("event.pointerType!=='touch'&&event.pointerType!=='pen'"));
assert(js.includes("container.onclick=event=>"));
assert(js.includes("if(event.pointerType==='touch'||event.pointerType==='pen')return;"));
assert(js.includes("activatePaginationButton(button);"));

// Kein alter dataset-Sperrpfad.
assert(!js.includes("dataset.paginationBound"));

// Defensive mobile Tappability.
assert(css.includes("#pagination-top,#pagination-bottom{position:relative;z-index:6;pointer-events:auto}"));
assert(css.includes(".hs-page-btn{touch-action:manipulation;"));

// Bonus-Rangbildung weiterhin korrekt.
const helper=js.match(/function rankBonusRows\(list\)\{[\s\S]*?\n\}/);
assert(helper,"rankBonusRows fehlt");
const sandbox={};
vm.runInNewContext(helper[0],sandbox);
const rows=[
 {name:"A",bonusPoints:0},
 {name:"B",bonusPoints:5},
 {name:"C",bonusPoints:5},
 {name:"D",bonusPoints:0}
];
const out=sandbox.rankBonusRows(rows);
assert.strictEqual(JSON.stringify(out.map(x=>x.name)),JSON.stringify(["B","C","A","D"]));
assert.strictEqual(JSON.stringify(out.map(x=>x.rank)),JSON.stringify([1,1,3,3]));

console.log("OK: mobile Touch-Pagination, Desktop-Fallback und Bonus-Rangbildung geschützt.");
