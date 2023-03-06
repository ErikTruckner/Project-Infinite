import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })

const BlockStart = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      {/* FLOOR */}
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  )
}

const BlockSpinner = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef()
  // ***SPEED OF SPIN FOR OBSTACLE***
  const [speed] = useState(
    () => (Math.random() + 0.3) * (Math.random() < 0.5 ? -1 : 1)
  )
  // ***ANIMATION TIMER***
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    const rotation = new THREE.Quaternion()
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
    obstacle.current.setNextKinematicRotation(rotation)
  })

  return (
    <group position={position}>
      {/* SECOND FLOOR TILE */}
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      {/* OBSTACLE */}
      <RigidBody
        ref={obstacle}
        type='kinematicPosition'
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}>
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          // position={[0, -0.1, 0]}
          scale={[3.5, 0.3, 0.4]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}

const Level = () => {
  // const { position } = useControls({
  //   position: {
  //     value: { x: 0, y: 0 },
  //     step: 0.01,
  //   },
  // })

  return (
    <>
      <BlockStart position={[0, 0, 4]} />
      <BlockSpinner position={[0, 0, 0]} />
      <BlockSpinner position={[0, 0, -4]} />
      <BlockSpinner position={[0, 0, -8]} />
    </>
  )
}

export default Level
