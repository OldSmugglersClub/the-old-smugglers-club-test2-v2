import assert from 'node:assert/strict';
import {parseFplFixtures,fetchFplFixtures} from './offizielle-premierleague-fpl.mjs';
const teams={teams:[{id:1,name:'Liverpool'},{id:2,name:'Manchester United'},{id:3,name:'Manchester City'}]};
const games=[{id:123,team_h:1,team_a:2,kickoff_time:'2026-11-22T16:30:00Z'},{id:124,team_h:3,team_a:1,kickoff_time:'2027-04-05T15:30:00Z'}];
let r=parseFplFixtures(games,teams);
assert.equal(r.length,2);assert.equal(r[0].datum,'2026-11-22');assert.equal(r[0].anstoss,'17:30');
assert.equal(r[1].anstoss,'17:30'); // DST in April, +2
assert.equal(r[0].heim,'Liverpool');assert.equal(r[0].gast,'Manchester United');
assert.equal(parseFplFixtures([...games,games[0]],teams).length,2);
assert.equal(parseFplFixtures([{team_h:1,team_a:2,kickoff_time:'2026-11-22T17:30:00'}],teams).length,0);
assert.equal(parseFplFixtures([{team_h:99,team_a:2,kickoff_time:'2026-11-22T16:30:00Z'}],teams).length,0);
assert.throws(()=>parseFplFixtures(games,{teams:[teams.teams[0],teams.teams[0]]}),/DOPPELT/);
assert.throws(()=>parseFplFixtures({},teams),/SCHEMA/);
let count=0;const mock=async url=>{count++;return {ok:true,json:async()=>url.includes('bootstrap')?teams:games}};
r=await fetchFplFixtures(mock);assert.equal(count,2);assert.deepEqual(r.map(x=>x.heim),['Liverpool','Manchester City']);
await assert.rejects(fetchFplFixtures(async()=>({ok:false,status:403})),/HTTP_403/);
console.log('TEST11: 9/9 Schutztests bestanden');
