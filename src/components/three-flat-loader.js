/* global AFRAME, THREE */

// Three.js GLB Loader with 4-Directional Lighting and Flat Shader support
AFRAME.registerComponent('three-flat-loader', {
  schema: {
    src: { type: 'string', default: '' },
    flatShader: { type: 'boolean', default: true },
    enableLights: { type: 'boolean', default: true },
    lightIntensity: { type: 'number', default: 1.2 },
    scale: { type: 'vec3', default: { x: 1, y: 1, z: 1 } },
  },

  init() {
    this.modelGroup = new THREE.Group()
    this.lightsGroup = new THREE.Group()
    this.el.setObject3D('mesh', this.modelGroup)
    this.el.setObject3D('lightsGroup', this.lightsGroup)

    this.setupLights()
    if (this.data.src) {
      this.loadModel(this.data.src)
    }
  },

  update(oldData) {
    if (oldData.src !== this.data.src && this.data.src) {
      this.loadModel(this.data.src)
    }

    if (oldData.flatShader !== this.data.flatShader) {
      this.applyFlatShader(this.data.flatShader)
    }

    if (oldData.enableLights !== this.data.enableLights || oldData.lightIntensity !== this.data.lightIntensity) {
      this.updateLights()
    }
  },

  setupLights() {
    // Clear old lights if any
    while (this.lightsGroup.children.length > 0) {
      this.lightsGroup.remove(this.lightsGroup.children[0])
    }

    if (!this.data.enableLights) return

    const intensity = this.data.lightIntensity

    // 1. Ambient Light
    const ambient = new THREE.AmbientLight(0xffffff, intensity * 0.5)
    this.lightsGroup.add(ambient)

    // 2. 4-Directional Lights (North, South, East, West)
    const directions = [
      { name: 'North', pos: [0, 15, 15], color: 0xffe6cc },
      { name: 'South', pos: [0, 15, -15], color: 0xccf2ff },
      { name: 'East',  pos: [15, 15, 0],  color: 0xffffff },
      { name: 'West',  pos: [-15, 15, 0], color: 0xffffff },
    ]

    directions.forEach(dir => {
      const dLight = new THREE.DirectionalLight(dir.color, intensity * 0.8)
      dLight.position.set(...dir.pos)
      this.lightsGroup.add(dLight)
    })

    console.log(`💡 [Three.js] Initialized 4-directional lighting (N, S, E, W) with intensity ${intensity}`)
  },

  updateLights() {
    this.setupLights()
  },

  loadModel(url) {
    console.log(`📦 [Three.js Loader] Loading GLB model from: ${url}`)
    const loader = new THREE.GLTFLoader()

    loader.load(
      url,
      (gltf) => {
        // Clear previous model
        while (this.modelGroup.children.length > 0) {
          this.modelGroup.remove(this.modelGroup.children[0])
        }

        const model = gltf.scene
        model.scale.set(this.data.scale.x, this.data.scale.y, this.data.scale.z)

        this.applyFlatShaderToScene(model, this.data.flatShader)

        this.modelGroup.add(model)
        console.log(`✅ [Three.js Loader] GLB model successfully loaded and added to scene: ${url}`)
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100)
          console.log(`⏳ [Three.js Loader] Progress: ${percent}%`)
        }
      },
      (error) => {
        console.error(`❌ [Three.js Loader] Failed to load GLB model at ${url}:`, error)
      }
    )
  },

  applyFlatShader(enableFlat) {
    if (this.modelGroup) {
      this.applyFlatShaderToScene(this.modelGroup, enableFlat)
    }
  },

  applyFlatShaderToScene(scene, enableFlat) {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (enableFlat) {
          // If array of materials
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => this.convertMaterialToFlat(mat, child))
          } else {
            this.convertMaterialToFlat(child.material, child)
          }
        } else {
          // Re-enable smooth shading if needed
          if (child.material) {
            child.material.flatShading = false
            child.material.needsUpdate = true
          }
        }
      }
    })
    console.log(`🎨 [Three.js Material] Flat Shader ${enableFlat ? 'ENABLED' : 'DISABLED'} on GLB meshes.`)
  },

  convertMaterialToFlat(material, mesh) {
    material.flatShading = true
    material.needsUpdate = true
    
    // Ensure normals are updated for flat shading
    if (mesh.geometry) {
      mesh.geometry.computeVertexNormals()
    }
  },

  remove() {
    if (this.modelGroup) {
      this.el.removeObject3D('mesh')
    }
    if (this.lightsGroup) {
      this.el.removeObject3D('lightsGroup')
    }
  },
})
