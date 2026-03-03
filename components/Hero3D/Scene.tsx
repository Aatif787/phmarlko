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
          <meshPhysicalMaterial
            color="#22c55e"
            {...materialProps}
            roughness={0}
            emissive="#22c55e"
            emissiveIntensity={3}
          />
        </mesh>

        {/* Bottom Half - Medical Blue */}
        <group position={[0, -0.95, 0]}>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 1.5, 64]} />
            <meshPhysicalMaterial color="#fcd34d" {...materialProps} />
          </mesh>
          <mesh position={[0, -0.75, 0]} rotation={[Math.PI, 0, 0]} castShadow receiveShadow>
            <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial color="#fcd34d" {...materialProps} />
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
    color: "#ffffff",
    roughness: 0.1,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    transmission: 0.95, // Highly realistic clear plastic
    thickness: 0.5,
    ior: 1.5,
    attenuationColor: "#f0fdf4",
    attenuationDistance: 1,
    transparent: true,
  }), []);

  const baseMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#f0fdf4", // Very faint green tint
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 0.5,
  }), []);

  return (
    <group ref={groupRef} position={[2, -0.6, -2]} rotation={[0.4, -0.4, 0.1]} scale={1.4}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Main Box Base */}
        <RoundedBox args={[2.4, 0.6, 2.4]} radius={0.12} smoothness={8} castShadow receiveShadow>
          <primitive object={baseMaterial} />
        </RoundedBox>

        {/* Realistic Grid Dividers */}
        <group position={[0, 0.15, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.3, 0.05]} />
            <meshStandardMaterial color="#d1fae5" roughness={0.3} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.3, 0.05]} />
            <meshStandardMaterial color="#d1fae5" roughness={0.3} />
          </mesh>
        </group>

        {/* Individual Realistic Lids with Hinges */}
        {[
          { pos: [-0.6, 0.35, -0.6], rot: -0.8 },
          { pos: [0.6, 0.35, -0.6], rot: -0.2 },
          { pos: [-0.6, 0.35, 0.6], rot: -0.5 },
          { pos: [0.6, 0.35, 0.6], rot: 0 }
        ].map((lid, idx) => (
          <group key={idx} position={new THREE.Vector3(...lid.pos)} rotation={[lid.rot, 0, 0]}>
            <group position={[0, 0, 0.55]}> {/* Lid Pivot */}
              <RoundedBox args={[1.1, 0.08, 1.1]} radius={0.05} smoothness={4} castShadow>
                <primitive object={boxMaterial} />
              </RoundedBox>
              {/* Small "Press" Tab */}
              <mesh position={[0, -0.02, -0.5]} castShadow>
                <boxGeometry args={[0.3, 0.05, 0.1]} />
                <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
              </mesh>
            </group>
          </group>
        ))}

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
        width={15}
        height={15}
        intensity={10}
        position={new THREE.Vector3(5, 2, 5)}
        color="#22c55e"
      />
      <pointLight position={[0, 2, 0]} intensity={15} color="#8b5cf6" />
      <pointLight position={[-3, -2, 2]} intensity={10} color="#22c55e" />

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
