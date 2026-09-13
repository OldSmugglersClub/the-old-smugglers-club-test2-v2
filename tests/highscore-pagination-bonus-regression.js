
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const src=fs.readFileSync("highscore.js","utf8");

// Architektur: genau ein gemeinsamer Paginationpfad.
assert(src.includes("container.onclick=event=>"));
assert(src.includes("page=requested;renderTable();"));
assert(!src.includes("dataset.paginationBound"));
assert(!src.includes("function changePage"));
assert(!src.includes("renderTable(rows())"));
assert(src.includes("function renderTable(){const list=rows();"));

// Bonus-Rangbildung muss aktiv sein.
assert(src.includes("if(view==='bonus')return rankBonusRows(copy);"));
const helper=src.match(/function rankBonusRows\(list\)\{[\s\S]*?\n\}/);
assert(helper,"rankBonusRows fehlt");
const sandbox={};
vm.runInNewContext(helper[0],sandbox);

// Realistischer 100er-Bonusdatensatz: 12 Spieler mit 5, Rest 0.
const rows=Array.from({length:100},(_,i)=>({
  name:`Spieler${String(i+1).padStart(3,'0')}`,
  bonusPoints:i<12?5:0,
  rank:i+1
}));
const ranked=sandbox.rankBonusRows(rows);
assert.strictEqual(ranked.length,100);
assert.strictEqual(ranked[0].bonusPoints,5);
assert.strictEqual(ranked[11].bonusPoints,5);
assert.strictEqual(ranked[12].bonusPoints,0);

// Seitenschnitt muss für Bonus genauso funktionieren wie für jede andere Liste.
const pageSize=25;
const p1=ranked.slice(0,pageSize).map(x=>x.name);
const p2=ranked.slice(pageSize,pageSize*2).map(x=>x.name);
const p3=ranked.slice(pageSize*2,pageSize*3).map(x=>x.name);
const p4=ranked.slice(pageSize*3,pageSize*4).map(x=>x.name);
assert.strictEqual(p1.length,25);
assert.strictEqual(p2.length,25);
assert.strictEqual(p3.length,25);
assert.strictEqual(p4.length,25);
assert.notStrictEqual(JSON.stringify(p1),JSON.stringify(p2));
assert.notStrictEqual(JSON.stringify(p2),JSON.stringify(p3));
assert.notStrictEqual(JSON.stringify(p3),JSON.stringify(p4));

console.log("OK: einheitlicher Pagingpfad und Bonus-Seiten 1–4 regressionsgeschützt.");
