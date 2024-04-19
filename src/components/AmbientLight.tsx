import { useRef } from "react";
import useLightAnimation from "../hooks/useLightAnimation";
import { useControls } from "leva";

export default function AmbientLight() {
  const lightRef = useRef<any>(null);
  useLightAnimation(lightRef, "ambientLight");
  const { intensity, color } = getLightControl("AmbientLight");

  return <ambientLight ref={lightRef} color={color} intensity={intensity} />;
}

function getLightControl(name: string) {
  const schema = {
    intensity: { value: 0.1, min: 0, max: 5, step: 0.1 },
    color: "#ffffff",
  };
  if (process.env.NODE_ENV !== 'development') {
    return {
      intensity: schema.intensity.value,
      color: schema.color,
    };
  }
  
  const lightConfig = useControls(name, schema);
  return lightConfig;
}