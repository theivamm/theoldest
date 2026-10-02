# The Oldest Public Bar

Estructura (Vite / Vercel). Copiar TODO a la raíz del repo, reemplazando:

```
index.html          página completa
public/
  support.js        runtime (se sirve tal cual en /support.js)
  data/             carta (belgrano.js, caballito.js, build.js, search.js, imgs.js)
  img/              logo.webp, hero-*, b/, c/ ...
```

Todo lo de `public/` se copia sin procesar al build, por eso las rutas son absolutas (`/img/...`, `/data/...`).
