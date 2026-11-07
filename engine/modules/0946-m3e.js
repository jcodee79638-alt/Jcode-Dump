
var m3e = "~effect/sql/Fragment",
  pse = (e) => ({ [m3e]: m3e, segments: e }),
  FVs,
  Vdn = (e) => Ma(e, m3e),
  WU = (e, t) => ({ _tag: "Literal", value: e, params: t }),
  qdn = (e) => ({ _tag: "Identifier", value: e }),
  BVs = (e) => ({ _tag: "Parameter", value: e }),
  Odn = (e) => ({ _tag: "ArrayHelper", value: e }),
  ytr,
  RVs = (e) => Object.assign(Object.create(ytr), { value: e, returningIdentifier: void 0 }),
  WVs,
  VVs = (e, t) => Object.assign(Object.create(WVs), { value: e, alias: t, returningIdentifier: void 0 }),
  qVs,
  GVs = (e, t) => Object.assign(Object.create(qVs), { value: e, omit: t, returningIdentifier: void 0 }),
  $dt = (e, t, r, s) => {
    let a = s === void 0 ? Udn.noTransforms : Udn.transforms;
    if (a.has(e)) return a.get(e);
    let H = Object.assign(
      function (f, ...d) {
        if (typeof f === "string") return qdn(f);
        else if (Array.isArray(f) && "raw" in f) return XVs(e, t, f, d, r, s);
        throw "absurd";
      },
      {
        unsafe(u, f) {
          return Kdn([WU(u, f)], e, t, r, s);
        },
        literal(u) {
          return pse([WU(u)]);
        },
        in: s7s,
        insert(u) {
          return RVs(Array.isArray(u) ? u : [u]);
        },
        update(u, f) {
          return GVs(u, f ?? []);
        },
        updateValues(u, f) {
          return VVs(u, f);
        },
        and: JVs,
        or: KVs,
        csv: zVs,
        join: gdt,
        onDialect(u) {
          return u[t.dialect]();
        },
        onDialectOrElse(u) {
          return u[t.dialect] !== void 0 ? u[t.dialect]() : u.orElse();
        },
      },
    );
    return (a.set(e, H), H);
  },
  Udn,
  XVs = (e, t, r, s, a, H) => {
    let u = r[0].length > 0 ? [WU(r[0])] : [];
    for (let f = 0; f < s.length; f++) {
      let d = s[f];
      if (Vdn(d)) u.push(...d.segments);
      else if (n7s(d)) u.push(d);
      else u.push(BVs(d));
      if (r[f + 1].length > 0) u.push(WU(r[f + 1]));
    }
    return Kdn(u, e, t, a, H);
  },
  JVs,
  KVs,
  zVs = function (...e) {
    if (e[e.length - 1].length === 0) return QVs;
    if (e.length === 1) return Ndn(e[0]);
    return pse([WU(`${e[0]} `), ...Ndn(e[1]).segments]);
  },
  Ndn,
  QVs,
  YVs = (e) => {
    let t = Object.create(Gdn);
    return ((t.options = e), (t.dialect = e.dialect), (t.disableTransforms = !1), t);
  },
  ZVs,
  e7s,
  Gdn,
  Xdn = (e) =>
    YVs({
      dialect: "sqlite",
      placeholder(t) {
        return "?";
      },
      onIdentifier: e
        ? function (t, r) {
            return r ? Dtr(t) : Dtr(e(t));
          }
        : Dtr,
      onRecordUpdate() {
        return ["", []];
      },
      onCustom() {
        return ["", []];
      },
    }),
  Jdn = (e, t = !0) => {
    let r = (f) => {
        if (Array.isArray(f)) {
          if (f.length === 0 || f[0].constructor !== Object) return f;
          return u(f);
        } else if (f?.constructor === Object) return s(f);
        return f;
      },
      s = (f) => {
        let d = {};
        for (let _ in f) d[e(_)] = r(f[_]);
        return d;
      },
      a = (f) => {
        let d = Array(f.length);
        for (let _ = 0, L = f.length; _ < L; _++) {
          let I = f[_];
          if (Array.isArray(I)) d[_] = a(I);
          else {
            let D = {};
            for (let S in I) D[e(S)] = r(I[S]);
            d[_] = D;
          }
        }
        return d;
      },
      H = (f) => {
        let d = Array(f.length);
        for (let _ = 0, L = f.length; _ < L; _++) {
          let I = f[_];
          if (Array.isArray(I)) d[_] = H(I);
          else {
            let D = {};
            for (let S in I) D[e(S)] = I[S];
            d[_] = D;
          }
        }
        return d;
      },
      u = t ? a : H;
    return { value: r, object: s, array: u };
  },
  Fdn = "db.operation.name",
  Bdn = "db.query.text",
  Kdn = (e, t, r, s, a) => {
    let H = Object.create(r7s);
    return (
      (H.segments = e),
      (H.acquirer = t),
      (H.compiler = r),
      (H.spanAttributes = s),
      (H.transformRows = a),
      H
    );
  },
  r7s,
  Rdn = (e, t, r) =>
    hl((s) => {
      let a = s.getRef(FVs);
      if (a === void 0) return r(e);
      return Hi(a(e, $dt(e.acquirer, e.compiler, e.spanAttributes, e.transformRows), s, t), r);
    }),
  n7s = (e) => {
    if (!Ma(e, "_tag")) return !1;
    switch (e._tag) {
      case "Literal":
      case "Parameter":
      case "ArrayHelper":
      case "RecordInsertHelper":
      case "RecordUpdateHelper":
      case "RecordUpdateHelperSingle":
      case "Identifier":
      case "Custom":
        return !0;
      default:
        return !1;
    }
  },
  i7s = (e) => (t) => {
    if (t.length === 0) return "";
    let r = e(t[0]);
    for (let s = 1; s < t.length; s++) r += `,${e(t[s])}`;
    return r;
  },
  Wdn = (e, t, r) => {
    if (e.length === 0) return "()";
    let s = `(${t(e[0], r)}`;
    for (let a = 1; a < e.length; a++) s += `,${t(e[a], r)}`;
    return s + ")";
  },
  d3e = (e, t, r, s) => {
    if (e === void 0) return null;
    else if (Vdn(e)) {
      let a = e.segments[0];
      if (a._tag === "Custom") return t(a, r, s)[1][0] ?? null;
      else if (a._tag === "Parameter") return a.value;
      return null;
    }
    return e;
  },
  Dtr,
  o7s;