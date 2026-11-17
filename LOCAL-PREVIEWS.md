# Local bilingual previews

Both versions share the page, components, styles and public assets.
English is the default. Spanish translations are maintained in src/lib/locale.ts.
The CV remains English; the Spanish download label makes this explicit.

In separate PowerShell terminals, from this project directory:

English:

```powershell
$env:PORTFOLIO_LOCALE = "en"
pnpm dev --port 3001
```

Spanish:

```powershell
$env:PORTFOLIO_LOCALE = "es"
$env:NEXT_PUBLIC_SITE_URL = "http://localhost:3002"
pnpm dev --port 3002
```

English uses .next; Spanish uses .next-es to isolate caches and locks.
The EN / ES links connect these two local previews in development only.
No deployment or Git push is required. Port 3000 is left untouched.
Restart the respective server after changing its language environment variable.
