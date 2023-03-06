import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

const Cube = ({ position, color }) => {
  const mesh = useRef()

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01
      mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default Cube
