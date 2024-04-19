import { useState, useEffect } from "react";

type TerminalProps = {
  oldText: string;
  textToAdd: string;
  textToDelete: string;
  progress:number;
  characterTimeInterval?: number;
  sentenceTimeInterval?: number;
  
};
export default function Terminal({
  oldText,
  textToAdd,
  textToDelete,
  progress,
  characterTimeInterval = 4,
  sentenceTimeInterval = 50,
}: TerminalProps) {

  const displayText =  useTypeWriter(
    textToAdd,
    textToDelete,
    characterTimeInterval,
    sentenceTimeInterval
  ) ;
  
  return (
    <div className="terminal">
      <div className="content">
        { (progress===1)? oldText + displayText :`jimmy@my-desktop:~$ Loading ${(progress*100).toFixed(2)}%` }
        <span className="cursor" />
      </div>
    </div>
  );
}

function useTypeWriter(
  textToAdd: string,
  textToDelete: string,
  characterTimeInterval: number,
  sentenceTimeInterval: number
) {
  // always delete first text before add
  const [currentIndex, setCurrentIndex] = useState(
    textToDelete ? textToDelete.length - 1 : 0
  );
  const [isDeletingDone, setIsDeletingDone] = useState(
    textToDelete ? false : true
  );
  const displayText = isDeletingDone
    ? textToAdd.slice(0, currentIndex)
    : textToDelete.slice(0, currentIndex);

  useEffect(() => {
    let timeInterval; // only for add text
    if (!isDeletingDone) {
      if (currentIndex > 0) {
        const timer = setTimeout(() => {
          setCurrentIndex(currentIndex - 1);
        }, characterTimeInterval);
        return () => clearTimeout(timer);
      } else {
        setIsDeletingDone(true);
      }
    } else if (isDeletingDone && currentIndex < textToAdd.length) {
      const nextCharacter = textToAdd[currentIndex];
      if (nextCharacter === "\n" || nextCharacter === ".") {
        timeInterval = sentenceTimeInterval;
      } else {
        timeInterval = characterTimeInterval;
      }

      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, timeInterval);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isDeletingDone]);

  return displayText;
}
