// TEST11: official Premier League Fantasy schedule read-only adapter.
// Source: fantasy.premierleague.com (operated by the Premier League), NOT OpenLigaDB.
const API='https://fantasy.premierleague.com/api/';
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
export function parseFplFixtures(fixtures,bootstrap){
 if(!Array.isArray(fixtures)||!Array.isArray(bootstrap?.teams))throw Error('FPL_SCHEMA_UNGUELTIG');
 const teams=new Map();for(const t of bootstrap.teams){if(!Number.isInteger(t.id)||typeof t.name!=='string'||!t.name.trim())throw Error('FPL_TEAM_UNGUELTIG');if(teams.has(t.id))throw Error('FPL_TEAM_ID_DOPPELT');teams.set(t.id,t.name);}
 const out=[],seen=new Set();for(const f of fixtures){
  if(!Number.isInteger(f.team_h)||!Number.isInteger(f.team_a)||typeof f.kickoff_time!=='string')continue;
  const heim=teams.get(f.team_h),gast=teams.get(f.team_a),iso=f.kickoff_time;
  if(!heim||!gast||heim===gast||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\.[0-9]+)?(?:Z|[+-][0-9]{2}:[0-9]{2})$/.test(iso))continue;
  const date=new Date(iso);if(!Number.isFinite(date.getTime()))continue;
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date).map(p=>[p.type,p.value]));
  const key=normalize(heim)+'|'+normalize(gast)+'|'+iso;if(seen.has(key))continue;seen.add(key);
  out.push({heim,gast,datum:`${parts.year}-${parts.month}-${parts.day}`,anstoss:`${parts.hour}:${parts.minute}`,startDate:iso,provider:'premierleague-fpl',fixtureId:f.id});
 }return out;
}
async function json(url,fetchFn){const r=await fetchFn(url,{headers:{Accept:'application/json'},signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('FPL_HTTP_'+r.status);return r.json();}
export async function fetchFplFixtures(fetchFn=fetch){const [fixtures,bootstrap]=await Promise.all([json(API+'fixtures/',fetchFn),json(API+'bootstrap-static/',fetchFn)]);return parseFplFixtures(fixtures,bootstrap);}
