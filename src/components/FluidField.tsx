import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShaderFluid = `
  precision mediump float;
  uniform sampler2D uFluidTex;
  uniform vec4 iMouse;
  uniform vec2 uResolution;
  uniform float uBrushSize;
  uniform float uBrushStrength;
  uniform float uFluidDecay;
  uniform float uTrailLength;
  uniform float uStopDecay;
  layout(location = 0) out vec4 FluidOut;

  float encode(float v) {
    v = (v + 0.004102) / 0.008201;
    return floor(v * 255.0 + 0.5) / 255.0;
  }

  float decode(float v) {
    return v * 0.008201 - 0.004102;
  }

  vec3 encodeState(vec3 s) {
    return vec3(encode(s.x), encode(s.y), encode(s.z));
  }

  vec3 decodeState(vec3 c) {
    return vec3(decode(c.x), decode(c.y), decode(c.z));
  }

  float lineDistance(vec2 p, vec2 a, vec2 b) {
    vec2 ab = b - a;
    float l2 = dot(ab, ab);
    if (l2 < 0.001) return distance(p, a);
    float t = clamp(dot(p - a, ab) / l2, 0.0, 1.0);
    return distance(p, a + t * ab);
  }

  void processCell(ivec2 coord, vec2 pos, vec2 mousePos, vec2 mouseVel, vec2 lineA, vec2 lineB, float strength, float radius, inout vec3 nearbyState, inout float nearbyWeight) {
    ivec2 texSize = ivec2(uResolution);
    if (coord.x < 0 || coord.x >= texSize.x || coord.y < 0 || coord.y >= texSize.y) return;
    vec4 nb = texelFetch(uFluidTex, coord, 0);
    vec3 ns = decodeState(nb.xyz);
    float dist = lineDistance(pos, lineA, lineB);
    float q = dist / max(radius, 1.0);
    vec2 np = mix(lineA, lineB, clamp(dot(pos - lineA, lineB - lineA) / max(dot(lineB - lineA, lineB - lineA), 0.001), 0.0, 1.0));
    vec2 velInj = mix(mix(mouseVel, -ns.xy, 0.35), mouseVel - ns.xy, clamp(exp(-(radius * 0.35) * (radius * 0.35)), 0.0, 1.0)) * strength;
    float velDist = length(np - mousePos);
    float falloff = exp(-(q * q) * 2.5);
    nearbyState += (vec3(velInj, 0.0) * falloff) * 0.45;
    nearbyWeight += falloff * 0.45;
  }

  void main() {
    ivec2 fragCoord = ivec2(gl_FragCoord.xy);
    vec4 prev = texelFetch(uFluidTex, fragCoord, 0);
    vec3 s = decodeState(prev.xyz);
    s.xy *= uFluidDecay * uTrailLength;
    vec2 mousePos = iMouse.xy;
    vec2 mousePrev = iMouse.zw;
    vec2 mouseVel = (mousePos - mousePrev) * uBrushStrength * 5.0 * 0.0166;
    vec2 texSize = uResolution;
    vec2 pixelSize = 1.0 / texSize;
    vec2 pos = (vec2(fragCoord) + 0.5) * pixelSize;
    float tl = uTrailLength;
    tl *= max(0.72, 1.0 - length(mouseVel) * 2.5);
    float radius = uBrushSize * pixelSize.x;
    float strength = uBrushStrength * 0.022;
    if (length(mouseVel) < 0.001) mouseVel = vec2(0.0);

    vec3 nearbyState = vec3(0.0);
    float nearbyWeight = 0.0;

    for (int x = -3; x <= 3; x++) {
      for (int y = -3; y <= 3; y++) {
        if (x == 0 && y == 0) continue;
        ivec2 nCoord = ivec2(fragCoord.x + x, fragCoord.y + y);
        processCell(nCoord, pos, mousePos, mouseVel, mousePos, mousePrev, strength, radius, nearbyState, nearbyWeight);
      }
    }

    if (nearbyWeight > 0.001) {
      s += nearbyState / nearbyWeight;
    }

    if (iMouse.x >= 0.0 && iMouse.y >= 0.0) {
      float q = lineDistance(pos, mousePos, mousePrev) / max(radius, 0.0001);
      float falloff = exp(-q * q * 2.8);
      vec2 velDiff = (mouseVel - s.xy) * falloff * strength * 0.33 * 1.6;
      s.xy += velDiff;
      if (length(mouseVel) < 0.3) {
        s.xy *= mix(1.0, clamp(1.0 - falloff * (1.0 - tl), 0.0, 1.0), clamp((0.3 - length(mouseVel)) / 0.3, 0.0, 1.0) * uStopDecay);
      }
    }

    s.x = clamp(s.x, -0.4, 0.4);
    s.y = clamp(s.y, -0.4, 0.4);
    s.z = clamp(s.z, -0.4, 0.4);
    FluidOut = vec4(encodeState(s), 1.0);
  }
`;

const fragmentShaderDisplay = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform sampler2D u_fluid;
  uniform vec2 u_resolution;
  layout(location = 0) out vec4 outColor;
  layout(location = 1) out vec4 outBloom;

  float encode(float v) {
    v = (v + 0.004102) / 0.008201;
    return floor(v * 255.0 + 0.5) / 255.0;
  }

  float decode(float v) {
    return v * 0.008201 - 0.004102;
  }

  vec3 decodeState(vec3 c) {
    return vec3(decode(c.x), decode(c.y), decode(c.z));
  }

  float lineDistance(vec2 p, vec2 a, vec2 b) {
    vec2 ab = b - a;
    float l2 = dot(ab, ab);
    if (l2 < 0.001) return distance(p, a);
    float t = clamp(dot(p - a, ab) / l2, 0.0, 1.0);
    return distance(p, a + t * ab);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 texel = 1.0 / u_resolution;
    vec2 vel = decodeState(texelFetch(u_fluid, ivec2(gl_FragCoord.xy), 0).xyz).xy;
    vec2 fUV = vel * 8.0 * texel;
    vec2 distUV = uv + fUV;
    vec4 d = texture(u_texture, distUV);
    vec4 xLeft = texture(u_texture, distUV - vec2(texel.x, 0.0));
    vec4 xRight = texture(u_texture, distUV + vec2(texel.x, 0.0));
    vec4 yBottom = texture(u_texture, distUV - vec2(0.0, texel.y));
    vec4 yTop = texture(u_texture, distUV + vec2(0.0, texel.y));
    vec4 avgColor = (xLeft + xRight + yBottom + yTop) * 0.25;
    d = mix(d, avgColor, 0.0555);
    d *= 0.9923;
    vec3 bloomColor1 = vec3(227.0 / 255.0, 198.0 / 255.0, 210.0 / 255.0);
    vec3 bloomColor2 = vec3(140.0 / 255.0, 176.0 / 255.0, 222.0 / 255.0);
    vec3 bloomColor3 = vec3(157.0 / 255.0, 180.0 / 255.0, 216.0 / 255.0);
    vec4 threshold = step(vec4(0.545), d);
    vec3 bloom = bloomColor1 * threshold.r * 0.666;
    bloom += bloomColor2 * threshold.g * 0.333;
    bloom += bloomColor3 * threshold.b * 0.333;
    outColor = d;
    outBloom = vec4(bloom * d.a, d.a);
  }
`;

const fragmentShaderExposure = `
  precision mediump float;
  uniform sampler2D u_texture;
  out vec4 FragColor;

  vec3 ACESFilm(vec3 x) {
    float a = 2.51;
    float b = 0.03;
    float c = 2.43;
    float d = 0.59;
    float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / vec2(textureSize(u_texture, 0));
    vec3 col = texture(u_texture, uv).rgb;
    col *= 0.9;
    col = ACESFilm(col);
    col = pow(max(col, vec3(0.0)), vec3(0.93));
    FragColor = vec4(col, 1.0);
  }
`;

const fragmentShaderCopy = `
  precision mediump float;
  uniform sampler2D u_texture;
  out vec4 FragColor;
  void main() {
    vec2 uv = gl_FragCoord.xy / vec2(textureSize(u_texture, 0));
    FragColor = texture(u_texture, uv);
  }
`;

function createFBO(width: number, height: number, format?: THREE.TextureDataType) {
  const rt = new THREE.WebGLRenderTarget(width, height, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: format || THREE.UnsignedByteType,
  });
  return rt;
}

/**
 * Detect if the device is mobile or low-performance.
 * Uses a combined heuristic: touch capability + hardware concurrency + memory.
 */
function shouldUseWebGL(): boolean {
  const isMobile = window.matchMedia('(pointer: coarse)').matches;
  const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const lowMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory
    && (navigator as unknown as { deviceMemory?: number }).deviceMemory! <= 4;

  // Skip WebGL on any mobile device OR low-power desktop
  if (isMobile || (isLowPower && lowMemory)) {
    return false;
  }
  return true;
}

export default function FluidField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -10, y: -10, px: -10, py: -10 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if WebGL should be used
    if (!shouldUseWebGL()) {
      container.style.background = 'radial-gradient(ellipse at center, #0a0a1a 0%, #050507 100%)';
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const simWidth = Math.floor(width * 0.5);
    const simHeight = Math.floor(height * 0.5);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // FBOs
    let fluidA = createFBO(simWidth, simHeight, THREE.HalfFloatType);
    let fluidB = createFBO(simWidth, simHeight, THREE.HalfFloatType);
    let trailA = createFBO(width, height);
    let trailB = createFBO(width, height);
    const displayTarget = createFBO(width, height);
    const finalTarget = createFBO(width, height);

    // Materials
    const fluidMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fragmentShaderFluid,
      uniforms: {
        uFluidTex: { value: fluidA.texture },
        iMouse: { value: new THREE.Vector4(-10, -10, -10, -10) },
        uResolution: { value: new THREE.Vector2(simWidth, simHeight) },
        uBrushSize: { value: 12.0 },
        uBrushStrength: { value: 0.52 },
        uFluidDecay: { value: 0.98 },
        uTrailLength: { value: 0.95 },
        uStopDecay: { value: 1.6 },
      },
      glslVersion: THREE.GLSL3,
    });

    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fragmentShaderDisplay,
      uniforms: {
        u_texture: { value: trailA.texture },
        u_fluid: { value: fluidA.texture },
        u_resolution: { value: new THREE.Vector2(width, height) },
      },
      glslVersion: THREE.GLSL3,
    });

    const copyMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fragmentShaderCopy,
      uniforms: {
        u_texture: { value: null },
      },
      glslVersion: THREE.GLSL3,
    });

    const exposureMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fragmentShaderExposure,
      uniforms: {
        u_texture: { value: finalTarget.texture },
      },
      glslVersion: THREE.GLSL3,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const mesh = new THREE.Mesh(plane, fluidMaterial);
    scene.add(mesh);

    // Unified pointer handler for both mouse and touch
    const onPointerMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight;
      mouseRef.current.px = mouseRef.current.x;
      mouseRef.current.py = mouseRef.current.y;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      fluidMaterial.uniforms.iMouse.value.set(x, y, mouseRef.current.px, mouseRef.current.py);
    };

    const onPointerUp = () => {
      mouseRef.current.x = -10;
      mouseRef.current.y = -10;
      mouseRef.current.px = -10;
      mouseRef.current.py = -10;
      fluidMaterial.uniforms.iMouse.value.set(-10, -10, -10, -10);
    };

    // Use pointer events for unified mouse + touch handling
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // 1. Fluid sim: fluidA -> fluidB
      mesh.material = fluidMaterial;
      fluidMaterial.uniforms.uFluidTex.value = fluidA.texture;
      renderer.setRenderTarget(fluidB);
      renderer.render(scene, camera);

      // 2. Swap fluid
      [fluidA, fluidB] = [fluidB, fluidA];

      // 3. Display: trailA -> trailB (reads fluidA)
      mesh.material = displayMaterial;
      displayMaterial.uniforms.u_texture.value = trailA.texture;
      displayMaterial.uniforms.u_fluid.value = fluidA.texture;
      renderer.setRenderTarget(trailB);
      renderer.render(scene, camera);

      // 4. Swap trail
      [trailA, trailB] = [trailB, trailA];

      // 5. Copy trailA to displayTarget
      mesh.material = copyMaterial;
      copyMaterial.uniforms.u_texture.value = trailA.texture;
      renderer.setRenderTarget(displayTarget);
      renderer.render(scene, camera);

      // 7. Copy to finalTarget
      copyMaterial.uniforms.u_texture.value = displayTarget.texture;
      renderer.setRenderTarget(finalTarget);
      renderer.render(scene, camera);

      // 8. Exposure to screen
      mesh.material = exposureMaterial;
      exposureMaterial.uniforms.u_texture.value = finalTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      displayMaterial.uniforms.u_resolution.value.set(w, h);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      fluidA.dispose();
      fluidB.dispose();
      trailA.dispose();
      trailB.dispose();
      displayTarget.dispose();
      finalTarget.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
