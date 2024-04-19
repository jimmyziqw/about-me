import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { AudioLoader, AudioListener, Audio } from 'three';

const url ='/sound/lightSwitch.mp3';
function Bgm(){
  const { camera } = useThree();
  const sound = new Audio(new AudioListener());

  useEffect(() => {
    camera.add(sound.listener);
    const audioLoader = new AudioLoader();
    audioLoader.load(url, (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    });

    // Corrected clean-up function
    return () => {
      sound.stop();
      camera.remove(sound.listener); // It's good practice to also remove the listener from the camera on cleanup
    };
  }, [url]);

  return null;
};

// const App = () => (
//   <Canvas>
//     <BackgroundSound url="path/to/your/sound.mp3" />
//     {/* Your scene components go here */}
//   </Canvas>
// );

export default Bgm;
