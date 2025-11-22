"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

export default function Scene({ children, className, ...props }: any) {
    return (
        <Canvas
            className={className}
            dpr={[1, 2]}
            camera={{ position: [0, 0, 10], fov: 50 }}
            {...props}
        >
            {children}
            <Preload all />
        </Canvas>
    );
}
