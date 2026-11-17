# Revisa, compila y publica el portafolio (inglés /capcut y español /es).
# Uso, desde la carpeta del proyecto en PowerShell:
#   powershell -ExecutionPolicy Bypass -File .\publicar-portafolio.ps1
# Se detiene si algún paso falla. No publica nada si la compilación tiene errores.

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

# Rutas que se usaron ayer, por si pnpm, node o vercel no están en el PATH
$extra = @(
  "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin",
  "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback"
)
foreach ($p in $extra) { if (Test-Path $p) { $env:Path = "$p;$env:Path" } }

$env:PORTFOLIO_LOCALE = 'en'

Write-Host "`n1/3  Revisando el código del sitio (eslint src)..." -ForegroundColor Cyan
# Solo se revisa src/: scripts/create-video-posters.cjs es una herramienta aparte y no forma parte del sitio.
pnpm exec eslint src
if ($LASTEXITCODE -ne 0) { Write-Host "Lint encontró problemas. Copia el error y pégaselo a Claude." -ForegroundColor Red; exit 1 }

Write-Host "`n2/3  Compilando (pnpm build)..." -ForegroundColor Cyan
pnpm build
if ($LASTEXITCODE -ne 0) { Write-Host "La compilación falló. Copia el error y pégaselo a Claude. No se publicó nada." -ForegroundColor Red; exit 1 }

Write-Host "`nCompilación correcta." -ForegroundColor Green
$ok = Read-Host "3/3  ¿Publicar ahora en Vercel (vercel --prod)? Escribe s para sí"
if ($ok -ne 's') { Write-Host "No se publicó. Puedes revisar en local con: pnpm dev --port 3001" ; exit 0 }

# vercel no está instalado globalmente; se ejecuta con pnpm dlx
pnpm dlx vercel --prod
if ($LASTEXITCODE -ne 0) { Write-Host "Vercel devolvió un error. Copia el mensaje y pégaselo a Claude." -ForegroundColor Red; exit 1 }

Write-Host "`nListo. Revisa:" -ForegroundColor Green
Write-Host "  Inglés:  https://portfolio-isai-capcut.vercel.app/capcut"
Write-Host "  Español: https://portfolio-isai-capcut.vercel.app/es"
