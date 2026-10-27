// TEST7: read-only official-site browser probe. Never writes site data or ranks.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {parseStructuredFixtures,parseEmbeddedFixtures,DOMAINS,compare} from './offizielle-quellen.mjs';
import {providerForUrl,decodeOfficial} from './offizielle-liga-adapter.mjs';
import {fetchFplFixtures} from './offizielle-premierleague-fpl.mjs';
const root=path.resolve(process.env.TOSMC_ROOT||'.');
const out=path.resolve(process.env.TOSMC_OFFICIAL_OUT||'terminwaechter-bericht');
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const arr=x=>Array.isArray(x)?x:x?[x]:[];
function tzDate(s){if(typeof s!=='string'|| !/^\d{4}-\d\d-\d\dT\d\d:\d\d(?::\d\d(?:\.\d+)?)?(?:Z|[+-]\d\d:\d\d)$/.test(s))return null;const d=new Date(s);if(!Number.isFinite(d.getTime()))return null;const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(d).map(x=>[x.type,x.value]));return {datum:`${p.year}-${p.month}-${p.day}`,anstoss:`${p.hour}:${p.minute}`};}
// Accept only a full tuple of two named teams and an offset-aware instant.
export function fixturesFromJson(json){const out=[],seen=new Set();let count=0;
 const name=x=>typeof x==='string'?x:(x?.name||x?.displayName||x?.teamName||x?.shortName||x?.fullName);
 function visit(x,depth=0){if(!x||typeof x!=='object'||depth>20||++count>120000)return;
  if(Array.isArray(x)){for(const v of x.slice(0,10000))visit(v,depth+1);return;}
  const home=name(x.homeTeam??x.home_team??x.home??x.teamHome??x.homeParticipant);
  const away=name(x.awayTeam??x.away_team??x.away??x.teamAway??x.awayParticipant);
  const iso=x.startDate??x.kickoffTime??x.kickoff??x.utcDate??x.matchDateTimeUTC??x.dateTime??x.startTime??x.kickOffTime;
  const time=tzDate(iso);
  if(typeof home==='string'&&typeof away==='string'&&time){const k=norm(home)+'|'+norm(away)+'|'+iso;if(!seen.has(k)){out.push({heim:home,gast:away,...time,startDate:iso});seen.add(k);}}
  for(const [k,v] of Object.entries(x))if(v&&typeof v==='object'&&!/^(news|articles|stories|posts|comments|statistics|players)$/i.test(k))visit(v,depth+1);
 }visit(json);return out;
}
export function trustResponse(pageUrl,responseUrl,allowed){try{const u=new URL(responseUrl),p=new URL(pageUrl);return u.protocol==='https:' && allowed.some(d=>u.hostname===d||u.hostname.endsWith('.'+d)) && (u.hostname===p.hostname||allowed.some(d=>p.hostname===d||p.hostname.endsWith('.'+d)));}catch{return false;}}
export function dedupe(fixtures){const map=new Map();for(const f of fixtures)map.set(norm(f.heim)+'|'+norm(f.gast)+'|'+f.startDate,f);return [...map.values()];}
// Evidence-only diagnosis: do not substitute a reverse fixture for the desired pairing.
export function diagnoseMissingPair(game,fixtures,aliases={}){
 const alias=id=>[id,...arr(aliases[id])].map(norm).filter(Boolean);
 const h=alias(game.heimTeamId),a=alias(game.auswaertsTeamId);
 const matches=fixtures.filter(f=>h.includes(norm(f.heim))||h.includes(norm(f.gast))||a.includes(norm(f.heim))||a.includes(norm(f.gast)));
 const exact=matches.filter(f=>h.includes(norm(f.heim))&&a.includes(norm(f.gast)));
 const reverse=matches.filter(f=>a.includes(norm(f.heim))&&h.includes(norm(f.gast)));
 const focus=[...new Map([...exact,...reverse].map(f=>[norm(f.heim)+'|'+norm(f.gast)+'|'+f.startDate,f])).values()];
 return {gefundenExakt:exact.length,gefundenRueckspiel:reverse.length,begegnungen:focus.slice(0,4).map(f=>({heim:f.heim,gast:f.gast,datum:f.datum,anstoss:f.anstoss,provider:f.provider||null})),teamSpiele:matches.length,hinweis:exact.length?'EXAKTE_BEGEGNUNG_GEFUNDEN':'NICHT_VON_OFFIZIELLEM_SPIELPLAN_BESTAETIGT'};
}
export async function run({browserFactory,config,siteGames,timeout=25000}={}){
 const cfg=config||JSON.parse(fs.readFileSync(path.join(root,'terminwaechter/offizielle-quellen.json'),'utf8'));
 const data=siteGames||JSON.parse(fs.readFileSync(path.join(root,'spieldaten.json'),'utf8'));
 if(cfg.datenVersionErwartet!==undefined&&String(cfg.datenVersionErwartet)!==String(data.datenVersion))throw Error('DATENVERSION_ABWEICHEND');
 const games=data.saisons.flatMap(x=>x.spiele||[]);const byId=new Map(games.map(x=>[x.id,x]));
 const factory=browserFactory||(async()=>{const {chromium}=await import('playwright');return chromium.launch({headless:true,args:['--no-sandbox']});});
 const browser=await factory();const report={zeit:new Date().toISOString(),datenVersion:data.datenVersion,modus:'BROWSER_READ_ONLY',quellen:[],befunde:[],automatischeAenderung:false};
 try{for(const src of cfg.quellen){if(!arr(src.spielIds).length){report.quellen.push({name:src.name,status:'NOCH_KEINE_TOSMC_EINZELSPIELE'});continue;}
  const allowed=DOMAINS[src.verband]||[];if(!trustResponse(src.url,src.url,allowed)){report.quellen.push({name:src.name,status:'DOMAIN_NICHT_FREIGEGEBEN'});continue;}
  const context=await browser.newContext({serviceWorkers:'block',acceptDownloads:false});const page=await context.newPage();const fixtures=[];const endpoints=[];const schemaBefunde=[];const antwortDiagnose=[];let pending=[];let offizielleFpl=null;let relevanteAntworten=0;
  page.on('response',r=>{const u=r.url();if(!trustResponse(src.url,u,allowed))return;const ct=r.headers()['content-type']||'';if(!/json/i.test(ct))return;const provider=providerForUrl(u);const relevant=Boolean(provider)||/\/(?:fixtures|calendar|matches|events|rounds)(?:\/|$)/i.test(new URL(u).pathname);if(relevant?relevanteAntworten++>=25:endpoints.length-relevanteAntworten>=45)return;
   endpoints.push({host:new URL(u).hostname,pfad:new URL(u).pathname.slice(0,180),http:r.status()});
   pending.push((async()=>{const pfad=new URL(u).pathname.slice(0,180);const isMatch=/\/api\/v1\/competition\/matches(?:\/|$)/i.test(pfad);
    try{if(r.status()!==200){if(isMatch)antwortDiagnose.push({pfad,status:'HTTP_'+r.status()});return;}
     const body=await r.body();if(body.length>(provider==='portugal'&&isMatch?6_000_000:2_000_000)){if(isMatch)antwortDiagnose.push({pfad,status:'ANTWORT_ZU_GROSS',bytes:body.length});return;}
     let obj;try{obj=JSON.parse(body.toString('utf8'));}catch(e){if(isMatch)antwortDiagnose.push({pfad,status:'KEIN_GUELTIGES_JSON',bytes:body.length,fehler:String(e.message).slice(0,100)});return;}
     if(isMatch)antwortDiagnose.push({pfad,status:'JSON_GELESEN',bytes:body.length,typ:Array.isArray(obj)?'array':typeof obj,obersteFelder:obj&&typeof obj==='object'&&!Array.isArray(obj)?Object.keys(obj).slice(0,25):[],arrayLaenge:Array.isArray(obj)?obj.length:null});
     if(provider){const decoded=decodeOfficial(provider,obj);fixtures.push(...decoded.fixtures);schemaBefunde.push({pfad,...decoded.diagnosis});}else{fixtures.push(...fixturesFromJson(obj));}
    }catch(e){if(isMatch)antwortDiagnose.push({pfad,status:'ANTWORT_FEHLER',fehler:String(e.message).slice(0,120)});}})());});
  try{await page.goto(src.url,{waitUntil:'domcontentloaded',timeout});await page.waitForTimeout(4500);const html=await page.content();fixtures.push(...parseStructuredFixtures(html),...parseEmbeddedFixtures(html));await Promise.allSettled(pending);
   if(src.verband==='england'){try{const fpl=await fetchFplFixtures();fixtures.push(...fpl);offizielleFpl={status:'OK',anzahl:fpl.length,quelle:'https://fantasy.premierleague.com/api/fixtures/'};}catch(e){offizielleFpl={status:'FEHLER',grund:String(e?.message||e).slice(0,180)};}}
   const clean=dedupe(fixtures);
   // Limited fixture evidence for the three Italian TOSMC matches; read-only, no whole-season dump.
   const italienBelege=src.verband==='italien'?clean.filter(f=>/milan|mailand|internaz|inter|juvent|bologna/i.test(f.heim+' '+f.gast)).slice(0,100).map(f=>({heim:f.heim,gast:f.gast,datum:f.datum,anstoss:f.anstoss})):[];
   report.quellen.push({name:src.name,status:clean.length?'SPIELE_EXTRAHIERT':'KEINE_SPIELE_EXTRAHIERT',anzahl:clean.length,antworten:endpoints,schemaBefunde,antwortDiagnose,italienBelege,offizielleFpl,seite:page.url()});
   for(const id of src.spielIds){const g=byId.get(id);if(!g){report.befunde.push({spielId:id,status:'SPIEL_FEHLT'});continue;}if(g.status==='beendet')continue;
    const decision=compare(g,clean,cfg.teamAliase||{});
    report.befunde.push({spielId:id,quelle:src.url,...decision,...(decision.status==='KEIN_EINDEUTIGES_SPIEL'&&src.verband==='england'?{paarungsDiagnose:diagnoseMissingPair(g,clean,cfg.teamAliase||{})}:{})});}
  }catch(e){report.quellen.push({name:src.name,status:'BROWSER_FEHLER',fehler:String(e.message).slice(0,220),antworten:endpoints,schemaBefunde});for(const id of src.spielIds)report.befunde.push({spielId:id,status:'BROWSER_FEHLER'});}
  finally{await context.close();}
 }}finally{await browser.close();}
 report.verifiziert=report.befunde.filter(x=>['IDENTISCH','ABWEICHUNG'].includes(x.status)).length;
 report.status=report.verifiziert===report.befunde.length&&report.befunde.length>0?'GEPRUEFT':'UNVOLLSTAENDIG';
 fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'BROWSER_QUELLEN_BERICHT.json'),JSON.stringify(report,null,2)+'\n');
 fs.writeFileSync(path.join(out,'BROWSER_QUELLEN_BERICHT.md'),['# TOSMC offizieller Browser-Quellencheck',`Stand: ${report.zeit}`,`Verifiziert: ${report.verifiziert}/${report.befunde.length}`,`Status: ${report.status}`,'',...report.quellen.map(x=>`- ${x.name}: ${x.status}; erkannte Spiele: ${x.anzahl||0}; JSON-Antworten: ${x.antworten?.length||0}`),'',...report.befunde.map(x=>`- ${x.spielId}: ${x.status}${x.amtlich?' – '+x.amtlich.datum+' '+x.amtlich.anstoss:''}`),'','Keine Website-Dateien geändert.'].join('\n')+'\n');return report;
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url)run().then(x=>{console.log(JSON.stringify({status:x.status,verifiziert:x.verifiziert,quellen:x.quellen},null,2));if(x.status!=='GEPRUEFT')process.exitCode=2;}).catch(e=>{console.error(e);process.exitCode=1;});
