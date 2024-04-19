import { Canvas } from "@react-three/fiber";
import { useRef, Suspense, useState } from "react";
import useStats from "./utils/useStats.ts";
import { PerspectiveCamera, Preload, useGLTF } from "@react-three/drei";
import {
  CameraStateDisplay,
  CameraStateOutsideCanvas,
} from "./utils/DisplayCameraStates.tsx";
import CustomControl from "./utils/CustomControl.tsx";
import SceneController from "./SceneController.tsx";
import Monologue from "./pages/terminal/Monologue.tsx";
import { LevelContextProvider } from "./hooks/useLevelContext.tsx";
import cameraStates from "./data/cameraStates.ts";
import DirectionalLight from "./components/DirectionalLight.tsx";
import AmbientLight from "./components/AmbientLight.tsx";
import Loader from "./utils/Loader.tsx";

useGLTF.preload("models/model.glb");

export default function Scene() {
  const cameraDetails = cameraStates[0]; //init
  const [progress, setProgress] = useState(0);
  
  const positionRef = useRef(null);
  const rotationRef = useRef(null);
  useStats();
  return (
    <LevelContextProvider>
      <Canvas
        frameloop="always"
        shadows
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Preload all />
          <SceneController />
        </Suspense>
        <AmbientLight />
        <DirectionalLight name="introSunLight" />
        <DirectionalLight name="introRoomDirectLight" />
        <PerspectiveCamera
          makeDefault
          position={cameraDetails.position}
          rotation={cameraDetails.rotation}
          fov={cameraDetails.fov}
          zoom={cameraDetails.zoom}
        />
        <CustomControl />
        <CameraStateDisplay
          positionRef={positionRef}
          rotationRef={rotationRef}
        />
      </Canvas>
      <Monologue progress={progress} />
      <CameraStateOutsideCanvas
        positionRef={positionRef}
        rotationRef={rotationRef}
      />
      <Loader setProgress={setProgress} />
    </LevelContextProvider>
  );
}
