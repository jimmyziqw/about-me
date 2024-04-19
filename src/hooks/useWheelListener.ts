import { useEffect, useRef } from 'react';



export default function useWheelListener(setLevel:any, setIsProceeding:any, maxLevel:number, scrollTimeout=100) {
  const allowChange = useRef(true);

  useEffect(() => {
    const handleScroll = (event:any) => {
      if (!allowChange.current) return;

      if (event.deltaY < 0) {
        setLevel((prevLevel:number) => Math.max(0, prevLevel - 1));
        setIsProceeding(false);
      } else {
        setLevel((prevLevel:number) => Math.min(maxLevel, prevLevel + 1));
        setIsProceeding(true);
      }

      // debounce for finishing loading and animation 
      allowChange.current = false;
      setTimeout(() => {
        allowChange.current = true;
      }, scrollTimeout); 
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [setLevel, setIsProceeding]);
}
