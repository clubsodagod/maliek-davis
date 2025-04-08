/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import ShadowCatcher from '@/components/three/lights/ShadowCatcher'
import StandardLights from '@/components/three/lights/StandardLights'
import { MotionGroup } from '@/components/motion/three/MotionGroup'
import MacBook from './models/macbook/Macbook'
import IpadPro from './models/iPad-Pro/IPadPro'
import { Float } from '@react-three/drei'
import { caseStudyDocuments } from '../../_library/copy.const'
import { animated, useSpring } from '@react-spring/three'
import IPhone from '@/public/3d-objects/iphone/IPhone'

const PortfolioScene: React.FC<{ device: "mobile" | "tablet" | "desktop"; logo: string; }> = ({ device, logo }) => {
    const macbookRef = useRef(null)
    const ipadRef = useRef(null)
    const iphoneRef = useRef(null)

    const [loaded, setLoaded] = useState(false)
    // const [logo, setLogo] = useState<string>(caseStudyDocuments[portfolio].logo)

    // Position + Rotation spring animation
    const positionSpring = useSpring({
        from: { position: getInitialOffset(device) },
        to: { position: [0, 0, 0] },
        config: { mass: 1, tension: 280, friction: 60 },
    })

    const rotationSpring = useSpring({
        to: {
            rotation:
                device === "mobile"
                    ? [0, Math.PI / 2, 0]
                    : device === "tablet"
                        ? [0, -Math.PI / 6, 0]
                        : [0, 0, 0],
        },
        config: { mass: 1, tension: 150, friction: 40 },
    })

  

    useEffect(() => {
        if (macbookRef.current && ipadRef.current && iphoneRef.current) {
            setLoaded(true)
        }
    }, [macbookRef, ipadRef, iphoneRef]);

    useEffect(() => {
        if(logo) {
            console.log(logo);
            
        }
    },[logo])


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
                        <MotionGroup>
                            <Float floatIntensity={0.0625} rotationIntensity={0.5}>
                                <animated.group {...positionSpring} {...rotationSpring}>
                                    <MotionGroup ref={iphoneRef} rotation={[1,9,1]} scale={7} visible={device === 'mobile'}>
                                        <IPhone link={logo} />
                                    </MotionGroup>

                                    <MotionGroup ref={ipadRef} scale={0.25} visible={device === 'tablet'}>
                                        <IpadPro link={logo} />
                                    </MotionGroup>

                                    <MotionGroup ref={macbookRef} scale={65} position={[5, -5, -0.5]} visible={device === 'desktop'}>
                                        <MacBook link={logo} />
                                    </MotionGroup>
                                </animated.group>
                            </Float>
                        </MotionGroup>
                        <StandardLights />
                        <ShadowCatcher />
            </Suspense>
        </Canvas>
    )
}

// Helper outside component
function getInitialOffset(device: string): [number, number, number] {
    switch (device) {
        case "mobile":
            return [0, -60, 0]
        case "tablet":
            return [-60, 0, 0]
        case "desktop":
            return [60, 0, 0]
        default:
            return [0, 0, 0]
    }
}

export default PortfolioScene
