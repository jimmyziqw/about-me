import { useControls } from "leva";
import Planet from "./Planet";
import planetsData from "./planetsData";
import StarBelt from "./StarBelt";

export default function SolarSystem({ isVisible = false } = {}) {
  // add scale making animation look good
  const { semiMajorAxisScale, orbitalPeriodScale, radiusExponentScale } = getControl("solar");

  return (
    <group
      position={[0, 1, 0]}
      rotation={[Math.PI / 20, 0, Math.PI / 20]}
      scale={0.1}
      visible={isVisible}
    >
      {planetsData.map((planet) => (
        <Planet
          key={planet.name}
          radius={(planet.radius * 0.1) ** radiusExponentScale}
          color={planet.color}
          semiMajorAxis={planet.semiMajorAxis * semiMajorAxisScale}
          eccentricity={planet.eccentricity}
          orbitalPeriod={planet.orbitalPeriod * orbitalPeriodScale}
          isVisible={isVisible}
        />
      ))}
      <StarBelt numberOfStars={2000} isVisible={isVisible} />
    </group>
  );
}

function getControl(name: string) {
  const schema = {
    semiMajorAxisScale: {
      value: 0.7,
      min: 0.1,
      max: 5,
      step: 0.1,
      label: "Semi-Major",
    },
    orbitalPeriodScale: {
      value: 4.6,
      min: 0.1,
      max: 5,
      step: 0.1,
      label: "Orbital Period",
    },
    radiusExponentScale: {
      value: 0.81,
      min: 0.01,
      max: 2,
      step: 0.01,
      label: "radius ",
    },
  };
  if (process.env.NODE_ENV !== 'development') {
    return {
      semiMajorAxisScale: schema.semiMajorAxisScale.value,
      orbitalPeriodScale: schema.radiusExponentScale.value,
      radiusExponentScale:schema.radiusExponentScale.value, 
    
    };
  }
  
  const config = useControls(name, schema);

  return config;
}