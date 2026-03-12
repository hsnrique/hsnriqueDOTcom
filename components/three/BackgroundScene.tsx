"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.1 + pointer.y * 0.3;
      meshRef.current.rotation.y = t * 0.15 + pointer.x * 0.3;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * -0.08;
      wireRef.current.rotation.z = t * 0.12;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef} position={[2, 0.5, -3]}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshBasicMaterial
            color="#00ff41"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={wireRef} position={[-2.5, -1, -4]}>
          <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />
          <meshBasicMaterial
            color="#00ff41"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.2}>
        <mesh position={[0, -2, -5]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshBasicMaterial
            color="#ffb000"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>
      </Float>
    </>
  );
}

function GridFloor() {
  const gridHelper = useMemo(() => {
    const grid = new THREE.GridHelper(40, 40, 0x00ff41, 0x00ff41);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.04;
    return grid;
  }, []);

  return <primitive object={gridHelper} position={[0, -4, -5]} />;
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#050505", 8, 25]} />

        <Stars
          radius={50}
          depth={50}
          count={1500}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        <FloatingGeometry />
        <GridFloor />
      </Canvas>
    </div>
  );
}
