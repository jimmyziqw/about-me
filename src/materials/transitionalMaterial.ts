import * as THREE from "three";
class TransitionalMaterial extends THREE.MeshPhongMaterial {
  constructor(parameters: Object, isTransitionUpward: boolean) {
    super(parameters);
    this.isTransitionUpward = isTransitionUpward;

    this.onBeforeCompile = (shader) => {
      this.userData.shader = shader;
      shader.uniforms.u_time = { value: 0 };
      shader.uniforms.u_isTransitionUpward = { value: isTransitionUpward };

      shader.vertexShader = /* glsl */ `
                varying vec3 vWorldPosition;
                uniform float u_time;
                ${shader.vertexShader}
            `;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        /*glsl*/ `
                #include <begin_vertex> 
                vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
                `
      );

      shader.fragmentShader = /*glsl*/ `
                varying vec3 vWorldPosition;
                uniform float u_time;
                uniform bool u_isTransitionUpward;

                ${shader.fragmentShader}
            `;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        /*glsl*/ `
                float fading = rand(vWorldPosition.xy)*0.0 + sin(2.0*vWorldPosition.x)*0.1;
                float threshold = dot(vWorldPosition.xy, vec2(1.0,2.0))*0.5 + fading;
                if (u_isTransitionUpward) {
                    if (threshold < u_time * 5.0) {
                        gl_FragColor.rgb *= 1.0 ; 
                    } else if (threshold < u_time * 5.0 + 0.5) {
                        gl_FragColor.rgb *= 1.5 ; 
                    } else {
                        discard;
                    }
                }  else {
                    if (threshold > u_time * 5.0+0.5) {
                            gl_FragColor.rgb *= 1.0 ; 
                    } else {
                         discard;                   
                    }
                    ;
                }       
                 #include <dithering_fragment>
                 `
      );
    };
  }
  get time() {
    if (this.userData.shader) {
      return this.userData.shader.uniforms.u_time.value;
    }
  }

  set time(value) {
    if (this.userData.shader) {
      this.userData.shader.uniforms.u_time.value = value;
    }
  }
  get isTransitionUpward() {
    return this.userData.shader?.uniforms.u_isTransitionUpward.value;
  }

  set isTransitionUpward(value) {
    if (this.userData.shader) {
      this.userData.shader.uniforms.u_isTransitionUpward.value = value;
    }
  }
}

export default TransitionalMaterial;
