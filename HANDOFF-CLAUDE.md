# Entrega para Claude Code — portafolio de Isaí

Estado revisado: 21 de octubre de 2026. Este documento resume el trabajo existente; no autoriza cambios adicionales. Espera las indicaciones concretas de Isaí antes de editar.

## Proyecto y versión correcta

Carpeta: `C:\Users\orror\.codex\.chatgpt-projects\g-p-67cabacbcec88191b93474ff526d0a10\portfolio-isai`

- **Versión activa para la candidatura:** http://localhost:3001/capcut (inglés).
- http://localhost:3001/ es el portafolio general anterior, NO la versión adaptada.
- http://localhost:3002/ es el portafolio general en español, cuando su servidor está iniciado.
- El puerto 3000 se ha utilizado para Remotion, un proyecto distinto. No detenerlo ni confundirlo con este sitio.
- La versión publicada en Vercel no refleja necesariamente el trabajo local. No usarla como fuente para sobrescribirlo.

## Límites importantes

1. No hacer push, deploy, publicar en Vercel, cambiar ramas ni crear commits sin autorización expresa.
2. No reconstruir desde cero. Reutilizar componentes, estilos y archivos.
3. No modificar el portafolio general ni sus traducciones salvo solicitud explícita.
4. Preservar todos los archivos originales, incluso medios que ya no se muestran. No borrar activos ni reemplazar videos originales.
5. Leer AGENTS.md y las instrucciones aplicables. CLAUDE.md ya referencia AGENTS.md; no se ha modificado.
6. La carpeta `sources/` del proyecto padre es material sincronizado de solo lectura.
7. No inventar experiencia, fechas, resultados, herramientas ni atribuir todos los videos a CapCut.
8. Trabajar por turnos con otras herramientas; no editar simultáneamente los mismos archivos. Antes de modificar, releer el estado real y revisar Git si está disponible. No asumir que hay un repositorio Git operativo ni hacer reset/checkout para recuperar versiones.

## Objetivo editorial

Candidatura a **Expert CapCut Video Editor — Minimalist Agency**, remoto, tiempo completo. Priorizar edición de formatos cortos, ritmo, subtítulos, adaptación de marca, audio, revisiones y entregas. TV Azteca respalda el criterio y control de calidad; no debe desplazar las muestras de edición recientes.

Mantener estética oscura/editorial con naranja, tipografía grande, diseño responsive y accesibilidad. Sitio adaptado en inglés. No añadir stock, puntuaciones de habilidades ni afirmaciones de dominio sin evidencia.

## Archivos principales (relativos a la carpeta del proyecto)

- `src/app/capcut/page.tsx`: contenido completo de la candidatura, metadata y componente compartido Video.
- `src/app/capcut/portfolio.css`: estilos de la versión adaptada; evitar afectar otras páginas.
- `src/app/globals.css`, `src/app/layout.tsx`: estilos y layout generales compartidos; cuidado con cambios globales.
- `src/components/reveal.tsx`: animaciones reutilizadas.
- `src/app/page.tsx`: portafolio general anterior, conservar.
- `src/lib/locale.ts`: traducciones del portafolio general. Contiene correcciones del usuario; conservar.
- `public/`: imágenes, videos, PDFs y otros originales.
- `public/video-posters/`: nueve portadas JPG extraídas de videos reales.
- `scripts/create-video-posters.cjs`: generador de portadas con Playwright/Edge; ruta de dependencia específica de esta máquina. No ejecutarlo sin necesidad: sobrescribe las portadas generadas, no los videos.

## Estructura actual aprobada de /capcut

- Hero: foto `CNP 3.jpg`, “Raw footage. Clear stories.”, enfoque CapCut/edición, enlaces a muestras y CV.
- Indicadores: 10+ videos HUBWELL; duración habitual 60–90 segundos; 10+ años de producción audiovisual.
- 01 / Selected edits: HUBWELL (tres muestras) y AALATAM.
- 02 / Editing craft: capacidades y dos cortinillas existentes. No presentarlas como trabajos realizados en CapCut.
- 03 / Working together: recepción de materiales, edición, revisión y entrega.
- **04 / TV Azteca experience:** agrupa CNP Jalisco y Costa Maya. Costa Maya fue una cobertura especial dentro de la etapa laboral en TV Azteca, NO un cliente/empleo independiente.
- **05 / Event production:** Tlajtoli 2026, separado de TV Azteca.
- Contacto: correo, LinkedIn, disponibilidad y descarga del CV.

### Decisiones explícitas que no deben revertirse

- Se eliminaron IRO/EDIT, la leyenda inferior “CapCut Pro · Short-form content · Production” y el enlace “Explore the full portfolio”.
- Se eliminó toda la sección “Personal introduction”, incluyendo el placeholder. El usuario enviará el video de presentación aparte.
- En CNP se quitaron las fotografías/diagrama y se sustituyeron por `tricaster_2.mp4`. No reintroducir la galería ni duplicar el reel anterior.
- Costa Maya muestra `VARIAS CANCUN.jpeg` y debajo `kantunilkin_2.mp4`; conservar ese orden.
- HUBWELL: rol actual “Producer & video editor”; Source footage: “Produced on location by me, supervising a camera operator.” Es una corrección del usuario respecto de la descripción anterior de material entregado por el cliente.

## Medios activos

| Sección | Archivo exacto en public | Portada en public/video-posters |
| --- | --- | --- |
| HUBWELL 01 | hubwell-01.mp4 | hubwell-01.jpg |
| HUBWELL 02 | hubwell-02.mp4 | hubwell-02.jpg |
| HUBWELL 03 | hubwell_3.mov | hubwell_3.jpg |
| AALATAM | AALATAM V4.mp4 | AALATAM V4.jpg |
| Motion 01 | cortinilla-01.mp4 | cortinilla-01.jpg |
| Motion 02 | cortinilla-02.mp4 | cortinilla-02.jpg |
| CNP | tricaster_2.mp4 | tricaster_2.jpg |
| Costa Maya | kantunilkin_2.mp4 | kantunilkin_2.jpg |
| Tlajtoli | tlajtoali-video.mp4 | tlajtoali-video.jpg |

La foto de Tlajtoli es `FOTO TLAJ.jpg`. Hay otras fotografías, PSD y videos previos conservados. Los nombres históricos no siempre coinciden con la ortografía del título visible: verificar archivos antes de cambiar referencias.

Todos los reproductores mantienen `controls`, `playsInline`, `preload="none"`, sin autoplay. El helper calcula poster como `/video-posters` + ruta del video con extensión JPG. Cada video nuevo necesita su portada correspondiente. Para MOV no se fuerza MIME MP4.

Las nueve portadas se comprobaron cargando correctamente, sin solicitudes MP4/MOV antes de pulsar Play. Hubo problemas de audio sin imagen en el navegador integrado; los videos se probaron con Edge. No garantizar compatibilidad en todos los navegadores sin probarla.

## CV vigente

Todos los botones de /capcut descargan **`public/isai-rodriguez-video-editor-cv-v2.pdf`**.

- PDF en inglés de dos páginas, rediseñado a partir del adjunto del usuario, con texto seleccionable y enlaces de contacto.
- El usuario quitó HUBWELL del PDF adjunto; se respetó. No restaurarlo automáticamente para hacerlo coincidir con el sitio.
- No usar los PDFs anteriores `isai-rodriguez-cv.pdf` ni `isai-rodriguez-capcut-cv.pdf` para los botones de esta versión.
- Copia de entrega fuera del checkout: `..\output\pdf\Isai-Rodriguez-CV-Video-Editor-EN-Redesigned.pdf`.
- Script del rediseño: `..\scripts\redesign_cv_v2.py`.
- Adjunto de referencia del usuario: `C:\Users\orror\Downloads\Isai-Rodriguez-CV-Video-Editor-EN v2.pdf`. No modificarlo.

## Hechos y precauciones de contenido

- TV Azteca: febrero de 2021 a agosto de 2026; ingreso como editor y promoción aproximadamente dos meses después. Ya no trabaja allí.
- Operación de equipo: seis noticieros diarios; no atribuir producción individual de todo el volumen.
- Reducción aproximada del 70% en errores: registros internos Excel de errores de edición, revisiones locales y errores al aire. Documentos confidenciales a los que ya no tiene acceso; no afirmar auditoría independiente.
- Costa Maya: 2023, aproximadamente seis semanas, 11 municipios, dos horas de B-roll seleccionado. Se pidió quitar el punto sobre tres notas especiales; no reintroducirlo.
- CapCut desde septiembre de 2026 en laptop; más de 10 videos HUBWELL, Facebook e Instagram. No afirmar años de experiencia con CapCut.
- AALATAM: grabación y edición en CapCut. No inventar resultados de campañas.
- Remotion con IA era un plan de aprendizaje, no experiencia consolidada.
- Formación: Comunicación titulada; Ingeniería Industrial con materias concluidas, titulación pendiente.
- Inglés: conversaciones laborales sencillas y dar/recibir retroalimentación; no declarar bilingüe o avanzado sin confirmación.
- Disponible inmediatamente para tiempo completo remoto; Guadalajara. Email vigente: `orror.isai@outlook.com`.

## Desarrollo local y comprobaciones

Stack: Next.js 16.3.3, React 19.2.8, Tailwind CSS 4, Framer Motion 13; pnpm 11.19.0. AGENTS.md exige consultar documentación de Next incluida en `node_modules/next/dist/docs/` antes de cambios.

Antes de iniciar otro proceso, comprobar si 3001 ya está activo. No matar servidores ajenos.

En PowerShell, desde el proyecto:

```powershell
$env:PORTFOLIO_LOCALE = 'en'
pnpm dev --port 3001
```

Abrir **http://localhost:3001/capcut**, no solamente `/`.

El preview español usa PORTFOLIO_LOCALE=es y puerto 3002; next.config.ts usa `.next-es` para ese proceso y `.next` para inglés.

Si faltan ejecutables en PATH, los disponibles durante el trabajo fueron:

```text
C:\Users\orror\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin
C:\Users\orror\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback
```

Validación proporcional a los cambios: `pnpm lint`, `pnpm build`, revisar escritorio/tablet/móvil, enlaces PDF, imágenes, reproducción, portadas, navegación con teclado y ausencia de autoplay. Las últimas verificaciones pasaron lint del archivo de página y build; las nueve portadas cargaron y no hubo desbordamiento a 390px. No presentar esto como una auditoría exhaustiva de todo el proyecto.

## Pendientes y siguiente paso

No hay una tarea nueva de diseño autorizada en esta entrega. Leer, confirmar que se entiende la versión correcta y esperar instrucciones del usuario. No implementar recomendaciones propias como si estuvieran aprobadas.

La presentación de un minuto se enviará por separado. Antes de una eventual publicación, el usuario debe autorizarla; revisar entonces metadata/URLs/noindex, privacidad y permisos sobre materiales. No cambiar esas opciones ahora.

Documentación anterior como CAPCUT-PREVIEW.md puede contener decisiones superadas (por ejemplo el placeholder del video de presentación). Priorizar este resumen, el código actual y las indicaciones más recientes del usuario.

## Actualización del 21 de octubre de 2026 (Claude, sesión en la nube)
Isaí pidió dos versiones del portafolio, en español y en inglés. Detalles en `CAMBIOS-2026-10-21.md`.
- `/capcut` (inglés) y `/es` (español) comparten `src/components/editing-portfolio.tsx`. Los textos están en `src/lib/capcut-content.ts`.
- Datos confirmados por Isaí hoy: HUBWELL, 8 videos entregados (la cuenta pide 15–20 al mes entre dos editores); el nombre es AALATAM, no "AALATAM V4" (reel 9:16 para Meta, grabado y editado); como productor en TV Azteca configuró el Tricaster para REMI de 6 estados y cuidaba el orden y las pautas comerciales; en Costa Maya fue editor y realizador.
- No se pudo ejecutar `pnpm build` en la nube porque no había acceso al registro de paquetes. Hay que validar en local con `pnpm lint` y `pnpm build`.
- No se publicó nada en Vercel.
