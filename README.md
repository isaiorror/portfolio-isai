# Portafolio de Isaí Rodríguez

Portafolio ejecutivo construido con Next.js, TypeScript, Tailwind CSS y Framer Motion. Está preparado para control de versiones con Git, publicación en GitHub y despliegue en Vercel.

## 1. Ejecutar localmente

Requisitos: Node.js 20 o superior y pnpm.

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:3000`.

## 2. Flujo de desarrollo

El contenido principal está en `src/app/page.tsx`, los estilos globales en `src/app/globals.css` y los metadatos en `src/app/layout.tsx`.

```bash
git checkout -b contenido/nuevo-caso
git add .
git commit -m "feat: agrega nuevo caso de estudio"
```

## 3. Publicar en GitHub

Después de crear un repositorio vacío en GitHub:

```bash
git remote add origin https://github.com/TU-USUARIO/portfolio-isai.git
git branch -M main
git push -u origin main
```

## 4. Desplegar en Vercel

1. En Vercel, selecciona **Add New > Project**.
2. Importa el repositorio de GitHub.
3. Vercel detectará Next.js automáticamente; conserva los valores sugeridos.
4. Añade `NEXT_PUBLIC_SITE_URL` con la URL pública del proyecto.
5. Pulsa **Deploy**.

Cada `push` posterior a `main` generará una nueva publicación.

## Siguiente etapa de contenido

- Reemplazar métricas provisionales por cifras verificadas.
- Añadir fotografías y video detrás de cámaras.
- Convertir cada proyecto importante en un caso de estudio.
- Incorporar el CV descargable y el showreel.
