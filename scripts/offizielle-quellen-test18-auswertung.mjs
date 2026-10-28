// TEST18 – read-only report consolidation. Never writes production/site files.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const EXPECTED=['BROWSER_QUELLEN_BERICHT.json','OFFIZIELLE_QUELLEN_BERICHT.json','SONDERQUELLEN_TEST16.json'];
const statuses=new Set(['IDENTISCH','ABWEICHUNG','KEIN_EINDEUTIGES_SPIEL']);
const isoDate=s=>typeof s==='string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s+'T12:00:00Z'));
const clock=s=>typeof s==='string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(s);
export function consolidate(browser,html,sonder){
 if(!browser||!Array.isArray(browser.befunde)||!Array.isArray(browser.quellen)||typeof browser.verifiziert!=='number')throw Error('BROWSER_BERICHT_UNGUELTIG');
 if(!html||!Array.isArray(html.befunde))throw Error('HTML_BERICHT_UNGUELTIG');
 if(!sonder||!Array.isArray(sonder.findings)||sonder.automaticModification!==false)throw Error('SONDERQUELLEN_BERICHT_UNGUELTIG');
 if(browser.automatischeAenderung!==false||html.automatischeAenderung!==false)throw Error('READ_ONLY_SCHUTZ_VERLETZT');
 const ids=new Set(),vorschlaege=[],unaufgeloest=[],identisch=[];
 for(const item of browser.befunde){
  if(!item||typeof item.spielId!=='string'||ids.has(item.spielId)||typeof item.status!=='string')throw Error('DOPPELTER_ODER_UNGUELTIGER_BEFUND');
  ids.add(item.spielId);
  if(item.status==='ABWEICHUNG'){
   if(!isoDate(item.amtlich?.datum)||!clock(item.amtlich?.anstoss)||!isoDate(item.bisher?.datum)||!clock(item.bisher?.anstoss)||typeof item.quelle!=='string')throw Error('TERMINABWEICHUNG_UNVOLLSTAENDIG');
   vorschlaege.push({spielId:item.spielId,bisher:{datum:item.bisher.datum,anstoss:item.bisher.anstoss},vorschlag:{datum:item.amtlich.datum,anstoss:item.amtlich.anstoss},quelle:item.quelle,provider:item.amtlich.provider||null,freigabe:'MANUELLE_PRUEFUNG_ERFORDERLICH',automatischAnwenden:false});
  }else if(item.status==='IDENTISCH')identisch.push(item.spielId);
  else unaufgeloest.push({spielId:item.spielId,status:item.status});
 }
 if(browser.verifiziert!==vorschlaege.length+identisch.length||browser.befunde.length!==ids.size)throw Error('VERIFIZIERUNGSZAHL_WIDERSPRUCH');
 const hinweise=sonder.findings.map(x=>({spielId:x.spielId,status:x.status,datum:x.datum||null,anstoss:x.anstoss||null,quelle:x.quelle,automatischFreigabefaehig:false}));
 const result={schema:'TEST18',modus:'READ_ONLY_DIAGNOSE',zeit:new Date().toISOString(),datenVersion:browser.datenVersion,technischerStatus:'OK',fachlicherStatus:unaufgeloest.length?'UNVOLLSTAENDIG':vorschlaege.length?'ABWEICHUNGEN':'IDENTISCH',anzahl:{gesamt:browser.befunde.length,verifiziert:browser.verifiziert,identisch:identisch.length,abweichungen:vorschlaege.length,unaufgeloest:unaufgeloest.length},identisch,unaufgeloest,sonderquellenHinweise:hinweise,automatischeAenderung:false,freigabe:'KEINE_AUTOMATISCHE_FREIGABE'};
 return {result,vorschlaege};
}
export function run(dir='terminwaechter-bericht'){
 const reports=EXPECTED.map(n=>{const f=path.join(dir,n);if(!fs.existsSync(f))throw Error('BERICHT_FEHLT: '+n);return JSON.parse(fs.readFileSync(f,'utf8'));});
 const {result,vorschlaege}=consolidate(...reports);
 fs.writeFileSync(path.join(dir,'TEST18_STATUS.json'),JSON.stringify(result,null,2)+'\n');
 fs.writeFileSync(path.join(dir,'TEST18_KORREKTURVORSCHLAEGE.json'),JSON.stringify({schema:'TEST18',modus:'VORSCHLAEGE_NUR_ZUR_SICHTUNG',automatischeAenderung:false,freigabe:'TEST2V2_PRUEFUNG_UND_NUTZERFREIGABE_ERFORDERLICH',vorschlaege},null,2)+'\n');
 const lines=['# TEST18 – Offizielle Terminquellen: Diagnose','',`Technik: ${result.technischerStatus} (Berichte vollständig)`,`Fachlich: ${result.fachlicherStatus}`,`Geprüft: ${result.anzahl.verifiziert}/${result.anzahl.gesamt}; identisch: ${result.anzahl.identisch}; Abweichungen: ${result.anzahl.abweichungen}; ungeklärt: ${result.anzahl.unaufgeloest}`,'','## Korrekturvorschläge – nur Prüfung, keine Einspielung',...vorschlaege.map(x=>`- ${x.spielId}: ${x.bisher.datum} ${x.bisher.anstoss} → ${x.vorschlag.datum} ${x.vorschlag.anstoss}; Quelle ${x.quelle}`),'','## Ungeklärte Begegnungen',...result.unaufgeloest.map(x=>`- ${x.spielId}: ${x.status}`),'','## Ergänzende Quellen (keine automatische Freigabe)',...hinweiseLines(result.sonderquellenHinweise),'','WICHTIG: Keine Änderung von Website-Dateien. Die Terminvorschläge sind KEINE Freigabe zum Ausrollen.'];
 fs.writeFileSync(path.join(dir,'TEST18_STATUS.md'),lines.join('\n')+'\n');
 console.log(`TEST18: Technik OK; fachlich ${result.fachlicherStatus}; ${result.anzahl.verifiziert}/${result.anzahl.gesamt}; ${vorschlaege.length} Vorschläge; ${result.unaufgeloest.length} ungeklärt`);
 return result;
}
function hinweiseLines(items){return items.map(x=>`- ${x.spielId}: ${x.status}; Datum ${x.datum||'offen'}, Zeit ${x.anstoss||'offen'} (nicht automatisch freigegeben)`);}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url){try{run(process.env.TOSMC_OFFICIAL_OUT||'terminwaechter-bericht');}catch(e){console.error('TEST18 TECHNISCHER_FEHLER:',e.message);process.exitCode=1;}}
