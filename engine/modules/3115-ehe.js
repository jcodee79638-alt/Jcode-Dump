
function ehe(e, t, r, s, a, H, u) {
  let f;
  if (!u) f = {};
  else if (typeof u === "function") f = { callback: u };
  else f = u;
  if (typeof f.context > "u") f.context = 4;
  let d = f.context;
  if (f.newlineIsToken)
    throw Error(
      "newlineIsToken may not be used with patch-generation functions, only with diffing functions",
    );
  if (!f.callback) return _(SN(r, s, f));
  else {
    let { callback: L } = f;
    SN(
      r,
      s,
      Object.assign(Object.assign({}, f), {
        callback: (I) => {
          let D = _(I);
          L(D);
        },
      }),
    );
  }
  function _(L) {
    if (!L) return;
    L.push({ value: "", lines: [] });
    function I(V) {
      return V.map(function (q) {
        return " " + q;
      });
    }
    let D = [],
      S = 0,
      T = 0,
      C = [],
      O = 1,
      B = 1;
    for (let V = 0; V < L.length; V++) {
      let q = L[V],
        Z = q.lines || fma(q.value);
      if (((q.lines = Z), q.added || q.removed)) {
        if (!S) {
          let se = L[V - 1];
          if (((S = O), (T = B), se))
            ((C = d > 0 ? I(se.lines.slice(-d)) : []), (S -= C.length), (T -= C.length));
        }
        for (let se of Z) C.push((q.added ? "+" : "-") + se);
        if (q.added) B += Z.length;
        else O += Z.length;
      } else {
        if (S)
          if (Z.length <= d * 2 && V < L.length - 2) for (let se of I(Z)) C.push(se);
          else {
            let se = Math.min(Z.length, d);
            for (let z of I(Z.slice(0, se))) C.push(z);
            let ae = { oldStart: S, oldLines: O - S + se, newStart: T, newLines: B - T + se, lines: C };
            (D.push(ae), (S = 0), (T = 0), (C = []));
          }
        ((O += Z.length), (B += Z.length));
      }
    }
    for (let V of D)
      for (let q = 0; q < V.lines.length; q++)
        if (
          V.lines[q].endsWith(`
`)
        )
          V.lines[q] = V.lines[q].slice(0, -1);
        else (V.lines.splice(q + 1, 0, "\\ No newline at end of file"), q++);
    return { oldFileName: e, newFileName: t, oldHeader: a, newHeader: H, hunks: D };
  }
}