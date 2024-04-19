import { useState, useEffect } from "react";
import { useLevelContext } from "./useLevelContext";

export type LevelSpan = { createAt: number[]; deleteAt: number[] };

export type Particlizing = "integrate" | "dissolve" | null;

export default function useTransition(
  span: LevelSpan | number[],
  duration: number = 500
) {
  // simulate overload: number[] => levelSpan
  let levelSpan: LevelSpan;
  if (span instanceof Array) {
    levelSpan = {
      createAt: span.filter((_, i) => i % 2 == 0),
      deleteAt: span.filter((_, i) => i % 2 == 1),
    };
  } else if (isLevelSpan(span)) {
    levelSpan = span;
  }

  const { level, isProceeding } = useLevelContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isParticlizing, setIsParticlizing] = useState<Particlizing>(null);

  useEffect(() => {
    levelSpan.createAt.forEach((createAtLevel) => {
      if (level === createAtLevel - 1 && !isProceeding) {
        // reverse creation
        setIsVisible(false);
        setIsParticlizing("dissolve");
      } else if (level === createAtLevel && isProceeding) {
        // create
        setTimeout(() => setIsVisible(true), duration);
        setIsParticlizing("integrate");
      }
    });

    levelSpan.deleteAt.forEach((deleteAtLevel) => {
      if (level === deleteAtLevel - 1 && !isProceeding) {
        //reverse delete
        setTimeout(() => setIsVisible(true), duration);
        setIsParticlizing("integrate");
      } else if (level === deleteAtLevel && isProceeding) {
        //delete
        setIsVisible(false);
        setIsParticlizing("dissolve");
      }
    });

    if (levelSpan.createAt[0] < level && level < levelSpan.deleteAt[0]) {
      //TODO: Handle case with more spans
      setIsVisible(true);
    }

    if (
      level < levelSpan.createAt[0] ||
      (levelSpan.deleteAt[levelSpan.deleteAt.length - 1] < level &&
        levelSpan.createAt.length == levelSpan.deleteAt.length)
    ) {
      //TODO: Handle case with more spans
      setIsVisible(false);
    }
  }, [level, isProceeding]);

  useEffect(() => {
    if (isParticlizing) {
      const timer = setTimeout(() => {
        setIsParticlizing(null); // Hide ParticleTransition after animation duration
      }, duration);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isParticlizing]);

  return { isVisible, isParticlizing };
}

function isLevelSpan(span: any): span is LevelSpan {
  return span && Array.isArray(span.createAt) && Array.isArray(span.deleteAt);
}
