import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let html = fs.readFileSync(path.resolve(__dirname, 'src/index.html'), 'utf-8');
      html = await vite.transformIndexHtml(url, html);
      const parts = html.split('not rendered');

      const { renderApp } = await vite.ssrLoadModule('./src/ServerApp.tsx');

      const { store, stream } = await renderApp(url, {
        onShellReady() {
          res.write(parts[0]);
          stream.pipe(res);
        },
        onAllReady() {
          res.write(
            parts[1] +
              `<script>window.__PRELOADED_STATE__=${JSON.stringify(store.getState()).replace(
                /</g,
                '\\u003c'
              )}</script>`
          );

          res.end();
        },
      });
    } catch (err) {
      const e = err as Error;
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
}

createServer();
