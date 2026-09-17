// Remote Logger for Mobile Debugging
// Intercepts browser console logs and sends them to the Vite dev server terminal

export function initRemoteLogger() {
  if (window.__remote_logger_initialized) return
  window.__remote_logger_initialized = true

  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
  }

  function sendLog(level, args) {
    try {
      const formattedArgs = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2)
          } catch (e) {
            return String(arg)
          }
        }
        return String(arg)
      })

      fetch('/__remote_log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level,
          message: formattedArgs,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {
        // Silently ignore fetch network failures
      })
    } catch (err) {
      // Fallback
    }
  }

  console.log = (...args) => {
    originalConsole.log(...args)
    sendLog('info', args)
  }

  console.info = (...args) => {
    originalConsole.info(...args)
    sendLog('info', args)
  }

  console.warn = (...args) => {
    originalConsole.warn(...args)
    sendLog('warn', args)
  }

  console.error = (...args) => {
    originalConsole.error(...args)
    sendLog('error', args)
  }

  window.addEventListener('error', (event) => {
    console.error(`[UNCAUGHT ERROR] ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`)
  })

  window.addEventListener('unhandledrejection', (event) => {
    console.error(`[UNHANDLED REJECTION] ${event.reason}`)
  })

  console.info('🚀 Mobile Remote Logger Initialized. Logs will be relayed to Vite Terminal.')
}
