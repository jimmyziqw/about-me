import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { fragmentShader, vertexShader } from "../shaders/movingBackgrond.glsl.ts";
import useParticlizing from "../hooks/useParticlizing";
import useNode from "../hooks/useNode";
import { useLevelContext } from "../hooks/useLevelContext";
import sceneTransition from "../data/sceneTransition";

export default function Cloud({ span }: { span: number[] }) {
  const { level } = useLevelContext();
  const beforeCallback = level < sceneTransition.school;
  const meshRef = useRef<THREE.Mesh>(null);
  const node = useNode("introCloud");
  const texture = useTexture("textures/loopingCloud.jpeg");
  const { isVisible } = useParticlizing(span);
  const material = useMemo(() => {
    texture.flipY = false;
    texture.wrapS = THREE.RepeatWrapping; //st <=> uv direction
    const material = cloudMaterial(texture);
    return material;
  }, []);

  const position = useMemo(() => {
    return beforeCallback
      ? node.position.clone().add(new THREE.Vector3(0.5, 0, 0))
      : node.position;
  }, [beforeCallback]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value += delta;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={node.geometry}
      material={material}
      visible={isVisible}
    />
  );
}

function cloudMaterial(
  texture: THREE.Texture,
  isClipped = false,
  speed = 0.015
) {
  return new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      map: { value: texture },
      time: { value: 0 },
      speed: { value: speed },
      isClipped: { value: isClipped },
    },
    depthTest: true,
    side: THREE.DoubleSide,
  });
}
