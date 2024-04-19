import { useMemo } from 'react';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
//https://github.com/mrdoob/three.js/blob/master/examples/webgl_instancing_scatter.html



type ParticleSystemProp = {
    baseObject: THREE.Mesh;
    particle: THREE.Mesh;
    instanceNumber?: number;
    instanceRotation?: THREE.Euler|[number,number,number];
    [key: string]: any;
};

export default function ParticleSystem({ baseObject, particle, instanceRotation = [0, 0, 0], instanceNumber = 100, ...props }: ParticleSystemProp) {
    
    const instances = useMemo(() => {
            const instances = new THREE.InstancedMesh(particle.geometry, new THREE.MeshStandardMaterial({side:THREE.DoubleSide}), instanceNumber);
            sampleInstanceTransformations(baseObject, instances, instanceNumber);
        return instances;
    }, [])

    return (
        <instancedMesh
            instanceMatrix={instances.instanceMatrix}
            geometry={instances.geometry}
            material={instances.material}
            count={instances.count}
            name = "flowers"
            {...props}
        />
            

    );
}


function sampleInstanceTransformations(baseObject: THREE.Mesh, instance: THREE.InstancedMesh, instanceNumber:number) {
    // creating dummy is easier to update instanceMatrix
    const dummy = new THREE.Object3D();

	// generate position and rotations relative to base object
	const samplerMesh = new MeshSurfaceSampler(baseObject).build(); 
	
	const _position = new THREE.Vector3();
	const _normal = new THREE.Vector3();

	for (let i = 0; i < instanceNumber; i++) {
		samplerMesh.sample(_position, _normal);
        //_normal.add( _position );
        
        dummy.position.copy( _position );
        // dummy.scale.set( scales[ i ], scales[ i ], scales[ i ] );
        dummy.lookAt( _normal );
        dummy.updateMatrix();
        instance.setMatrixAt( i, dummy.matrix );
	}
    
    instance.instanceMatrix.needsUpdate = true;

    return;  

}


// function calculateRotation(normal: THREE.Vector3) {
//   // Assuming the default "up" direction is Y-axis
// 	const upDirection = new THREE.Vector3(0, 1, 0);
// 	const quaternion = new THREE.Quaternion().setFromUnitVectors(upDirection, normal.normalize());
// 	const euler = new THREE.Euler().setFromQuaternion(quaternion, 'XYZ');
// 	return euler;

// }