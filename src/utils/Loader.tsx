import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export default function LoadingScreen({ setProgress }: any) {
  const { active,  item, loaded, total } = useProgress();
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setProgress(loaded / total);  // TODO: centralize loading model and material
      }, 50);

      
      return () => clearTimeout(timer);
    }
  }, [active, loaded, total]);
  if (process.env.NODE_ENV == 'development') {
    console.log(active, item, loaded, total, "progress");
  }
  
  if (!active) setTimeout(()=>{setProgress(loaded/total)}, 50);
  return null;

}
