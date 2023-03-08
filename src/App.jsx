import { Canvas, useFrame } from '@react-three/fiber'
import { useHelper, OrbitControls } from '@react-three/drei'
import { Physics, Debug } from '@react-three/rapier'

import { BlockAxe, Level } from './Level'

export default function App() {
  return (
    <>
      <Canvas
        // shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}>
        {/* <Perf /> */}

        <OrbitControls />
        <Physics>
          <Debug />

          <Level />
        </Physics>
      </Canvas>
    </>
  )
}
