import { useTexture } from "@react-three/drei";
import "./VirtualCoffee.css";
import * as THREE from "three";
import useNode from "../../hooks/useNode";
import { TransitionalMesh } from "../../components/MeshTransition";
import BackgroundMaterial from "../../materials/backgroundMaterial";
import { useEffect, useState } from "react";

export default function Coffee({ isVisible }: { isVisible: boolean }) {
  return (
    <group visible={isVisible}>
      <CoffeeSurface />
      <CoffeeMug on={isVisible} />
    </group>
  );
}

function CoffeeMug({ on }: { on: boolean }) {
  const object = useNode("coffeeMug");
  const material = new THREE.MeshStandardMaterial({
    color: "white",
    metalness: 1.0,
    // envMap: textureCube,
  });

  const [isParticlizing, setIsParticlizing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsParticlizing(true);

    setTimeout(() => {
      setIsVisible(true);
      setIsParticlizing(false);
    }, 50);
  }, [on]);
  return (
    <>
      {isVisible && (
        <mesh
          castShadow
          receiveShadow
          position={object.position}
          rotation={object.rotation}
          geometry={object.geometry}
          material={material}
        />
      )}
      {isParticlizing && (
        <TransitionalMesh mesh={object} transitionMode="dissolve" />
      )}
    </>
  );
}

function CoffeeSurface() {
  const object = useNode("coffeeSurface");
  const texture = useTexture("textures/coffee-surface.webp");
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = BackgroundMaterial(texture, false);

  return (
    <mesh
      position={object.position}
      rotation={object.rotation}
      geometry={object.geometry}
      material={material}
    />
  );
}
