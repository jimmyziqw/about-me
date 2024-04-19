import { useRef } from "react";
import useParticlizing from "../hooks/useParticlizing.ts";
import useModels from "../hooks/useModels.ts";
import TransitionalGroup from "./MeshTransition.tsx";
import StandardMeshGroup from "./StandardMesh.tsx";
import useMeshAnimation from "../hooks/useMeshAnimation.ts";

type objectSetProps = {
  name: string;
  animation?: any;
  texturePath?: string | null;
  span: number[];
  children?: any;
};

export default function ItemSet({
  name,
  span,
  animation,
  texturePath = null,
}: objectSetProps) {
  const { isVisible, isParticlizing } = useParticlizing(span);
  const groupRef = useRef(null);
  const objects = useModels(name);

  useMeshAnimation(groupRef, name, animation);

  return (
    <>
      <StandardMeshGroup
        groupRef={groupRef}
        objects={objects}
        isVisible={isVisible}
        texturePath={texturePath}
      />
      <TransitionalGroup objects={objects} transitionMode={isParticlizing} />
    </>
  );
}
