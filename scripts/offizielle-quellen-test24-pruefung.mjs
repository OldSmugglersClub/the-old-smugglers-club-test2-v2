// TEST24: targeted official evidence checks, strictly READ-ONLY.
// No proposal promotion, no site writes, no Github changes.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {readPortugalMatchHeader,SOURCES} from './offizielle-quellen-test23-quellenstatus.mjs';
const S={fr:'pk-2026-27-05-le-classique',pt:'wr-2026-27-02'};
const PROG=/^https:\/\/ligue1\.com\/(?:en|fr)\/articles\//;
const clean=s=>String(s||'').normalize('NFKC').replace(/\s+/g,' ').trim();
const valid=d=>/^\d{4}-\d\d-\d\d$/.test(d)&&!Number.isNaN(Date.parse(d+'T12:00:00Z'));
const time=t=>/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(t);
function ymd(y,m,d){const s=`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;return valid(s)?s:null;}
const MONTH={janvier:1,fevrier:2,février:2,mars:3,avril:4,mai:5,juin:6,juillet:7,aout:8,août:8,septembre:9,octobre:10,novembre:11,decembre:12,décembre:12,january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12};
// Parse a match-specific broadcaster/programming line, not a whole-page date or sidebar timestamp.
export function frenchFixtureEvidence(raw,{url,kind='programming'}={}){
 if(!PROG.test(url||'')||kind!=='programming')return {status:'KEINE_AKTUELLE_PROGRAMMIERQUELLE',datum:null,anstoss:null};
 const text=clean(raw);const lines=String(raw||'').split(/\n+/).map(clean).filter(Boolean);
 const pair=/(?:paris saint[- ]germain|psg)\s*[–—-]\s*(?:olympique de marseille|om)(?![a-z])/i;
 const found=lines.filter(l=>pair.test(l));
 if(found.length!==1)return {status:found.length?'MEHRDEUTIGE_SPIELNENNUNG':'PAARUNG_NICHT_GEFUNDEN',datum:null,anstoss:null};
 const ix=lines.indexOf(found[0]); const nearby=lines.slice(Math.max(0,ix-2),Math.min(lines.length,ix+2));
 // Never combine a match with another match's kickoff; date/time must be on its own line
 // or an immediately preceding scheduling heading that contains no other pairing.
 const candidates=[found[0],lines[ix-1]||''].filter(l=>!/(?:\s[–—-]\s).*(?:\s[–—-]\s)/.test(l));
 const tuples=[];
 for(const l of candidates){
  const m=l.match(/\b(\d{1,2})\s+(janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre|january|february|march|april|may|june|july|august|september|october|november|december)\s+(20\d{2})\b/i);
  const h=l.match(/(?:à|at)\s*(\d{1,2})(?:h|:)(\d{2})\b/i);
  if(m&&h){const d=ymd(Number(m[3]),MONTH[m[2].toLowerCase()],Number(m[1]));const t=String(h[1]).padStart(2,'0')+':'+h[2];if(d&&time(t))tuples.push({datum:d,anstoss:t});}
 }
 if(tuples.length!==1)return {status:'VOLLSTAENDIGER_PROGRAMMTERMIN_FEHLT',datum:null,anstoss:null};
 // Editorial scheduling publications may still have reservations. They remain diagnosis only.
 const conditional=/sous r[eé]serve|subject to|provisional|susceptible de modification/i.test(text);
 return {status:conditional?'PROGRAMMIERHINWEIS_MIT_VORBEHALT':'PROGRAMMIERHINWEIS_ZUR_KREUZPRUEFUNG',...tuples[0],quelle:url,automatischFreigabefaehig:false};
}
export function buildAudit({games,monitor,france,portugal,fetchErrors=[]}){
 if(!Array.isArray(games)||monitor?.automatischeAenderung!==false||!Array.isArray(monitor.spiele))throw Error('MONITOR_UNGUELTIG');
 const records=[];
 for(const [key,id,evidence] of [['frankreich',S.fr,france],['portugal',S.pt,portugal]]){
  const game=games.find(g=>g.id===id),row=monitor.spiele.find(g=>g.spielId===id);
  if(!game||!row||!valid(game.datum)||!time(game.anstoss)||row.websiteBestand?.datum!==game.datum||row.websiteBestand?.anstoss!==game.anstoss)throw Error('BESTANDSABGLEICH_FEHLER_'+id);
  const full=valid(evidence?.datum)&&time(evidence?.anstoss);
  const exact=full&&game.datum===evidence.datum&&game.anstoss===evidence.anstoss;
  records.push({spielId:id,land:key,websiteBestand:{datum:game.datum,anstoss:game.anstoss},quellenStatus:evidence?.status||'NICHT_GEFUNDEN',quellenTermin:full?{datum:evidence.datum,anstoss:evidence.anstoss}:null,beurteilung:!full?'WEITER_UEBERWACHEN_BESTAND_BLEIBT':exact?'HINWEIS_STIMMT_MIT_BESTAND_UEBEREIN':'HINWEIS_ERFORDERT_UNABHAENGIGE_BESTAETIGUNG',automatischFreigabefaehig:false,bestandUnveraendert:true});
 }
 return {schema:'TEST24',modus:'NUR_QUELLEN_DIAGNOSE',zeit:new Date().toISOString(),anzahlUeberwacht:2,automatischeAenderung:false,automatischeFreigabe:false,liveFreigabe:false,fehler:fetchErrors,spiele:records};
}
export async function run({browserFactory,root='.',reportDir='terminwaechter-bericht'}={}){
 const data=JSON.parse(fs.readFileSync(path.join(root,'spieldaten.json'),'utf8'));
 const monitor=JSON.parse(fs.readFileSync(path.join(reportDir,'TEST22_UEBERWACHUNG.json'),'utf8'));
 const factory=browserFactory||(async()=>{const {chromium}=await import('playwright');return chromium.launch({headless:true,args:['--no-sandbox']});});
 const browser=await factory();const errors=[];
 const load=async url=>{let context;try{context=await browser.newContext({serviceWorkers:'block',acceptDownloads:false});const page=await context.newPage();await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForTimeout(900);if(new URL(page.url()).hostname!==new URL(url).hostname)throw Error('WEITERLEITUNG');const txt=await page.locator('body').innerText({timeout:10000});if(txt.length>500000)throw Error('TEXT_ZU_GROSS');return txt;}catch(e){errors.push({url,grund:String(e.message).slice(0,150)});return '';}finally{await context?.close();}};
 // Current French publication is an explicit evidence input, not an authorization to change dates.
 const frenchUrl='https://ligue1.com/fr/articles/l1_article_5284-';
 let frenchText='',ptText='';try{frenchText=await load(frenchUrl);ptText=await load(SOURCES.portugal.url);}finally{await browser.close();}
 const france=frenchFixtureEvidence(frenchText,{url:frenchUrl,kind:'programming'});
 const portugal=readPortugalMatchHeader(ptText,SOURCES.portugal);
 const report=buildAudit({games:data.saisons.flatMap(x=>x.spiele||[]),monitor,france,portugal,fetchErrors:errors});
 fs.mkdirSync(reportDir,{recursive:true});fs.writeFileSync(path.join(reportDir,'TEST24_QUELLENABGLEICH.json'),JSON.stringify(report,null,2)+'\n');
 fs.writeFileSync(path.join(reportDir,'TEST24_QUELLENABGLEICH.md'),['# TEST24: Frankreich/Portugal – Quellendiagnose, ohne Terminänderung','',...report.spiele.map(x=>`- ${x.spielId}: ${x.quellenStatus}; ${x.beurteilung}; Website bleibt ${x.websiteBestand.datum} ${x.websiteBestand.anstoss}`),'',`Abruffehler: ${errors.length}`,'','Keine Einspielung und keine Freigabe. Vollständige neue Termine benötigen unabhängige Bestätigung durch offizielle Spielplandaten und TEST2v2-Freigabe.'].join('\n')+'\n');
 console.log('TEST24:',report.spiele.map(x=>x.spielId+'='+x.quellenStatus).join('; '));return report;
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url)run().catch(e=>{console.error('TEST24 FEHLER:',e.message);process.exitCode=1;});
