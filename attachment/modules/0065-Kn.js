
function Kn(c, t) {
  const e = c[0] + c[1] * 256 + c[2] * 65536 + t[0] * 16777216 + t[1] * 4294967296 + t[2] * 1099511627776;
  let s = gi.get(e);
  if (s) return s;
  const i = new Float32Array(9),
    n = i.subarray(0, 3),
    r = i.subarray(3, 6);
  fi(c, r);
  const a = i.subarray(6, 9);
  fi(t, a);
  const o = a[2] < 0.5,
    l = o ? 12 : 4.5;
  if (((r[2] = o ? Math.sqrt(r[2]) : 1 - Math.sqrt(1 - r[2])), pi(r, a, n) < l)) {
    let h, d;
    o ? ((h = r[2]), (d = 1)) : ((h = 0), (d = r[2]));
    const u = 0.005;
    for (; d - h > u;) {
      const f = (r[2] = (h + d) / 2);
      o === pi(r, a, n) < l ? (h = f) : (d = f);
    }
    r[2] = o ? d : h;
  }
  return (
    Ms(r, n),
    (s = T.makeHexColor(Math.round(n[0] * 255), Math.round(n[1] * 255), Math.round(n[2] * 255))),
    gi.set(e, s),
    s
  );
}