import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useControls } from 'leva'

const Cube = () => {
  // const mesh = useRef()

  // useFrame(() => {
  //   if (mesh.current) {
  //     mesh.current.rotation.x += 0.01
  //     mesh.current.rotation.y += 0.01
  //   }
  // })

  const { position } = useControls({
    position: -2,
  })

  return (
    <mesh position-x={position}>
      <boxBufferGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}

export default Cube
