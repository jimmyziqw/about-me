import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import TransitionalMaterial from "../materials/transitionalMaterial";

const ANIMATION_DURATION = 500;

export default function TransitionalGroup({
  objects,
  transitionMode,
}: {
  objects: THREE.Mesh[];
  transitionMode: any;
}) {
  return (
    transitionMode && (
      <group>
        {objects.map((obj, index) => (
          <TransitionalMesh
            key={index}
            duration={ANIMATION_DURATION}
            mesh={obj.clone() as THREE.Mesh}
            transitionMode={transitionMode}
          />
        ))}
      </group>
    )
  );
}

type particleModelProps = {
  mesh: THREE.Mesh;
  duration?: number;
  name?: string;
  transitionMode: string | null;
};

export function TransitionalMesh({ mesh, transitionMode }: particleModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    const originalColor =
      mesh.material instanceof THREE.MeshStandardMaterial
        ? mesh.material.color
        : new THREE.Color("purple");

    if (transitionMode == "integrate") {
      const material = new TransitionalMaterial({ color: originalColor }, true);
      return material;
    } else if (transitionMode == "dissolve") {
      const material = new TransitionalMaterial({ color: originalColor }, false);
      return material;
    } else {
      throw new Error(`transition mode ${transitionMode} not available. `);
    }
  }, [mesh.material]);

  useFrame((_, delta) => {
    material.time += delta; 
  });
  return (
    <mesh
      castShadow
      receiveShadow
      ref={meshRef}
      geometry={mesh.geometry}
      material={material}
      position={mesh.position}
      rotation={mesh.rotation}
    />
  );
}
