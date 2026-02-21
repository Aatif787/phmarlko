"use client";

import dynamic from "next/dynamic";
import { useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

// Dynamically import Canvas to avoid SSR issues and improve initial load
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
  ssr: false,
});

function Molecule({ count = 12, radius = 1.5 }) {
  const group = useRef<THREE.Group>(null);
  
  const atoms = useMemo(() => new Array(count).fill(0).map(() => ({
    position: [
      (Math.random() - 0.5) * radius * 2,
      (Math.random() - 0.5) * radius * 2,
      (Math.random() - 0.5) * radius * 2
    ] as [number, number, number],
    scale: 0.2 + Math.random() * 0.2,
    color: Math.random() > 0.5 ? "#0b9ed9" : "#18b79b"
  })), [count, radius]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
      group.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group}>
      {atoms.map((atom, i) => (
        <mesh key={i} position={atom.position}>
          <sphereGeometry args={[atom.scale, 16, 16]} />
          <meshPhysicalMaterial 
            color={atom.color} 
            roughness={0.2} 
            metalness={0.1} 
            clearcoat={1}
            transmission={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function Pill(props: JSX.IntrinsicElements['group']) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Top Hemisphere */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#0b9ed9" roughness={0.2} metalness={0.1} clearcoat={1} />
      </mesh>
      
      {/* Middle Cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 1.2, 32]} />
        <meshPhysicalMaterial color="#0b9ed9" roughness={0.2} metalness={0.1} clearcoat={1} />
      </mesh>
      
      {/* Bottom Hemisphere (White) */}
      <mesh position={[0, -0.6, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.2} metalness={0.1} clearcoat={1} />
      </mesh>
      
      {/* Metallic Band */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.61, 0.61, 0.1, 32]} />
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none h-[50vh] sm:h-full w-full overflow-hidden opacity-60 sm:opacity-100 transition-opacity duration-1000">
      <Canvas 
        gl={{ 
          antialias: !isMobile, 
          alpha: true, 
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }} 
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        <ambientLight intensity={isMobile ? 0.4 : 0.6} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={isMobile ? 1 : 1.5} castShadow={!isMobile} />
        <pointLight position={[-10, -5, -10]} intensity={isMobile ? 0.3 : 0.5} color="#22c55e" />
        
        <ResponsiveScene isMobile={isMobile} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

function ResponsiveScene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <Float speed={isMobile ? 1.5 : 2} rotationIntensity={isMobile ? 0.3 : 0.5} floatIntensity={isMobile ? 0.7 : 1}>
        <Pill 
          position={isMobile ? [2.2, 2.5, -3] : [3.5, 0.5, 0]} 
          rotation={[0, 0, 0.4]} 
          scale={isMobile ? 1.2 : 1.8} 
        />
      </Float>
      
      <Float speed={isMobile ? 1 : 1.5} rotationIntensity={isMobile ? 0.5 : 1} floatIntensity={isMobile ? 0.3 : 0.5}>
        <group 
          position={isMobile ? [-2, -2.5, -4] : [-3.5, -1.5, -2]} 
          scale={isMobile ? 0.7 : 1}
        >
           <Molecule count={isMobile ? 6 : 12} radius={isMobile ? 1.5 : 2} />
        </group>
      </Float>
    </>
  );
}
