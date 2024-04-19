import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import useParticlizing from "../hooks/useParticlizing.ts";
import backgroundMaterial  from "../materials/backgroundMaterial.ts";
import useNode from "../hooks/useNode.ts";


type objectSetProps = {
  name: string;
  texturePath: string;
  span: number[];
  transparent?: boolean;
  color?:null|THREE.Color
};

export default  function Background({ name, span, texturePath, transparent=false}: objectSetProps) {
  const { isVisible } = useParticlizing(span);
  const texture = useTexture(texturePath);
  const node = useNode(name);   
  const material = useMemo(() => {
    texture.flipY = false;
    const material = backgroundMaterial(texture, transparent);
    return material;
  },[] );

  return (
    <mesh
      geometry={node.geometry}
      material={material}
      position={node.position}
      rotation={node.rotation}
      visible={isVisible}
    />
  );
}
