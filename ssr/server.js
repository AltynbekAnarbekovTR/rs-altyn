// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import renderApp from './dist/server/ServerApp.js';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const PORT = process.env.PORT || 3001;

// const html = fs.readFileSync(path.resolve(__dirname, './dist/client/index.html')).toString();

// const parts = html.split('not rendered');

// const app = express();

// app.use('/assets', express.static(path.resolve(__dirname, './dist/client/assets')));
// app.use((req, res) => {
//   res.write(parts[0]);
//   console.log('req.url:', req.url);
//   const stream = renderApp(req.url, {
//     onShellReady() {
//       stream.pipe(res);
//     },
//     onShellError() {
//       // do error handling
//     },
//     onAllReady() {
//       res.write(parts[1]);
//       res.end();
//     },
//     onError(err) {
//       console.error(err);
//     },
//   });
// });

// console.log(`listening on http://localhost:${PORT}`);
// app.listen(PORT);

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

      const stream = await renderApp(url, {
        onShellReady() {
          res.write(parts[0]);
          stream.pipe(res);
        },
        onAllReady() {
          res.write(parts[1]);
          res.end();
        },
      });
    } catch (err) {
      const e = err;
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
}

createServer();

// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import renderApp from './dist/server/ServerApp.js';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const PORT = process.env.PORT || 3001;

// const html = fs.readFileSync(path.resolve(__dirname, '.src/index.html')).toString();

// const parts = html.split('not rendered');

// const app = express();

// app.use('/assets', express.static(path.resolve(__dirname, './dist/client/assets')));
// app.use((req, res) => {
//   res.write(parts[0]);
//   console.log('req.url:', req.url);
//   const stream = renderApp(req.url, {
//     onShellReady() {
//       stream.pipe(res);
//     },
//     onShellError() {
//       // do error handling
//     },
//     onAllReady() {
//       res.write(parts[1]);
//       res.end();
//     },
//     onError(err) {
//       console.error(err);
//     },
//   });
// });

// console.log(`listening on http://localhost:${PORT}`);
// app.listen(PORT);
