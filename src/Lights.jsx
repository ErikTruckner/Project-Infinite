const Lights = ({ position }) => {
  return (
    <>
      <directionalLight castShadow position={[0, 0, 0]} intensity={1.2} />
      <ambientLight intensity={0.1} />
    </>
  )
}

export default Lights
