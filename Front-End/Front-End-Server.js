import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { url } from 'node:inspector'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function createServer(
  root = process.cwd(),
  hmrPort,
) {
  const resolve = (p) => path.resolve(__dirname, p)

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite

  vite = await (
    await import('vite')
  ).createServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: true,
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100,
      },
      hmr: {
        port: hmrPort,
      },
    },
    appType: 'custom',
  })
  // use vite's connect instance as middleware
  app.use(vite.middlewares)



  app.use('*', async (req, res) => {

    try {
      const url = req.originalUrl
      let template, render
      
      // Showing the entry points
      // always read fresh template in dev
      template = fs.readFileSync(resolve('index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render


      const context = { x: 1 }
      const appHtml = render(url, context)

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url)
      }

      const html = template.replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      
      res.status(500).end(e.stack)
    }
  })



  return { app, vite }
}


createServer().then(({ app }) => {
  app.listen(5173, () => {
    
  })
}
)

