const arr=v=>Array.isArray(v)?v:[];let gameById=new Map();
function weekendFriday(dateStr){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(String(dateStr||"")))return null;
 const date=new Date(`${dateStr}T12:00:00Z`);
 if(!Number.isFinite(date.getTime()))return null;
 const day=date.getUTCDay();
 if(day!==5&&day!==6&&day!==0)return null;
 date.setUTCDate(date.getUTCDate()-(day===0?2:day-5));
 return date.toISOString().slice(0,10);
}
function eventLastDate(entry){
 const days=arr(entry?.spielIds).map(id=>gameById.get(id)).filter(Boolean)
  .map(g=>String(g.datum||g.datumVon||"").slice(0,10))
  .filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
 return days.at(-1)||null;
}
function weekendCardsHtml(entries){
 const completed=arr(entries).filter(e=>e?.abgeschlossen===true).map(e=>({entry:e,lastDate:eventLastDate(e)})).filter(x=>x.lastDate);
 if(!completed.length)return null;
 const lastDate=completed.reduce((max,x)=>x.lastDate>max?x.lastDate:max,"");
 const lastWeekend=weekendFriday(lastDate);
 // Wochenend-Rueckblick bleibt gruppiert; werktags zaehlt der juengste Spieltag.
 const chosen=completed.filter(x=>lastWeekend
  ? weekendFriday(x.lastDate)===lastWeekend
  : x.lastDate===lastDate);
 const uniq=[...new Map(chosen.map(x=>[x.entry.id,x.entry])).values()];
 uniq.sort((a,b)=>String(a.wettbewerb).localeCompare(String(b.wettbewerb),'de')||String(a.runde).localeCompare(String(b.runde),'de'));
 const toDay=iso=>`${iso.slice(8,10)}.${iso.slice(5,7)}.${iso.slice(0,4)}`;
 const start=lastWeekend?new Date(`${lastWeekend}T12:00:00Z`):null;
 const finish=start?new Date(start):null;
 if(finish)finish.setUTCDate(finish.getUTCDate()+2);
 const title=lastWeekend
  ? `Wochenend-Rückblick · ${toDay(lastWeekend)}–${toDay(finish.toISOString().slice(0,10))}`
  : `Spieltags-Rückblick · ${toDay(lastDate)}`;
 return {title,ids:uniq.map(e=>e.id)};
}
function test(games,entries,expected){gameById=new Map(Object.entries(games));let got=weekendCardsHtml(entries);if(JSON.stringify(got.ids)!==JSON.stringify(expected))throw Error(JSON.stringify(got));return got;}
console.log(JSON.stringify(test({a:{datum:'2026-11-01'},b:{datum:'2026-10-31'},c:{datum:'2026-11-04'}},[{id:'old1',abgeschlossen:true,spielIds:['a']},{id:'old2',abgeschlossen:true,spielIds:['b']},{id:'cl4',abgeschlossen:true,spielIds:['c']}],['cl4'])));
console.log(JSON.stringify(test({a:{datum:'2026-11-01'},b:{datum:'2026-10-31'}},[{id:'week1',abgeschlossen:true,spielIds:['a']},{id:'week2',abgeschlossen:true,spielIds:['b']}],['week1','week2'])));
console.log(JSON.stringify(test({a:{datum:'2026-11-04'},b:{datum:'2026-11-05'}},[{id:'closed',abgeschlossen:true,spielIds:['a']},{id:'open',abgeschlossen:false,spielIds:['b']}],['closed'])));
