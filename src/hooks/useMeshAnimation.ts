import { useEffect } from "react";
import { useLevelContext } from "./useLevelContext";

export default function useMeshAnimation(groupRef: any , name:string, setAnimation:any=()=>true) {
    const { level, isProceeding} = useLevelContext();
    useEffect(() => {
    if (groupRef.current){
      const group = groupRef.current as THREE.Group;
      group.children.forEach((child) => {
          const mesh = child as THREE.Mesh; 
          setAnimation(mesh, level, isProceeding, name)
      })
     } 
    }, [isProceeding, level]); 
}
