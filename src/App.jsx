import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Cube from './Cube'
import Lights from './Lights'

export default function App() {
  console.log(Canvas)

  return (
    <>
      <Canvas>
        <OrbitControls />
        <Lights />
        <Cube />
      </Canvas>
    </>
  )
}
