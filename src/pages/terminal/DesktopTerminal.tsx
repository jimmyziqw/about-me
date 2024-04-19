import { Html } from "@react-three/drei";
import { useLevelContext } from "../../hooks/useLevelContext";
import Terminal from "./Terminal";
import sceneTransition from "../../data/sceneTransition";
import * as THREE from "three";
import useParticlizing from "../../hooks/useParticlizing";
import useNode from "../../hooks/useNode";
import { useMemo } from "react";

export default function DesktopTerminal({ span }: { span: number[] }) {
  const { isVisible } = useParticlizing(span, 0);
  const { level } = useLevelContext();
  const object = useNode("desktopScreen");
  const { position, rotation } = useMemo(() => {
    const position = object.position.clone()
      .add(new THREE.Vector3(0, 0, 0.001));
    const rotation = object.rotation;
    return { position, rotation };
  }, []);
  return (
    isVisible && (
      <mesh position={position} rotation={rotation}>
        <Html
          className="desktop-terminal"
          scale={0.035}
          transform
          occlude={"blending"}
          zIndexRange={[80, 0]}
        >
          <HtmlContent level={level} />
        </Html>
      </mesh>
    )
  );
}

function HtmlContent({ level }: { level: number }) {
  const terminalPrefix = "jimmy@my-desktop:~$";

  return (
    <>
      {level == sceneTransition.end && (
        <Terminal progress={1}
          oldText={terminalPrefix}
          textToDelete=""
          textToAdd="The end"
          characterTimeInterval={30}
        />
      )}

      {level == sceneTransition.contact && (
        <Terminal progress={1}
          oldText={terminalPrefix}
          textToDelete={"The end"}
          textToAdd={"It's another beginning"}
          characterTimeInterval={20}
        />
      )}
    </>
  );
}
