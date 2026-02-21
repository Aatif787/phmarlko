"use client";

import { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, PerspectiveCamera, Float, Instance, Instances, RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

// Reusable Capsule Component
function Capsule({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (groupRef.current) {
      // Floating animation using GSAP
      gsap.to(groupRef.current.position, {
        y: "+=0.2",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
      
      // Subtle rotation
      gsap.to(groupRef.current.rotation, {
        z: "+=0.05",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  const materialProps = {
    roughness: 0.15,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    transmission: 0, // Opaque for hard shell
    specularIntensity: 1,
    ior: 1.5,
  };

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Top Half - White */}
        <group position={[0, 0.55, 0]}>
          <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
            <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial color="#ffffff" {...materialProps} />
          </mesh>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 1.5, 64]} />
            <meshPhysicalMaterial color="#ffffff" {...materialProps} />
          </mesh>
        </group>

        {/* Middle Ring / Ridge */}
        <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.02, 1.02, 0.1, 64]} />
            <meshPhysicalMaterial color="#2A7FFF" {...materialProps} roughness={0.2} />
        </mesh>

        {/* Bottom Half - Medical Blue */}
        <group position={[0, -0.95, 0]}>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 1.5, 64]} />
            <meshPhysicalMaterial color="#2A7FFF" {...materialProps} />
          </mesh>
          <mesh position={[0, -0.75, 0]} rotation={[Math.PI, 0, 0]} castShadow receiveShadow>
            <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial color="#2A7FFF" {...materialProps} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// Realistic Pill Box Component
function PillBox() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Compartment Contents - 4 Types of Pills
  const pillsData = useMemo(() => {
    const createPills = (count: number, type: 'capsule' | 'round' | 'oval', color1: string, color2?: string) => {
      return Array.from({ length: count }).map(() => ({
        position: [
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.2, 
          (Math.random() - 0.5) * 0.8
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ] as [number, number, number],
        scale: 0.8 + Math.random() * 0.2,
        color1,
        color2
      }));
    };

    return {
      quadrant1: createPills(12, 'capsule', '#f97316', '#ffffff'), // Orange/White Capsules
      quadrant2: createPills(15, 'round', '#facc15'), // Yellow Round Tablets
      quadrant3: createPills(10, 'oval', '#3b82f6'), // Blue Oval Tablets
      quadrant4: createPills(12, 'capsule', '#ef4444', '#ef4444') // Red Capsules
    };
  }, []);

  const boxMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#ffedd5", // Light Peach/Cream
    roughness: 0.15,
    metalness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    transmission: 0.2, // Slight translucency for plastic feel
    thickness: 2,
    ior: 1.5
  }), []);

  const rimMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#fb923c", // Orange Rim
    roughness: 0.2,
    metalness: 0.3,
    emissive: "#fb923c",
    emissiveIntensity: 0.1
  }), []);

  return (
    <group ref={groupRef} position={[2, -0.5, -2]} rotation={[0.4, -0.3, 0.1]} scale={1.3}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
        
        {/* Main Box Body */}
        <group>
            {/* Base */}
            <RoundedBox args={[2.2, 0.5, 2.2]} radius={0.1} smoothness={4} position={[0, -0.25, 0]} castShadow receiveShadow>
                <primitive object={boxMaterial} />
            </RoundedBox>
            
            {/* Inner Compartments (Walls) */}
            <group position={[0, 0, 0]}>
                {/* Cross Divider */}
                <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2, 0.4, 0.1]} />
                    <primitive object={rimMaterial} />
                </mesh>
                <mesh position={[0, 0.1, 0]} rotation={[0, Math.PI/2, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2, 0.4, 0.1]} />
                    <primitive object={rimMaterial} />
                </mesh>
                
                {/* Rim Border */}
                <mesh position={[0, 0.1, 1]} castShadow receiveShadow>
                    <boxGeometry args={[2.2, 0.4, 0.1]} />
                    <primitive object={rimMaterial} />
                </mesh>
                <mesh position={[0, 0.1, -1]} castShadow receiveShadow>
                    <boxGeometry args={[2.2, 0.4, 0.1]} />
                    <primitive object={rimMaterial} />
                </mesh>
                <mesh position={[1, 0.1, 0]} rotation={[0, Math.PI/2, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2.2, 0.4, 0.1]} />
                    <primitive object={rimMaterial} />
                </mesh>
                <mesh position={[-1, 0.1, 0]} rotation={[0, Math.PI/2, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2.2, 0.4, 0.1]} />
                    <primitive object={rimMaterial} />
                </mesh>
            </group>
        </group>

        {/* Open Lid */}
        <group position={[0, 0.25, -1.1]} rotation={[-Math.PI / 1.5, 0, 0]}>
            <group position={[0, 0, 1.1]}> {/* Pivot correction */}
                <RoundedBox args={[2.2, 0.2, 2.2]} radius={0.1} smoothness={4} castShadow receiveShadow>
                    <primitive object={boxMaterial} />
                </RoundedBox>
                {/* Lid Interior Detail */}
                <mesh position={[0, -0.11, 0]} receiveShadow>
                    <planeGeometry args={[2, 2]} />
                    <meshStandardMaterial color="#fff7ed" roughness={0.4} />
                </mesh>
            </group>
        </group>

        {/* Pills in Compartments */}
        <group position={[0, 0, 0]}>
            {/* Top Left: Orange/White Capsules */}
            <group position={[-0.5, 0, -0.5]}>
                <Instances range={12}>
                    <capsuleGeometry args={[0.12, 0.3, 8, 16]} />
                    <meshPhysicalMaterial 
                        roughness={0.2} 
                        clearcoat={0.3}
                        color="#f97316"
                    />
                    {pillsData.quadrant1.map((pill, i) => (
                        <Instance
                            key={i}
                            position={pill.position}
                            rotation={pill.rotation}
                            scale={pill.scale}
                            color={i % 2 === 0 ? pill.color1 : pill.color2} 
                        />
                    ))}
                </Instances>
            </group>

            {/* Top Right: Yellow Round Tablets */}
            <group position={[0.5, 0, -0.5]}>
                <Instances range={15}>
                    <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
                    <meshPhysicalMaterial 
                        color="#facc15" 
                        roughness={0.4} 
                        metalness={0.1} 
                        clearcoat={0.2}
                        sheen={1}
                        sheenRoughness={0.5}
                        sheenColor="#ffffff"
                    />
                    {pillsData.quadrant2.map((pill, i) => (
                        <Instance
                            key={i}
                            position={pill.position}
                            rotation={pill.rotation}
                            scale={pill.scale}
                        />
                    ))}
                </Instances>
            </group>

            {/* Bottom Left: Blue Oval Tablets */}
            <group position={[-0.5, 0, 0.5]}>
                <Instances range={10}>
                    <sphereGeometry args={[0.15, 32, 16]} />
                    <meshPhysicalMaterial 
                        color="#3b82f6" 
                        roughness={0.1} 
                        metalness={0.2}
                        clearcoat={1}
                        transmission={0.1}
                    />
                    {pillsData.quadrant3.map((pill, i) => (
                        <Instance
                            key={i}
                            position={pill.position}
                            rotation={pill.rotation}
                            scale={[1, 0.6, 1.5]} // Flatten to make oval
                        />
                    ))}
                </Instances>
            </group>

            {/* Bottom Right: Red Softgel Capsules */}
            <group position={[0.5, 0, 0.5]}>
                <Instances range={12}>
                    <capsuleGeometry args={[0.12, 0.3, 8, 16]} />
                    <meshPhysicalMaterial 
                        color="#ef4444" 
                        roughness={0.1} 
                        metalness={0.1} 
                        clearcoat={1} 
                        transmission={0.6}
                        thickness={1}
                        ior={1.4}
                    />
                    {pillsData.quadrant4.map((pill, i) => (
                        <Instance
                            key={i}
                            position={pill.position}
                            rotation={pill.rotation}
                            scale={pill.scale}
                        />
                    ))}
                </Instances>
            </group>
        </group>

      </Float>
    </group>
  );
}

function SceneContent() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 7; // Rough breakpoint for mobile in 3D units

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
      
      <Environment preset="apartment" blur={0.6} background={false} />
      
      <ambientLight intensity={0.4} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.2} 
        penumbra={0.5} 
        intensity={800} 
        castShadow 
        shadow-bias={-0.0001}
      />
      <spotLight 
        position={[-5, 5, -5]} 
        intensity={500} 
        color="#fb923c" // Warm rim light
        angle={0.5}
      />
      <rectAreaLight 
        width={10} 
        height={10} 
        intensity={2} 
        position={[5, 0, 5]} 
        color="#ffffff" 
        lookAt={() => new THREE.Vector3(0,0,0)} 
      />

      <group position={isMobile ? [0, 1, 0] : [2, 0, 0]}>
        <Capsule 
          position={[0, 0, 0]} 
          rotation={[0, 0, Math.PI / 6]} 
          scale={isMobile ? 0.6 : 0.9} 
        />
        <PillBox />
      </group>

      <ContactShadows 
        position={[0, -4, 0]} 
        opacity={0.3} 
        scale={20} 
        blur={2.5} 
        far={4} 
        color="#0f172a" // Darker, more realistic shadow color
      />
    </>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
