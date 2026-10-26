import { useEffect, useRef } from 'react';

/**
 * Orb — animated WebGL glowing orb background (dependency-free).
 * Props: backgroundColor, colors (3 hex colors), hoverIntensity.
 */
const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const vert = `
attribute vec2 position;
varying vec2 vUv;
void main(){ vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }`;

const frag = `
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform vec3 uBg, uC1, uC2, uC3;
uniform float uHover, uHoverIntensity;
varying vec2 vUv;

vec3 hash33(vec3 p){
  p = fract(p * vec3(0.1031, 0.11369, 0.13787));
  p += dot(p, p.yxz + 19.19);
  return -1.0 + 2.0 * fract(vec3(p.x + p.y, p.x + p.z, p.y + p.z) * p.zyx);
}
float snoise3(vec3 p){
  const float K1 = 0.333333333, K2 = 0.166666667;
  vec3 i = floor(p + (p.x + p.y + p.z) * K1);
  vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
  vec3 e = step(vec3(0.0), d0 - d0.yzx);
  vec3 i1 = e * (1.0 - e.zxy), i2 = 1.0 - e.zxy * (1.0 - e);
  vec3 d1 = d0 - (i1 - K2), d2 = d0 - (i2 - K1), d3 = d0 - 0.5;
  vec4 h = max(0.6 - vec4(dot(d0,d0), dot(d1,d1), dot(d2,d2), dot(d3,d3)), 0.0);
  vec4 n = h*h*h*h * vec4(dot(d0,hash33(i)), dot(d1,hash33(i+i1)), dot(d2,hash33(i+i2)), dot(d3,hash33(i+1.0)));
  return dot(vec4(31.316), n);
}

void main(){
  vec2 uv = (vUv * iResolution - 0.5 * iResolution) / min(iResolution.x, iResolution.y) * 2.0;
  uv += uHover * uHoverIntensity * 0.08 * vec2(sin(uv.y * 10.0 + iTime), sin(uv.x * 10.0 + iTime));
  float len = length(uv);
  float ang = atan(uv.y, uv.x);
  float n = snoise3(vec3(uv * 0.65, iTime * 0.5)) * 0.5 + 0.5;
  float r0 = mix(0.6, 0.9, n);
  float ring = smoothstep(r0 + 0.35, r0, len) * smoothstep(r0 - 0.45, r0, len);
  float glow = 0.08 / (abs(len - r0) + 0.08);
  float t = 0.5 + 0.5 * sin(ang * 2.0 + iTime * 0.6);
  vec3 col = mix(mix(uC1, uC2, t), uC3, smoothstep(r0 - 0.3, r0 + 0.2, len));
  float a = clamp(ring * 0.55 + glow * 0.25, 0.0, 1.0) * smoothstep(1.6, 0.9, len);
  gl_FragColor = vec4(mix(uBg, col, a), 1.0);
}`;

export default function Orb({
  backgroundColor = '#ffffff',
  colors = ['#9c43fe', '#4cc2e9', '#101499'],
  hoverIntensity = 0.3,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;display:block';
    container.appendChild(canvas);
    const gl = canvas.getContext('webgl', { antialias: true });
    if (!gl) return () => container.removeChild(canvas);

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const u = (name) => gl.getUniformLocation(prog, name);
    gl.uniform3fv(u('uBg'), hexToRgb(backgroundColor));
    gl.uniform3fv(u('uC1'), hexToRgb(colors[0]));
    gl.uniform3fv(u('uC2'), hexToRgb(colors[1] ?? colors[0]));
    gl.uniform3fv(u('uC3'), hexToRgb(colors[2] ?? colors[0]));
    gl.uniform1f(u('uHoverIntensity'), hoverIntensity);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u('iResolution'), canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let hover = 0, target = 0;
    const onMove = (e) => {
      const r = container.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (Math.min(r.width, r.height) / 2);
      const y = (e.clientY - r.top - r.height / 2) / (Math.min(r.width, r.height) / 2);
      target = Math.hypot(x, y) < 1 ? 1 : 0;
    };
    const onLeave = () => (target = 0);
    window.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    let raf;
    const loop = (t) => {
      hover += (target - hover) * 0.05;
      gl.uniform1f(u('iTime'), t * 0.001);
      gl.uniform1f(u('uHover'), hover);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      container.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [backgroundColor, colors.join(), hoverIntensity]);

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
}
