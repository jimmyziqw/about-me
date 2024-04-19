import { useRef } from "react";
import * as THREE from "three";
import useLightAnimation from "../hooks/useLightAnimation";
import { useControls } from "leva";
import { useHelper } from "@react-three/drei";

export default function DirectionalLight({ name = "light" }) {
  const lightRef = useRef<THREE.DirectionalLight>(null); 
  useLightAnimation(lightRef, name);
  const { intensity, x_pos, y_pos, z_pos, x_rot, y_rot, z_rot, color } = getLightControl(
    name,
    lightRef,
  );
  
  return (
    <>
    <directionalLight
      ref={lightRef}
      name={name}
      castShadow
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
      shadow-bias={-0.01}
      shadow-camera-left={-5}
      shadow-camera-right={5}
      shadow-camera-top={4}
      shadow-camera-bottom={-2}
      shadow-camera-near={0.01}
      shadow-camera-far={10}
      target-position={[x_rot, y_rot, z_rot]}
      position={[x_pos, y_pos, z_pos]}
      color={color}
      intensity={intensity}
    />
    </>
  );
}
const schema = {
    intensity: { value: 0.1, min: 0, max: 10, step: 0.1 },
    x_pos: { value: -0.32, min: -1, max: 5, step: 0.1 },
    y_pos: { value: 2, min: 0, max: 4, step: 0.1 },
    z_pos: { value: -1.92, min: -4, max: 4, step: 0.1 },
    x_rot: { value: 2, min: -9, max: 9, step: 0.1 },
    y_rot: { value: 2, min: -9, max: 9, step: 0.1 },
    z_rot: { value: 2, min: -9, max: 9, step: 0.1 },
    color: "#ffffff",
    mapSize: { value: 512, min: 256, max: 2048, step: 128 },
    bias: { value: -0.01, min: -1.3, max: 0.5, step: 0.001 },
  };
function getLightControl(name: string, lightRef: any) {
  
  if (process.env.NODE_ENV !== 'development') {
    return {
      intensity: schema.intensity.value,
      x_pos: schema.x_pos.value,
      y_pos: schema.y_pos.value,
      z_pos: schema.z_pos.value,
      x_rot: schema.x_rot.value,
      y_rot: schema.y_rot.value,
      z_rot: schema.z_rot.value,
      color: schema.color,
    };
  }
  useHelper( lightRef, THREE.DirectionalLightHelper, 0.2);

  const lightConfig = useControls(name, schema);
  return lightConfig;
}
