
class Ds {
  constructor(t) {
    ((this.h1 = t ? t & 4294967295 : yi), (this.h2 = t ? t & 4294967295 : yi));
  }
  update(t) {
    let e, s;
    if (typeof t == "string") {
      ((e = new Uint8Array(t.length * 2)), (s = 0));
      for (let g = 0, m = t.length; g < m; g++) {
        const b = t.charCodeAt(g);
        b <= 255 ? (e[s++] = b) : ((e[s++] = b >>> 8), (e[s++] = b & 255));
      }
    } else if (ArrayBuffer.isView(t)) ((e = t.slice()), (s = e.byteLength));
    else throw new Error("Invalid data format, must be a string or TypedArray.");
    const i = s >> 2,
      n = s - i * 4,
      r = new Uint32Array(e.buffer, 0, i);
    let a = 0,
      o = 0,
      l = this.h1,
      h = this.h2;
    const d = 3432918353,
      u = 461845907,
      f = d & It,
      p = u & It;
    for (let g = 0; g < i; g++)
      g & 1
        ? ((a = r[g]),
          (a = ((a * d) & vt) | ((a * f) & It)),
          (a = (a << 15) | (a >>> 17)),
          (a = ((a * u) & vt) | ((a * p) & It)),
          (l ^= a),
          (l = (l << 13) | (l >>> 19)),
          (l = l * 5 + 3864292196))
        : ((o = r[g]),
          (o = ((o * d) & vt) | ((o * f) & It)),
          (o = (o << 15) | (o >>> 17)),
          (o = ((o * u) & vt) | ((o * p) & It)),
          (h ^= o),
          (h = (h << 13) | (h >>> 19)),
          (h = h * 5 + 3864292196));
    switch (((a = 0), n)) {
      case 3:
        a ^= e[i * 4 + 2] << 16;
      case 2:
        a ^= e[i * 4 + 1] << 8;
      case 1:
        ((a ^= e[i * 4]),
          (a = ((a * d) & vt) | ((a * f) & It)),
          (a = (a << 15) | (a >>> 17)),
          (a = ((a * u) & vt) | ((a * p) & It)),
          i & 1 ? (l ^= a) : (h ^= a));
    }
    ((this.h1 = l), (this.h2 = h));
  }
  hexdigest() {
    let t = this.h1,
      e = this.h2;
    return (
      (t ^= e >>> 1),
      (t = ((t * 3981806797) & vt) | ((t * 36045) & It)),
      (e = ((e * 4283543511) & vt) | (((((e << 16) | (t >>> 16)) * 2950163797) & vt) >>> 16)),
      (t ^= e >>> 1),
      (t = ((t * 444984403) & vt) | ((t * 60499) & It)),
      (e = ((e * 3301882366) & vt) | (((((e << 16) | (t >>> 16)) * 3120437893) & vt) >>> 16)),
      (t ^= e >>> 1),
      (t >>> 0).toString(16).padStart(8, "0") + (e >>> 0).toString(16).padStart(8, "0")
    );
  }
}