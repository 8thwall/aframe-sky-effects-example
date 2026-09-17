import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Custom Vite plugin for Mobile Remote Terminal Logging
function viteRemoteLogger() {
  return {
    name: 'vite-remote-logger',
    configureServer(server) {
      server.middlewares.use('/__remote_log', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const time = new Date().toLocaleTimeString()
              const prefix = `\x1b[36m[MOBILE LOG ${time}]\x1b[0m`
              let levelColor = '\x1b[32m' // info green
              if (data.level === 'warn') levelColor = '\x1b[33m' // yellow
              if (data.level === 'error') levelColor = '\x1b[31m' // red

              const logMessage = Array.isArray(data.message) ? data.message.join(' ') : data.message
              console.log(`${prefix} ${levelColor}[${data.level.toUpperCase()}]\x1b[0m ${logMessage}`)
            } catch (err) {
              console.error('[MOBILE LOG PARSE ERROR]', err)
            }
            res.statusCode = 200
            res.end('OK')
          })
        } else {
          res.statusCode = 405
          res.end('Method Not Allowed')
        }
      })
    }
  }
}

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    https: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    react(),
    basicSsl(),
    viteRemoteLogger(),
  ],
})

