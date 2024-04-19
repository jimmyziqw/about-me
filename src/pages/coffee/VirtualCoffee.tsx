import { useRef, forwardRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useLevelContext } from "../../hooks/useLevelContext";
import "./VirtualCoffee.css";
import st from "../../data/sceneTransition";
import useParticlizing from "../../hooks/useParticlizing";
// import VirtualApp from "./pages/VirtualApp";
// import ClipMaterial from "../../shaders/ClipMaterial";
import VirtualApp from "./pages/VirtualApp";
import Coffee from "./Coffee";

//
export default function Web() {
  const ref1 = useRef();
  const { isVisible } = useParticlizing([st.coffeeOn, st.coffeeOff], 0);
  const { scene } = useThree();
  const laptopScreen = scene.getObjectByName("laptopScreen");
  if (laptopScreen) laptopScreen.visible = false;
  // const laptopBack = scene.getObjectByName("laptopBack");
  // if (laptopBack) laptopBack.visible = false;

  return (
    laptopScreen &&
    isVisible && (
      <WebDevice
        className={"desktop-app virtual-device"}
        ref={ref1}
        scale={0.025}
        position={laptopScreen.position}
        rotation={laptopScreen.rotation}
      />
    )
  );
}

const WebDevice = forwardRef(
  ({ className, scale, position, rotation }: any, ref: any) => {
    const { level } = useLevelContext();
    const isWebVisible = level >= st.coffeeOn && level <= st.coffeeOff;

    const [isCoffeeVisible, setIsCoffeeVisible] = useState(false);

    return (
      <>
        <mesh position={position} rotation={rotation} visible={isWebVisible}>
          <Html
            ref={ref}
            scale={scale}
            className={className}
            transform
            occlude={"blending"}
            zIndexRange={[80, 0]}
            visible={isWebVisible}
          >
            <VirtualApp setIsCoffeeVisible={setIsCoffeeVisible} />
          </Html>
        </mesh>
        <Coffee isVisible={isCoffeeVisible && isWebVisible} />
      </>
    );
  }
);

// function ClippedMesh() {
//   const meshRef = useRef(null);
//   return (
//     <>
//       <mesh
//         ref={meshRef}
//         position={[0, 0, 0]}
//         material={ClippingShaderMaterial()}
//       >
//         <boxGeometry args={[2, 2, 2]} />
//       </mesh>
//     </>
//   );
// }

// function BlackBox() {
//   const object = useNode("blackBox");
//   const texture = useTexture("/textures/voronoi.jpg");
//   const material = useMemo(() => {
//     texture.flipY = false;
//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     return material;
//   }, []);
//   return (
//     <mesh
//       geometry={object.geometry}
//       material={material}
//       position={object.position}
//       rotation={object.rotation}
//     />
//   );
// }
