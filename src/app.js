/* globals AFRAME */

// ─── Root cause ──────────────────────────────────────────────────────────────
// xr.js (async) internal execution order:
//   1. yield Promise.all(...)  → async load of WASM and other resources
//   2. window.AFRAME && n()   → register A-Frame components (triggers init() immediately)
//   3. window.XR8 = I         → global XR8 is set HERE for the first time
//
// xrlayerscene.init() / xrlayers.init() call XR8.xxx directly, but when they
// are invoked at step 2, window.XR8 is still undefined, causing
// "ReferenceError: XR8 is not defined".
//
// Fix: wrap AFRAME.registerComponent so that init() of these two components
// is deferred until the "xrloaded" event fires (dispatched right after window.XR8=I).
// ─────────────────────────────────────────────────────────────────────────────

;(function patchXR8DependentComponents () {
  const _reg = AFRAME.registerComponent.bind(AFRAME)

  AFRAME.registerComponent = function (name, def) {
    if ((name === 'xrlayers' || name === 'xrlayerscene') && typeof def.init === 'function') {
      const origInit = def.init
      def.init = function () {
        const self = this
        const run = () => origInit.call(self)
        // Run immediately if window.XR8 is already defined, otherwise wait for xrloaded
        window.XR8 ? run() : window.addEventListener('xrloaded', run, { once: true })
      }
    }
    return _reg(name, def)
  }
})()

AFRAME.registerComponent('sky-recenter', {
  init () {
    const recenter = () => {
      this.el.emit('recenter')
      this.el.removeEventListener('sky-coaching-overlay.hide', recenter)
    }
    this.el.addEventListener('sky-coaching-overlay.hide', recenter)
  },
})
