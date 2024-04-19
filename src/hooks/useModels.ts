import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
const MODEL_PATH = "models/model.glb";
export default function useModels(
  name: string,
  modelPath: string = MODEL_PATH
) {
  const { scene } = useGLTF(modelPath);
  const objects = useMemo(() => {
    const filteredObjects = scene.children
      .filter((child) => child.name.startsWith(name))
      .map((child) => {
        if (!(child instanceof THREE.Mesh)) {
          throw new Error(`Non-mesh object found when loading : ${child}`);
        }
        return child.clone(); // Deep clone geometry and material
      });

    return filteredObjects;
  }, []);

  return objects;
}
