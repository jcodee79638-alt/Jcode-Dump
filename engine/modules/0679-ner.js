
var ner = "~effect/http/HttpServerError",
  Nv,
  d2,
  ier,
  LRs = (e) => Ma(e, ner),
  mpt,
  ser,
  ede,
  Oun = (e, t, r) => {
    let s = `${e} (${r})`;
    return t ? `${s}: ${t}` : s;
  },
  bRe = (e) => {
    let t,
      r = $Rs,
      s = [],
      a = [],
      H = !1;
    for (let u = 0; u < e.reasons.length; u++) {
      let f = e.reasons[u];
      switch (f._tag) {
        case "Fail": {
          ((r = wun(f.error, dpt)), s.push(f));
          break;
        }
        case "Die": {
          if (F6(f.defect)) t = f.defect;
          else ((r = kun(f.defect, dpt)), s.push(f));
          break;
        }
        case "Interrupt": {
          if (((H = f.annotations.has(ede.key)), s.length > 0)) break;
          a.push(f);
          break;
        }
      }
    }
    if (t) return Jt([t, lie(s)]);
    else if (a.length > 0 && s.length === 0) (s.push(...a), (r = H ? gRs : ERs));
    return bW(r, (u) => (s.push(jye(u)), [u, lie(s)]));
  },
  oer = (e) => {
    let t,
      r = e.reasons.filter((s) => {
        if (s._tag === "Die" && F6(s.defect)) return ((t = s.defect), !1);
        return !0;
      });
    return [t ?? dpt, r.length > 0 ? Lo(lie(r)) : eH()];
  },
  dpt,
  $Rs,
  gRs,
  ERs,
  Uun = (e) => {
    if (e._tag === "Success") return e.value;
    return oer(e.cause)[0];
  };