// TEST16: supplementary read-only diagnostics, not a source for automatic website updates.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const SOURCES = [
 {id:'pk-2026-27-05-le-classique',country:'frankreich',url:'https://ligue1.com/en/articles/l1_article_5292-'},
 {id:'wr-2026-27-02',country:'portugal',url:'https://www.ligaportugal.pt/match/20262027/ligaportugalbetclic/16/8'}
];
export function normalizeText(s){return String(s||'').normalize('NFKC').replace(/\s+/g,' ').trim();}
export function assessOfficialText(source,raw){
 const s=normalizeText(raw),low=s.toLowerCase();
 if(source.country==='frankreich'){
  const heading=/2026\s*[\/-]\s*2027|2026\s*[\/-]\s*27/.test(s);
  // The dated seasonal announcement establishes a provisional fixture, NOT a live rescheduling feed.
  const exact=/paris saint-germain\s+(?:vs\.?|v\.?|[-–])\s+olympique de marseille\s*,?\s*sunday,?\s*february\s+7\s+at\s+8(?::|\.)45\s*p\.?m\.?/i.test(s);
  return {status:heading&&exact?'OFFIZIELLE_SAISONANKUENDIGUNG':'NICHT_EINDEUTIG_AUSLESBAR',spielId:source.id,datum:heading&&exact?'2027-02-07':null,anstoss:heading&&exact?'20:45':null,quelle:source.url,automatischFreigabefaehig:false,hinweis:'Saisonankündigung kann nachträglich überholt sein; keine Live-Terminkorrektur oder automatische Freigabe.'};
 }
 if(source.country==='portugal'){
  const pair=low.includes('sl benfica')&&low.includes('sporting cp');
  const date=/\b(?:dom\.?\s*27\s*dez|27\s*(?:de\s*)?dezembro|27\s*dec)\b/i.test(s);
  const unset=/--\s*--/.test(s);
  return {status:pair&&date&&unset?'OFFIZIELL_DATUM_UHRZEIT_OFFEN':pair&&date?'DATUM_ERKANNT_UHRZEIT_NICHT_AUTOMATISCH_VERIFIZIERT':'NICHT_EINDEUTIG_AUSLESBAR',spielId:source.id,datum:pair&&date?'2026-12-27':null,anstoss:null,quelle:source.url,automatischFreigabefaehig:false,hinweis:'Ohne explizite und eindeutige Anstoßzeit keine automatische Website-Korrektur.'};
 }
 throw new Error('NICHT_UNTERSTUETZTE_QUELLE');
}
export async function run({browserFactory,outputDir='terminwaechter-bericht'}={}){
 const factory=browserFactory||(async()=>{const {chromium}=await import('playwright');return chromium.launch({headless:true,args:['--no-sandbox']});});
 const browser=await factory();const report={schema:'TEST16',mode:'READ_ONLY_ZUSATZDIAGNOSE',createdAt:new Date().toISOString(),automaticModification:false,findings:[]};
 try{
  for(const source of SOURCES){let page;
   try{
    const context=await browser.newContext({serviceWorkers:'block',acceptDownloads:false});page=await context.newPage();
    await page.goto(source.url,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForTimeout(2500);
    if(new URL(page.url()).hostname!==new URL(source.url).hostname)throw Error('UNERWARTETE_WEITERLEITUNG');
    const raw=await page.locator('body').innerText({timeout:10000});
    if(raw.length>1500000)throw Error('SEITENTEXT_ZU_GROSS');
    report.findings.push(assessOfficialText(source,raw));
    await context.close();page=null;
   }catch(e){report.findings.push({spielId:source.id,quelle:source.url,status:'ABRUF_ODER_PARSER_FEHLER',grund:String(e?.message||e).slice(0,200),automatischFreigabefaehig:false});if(page)await page.context().close().catch(()=>{});}
  }
 }finally{await browser.close();}
 fs.mkdirSync(outputDir,{recursive:true});fs.writeFileSync(path.join(outputDir,'SONDERQUELLEN_TEST16.json'),JSON.stringify(report,null,2)+'\n');
 fs.writeFileSync(path.join(outputDir,'SONDERQUELLEN_TEST16.md'),['# TEST16 – Ergänzende Quellenprüfung (READ-ONLY)','',...report.findings.map(x=>`- ${x.spielId}: ${x.status}; Datum ${x.datum||'nicht bestätigt'}; Uhrzeit ${x.anstoss||'nicht bestätigt'}`),'','Diese Zusatzdiagnose verändert weder das 9/11-Browserergebnis noch Website-Dateien.'].join('\n')+'\n');return report;
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url)run().then(r=>console.log(JSON.stringify(r.findings,null,2))).catch(e=>{console.error(e);process.exitCode=1;});
