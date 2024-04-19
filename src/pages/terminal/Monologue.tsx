import { useLevelContext } from "../../hooks/useLevelContext";
import data from "../../data/narrativeFirstPerson.json";
import sceneTransition from "../../data/sceneTransition";
import Terminal from "./Terminal.tsx";
import Subtitle from "./Subtitle";
import "./Terminal.css";
let rawTexts = data.map((scene) =>
  scene.desc ? `${scene.text} ${scene.desc}` : scene.text
);
const texts = fillEmptyTextWithLast(rawTexts);

const openText = rawTexts[sceneTransition.openText];

export default function Monologue({ progress }: { progress: number }) {
  const { level } = useLevelContext();
  let content = null;

  if (level <= sceneTransition.openText) {
    content = (
      <Terminal
        oldText="jimmy@my-desktop:~$ Loading 100%"
        textToAdd={openText}
        textToDelete=""
        progress={progress}
      />
    );
  } else if (level >= sceneTransition.closeText) {
    content = null;
  } else {
    content = <Subtitle text={texts[level]} />;
  }
  return <div className="monologue">{content}</div>;
}

function fillEmptyTextWithLast(texts: string[]) {
  const newTexts = [texts[0]];
  let lastNonEmptyText = "";
  for (let idx = 1; idx < texts.length; idx++) {
    const curr = texts[idx];
    if (curr) {
      newTexts.push(curr);
      lastNonEmptyText = curr;
    } else {
      newTexts.push(lastNonEmptyText);
    }
  }
  return newTexts;
}
//
