'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

// Carrusel en órbita: las tarjetas giran sobre un círculo con perspectiva.
// - Videos propios (src): el del frente se reproduce en silencio; botón para activar sonido.
// - YouTube (youtube): se muestra la miniatura; al dar play en la del frente se carga el reproductor.
// Flechas, teclado, clic en una tarjeta o arrastrar para girar. Con "reducir movimiento" no hay giro automático.
export type OrbitItem = { label: string; sub?: string; src?: string; youtube?: string };

const AUTO_MS = 8000; // pausa entre giros
const GIRO_MS = 3000; // duración de cada giro
const ease = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2; // seno: arranque y frenado muy suaves

export function OrbitReel({ items, wide = false, aria, labels }: {
  items: OrbitItem[]; wide?: boolean; aria: string;
  labels: { open: string; youtube: string; soundOn: string; soundOff: string; prev: string; next: string; play: string };
}) {
  const n = items.length;
  const [turn, setTurn] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [ytPlaying, setYtPlaying] = useState<number | null>(null);
  const angle = useRef(0);
  const raf = useRef(0);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const reduced = useRef(false);
  const active = ((turn % n) + n) % n;
  const item = items[active];

  const layout = useCallback(() => {
    const el = stage.current;
    if (!el) return;
    const w = el.clientWidth;
    const r = Math.min(w * (wide ? 0.3 : 0.36), wide ? 380 : 420);
    cards.current.forEach((card, i) => {
      if (!card) return;
      const th = ((i - angle.current) / n) * Math.PI * 2;
      const x = Math.sin(th) * r;
      const z = (Math.cos(th) - 1) * r;
      const depth = (Math.cos(th) + 1) / 2; // 1 al frente, 0 atrás
      const glow = Math.pow(depth, 8);
      card.style.transform = `translate3d(calc(-50% + ${x}px), -50%, ${z}px)`;
      card.style.zIndex = String(Math.round(depth * 100));
      card.style.filter = `brightness(${0.35 + 0.65 * depth}) saturate(${0.4 + 0.6 * depth})`;
      card.style.opacity = String(0.5 + 0.5 * depth);
      card.style.borderColor = `rgba(255,77,0,${0.15 + 0.85 * glow})`;
      card.style.boxShadow = `0 30px 70px rgba(0,0,0,.55), 0 0 ${50 * glow}px rgba(255,77,0,${0.2 * glow})`;
    });
  }, [n, wide]);

  // Anima el ángulo sobre el círculo hasta el destino
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    const destino = turn;
    if (reduced.current) { angle.current = destino; layout(); return; }
    const desde = angle.current;
    const t0 = performance.now();
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

  // Solo el video del frente reproduce
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.muted = muted;
        if (!reduced.current || !muted) v.play().catch(() => {});
      } else { v.pause(); v.muted = true; }
    });
  }, [active, muted]);

  // Giro automático mientras nadie interactúa ni escucha un video
  useEffect(() => {
    if (reduced.current || paused || !muted || ytPlaying !== null) return;
    const id = window.setInterval(() => setTurn((t) => t + 1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, muted, ytPlaying]);

  const go = (d: number) => { setYtPlaying(null); setTurn((t) => t + d); };
  const goTo = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    if (d) go(d);
  };

  return <div className={wide ? 'orbit orbit--wide' : 'orbit'} role="region" aria-roledescription="carrusel" aria-label={aria}
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
        const front = i === active;
        const key = it.src ?? it.youtube ?? it.label;
        return <div key={key} ref={(el) => { cards.current[i] = el; }} className={front ? 'orbit-card is-front' : 'orbit-card'}
          aria-hidden={!front}
          onClick={() => { if (!drag.current?.moved && !front) goTo(i); }}>
          {it.src && <video ref={(el) => { videos.current[i] = el; }} muted loop playsInline preload={front ? 'auto' : 'metadata'}
            poster={`/video-posters${it.src.replace(/\.[^.]+$/, '.jpg')}`} tabIndex={-1}>
            <source src={it.src} type={it.src.endsWith('.mov') ? undefined : 'video/mp4'} />
          </video>}
          {it.youtube && (front && ytPlaying === i
            ? <iframe src={`https://www.youtube-nocookie.com/embed/${it.youtube}?autoplay=1&rel=0`} title={it.label}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
            : <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${it.youtube}/hqdefault.jpg`} alt="" loading="lazy" draggable={false} />
              {front && <button type="button" className="orbit-play" onClick={() => setYtPlaying(i)} aria-label={`${labels.play}: ${it.label}`}>▶</button>}
            </>)}
          <span className="orbit-num">{String(i + 1).padStart(2, '0')}</span>
        </div>;
      })}
    </div>
    <div className="orbit-bar">
      <button type="button" className="orbit-arrow" onClick={() => go(-1)} aria-label={labels.prev}>←</button>
      <div className="orbit-info" aria-live="polite">
        <span className="orbit-label">{item.label}{item.sub && <small>{item.sub}</small>}</span>
        <span className="orbit-links">
          {item.src && <button type="button" className="orbit-sound" aria-pressed={!muted} onClick={() => setMuted((m) => !m)}>♪ {muted ? labels.soundOn : labels.soundOff}</button>}
          {item.src && <a href={item.src} target="_blank" rel="noreferrer">{labels.open}</a>}
          {item.youtube && <a href={`https://www.youtube.com/watch?v=${item.youtube}`} target="_blank" rel="noreferrer">{labels.youtube}</a>}
        </span>
      </div>
      <div className="orbit-dots">{items.map((it, i) => <button key={it.src ?? it.youtube ?? it.label} type="button" aria-label={it.label} aria-current={i === active} onClick={() => goTo(i)} />)}</div>
      <button type="button" className="orbit-arrow" onClick={() => go(1)} aria-label={labels.next}>→</button>
    </div>
  </div>;
}
