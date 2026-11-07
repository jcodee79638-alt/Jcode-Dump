
var j7s,
  BS = (e) => Zt`${e}::text`,
  yI = (e, t) => Zt`${e}::text${Zt.raw("[]".repeat(t))}`,
  P7s = (e) => (t, r) => {
    if (!r) return e(t);
    let s = [];
    for (let u = 0; u < r; u++) s.push(Zt.identifier(`s${u}`));
    let a = t;
    for (let u of s) a = Zt`${a}[${u}]`;
    let H = Zt`array(\
select ${e(a)} \
from generate_subscripts(${t}, ${Zt.raw(r.toString())}) ${s[r - 1]} \
order by ${s[r - 1]})`;
    for (let u = r - 1; u > 0; u--)
      H = Zt`array(\
select ${H} \
from generate_subscripts(${t}, ${Zt.raw(u.toString())}) ${s[u - 1]} \
order by ${s[u - 1]})`;
    return Zt`case when ${t} is null then null else ${H} end`;
  },
  cL = (e) => {
    let t = (r, s) => {
      let a = s - 1;
      if (s > 1) for (let H = 0; H < r.length; ++H) t(r[H], a);
      else for (let H = 0; H < r.length; ++H) r[H] = e(r[H]);
      return r;
    };
    return t;
  },
  gmn = (e, t = !1) => {
    let r = (s, a) => {
      let H = a - 1,
        u = Array.from({ length: s.length });
      if (a > 1) for (let f = 0; f < s.length; ++f) u[f] = r(s[f], H);
      else for (let f = 0; f < s.length; ++f) u[f] = e(s[f]);
      return u;
    };
    return t ? (s, a) => vdt(r(s, a)) : r;
  },
  Emn = (e) => {
    let t = cL(e);
    return (r, s) => t(Tdt(r), s);
  },
  bdt = (e) => {
    let [t, r, s] = e.slice(1, -1).split(",");
    return [Number.parseFloat(t), Number.parseFloat(r), Number.parseFloat(s)];
  },
  jdt = (e) => {
    let [t, r, s] = e.slice(1, -1).split(",");
    return { a: Number.parseFloat(t), b: Number.parseFloat(r), c: Number.parseFloat(s) };
  },
  Pdt = (e) => {
    let [t, r] = e.slice(1, -1).split(",");
    return [Number.parseFloat(t), Number.parseFloat(r)];
  },
  Cdt = (e) => {
    let [t, r] = e.slice(1, -1).split(",");
    return { x: Number.parseFloat(t), y: Number.parseFloat(r) };
  },
  wdt = (e) => wtr(e).point,
  kdt = (e) => {
    let t = wtr(e);
    return { x: t.point[0], y: t.point[1] };
  },
  Odt = (e) => new Date(e),
  Imn = (e) => new Date(e + "+0000"),
  mse = (e) => {
    let t = e.slice(1, -1);
    if (t.length === 0) return [];
    return t.split(",").map(Number.parseFloat);
  },
  pSH;