import  { useState } from 'react';
// import * as Tone from 'tone';

function InitTone() {
  const [isReady, setIsReady] = useState(false);

  const handleStartTraining = async () => {
    // Start the audio context\
    
    const Tone = await import('tone');

 
    await Tone.start();
    // console.log('Audio context started');
    setIsReady(true); // Update state to indicate the app is ready
  };

  // Correct JSX return statement
  if (!isReady) {
    return (
    <div className="subtitle" style={{ padding: '20px', textAlign: 'center' }}>
        <button onClick={handleStartTraining}>Ready for training?</button>
    </div>
        
      
    );
  }

  // Assuming you want to render nothing (or something else) when the app is ready
  return null;
}

export default InitTone;
