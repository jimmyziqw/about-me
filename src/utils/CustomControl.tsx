import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

export default function useCustomControls() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  const { camera } = useThree();
  const moveSpeed = 0.03;
  const rotateSpeed = 0.02;
  type KeyControl = 'w' | 'a' | 's' | 'd' | 'Space' | 'Control' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

  const keys = useRef<Record<KeyControl, boolean>>({
    w: false,
    a: false,
    s: false,
    d: false,
    Space: false, // For moving up
    Control: false, // For moving down
    ArrowUp: false, // For rotating up
    ArrowDown: false, // For rotating down
    ArrowLeft: false, // For rotating left
    ArrowRight: false, // For rotating right
  }).current;

  useFrame(() => {
    if (keys.w) camera.position.add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(moveSpeed));
    if (keys.s) camera.position.add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(-moveSpeed));
    if (keys.a || keys.d) {
      const right = new THREE.Vector3();
      camera.getWorldDirection(right).cross(camera.up).normalize();
      if (keys.a) camera.position.add(right.multiplyScalar(-moveSpeed));
      if (keys.d) camera.position.add(right.multiplyScalar(moveSpeed));
    }
    if (keys.Space) camera.position.y += moveSpeed; // Move up
    if (keys.Control) camera.position.y -= moveSpeed; // Move down

    // Adjusted camera rotation logic
    if (keys.ArrowLeft) camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), rotateSpeed);
    if (keys.ArrowRight) camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -rotateSpeed);

   // Corrected rotation logic for up and down
   if (keys.ArrowUp) {
    // Rotate the camera around its local X-axis upwards
    camera.rotateX(rotateSpeed);
}
if (keys.ArrowDown) {
    // Rotate the camera around its local X-axis downwards
    camera.rotateX(-rotateSpeed);
}
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: { [key: string]: KeyControl | undefined } = {
        'w': 'w', 'a': 'a', 's': 's', 'd': 'd',
        'ArrowUp': 'ArrowUp', 'ArrowDown': 'ArrowDown',
        'ArrowLeft': 'ArrowLeft', 'ArrowRight': 'ArrowRight',
        ' ': 'Space', 'Control': 'Control', // Note: ' ' for Space
      };
    
      const controlKey: KeyControl | undefined = keyMap[e.key] || keyMap[e.code];
      if (controlKey) {
        keys[controlKey] = true;
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const keyMap: { [key: string]: KeyControl | undefined } = {
        'w': 'w', 'a': 'a', 's': 's', 'd': 'd',
        'ArrowUp': 'ArrowUp', 'ArrowDown': 'ArrowDown',
        'ArrowLeft': 'ArrowLeft', 'ArrowRight': 'ArrowRight',
        ' ': 'Space', 'Control': 'Control', // Note: ' ' for Space
      };
    
      const controlKey: KeyControl | undefined = keyMap[e.key] || keyMap[e.code];
      if (controlKey) {
        keys[controlKey] = false;
      }
    };
    

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keys]); // Removed camera from dependency array as it does not change

  return null; // This component does not render anything
}
