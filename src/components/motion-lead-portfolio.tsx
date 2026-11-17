import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { HeroMotion } from '@/components/hero-motion';
import { OrbitReel } from '@/components/orbit-reel';
import { Video } from '@/components/editing-portfolio';
import type { MotionLeadContent } from '@/lib/motion-lead-content';

// Portafolio principal: /es (español) y /en (inglés). Los textos viven en src/lib/motion-lead-content.tsx.
// Pensado para vacantes de motion graphics, edición y producción: motion graphics y animación,
// coordinar un equipo pequeño, revisar calidad visual y técnica, planear entregas y proponer herramientas (incluida IA).

function Lines({ a, b }: { a: string; b: string }) {
  return <>{a}<br/>{b}</>;
}

function Cards({ items }: { items: [string, string][] }) {
  return <div className="edit-skills">{items.map(([title, copy]) => <div key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div>;
}

export function MotionLeadPortfolio({ c }: { c: MotionLeadContent }) {
  const { t } = c;
  return <main className="edit-portfolio ml-portfolio site-shell" lang={c.lang}>
    <a href="#ml-motion" className="skip-link">{c.skip}</a>
    <header className="site-header"><nav aria-label={c.navAria}><a href="#ml-campaigns">{c.nav.campaigns}</a><a href="#ml-lead">{c.nav.lead}</a><a href="#ml-field">{c.nav.field}</a><a href="#ml-motion">{c.nav.motion}</a><a href="#ml-tools">{c.nav.tools}</a><a href="#ml-contact">{c.nav.contact}</a></nav><Link className="edit-lang" href={c.alt.href} hrefLang={c.lang === 'es' ? 'en' : 'es'} aria-label={c.alt.aria}>{c.alt.label}</Link><a className="edit-cv" href={c.cv} download>{c.downloadCv} ↗</a></header>

    <section id="ml-top" className="edit-hero ml-hero">
      <HeroMotion base={c.heroBase} pauseLabel={c.heroLabels.pause} playLabel={c.heroLabels.play} soundOnLabel={c.heroLabels.soundOn} soundOffLabel={c.heroLabels.soundOff} />
      <div className="edit-hero-copy ml-hero-copy">
        <div><h1 className="sr-only">{c.hero.srTitle}</h1><p className="edit-intro">{c.hero.intro}</p><ul className="ml-hero-tools" aria-label={c.hero.toolsAria}>{c.hero.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>
        <div><div className="hero-actions"><a className="button primary" href={c.cv} download>{c.downloadCv}</a></div><p className="edit-availability">{c.hero.availability}</p></div>
      </div>
    </section>
    <div className="edit-proof">{c.proof.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>

    <section id="ml-campaigns" className="section"><div className="section-inner">
      <Reveal><p className="eyebrow">{c.campaigns.eyebrow}</p><h2 className="edit-title"><Lines a={c.campaigns.titleA} b={c.campaigns.titleB}/></h2></Reveal>
      <article id="hubwell" className="edit-case edit-case-hubwell"><div><p className="eyebrow">{t.hubwell.eyebrow}</p><h3>{t.hubwell.titleA}<br/>{t.hubwell.titleB}</h3><p>{t.hubwell.body} <a className="edit-inline-link" href="https://www.instagram.com/hubwell.mx/reels/" target="_blank" rel="noreferrer">{t.hubwell.instagram}</a></p><dl className="edit-facts">{t.hubwell.facts.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}</dl><ul>{t.hubwell.bullets.map((b) => <li key={b}>{b}</li>)}</ul></div></article>
      <article className="edit-case edit-case-ad ml-case-text"><div><p className="eyebrow">{t.aalatam.eyebrow}</p><h3>{t.aalatam.titleA}<br/>{t.aalatam.titleB}</h3><p>{t.aalatam.body}</p><dl className="edit-facts">{t.aalatam.facts.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}</dl></div></article>
      <div className="ml-orbit-wrap"><OrbitReel items={[...['/hubwell-01.mp4', '/hubwell-02.mp4', '/hubwell_3.mov'].map((src, i) => ({ src, label: t.hubwell.labels[i] })), { src: '/AALATAM%20V4.mp4', label: t.aalatam.label }]} aria={c.campaigns.orbitAria} labels={c.orbit} /></div>
    </div></section>

    <section id="ml-lead" className="section ml-lead"><div className="section-inner">
      <Reveal><p className="eyebrow">{c.lead.eyebrow}</p><h2 className="edit-title"><Lines a={c.lead.titleA} b={c.lead.titleB}/></h2><p className="edit-summary">{c.lead.summary}</p></Reveal>
      <div className="edit-background"><Video src="/tricaster_2_web.mp4" label={c.lead.videoLabel} t={t}/><div><h3>TV Azteca / CNP Jalisco</h3><p className="eyebrow">{c.lead.dates}</p>
        <ul className="ml-list">{c.lead.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul></div></div>
      <h3 className="ml-subtitle">{c.lead.workflowTitle}</h3>
      <ol className="edit-workflow ml-workflow">{c.lead.workflow.map(([title, copy], i) => <li key={title}><span>{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
    </div></section>

    <section id="ml-field" className="section"><div className="section-inner">
      <Reveal><p className="eyebrow">{c.field.eyebrow}</p><h2 className="edit-title"><Lines a={c.field.titleA} b={c.field.titleB}/></h2></Reveal>
      <article className="edit-background edit-field-assignment">
        <div className="edit-assignment-media"><Image src="/VARIAS%20CANCUN.jpeg" alt={t.tv.costaPhotoAlt} width={1000} height={700}/><Video src="/kantunilkin_2_web.mp4" label={t.tv.costaLabel} t={t}/></div>
        <div><p className="eyebrow">{t.tv.costaEyebrow}</p><h3>{c.field.costaRole}</h3>{t.tv.costaBody.map((p) => <p key={p}>{p}</p>)}</div>
      </article>
      <article className="edit-background edit-field-assignment">
        <div className="edit-assignment-media"><Image src="/FOTO%20TLAJ.jpg" alt={t.tlajtoli.photoAlt} width={1000} height={700}/><Video src="/tlajtoali-video.mp4" label="Tlajtoli 2026 / Reel" t={t}/></div>
        <div><p className="eyebrow">{c.field.tlajtoliEyebrow}</p><h3>{t.tlajtoli.heading}</h3><p>{t.tlajtoli.body}</p></div>
      </article>
      <h3 className="ml-subtitle">{c.field.shootTitle}</h3>
      <Cards items={c.field.shoot}/>
    </div></section>

    <section id="ml-motion" className="section"><div className="section-inner">
      <Reveal><p className="eyebrow">{c.motion.eyebrow}</p><h2 className="edit-title"><Lines a={c.motion.titleA} b={c.motion.titleB}/></h2><p className="edit-summary">{c.motion.summary}</p></Reveal>
      <div className="ml-motion-grid"><Video src="/cortinilla-01.mp4" label={c.motion.labels[0]} t={t}/><Video src="/cortinilla-02.mp4" label={c.motion.labels[1]} t={t}/></div>
      <Cards items={c.motion.skills}/>
      <div className="tag-list"><span>After Effects</span><span>Premiere Pro</span><span>Illustrator</span><span>Photoshop</span><span>Audition</span></div>
    </div></section>

    <section id="ml-corporate" className="section"><div className="section-inner">
      <Reveal><p className="eyebrow">{c.corporate.eyebrow}</p><h2 className="edit-title"><Lines a={c.corporate.titleA} b={c.corporate.titleB}/></h2><p className="edit-summary">{c.corporate.summary}</p></Reveal>
      <OrbitReel wide items={c.corporate.items.map((v) => ({ youtube: v.id, label: v.client, sub: `${v.kind} · ${v.role}` }))} aria={c.corporate.orbitAria} labels={c.orbit} />
    </div></section>

    <section id="ml-tools" className="section"><div className="section-inner">
      <Reveal><p className="eyebrow">{c.tools.eyebrow}</p><h2 className="edit-title"><Lines a={c.tools.titleA} b={c.tools.titleB}/></h2></Reveal>
      <Cards items={c.tools.skills}/>
    </div></section>

    <footer id="ml-contact" className="contact-section"><div className="section-inner contact-layout"><div><h2><Lines a={c.contact.titleA} b={c.contact.titleB}/></h2></div><div className="contact-details"><h3>Isaí Rodríguez Ortega</h3><p>{c.contact.location}<br/>{c.contact.availability}</p><a href="mailto:orror.isai@outlook.com">orror.isai@outlook.com</a><a href="https://www.linkedin.com/in/iro/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="button primary" href={c.cv} download>{c.downloadCv}</a></div></div><div className="footer-line"><span>© {new Date().getFullYear()}</span><Link href={c.alt.href} hrefLang={c.lang === 'es' ? 'en' : 'es'}>{c.alt.footer}</Link></div></footer>
  </main>;
}
