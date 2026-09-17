import React, { useEffect, useRef } from 'react'

export function SkyARScene({
  selectedModel,
  flatShader,
  enableLights,
  lightIntensity,
  spinSpeed,
  recenterTrigger,
  scale,
  position,
  rotation,
  occludeBehindBuildings,
}) {
  const sceneRef = useRef(null)
  const skyEntityRef = useRef(null)

  // Handle Recenter & Retarget Trigger
  useEffect(() => {
    if (recenterTrigger > 0) {
      if (skyEntityRef.current) {
        skyEntityRef.current.emit('recenter')
      }
      if (sceneRef.current) {
        sceneRef.current.emit('force-sky-retarget')
        sceneRef.current.emit('recenter')
      }
      console.log('🎯 [Sky AR Scene] Manual Sky Retarget & Recenter triggered!')
    }
  }, [recenterTrigger])

  const positionStr = `${position.x} ${position.y} ${position.z}`
  const rotationStr = `${rotation.x} ${rotation.y} ${rotation.z}`
  const scaleStr = `${scale} ${scale} ${scale}`

  return (
    <div className="ar-scene-wrapper">
      <a-scene
        ref={sceneRef}
        xrextras-loading
        xrextras-runtime-error
        landing-page
        sky-coaching-overlay
        sky-recenter
        renderer="colorManagement: true"
        xrlayers
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <a-assets>
          <img id="skyTexture" src="/assets/space.png" alt="Sky Space Texture" />
        </a-assets>

        <a-camera position="0 3 0" raycaster="objects: .cantap" cursor="fuse: false; rayOrigin: mouse"></a-camera>

        {/* 8th Wall Sky Layer Scene */}
        <a-entity
          id="sky-scene"
          ref={skyEntityRef}
          xrlayerscene="name: sky; edgeSmoothness: 0.6"
        >
          {/* Background Sky Canvas Image */}
          <a-sky material="src: #skyTexture; transparent: true; opacity: 1;"></a-sky>

          {/* 3D Model inside Sky Layer (Occluded behind buildings) */}
          {occludeBehindBuildings && (
            <a-entity
              id="sky-model-entity-occluded"
              three-flat-loader={`src: ${selectedModel}; flatShader: ${flatShader}; enableLights: ${enableLights}; lightIntensity: ${lightIntensity}; scale: ${scaleStr}`}
              sky-box-spin={`speed: ${spinSpeed}`}
              position={positionStr}
              rotation={rotationStr}
            ></a-entity>
          )}
        </a-entity>

        {/* 3D Model outside Sky Layer (Rendered OVER buildings / No occlusion) */}
        {!occludeBehindBuildings && (
          <a-entity
            id="sky-model-entity-visible"
            three-flat-loader={`src: ${selectedModel}; flatShader: ${flatShader}; enableLights: ${enableLights}; lightIntensity: ${lightIntensity}; scale: ${scaleStr}`}
            sky-box-spin={`speed: ${spinSpeed}`}
            position={positionStr}
            rotation={rotationStr}
          ></a-entity>
        )}
      </a-scene>
    </div>
  )
}
