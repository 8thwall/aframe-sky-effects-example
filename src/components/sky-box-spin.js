/* global AFRAME */

AFRAME.registerComponent('sky-box-spin', {
  schema: {
    speed: { type: 'number', default: 1 },
  },
  tick(time, timeDelta) {
    const rotation = this.el.getAttribute('rotation') || { x: 0, y: 0, z: 0 }
    this.el.setAttribute('rotation', {
      x: rotation.x,
      y: rotation.y + (timeDelta * 0.03 * this.data.speed),
      z: rotation.z,
    })
  },
})
