// TEST25: mandatory safety gate before TEST19/TEST20. No writes.
import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
const eq=(a,b)=>a?.datum===b?.datum&&a?.anstoss===b?.anstoss;
export function validate(bridge,proposals){
 if(bridge?.schema!=='TEST25'||bridge.modus!=='READ_ONLY_QUELLENBRUECKE'||bridge.automatischeAenderung!==false||bridge.automatischeGitAenderung!==false||bridge.liveFreigabe!==false||!Array.isArray(bridge.spiele))throw Error('TEST25_BERICHT_UNGUELTIG');
 if(bridge.anzahl?.konflikte!==0)throw Error('TEST25_QUELLENKONFLIKT_BLOCKIERT_KORREKTUR');
 if(proposals?.schema!=='TEST18'||proposals.automatischeAenderung!==false||!Array.isArray(proposals.vorschlaege))throw Error('TEST18_VORSCHLAEGE_UNGUELTIG');
 const allowed=new Map(bridge.spiele.filter(x=>x.korrekturZurManuellenPruefung===true).map(x=>[x.spielId,x]));
 if(allowed.size!==bridge.anzahl.korrekturZurManuellenPruefung||proposals.vorschlaege.length!==allowed.size)throw Error('TEST25_VORSCHLAGSZAHL_WIDERSPRUCH');
 for(const x of proposals.vorschlaege){const b=allowed.get(x.spielId);if(!b||!eq(x.bisher,b.websiteBestand)||!eq(x.vorschlag,b.amtlicherTermin)||x.automatischAnwenden!==false)throw Error('TEST25_VORSCHLAG_NICHT_GEDECKT_'+x.spielId);allowed.delete(x.spielId);}
 if(allowed.size)throw Error('TEST25_FEHLENDE_VORSCHLAEGE');return true;
}
export function run(dir='terminwaechter-bericht'){
 const read=p=>JSON.parse(fs.readFileSync(path.join(dir,p),'utf8'));validate(read('TEST25_QUELLENBRUECKE.json'),read('TEST18_KORREKTURVORSCHLAEGE.json'));console.log('TEST25-GATE: Konsistenz und Quellenkonfliktfreiheit bestätigt. Keine Dateiaenderung.');
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url){try{run(process.env.TOSMC_OFFICIAL_OUT||'terminwaechter-bericht');}catch(e){console.error('TEST25-GATE BLOCKADE:',e.message);process.exitCode=1;}}
