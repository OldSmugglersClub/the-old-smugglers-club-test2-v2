
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const src=fs.readFileSync("highscore.js","utf8");

assert(src.includes("container.querySelectorAll('button[data-page]')"));
assert(src.includes("button.onclick=()=>"));
assert(!src.includes("dataset.paginationBound='true'"));
assert(src.includes("if(view==='bonus')return rankBonusRows(copy);"));

const helper=src.match(/function rankBonusRows\(list\)\{[\s\S]*?\n\}/);
assert(helper,"rankBonusRows fehlt");
const sandbox={};
vm.runInNewContext(helper[0],sandbox);

const rows=[
{name:"A",bonusPoints:0,rank:1},
{name:"B",bonusPoints:5,rank:2},
{name:"C",bonusPoints:5,rank:3},
{name:"D",bonusPoints:0,rank:4}
];
const out=sandbox.rankBonusRows(rows);
assert.strictEqual(JSON.stringify(out.map(x=>x.name)),JSON.stringify(["B","C","A","D"]));
assert.strictEqual(JSON.stringify(out.map(x=>x.rank)),JSON.stringify([1,1,3,3]));
assert.strictEqual(JSON.stringify(out.map(x=>x.bonusPoints)),JSON.stringify([5,5,0,0]));
console.log("OK: Pagination und Bonus-Rangbildung geschützt.");
