import narrative from "./narrativeFirstPerson.json";

type lightStateType = {
  pos: number[] | null;
  rot: number[] | null;
  intensity: number | null;
  color: string | null;
};

type LightName = "introSunLight" | "introRoomDirectLight";
if (!narrative.length) throw new Error("Check narrative length!");

export default function getLightStates(name: LightName) {
  const lightRawData: lightStateType[] = narrative.map(
    (scene) =>
      scene[name] || { pos: null, rot: null, intensity: null, color: null }
  );
  interpolateHelper(lightRawData);
  return lightRawData;
}

function interpolateNumber(start: number, end: number, step: number): number {
  return start + (end - start) * step;
}

function interpolateProperties<T extends lightStateType>(
  lightData: T[],
  startIdx: number,
  endIdx: number,
  properties: (keyof T)[]
) {
  const steps = endIdx - startIdx;

  for (let i = startIdx + 1; i < endIdx; i++) {
    const stepRatio = (i - startIdx) / steps;

    properties.forEach((property) => {
      const startValue = lightData[startIdx][property];
      const endValue = lightData[endIdx][property];

      if (typeof startValue === "number" && typeof endValue === "number") {
        lightData[i][property] = interpolateNumber(
          startValue,
          endValue,
          stepRatio
        ) as any;
      } else if (Array.isArray(startValue) && Array.isArray(endValue)) {
        lightData[i][property] = startValue;
      } else if (
        typeof startValue === "string" &&
        typeof endValue === "string" &&
        property === "color"
      ) {
        lightData[i][property] = startValue;
      }
    });
  }
}

function interpolateHelper(lightData: lightStateType[]) {
  let startIdx: null | number = null;
  let endIdx: null | number = null;
  for (let idx = 0; idx < lightData.length; idx++) {
    const currLight = lightData[idx];
    if (currLight.intensity !== null && startIdx === null) startIdx = idx;
    else if (currLight.intensity !== null && startIdx !== null) {
      endIdx = idx;
      interpolateProperties(lightData, startIdx, endIdx, [
        "pos",
        "rot",
        "intensity",
        "color",
      ]);
      startIdx = endIdx;
      endIdx = null;
    }
  }
  if (startIdx !== null) {
    for (let index = startIdx + 1; index < lightData.length; index++) {
      lightData[index].intensity = 0; // Fallback for remaining items
    }
  }
}

export function hexToRgb(hex: string) {
  let r = 0,
    g = 0,
    b = 0;
  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return [r, g, b];
}
