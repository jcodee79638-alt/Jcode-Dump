
class Pr {
  #t = null;
  #e = null;
  #s = null;
  #i = null;
  async #n() {
    if (!globalThis.navigator?.gpu) return !1;
    try {
      const t = await navigator.gpu.requestAdapter();
      return t
        ? ((this.#i = navigator.gpu.getPreferredCanvasFormat()), (this.#e = await t.requestDevice()), !0)
        : !1;
    } catch {
      return !1;
    }
  }
  init() {
    return (this.#t ||= this.#n());
  }
  get isReady() {
    return this.#e !== null;
  }
  loadMeshShader() {
    if (!this.#e || this.#s) return;
    const t = this.#e.createShaderModule({ code: kr });
    this.#s = this.#e.createRenderPipeline({
      layout: "auto",
      vertex: {
        module: t,
        entryPoint: "vs_main",
        buffers: [
          { arrayStride: 8, attributes: [{ shaderLocation: 0, offset: 0, format: "float32x2" }] },
          { arrayStride: 4, attributes: [{ shaderLocation: 1, offset: 0, format: "unorm8x4" }] },
        ],
      },
      fragment: { module: t, entryPoint: "fs_main", targets: [{ format: this.#i }] },
      primitive: { topology: "triangle-list" },
    });
  }
  draw(t, e, s, i, n, r, a, o) {
    this.loadMeshShader();
    const l = this.#e,
      { offsetX: h, offsetY: d, scaleX: u, scaleY: f } = i,
      p = l.createBuffer({
        size: Math.max(t.byteLength, 4),
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      });
    t.byteLength > 0 && l.queue.writeBuffer(p, 0, t);
    const g = l.createBuffer({
      size: Math.max(e.byteLength, 4),
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    e.byteLength > 0 && l.queue.writeBuffer(g, 0, e);
    const m = l.createBuffer({ size: 32, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    l.queue.writeBuffer(m, 0, new Float32Array([h, d, u, f, r, a, o, 0]));
    const b = l.createBindGroup({
        layout: this.#s.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: m } }],
      }),
      y = new OffscreenCanvas(r, a),
      A = y.getContext("webgpu");
    A.configure({ device: l, format: this.#i, alphaMode: n ? "opaque" : "premultiplied" });
    const w = n ? { r: n[0] / 255, g: n[1] / 255, b: n[2] / 255, a: 1 } : { r: 0, g: 0, b: 0, a: 0 },
      v = l.createCommandEncoder(),
      S = v.beginRenderPass({
        colorAttachments: [
          { view: A.getCurrentTexture().createView(), clearValue: w, loadOp: "clear", storeOp: "store" },
        ],
      });
    return (
      s > 0 &&
        (S.setPipeline(this.#s),
        S.setBindGroup(0, b),
        S.setVertexBuffer(0, p),
        S.setVertexBuffer(1, g),
        S.draw(s)),
      S.end(),
      l.queue.submit([v.finish()]),
      p.destroy(),
      g.destroy(),
      m.destroy(),
      y.transferToImageBitmap()
    );
  }
}