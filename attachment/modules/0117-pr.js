
class pr {
  constructor(t) {
    ((this.buffer = t), (this.view = new DataView(t)), (this.data = new Uint8Array(t)));
  }
  getIR() {
    const t = this.view,
      e = this.data[Vt.KIND],
      s = !!this.data[Vt.HAS_BBOX],
      i = !!this.data[Vt.HAS_BACKGROUND],
      n = t.getUint32(Vt.N_COORD, !0),
      r = t.getUint32(Vt.N_COLOR, !0),
      a = t.getUint32(Vt.N_STOP, !0);
    let o = 20;
    const l = new Float32Array(this.buffer, o, n * 2);
    o += n * 8;
    const h = new Uint8Array(this.buffer, o, r * 4);
    o += r * 4;
    const d = [];
    for (let p = 0; p < a; ++p) {
      const g = t.getFloat32(o, !0);
      o += 4;
      const m = t.getUint32(o, !0);
      ((o += 4), d.push([g, `#${m.toString(16).padStart(6, "0")}`]));
    }
    let u = null;
    if (s) {
      u = [];
      for (let p = 0; p < 4; ++p) (u.push(t.getFloat32(o, !0)), (o += 4));
    }
    let f = null;
    if ((i && ((f = new Uint8Array(this.buffer, o, 3)), (o += 3)), e === 1))
      return ["RadialAxial", "axial", u, d, [l[0], l[1]], [l[2], l[3]], null, null];
    if (e === 2) return ["RadialAxial", "radial", u, d, [l[0], l[1]], [l[3], l[4]], l[2], l[5]];
    if (e === 3) {
      const p = this.data[Vt.SHADING_TYPE];
      let g = null;
      if (l.length > 0) {
        g = Lt.slice();
        for (let m = 0, b = l.length; m < b; m += 2) T.pointBoundingBox(l[m], l[m + 1], g);
      }
      return ["Mesh", p, l, h, n, g, u, f];
    }
    throw new Error(`Unsupported pattern kind: ${e}`);
  }
}