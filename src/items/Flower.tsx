import useParticlizing from "../hooks/useParticlizing";
import useNode from "../hooks/useNode";
import ParticleSystem from "../components/ParticleSystem";

export default function Flower({ span }: { span: number[] }) {
  const leaf = useNode("flowerLeaf1");
  const base = useNode("flowerStem");
  const other = useNode("flowerPot");

  const { isVisible } = useParticlizing(span);

  if (!leaf || !base || !other) return null;

  return (
    <group visible={isVisible}>
      <ParticleSystem
        baseObject={base}
        particle={leaf}
        position={base.position}
      />
      <mesh
        geometry={base.geometry}
        material={base.material}
        position={base.position}
      />
      <mesh
        geometry={other.geometry}
        material={other.material}
        position={other.position}
      />
    </group>
  );
}
