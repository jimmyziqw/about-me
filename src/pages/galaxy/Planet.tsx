import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import {vertexShader, fragmentShader} from "../../shaders/fresnel.glsl";

type PlanetProps = {
  color: string;
  radius: number;
  semiMajorAxis: number; // AU
  eccentricity: number;
  orbitalPeriod: number; // Earth years
  isVisible: boolean;
};

export default function Planet({
  color,
  radius,
  semiMajorAxis,
  eccentricity,
  orbitalPeriod,
  isVisible,
}: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const speed = (2 * Math.PI) / orbitalPeriod; // simplified for demo

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * speed;
    const semiMinorAxis =
      semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);
    const x = -semiMajorAxis * Math.cos(time);
    const z = semiMinorAxis * Math.sin(time);
    if (planetRef.current) {
      planetRef.current.position.x = x;
      planetRef.current.position.z = z;
    }
  });

  const { bias, scale, power } = useLevaHelper();
  return (
    <mesh
      ref={planetRef}
      geometry={new THREE.SphereGeometry(radius, 32, 32)}
      material={fresnelMaterial({
        facingHex: new THREE.Color(color),
        bias,
        scale,
        power,
      })}
      visible={isVisible}
    />
  );
}

function fresnelMaterial({
  rimHex = new THREE.Color(0x0088ff),
  facingHex = new THREE.Color(0x000000),
  bias = 0.1,
  scale = 1.0,
  power = 9.0,
} = {}) {
  const fresnelMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: rimHex },
      color2: { value: facingHex },
      fresnelBias: { value: bias },
      fresnelScale: { value: scale },
      fresnelPower: { value: power },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
  return fresnelMaterial;
}

function useLevaHelper() {
  if (process.env.NODE_ENV !== "development") {
    return {
      bias: 0.28,
      scale: 0.9,
      power: 4.41,
    };
  } else {
    return useControls("adjust fresnel", {
      bias: { value: 0.28, min: 0, max: 1, step: 0.01 },
      scale: { value: 0.9, min: 0, max: 5, step: 0.01 },
      power: { value: 4.41, min: 0, max: 10, step: 0.01 },
    });
  }
}
