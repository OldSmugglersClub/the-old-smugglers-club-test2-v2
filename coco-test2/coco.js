(() => {
  'use strict';

  const DATA_PATH = '../spieldaten.json';
  const TEAMS_PATH = '../teams.json';
  const BERLIN_TZ = 'Europe/Berlin';

  const els = {};
  let games = [];
  let teams = new Map();
  let selectedGame = null;
  let revealing = false;

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    bindEls();
    bindEvents();
    try {
      const [schedule, teamData] = await Promise.all([fetchJson(DATA_PATH), fetchJson(TEAMS_PATH)]);
      const season = (schedule.saisons || []).find(s => s.id === schedule.aktiveSaison) || (schedule.saisons || [])[0];
      games = (season?.spiele || []).filter(hasRealTeams);
      teams = new Map((teamData.teams || []).map(team => [team.id, team]));
      populateCompetitions();
      renderStats();
      setStatus('Wähle einen Wettbewerb und eine Partie.');
    } catch (error) {
      console.error(error);
      setStatus('Coco findet den Spielplan nicht. Testmodul über einen lokalen Webserver öffnen.', true);
      els.query.disabled = true;
    }
  }

  function bindEls() {
    for (const id of ['competition','round','match','homeLogo','awayLogo','homeName','awayName','matchMeta','query','status','tipPanel','tipScore','tipLabel','cocoStage','hmmm','stats','resultState']) {
      els[id] = document.getElementById(id);
    }
  }

  function bindEvents() {
    els.competition.addEventListener('change', () => { populateRounds(); clearSelection(); });
    els.round.addEventListener('change', () => { populateMatches(); clearSelection(); });
    els.match.addEventListener('change', selectMatch);
    els.query.addEventListener('click', reveal);
  }

  async function fetchJson(path) {
    const response = await fetch(`${path}?coco-test2=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    return response.json();
  }

  function hasRealTeams(game) {
    return Boolean(game.id && game.heimTeamId && game.auswaertsTeamId && game.terminBestaetigt && game.datum && game.anstoss);
  }

  function gameTime(game) {
    return zonedTimeToDate(game.datum, game.anstoss, BERLIN_TZ);
  }

  function zonedTimeToDate(dateStr, timeStr, timeZone) {
    const [y,m,d] = dateStr.split('-').map(Number);
    const [hh,mm] = timeStr.split(':').map(Number);
    let guess = Date.UTC(y, m - 1, d, hh, mm, 0);
    const fmt = new Intl.DateTimeFormat('en-CA', {
      timeZone, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hourCycle:'h23'
    });
    for (let i = 0; i < 3; i += 1) {
      const parts = Object.fromEntries(fmt.formatToParts(new Date(guess)).filter(p => p.type !== 'literal').map(p => [p.type, p.value]));
      const represented = Date.UTC(Number(parts.year), Number(parts.month)-1, Number(parts.day), Number(parts.hour), Number(parts.minute));
      const desired = Date.UTC(y,m-1,d,hh,mm);
      const delta = desired - represented;
      if (!delta) break;
      guess += delta;
    }
    return new Date(guess);
  }

  function gameState(game) {
    const now = new Date();
    const kickoff = gameTime(game);
    if (game.ergebnisNach90MinutenBestaetigt === true && Number.isFinite(Number(game.heimtore)) && Number.isFinite(Number(game.auswaertstore))) return 'finished';
    if (now >= kickoff) return 'started';
    return 'upcoming';
  }

  function populateCompetitions() {
    const comps = [...new Map(games.map(g => [g.wettbewerb, g.wettbewerbAnzeige || g.wettbewerb])).entries()]
      .sort((a,b) => a[1].localeCompare(b[1], 'de'));
    fillSelect(els.competition, comps, 'Wettbewerb wählen');
    populateRounds();
  }

  function populateRounds() {
    const comp = els.competition.value;
    const rounds = [...new Set(games.filter(g => g.wettbewerb === comp).map(g => g.runde || 'Ohne Runde'))]
      .map(r => [r,r]);
    fillSelect(els.round, rounds, 'Runde / Spieltag wählen');
    populateMatches();
  }

  function populateMatches() {
    const comp = els.competition.value;
    const round = els.round.value;
    const list = games.filter(g => g.wettbewerb === comp && (g.runde || 'Ohne Runde') === round)
      .sort((a,b) => gameTime(a) - gameTime(b));
    const opts = list.map(g => [g.id, `${teamName(g.heimTeamId)} – ${teamName(g.auswaertsTeamId)} · ${formatKickoff(g)}`]);
    fillSelect(els.match, opts, 'Partie wählen');
  }

  function fillSelect(select, entries, placeholder) {
    select.innerHTML = '';
    const p = document.createElement('option'); p.value = ''; p.textContent = placeholder; select.appendChild(p);
    entries.forEach(([value,label]) => { const o=document.createElement('option'); o.value=value; o.textContent=label; select.appendChild(o); });
    select.disabled = entries.length === 0;
  }

  function teamName(id) {
    const t = teams.get(id);
    return t?.kurzname || t?.name || id || 'Unbekannt';
  }

  function teamLogo(id) {
    const logo = teams.get(id)?.logo;
    return logo ? `../${logo.replace(/^\.\//,'')}` : '';
  }

  function formatKickoff(game) {
    return new Intl.DateTimeFormat('de-DE', { timeZone: BERLIN_TZ, day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }).format(gameTime(game));
  }

  function selectMatch() {
    selectedGame = games.find(g => g.id === els.match.value) || null;
    resetReveal();
    if (!selectedGame) return clearSelection();

    els.homeName.textContent = teamName(selectedGame.heimTeamId);
    els.awayName.textContent = teamName(selectedGame.auswaertsTeamId);
    setLogo(els.homeLogo, selectedGame.heimTeamId);
    setLogo(els.awayLogo, selectedGame.auswaertsTeamId);
    els.matchMeta.textContent = `${selectedGame.wettbewerbAnzeige || selectedGame.wettbewerb} · ${selectedGame.runde || ''} · ${formatKickoff(selectedGame)}`;

    const state = gameState(selectedGame);
    if (state === 'upcoming') {
      els.query.disabled = false;
      els.query.textContent = 'Coco befragen';
      setStatus('Coco hat seinen Tipp bereits im Gefieder. Noch ist er geheim.');
    } else {
      els.query.disabled = true;
      showPrediction(false);
      setStatus(state === 'finished' ? 'Die Partie ist beendet – Cocos Tipp wird ausgewertet.' : 'Anpfiff war bereits – Cocos vorher feststehender Tipp ist sichtbar.');
    }
  }

  function setLogo(img, id) {
    const src = teamLogo(id);
    img.src = src;
    img.alt = teamName(id);
    img.hidden = !src;
  }

  function clearSelection() {
    selectedGame = null;
    els.homeName.textContent = 'Heimteam'; els.awayName.textContent = 'Auswärtsteam';
    els.homeLogo.hidden = true; els.awayLogo.hidden = true;
    els.matchMeta.textContent = 'Noch keine Partie ausgewählt';
    els.query.disabled = true;
    resetReveal();
  }

  function resetReveal() {
    els.tipPanel.hidden = true;
    els.resultState.textContent = '';
    els.hmmm.classList.remove('show');
    els.cocoStage.classList.remove('thinking');
    revealing = false;
  }

  async function reveal() {
    if (!selectedGame || revealing || gameState(selectedGame) !== 'upcoming') return;
    revealing = true;
    els.query.disabled = true;
    els.tipPanel.hidden = true;
    setStatus('Coco lauscht dem Wind …');
    playParrotCall();
    els.cocoStage.classList.add('thinking');
    await wait(700);
    els.hmmm.classList.add('show');
    speakHmm();
    setStatus('Hmmm … Coco denkt nach.');
    await wait(1500);
    els.hmmm.classList.remove('show');
    await wait(450);
    els.cocoStage.classList.remove('thinking');
    showPrediction(true);
    els.query.disabled = false;
    els.query.textContent = 'Cocos Tipp erneut enthüllen';
    setStatus('Coco hat gesprochen. Derselbe Tipp gilt für diese Partie immer.');
    revealing = false;
  }

  function showPrediction(animate) {
    const pred = CocoOracle.predict(selectedGame.id);
    els.tipScore.textContent = pred.score;
    els.tipLabel.textContent = pred.pirate ? 'Piratenmut!' : tendencyText(pred.tendency);
    els.tipPanel.hidden = false;
    els.tipPanel.classList.toggle('reveal', Boolean(animate));
    window.setTimeout(() => els.tipPanel.classList.remove('reveal'), 900);

    if (gameState(selectedGame) === 'finished') {
      const ev = CocoOracle.evaluate(pred, selectedGame.heimtore, selectedGame.auswaertstore);
      els.resultState.textContent = `${ev.label} · Ergebnis 90 Min.: ${selectedGame.heimtore}:${selectedGame.auswaertstore}`;
      els.resultState.dataset.state = ev.exact ? 'exact' : ev.tendencyHit ? 'tendency' : 'miss';
    } else {
      els.resultState.textContent = 'Tipp nach 90 Minuten inkl. Nachspielzeit';
      els.resultState.dataset.state = '';
    }
  }

  function tendencyText(t) { return t === 'H' ? 'Coco setzt auf Heim' : t === 'A' ? 'Coco setzt auf Auswärts' : 'Coco riecht ein Remis'; }
  function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  function playParrotCall() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      [0, 0.11, 0.24].forEach((offset, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i === 1 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(980 - i * 120, now + offset);
        osc.frequency.exponentialRampToValueAtTime(520 + i * 80, now + offset + 0.12);
        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.12, now + offset + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.14);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now + offset); osc.stop(now + offset + 0.15);
      });
      window.setTimeout(() => ctx.close(), 800);
    } catch (_) {}
  }

  function speakHmm() {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance('Hmmm');
      u.lang = 'de-DE'; u.rate = 0.65; u.pitch = 1.25; u.volume = 0.55;
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }

  function renderStats() {
    const finished = games.filter(g => gameState(g) === 'finished').sort((a,b) => gameTime(a)-gameTime(b));
    let tendency = 0, exact = 0;
    const sequence = [];
    for (const g of finished) {
      const ev = CocoOracle.evaluate(CocoOracle.predict(g.id), g.heimtore, g.auswaertstore);
      if (ev.tendencyHit) tendency += 1;
      if (ev.exact) exact += 1;
      sequence.push(ev.tendencyHit);
    }
    let streak = 0, streakType = '–';
    if (sequence.length) {
      const last = sequence[sequence.length - 1]; streakType = last ? 'Treffer' : 'Fehler';
      for (let i=sequence.length-1; i>=0 && sequence[i]===last; i-=1) streak += 1;
    }
    const pct = (n,d) => d ? `${(n/d*100).toFixed(1).replace('.',',')} %` : '–';
    els.stats.innerHTML = `
      <div><strong>${finished.length}</strong><span>ausgewertet</span></div>
      <div><strong>${tendency}</strong><span>Tendenz · ${pct(tendency, finished.length)}</span></div>
      <div><strong>${exact}</strong><span>Volltreffer · ${pct(exact, finished.length)}</span></div>
      <div><strong>${streak || '–'}</strong><span>Serie · ${streakType}</span></div>`;
  }

  function setStatus(text, error=false) {
    els.status.textContent = text;
    els.status.classList.toggle('error', error);
  }
})();
