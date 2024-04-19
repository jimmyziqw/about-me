import narrative from './narrativeFirstPerson.json';
import * as THREE from 'three';

type cameraStateType = {
    position: THREE.Vector3,
    rotation: THREE.Euler,
    zoom:number,
    fov:number,
  }
  
const cameraStates: cameraStateType[] = [];
  if(narrative.length > 0) {
    const firstCamera: any = narrative[0].camera; // init
    cameraStates.push({
      position: new THREE.Vector3(...firstCamera.pos),
      rotation: new THREE.Euler(...firstCamera.rot.map((x:number) => x / 180 * Math.PI)),
      zoom: firstCamera.zoom,
      fov: firstCamera.fov,
    });
    
    for(let idx = 1; idx < narrative.length; idx++) {
      const { camera } = narrative[idx];
      const prevCameraState = cameraStates[idx - 1];
      
      cameraStates.push({
        position: camera.pos ? new THREE.Vector3(...camera.pos) : prevCameraState.position,
        rotation: camera.rot ? new THREE.Euler(...camera.rot.map(x => x / 180 * Math.PI)) : prevCameraState.rotation,
        zoom: camera.zoom !== null && camera.zoom !== undefined ? camera.zoom : prevCameraState.zoom,
        fov: camera.fov !== null && camera.fov !== undefined ? camera.fov : prevCameraState.fov,
      });
    }
  }
export default cameraStates;