import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Earth() {

  const meshRef = useRef<THREE.Mesh>(null);

  const texture = new THREE.TextureLoader().load(
    require("../assets/earthmap.jpg")
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Globe3D() {

  return (

    <Canvas style={{ height: 260 }}>

      <ambientLight intensity={0.5} />

      <directionalLight position={[5,3,5]} />

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
      />

      <Earth />

      <OrbitControls enableZoom={false} />

    </Canvas>

  );

}