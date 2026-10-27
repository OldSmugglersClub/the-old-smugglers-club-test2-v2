import assert from 'node:assert/strict';
import fs from 'node:fs';
import {compare} from './offizielle-quellen.mjs';
const cfg=JSON.parse(fs.readFileSync(new URL('../terminwaechter/offizielle-quellen.json', import.meta.url),'utf8'));
const aliases=cfg.teamAliase;
const fixtures=[
  {heim:'Milan',gast:'Internazionale',datum:'2026-10-31',anstoss:'20:45'},
  {heim:'Inter',gast:'Juventus',datum:'2027-01-10',anstoss:'20:45'},
  {heim:'Bologna FC 1909',gast:'Juventus FC',datum:'2027-01-03',anstoss:'20:45'}
];
const gm=(h,a,d,t)=>({heimTeamId:h,auswaertsTeamId:a,datum:d,anstoss:t});
const m=compare(gm('ac-mailand','inter-mailand','2026-11-01','18:30'),fixtures,aliases);
assert.equal(m.status,'ABWEICHUNG'); assert.equal(m.amtlich.datum,'2026-10-31');
assert.equal(compare(gm('inter-mailand','juventus-turin','2027-01-10','20:45'),fixtures,aliases).status,'IDENTISCH');
assert.equal(compare(gm('fc-bologna','juventus-turin','2027-01-03','20:45'),fixtures,aliases).status,'IDENTISCH');
assert.equal(compare(gm('juventus-turin','inter-mailand','2027-01-10','20:45'),fixtures,aliases).status,'KEIN_EINDEUTIGES_SPIEL');
assert.equal(compare(gm('ac-mailand','inter-mailand','2026-11-01','18:30'),[...fixtures,{...fixtures[0],datum:'2026-11-01'}],aliases).status,'MEHRDEUTIG');
assert.equal(compare(gm('ac-mailand','inter-mailand','2026-11-01','18:30'),[],aliases).status,'KEIN_EINDEUTIGES_SPIEL');
console.log('TEST10: 6/6 alias, mismatch, correct, reversal, ambiguity and missing-source cases PASS');
