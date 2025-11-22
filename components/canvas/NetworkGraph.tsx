"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

const NODE_COUNT = 50;
const CONNECTION_DISTANCE = 3.5;
const NODE_COLOR = "#00f3ff";
const ACTIVE_COLOR = "#ff6b00";

export default function NetworkGraph() {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Generate random node positions
    const nodes = useMemo(() => {
        return new Array(NODE_COUNT).fill(0).map(() => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            ),
        }));
    }, []);

    // Calculate connections based on distance
    const connections = useMemo(() => {
        const lines: THREE.Vector3[][] = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (nodes[i].position.distanceTo(nodes[j].position) < CONNECTION_DISTANCE) {
                    lines.push([nodes[i].position, nodes[j].position]);
                }
            }
        }
        return lines;
    }, [nodes]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Rotate the entire group
            // Accelerate rotation on hover
            const rotationSpeed = hovered ? 0.2 : 0.05;
            groupRef.current.rotation.y += delta * rotationSpeed;
            groupRef.current.rotation.x += delta * (rotationSpeed * 0.5);
        }
    });

    return (
        <group
            ref={groupRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Render Nodes */}
            {nodes.map((node, i) => (
                <Sphere key={i} args={[0.05, 16, 16]} position={node.position}>
                    <meshStandardMaterial
                        color={hovered ? ACTIVE_COLOR : NODE_COLOR}
                        emissive={hovered ? ACTIVE_COLOR : NODE_COLOR}
                        emissiveIntensity={hovered ? 2 : 0.5}
                        toneMapped={false}
                    />
                </Sphere>
            ))}

            {/* Render Connections */}
            {connections.map((line, i) => (
                <Line
                    key={i}
                    points={line}
                    color={hovered ? ACTIVE_COLOR : NODE_COLOR}
                    transparent
                    opacity={0.2}
                    lineWidth={1}
                />
            ))}
        </group>
    );
}
