import { useEffect, useRef } from "react";
import * as THREE from "three";
type StandardMeshGroupProps = {
  groupRef: any;
  objects: THREE.Mesh[];
  texturePath: string|null;
  isVisible: boolean;
};

export default function StandardMeshGroup({
  groupRef,
  objects,
  isVisible,
  texturePath,
}: StandardMeshGroupProps) {
  return (
    isVisible && (
      <group ref={groupRef}>
        {objects.map((obj, index) => (
          <StandardMesh key={index} mesh={obj as THREE.Mesh} texturePath={texturePath} />
        ))}
      </group>
    )
  );
}

type StandardMeshProps = {
  mesh: THREE.Mesh;
  texturePath?: string | null;
  isVisible?: boolean;
};

const StandardMesh = ({
  mesh,
  texturePath = null,
  isVisible = true,
  ...props
}: StandardMeshProps) => {
  const meshRef = useRef(mesh);
  
  useEffect(() => {
    if (texturePath) {
      let originalColor;
      
      originalColor = (mesh.material as THREE.MeshStandardMaterial).color;
    
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(texturePath);
      if (!texture) {
        throw new Error("have texture path but texture is not loaded correctly");
      }
      texture.flipY = false;
      meshRef.current.material = new THREE.MeshStandardMaterial({
        color: originalColor,
        map: texture,
        depthTest: true,
      });
    }
  }, []);

  return (
    <mesh
      castShadow
      receiveShadow
      ref={meshRef}
      geometry={mesh.geometry}
      material={meshRef.current.material}
      position={mesh.position}
      rotation={mesh.rotation}
      name={mesh.name}
      visible={isVisible}
      {...props}
    />
  );
};
