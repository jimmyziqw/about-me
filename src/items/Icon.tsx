import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import useModels from "../hooks/useModels";
import  { fragmentShader, vertexShader } from "../shaders/iconShader.glsl";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
type IconProps = {
  texturePath: string;
  [key: string]: any;
};

export default function Icon({
  texturePath,
  index,
  url,
  setAnimation,
  ...props
}: IconProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const object = useModels("cargo")[index] as THREE.Mesh;
  const texture = useTexture(texturePath);
  const material = useMemo(() => {
    texture.flipY = false;
    texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.RepeatWrapping;
    const material = iconShader(texture); 
    return material;
  }, []);
  
  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    const color = (meshRef.current?.material as THREE.ShaderMaterial).uniforms.flatColor;
    if (isHovered) {
       color.value= new THREE.Color("white");
    } else {
      color.value = new THREE.Color("cyan");
    }
  }, [isHovered]);

  useFrame(({clock}) => {
    if (meshRef.current) {
      
      meshRef.current.rotateY(0.01 * Math.sin(clock.elapsedTime));
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={object.geometry}
      position={[0, -0.5, 0]}
      rotation={[0, 0, 0]}
      material={material}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onClick={() => openLink(url)}
      {...props}
    />
  );
}


function iconShader(texture: THREE.Texture) {
  return new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uTexture: { value: texture },
      time: { value: 0 },
      flatColor: { value: new THREE.Color("cyan") },
      lightDirection: { value: new THREE.Vector3(2,-1,-3)}
    },
    depthTest: true,
    side: THREE.DoubleSide,
  });
}
