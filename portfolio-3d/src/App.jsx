import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { Experience } from './components/Experience'
import './App.css'

function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [3, 3, 8], fov: 42 }}
      gl={{ antialias: false }} // Better performance for postprocessing
    >
      <color attach="background" args={['#030303']} />

      <Suspense fallback={null}>
        <Experience />

        <EffectComposer disableNormalPass>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
            mipmapBlur
          />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}

export default App
