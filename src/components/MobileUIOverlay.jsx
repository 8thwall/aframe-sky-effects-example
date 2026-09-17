import React, { useState, useRef } from 'react'

export function MobileUIOverlay({
  selectedModel,
  setSelectedModel,
  customModels,
  onFileUpload,
  flatShader,
  setFlatShader,
  enableLights,
  setEnableLights,
  lightIntensity,
  setLightIntensity,
  spinSpeed,
  setSpinSpeed,
  scale,
  setScale,
  position,
  setPosition,
  rotation,
  setRotation,
  occludeBehindBuildings,
  setOccludeBehindBuildings,
  onRecenterSky,
  onToggleEruda,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('models') // 'models' | 'transform' | 'lighting' | 'debug'
  const fileInputRef = useRef(null)

  const presetModels = [
    { id: '/assets/models/reimu_fumo.glb', label: 'Reimu Fumo', icon: '⛩️' },
    { id: '/assets/models/torus-knot.glb', label: 'Torus Knot', icon: '🌀' },
    { id: '/assets/models/cube-flat.glb', label: 'Flat Cube', icon: '🧊' },
    { id: '/assets/models/sample-model.glb', label: 'Space Ship', icon: '🚀' },
  ]

  const allModels = [...presetModels, ...customModels]

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <>
      {/* Top Header */}
      <header className="mobile-header">
        <div className="brand-title">
          <span className="brand-icon">🌌</span>
          <span>Sky AR React</span>
        </div>
        <div className="header-status">
          <div className="pulse-dot"></div>
          <span>{occludeBehindBuildings ? 'OCCLUSION ON' : 'OVERLAY ON'}</span>
        </div>
      </header>

      {/* Floating Eruda Debug Console Button */}
      <button
        className="eruda-toggle-fab"
        onClick={onToggleEruda}
        title="Toggle Eruda Debugger"
        aria-label="Toggle Eruda Debugger"
      >
        🛠️
      </button>

      {/* Bottom Glassmorphic Toolbar */}
      <div className="mobile-bottom-bar">
        {/* Quick Action Controls */}
        <div className="quick-controls-row">
          <button
            className="icon-btn"
            onClick={onRecenterSky}
          >
            <span className="btn-icon">🎯</span>
            <span>Recenter Sky</span>
          </button>

          <button
            className={`icon-btn ${enableLights ? 'active' : ''}`}
            onClick={() => setEnableLights(!enableLights)}
          >
            <span className="btn-icon">💡</span>
            <span>4-Way Lights</span>
          </button>

          <button
            className={`icon-btn ${flatShader ? 'active' : ''}`}
            onClick={() => setFlatShader(!flatShader)}
          >
            <span className="btn-icon">🎨</span>
            <span>Flat Shader</span>
          </button>

          <button
            className={`icon-btn ${drawerOpen ? 'active' : ''}`}
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <span className="btn-icon">{drawerOpen ? '🔽' : '⚙️'}</span>
            <span>Controls</span>
          </button>
        </div>

        {/* Collapsible Drawer Panel */}
        {drawerOpen && (
          <div className="drawer-panel">
            {/* Tab Navigation */}
            <div className="tab-bar">
              <button
                className={`tab-btn ${activeTab === 'models' ? 'active' : ''}`}
                onClick={() => setActiveTab('models')}
              >
                📦 Models
              </button>
              <button
                className={`tab-btn ${activeTab === 'transform' ? 'active' : ''}`}
                onClick={() => setActiveTab('transform')}
              >
                📐 Transform
              </button>
              <button
                className={`tab-btn ${activeTab === 'lighting' ? 'active' : ''}`}
                onClick={() => setActiveTab('lighting')}
              >
                💡 Lighting
              </button>
              <button
                className={`tab-btn ${activeTab === 'debug' ? 'active' : ''}`}
                onClick={() => setActiveTab('debug')}
              >
                🛠️ Debug
              </button>
            </div>

            {/* TAB 1: Models & File Upload */}
            {activeTab === 'models' && (
              <div className="tab-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="section-label">Choose or Upload 3D GLB Model</div>
                  <button
                    className="upload-btn"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    📁 Upload GLB
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".glb,.gltf"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>

                <div className="model-grid">
                  {allModels.map((m) => (
                    <div
                      key={m.id}
                      className={`model-card ${selectedModel === m.id ? 'selected' : ''}`}
                      onClick={() => setSelectedModel(m.id)}
                    >
                      <span className="model-card-icon">{m.icon}</span>
                      <span className="model-card-title">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Object Transform Controls (Scale, Position, Rotation) */}
            {activeTab === 'transform' && (
              <div className="tab-content">
                {/* Scale (Thu phóng) */}
                <div className="toggle-row">
                  <div className="toggle-info">
                    <span style={{ fontSize: '1.2rem' }}>🔍</span>
                    <div>
                      <div className="toggle-title">Scale / Thu phóng ({scale.toFixed(1)}x)</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="range-slider"
                    min="0.5"
                    max="15.0"
                    step="0.5"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    style={{ width: '120px' }}
                  />
                </div>

                {/* Altitude Y (Độ cao) */}
                <div className="toggle-row">
                  <div className="toggle-info">
                    <span style={{ fontSize: '1.2rem' }}>⬆️</span>
                    <div>
                      <div className="toggle-title">Altitude / Độ cao Y ({position.y}m)</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="range-slider"
                    min="0"
                    max="30"
                    step="1"
                    value={position.y}
                    onChange={(e) => setPosition({ ...position, y: parseInt(e.target.value) })}
                    style={{ width: '120px' }}
                  />
                </div>

                {/* Distance Z (Khoảng cách) */}
                <div className="toggle-row">
                  <div className="toggle-info">
                    <span style={{ fontSize: '1.2rem' }}>🎯</span>
                    <div>
                      <div className="toggle-title">Distance / Khoảng cách Z ({position.z}m)</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="range-slider"
                    min="-35"
                    max="-2"
                    step="1"
                    value={position.z}
                    onChange={(e) => setPosition({ ...position, z: parseInt(e.target.value) })}
                    style={{ width: '120px' }}
                  />
                </div>

                {/* Rotation Y (Yaw / Hướng) */}
                <div className="toggle-row">
                  <div className="toggle-info">
                    <span style={{ fontSize: '1.2rem' }}>🔄</span>
                    <div>
                      <div className="toggle-title">Heading / Hướng quay Y ({rotation.y}°)</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="range-slider"
                    min="0"
                    max="360"
                    step="15"
                    value={rotation.y}
                    onChange={(e) => setRotation({ ...rotation, y: parseInt(e.target.value) })}
                    style={{ width: '120px' }}
                  />
                </div>
              </div>
            )}

            {/* TAB 3: Lighting & Spin */}
            {activeTab === 'lighting' && (
              <div className="tab-content">
                <div className="toggle-row">
                  <div className="toggle-info">
                    <span style={{ fontSize: '1.2rem' }}>☀️</span>
                    <div>
                      <div className="toggle-title">Light Intensity ({lightIntensity.toFixed(1)}x)</div>
                      <div className="toggle-sub">4-Directional N, S, E, W intensity</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="range-slider"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={lightIntensity}
                    onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
                    style={{ width: '100px' }}
                  />
                </div>

                <div className="toggle-row">
                  <div className="toggle-info">
                    <span style={{ fontSize: '1.2rem' }}>🌀</span>
                    <div>
                      <div className="toggle-title">Spin Speed ({spinSpeed.toFixed(1)}x)</div>
                      <div className="toggle-sub">Auto spin rotation speed</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="range-slider"
                    min="0"
                    max="5"
                    step="0.5"
                    value={spinSpeed}
                    onChange={(e) => setSpinSpeed(parseFloat(e.target.value))}
                    style={{ width: '100px' }}
                  />
                </div>
              </div>
            )}

            {/* TAB 4: Debug Occlusion & Sky Retarget */}
            {activeTab === 'debug' && (
              <div className="tab-content">
                {/* Force Sky Retarget Debug Action */}
                <div className="toggle-row">
                  <div className="toggle-info">
                    <span style={{ fontSize: '1.2rem' }}>🎯</span>
                    <div>
                      <div className="toggle-title">Sky Retarget & Re-align</div>
                      <div className="toggle-sub">Căn lại góc bầu trời nếu bị định vị lệch</div>
                    </div>
                  </div>
                  <button
                    className="upload-btn"
                    onClick={onRecenterSky}
                  >
                    🎯 Target Lại
                  </button>
                </div>

                {/* Behind Buildings Occlusion Debug Toggle */}
                <div className="toggle-row">
                  <div className="toggle-info">
                    <span style={{ fontSize: '1.2rem' }}>🏢</span>
                    <div>
                      <div className="toggle-title">Behind Buildings Occlusion</div>
                      <div className="toggle-sub">
                        {occludeBehindBuildings ? 'ON: Object hidden behind buildings' : 'OFF: Object drawn OVER buildings'}
                      </div>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={occludeBehindBuildings}
                      onChange={(e) => setOccludeBehindBuildings(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
