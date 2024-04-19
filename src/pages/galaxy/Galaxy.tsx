import SolarSystem from "./SolarSystem";
import useParticlizing from "../../hooks/useParticlizing";
export default function Galaxy({ span }: { span: number[] }) {
  const { isVisible } = useParticlizing(span);
  return <SolarSystem isVisible={isVisible} />;
}
