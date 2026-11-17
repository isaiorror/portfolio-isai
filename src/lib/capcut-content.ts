// Contenido del portafolio de edición (/capcut en inglés, /es en español).
// Ambas versiones comparten el diseño de src/components/editing-portfolio.tsx.
// Al cambiar un dato, cámbialo en los dos idiomas.

export type Lang = "en" | "es";

export type CapcutContent = {
  lang: Lang;
  path: string;
  altLang: { label: string; href: string; name: string };
  cv: { href: string; header: string; hero: string; contact: string };
  skip: string;
  nav: { work: string; craft: string; background: string; contact: string; aria: string };
  video: { open: string; fallback: string; fallbackLink: string };
  hero: {
    photoAlt: string; eyebrow: string; titleA: string; titleB: string; deck: string; intro: string;
    watch: string; watchHref: string; reelAria: string; reelThumb: string; reelItem: string; availability: string;
  };
  proof: [string, string][];
  work: { eyebrow: string; titleA: string; titleB: string; summary: string };
  hubwell: {
    eyebrow: string; titleA: string; titleB: string; body: string; instagram: string;
    facts: [string, string][]; bullets: string[]; labels: [string, string, string];
  };
  aalatam: { eyebrow: string; titleA: string; titleB: string; body: string; facts: [string, string][]; label: string };
  craft: {
    eyebrow: string; title: string; skills: [string, string][];
    motionTitle: string; motionBody: string; motionLabels: [string, string];
  };
  workflow: { eyebrow: string; title: string; steps: [string, string][] };
  tv: {
    eyebrow: string; titleA: string; titleB: string; reelLabel: string; heading: string; dates: string; body: string[];
    costaPhotoAlt: string; costaLabel: string; costaEyebrow: string; costaHeading: string; costaBody: string[];
  };
  tlajtoli: { eyebrow: string; photoAlt: string; label: string; heading: string; body: string };
  contact: { eyebrow: string; titleA: string; titleB: string; location: string; availability: string };
};

export const en: CapcutContent = {
  lang: "en",
  path: "/capcut",
  altLang: { label: "ES", href: "/es", name: "Versión en español" },
  cv: {
    href: "/isai-rodriguez-video-editor-cv-v2.pdf",
    header: "Download CV ↗",
    hero: "Download CV",
    contact: "Download tailored CV",
  },
  skip: "Skip to selected work",
  nav: { work: "Selected edits", craft: "Craft", background: "Background", contact: "Contact", aria: "Portfolio navigation" },
  video: { open: "Open video ↗", fallback: "Your browser cannot play this video.", fallbackLink: "Open the video" },
  hero: {
    photoAlt: "Isaí working in a television production control room",
    eyebrow: "Isaí Rodríguez Ortega / Video editor",
    titleA: "Raw footage.",
    titleB: "Clear stories.",
    deck: "CapCut Pro · Short-form content · Adobe Premiere Pro",
    intro: "I edit short-form videos with clear pacing, readable captions and brand-aligned visuals, backed by years of hands-on production and broadcast quality control.",
    watch: "Watch selected edits",
    watchHref: "#edit-work",
    reelAria: "Selected HUBWELL edits",
    reelThumb: "HUBWELL selected {label} thumbnail",
    reelItem: "Edit",
    availability: "Guadalajara, Mexico · Available for full-time remote work",
  },
  proof: [
    ["15–20 / mo", "HUBWELL video volume, shared by two editors"],
    ["60–90 sec", "Typical HUBWELL video length"],
    ["15+ years", "Audiovisual production experience"],
  ],
  work: {
    eyebrow: "01 / Selected edits",
    titleA: "Short format.",
    titleB: "Deliberate decisions.",
    summary: "Actual client work. My role, the tools and the finished edit are presented together.",
  },
  hubwell: {
    eyebrow: "HUBWELL Logistics / 2026",
    titleA: "One brand.",
    titleB: "A consistent visual voice.",
    body: "Vertical 9:16 Reels for Instagram and Facebook, edited in CapCut Pro since September 2026. The account calls for 15–20 videos a month, shared between two editors; 8 delivered by me so far. Three selected edits are shown below.",
    instagram: "See the published Reels on Instagram ↗",
    facts: [
      ["My role", "Producer & video editor"],
      ["Source footage", "Produced on location by me, supervising a camera operator."],
      ["Editing tool", "CapCut Pro, desktop"],
    ],
    bullets: [
      "Automatic captions with manual correction.",
      "Music and audio-level adjustments.",
      "Colors and typography aligned with the brand.",
      "Client feedback incorporated into final versions.",
    ],
    labels: ["HUBWELL / Selected edit 01", "HUBWELL / Selected edit 02", "HUBWELL / Selected edit 03"],
  },
  aalatam: {
    eyebrow: "AALATAM / Reel for Meta",
    titleA: "From filming",
    titleB: "to the final cut.",
    body: "A vertical 9:16 Reel for Meta that I filmed and edited in CapCut for AALATAM, an advertising agency and production house. A complementary example of hands-on production, beyond editing.",
    facts: [["My role", "Filming & editing"], ["Editing tool", "CapCut"]],
    label: "AALATAM / Filming & editing",
  },
  craft: {
    eyebrow: "02 / Editing craft",
    title: "The details carry the story.",
    skills: [
      ["Pacing & framing", "Clip selection, speed adjustments, reframing and exports in multiple formats."],
      ["Text & motion", "Captions, animated text, overlays, transitions, keyframes, masks and tracking."],
      ["Picture & sound", "Color adjustments, voice cleanup, music mixing and audio-level balancing."],
    ],
    motionTitle: "Motion & transition samples",
    motionBody: "Existing post-production work, included as additional examples of visual craft. These are not presented as CapCut projects.",
    motionLabels: ["Motion / Sample 01", "Motion / Sample 02"],
  },
  workflow: {
    eyebrow: "03 / Working together",
    title: "A practical remote workflow.",
    steps: [
      ["Receive & align", "Footage and requirements shared through Google Drive, WeTransfer or Dropbox."],
      ["Edit & finish", "Build the edit, prepare captions, align visual branding and balance audio."],
      ["Review & deliver", "Discuss changes through email or WhatsApp, apply revisions and share the final files."],
    ],
  },
  tv: {
    eyebrow: "04 / TV Azteca experience",
    titleA: "From the newsroom",
    titleB: "to the field.",
    reelLabel: "TV Azteca / Production reel",
    heading: "TV Azteca / CNP Jalisco",
    dates: "February 2021 – August 2026",
    body: [
      "Joined as a video editor and was promoted to Local News Producer about two months later. Part of the team running remote (REMI) production from Guadalajara for six 30-minute state newscasts airing at the same time, Monday to Friday; configured Tricaster for REMI and made sure each newscast aired in order with the correct commercial breaks.",
      "Reviewed more than 20 stories per shift and contributed to quality-review processes associated with an approximate 70% reduction in editing errors, tracked through internal Excel logs. That experience informs how I review continuity and technical details before delivery.",
    ],
    costaPhotoAlt: "Field production images from Costa Maya",
    costaLabel: "Costa Maya / Kantunilkín",
    costaEyebrow: "Costa Maya / Special coverage · 2023",
    costaHeading: "Field production & editing",
    costaBody: [
      "A special coverage assignment during my time at TV Azteca: approximately six weeks across 11 municipalities in Quintana Roo, as editor and director.",
      "Captured footage, edited informational and promotional content, and selected approximately two hours of B-roll.",
    ],
  },
  tlajtoli: {
    eyebrow: "05 / Event production",
    photoAlt: "Tlajtoli 2026 production",
    label: "Tlajtoli / Existing portfolio sample",
    heading: "Live & audiovisual production",
    body: "Transmission direction and audiovisual production for CEDSPI, Hidalgo State Government. Deliverables included an institutional capsule and a reel.",
  },
  contact: {
    eyebrow: "Let’s work together",
    titleA: "YOUR FOOTAGE.",
    titleB: "THE NEXT STORY.",
    location: "Guadalajara, Mexico",
    availability: "Available immediately · Full-time remote",
  },
};

export const es: CapcutContent = {
  lang: "es",
  path: "/es",
  altLang: { label: "EN", href: "/capcut", name: "English version" },
  cv: {
    href: "/isai-rodriguez-cv-es.pdf",
    header: "Descargar CV ↗",
    hero: "Descargar CV",
    contact: "Descargar CV",
  },
  skip: "Ir a los trabajos seleccionados",
  nav: { work: "Trabajos", craft: "Oficio", background: "Trayectoria", contact: "Contacto", aria: "Navegación del portafolio" },
  video: { open: "Abrir video ↗", fallback: "Tu navegador no puede reproducir este video.", fallbackLink: "Abrir el video" },
  hero: {
    photoAlt: "Isaí trabajando en un control de producción de televisión",
    eyebrow: "Isaí Rodríguez Ortega / Motion graphics y video",
    titleA: "Ideas en movimiento.",
    titleB: "Entregas a tiempo.",
    deck: "CapCut Pro · Final Cut Pro · OBS · After Effects · Premiere Pro · Illustrator · Photoshop · IA aplicada",
    intro: "Productor y realizador audiovisual. Creador de contenido digital y motion graphics para campañas y redes sociales. Tengo experiencia liderando equipos y revisando la calidad visual y técnica de cada producción.",
    watch: "Ver motion graphics",
    watchHref: "#edit-craft",
    reelAria: "Ediciones seleccionadas de HUBWELL",
    reelThumb: "Miniatura de HUBWELL, {label}",
    reelItem: "Ed.",
    availability: "Guadalajara, Jal. · Disponible de inmediato · Híbrido en Guadalajara",
  },
  proof: [
    ["20+", "Editores capacitados en TV Azteca"],
    ["6", "Noticieros estatales al aire a la vez, en producción remota"],
    ["15+ años", "De producción audiovisual, edición y motion"],
  ],
  work: {
    eyebrow: "01 / Trabajos seleccionados",
    titleA: "Formato corto.",
    titleB: "Decisiones pensadas.",
    summary: "Trabajo real para clientes. Mi rol, las herramientas y la edición final, juntos.",
  },
  hubwell: {
    eyebrow: "HUBWELL Logistics / 2026",
    titleA: "Una marca.",
    titleB: "Una voz visual consistente.",
    body: "Reels verticales 9:16 para Instagram y Facebook, editados en CapCut Pro desde septiembre de 2026. La cuenta pide de 15 a 20 videos al mes, repartidos entre dos editores; a la fecha he entregado 8. Abajo, tres ediciones seleccionadas.",
    instagram: "Ver los Reels publicados en Instagram ↗",
    facts: [
      ["Mi rol", "Productor y editor de video"],
      ["Material", "Producido en locación por mí, supervisando a un camarógrafo."],
      ["Herramienta", "CapCut Pro, escritorio"],
    ],
    bullets: [
      "Subtítulos automáticos con corrección manual.",
      "Ajuste de música y niveles de audio.",
      "Colores y tipografía alineados a la marca.",
      "Retroalimentación del cliente incorporada a las versiones finales.",
    ],
    labels: ["HUBWELL / Edición 01", "HUBWELL / Edición 02", "HUBWELL / Edición 03"],
  },
  aalatam: {
    eyebrow: "AALATAM / Reel para Meta",
    titleA: "De la grabación",
    titleB: "al corte final.",
    body: "Un reel vertical 9:16 para Meta que grabé y edité en CapCut para AALATAM, agencia publicitaria y casa productora. Un ejemplo complementario de producción en campo, más allá de la edición.",
    facts: [["Mi rol", "Grabación y edición"], ["Herramienta", "CapCut"]],
    label: "AALATAM / Grabación y edición",
  },
  craft: {
    eyebrow: "02 / Oficio de edición",
    title: "Los detalles cuentan la historia.",
    skills: [
      ["Ritmo y encuadre", "Selección de clips, cambios de velocidad, reencuadre y exportación en varios formatos."],
      ["Texto y movimiento", "Subtítulos, texto animado, overlays, transiciones, keyframes, máscaras y tracking."],
      ["Imagen y sonido", "Ajustes de color, limpieza de voz, mezcla de música y balance de niveles de audio."],
    ],
    motionTitle: "Muestras de motion graphics y transiciones",
    motionBody: "Trabajo de posproducción existente, incluido como ejemplo adicional de oficio visual. No se presentan como proyectos de CapCut.",
    motionLabels: ["Motion / Muestra 01", "Motion / Muestra 02"],
  },
  workflow: {
    eyebrow: "03 / Cómo trabajamos",
    title: "Un flujo de trabajo remoto y práctico.",
    steps: [
      ["Recibir y alinear", "Material y requisitos compartidos por Google Drive, WeTransfer o Dropbox."],
      ["Editar y finalizar", "Armo la edición, preparo subtítulos, alineo la identidad visual y balanceo el audio."],
      ["Revisar y entregar", "Comentamos cambios por correo o WhatsApp, aplico las correcciones y comparto los archivos finales."],
    ],
  },
  tv: {
    eyebrow: "04 / Experiencia en TV Azteca",
    titleA: "De la redacción",
    titleB: "al campo.",
    reelLabel: "TV Azteca / Reel de producción",
    heading: "TV Azteca / CNP Jalisco",
    dates: "Febrero 2021 – agosto 2026",
    body: [
      "Entré como editor de video y a los dos meses me ascendieron a productor de noticias locales. Formé parte del equipo que operaba desde Guadalajara la producción remota (REMI) de seis noticieros estatales de 30 minutos que salían al aire al mismo tiempo, de lunes a viernes; configuré el Tricaster para REMI y me aseguré de que cada emisión saliera en orden y con las pautas comerciales correctas.",
      "Revisé más de 20 notas por turno y participé en procesos de revisión asociados con una reducción aproximada del 70 % en errores de edición, medida en bitácoras internas de Excel. Esa experiencia define cómo reviso la continuidad y los detalles técnicos antes de entregar.",
    ],
    costaPhotoAlt: "Imágenes de la producción en campo en la Costa Maya",
    costaLabel: "Costa Maya / Kantunilkín",
    costaEyebrow: "Costa Maya / Cobertura especial · 2023",
    costaHeading: "Producción en campo y edición",
    costaBody: [
      "Una cobertura especial durante mi etapa en TV Azteca: cerca de seis semanas por 11 municipios de Quintana Roo, como editor y realizador.",
      "Grabé material, edité contenido informativo y promocional, y seleccioné cerca de dos horas de B-roll.",
    ],
  },
  tlajtoli: {
    eyebrow: "05 / Producción de eventos",
    photoAlt: "Producción de Tlajtoli 2026",
    label: "Tlajtoli / Muestra del portafolio",
    heading: "Producción en vivo y audiovisual",
    body: "Dirección de transmisión y producción audiovisual para CEDSPI, Gobierno del Estado de Hidalgo. Los entregables incluyeron una cápsula institucional y un reel.",
  },
  contact: {
    eyebrow: "Trabajemos juntos",
    titleA: "TU MATERIAL.",
    titleB: "LA SIGUIENTE HISTORIA.",
    location: "Guadalajara, México",
    availability: "Disponible de inmediato · Híbrido o remoto",
  },
};
