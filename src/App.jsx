import React, { useState } from 'react'
import { SkyARScene } from './components/SkyARScene'
import { MobileUIOverlay } from './components/MobileUIOverlay'
import './components/index.js' // Register A-Frame / Three.js components

export function App() {
  const [selectedModel, setSelectedModel] = useState('/assets/models/reimu_fumo.glb')
  const [customModels, setCustomModels] = useState([])
  const [flatShader, setFlatShader] = useState(true)
  const [enableLights, setEnableLights] = useState(true)
  const [lightIntensity, setLightIntensity] = useState(1.2)
  const [spinSpeed, setSpinSpeed] = useState(1.0)
  const [recenterTrigger, setRecenterTrigger] = useState(0)

  // Object Manipulation Controls (Thu phóng, vị trí, hướng)
  const [scale, setScale] = useState(3.0)
  const [position, setPosition] = useState({ x: 0, y: 10, z: -10 })
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })

  // Debug: Toggle Behind Buildings Occlusion
  const [occludeBehindBuildings, setOccludeBehindBuildings] = useState(true)

  const handleRecenterSky = () => {
    setRecenterTrigger((prev) => prev + 1)
  }

  const handleFileUpload = (file) => {
    if (!file) return
    const objectUrl = URL.createObjectURL(file)
    const newModel = {
      id: objectUrl,
      label: file.name.length > 12 ? file.name.substring(0, 10) + '...' : file.name,
      icon: '📁',
      isCustom: true,
    }
    setCustomModels((prev) => [...prev, newModel])
    setSelectedModel(objectUrl)
    console.log(`📂 [Custom Model Uploaded] Created Object URL for ${file.name}: ${objectUrl}`)
  }

  const handleToggleEruda = () => {
    if (window.eruda) {
      if (window._eruda_active) {
        window.eruda.destroy()
        window._eruda_active = false
        console.log('🛠️ [Eruda Debugger] Closed')
      } else {
        window.eruda.init()
        window._eruda_active = true
        console.log('🛠️ [Eruda Debugger] Opened on device')
      }
    } else {
      console.warn('⚠️ Eruda script not yet loaded from CDN')
    }
  }

  return (
    <div className="app-container">
      {/* 8th Wall + A-Frame + Three.js Sky AR Scene */}
      <SkyARScene
        selectedModel={selectedModel}
        flatShader={flatShader}
        enableLights={enableLights}
        lightIntensity={lightIntensity}
        spinSpeed={spinSpeed}
        recenterTrigger={recenterTrigger}
        scale={scale}
        position={position}
        rotation={rotation}
        occludeBehindBuildings={occludeBehindBuildings}
      />

      {/* Mobile Glassmorphic Controls */}
      <MobileUIOverlay
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        customModels={customModels}
        onFileUpload={handleFileUpload}
        flatShader={flatShader}
        setFlatShader={setFlatShader}
        enableLights={enableLights}
        setEnableLights={setEnableLights}
        lightIntensity={lightIntensity}
        setLightIntensity={setLightIntensity}
        spinSpeed={spinSpeed}
        setSpinSpeed={setSpinSpeed}
        scale={scale}
        setScale={setScale}
        position={position}
        setPosition={setPosition}
        rotation={rotation}
        setRotation={setRotation}
        occludeBehindBuildings={occludeBehindBuildings}
        setOccludeBehindBuildings={setOccludeBehindBuildings}
        onRecenterSky={handleRecenterSky}
        onToggleEruda={handleToggleEruda}
      />
    </div>
  )
}
