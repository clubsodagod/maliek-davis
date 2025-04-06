import React from 'react'

const ShadowCatcher = () => {
    return (
        <>
            <mesh rotation={[-Math.PI / 6, 0, 0]} position={[0, -5, -10]} receiveShadow >
                <circleGeometry args={[150]} />
                <shadowMaterial
                    opacity={0.3}
                />
            </mesh>
        </>
    )
}

export default ShadowCatcher