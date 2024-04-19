import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { vertexShader, fragmentShader } from "../../shaders/starBelt.glsl.ts";

type AsteroidBeltProps = {
  numberOfStars?: number;
  colorVariation?: number;
  heightVariance?: number;
  isVisible?: boolean;
};

export default function StarBelt({
  numberOfStars = 100,
  colorVariation = 0.9,
  heightVariance = 0.1,
  isVisible = false,
}: AsteroidBeltProps) {
  const asteroidBeltRef = useRef<THREE.Points>(null);
  const { geometry, material } = useMemo(() => {
    const vertices = [];
    const colors = [];
    const innerRadius = 10;
    const geometry = new THREE.BufferGeometry();
    for (let i = 0; i < numberOfStars; i++) {
      const rand = Math.random();
      const angle = rand * 2 * Math.PI;
      const radius = gaussianRandom(innerRadius, 1);
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = (rand - 0.5) * heightVariance;
      vertices.push(x, y, z);

      const colorOffset = rand * colorVariation;
      const variation = new THREE.Color("black").offsetHSL(
        colorOffset,
        0.7,
        0.7
      );
      colors.push(variation.r, variation.g, variation.b);
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = StarBeltMaterial({ starSize: 0.01 });
    return { geometry, material };
  }, []);

  useFrame((_, delta) => {
    if (asteroidBeltRef.current) {
      const material = asteroidBeltRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value += delta; // Rotate the asteroid belt around Y-axis

      asteroidBeltRef.current.rotation.y += 0.001;
    }
  });

  return isVisible ? (
    <points ref={asteroidBeltRef} geometry={geometry} material={material} />
  ) : null;
}

function gaussianRandom(mean = 0, stdev = 1) {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdev + mean;
}

function StarBeltMaterial({ starSize = 0.01 } = {}) {
  const material = new THREE.ShaderMaterial({
    vertexColors: true,
    uniforms: {
      uSize: { value: starSize },
      uTime: { value: 0 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  return material;
}
