export const vertexShader = /* glsl */ `
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vUv = uv;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vPosition = viewPosition.xyz;
    vNormal = normalize(normalMatrix * normal); // Transform the normal to view space

    gl_Position = projectionMatrix * vec4(vPosition, 1.0);
}`;

export const fragmentShader = /* glsl */ `
uniform float time;
uniform sampler2D uTexture;
uniform vec3 flatColor;
uniform vec3 lightDirection;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    precision highp float;
    vec3 normalizedLightDirection = normalize(lightDirection);
    float lambertian = max(dot(vNormal, normalizedLightDirection), 0.2);
    vec2 uv = vUv;
    vec4 iconColor = texture2D(uTexture, uv);
    vec4 mixedColor = mix(vec4(flatColor,1), iconColor,  iconColor.a);
    vec4 finalColor = mixedColor * smoothstep(0.0, 0.5, lambertian);
    gl_FragColor = finalColor;
}`;
