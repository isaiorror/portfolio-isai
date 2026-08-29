"use client";
import { motion } from "framer-motion";

const stats = [["10+", "años en producción"], ["5+", "años en TV Azteca"], ["REMI", "producción remota"]];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07090b] text-white">
      <div className="broadcast-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="signal-glow absolute -right-40 top-20 h-[520px] w-[520px] rounded-full" aria-hidden="true" />
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
        <a href="#inicio" className="font-mono text-sm font-semibold tracking-[0.22em]">IRO<span className="text-[#ff4d00]">/</span>LIVE</a>
        <div className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.18em] text-white/60 md:flex">
          <a className="transition hover:text-white" href="#experiencia">Experiencia</a><a className="transition hover:text-white" href="#proyectos">Proyectos</a><a className="transition hover:text-white" href="mailto:orror.isai@outlook.com">Contacto</a>
        </div>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60"><span className="h-2 w-2 animate-pulse rounded-full bg-[#ff4d00]" /> Disponible</span>
      </nav>
      <section id="inicio" className="relative z-10 mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-12 px-6 pb-16 pt-12 lg:grid-cols-[1fr_0.55fr] lg:px-10 lg:pb-24">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 flex items-center gap-3"><span className="h-px w-10 bg-[#ff4d00]" /><p className="font-mono text-xs uppercase tracking-[0.28em] text-[#ff7540]">Broadcast Operations Leader</p></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="max-w-5xl text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[0.84] tracking-[-0.07em]">ISAÍ<br /><span className="text-outline">RODRÍGUEZ</span></motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 }} className="mt-10 grid gap-8 border-t border-white/15 pt-7 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-2xl text-base leading-7 text-white/62 md:text-lg">Lidero operaciones audiovisuales complejas, equipos multidisciplinarios y producción remota para televisión e instituciones públicas.</p>
            <div className="flex flex-wrap gap-3"><a href="#proyectos" className="rounded-sm bg-[#ff4d00] px-6 py-3 text-sm font-semibold transition hover:bg-[#ff6425]">Explorar trabajo</a><a href="mailto:orror.isai@outlook.com" className="rounded-sm border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-white/50 hover:bg-white/5">Hablemos</a></div>
          </motion.div>
        </div>
        <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="self-end border-l border-white/15 pl-6 lg:mb-4">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Impacto operativo</p>
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">{stats.map(([value, label]) => <div key={label} className="border-t border-white/15 pt-4 lg:flex lg:items-baseline lg:justify-between"><strong className="block text-2xl font-medium tracking-tight lg:text-3xl">{value}</strong><span className="mt-1 block text-xs text-white/45 lg:text-right">{label}</span></div>)}</div>
        </motion.aside>
      </section>

      <section id="experiencia" className="relative z-10 border-t border-white/10 bg-[#0b0e11] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.55fr_1fr]">
          <div><p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[#ff7540]">01 / Perfil</p><h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Operación,<br />tecnología y<br />liderazgo.</h2></div>
          <div className="grid gap-px overflow-hidden rounded-sm bg-white/10 md:grid-cols-2">
            {[
              ["Producción en vivo", "Dirección de flujos críticos, cabina, talento y equipos técnicos bajo presión."],
              ["Operaciones broadcast", "Coordinación de procesos, recursos y estándares para transmisiones consistentes."],
              ["Producción REMI", "Experiencia en infraestructura y colaboración para producción remota eficiente."],
              ["Liderazgo de equipos", "Alineación de perfiles creativos, editoriales y técnicos hacia un mismo resultado."],
            ].map(([title, copy], index) => <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ delay: index * .07 }} className="bg-[#111417] p-7"><span className="font-mono text-xs text-white/25">0{index + 1}</span><h3 className="mt-12 text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-white/50">{copy}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section id="proyectos" className="relative z-10 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6"><div><p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[#ff7540]">02 / Trayectoria</p><h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Experiencia que conecta.</h2></div><p className="max-w-sm text-sm leading-6 text-white/45">El portafolio crecerá con casos de estudio, evidencia visual y resultados medibles de cada operación.</p></div>
          <article className="group grid overflow-hidden border border-white/12 bg-[#0d1013] md:grid-cols-[1fr_1.2fr]">
            <div className="relative min-h-72 overflow-hidden bg-[#11151a] p-8"><div className="absolute inset-0 opacity-30 broadcast-grid" /><div className="relative flex h-full flex-col justify-between"><span className="w-fit rounded-full border border-[#ff4d00]/40 bg-[#ff4d00]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[.2em] text-[#ff7540]">Centro Nacional de Producción</span><strong className="font-mono text-7xl text-white/10 transition group-hover:text-[#ff4d00]/20">CNP</strong></div></div>
            <div className="flex flex-col justify-between p-8 md:p-12"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-white/35">TV Azteca · Operaciones broadcast</p><h3 className="mt-5 text-3xl font-medium tracking-tight md:text-4xl">De editor a productor de noticieros locales.</h3><p className="mt-6 max-w-xl leading-7 text-white/52">Participación en la implementación del tercer centro de producción remota y promoción a productor en dos meses, coordinando producción para televisoras regionales.</p></div><div className="mt-12 flex flex-wrap gap-2">{["Producción", "REMI", "NDI", "Tricaster", "iNews"].map(tag => <span key={tag} className="border border-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/45">{tag}</span>)}</div></div>
          </article>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-14 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="font-mono text-xs uppercase tracking-[.25em] text-[#ff7540]">Contacto</p><a className="mt-4 block text-2xl font-medium tracking-tight transition hover:text-[#ff7540] md:text-4xl" href="mailto:orror.isai@outlook.com">orror.isai@outlook.com</a></div><div className="text-sm text-white/40"><a className="mr-6 hover:text-white" href="https://www.linkedin.com/in/iro/" target="_blank" rel="noreferrer">LinkedIn</a><span>Guadalajara, México</span></div></div></footer>
    </main>
  );
}
