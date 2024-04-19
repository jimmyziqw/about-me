import { useEffect, useMemo } from "react";
import gsap from "gsap";
import { useLevelContext } from "./useLevelContext";
import getLightStates, { hexToRgb } from "../data/lightInterpolation";
export default function useLightAnimation(lightRef: any, name: any) {
  const { level } = useLevelContext();
  const lightStates = useMemo(() =>  getLightStates(name), []);
  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;

    const targetState = lightStates[level];

    const tl = gsap.timeline({
    });

    tl.to(
      light,
      {
        intensity: targetState.intensity,
        duration: 1,
      },
      "<"
    );

    if (targetState.pos) {
      tl.to(
        light.position,
        {
          x: targetState.pos[0],
          y: targetState.pos[1],
          z: targetState.pos[2],
          duration: 1,
        },
        "<"
      );
    }
    //TODO: fix target in production. only work when target object present (helper)!!!
 
    if (targetState.rot ) {//THREE js light has no rotation !!! target position instead.
      // const targetPosition = new THREE.Vector3(targetState.rot[0], targetState.rot[1], targetState.rot[2]);

      tl.to(
        light.target.position,
        {
          x: targetState.rot[0],
          y: targetState.rot[1],
          z: targetState.rot[2],
          onUpdate: () => {
            // console.log(targetPosition, light.target)
            // light.target.position.set(light.target.position.x, light.target.position.y, light.target.position.z);
            // light.lookAt(targetPosition);// This is sometimes necessary
            // console.log(light.target.position)
          },
          // onComplete:()=>{
          //   console.log(light.target.position);
          // },
          duration: 1,
        },
        "<"
      );
    }
    if (!targetState || !targetState.color) return;

    if (targetState.color && targetState.color !== targetState.color[level - 1]) {
      const rgb = hexToRgb(targetState.color);
      tl.to(
        light.color,
        {
          r: rgb[0] / 255,
          g: rgb[1] / 255,
          b: rgb[2] / 255,
          // intensity:10,
          duration: 1,
        },
        "<"
      );
    }

  }, [level]);
}
