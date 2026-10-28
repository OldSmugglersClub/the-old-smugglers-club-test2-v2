// TEST23: focused, continuously repeated evidence collection for the 2 unresolved fixtures.
// READ-ONLY. No fixture proposal, no website writes, no git/PR operations.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

export const SOURCES = Object.freeze({
  portugal: {spielId:'wr-2026-27-02',url:'https://www.ligaportugal.pt/match/20262027/ligaportugalbetclic/16/8'},
  frankreich: {spielId:'pk-2026-27-05-le-classique',url:'https://ligue1.com/en/calendar/ligue1'}
});
const compact=x=>String(x||'').normalize('NFKC').replace(/\s+/g,' ').trim();
const validTime=t=>/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(t);
const localDate=d=>/^\d{4}-\d\d-\d\d$/.test(d)&&!Number.isNaN(Date.parse(d+'T12:00:00Z'));

// The official Portuguese match detail page displays the match header as:
// "SL Benfica [form] dom. 27 dez -- -- Sporting CP" while kickoff is pending.
// The exact match header is required to avoid picking up times in unrelated games/videos.
// Do NOT read a date or time from the site's generic fixtures or sidebar sections.
export function readPortugalMatchHeader(raw, source=SOURCES.portugal){
 const text=compact(raw), h=text.search(/\bSL Benfica\b/i);
 if(h<0)return {status:'SPIELKOPF_NICHT_GEFUNDEN',datum:null,anstoss:null};
 const between=text.slice(h,h+500);
 const away=between.search(/\bSporting CP\b/i);
 if(away<0)return {status:'PAARUNG_NICHT_EINDEUTIG',datum:null,anstoss:null};
 const header=between.slice(0,away);
 const dateMatches=[...header.matchAll(/\b(?:dom\.?|domingo)\s*27\s*(?:de\s*)?(?:dez|dezembro)\b/gi)];
 if(dateMatches.length!==1)return {status:'DATUM_NICHT_EINDEUTIG',datum:null,anstoss:null};
 // Strict season in match URL, only this season/pair/date is supported until generalized.
 if(!/\/match\/20262027\/ligaportugalbetclic\/16\/8(?:\/?(?:\?|$))/.test(source.url))return {status:'SPIELURL_NICHT_VERIFIZIERT',datum:null,anstoss:null};
 const tail=header.slice(dateMatches[0].index+dateMatches[0][0].length).trim();
 // Match header may have placeholder '-- --'; never treat unrelated numbers as kickoff.
 if(/^--\s*--(?:\s|$)/.test(tail))return {status:'DATUM_BESTAETIGT_ANSTOSS_OFFEN',datum:'2026-12-27',anstoss:null};
 const m=tail.match(/^(?:às\s*)?(\d{1,2})(?::|h)(\d{2})\b/i);
 if(!m)return {status:'DATUM_BESTAETIGT_ANSTOSS_NICHT_AUSLESBAR',datum:'2026-12-27',anstoss:null};
 const hh=String(m[1]).padStart(2,'0')+':'+m[2];
 if(!validTime(hh))return {status:'ANSTOSS_UNGUELTIG',datum:'2026-12-27',anstoss:null};
 // Portugal mainland local time differs from Berlin by 1 hour in Dec.
 // Convert with explicit Lisbon and Berlin IANA zones (no arbitrary UTC guess).
 const iso=new Date('2026-12-27T'+hh+':00Z');
 if(!Number.isFinite(iso.getTime()))return {status:'ANSTOSS_UNGUELTIG',datum:'2026-12-27',anstoss:null};
 const pt = new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Lisbon',hour:'2-digit',hourCycle:'h23'}).format(iso);
 // On Dec 27 Lisbon == UTC. Validate before using.
 if(pt!==hh.slice(0,2))return {status:'ZEITZONE_NICHT_EINDEUTIG',datum:'2026-12-27',anstoss:null};
 const dt=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(iso);
 const p=Object.fromEntries(dt.map(x=>[x.type,x.value]));
 return {status:'OFFIZIELLER_SPIELKOPF_MIT_VOLLSTAENDIGEM_TERMIN',datum:`${p.year}-${p.month}-${p.day}`,anstoss:`${p.hour}:${p.minute}`,lokaleAnstosszeitPortugal:hh,automatischFreigabefaehig:false};
}

export function reconcile({games,sonder,browser,portugalPage}){
 if(!Array.isArray(games)||!sonder||sonder.automaticModification!==false||!Array.isArray(sonder.findings)||browser?.automatischeAenderung!==false||!Array.isArray(browser.befunde))throw Error('QUELLENBERICHT_UNGUELTIG');
 const out={schema:'TEST23',modus:'READ_ONLY_QUELLENSTATUS',datum:new Date().toISOString(),automatischeAenderung:false,automatischFreigabefaehig:false,spiele:[]};
 for(const [country,source] of Object.entries(SOURCES)){
  const game=games.find(x=>x.id===source.spielId);
  const finding=sonder.findings.find(x=>x.spielId===source.spielId);
  const b=browser.befunde.find(x=>x.spielId===source.spielId);
  if(!game||!finding||!b||!localDate(game.datum)||!validTime(game.anstoss))throw Error('UEBERWACHUNG_LUECKE_'+country);
  // Even if a future report recognizes a full tuple, it must go through the existing
  // official browser verifier and the guarded TEST18-20 process before a change.
  const detail=country==='portugal'?readPortugalMatchHeader(portugalPage||''):null;
  const status=b.status==='IDENTISCH'?'IDENTISCH_BESTAETIGT':b.status==='ABWEICHUNG'?'BROWSER_ABWEICHUNG_ZUR_MANUELLEN_PRUEFUNG':
      country==='portugal'&&detail?.status==='OFFIZIELLER_SPIELKOPF_MIT_VOLLSTAENDIGEM_TERMIN'?'NEUE_OFFIZIELLE_UHRZEIT_ZUR_QUELLENPRUEFUNG':
      country==='portugal'&&detail?.status==='DATUM_BESTAETIGT_ANSTOSS_OFFEN'?'ANSTOSS_OFFEN_WEITER_UEBERWACHEN':'WEITER_UEBERWACHEN';
  out.spiele.push({spielId:source.spielId,quelle:source.url,websiteBestand:{datum:game.datum,anstoss:game.anstoss},browserStatus:b.status,sonderquellenStatus:finding.status,detailStatus:detail?.status||null,
   hinweis:country==='frankreich'?'Saisonankündigung allein ist keine aktuelle Live-Bestätigung.':country==='portugal'?'Amtlichen Spielkopf wiederholt prüfen; ohne vollständige Zeit keine Korrektur.':'',
   moeglicherNeuerTermin:country==='portugal'&&detail?.status==='OFFIZIELLER_SPIELKOPF_MIT_VOLLSTAENDIGEM_TERMIN'?{datum:detail.datum,anstoss:detail.anstoss}:null,
   status,korrekturFreigabe:false,bestandUnveraendert:true});
 }
 return out;
}

export async function run({browserFactory,root='.',out='terminwaechter-bericht'}={}){
 const data=JSON.parse(fs.readFileSync(path.join(root,'spieldaten.json'),'utf8'));
 const sonder=JSON.parse(fs.readFileSync(path.join(out,'SONDERQUELLEN_TEST16.json'),'utf8'));
 const browser=JSON.parse(fs.readFileSync(path.join(out,'BROWSER_QUELLEN_BERICHT.json'),'utf8'));
 const factory=browserFactory||(async()=>{const {chromium}=await import('playwright');return chromium.launch({headless:true,args:['--no-sandbox']});});
 const driver=await factory();let portugalPage='',error=null;
 try{const context=await driver.newContext({serviceWorkers:'block',acceptDownloads:false});
  try{const page=await context.newPage();await page.goto(SOURCES.portugal.url,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForTimeout(1800);
   if(new URL(page.url()).hostname!==new URL(SOURCES.portugal.url).hostname)throw Error('UNERWARTETE_WEITERLEITUNG');
   portugalPage=await page.locator('body').innerText({timeout:10000});if(portugalPage.length>1_000_000)throw Error('QUELLENTEXT_ZU_GROSS');
  }finally{await context.close();}
 }catch(e){error=String(e.message).slice(0,180);}finally{await driver.close();}
 const report=reconcile({games:data.saisons.flatMap(x=>x.spiele||[]),sonder,browser,portugalPage});
 if(error)report.portugalAbrufFehler=error;
 fs.mkdirSync(out,{recursive:true});
 fs.writeFileSync(path.join(out,'TEST23_QUELLENSTATUS.json'),JSON.stringify(report,null,2)+'\n');
 fs.writeFileSync(path.join(out,'TEST23_QUELLENSTATUS.md'),['# TEST23 – Quellenstatus Frankreich und Portugal','',...report.spiele.map(x=>`- ${x.spielId}: ${x.status} / ${x.detailStatus||'kein Detail'}; Website unverändert: ${x.websiteBestand.datum} ${x.websiteBestand.anstoss}`),'','Keine automatische Korrektur, keine Git-Änderung, keine LIVE-Freigabe.'].join('\n')+'\n');
 console.log('TEST23:',report.spiele.map(x=>x.spielId+'='+x.status).join('; '));return report;
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url)run().catch(e=>{console.error('TEST23 TECHNISCHER_FEHLER',e.message);process.exitCode=1;});
