# The Oldest Public Bar

```
index.html          → redirige a src/index.dc.html
src/
  index.dc.html     → página (Inicio, Sucursal, Carta)
  support.js        → runtime (no editar)
  data/             → carta (belgrano.js, caballito.js) + build.js, search.js, imgs.js
  img/              → hero, íconos, logo.webp
    b/  c/          → fotos de platos Belgrano R. / Caballito
```

Para agregar fotos: copiarlas en `src/img/b` o `src/img/c` y sumar el nombre en `src/data/imgs.js`. Se asignan al plato por similitud de nombre.
