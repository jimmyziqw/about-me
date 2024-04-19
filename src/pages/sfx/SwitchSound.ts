import  { useEffect } from 'react';

// Define a component that takes a prop
const SwitchSound = (level:number) => {
 let player:any;
  useEffect(() => {
    

    const loadAndPlaySound = async () => {
      if (level === 4) {
        const Tone = await import('tone');
    
        // Await Tone.start() to ensure the audio context is resumed/started.
        await Tone.start();
        console.log('Audio context started');
    
        // Initialize the player
        player = new Tone.Player().toDestination();
    
        // Use the load method to load the file, which returns a promise
        await player.load("/sound/lightSwitch.mp3");
    
        // After the file is loaded, it is safe to start the player
        player.start();
        console.log('Sound should play');
      }
    };
    if (level === 4)loadAndPlaySound()
  
    return () => {
      // Stop and dispose of the player when the component unmounts or level changes
      if (player) {
        player.stop();
        player.dispose();
      }
    };
  }, [level]); // Effect depends on the level prop

  // Return null because this component doesn't render anything itself
  // return null;
};

export default SwitchSound;
