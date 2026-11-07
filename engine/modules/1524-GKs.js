
function GKs(e) {
  let t, r, s, a, H, u, f, d;
  return (_(), { feed: L, reset: _ });
  function _() {
    ((t = !0), (r = ""), (s = 0), (a = -1), (H = void 0), (f = void 0), (d = ""));
  }
  function L(D) {
    if (((r = r ? r + D : D), t && XKs(r))) r = r.slice(_In.length);
    t = !1;
    let S = r.length,
      T = 0,
      C = !1;
    while (T < S) {
      if (C) {
        if (
          r[T] ===
          `
`
        )
          ++T;
        C = !1;
      }
      let O = -1,
        B = a,
        V;
      for (let q = s; O < 0 && q < S; ++q)
        if (((V = r[q]), V === ":" && B < 0)) B = q - T;
        else if (V === "\r") ((C = !0), (O = q - T));
        else if (
          V ===
          `
`
        )
          O = q - T;
      if (O < 0) {
        ((s = S - T), (a = B));
        break;
      } else ((s = 0), (a = -1));
      (I(r, T, B, O), (T += O + 1));
    }
    if (T === S) r = "";
    else if (T > 0) r = r.slice(T);
  }
  function I(D, S, T, C) {
    if (C === 0) {
      if (d.length > 0)
        (e({ _tag: "Event", id: H, event: f ?? "message", data: d.slice(0, -1) }), (d = ""), (H = void 0));
      f = void 0;
      return;
    }
    let O = T < 0,
      B = D.slice(S, S + (O ? C : T)),
      V = 0;
    if (O) V = C;
    else if (D[S + T + 1] === " ") V = T + 2;
    else V = T + 1;
    let q = S + V,
      Z = C - V,
      se = D.slice(q, q + Z).toString();
    if (B === "data")
      d += se
        ? `${se}
`
        : `
`;
    else if (B === "event") f = se;
    else if (B === "id" && !se.includes("\x00")) ((H = se), (u = se));
    else if (B === "retry") {
      let ae = parseInt(se, 10);
      if (!Number.isNaN(ae)) e(new M_t({ duration: UC(ae), lastEventId: u }));
    }
  }
}