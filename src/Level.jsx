import * as THREE from 'three'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useMemo, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })

export const BlockStart = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      {/* FLOOR */}
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        // receiveShadow
      />
    </group>
  )
}
export const BlockEnd = ({ position = [0, 0, 0] }) => {
  const goblet = useGLTF('./goblet.glb')

  // Shadows Code, not working, not necessary either, but eventually get it to work
  // goblet.scene.children.forEach(() => {
  //   mesh.castShadow = true
  // })

  return (
    <group position={position}>
      {/* FLOOR */}
      {/* The position on PRIMITVE AND rigid body are additive, thus we only need the position
      to be on either the PRIMITVE or the RigidBody, both will work, but position ON BOTH will cause 
      unintended positionings. Thus here, I've oppted to place the positioning on the PRIMITVE. And actually if you
      use RigidBody position there is conflict with the glb and the physics box*/}
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        // receiveShadow
      />
      <RigidBody
        type='fixed'
        colliders='hull'
        // position={[0, 1.2, 0]}
        restitution={0.2}
        friction={0}>
        <primitive object={goblet.scene} position={[0, 1.2, 0]} scale={1.1} />
      </RigidBody>
    </group>
  )
}

export const BlockSpinner = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef()
  // ***SPEED OF SPIN FOR OBSTACLE***
  const [speed] = useState(
    () => (Math.random() + 0.3) * (Math.random() < 0.5 ? -1 : 1)
  )
  // ***ANIMATION TIMER***
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // *** THIS IS ROTATION SPEED ***

    const rotation = new THREE.Quaternion()
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
    obstacle.current.setNextKinematicRotation(rotation)
    // *** THIS ANCHORS OBSTABLE TO FLOOR TILE AND RIGID BODY***
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + 0.3,
      z: position[2],
    })
  })

  return (
    <group position={position}>
      {/* SECOND FLOOR TILE */}
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        // receiveShadow
      />
      {/* OBSTACLE SPINNER*/}
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
          // castShadow
          // receiveShadow
        />
      </RigidBody>
    </group>
  )
}

export const BlockLimbo = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef()
  // ***START TIME STAGGER FOR OBSTACLE***
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2)
  // ***ANIMATION TIMER***
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // ***UP AND DOWN MOVEMENT WITH OFF SET***
    const y = Math.sin(time + timeOffset) + 1.2

    // *** THIS ANCHORS OBSTABLE TO FLOOR TILE AND RIGID BODY***

    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    })
  })

  return (
    <group position={position}>
      {/* SECOND FLOOR TILE */}
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        // receiveShadow
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
          // castShadow
          // receiveShadow
        />
      </RigidBody>
    </group>
  )
}
export const BlockAxe = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef()
  // ***START TIME STAGGER FOR OBSTACLE***
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2)
  // ***ANIMATION TIMER***
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // ***UP AND DOWN MOVEMENT WITH OFF SET***
    const x = Math.sin(time + timeOffset)

    // *** THIS ANCHORS OBSTABLE TO FLOOR TILE AND RIGID BODY***

    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 1,
      z: position[2],
    })
  })

  return (
    // *** GROUP FLOOR TILE + OBSTACLE ***
    <group position={position}>
      {/* SECOND FLOOR TILE */}
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        // receiveShadow
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
          scale={[1.5, 1.5, 0.3]}
          // castShadow
          // receiveShadow
        />
      </RigidBody>
    </group>
  )
}

export const Level = ({
  count = 5,
  types = [BlockSpinner, BlockLimbo, BlockAxe],
}) => {
  const blocks = useMemo(() => {
    const blocks = []
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)]
      blocks.push(type)
    }
    return blocks
  }, [count, types])

  function Bounds({ length = 1 }) {
    return (
      <>
        <RigidBody type='fixed' restitution={0.2} friction={0}>
          {/* Camera Right Wall */}
          <mesh
            position={[2.15, 0.75, -(length * 2) + 2]}
            geometry={boxGeometry}
            material={wallMaterial}
            scale={[0.3, 1.5, 4 * length]}
          />
          {/* Camera Left Wall */}
          <mesh
            position={[-2.15, 0.75, -(length * 2) + 2]}
            geometry={boxGeometry}
            material={wallMaterial}
            scale={[0.3, 1.5, 4 * length]}
          />
          {/* Camera Back Wall */}
          <mesh
            position={[0, 0.75, -(length * 4) + 2]}
            geometry={boxGeometry}
            material={wallMaterial}
            scale={[4, 1.5, 0.3]}
          />
          {/* GROUND PHYSICS BOX */}
          <CuboidCollider
            args={[2, 0.1, 2 * length]}
            position={[0, -0.1 - length * 2 + 2]}
            restitution={0.2}
            friction={1}
          />
        </RigidBody>
      </>
    )
  }

  // // THESE useRefs are specifically for light helpers
  // const directionalLight = useRef
  // const spotLight = useRef()
  // // the ending number is for size
  // useHelper(spotLight, THREE.SpotLightHelper, 1)

  return (
    <>
      <spotLight position={[5, 5, 14]} intensity={0.8} />
      <spotLight position={[5, 5, -64]} intensity={0.8} />
      {/* POSITION OF THE ENTIRE GROUP = mesh + rigid */}
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        // *** MULTIPLY INDEX by 4 bc that gives up the proper seperation of floor tiles.
        // THE MINUS in front of index is so the blocks are laid out in the negative Z axis, better for our camera setup
        // PARENTHISEES around index with the +1 add the StartBlock to the starting location
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      {/*Count is in reference to the count of blocks, the +1 insures it will always spawn at the end of the count. 
      the  * 4  is a multiplier for the Z axis to maintain a proper position at the end of the array of floor tiles */}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  )
}

// *****TO BUILD MANUALLY*****

// const Level = () => {
//   return (
//     <>
//       {/* POSITION OF THE ENTIRE GROUP = mesh + rigid */}
//       <BlockStart position={[0, 0, 8]} />
//       <BlockSpinner position={[0, 0, 4]} />
//       <BlockSpinner position={[0, 0, 0]} />
//       <BlockLimbo position={[0, 0, -4]} />
//       <BlockAxe position={[0, 0, -8]} />
//       <BlockEnd position={[0, 0, -12]} />
//     </>
//   )
// }

export default Level
