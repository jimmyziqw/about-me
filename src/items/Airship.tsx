import { ReactNode, useRef } from "react";
import sceneTransition from "../data/sceneTransition";
import Icon from "./Icon";
import useParticlizing from "../hooks/useParticlizing";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useNode from "../hooks/useNode";
import { useLevelContext } from "../hooks/useLevelContext";
import React from "react";

export default function hoc({ span }: { span: number[] }) {
  const { isVisible } = useParticlizing(span);
  return <MemoAirship isVisible={isVisible} />;
}

const MemoAirship = React.memo(Airship);

export function Airship({ isVisible }: { isVisible: boolean }) {
  const airship = useNode("airship");
  const material = new THREE.MeshStandardMaterial({
    color: "cyan",
    side: THREE.DoubleSide,
  });
  return (
    isVisible && (
      <Translator position={airship.position} isVisible={isVisible}>
        <mesh geometry={airship.geometry} material={material} />
        <Oscillator position={[-0.01, -0.2, 0.3]} rotation={[0.1, 0, 0.1]}>
          <Icon
            index={0}
            texturePath="textures/icons/gmail-icon.png"
            url="mailto:jimmyziqw@gmail.com"
          />
          <Oscillator
            position={[0.01, -0.22, -0.03]}
            rotation={[-0.2, -0.1, 0.1]}
          >
            <Icon
              index={1}
              texturePath="textures/icons/github-mark.png"
              url="https://github.com/jimmyziqw"
            />
            <Oscillator
              position={[-0.02, -0.17, -0.13]}
              rotation={[0.1, 0.1, 0]}
            >
              <Icon
                index={2}
                texturePath="textures/icons/linkedin-icon.png"
                url="https://www.linkedin.com/in/jimmy-ziqiao-wang/"
              />
            </Oscillator>
          </Oscillator>
        </Oscillator>
      </Translator>
    )
  );
}

type GroupTransformationProps = {
  position?: THREE.Vector3 | [number, number, number];
  rotation?: THREE.Euler | [number, number, number];
  children: ReactNode;
  isVisible?: boolean;
};

function Translator({
  position,
  children,
  isVisible,
}: GroupTransformationProps) {
  const { level } = useLevelContext();
  const groupRef = useRef<THREE.Group>(null);
  let time = 0;
  useFrame((_, delta) => {
    if (groupRef.current && level == sceneTransition.contact2 && isVisible) {
      time += delta; //check when is elapsed time constructed
      const currentPosition = groupRef.current.position;
      if (currentPosition.x > 0.5) currentPosition.x -= delta * 2.2;
    }
  });
  return (
    <group ref={groupRef} position={position} visible={isVisible}>
      {children}
    </group>
  );
}

function Oscillator({
  position = [0, -0.1, 0],
  rotation = [0, 0, 0],
  children,
}: GroupTransformationProps) {
  const { level } = useLevelContext();
  const ref = useRef<THREE.Group>(null);

  const l = 1; // Length of pendulum
  const g = 9.81; // Gravity
  const omega0 = Math.sqrt(g / l); // Natural frequency
  let time = 0;
  let theta = (-30 * Math.PI) / 180; // Initial angle in radians
  let omega = -1; // Initial angular velocity
  const beta = 1;

  useFrame((_, delta) => {
    if (ref.current && level == sceneTransition.contact2) {
      time += delta;
      ref.current.rotation.z = theta;
      if (ref.current.position.x <= 0.5 && time <= 6.28) {
        omega -= delta * (2 * beta * omega + omega0 * omega0 * Math.sin(theta));
        theta += delta * omega;
        ref.current.rotation.z = theta;
      }
      if (time > 6.28) {
        ref.current.rotation.z = 0.02 * Math.sin(time);
      }
    }
  });
  return (
    <group ref={ref} position={position} rotation={rotation}>
      {children}
    </group>
  );
}
