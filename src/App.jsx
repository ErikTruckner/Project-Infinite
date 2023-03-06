import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'
import Cube from './Cube'
import Lights from './Lights'

export default function App() {
  console.log(Canvas)

  return (
    <>
      <Canvas>
        {/* <Perf /> */}

        <OrbitControls />
        <Lights />
        <Cube />
      </Canvas>
    </>
  )
}
