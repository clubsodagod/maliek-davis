import { Environment } from '@react-three/drei'
import React from 'react'

const StandardLights = () => {
    return (
        <>
            <ambientLight />
            <Environment preset='warehouse' />
            <directionalLight
                castShadow
                position={[0, 0, 3]} // Adjust position as needed
                intensity={1}
                shadow-mapSize-width={256}
                shadow-mapSize-height={256}
                shadow-camera-far={1000}
                shadow-camera-near={-100}
                shadow-camera-right={100}
                shadow-camera-left={-100}
                shadow-camera-top={100}
                shadow-camera-bottom={-100}
            />
        </>
    )
}

export default StandardLights