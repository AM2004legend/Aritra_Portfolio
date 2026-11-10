import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* A slowly breathing sphere of ink dots — printed-matter feel, not neon. */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aRandom;
  varying float vDepth;
  varying float vNoise;

  float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
  float noise(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z);
  }

  void main() {
    vec3 p = position;
    float n = noise(p * 1.4 + uTime * 0.18);
    p += normalize(p) * (n - 0.5) * 0.5;
    vNoise = n;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.6 + aRandom * 2.4) * uPixelRatio * (6.0 / -mv.z);
    vDepth = smoothstep(-6.8, -3.4, mv.z); // 0 = back, 1 = front
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vDepth;
  varying float vNoise;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.15, d) * mix(0.08, 0.75, vDepth);
    vec3 col = mix(uInk, uAccent, smoothstep(0.62, 0.8, vNoise) * vDepth);
    gl_FragColor = vec4(col, a);
  }
`;

function Sphere({ count = 4200 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const { positions, randoms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const radius = 1.6;
      positions[i * 3] = Math.cos(theta) * r * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = Math.sin(theta) * r * radius;
      randoms[i] = Math.random();
    }
    return { positions, randoms };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uInk: { value: new THREE.Color("#17306b") },
      uAccent: { value: new THREE.Color("#7f9ad6") },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (material.current) material.current.uniforms.uTime.value += delta;
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += delta * 0.05;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.3, 2.5, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, x * 0.15, 2.5, delta);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function InkSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      eventSource={document.body}
      eventPrefix="client"
    >
      <Sphere />
    </Canvas>
  );
}
