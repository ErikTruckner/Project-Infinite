import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics, Debug } from '@react-three/rapier'
import Level from './Level'

export default function App() {
  console.log(Canvas)

  return (
    <>
      <Canvas>
        {/* <Perf /> */}

        <OrbitControls />
        <Physics>
          <Debug />
          <spotLight castShadow position={[5, 5, 14]} intensity={0.8} />
          {/* <spotLight castShadow position={[5, 5, -14]} intensity={0.8} /> */}

          <Level />
        </Physics>
      </Canvas>
    </>
  )
}
