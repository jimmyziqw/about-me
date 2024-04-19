import useCameraAnimation from "./hooks/useCameraAnimation.ts";
import useWheelListener from "./hooks/useWheelListener.ts";
import { useLevelContext } from "./hooks/useLevelContext.tsx";
import cameraStates from "./data/cameraStates.ts";
import scene from "./data/sceneTransition.ts";
import IntroDeskTopSet from "./items/IntroDeskTopSet.tsx";
import narratives from "./data/narrativeFirstPerson.json";
import VirtualCoffee from "./pages/coffee/VirtualCoffee.tsx";
import Galaxy from "./pages/galaxy/Galaxy.tsx";
import ItemSet from "./components/ItemSet.tsx";
import Flower from "./items/Flower.tsx";
import DesktopTerminal from "./pages/terminal/DesktopTerminal.tsx";
import Airship from "./items/Airship.tsx";
import Background from "./components/Background.tsx";
import Cloud from "./items/Cloud.tsx";
import chairAnimation from "./components/chairAnimation.ts";
// import Wave from "./TEST/Wave.tsx";
import useRespondAspectChange from "./utils/useRespondAspectChange.ts";

const SCROLL_TIMEOUT = 100;
export default function SceneController() {
  const { level, setLevel, setIsProceeding } = useLevelContext();
  useCameraAnimation(level, cameraStates);
  useWheelListener(setLevel, setIsProceeding, narratives.length - 1, SCROLL_TIMEOUT);
  useRespondAspectChange();

  return (
    <>
      {/* <Wave /> */}
      <ItemSet name="floor" span={[scene.openText, scene.end]} />
      <ItemSet name="desk" span={[scene.desk, scene.enersion, scene.callback, scene.contact1]} />
      <ItemSet name="desktop" span={[scene.deskItem, scene.enersion, scene.callback, scene.contact]} />
      <ItemSet name="lamp" span={[scene.deskItem, scene.enersion, scene.callback, scene.end]} />
      <ItemSet name="introWall" span={[scene.introBg, scene.enersion, scene.callback]} />
      <Cloud span={[scene.introBg, scene.enersion, scene.callback + 1]} />
      <Background
        transparent
        name="introBuilding"
        texturePath="textures/building1.png"
        span={[scene.introBg, scene.enersion, scene.callback + 1]}
      />
      <ItemSet name="chair" span={[scene.chair, scene.end-1]} animation={chairAnimation} />
      <Flower span={[scene.deskItem+1, scene.enersion]} />
      <Galaxy span={[scene.galaxyOn, scene.galaxyOff]} />
      <IntroDeskTopSet span={[scene.deskTop, scene.enersion, scene.callback + 1, scene.contact]} />

      <VirtualCoffee />
      <ItemSet name="table" span={[scene.enersion, scene.school]} />
      <ItemSet name="solarium" span={[scene.enersion, scene.school]} />
      <ItemSet name="laptop" span={[scene.enersion, scene.school]} />
      {/* <ItemSet name="keyboard" span={[scene.enersion, scene.school]} /> */}
      <Background name="keyboard"
      transparent
              texturePath="textures/machi.webp"
              span={[scene.enersion, scene.school]}
      />
      <Background
        name="enersionBackground"
        transparent
        texturePath="textures/solarium5.jpg"
        span={[scene.enersion, scene.school]}
      />

      <ItemSet name="schoolDesk" span={[scene.school, scene.callback]} />
      <ItemSet name="schoolWall" span={[scene.school, scene.callback]} />
      <ItemSet name="schoolComputer" span={[scene.school + 1, scene.callback]} />
      <ItemSet name="schoolBrick" span={[scene.school + 1, scene.callback]} />
      <ItemSet name="sticker1" span={[scene.school + 1, scene.callback]} />

      <DesktopTerminal span={[scene.end]} />
      <Airship span={[scene.contact2]} />
    </>
  );
}

