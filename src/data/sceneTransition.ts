import narrative from "./narrativeFirstPerson.json";

interface SceneTransition {
  [key: string]: number;
}

const sceneTransition = narrative.reduce<SceneTransition>((acc, val, idx) => {
  if (val.transition) {
    acc[val.transition] = idx; // let ts knows acc can be indexed with a string
  }
  return acc;
}, {});

export default sceneTransition;
