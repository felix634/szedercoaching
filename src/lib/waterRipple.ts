/**
 * WebGL2 water surface: a height-field wave simulation (ping-pong framebuffers)
 * that refracts a background image, plus a gentle ambient shimmer below a
 * configurable waterline so the lake in the photo moves on its own.
 *
 * Framework-free; the React wrapper lives in components/WaterRipple.tsx.
 */

export interface WaterRenderer {
  resize(cssWidth: number, cssHeight: number, dpr: number): void;
  /** x/y in 0..1 from the top-left, radius in CSS px, strength ~0.01–0.2. */
  drop(x: number, y: number, radius: number, strength: number): void;
  /** Advances the simulation by `dt` seconds and draws a frame. */
  frame(dt: number, time: number): void;
  destroy(): void;
}

interface Options {
  /** Waterline as a fraction of the image height from the top (0..1). */
  waterline: number;
}

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const DROP = `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uStrength;
uniform float uAspect;
in vec2 vUv;
out vec4 outColor;
const float PI = 3.141592653589793;
void main() {
  vec4 info = texture(uState, vUv);
  vec2 d = (vUv - uCenter) * vec2(uAspect, 1.0);
  float drop = max(0.0, 1.0 - length(d) / uRadius);
  drop = 0.5 - cos(drop * PI) * 0.5;
  info.r += drop * uStrength;
  outColor = info;
}`;

const UPDATE = `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform vec2 uDelta;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec4 info = texture(uState, vUv);
  vec2 dx = vec2(uDelta.x, 0.0);
  vec2 dy = vec2(0.0, uDelta.y);
  float average = (
    texture(uState, vUv - dx).r +
    texture(uState, vUv - dy).r +
    texture(uState, vUv + dx).r +
    texture(uState, vUv + dy).r
  ) * 0.25;
  info.g += (average - info.r) * 2.0;
  info.g *= 0.992;
  info.r += info.g;
  info.r *= 0.999;
  outColor = info;
}`;

const RENDER = `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform sampler2D uImage;
uniform vec2 uDelta;
uniform vec2 uCover;
uniform float uTime;
uniform float uWaterline;
in vec2 vUv;
out vec4 outColor;

void main() {
  // Ripple normal from the height field.
  float h = texture(uState, vUv).r;
  float hx = texture(uState, vUv + vec2(uDelta.x, 0.0)).r;
  float hy = texture(uState, vUv + vec2(0.0, uDelta.y)).r;
  vec3 dx = vec3(uDelta.x, hx - h, 0.0);
  vec3 dy = vec3(0.0, hy - h, uDelta.y);
  vec2 offset = -normalize(cross(dy, dx)).xz;

  // object-fit: cover, centered.
  vec2 uv = (vUv - 0.5) * uCover + 0.5;

  // Ambient shimmer on the lake: perspective-compressed bands near the
  // horizon, larger and slower swells towards the viewer.
  float fromTop = 1.0 - uv.y;
  float depth = clamp((fromTop - uWaterline) / max(1.0 - uWaterline, 0.001), 0.0, 1.0);
  float lake = smoothstep(0.0, 0.06, depth);
  float p = 1.0 / (depth + 0.18);
  float w1 = sin(p * 7.0 - uTime * 1.25 + sin(uv.x * 9.0 + uTime * 0.35) * 1.8);
  float w2 = sin(p * 11.0 + uv.x * 26.0 - uTime * 0.9);
  vec2 ambient = vec2(w2 * 0.0012, w1 * 0.0022) * lake * (0.25 + depth);

  vec2 sampleUv = uv + ambient + offset * 0.035 * uCover;
  vec3 color = texture(uImage, sampleUv).rgb;

  // Sun glints: on ripples everywhere, and faint sparkles on the lake.
  float spec = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);
  float sparkle = pow(max(0.0, w1 * w2), 18.0) * lake * 0.12;
  color += (spec * 0.9 + sparkle) * vec3(0.85, 0.95, 1.0);

  outColor = vec4(color, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("createShader failed");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${log}`);
  }
  return shader;
}

function program(gl: WebGL2RenderingContext, vs: WebGLShader, fsSrc: string) {
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc);
  const prog = gl.createProgram();
  if (!prog) throw new Error("createProgram failed");
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.bindAttribLocation(prog, 0, "aPos");
  gl.linkProgram(prog);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error(`Program link error: ${gl.getProgramInfoLog(prog)}`);
  }
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(prog, i);
    if (info) uniforms[info.name] = gl.getUniformLocation(prog, info.name);
  }
  return { prog, uniforms };
}

interface Target {
  tex: WebGLTexture;
  fbo: WebGLFramebuffer;
}

/** Returns null when WebGL2 or float render targets are unavailable. */
export function createWaterRenderer(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  { waterline }: Options
): WaterRenderer | null {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: "high-performance",
  });
  if (!gl) return null;
  if (!gl.getExtension("EXT_color_buffer_float") && !gl.getExtension("EXT_color_buffer_half_float")) {
    return null;
  }

  let vs: WebGLShader;
  let drop: ReturnType<typeof program>;
  let update: ReturnType<typeof program>;
  let render: ReturnType<typeof program>;
  try {
    vs = compile(gl, gl.VERTEX_SHADER, VERT);
    drop = program(gl, vs, DROP);
    update = program(gl, vs, UPDATE);
    render = program(gl, vs, RENDER);
  } catch (err) {
    console.warn(err);
    return null;
  }

  // One oversized triangle covers the viewport.
  const vao = gl.createVertexArray();
  const vbo = gl.createBuffer();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  // Background image texture (mipmapped: the source is usually larger than the canvas).
  const imageTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, imageTex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const imageAspect = image.naturalWidth / image.naturalHeight;

  let targets: [Target, Target] | null = null;
  let simW = 1;
  let simH = 1;
  let cssW = 1;
  let cssH = 1;
  let accumulator = 0;
  const pendingDrops: Array<[number, number, number, number]> = [];

  function makeTarget(w: number, h: number): Target {
    const tex = gl!.createTexture()!;
    gl!.bindTexture(gl!.TEXTURE_2D, tex);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA16F, w, h, 0, gl!.RGBA, gl!.HALF_FLOAT, null);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
    const fbo = gl!.createFramebuffer()!;
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
    gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0);
    gl!.clearColor(0, 0, 0, 0);
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    return { tex, fbo };
  }

  function freeTargets() {
    if (!targets) return;
    for (const t of targets) {
      gl!.deleteTexture(t.tex);
      gl!.deleteFramebuffer(t.fbo);
    }
    targets = null;
  }

  function pass(p: ReturnType<typeof program>, setUniforms: () => void) {
    if (!targets) return;
    const [src, dst] = targets;
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, dst.fbo);
    gl!.viewport(0, 0, simW, simH);
    gl!.useProgram(p.prog);
    gl!.activeTexture(gl!.TEXTURE0);
    gl!.bindTexture(gl!.TEXTURE_2D, src.tex);
    gl!.uniform1i(p.uniforms.uState, 0);
    setUniforms();
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    targets = [dst, src];
  }

  return {
    resize(width, height, dpr) {
      cssW = Math.max(1, width);
      cssH = Math.max(1, height);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);

      // ~1 sim cell per 3 CSS px keeps ripples crisp but cheap.
      const w = Math.max(64, Math.round(cssW / 3));
      const h = Math.max(64, Math.round(cssH / 3));
      if (w === simW && h === simH && targets) return;
      freeTargets();
      simW = w;
      simH = h;
      targets = [makeTarget(w, h), makeTarget(w, h)];
      if (gl!.checkFramebufferStatus(gl!.FRAMEBUFFER) !== gl!.FRAMEBUFFER_COMPLETE) {
        freeTargets();
      }
    },

    drop(x, y, radius, strength) {
      pendingDrops.push([x, 1 - y, radius / cssH, strength]);
    },

    frame(dt, time) {
      if (!targets) return;

      for (const [x, y, r, s] of pendingDrops) {
        pass(drop, () => {
          gl!.uniform2f(drop.uniforms.uCenter, x, y);
          gl!.uniform1f(drop.uniforms.uRadius, r);
          gl!.uniform1f(drop.uniforms.uStrength, s);
          gl!.uniform1f(drop.uniforms.uAspect, cssW / cssH);
        });
      }
      pendingDrops.length = 0;

      // Fixed 120 Hz simulation steps, independent of the display refresh rate.
      accumulator = Math.min(accumulator + dt, 0.1);
      const step = 1 / 120;
      while (accumulator >= step) {
        pass(update, () => gl!.uniform2f(update.uniforms.uDelta, 1 / simW, 1 / simH));
        accumulator -= step;
      }

      const canvasAspect = cssW / cssH;
      const cover: [number, number] =
        canvasAspect > imageAspect ? [1, imageAspect / canvasAspect] : [canvasAspect / imageAspect, 1];

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.useProgram(render.prog);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, targets[0].tex);
      gl!.uniform1i(render.uniforms.uState, 0);
      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, imageTex);
      gl!.uniform1i(render.uniforms.uImage, 1);
      gl!.uniform2f(render.uniforms.uDelta, 1 / simW, 1 / simH);
      gl!.uniform2f(render.uniforms.uCover, cover[0], cover[1]);
      gl!.uniform1f(render.uniforms.uTime, time);
      gl!.uniform1f(render.uniforms.uWaterline, waterline);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    },

    destroy() {
      freeTargets();
      gl.deleteTexture(imageTex);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
      for (const p of [drop, update, render]) gl.deleteProgram(p.prog);
      gl.deleteShader(vs);
    },
  };
}
