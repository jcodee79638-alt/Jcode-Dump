
var eGe = 2000,
  rxt = 51200,
  cbe = 20971520,
  Yqe = 2000,
  a_a,
  rhe,
  nxt,
  oyi,
  ayi,
  _$r,
  Hyi,
  h$r,
  L$r,
  tGe,
  cyi,
  Abe = (e, t) => t.every((r, s) => e[s] === r),
  H_a = (e) => {
    if (Abe(e, [137, 80, 78, 71, 13, 10, 26, 10])) return "image/png";
    if (Abe(e, [255, 216, 255])) return "image/jpeg";
    if (Abe(e, [71, 73, 70, 56])) return "image/gif";
    if (Abe(e, [82, 73, 70, 70]) && Abe(e.subarray(8), [87, 69, 66, 80])) return "image/webp";
  },
  syi = (e, t) => {
    if (cyi.has(ube.extname(e).toLowerCase())) return !0;
    if (t.length === 0) return !1;
    let r = 0;
    for (let s of t) {
      if (s === 0) return !0;
      if (s < 9 || (s > 13 && s < 32)) r++;
    }
    return r / t.length > 0.3;
  },
  Zqe = (e, t, r) =>
    ZA({
      try: () => t.decode(r, { stream: r !== void 0 }),
      catch: (s) => {
        if (s instanceof TypeError) return new oyi({ resource: e });
        throw s;
      },
    }),
  c_a = (e, t, r) => (r.includes(0) ? bn(new rhe({ resource: e })) : Zqe(e, t, r)),
  A_a,
  u_a,
  l_a,
  f_a,
  Ayi;