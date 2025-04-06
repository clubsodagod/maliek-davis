import { Canvas } from '@react-three/fiber'
import React, { CanvasHTMLAttributes, Suspense } from 'react'



interface CanvasProps extends CanvasHTMLAttributes<HTMLDivElement> {
    children:React.ReactNode;
}

const CanvasMD:React.FC<CanvasProps> = ({
    children,
    ...props
}) => {
    return (
        <Suspense fallback={null}>
            <Canvas
            {...props}
                dpr={[1, 1.5]}
                style={{
                    pointerEvents: 'none',
                    position: 'fixed',
                    top: 0,
                    zIndex: -1,
                }}
                shadows
                camera={{
                    position: [0, 0, 60],
                    fov: 50,
                }}
            >
                {children}
            </Canvas>
        </Suspense>

    )
}

export default CanvasMD