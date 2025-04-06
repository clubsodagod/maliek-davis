"use client"

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import ShadowCatcher from '@/components/three/lights/ShadowCatcher'
import StandardLights from '@/components/three/lights/StandardLights'
import { MotionGroup } from '@/components/motion/three/MotionGroup'
import MacBook from './models/macbook/Macbook'
import { Float } from '@react-three/drei'

const PortfolioScene = ({ }) => {

    // 3D objects
    const CachedMacBook = React.memo(MacBook);


    return (

        <Canvas
            dpr={[1, 1.5]}
            style={{
                pointerEvents: 'none',
                position: 'fixed',
                top: 0,
                zIndex: 1,
            }}
            shadows
            camera={{
                position: [0, 0, 60],
                fov: 50,
            }}
        >
            <Suspense fallback={null}>

                <MotionGroup
                    scale={75}
                >
                    <Float
                        floatIntensity={0.0625}
                        rotationIntensity={0.5}
                    >
                        <CachedMacBook />
                    </Float>
                </MotionGroup>
                <StandardLights />
                <ShadowCatcher />
            </Suspense>
        </Canvas>
    )
}



export default PortfolioScene;