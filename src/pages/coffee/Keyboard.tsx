import { useTexture } from "@react-three/drei";
import "./VirtualCoffee.css";
import useNode from "../../hooks/useNode";
import BackgroundMaterial from "../../materials/backgroundMaterial";

export default function Keyboard() {
  const object = useNode("laptopBottom");
  const bumpTexture = useTexture("textures/macNormal.png");
  const texture = useTexture("textures/machi.webp");
  bumpTexture.flipY = false;

  texture.flipY = false;
  const material = BackgroundMaterial(texture, false);
  // const material = new THREE.MeshStandardMaterial({
  //   color: 0xffffff,
  //   map: texture,
  //   toneMapped:false,
  //   transparent:true,
  // //   bumpMap: bumpTexture,
  // //   bumpScale: 2.5,
  //   // envMap: textureCube,
  // });

  return (
    <>
      <mesh
        castShadow
        receiveShadow
        position={object.position}
        rotation={object.rotation}
        geometry={object.geometry}
        material={material}
      />
    </>
  );
}
