'use client';
import { useEffect, useRef, useState } from 'react';

// Loop de motion graphics del hero (12 s, sin audio). Se genera con scripts/hero_motion.py.
// 16:9 en escritorio y 4:5 en celular. Con "reducir movimiento" se queda en la imagen fija.
const BASE = '/hero-motion/hero';
const MOBILE = '(max-width: 700px)';

export function HeroMotion({ pauseLabel, playLabel }: { pauseLabel: string; playLabel: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const mobile = window.matchMedia(MOBILE).matches;
    video.poster = `${BASE}-${mobile ? '4x5' : '16x9'}-poster.jpg`;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().then(() => setPlaying(true)).catch(() => {});
    else { video.pause(); setPlaying(false); }
  };

  return <div className="hero-motion">
    <video ref={ref} muted loop playsInline preload="auto" poster={`${BASE}-16x9-poster.jpg`} aria-hidden="true" tabIndex={-1}>
      <source src={`${BASE}-4x5.webm`} type="video/webm" media={MOBILE} />
      <source src={`${BASE}-4x5.mp4`} type="video/mp4" media={MOBILE} />
      <source src={`${BASE}-16x9.webm`} type="video/webm" />
      <source src={`${BASE}-16x9.mp4`} type="video/mp4" />
    </video>
    <button type="button" className="hero-motion-toggle" onClick={toggle} aria-label={playing ? pauseLabel : playLabel}>
      <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
    </button>
  </div>;
}
