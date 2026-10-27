import assert from 'node:assert/strict';
import {diagnoseMissingPair} from './offizielle-quellen-browser.mjs';
const alias={'fc-liverpool':['Liverpool'],'manchester-united':['Man Utd'],'manchester-city':['Man City']};
const game={heimTeamId:'fc-liverpool',auswaertsTeamId:'manchester-united'};
const fixtures=[
 {heim:'Man Utd',gast:'Liverpool',datum:'2026-11-22',anstoss:'17:30',startDate:'2026-11-22T16:30:00Z',provider:'premierleague-fpl'},
 {heim:'Man City',gast:'Liverpool',datum:'2027-05-08',anstoss:'16:00',startDate:'2027-05-08T14:00:00Z'}
];
const missing=diagnoseMissingPair(game,fixtures,alias);
assert.equal(missing.gefundenExakt,0);
assert.equal(missing.gefundenRueckspiel,1);
assert.equal(missing.begegnungen[0].heim,'Man Utd');
assert.equal(missing.hinweis,'NICHT_VON_OFFIZIELLEM_SPIELPLAN_BESTAETIGT');
assert.equal(missing.teamSpiele,2);
const found=diagnoseMissingPair(game,[{heim:'Liverpool',gast:'Man Utd',datum:'2026-11-22',anstoss:'17:30',startDate:'2026-11-22T16:30:00Z'}],alias);
assert.equal(found.gefundenExakt,1);
assert.equal(found.gefundenRueckspiel,0);
assert.equal(found.hinweis,'EXAKTE_BEGEGNUNG_GEFUNDEN');
const empty=diagnoseMissingPair(game,[],alias);
assert.equal(empty.teamSpiele,0);
console.log('TEST12: 9 assertions PASS');
