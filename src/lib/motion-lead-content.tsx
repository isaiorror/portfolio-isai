import type { ReactNode } from 'react';
import { en as capcutEn, es as capcutEs, type CapcutContent } from '@/lib/capcut-content';

// Textos del portafolio principal (/es en español, /en en inglés).
// Ambas versiones comparten el diseño de src/components/motion-lead-portfolio.tsx.
// Al cambiar un dato, cámbialo en los dos idiomas.

type Pair = [string, string];

export type MotionLeadContent = {
  lang: 'es' | 'en';
  t: CapcutContent; // textos compartidos con /capcut (HUBWELL, AALATAM, Costa Maya, Tlajtoli, video)
  cv: string;
  heroBase: string; // prefijo de los videos del hero en public/hero-motion
  alt: { label: string; href: string; aria: string; footer: string };
  skip: string;
  navAria: string;
  nav: { campaigns: string; lead: string; field: string; motion: string; tools: string; contact: string };
  downloadCv: string;
  heroLabels: { pause: string; play: string; soundOn: string; soundOff: string };
  orbit: { open: string; youtube: string; soundOn: string; soundOff: string; prev: string; next: string; play: string };
  hero: { srTitle: string; intro: string; tools: string[]; toolsAria: string; availability: string };
  proof: Pair[];
  campaigns: { eyebrow: string; titleA: string; titleB: string; orbitAria: string };
  lead: {
    eyebrow: string; titleA: string; titleB: string; summary: string; videoLabel: string; dates: string;
    bullets: ReactNode[]; workflowTitle: string; workflow: Pair[];
  };
  field: { eyebrow: string; titleA: string; titleB: string; costaRole: string; tlajtoliEyebrow: string; shootTitle: string; shoot: Pair[] };
  motion: { eyebrow: string; titleA: string; titleB: string; summary: string; labels: Pair; skills: Pair[] };
  corporate: {
    eyebrow: string; titleA: string; titleB: string; summary: string; orbitAria: string;
    items: { id: string; client: string; kind: string; role: string }[];
  };
  tools: { eyebrow: string; titleA: string; titleB: string; skills: Pair[] };
  contact: { titleA: string; titleB: string; location: string; availability: string };
};

const corporateIds = ['tvQ7fljLNfw', 'cNuj1_v5Vt0', 'ZjX3qNHVltw', 'ZLNtisQpGIQ'];
const clients = ['IDIM Olben', 'Pro Mujer Hidalgo', 'Bombardier Transportation', 'Igualdad Animal'];
const tools = ['CapCut Pro', 'Final Cut Pro', 'OBS', 'Tricaster', 'After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop'];

export const mlEs: MotionLeadContent = {
  lang: 'es',
  t: capcutEs,
  cv: '/isai-rodriguez-cv-es.pdf',
  heroBase: '/hero-motion/hero',
  alt: { label: 'EN', href: '/en', aria: 'English version', footer: 'English version' },
  skip: 'Ir a motion graphics',
  navAria: 'Navegación del portafolio',
  nav: { campaigns: 'Campañas', lead: 'Coordinación', field: 'Campo', motion: 'Motion', tools: 'Herramientas', contact: 'Contacto' },
  downloadCv: 'Descargar CV',
  heroLabels: { pause: 'Pausar animación', play: 'Reproducir animación', soundOn: 'Activar sonido', soundOff: 'Silenciar' },
  orbit: { open: 'Abrir video ↗', youtube: 'Ver en YouTube ↗', soundOn: 'Activar sonido', soundOff: 'Silenciar', prev: 'Video anterior', next: 'Video siguiente', play: 'Reproducir' },
  hero: {
    srTitle: 'Isaí Rodríguez Ortega. Motion graphics y video: edición remota, producción en campo con IA, broadcast en vivo y motion graphics.',
    intro: capcutEs.hero.intro,
    tools: [...tools, 'IA aplicada'],
    toolsAria: 'Herramientas',
    availability: capcutEs.hero.availability,
  },
  proof: capcutEs.proof,
  campaigns: { eyebrow: '01 / Campañas y redes', titleA: 'Marcas en formato', titleB: 'vertical.', orbitAria: 'Videos verticales para campañas y redes' },
  lead: {
    eyebrow: '02 / Coordinación y liderazgo',
    titleA: 'Equipos que entregan',
    titleB: 'a tiempo, todos los días.',
    summary: 'En la televisión en vivo no hay segunda oportunidad. Ahí aprendí a organizar prioridades, revisar calidad bajo presión y formar a otros editores.',
    videoLabel: 'TV Azteca / Producción remota con Tricaster',
    dates: 'Febrero 2021 – agosto 2026 · Editor → Productor de noticias locales',
    bullets: [
      <>Formé parte del equipo que operaba desde Guadalajara la producción de forma remota (REMI) de <b>seis noticieros estatales de 30 minutos</b>, con salida al aire de lunes a viernes de 14:30 a 15:00 horas.</>,
      <>Fui capacitado para configurar el Tricaster para REMI y cuidé que cada emisión saliera en orden, a tiempo y con las pautas comerciales correctas.</>,
      <>Revisé la calidad visual y técnica de <b>más de 20 notas por turno</b>; participé en procesos asociados con una reducción aproximada del <b>70 % en errores de edición</b>, medida en bitácoras internas.</>,
      <>Capacité a <b>más de 20 editores</b> en cinco años con documentación operativa, referencias visuales y videotutoriales.</>,
    ],
    workflowTitle: 'Cómo organizo un proyecto',
    workflow: [
      ['Brief y preproducción', 'Aterrizo el concepto, el guion y la planeación del rodaje (equipo y tiempos); defino entregables, responsables y fechas.'],
      ['Rodaje y postproducción', 'Grabo con cámara, iluminación y audio directo; edito, hago corrección de color básica y mezclo audio, con revisiones intermedias.'],
      ['Revisión de calidad', 'Reviso composición, color, animación, tipografía, audio y formatos antes de que salga cualquier pieza.'],
      ['Entrega y mejora', 'Entrego a tiempo, documento lo aprendido y propongo ajustes de proceso o herramientas.'],
    ],
  },
  field: {
    eyebrow: '03 / Producción en campo y eventos',
    titleA: 'Cuando el proyecto',
    titleB: 'sale del estudio.',
    costaRole: 'Editor y realizador',
    tlajtoliEyebrow: 'Tlajtoli 2026 / Evento institucional',
    shootTitle: 'En rodaje',
    shoot: [
      ['Preproducción', 'Guion y planeación del rodaje en estudio o exteriores: equipo, tiempos y necesidades técnicas.'],
      ['Cámara, luz y audio', 'Cámara Sony FX30 y DJI Osmo, iluminación básica y audio directo con micrófonos inalámbricos DJI.'],
      ['Postproducción', 'Edición y montaje narrativo, corrección de color básica (balance de blancos y exposición), mezcla de audio y exportación por formato y plataforma.'],
    ],
  },
  motion: {
    eyebrow: '04 / Motion graphics',
    titleA: 'Movimiento con',
    titleB: 'intención.',
    labels: ['Motion / Cortinilla 01', 'Motion / Cortinilla 02'],
    summary: 'Cortinillas y transiciones animadas. Cada pieza tiene que leerse rápido, sostener la identidad y dar ritmo a la edición.',
    skills: [
      ['Animación y texto', 'Texto animado, keyframes, máscaras, tracking, overlays y transiciones.'],
      ['Diseño para pantalla', 'Gráficos preparados en Illustrator y Photoshop, adaptados a 16:9 y 9:16.'],
      ['Storytelling', 'Ritmo, composición y jerarquía visual al servicio del mensaje de la marca.'],
    ],
  },
  corporate: {
    eyebrow: '05 / Video corporativo e institucional',
    titleA: 'Del guion',
    titleB: 'a la pantalla.',
    summary: 'Proyectos para marcas e instituciones, de la idea a la entrega final.',
    orbitAria: 'Videos corporativos e institucionales',
    items: [
      ['Video corporativo', 'Guion, grabación y edición'],
      ['Video institucional', 'Guion, grabación y edición'],
      ['Comunicación interna', 'Producción de video corporativo'],
      ['Investigación', 'Cámara de investigación'],
    ].map(([kind, role], i) => ({ id: corporateIds[i], client: clients[i], kind, role })),
  },
  tools: {
    eyebrow: '06 / Herramientas e IA',
    titleA: 'Las herramientas',
    titleB: 'correctas para cada pieza.',
    skills: [
      ['Adobe', 'After Effects (motion graphics), Premiere Pro, Illustrator, Photoshop y Audition.'],
      ['Edición y producción', 'CapCut Pro, Final Cut Pro, Tricaster (REMI), OBS y NDI. Equipo propio: cámara Sony FX30, DJI Osmo y micrófonos inalámbricos DJI.'],
      ['Inteligencia artificial', 'ChatGPT, Claude, Google Flow y Higgsfield para ideación, guiones, organización y producción de contenidos.'],
    ],
  },
  contact: { titleA: 'TRABAJEMOS', titleB: 'JUNTOS.', location: 'Guadalajara, Jal.', availability: 'Disponible de inmediato · Presencial o híbrido en Guadalajara' },
};

export const mlEn: MotionLeadContent = {
  lang: 'en',
  t: capcutEn,
  cv: '/isai-rodriguez-cv-en.pdf',
  heroBase: '/hero-motion/hero-en',
  alt: { label: 'ES', href: '/es', aria: 'Versión en español', footer: 'Versión en español' },
  skip: 'Skip to motion graphics',
  navAria: 'Portfolio navigation',
  nav: { campaigns: 'Campaigns', lead: 'Leadership', field: 'Field', motion: 'Motion', tools: 'Tools', contact: 'Contact' },
  downloadCv: 'Download CV',
  heroLabels: { pause: 'Pause animation', play: 'Play animation', soundOn: 'Turn sound on', soundOff: 'Mute' },
  orbit: { open: 'Open video ↗', youtube: 'Watch on YouTube ↗', soundOn: 'Turn sound on', soundOff: 'Mute', prev: 'Previous video', next: 'Next video', play: 'Play' },
  hero: {
    srTitle: 'Isaí Rodríguez Ortega. Motion graphics and video: remote editing, AI-assisted field production, live broadcast and motion graphics.',
    intro: 'Audiovisual producer and director. I create digital content and motion graphics for campaigns and social media, with experience leading teams and reviewing the visual and technical quality of every production.',
    tools: [...tools, 'Applied AI'],
    toolsAria: 'Tools',
    availability: 'Guadalajara, Mexico · Available immediately · On-site or hybrid in Guadalajara',
  },
  proof: [
    ['20+', 'Editors trained at TV Azteca'],
    ['6', 'State newscasts on air, supported through remote production'],
    ['15+ years', 'In audiovisual production, editing and motion graphics'],
  ],
  campaigns: { eyebrow: '01 / Campaigns & social', titleA: 'Brands in', titleB: 'vertical format.', orbitAria: 'Vertical videos for campaigns and social media' },
  lead: {
    eyebrow: '02 / Coordination & leadership',
    titleA: 'Teams that deliver',
    titleB: 'on time, every day.',
    summary: 'Live television gives you no second take. That is where I learned to set priorities, review quality under pressure and train other editors.',
    videoLabel: 'TV Azteca / Remote production with Tricaster',
    dates: 'February 2021 – August 2026 · Editor → Local News Producer',
    bullets: [
      <>Part of the Guadalajara team running remote (REMI) production for <b>six 30-minute state newscasts</b>, on air Monday to Friday from 2:30 to 3:00 p.m.</>,
      <>Trained to configure Tricaster for REMI and made sure every show aired in order, on time and with the correct commercial breaks.</>,
      <>Reviewed the visual and technical quality of <b>20+ stories per shift</b>; contributed to processes associated with an approximate <b>70% reduction in editing errors</b>, tracked in internal logs.</>,
      <>Trained <b>20+ editors</b> over five years with operating documentation, visual references and video tutorials.</>,
    ],
    workflowTitle: 'How I run a project',
    workflow: [
      ['Brief & pre-production', 'I shape the concept, the script and the shoot plan (crew and schedule), and define deliverables, owners and deadlines.'],
      ['Filming & post-production', 'I shoot with camera, lighting and location sound; then edit, apply basic color correction and mix audio, with review rounds along the way.'],
      ['Quality review', 'I check composition, color, animation, typography, audio and formats before any piece goes out.'],
      ['Delivery & improvement', 'I deliver on time, document what we learned and suggest process or tool improvements.'],
    ],
  },
  field: {
    eyebrow: '03 / Field & event production',
    titleA: 'When the project',
    titleB: 'leaves the studio.',
    costaRole: 'Editor & director',
    tlajtoliEyebrow: 'Tlajtoli 2026 / Institutional event',
    shootTitle: 'On set',
    shoot: [
      ['Pre-production', 'Scripting and shoot planning in the studio or on location: crew, schedule and technical needs.'],
      ['Camera, light & sound', 'Sony FX30 and DJI Osmo cameras, basic lighting and location sound with DJI wireless mics.'],
      ['Post-production', 'Narrative editing, basic color correction (white balance and exposure), audio mixing and exports for each format and platform.'],
    ],
  },
  motion: {
    eyebrow: '04 / Motion graphics',
    titleA: 'Motion with',
    titleB: 'intent.',
    labels: ['Motion / Bumper 01', 'Motion / Bumper 02'],
    summary: 'Animated bumpers and transitions. Every piece has to read fast, hold the brand identity and give the edit its rhythm.',
    skills: [
      ['Animation & type', 'Animated text, keyframes, masks, tracking, overlays and transitions.'],
      ['Design for screen', 'Graphics built in Illustrator and Photoshop, adapted to 16:9 and 9:16.'],
      ['Storytelling', 'Pacing, composition and visual hierarchy in service of the brand message.'],
    ],
  },
  corporate: {
    eyebrow: '05 / Corporate & institutional video',
    titleA: 'From script',
    titleB: 'to screen.',
    summary: 'Projects for brands and institutions, from the first idea to final delivery.',
    orbitAria: 'Corporate and institutional videos',
    items: [
      ['Corporate video', 'Script, filming & editing'],
      ['Institutional video', 'Script, filming & editing'],
      ['Internal communications', 'Corporate video production'],
      ['Investigation', 'Investigative camera operator'],
    ].map(([kind, role], i) => ({ id: corporateIds[i], client: clients[i], kind, role })),
  },
  tools: {
    eyebrow: '06 / Tools & AI',
    titleA: 'The right tools',
    titleB: 'for every piece.',
    skills: [
      ['Adobe', 'After Effects (motion graphics), Premiere Pro, Illustrator, Photoshop and Audition.'],
      ['Editing & production', 'CapCut Pro, Final Cut Pro, Tricaster (REMI), OBS and NDI. My own kit: Sony FX30 camera, DJI Osmo and DJI wireless mics.'],
      ['Artificial intelligence', 'ChatGPT, Claude, Google Flow and Higgsfield for ideation, scripting, organization and content production.'],
    ],
  },
  contact: { titleA: "LET'S WORK", titleB: 'TOGETHER.', location: 'Guadalajara, Mexico', availability: 'Available immediately · On-site or hybrid in Guadalajara' },
};
