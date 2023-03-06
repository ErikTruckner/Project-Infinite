import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics, Debug } from '@react-three/rapier'
import Lights from './Lights'
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
          <Lights />
          <Level />
        </Physics>
      </Canvas>
    </>
  )
}
