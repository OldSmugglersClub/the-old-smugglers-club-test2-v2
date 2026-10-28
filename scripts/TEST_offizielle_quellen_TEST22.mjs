import assert from 'node:assert/strict';
import {buildMonitor} from './offizielle-quellen-test22-ueberwachung.mjs';
const games=[{id:'fr',status:'terminiert',wettbewerb:'piratenkodex',datum:'2027-02-07',anstoss:'20:45'},
 {id:'pt',status:'terminiert',wettbewerb:'weihnachtsregatta',datum:'2026-12-27',anstoss:'18:00'},
 {id:'it',status:'terminiert',wettbewerb:'piratenkodex',datum:'2027-01-10',anstoss:'18:30'}];
const data={datenVersion:82,saisons:[{spiele:games}]};
const config={quellen:[{url:'https://ligue1.com',spielIds:['fr']},{url:'https://www.ligaportugal.pt',spielIds:['pt']},{url:'https://en.legaseriea.it',spielIds:['it']}]};
const browser={datenVersion:82,automatischeAenderung:false,befunde:[
 {spielId:'fr',status:'KEIN_EINDEUTIGES_SPIEL'}, {spielId:'pt',status:'KEIN_EINDEUTIGES_SPIEL'},
 {spielId:'it',status:'ABWEICHUNG',bisher:{datum:'2027-01-10',anstoss:'18:30'},amtlich:{datum:'2027-01-10',anstoss:'20:45'}}]};
const sonder={automaticModification:false,findings:[{spielId:'fr',status:'OFFIZIELLE_SAISONANKUENDIGUNG',datum:'2027-02-07',anstoss:'20:45'},
{spielId:'pt',status:'OFFIZIELL_DATUM_UHRZEIT_OFFEN',datum:'2026-12-27',anstoss:null}]};
const status={schema:'TEST18',datenVersion:82,technischerStatus:'OK',automatischeAenderung:false,anzahl:{gesamt:3,abweichungen:1}};
const r=buildMonitor(data,config,browser,sonder,status);
assert.equal(r.anzahl.ueberwacht,3);
assert.equal(r.anzahl.offen,2);
assert.equal(r.anzahl.korrekturvorschlaege,1);
assert.equal(r.spiele[0].bestaetigterTermin,null);
assert.deepEqual(r.spiele[0].websiteBestand,{datum:'2027-02-07',anstoss:'20:45'});
assert.equal(r.spiele[1].naechsteAktion,'BESTAND_UNVERAENDERT');
assert.equal(r.spiele[2].naechsteAktion,'KORREKTUR_NUR_NACH_FREIGABE');
assert.equal(r.automatischeAenderung,false);
assert.throws(()=>buildMonitor(data,config,{...browser,befunde:browser.befunde.slice(1)},sonder,status),/BROWSER_BEFUND_FEHLT/);
assert.throws(()=>buildMonitor(data,config,{...browser,befunde:browser.befunde.map(x=>x.spielId==='it'?{...x,amtlich:{datum:'2027-01-10',anstoss:null}}:x)},sonder,status),/BESTAETIGUNG_OHNE_VOLLSTAENDIGEN_TERMIN/);
assert.throws(()=>buildMonitor(data,config,{...browser,befunde:browser.befunde.map(x=>x.spielId==='it'?{...x,bisher:{datum:'2027-01-09',anstoss:'18:30'}}:x)},sonder,status),/ALTTERMIN_WIDERSPRUCH/);
assert.throws(()=>buildMonitor(data,{quellen:[...config.quellen,{url:'https://x.org',spielIds:['fr']}]},browser,sonder,status),/KONFIGURATION_SPIEL_DOPPELT/);
assert.throws(()=>buildMonitor(data,config,browser,{...sonder,automaticModification:true},status),/SONDERQUELLEN_BERICHT_UNGUELTIG/);
assert.deepEqual(games[1],{id:'pt',status:'terminiert',wettbewerb:'weihnachtsregatta',datum:'2026-12-27',anstoss:'18:00'});
console.log('TEST22: 14 Überwachungs- und Schutzprüfungen bestanden.');
