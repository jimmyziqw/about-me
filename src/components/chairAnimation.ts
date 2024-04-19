import gsap from 'gsap';
import * as THREE from 'three';
import sceneTransition from '../data/sceneTransition.ts';

export const CHAIR_ROTATION_Y_INIT= 70 ; //already been convert
export const CHAIR_POSITION_X_INIT = 0.8;
export const CHAIR_POSITION_Z_INIT = 0;

const CHAIR_ROTATION_Y_ENERSION = 130 ;
const CHAIR_POSITION_X_ENERSION = -0.8;
const CHAIR_POSITION_Z_ENERSION = 0;

const CHAIR_ROTATION_Y_SCHOOL = 0;
const CHAIR_POSITION_X_SCHOOL = 0.9;
const CHAIR_POSITION_Z_SCHOOL = 0.5;


export default function ChairAnimation(mesh:THREE.Mesh, level:number, isProceeding:boolean){
    if (!mesh) return ;
    const material = mesh.material as THREE.RawShaderMaterial;
    const tl = gsap.timeline({
      ease:"power.in",
      onUpdate: () => {material.needsUpdate = true;}
    });
    //  -----------------enersion-------------------------
    if (level ===  sceneTransition.enersion && isProceeding === true )  { 
    tl.to(mesh.position, {x: CHAIR_POSITION_X_ENERSION, duration:0.5}, 0)
    tl.to(mesh.position, {z: CHAIR_POSITION_Z_ENERSION, duration:0.5}, 0)

    tl.to(mesh.rotation, {y: CHAIR_ROTATION_Y_ENERSION* Math.PI/180, duration:0.5}, 0)
    } 
    else if (level === sceneTransition.enersion-1 && isProceeding === false )  { 
    tl.to(mesh.position, {x: CHAIR_POSITION_X_INIT, duration:0.5}, 0)
    tl.to(mesh.position, {z: CHAIR_POSITION_Z_INIT, duration:0.5}, 0)
    tl.to(mesh.rotation, {y: (CHAIR_ROTATION_Y_INIT+360)* Math.PI/180, duration: 0.5}, 0);
    }
    
    //--------------------school----------------------
    else if (level ===  sceneTransition.school && isProceeding === true )  { 
      tl.to(mesh.position, {x: CHAIR_POSITION_X_SCHOOL, duration:0.5}, 0)
      tl.to(mesh.position, {z: CHAIR_POSITION_Z_SCHOOL, duration:0.5}, 0)
      tl.to(mesh.rotation, {y: CHAIR_ROTATION_Y_SCHOOL* Math.PI/180, duration:0.5}, 0)
      } 
    else if (level === sceneTransition.school-1 && isProceeding === false )  { 
      tl.to(mesh.position, {x: CHAIR_POSITION_X_ENERSION, duration:0.5}, 0)
      tl.to(mesh.position, {z: CHAIR_POSITION_Z_ENERSION, duration:0.5}, 0)
      tl.to(mesh.rotation, {y: CHAIR_ROTATION_Y_ENERSION* Math.PI/180, duration: 0.5}, 0);
  }
}

