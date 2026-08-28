/* TOSMC 4.9.2-HF12-HF26-TEST19 — Landgang outro controller. */
(() => {
  'use strict';

  const trigger = document.getElementById('landgang-link');
  const layer = document.getElementById('outro-layer');
  if (!trigger || !layer) return;

  let running = false;
  let audioContext = null;

  function getAudioContext() {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return null;
    if (!audioContext) audioContext = new AudioContextCtor();
    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
    return audioContext;
  }

  function noiseBuffer(ctx, seconds) {
    const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      last = (last * .82) + (white * .18);
      data[i] = last;
    }
    return buffer;
  }

  function playChestSound() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime + .02;
    const master = ctx.createGain();
    master.gain.setValueAtTime(.0001, now);
    master.gain.exponentialRampToValueAtTime(.72, now + .02);
    master.gain.setValueAtTime(.72, now + .72);
    master.gain.exponentialRampToValueAtTime(.0001, now + 1.16);
    master.connect(ctx.destination);

    // Heavy wooden lid moving through the air.
    const scrape = ctx.createBufferSource();
    scrape.buffer = noiseBuffer(ctx, .72);
    const scrapeFilter = ctx.createBiquadFilter();
    scrapeFilter.type = 'bandpass';
    scrapeFilter.frequency.setValueAtTime(520, now);
    scrapeFilter.frequency.exponentialRampToValueAtTime(135, now + .66);
    scrapeFilter.Q.value = .75;
    const scrapeGain = ctx.createGain();
    scrapeGain.gain.setValueAtTime(.0001, now);
    scrapeGain.gain.exponentialRampToValueAtTime(.2, now + .11);
    scrapeGain.gain.exponentialRampToValueAtTime(.045, now + .64);
    scrape.connect(scrapeFilter).connect(scrapeGain).connect(master);
    scrape.start(now);
    scrape.stop(now + .72);

    // Low wooden resonance while the lid falls.
    const body = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    body.type = 'sine';
    body.frequency.setValueAtTime(112, now + .18);
    body.frequency.exponentialRampToValueAtTime(76, now + .7);
    bodyGain.gain.setValueAtTime(.0001, now);
    bodyGain.gain.exponentialRampToValueAtTime(.13, now + .22);
    bodyGain.gain.exponentialRampToValueAtTime(.0001, now + .69);
    body.connect(bodyGain).connect(master);
    body.start(now);
    body.stop(now + .72);

    const impactAt = now + .73;

    // Sub-bass body of the slam.
    const impact = ctx.createOscillator();
    const impactGain = ctx.createGain();
    impact.type = 'sine';
    impact.frequency.setValueAtTime(88, impactAt);
    impact.frequency.exponentialRampToValueAtTime(43, impactAt + .24);
    impactGain.gain.setValueAtTime(.62, impactAt);
    impactGain.gain.exponentialRampToValueAtTime(.0001, impactAt + .34);
    impact.connect(impactGain).connect(master);
    impact.start(impactAt);
    impact.stop(impactAt + .36);

    // Short wooden crack and metal fitting snap.
    const crack = ctx.createBufferSource();
    crack.buffer = noiseBuffer(ctx, .16);
    const crackFilter = ctx.createBiquadFilter();
    crackFilter.type = 'bandpass';
    crackFilter.frequency.value = 920;
    crackFilter.Q.value = 1.05;
    const crackGain = ctx.createGain();
    crackGain.gain.setValueAtTime(.5, impactAt);
    crackGain.gain.exponentialRampToValueAtTime(.0001, impactAt + .13);
    crack.connect(crackFilter).connect(crackGain).connect(master);
    crack.start(impactAt);
    crack.stop(impactAt + .16);

    const ring = ctx.createOscillator();
    const ringGain = ctx.createGain();
    ring.type = 'triangle';
    ring.frequency.setValueAtTime(176, impactAt);
    ring.frequency.exponentialRampToValueAtTime(121, impactAt + .16);
    ringGain.gain.setValueAtTime(.12, impactAt);
    ringGain.gain.exponentialRampToValueAtTime(.0001, impactAt + .18);
    ring.connect(ringGain).connect(master);
    ring.start(impactAt);
    ring.stop(impactAt + .2);
  }

  function closeOrFallback() {
    try { window.close(); } catch (_) { /* Browser policy decides. */ }
    window.setTimeout(() => layer.classList.add('is-fallback'), 120);
  }

  function startOutro(event) {
    if (event) event.preventDefault();
    if (running) return;
    running = true;

    document.body.classList.add('is-outro-active');
    layer.classList.remove('is-closing', 'is-impact', 'is-fallback');
    layer.setAttribute('aria-hidden', 'false');
    layer.classList.add('is-active');
    layer.focus({ preventScroll: true });

    playChestSound();

    window.setTimeout(() => layer.classList.add('is-closing'), 170);
    window.setTimeout(() => layer.classList.add('is-impact'), 900);
    window.setTimeout(closeOrFallback, 1380);
  }

  trigger.addEventListener('click', startOutro);
})();
