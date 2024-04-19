import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

const DURATION = 0.7; //second
type CameraDetails = {
  position: THREE.Vector3 | { x: number; y: number; z: number };
  rotation: THREE.Euler | { x: number; y: number; z: number };
  fov: number;
  zoom: number;
};

type CameraStateType = {
  [level: number]: CameraDetails;
};

export default function useCameraAnimation(
  level: number,
  cameraStates: CameraStateType
) {
  const { camera } = useThree();
  const step = { factor: 0 };

  useEffect(() => {
    const targetState = cameraStates[level];
    const startQuaternion = new THREE.Quaternion().setFromEuler(
      camera.rotation
    );
    const targetQuaternion = new THREE.Quaternion().setFromEuler(
      targetState.rotation as THREE.Euler
    );

    const tl = gsap.timeline({});

    tl.to(camera.position, {
      x: targetState.position.x,
      y: targetState.position.y,
      z: targetState.position.z,
      duration: DURATION,
    })
      .to(
        step,
        {
          factor: 1,
          duration: DURATION,
          onUpdate: function () {
            camera.quaternion.slerpQuaternions(
              startQuaternion,
              targetQuaternion,
              step.factor
            );
          },
        },
        "<"
      )

      .to(
        camera,
        {
          fov: targetState.fov,
          zoom: targetState.zoom,
          duration: DURATION,
          onUpdate: () => camera.updateProjectionMatrix(),
        },
        "<"
      );
  }, [level]);
}
