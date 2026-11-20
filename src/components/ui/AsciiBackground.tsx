import React, { useEffect, useRef, useState } from 'react';
import './AsciiBackground.css';

export interface AsciiBackgroundProps {
  className?: string;
  variant?: 'clouds' | 'waves' | 'rings';
  glyphs?: string;
  colors?: string[];
  size?: number;
  scale?: number;
  speed?: number;
  angle?: number;
  clearing?: number;
  contrast?: number;
  detail?: number;
  intensity?: number;
  grain?: number;
  seed?: number;
  fade?: 'none' | 'bottom' | 'top' | 'radial';
  interactive?: boolean;
  font?: string;
  weight?: number | string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DEFAULT_GLYPHS = ' ·:-=+*#%@';
const DEFAULT_COLORS = ['#1E2A44', '#2563EB', '#38BDF8', '#60A5FA', '#F472B6'];

const VERTEX_SHADER_SRC = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uPixelRatio;
uniform vec3 uPointer;
uniform vec2 uPointerMove;
uniform vec4 uPulses[4];
uniform float uIntro;
uniform vec3 uSurface;
uniform float uDark;
uniform float uGrain;
uniform sampler2D uAtlas;
uniform float uAtlasCount;

uniform vec3 uColors[8];
uniform int uColorsCount;
uniform float uAngle;
uniform float uClearing;
uniform float uContrast;
uniform float uDetail;
uniform float uIntensity;
uniform float uScale;
uniform float uSeed;
uniform float uSize;
uniform float uVariant;

out vec4 outColor;

#define PI 3.141592653589793
#define TAU 6.283185307179586

float hash11(float p) { p = fract(p * 0.1031); p *= p + 33.33; p *= p + p; return fract(p); }
float hash21(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
vec2 hash22(vec2 p) { vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); q += dot(q, q.yzx + 33.33); return fract((q.xx + q.yz) * q.zy); }
vec3 hash32(vec2 p) { vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); q += dot(q, q.yxz + 33.33); return fract((q.xxy + q.yzz) * q.zyx); }
mat2 rotate(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec3 permute(vec3 x) { return mod((x * 34.0 + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy)), x0 = v - i + dot(i, C.xx);
  vec2 i1 = x0.x > x0.y ? vec2(1, 0) : vec2(0, 1);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0, i1.y, 1)) + i.x + vec3(0, i1.x, 1));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m *= m; m *= m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0, h = abs(x) - 0.5, a0 = x - floor(x + 0.5);
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  return 130.0 * dot(m, vec3(a0.x * x0.x + h.x * x0.y, a0.yz * x12.xz + h.yz * x12.yw));
}

vec3 toLinear(vec3 c) { return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c)); }
vec3 toSrgb(vec3 c) { c = max(c, 0.0); return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }
vec3 toOklab(vec3 c) {
  vec3 l = toLinear(c);
  vec3 lms = pow(max(mat3(0.4122214708, 0.2119034982, 0.0883024619, 0.5363325363, 0.6806995451, 0.2817188376, 0.0514459929, 0.1073969566, 0.6299787005) * l, 0.0), vec3(1.0 / 3.0));
  return mat3(0.2104542553, 1.9779984951, 0.0259040371, 0.7936177850, -2.4285922050, 0.7827717662, -0.0040720468, 0.4505937099, -0.8086757660) * lms;
}
vec3 fromOklab(vec3 c) {
  vec3 lms = mat3(1.0, 1.0, 1.0, 0.3963377774, -0.1055613458, -0.0894841775, 0.2158037573, -0.0638541728, -1.2914855480) * c;
  lms *= lms * lms;
  return toSrgb(mat3(4.0767416621, -1.2684380046, -0.0041960863, -3.3077115913, 2.6097574011, -0.7034186147, 0.2309699292, -0.3413193965, 1.7076147010) * lms);
}
vec3 mixColor(vec3 a, vec3 b, float t) { return fromOklab(mix(toOklab(a), toOklab(b), t)); }

vec3 ramp(vec3 colors[8], int count, float t) {
  float x = clamp(t, 0.0, 1.0) * float(max(count - 1, 1));
  int i = int(min(floor(x), float(max(count - 2, 0))));
  return mixColor(colors[i], colors[min(i + 1, count - 1)], smoothstep(0.0, 1.0, x - float(i)));
}

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
vec4 paint(vec3 color, float amount) { float a = clamp(amount, 0.0, 1.0); return vec4(color * a, a); }

float field(vec2 p) {
  float t = uTime * 0.05;
  vec2 q = rotate(uAngle) * p * uScale * 1.5 + uSeed * 4.3;
  float fine = snoise(q * 2.3 + vec2(3.0, t * 0.9)) * 0.4 * uDetail;
  float shade = snoise(q * 0.42 + vec2(-t * 0.7, 11.0 + t * 0.4));
  if (uVariant > 1.5) {
    float d = length(p * uScale) * (1.0 + 0.12 * snoise(q * 0.5 + t));
    return sin(TAU * (d * 2.4 - t * 1.6) + fine * 2.0) * 0.8 * (1.0 - smoothstep(0.3, 1.1, d * 0.8)) + shade * 0.15;
  }
  if (uVariant > 0.5) {
    float bend = snoise(vec2(q.x * 0.45, t * 0.8)) * 0.4 + snoise(vec2(q.x * 0.9 + 7.0, q.y * 0.3 - t)) * 0.2;
    return sin(TAU * (q.y * 0.8 + bend - t * 1.2)) * (0.55 + 0.25 * shade) + shade * 0.3 + fine;
  }
  vec2 w = vec2(snoise(q * 0.55 + vec2(0.0, t)), snoise(q * 0.55 + vec2(5.2, -t * 0.8)));
  return snoise(q * 0.8 + w * 0.5 + vec2(t * 0.6, 0.0)) * 0.7 + shade * 0.2 + fine;
}

vec4 scene(vec2 frag) {
  float tall = max(floor(uSize * uPixelRatio + 0.5), 6.0);
  vec2 cell = vec2(max(floor(tall * 0.55 + 0.5), 3.0), tall);
  vec2 px = vec2(frag.x, uResolution.y - frag.y);
  vec2 id = floor(px / cell);
  vec2 f = px / cell - id;
  vec2 mid = vec2((id.x + 0.5) * cell.x, uResolution.y - (id.y + 0.5) * cell.y);

  float rawField = field((mid - 0.5 * uResolution) / min(uResolution.x, uResolution.y));
  float b = 0.42 + 0.46 * uContrast * rawField + (hash21(id + uSeed) - 0.5) * 0.06;
  vec2 box = uResolution / uPixelRatio;
  vec2 from = abs(mid / uPixelRatio - 0.5 * box) - min(vec2(0.38, 0.22) * box, vec2(360.0, 150.0));
  float away = length(max(from, 0.0)) + min(max(from.x, from.y), 0.0);
  float calm = uClearing * (1.0 - smoothstep(0.0, 0.25 * min(box.x, box.y) + 40.0, away));
  b -= 0.15 * calm;

  float reach = distance(mid, uPointer.xy) / uPixelRatio;
  float lit = uPointer.z * exp(-reach * reach / 9000.0) * 0.45;
  for (int i = 0; i < 4; i++) {
    vec4 pulse = uPulses[i];
    float ring = (distance(mid, pulse.xy) / uPixelRatio - pulse.z * 240.0) / 36.0;
    lit += exp(-ring * ring) * exp(-pulse.z * 2.0) * pulse.w * 0.6;
  }
  b = clamp(b + lit, 0.12, 0.9999);

  float level = b * uAtlasCount;
  float index = floor(level);
  vec2 at = vec2(mix(0.26, 0.74, f.x), mix(0.94, 0.06, f.y));
  vec2 dx = vec2(0.38 / (uAtlasCount * cell.x), 0.0);
  vec2 dy = vec2(0.0, 0.7 / cell.y);
  float glyph = mix(
    textureGrad(uAtlas, vec2((index + at.x) / uAtlasCount, at.y), dx, dy).a,
    textureGrad(uAtlas, vec2((min(index + 1.0, uAtlasCount - 1.0) + at.x) / uAtlasCount, at.y), dx, dy).a,
    smoothstep(0.75, 1.0, level - index));
  glyph = smoothstep(0.1, 0.6, glyph);

  vec3 lab = toOklab(ramp(uColors, uColorsCount, b));
  lab.x = mix(min(lab.x, 0.6), lab.x, uDark);
  lab.yz *= mix(1.2, 1.0, uDark);
  float shown = smoothstep(0.0, 0.2, uIntro * 1.2 - hash21(id + 7.0));
  float bottomFade = smoothstep(0.0, uResolution.y * 0.32, frag.y);
  float amount = glyph * mix(0.36, 0.92, b) * (1.0 - 0.25 * calm) * uIntensity * shown * bottomFade;
  return paint(fromOklab(lab), amount);
}

void main() {
  vec4 c = scene(gl_FragCoord.xy);
  float flick = fract(uTime * 7.31) * 61.7;
  float shown = step(0.002, max(c.a, luma(c.rgb)));
  c += (hash21(gl_FragCoord.xy + flick) - 0.5) * (1.5 / 255.0) * shown;
  float g = (hash21(floor(gl_FragCoord.xy / max(uPixelRatio * 0.75, 1.0)) + flick) - 0.5) * uGrain * 0.34;
  float cover = max(-g, 0.0);
  c.rgb = c.rgb * (1.0 - cover) + max(g, 0.0);
  c.a += cover * (1.0 - c.a);
  c = clamp(c, 0.0, 1.0);
  c.a = max(c.a, max(c.r, max(c.g, c.b)));
  outColor = c;
}
`;

function parseColorToRgb(colorStr: string): [number, number, number] {
  if (colorStr.startsWith('#')) {
    let hex = colorStr.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map((ch) => ch + ch).join('');
    }
    const num = parseInt(hex, 16);
    return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
  }
  const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    return [parseInt(rgbMatch[1], 10) / 255, parseInt(rgbMatch[2], 10) / 255, parseInt(rgbMatch[3], 10) / 255];
  }
  return [0.5, 0.5, 0.5];
}

const VARIANT_LOOKUP: Record<string, number> = {
  clouds: 0,
  waves: 1,
  rings: 2,
};

export const AsciiBackground: React.FC<AsciiBackgroundProps> = ({
  className = '',
  variant = 'waves',
  glyphs = DEFAULT_GLYPHS,
  colors = DEFAULT_COLORS,
  size = 14,
  scale = 1.0,
  speed = 0.75,
  angle = -22,
  clearing = 0.45,
  contrast = 1.2,
  detail = 0.5,
  intensity = 1.0,
  grain = 0.04,
  seed = 0,
  fade = 'bottom',
  interactive = true,
  font = "'Space Mono', 'JetBrains Mono', 'SFMono-Regular', Menlo, monospace",
  weight = 500,
  style,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: 'low-power',
      premultipliedAlpha: true,
      stencil: false,
    });

    if (!gl) {
      return;
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('AsciiBackground shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('AsciiBackground program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad buffer
    const quadVertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Atlas Texture creation
    const glyphChars = Array.from(glyphs || DEFAULT_GLYPHS);
    const cellSize = 64;
    const atlasCanvas = document.createElement('canvas');
    atlasCanvas.width = cellSize * glyphChars.length;
    atlasCanvas.height = cellSize;
    const atlasCtx = atlasCanvas.getContext('2d');
    if (atlasCtx) {
      atlasCtx.font = `${weight} ${cellSize * 0.8}px ${font}`;
      atlasCtx.textAlign = 'center';
      atlasCtx.textBaseline = 'middle';
      atlasCtx.fillStyle = '#ffffff';
      glyphChars.forEach((ch, idx) => {
        atlasCtx.fillText(ch, (idx + 0.5) * cellSize, cellSize * 0.54);
      });
    }

    const atlasTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, atlasTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlasCanvas);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Uniform locations lookup
    const uniforms: Record<string, WebGLUniformLocation | null> = {
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uTime: gl.getUniformLocation(program, 'uTime'),
      uPixelRatio: gl.getUniformLocation(program, 'uPixelRatio'),
      uPointer: gl.getUniformLocation(program, 'uPointer'),
      uPointerMove: gl.getUniformLocation(program, 'uPointerMove'),
      uPulses: gl.getUniformLocation(program, 'uPulses'),
      uIntro: gl.getUniformLocation(program, 'uIntro'),
      uSurface: gl.getUniformLocation(program, 'uSurface'),
      uDark: gl.getUniformLocation(program, 'uDark'),
      uGrain: gl.getUniformLocation(program, 'uGrain'),
      uAtlas: gl.getUniformLocation(program, 'uAtlas'),
      uAtlasCount: gl.getUniformLocation(program, 'uAtlasCount'),
      uColors: gl.getUniformLocation(program, 'uColors'),
      uColorsCount: gl.getUniformLocation(program, 'uColorsCount'),
      uAngle: gl.getUniformLocation(program, 'uAngle'),
      uClearing: gl.getUniformLocation(program, 'uClearing'),
      uContrast: gl.getUniformLocation(program, 'uContrast'),
      uDetail: gl.getUniformLocation(program, 'uDetail'),
      uIntensity: gl.getUniformLocation(program, 'uIntensity'),
      uScale: gl.getUniformLocation(program, 'uScale'),
      uSeed: gl.getUniformLocation(program, 'uSeed'),
      uSize: gl.getUniformLocation(program, 'uSize'),
      uVariant: gl.getUniformLocation(program, 'uVariant'),
    };

    // Prepare color ramp
    const colorArray = (colors.length > 0 ? colors : DEFAULT_COLORS).slice(0, 8);
    const parsedColors = new Float32Array(24);
    colorArray.forEach((c, idx) => {
      const rgb = parseColorToRgb(c);
      parsedColors[idx * 3] = rgb[0];
      parsedColors[idx * 3 + 1] = rgb[1];
      parsedColors[idx * 3 + 2] = rgb[2];
    });

    // Pointer & interaction state
    const pointer = {
      tx: -1,
      ty: -1,
      x: -1,
      y: -1,
      vx: 0,
      vy: 0,
      on: 0,
    };

    const pulses: Array<{ x: number; y: number; at: number }> = [
      { x: 0, y: 0, at: 0 },
      { x: 0, y: 0, at: 0 },
      { x: 0, y: 0, at: 0 },
      { x: 0, y: 0, at: 0 },
    ];
    let pulseIdx = 0;
    const pulseBuffer = new Float32Array(16);

    let isInView = true;
    let animFrameId = 0;
    let startTime = performance.now();
    let lastTime = startTime;
    let accumulatedTime = 0;
    const introDuration = 1200;

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive || !isInView || e.pointerType === 'touch') return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = rect.bottom - e.clientY;
      if (px >= 0 && px <= rect.width && py >= 0 && py <= rect.height) {
        pointer.tx = px;
        pointer.ty = py;
      } else {
        pointer.tx = -1;
        pointer.ty = -1;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!interactive || !isInView) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = rect.bottom - e.clientY;
      if (px >= 0 && px <= rect.width && py >= 0 && py <= rect.height) {
        pulses[pulseIdx] = { x: px, y: py, at: performance.now() };
        pulseIdx = (pulseIdx + 1) % pulses.length;
      }
    };

    const handlePointerLeave = () => {
      pointer.tx = -1;
      pointer.ty = -1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Render loop
    const render = (now: number) => {
      if (!isInView || document.hidden) {
        animFrameId = 0;
        return;
      }

      const deltaSec = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      accumulatedTime += deltaSec * speed;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(container.clientWidth * dpr));
      const height = Math.max(1, Math.round(container.clientHeight * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      // Ease pointer position
      const isOver = pointer.tx >= 0;
      const targetX = isOver ? pointer.tx : pointer.x < 0 ? container.clientWidth / 2 : pointer.x;
      const targetY = isOver ? pointer.ty : pointer.y < 0 ? container.clientHeight / 2 : pointer.y;

      if (pointer.x < 0) {
        pointer.x = targetX;
        pointer.y = targetY;
      }

      const easeAlpha = 1 - Math.exp(-deltaSec * 9);
      const dx = (targetX - pointer.x) * easeAlpha;
      const dy = (targetY - pointer.y) * easeAlpha;
      pointer.x += dx;
      pointer.y += dy;

      const invDelta = deltaSec > 0 ? 1 / deltaSec : 0;
      pointer.vx += (dx * invDelta - pointer.vx) * easeAlpha;
      pointer.vy += (dy * invDelta - pointer.vy) * easeAlpha;
      pointer.on += ((isOver ? 1 : 0) - pointer.on) * (1 - Math.exp(-deltaSec * 6));

      // Pack pulses
      const nowMs = performance.now();
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        const age = (nowMs - p.at) / 1000;
        const isAlive = age < 4.0 && p.at > 0 ? 1.0 : 0.0;
        pulseBuffer[i * 4] = p.x * dpr;
        pulseBuffer[i * 4 + 1] = p.y * dpr;
        pulseBuffer[i * 4 + 2] = age;
        pulseBuffer[i * 4 + 3] = isAlive;
      }

      const introProgress = Math.min((now - startTime) / introDuration, 1.0);

      // Set uniforms
      gl.useProgram(program);
      gl.uniform2f(uniforms.uResolution, width, height);
      gl.uniform1f(uniforms.uTime, accumulatedTime);
      gl.uniform1f(uniforms.uPixelRatio, dpr);
      gl.uniform3f(uniforms.uPointer, pointer.x * dpr, pointer.y * dpr, pointer.on);
      gl.uniform2f(uniforms.uPointerMove, pointer.vx * dpr, pointer.vy * dpr);
      gl.uniform4fv(uniforms.uPulses, pulseBuffer);
      gl.uniform1f(uniforms.uIntro, introProgress);
      gl.uniform3f(uniforms.uSurface, 0.027, 0.043, 0.078); // #070B14
      gl.uniform1f(uniforms.uDark, 1.0);
      gl.uniform1f(uniforms.uGrain, grain);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, atlasTexture);
      gl.uniform1i(uniforms.uAtlas, 1);
      gl.uniform1f(uniforms.uAtlasCount, glyphChars.length);

      gl.uniform3fv(uniforms.uColors, parsedColors);
      gl.uniform1i(uniforms.uColorsCount, colorArray.length);
      gl.uniform1f(uniforms.uAngle, (angle * Math.PI) / 180);
      gl.uniform1f(uniforms.uClearing, clearing);
      gl.uniform1f(uniforms.uContrast, contrast);
      gl.uniform1f(uniforms.uDetail, detail);
      gl.uniform1f(uniforms.uIntensity, intensity);
      gl.uniform1f(uniforms.uScale, scale);
      gl.uniform1f(uniforms.uSeed, seed);
      gl.uniform1f(uniforms.uSize, size);
      gl.uniform1f(uniforms.uVariant, VARIANT_LOOKUP[variant] ?? 1.0);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!animFrameId && isInView && !document.hidden) {
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = 0;
      }
    };

    startLoop();
    setIsReady(true);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isInView = entry.isIntersecting;
        if (isInView && !document.hidden) {
          startLoop();
        } else {
          stopLoop();
        }
      });
    });
    observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isInView) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointerleave', handlePointerLeave);

      gl.deleteBuffer(quadBuffer);
      gl.deleteTexture(atlasTexture);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteProgram(program);
    };
  }, [
    glyphs,
    colors,
    variant,
    size,
    scale,
    speed,
    angle,
    clearing,
    contrast,
    detail,
    intensity,
    grain,
    seed,
    interactive,
    font,
    weight,
  ]);

  const fadeClass = fade !== 'none' ? `fade-${fade}` : '';

  return (
    <div
      ref={containerRef}
      className={`ascii-background ${fadeClass} ${isReady ? 'is-ready' : ''} ${className}`.trim()}
      style={style}
    >
      <div className="ascii-background-layer" aria-hidden="true">
        <div className="ascii-background-fallback" />
        <canvas ref={canvasRef} className="ascii-background-canvas" />
      </div>
      {children}
    </div>
  );
};

export default AsciiBackground;
