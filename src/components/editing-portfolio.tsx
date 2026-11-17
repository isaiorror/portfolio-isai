import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import type { CapcutContent } from '@/lib/capcut-content';

export function Video({ src, label, t, vertical = false }: { src: string; label: string; t: CapcutContent; vertical?: boolean }) {
  const poster = `/video-posters${src.replace(/\.[^.]+$/, '.jpg')}`;
  return <figure className={vertical ? 'edit-video vertical' : 'edit-video'}><video controls playsInline preload="none" poster={poster} aria-label={label}><source src={src} type={src.endsWith(".mov") ? undefined : "video/mp4"} />{t.video.fallback} <a href={src}>{t.video.fallbackLink}</a>.</video><figcaption>{label}<a href={src} target="_blank" rel="noreferrer">{t.video.open}</a></figcaption></figure>;
}

function Lines({ a, b }: { a: string; b: string }) {
  return <>{a}<br/>{b}</>;
}

export function EditingPortfolio({ t }: { t: CapcutContent }) {
  const hubwellFiles = ['/hubwell-01.mp4', '/hubwell-02.mp4', '/hubwell_3.mov'];
  return <main className="edit-portfolio site-shell" lang={t.lang}>
    <a href="#edit-work" className="skip-link">{t.skip}</a>
    <header className="site-header"><nav aria-label={t.nav.aria}><a href="#edit-work">{t.nav.work}</a><a href="#edit-craft">{t.nav.craft}</a><a href="#edit-background">{t.nav.background}</a><a href="#edit-contact">{t.nav.contact}</a></nav><Link className="edit-lang" href={t.altLang.href} hrefLang={t.altLang.label.toLowerCase()} aria-label={t.altLang.name}>{t.altLang.label}</Link><a className="edit-cv" href={t.cv.href} download>{t.cv.header}</a></header>
    <section id="edit-top" className="edit-hero">
      <Image src="/CNP%203.jpg" alt={t.hero.photoAlt} fill priority sizes="100vw" className="edit-hero-photo" />
      <div className="edit-hero-overlay" />
      <div className="edit-hero-copy"><p className="eyebrow">{t.hero.eyebrow}</p><h1>{t.hero.titleA}<br/><span>{t.hero.titleB}</span></h1><p className="edit-deck">{t.hero.deck}</p><p className="edit-intro">{t.hero.intro}</p><div className="hero-actions"><a className="button primary" href={t.hero.watchHref}>{t.hero.watch}</a><a className="button secondary" href={t.cv.href} download>{t.cv.hero}</a></div><ul className="edit-hero-reel" aria-label={t.hero.reelAria}>{[['hubwell-01','01'],['hubwell-02','02'],['hubwell_3','03']].map(([f,n])=>{const l=`${t.hero.reelItem} ${n}`;return <li key={f}><a href="#hubwell"><Image src={`/video-posters/${f}.jpg`} alt={t.hero.reelThumb.replace('{label}', l)} fill sizes="120px"/><span>▶ {l}</span></a></li>;})}</ul><p className="edit-availability">{t.hero.availability}</p></div>
    </section>
    <div className="edit-proof">{t.proof.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
    <section id="edit-work" className="section"><div className="section-inner">
      <Reveal><p className="eyebrow">{t.work.eyebrow}</p><h2 className="edit-title"><Lines a={t.work.titleA} b={t.work.titleB}/></h2><p className="edit-summary">{t.work.summary}</p></Reveal>
      <article id="hubwell" className="edit-case edit-case-hubwell"><div><p className="eyebrow">{t.hubwell.eyebrow}</p><h3><Lines a={t.hubwell.titleA} b={t.hubwell.titleB}/></h3><p>{t.hubwell.body} <a className="edit-inline-link" href="https://www.instagram.com/hubwell.mx/reels/" target="_blank" rel="noreferrer">{t.hubwell.instagram}</a></p><dl className="edit-facts">{t.hubwell.facts.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}</dl><ul>{t.hubwell.bullets.map((b) => <li key={b}>{b}</li>)}</ul></div><div className="edit-video-duo">{hubwellFiles.map((src, i) => <Video key={src} src={src} label={t.hubwell.labels[i]} t={t} vertical/>)}</div></article>
      <article className="edit-case edit-case-ad"><div><p className="eyebrow">{t.aalatam.eyebrow}</p><h3><Lines a={t.aalatam.titleA} b={t.aalatam.titleB}/></h3><p>{t.aalatam.body}</p><dl className="edit-facts">{t.aalatam.facts.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}</dl></div><Video src="/AALATAM%20V4.mp4" label={t.aalatam.label} t={t} vertical/></article>
    </div></section>
    <section id="edit-craft" className="section"><div className="section-inner"><p className="eyebrow">{t.craft.eyebrow}</p><h2 className="edit-title">{t.craft.title}</h2><div className="edit-skills">{t.craft.skills.map(([title,copy])=><div key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div><div className="edit-motion"><div><h3>{t.craft.motionTitle}</h3><p>{t.craft.motionBody}</p><div className="tag-list"><span>Premiere Pro</span><span>After Effects</span><span>Photoshop</span><span>Audition</span></div></div><div className="edit-video-duo"><Video src="/cortinilla-01.mp4" label={t.craft.motionLabels[0]} t={t}/><Video src="/cortinilla-02.mp4" label={t.craft.motionLabels[1]} t={t}/></div></div></div></section>
    <section className="section"><div className="section-inner"><p className="eyebrow">{t.workflow.eyebrow}</p><h2 className="edit-title">{t.workflow.title}</h2><ol className="edit-workflow">{t.workflow.steps.map(([title, copy], i) => <li key={title}><span>{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></div></section>
    <section id="edit-background" className="section"><div className="section-inner"><p className="eyebrow">{t.tv.eyebrow}</p><h2 className="edit-title"><Lines a={t.tv.titleA} b={t.tv.titleB}/></h2><div className="edit-background"><Video src="/tricaster_2_web.mp4" label={t.tv.reelLabel} t={t}/><div><h3>{t.tv.heading}</h3><p className="eyebrow">{t.tv.dates}</p>{t.tv.body.map((p) => <p key={p}>{p}</p>)}</div></div>
    <article className="edit-background edit-field-assignment">
      <div className="edit-assignment-media"><Image src="/VARIAS%20CANCUN.jpeg" alt={t.tv.costaPhotoAlt} width={1000} height={700}/><Video src="/kantunilkin_2_web.mp4" label={t.tv.costaLabel} t={t}/></div>
      <div><p className="eyebrow">{t.tv.costaEyebrow}</p><h3>{t.tv.costaHeading}</h3>{t.tv.costaBody.map((p) => <p key={p}>{p}</p>)}</div>
    </article>
    </div></section>
    <section id="edit-tlajtoli" className="section"><div className="section-inner">
      <p className="eyebrow">{t.tlajtoli.eyebrow}</p><h2 className="edit-title">Tlajtoli 2026</h2>
      <div className="edit-background"><div className="edit-assignment-media"><Image src="/FOTO%20TLAJ.jpg" alt={t.tlajtoli.photoAlt} width={1000} height={700}/><Video src="/tlajtoali-video.mp4" label={t.tlajtoli.label} t={t}/></div><div><h3>{t.tlajtoli.heading}</h3><p>{t.tlajtoli.body}</p></div></div>
    </div></section>
    <footer id="edit-contact" className="contact-section"><div className="section-inner contact-layout"><div><p className="eyebrow">{t.contact.eyebrow}</p><h2><Lines a={t.contact.titleA} b={t.contact.titleB}/></h2></div><div className="contact-details"><h3>Isaí Rodríguez Ortega</h3><p>{t.contact.location}<br/>{t.contact.availability}</p><a href="mailto:orror.isai@outlook.com">orror.isai@outlook.com</a><a href="https://www.linkedin.com/in/iro/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="button primary" href={t.cv.href} download>{t.cv.contact}</a></div></div><div className="footer-line"><span>© {new Date().getFullYear()}</span><Link href={t.altLang.href} hrefLang={t.altLang.label.toLowerCase()}>{t.altLang.name}</Link></div></footer>
  </main>;
}
