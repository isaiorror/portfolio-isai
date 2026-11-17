import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { HeroMotion } from '@/components/hero-motion';
import { OrbitReel } from '@/components/orbit-reel';
import { Video } from '@/components/editing-portfolio';
import { es as t } from '@/lib/capcut-content';

// Portafolio en español adaptado a la vacante "Motion Graphics Lead" (agencia, Guadalajara).
// La vacante pide: motion graphics y animación, coordinar un equipo pequeño, revisar calidad
// visual y técnica, planear entregas, proponer herramientas (incluida IA) y ver demo reel.

const CV = '/isai-rodriguez-cv-es.pdf';

const corporate = [
  { id: 'tvQ7fljLNfw', client: 'IDIM Olben', kind: 'Video corporativo', role: 'Guion, grabación y edición' },
  { id: 'cNuj1_v5Vt0', client: 'Pro Mujer Hidalgo', kind: 'Video institucional', role: 'Guion, grabación y edición' },
  { id: 'ZjX3qNHVltw', client: 'Bombardier Transportation', kind: 'Comunicación interna', role: 'Producción de video corporativo' },
  { id: 'ZLNtisQpGIQ', client: 'Igualdad Animal', kind: 'Investigación', role: 'Cámara de investigación' },
];

export function MotionLeadPortfolio() {
  return <main className="edit-portfolio ml-portfolio site-shell" lang="es">
    <a href="#ml-motion" className="skip-link">Ir a motion graphics</a>
    <header className="site-header"><nav aria-label="Navegación del portafolio"><a href="#ml-lead">Coordinación</a><a href="#ml-field">Campo</a><a href="#ml-motion">Motion</a><a href="#ml-campaigns">Campañas</a><a href="#ml-tools">Herramientas</a><a href="#ml-contact">Contacto</a></nav><Link className="edit-lang" href="/capcut" hrefLang="en" aria-label="English version">EN</Link><a className="edit-cv" href={CV} download>Descargar CV ↗</a></header>

    <section id="ml-top" className="edit-hero ml-hero">
      <HeroMotion pauseLabel="Pausar animación" playLabel="Reproducir animación" soundOnLabel="Activar sonido" soundOffLabel="Silenciar" />
      <div className="edit-hero-copy ml-hero-copy">
        <div><h1 className="sr-only">Isaí Rodríguez Ortega. Motion graphics y video: edición remota, producción en campo con IA, broadcast en vivo y motion graphics.</h1><p className="edit-intro">{t.hero.intro}</p><ul className="ml-hero-tools" aria-label="Herramientas">{t.hero.deck.split(' · ').map((tool) => <li key={tool}>{tool}</li>)}</ul></div>
        <div><div className="hero-actions"><a className="button primary" href={CV} download>Descargar CV</a></div><p className="edit-availability">{t.hero.availability}</p></div>
      </div>
    </section>
    <div className="edit-proof">{t.proof.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>

    <section id="ml-lead" className="section ml-lead"><div className="section-inner">
      <Reveal><p className="eyebrow">01 / Coordinación y liderazgo</p><h2 className="edit-title">Equipos que entregan<br/>a tiempo, todos los días.</h2><p className="edit-summary">En la televisión en vivo no hay segunda oportunidad. Ahí aprendí a organizar prioridades, revisar calidad bajo presión y formar a otros editores.</p></Reveal>
      <div className="edit-background"><Video src="/tricaster_2_web.mp4" label="TV Azteca / Producción remota con Tricaster" t={t}/><div><h3>TV Azteca / CNP Jalisco</h3><p className="eyebrow">Febrero 2021 – agosto 2026 · Editor → Productor de noticias locales</p>
        <ul className="ml-list">
          <li>Formé parte del equipo que operaba desde Guadalajara la producción de forma remota (REMI) de <b>seis noticieros estatales de 30 minutos</b>, con salida al aire de lunes a viernes de 14:30 a 15:00 horas.</li>
          <li>Fui capacitado para configurar el Tricaster para REMI y cuidé que cada emisión saliera en orden, a tiempo y con las pautas comerciales correctas.</li>
          <li>Revisé la calidad visual y técnica de <b>más de 20 notas por turno</b>; participé en procesos asociados con una reducción aproximada del <b>70 % en errores de edición</b>, medida en bitácoras internas.</li>
          <li>Capacité a <b>más de 20 editores</b> en cinco años con documentación operativa, referencias visuales y videotutoriales.</li>
        </ul></div></div>
      <h3 className="ml-subtitle">Cómo organizo un proyecto</h3>
      <ol className="edit-workflow ml-workflow">{[
        ['Brief y preproducción', 'Aterrizo el concepto, el guion y la planeación del rodaje (equipo y tiempos); defino entregables, responsables y fechas.'],
        ['Rodaje y postproducción', 'Grabo con cámara, iluminación y audio directo; edito, hago corrección de color básica y mezclo audio, con revisiones intermedias.'],
        ['Revisión de calidad', 'Reviso composición, color, animación, tipografía, audio y formatos antes de que salga cualquier pieza.'],
        ['Entrega y mejora', 'Entrego a tiempo, documento lo aprendido y propongo ajustes de proceso o herramientas.'],
      ].map(([title, copy], i) => <li key={title}><span>{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
    </div></section>

    <section id="ml-field" className="section"><div className="section-inner">
      <Reveal><p className="eyebrow">02 / Producción en campo y eventos</p><h2 className="edit-title">Cuando el proyecto<br/>sale del estudio.</h2></Reveal>
      <article className="edit-background edit-field-assignment">
        <div className="edit-assignment-media"><Image src="/VARIAS%20CANCUN.jpeg" alt={t.tv.costaPhotoAlt} width={1000} height={700}/><Video src="/kantunilkin_2_web.mp4" label={t.tv.costaLabel} t={t}/></div>
        <div><p className="eyebrow">{t.tv.costaEyebrow}</p><h3>Editor y realizador</h3>{t.tv.costaBody.map((p) => <p key={p}>{p}</p>)}</div>
      </article>
      <article className="edit-background edit-field-assignment">
        <div className="edit-assignment-media"><Image src="/FOTO%20TLAJ.jpg" alt={t.tlajtoli.photoAlt} width={1000} height={700}/><Video src="/tlajtoali-video.mp4" label="Tlajtoli 2026 / Reel" t={t}/></div>
        <div><p className="eyebrow">Tlajtoli 2026 / Evento institucional</p><h3>{t.tlajtoli.heading}</h3><p>{t.tlajtoli.body}</p></div>
      </article>
      <h3 className="ml-subtitle">En rodaje</h3>
      <div className="edit-skills">{[
        ['Preproducción', 'Guion y planeación del rodaje en estudio o exteriores: equipo, tiempos y necesidades técnicas.'],
        ['Cámara, luz y audio', 'Cámara Sony FX30 y DJI Osmo, iluminación básica y audio directo con micrófonos inalámbricos DJI.'],
        ['Postproducción', 'Edición y montaje narrativo, corrección de color básica (balance de blancos y exposición), mezcla de audio y exportación por formato y plataforma.'],
      ].map(([title, copy]) => <div key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div>
    </div></section>

    <section id="ml-motion" className="section"><div className="section-inner">
      <Reveal><p className="eyebrow">03 / Motion graphics</p><h2 className="edit-title">Movimiento con<br/>intención.</h2><p className="edit-summary">Cortinillas y transiciones animadas. Cada pieza tiene que leerse rápido, sostener la identidad y dar ritmo a la edición.</p></Reveal>
      <div className="ml-motion-grid"><Video src="/cortinilla-01.mp4" label="Motion / Cortinilla 01" t={t}/><Video src="/cortinilla-02.mp4" label="Motion / Cortinilla 02" t={t}/></div>
      <div className="edit-skills">{[
        ['Animación y texto', 'Texto animado, keyframes, máscaras, tracking, overlays y transiciones.'],
        ['Diseño para pantalla', 'Gráficos preparados en Illustrator y Photoshop, adaptados a 16:9 y 9:16.'],
        ['Storytelling', 'Ritmo, composición y jerarquía visual al servicio del mensaje de la marca.'],
      ].map(([title, copy]) => <div key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div>
      <div className="tag-list"><span>After Effects</span><span>Premiere Pro</span><span>Illustrator</span><span>Photoshop</span><span>Audition</span></div>
    </div></section>

    <section id="ml-campaigns" className="section"><div className="section-inner">
      <Reveal><p className="eyebrow">04 / Campañas y redes</p><h2 className="edit-title">Marcas en formato<br/>vertical.</h2></Reveal>
      <article id="hubwell" className="edit-case edit-case-hubwell"><div><p className="eyebrow">{t.hubwell.eyebrow}</p><h3>{t.hubwell.titleA}<br/>{t.hubwell.titleB}</h3><p>{t.hubwell.body} <a className="edit-inline-link" href="https://www.instagram.com/hubwell.mx/reels/" target="_blank" rel="noreferrer">{t.hubwell.instagram}</a></p><dl className="edit-facts">{t.hubwell.facts.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}</dl><ul>{t.hubwell.bullets.map((b) => <li key={b}>{b}</li>)}</ul></div></article>
      <article className="edit-case edit-case-ad ml-case-text"><div><p className="eyebrow">{t.aalatam.eyebrow}</p><h3>{t.aalatam.titleA}<br/>{t.aalatam.titleB}</h3><p>{t.aalatam.body}</p><dl className="edit-facts">{t.aalatam.facts.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}</dl></div></article>
      <div className="ml-orbit-wrap"><OrbitReel items={[...['/hubwell-01.mp4', '/hubwell-02.mp4', '/hubwell_3.mov'].map((src, i) => ({ src, label: t.hubwell.labels[i] })), { src: '/AALATAM%20V4.mp4', label: t.aalatam.label }]} openLabel="Abrir video ↗" soundOn="Activar sonido" soundOff="Silenciar" prevLabel="Video anterior" nextLabel="Video siguiente" aria="Videos verticales para campañas y redes" /></div>
    </div></section>

    <section id="ml-corporate" className="section"><div className="section-inner">
      <Reveal><p className="eyebrow">05 / Video corporativo e institucional</p><h2 className="edit-title">Del guion<br/>a la pantalla.</h2><p className="edit-summary">Proyectos para marcas e instituciones, de la idea a la entrega final.</p></Reveal>
      <div className="ml-yt-grid">{corporate.map((v) => <figure key={v.id} className="ml-yt"><div className="ml-yt-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${v.id}`} title={`${v.client} – ${v.kind}`} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen /></div><figcaption><strong>{v.client}</strong><span>{v.kind} · {v.role}</span><a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer">Ver en YouTube ↗</a></figcaption></figure>)}</div>
    </div></section>

    <section id="ml-tools" className="section"><div className="section-inner">
      <Reveal><p className="eyebrow">06 / Herramientas e IA</p><h2 className="edit-title">Las herramientas<br/>correctas para cada pieza.</h2></Reveal>
      <div className="edit-skills">{[
        ['Adobe', 'After Effects (motion graphics), Premiere Pro, Illustrator, Photoshop y Audition.'],
        ['Edición y producción', 'CapCut Pro, Final Cut Pro, Tricaster (REMI), OBS y NDI. Equipo propio: cámara Sony FX30, DJI Osmo y micrófonos inalámbricos DJI.'],
        ['Inteligencia artificial', 'ChatGPT, Claude, Google Flow y Higgsfield para ideación, guiones, organización y producción de contenidos.'],
      ].map(([title, copy]) => <div key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div>
    </div></section>

    <footer id="ml-contact" className="contact-section"><div className="section-inner contact-layout"><div><h2>TRABAJEMOS<br/>JUNTOS.</h2></div><div className="contact-details"><h3>Isaí Rodríguez Ortega</h3><p>Guadalajara, Jal.<br/>Disponible de inmediato · Presencial o híbrido en Guadalajara</p><a href="mailto:orror.isai@outlook.com">orror.isai@outlook.com</a><a href="https://www.linkedin.com/in/iro/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="button primary" href={CV} download>Descargar CV</a></div></div><div className="footer-line"><span>© {new Date().getFullYear()}</span><Link href="/capcut" hrefLang="en">English version</Link></div></footer>
  </main>;
}
