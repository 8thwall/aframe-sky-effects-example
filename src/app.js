AFRAME.registerComponent('sky-recenter', {
  init() {
    const recenter = () => {
      this.el.emit('recenter')
      this.el.removeEventListener('sky-coaching-overlay.hide', recenter)
    }
    this.el.addEventListener('sky-coaching-overlay.hide', recenter)
  },
})

const xrloaded = () => {
  document.body.insertAdjacentHTML('beforeend', require('./scene.html'))
}

window.XR8 ? xrloaded() : window.addEventListener('xrloaded', xrloaded, {once: true})
