/* global AFRAME, XRExtras, XR8 */

AFRAME.registerComponent('sky-recenter', {
  init() {
    const recenter = () => {
      this.el.emit('recenter')
      if (this.el.sceneEl) {
        this.el.sceneEl.emit('recenter')
      }
      console.log('🎯 [Sky Recenter Component] Sky orientation matrix recentered.')
    }

    this.el.addEventListener('sky-coaching-overlay.hide', recenter)

    // Listen for manual retarget/recenter debug triggers
    this.el.sceneEl.addEventListener('force-sky-retarget', () => {
      console.log('🎯 [Sky Recenter Component] Force Sky Retarget Signal Received!')
      recenter()

      // Call 8th Wall engine recenter if active
      if (window.XR8 && window.XR8.XrController && typeof window.XR8.XrController.recenter === 'function') {
        try {
          window.XR8.XrController.recenter()
          console.log('🌐 [8th Wall XR8] XrController.recenter() executed.')
        } catch (err) {
          console.warn('⚠️ [8th Wall XR8] XrController.recenter error:', err)
        }
      }

      // Re-trigger sky coaching overlay helper if available
      if (window.XRExtras && window.XRExtras.SkyCoachingOverlay && typeof window.XRExtras.SkyCoachingOverlay.show === 'function') {
        try {
          window.XRExtras.SkyCoachingOverlay.show()
          console.log('👋 [8th Wall Coaching] Sky coaching overlay prompt reopened.')
        } catch (err) {
          // ignore
        }
      }
    })
  },
})
