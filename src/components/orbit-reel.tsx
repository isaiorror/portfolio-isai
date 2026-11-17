'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

// Carrusel en órbita para videos verticales: las tarjetas giran sobre un círculo,
// la del frente se reproduce en silencio y las de atrás quedan en pausa.
// Flechas, teclado, clic en una tarjeta o arrastrar para girar. Con "reducir movimiento" no hay giro automático.
type Item = { src: string; label: string };

const AUTO_MS = 7000; // pausa entre giros
const GIRO_MS = 2200; // duración de cada giro

export function OrbitReel({ items, openLabel, soundOn, soundOff, prevLabel, nextLabel, aria }: {
  items: Item[]; openLabel: string; soundOn: string; soundOff: string; prevLabel: string; nextLabel: string; aria: string;
}) {
  const n = items.length;
  const [turn, setTurn] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const angle = useRef(0);
  const raf = useRef(0);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const reduced = useRef(false);
  const active = ((turn % n) + n) % n;

  const layout = useCallback(() => {
    const el = stage.current;
    if (!el) return;
    const w = el.clientWidth;
    const r = Math.min(w * 0.36, 420);
    cards.current.forEach((card, i) => {
      if (!card) return;
      const th = ((i - angle.current) / n) * Math.PI * 2;
      const x = Math.sin(th) * r;
      const z = (Math.cos(th) - 1) * r;
      const depth = (Math.cos(th) + 1) / 2; // 1 al frente, 0 atrás
      card.style.transform = `translate3d(calc(-50% + ${x}px), -50%, ${z}px)`;
      card.style.zIndex = String(Math.round(depth * 100));
      card.style.filter = `brightness(${0.35 + 0.65 * depth}) saturate(${0.4 + 0.6 * depth})`;
      card.style.opacity = String(0.55 + 0.45 * depth);
    });
  }, [n]);

  // Anima el ángulo sobre el círculo hasta el destino, con entrada y salida suaves
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    const destino = turn;
    if (reduced.current) { angle.current = destino; layout(); return; }
    const desde = angle.current;
    const t0 = performance.now();
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / GIRO_MS);
      angle.current = desde + (destino - desde) * ease(p);
      layout();
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [turn, layout]);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    layout();
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [layout]);

  // Solo la tarjeta del frente reproduce
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.muted = muted;
        if (!reduced.current || !muted) v.play().catch(() => {});
      } else { v.pause(); v.muted = true; }
    });
  }, [active, muted]);

  // Giro automático mientras nadie interactúa y el sonido está apagado
  useEffect(() => {
    if (reduced.current || paused || !muted) return;
    const id = window.setInterval(() => setTurn((t) => t + 1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, muted]);

  const go = (d: number) => setTurn((t) => t + d);
  const goTo = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    go(d);
  };

  return <div className="orbit" role="region" aria-roledescription="carrusel" aria-label={aria}
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
    onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }}>
    <div className="orbit-stage" ref={stage}
      onPointerDown={(e) => { drag.current = { x: e.clientX, moved: false }; }}
      onPointerMove={(e) => {
        const dr = drag.current;
        if (!dr || dr.moved) return;
        const dx = e.clientX - dr.x;
        if (Math.abs(dx) > 40) { dr.moved = true; go(dx < 0 ? 1 : -1); }
      }}
      onPointerUp={() => { setTimeout(() => { drag.current = null; }, 0); }}>
      <div className="orbit-ring" aria-hidden="true" />
      {items.map((it, i) => {
        const poster = `/video-posters${it.src.replace(/\.[^.]+$/, '.jpg')}`;
        const front = i === active;
        return <div key={it.src} ref={(el) => { cards.current[i] = el; }} className={front ? 'orbit-card is-front' : 'orbit-card'}
          aria-hidden={!front}
          onClick={() => { if (!drag.current?.moved && !front) goTo(i); }}>
          <video ref={(el) => { videos.current[i] = el; }} muted loop playsInline preload={front ? 'auto' : 'metadata'} poster={poster} tabIndex={-1}>
            <source src={it.src} type={it.src.endsWith('.mov') ? undefined : 'video/mp4'} />
          </video>
          <span className="orbit-num">{String(i + 1).padStart(2, '0')}</span>
        </div>;
      })}
    </div>
    <div className="orbit-bar">
      <button type="button" className="orbit-arrow" onClick={() => go(-1)} aria-label={prevLabel}>←</button>
      <div className="orbit-info" aria-live="polite">
        <span className="orbit-label">{items[active].label}</span>
        <span className="orbit-links">
          <button type="button" className="orbit-sound" aria-pressed={!muted} onClick={() => setMuted((m) => !m)}>♪ {muted ? soundOn : soundOff}</button>
          <a href={items[active].src} target="_blank" rel="noreferrer">{openLabel}</a>
        </span>
      </div>
      <div className="orbit-dots">{items.map((it, i) => <button key={it.src} type="button" aria-label={it.label} aria-current={i === active} onClick={() => goTo(i)} />)}</div>
      <button type="button" className="orbit-arrow" onClick={() => go(1)} aria-label={nextLabel}>→</button>
    </div>
  </div>;
}
