// TEST26 – isolated, synthetic end-to-end simulation. NEVER writes spieldaten.json.
// Checks TEST25 bridge/gate -> TEST19 candidate -> TEST20 manual approval.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {reconcile} from './offizielle-quellen-test25-freigabebruecke.mjs';
import {validate} from './offizielle-quellen-test25-gate.mjs';
import {buildCandidate} from './offizielle-quellen-test19-vorschau.mjs';
import {prepare} from './offizielle-quellen-test20-freigabe.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const cases=[
 {id:'pk-2026-27-05-le-classique',land:'frankreich',competition:'piratenkodex',old:['2027-02-07','20:45'],next:['2027-02-08','21:00'],url:'https://ligue1.com/en/calendar/ligue1'},
 {id:'wr-2026-27-02',land:'portugal',competition:'weihnachtsregatta',old:['2026-12-27','18:00'],next:['2026-12-28','21:30'],url:'https://www.ligaportugal.pt/match/20262027/ligaportugalbetclic/16/8'}
];
const fmt=d=>d.slice(8,10)+'.'+d.slice(5,7)+'.'+d.slice(0,4);
let assertions=0;
function eq(a,b){assert.deepEqual(a,b);assertions++;}
function throws(fn,re){assert.throws(fn,re);assertions++;}
function fixture(c){return {id:c.id,wettbewerb:c.competition,status:'terminiert',datum:c.old[0],datumVon:c.old[0],datumBis:c.old[0],datumAnzeige:fmt(c.old[0]),anstoss:c.old[1],heimtore:null,auswaertstore:null,tippverteilung:{heim:3,unentschieden:2,gast:1}};}
function inputs(c){
 const game=fixture(c),data={datenVersion:82,saisons:[{spiele:[game]}]},config={quellen:[{spielIds:[c.id],url:c.url}]};
 const current={datum:c.old[0],anstoss:c.old[1]},target={datum:c.next[0],anstoss:c.next[1]};
 const browser={datenVersion:82,automatischeAenderung:false,befunde:[{spielId:c.id,status:'ABWEICHUNG',bisher:current,amtlich:target,quelle:c.url}]};
 const monitor={automatischeAenderung:false,spiele:[{spielId:c.id,websiteBestand:current}]};
 const details={automatischeAenderung:false,spiele:[{spielId:c.id,websiteBestand:current,bestandUnveraendert:true,korrekturFreigabe:false,moeglicherNeuerTermin:target}]};
 const audit={automatischeAenderung:false,spiele:[{spielId:c.id,websiteBestand:current,bestandUnveraendert:true,automatischFreigabefaehig:false,quellenTermin:target}]};
 const proposal={spielId:c.id,bisher:current,vorschlag:target,quelle:c.url,automatischAnwenden:false,freigabe:'MANUELLE_PRUEFUNG_ERFORDERLICH'};
 const proposals={schema:'TEST18',modus:'VORSCHLAEGE_NUR_ZUR_SICHTUNG',automatischeAenderung:false,vorschlaege:[proposal]};
 const status={schema:'TEST18',technischerStatus:'OK',datenVersion:82,automatischeAenderung:false,anzahl:{abweichungen:1}};
 return {game,data,config,browser,monitor,details,audit,proposal,proposals,status,current,target};
}
const rows=[];
for(const c of cases){
 const x=inputs(c),original=JSON.stringify(x.data,null,2)+'\n',originalHash=sha(original);
 const bridge=reconcile({data:x.data,config:x.config,browser:x.browser,monitor:x.monitor,audit:x.audit,detail:x.details});
 eq(bridge.anzahl.korrekturZurManuellenPruefung,1);eq(bridge.anzahl.konflikte,0);eq(validate(bridge,x.proposals),true);
 const built=buildCandidate(original,JSON.stringify(x.proposals),JSON.stringify(x.status));
 eq(built.manifest.anzahlAenderungen,1);eq(built.manifest.quelleHashSHA256,originalHash);
 const simulated=JSON.parse(built.candidate),after=simulated.saisons[0].spiele[0];
 eq([after.datum,after.datumVon,after.datumBis,after.datumAnzeige,after.anstoss],[c.next[0],c.next[0],c.next[0],fmt(c.next[0]),c.next[1]]);
 eq(after.tippverteilung,x.game.tippverteilung);eq(after.status,x.game.status);
 eq(sha(original),originalHash);
 const safeParams={source:original,manifest:JSON.stringify(built.manifest),proposal:JSON.stringify(x.proposals),status:JSON.stringify(x.status)};
 const daily=prepare({...safeParams,event:'schedule',approval:'TEST2V2_FREIGABE',expectedHash:originalHash});
 eq(daily.candidate,null);eq(daily.result.freigabe,'NICHT_FREIGEGEBEN');
 const noApproval=prepare({...safeParams,event:'workflow_dispatch',approval:'',expectedHash:originalHash});
 eq(noApproval.candidate,null);
 const wrongHash=prepare({...safeParams,event:'workflow_dispatch',approval:'TEST2V2_FREIGABE',expectedHash:'wrong'});
 eq(wrongHash.candidate,null);
 const approved=prepare({...safeParams,event:'workflow_dispatch',approval:'TEST2V2_FREIGABE',expectedHash:originalHash});
 eq(approved.candidate,built.candidate);eq(approved.result.liveFreigabe,false);
 throws(()=>prepare({...safeParams,source:original.replace('"datenVersion": 82','"datenVersion": 83'),event:'workflow_dispatch',approval:'TEST2V2_FREIGABE',expectedHash:originalHash}),/BESTAND_SEIT_TEST19_VERAENDERT/);
 const partial={...x.browser,befunde:[{...x.browser.befunde[0],amtlich:{datum:c.next[0],anstoss:null}}]};
 throws(()=>reconcile({data:x.data,config:x.config,browser:partial,monitor:x.monitor,audit:x.audit,detail:x.details}),/OFFIZIELLER_TERMIN_UNVOLLSTAENDIG/);
 const conflicting={...x.audit,spiele:[{...x.audit.spiele[0],quellenTermin:{datum:c.next[0],anstoss:'12:30'}}]};
 const conflictBridge=reconcile({data:x.data,config:x.config,browser:x.browser,monitor:x.monitor,audit:conflicting,detail:x.details});
 eq(conflictBridge.anzahl.konflikte,1);
 throws(()=>validate(conflictBridge,x.proposals),/TEST25_QUELLENKONFLIKT/);
 throws(()=>validate(bridge,{...x.proposals,vorschlaege:[]}),/VORSCHLAGSZAHL/);
 const fake={...x.proposals,vorschlaege:[{...x.proposal,quelle:'https://evil.example/fixture'}]};
 throws(()=>buildCandidate(original,JSON.stringify(fake),JSON.stringify(x.status)),/QUELLEN_DOMAIN_NICHT_FREIGEGEBEN/);
 const changed={...x.proposals,vorschlaege:[{...x.proposal,vorschlag:{datum:c.next[0],anstoss:'12:30'}}]};
 throws(()=>validate(bridge,changed),/NICHT_GEDECKT/);
 rows.push({spielId:c.id,land:c.land,simulierterAlterTermin:x.current,simulierterNeuerTermin:x.target,quellenAbgleich:'BESTANDEN',quellenkonfliktBlockiert:true,unvollstaendigerTerminBlockiert:true,handfreigabeErforderlich:true,websiteUndLiveUnveraendert:true,quelleHashSHA256:originalHash,kandidatHashSHA256:sha(built.candidate)});
}
const result={schema:'TEST26',modus:'ISOLIERTE_SYNTHETISCHE_SIMULATION',szenarien:rows.length,assertions,ergebnis:'BESTANDEN',automatischeAenderung:false,gitCommit:false,liveFreigabe:false,hinweis:'Alle Termine sind frei erfundene Testfälle in Arbeitsspeicher. Keine echten Spiele wurden verändert.',szenarioDetails:rows};
if(process.argv.includes('--report')){
 const dir=process.env.TOSMC_OFFICIAL_OUT||'terminwaechter-bericht';fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,'TEST26_SIMULATION.json'),JSON.stringify(result,null,2)+'\n');
 fs.writeFileSync(path.join(dir,'TEST26_SIMULATION.md'),['# TEST26 – Isolierte Simulation der Terminverschiebung','',`Ergebnis: ${result.ergebnis}; Szenarien: ${rows.length}; Prüfungen: ${assertions}`,'',...rows.map(r=>`- ${r.land}: ${r.spielId}, simuliert ${r.simulierterAlterTermin.datum} ${r.simulierterAlterTermin.anstoss} -> ${r.simulierterNeuerTermin.datum} ${r.simulierterNeuerTermin.anstoss}; keine Website-Änderung`),'','Testdaten sind künstlich. Keine Produktiv-Freigabe; keine echte Änderung an TEST2v2 oder LIVE.'].join('\n')+'\n');
}
console.log('TEST26:',assertions,'Schutz- und Integrationsprüfungen,',rows.length,'synthetische Länderfälle,',result.ergebnis);
