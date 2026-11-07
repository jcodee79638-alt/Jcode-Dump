
var F5i,
  HXa,
  Pjr,
  B5i = 0.65,
  cXa = 0.65,
  AXa = function* (e, t) {
    yield t;
  },
  uXa = function* (e, t) {
    let r = e.split(`
`),
      s = t.split(`
`);
    if (s[s.length - 1] === "") s.pop();
    for (let a = 0; a <= r.length - s.length; a++) {
      let H = !0;
      for (let u = 0; u < s.length; u++) {
        let f = r[a + u].trim(),
          d = s[u].trim();
        if (f !== d) {
          H = !1;
          break;
        }
      }
      if (H) {
        let u = 0;
        for (let d = 0; d < a; d++) u += r[d].length + 1;
        let f = u;
        for (let d = 0; d < s.length; d++) if (((f += r[a + d].length), d < s.length - 1)) f += 1;
        yield e.substring(u, f);
      }
    }
  },
  lXa = function* (e, t) {
    let r = e.split(`
`),
      s = t.split(`
`);
    if (s.length < 3) return;
    if (s[s.length - 1] === "") s.pop();
    let a = s[0].trim(),
      H = s[s.length - 1].trim(),
      u = s.length,
      f = Math.max(1, Math.floor(u * 0.25)),
      d = [];
    for (let I = 0; I < r.length; I++) {
      if (r[I].trim() !== a) continue;
      for (let D = I + 2; D < r.length; D++)
        if (r[D].trim() === H) {
          let S = D - I + 1;
          if (Math.abs(S - u) <= f) d.push({ startLine: I, endLine: D });
          break;
        }
    }
    if (d.length === 0) return;
    if (d.length === 1) {
      let { startLine: I, endLine: D } = d[0],
        S = D - I + 1,
        T = 0,
        C = Math.min(u - 2, S - 2);
      if (C > 0)
        for (let O = 1; O < u - 1 && O < S - 1; O++) {
          let B = r[I + O].trim(),
            V = s[O].trim(),
            q = Math.max(B.length, V.length);
          if (q === 0) continue;
          let Z = R5i(B, V);
          if (((T += (1 - Z / q) / C), T >= B5i)) break;
        }
      else T = 1;
      if (T >= B5i) {
        let O = 0;
        for (let V = 0; V < I; V++) O += r[V].length + 1;
        let B = O;
        for (let V = I; V <= D; V++) if (((B += r[V].length), V < D)) B += 1;
        yield e.substring(O, B);
      }
      return;
    }
    let _ = null,
      L = -1;
    for (let I of d) {
      let { startLine: D, endLine: S } = I,
        T = S - D + 1,
        C = 0,
        O = Math.min(u - 2, T - 2);
      if (O > 0) {
        for (let B = 1; B < u - 1 && B < T - 1; B++) {
          let V = r[D + B].trim(),
            q = s[B].trim(),
            Z = Math.max(V.length, q.length);
          if (Z === 0) continue;
          let se = R5i(V, q);
          C += 1 - se / Z;
        }
        C /= O;
      } else C = 1;
      if (C > L) ((L = C), (_ = I));
    }
    if (L >= cXa && _) {
      let { startLine: I, endLine: D } = _,
        S = 0;
      for (let C = 0; C < I; C++) S += r[C].length + 1;
      let T = S;
      for (let C = I; C <= D; C++) if (((T += r[C].length), C < D)) T += 1;
      yield e.substring(S, T);
    }
  },
  fXa = function* (e, t) {
    let r = (u) => u.replace(/\s+/g, " ").trim(),
      s = r(t),
      a = e.split(`
`);
    for (let u = 0; u < a.length; u++) {
      let f = a[u];
      if (r(f) === s) yield f;
      else if (r(f).includes(s)) {
        let _ = t.trim().split(/\s+/);
        if (_.length > 0) {
          let L = _.map((I) => I.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("\\s+");
          try {
            let I = new RegExp(L),
              D = f.match(I);
            if (D) yield D[0];
          } catch {}
        }
      }
    }
    let H = t.split(`
`);
    if (H.length > 1)
      for (let u = 0; u <= a.length - H.length; u++) {
        let f = a.slice(u, u + H.length);
        if (
          r(
            f.join(`
`),
          ) === s
        )
          yield f.join(`
`);
      }
  },
  pXa = function* (e, t) {
    let r = (u) => {
        let f = u.split(`
`),
          d = f.filter((L) => L.trim().length > 0);
        if (d.length === 0) return u;
        let _ = Math.min(
          ...d.map((L) => {
            let I = L.match(/^(\s*)/);
            return I ? I[1].length : 0;
          }),
        );
        return f.map((L) => (L.trim().length === 0 ? L : L.slice(_))).join(`
`);
      },
      s = r(t),
      a = e.split(`
`),
      H = t.split(`
`);
    for (let u = 0; u <= a.length - H.length; u++) {
      let f = a.slice(u, u + H.length).join(`
`);
      if (r(f) === s) yield f;
    }
  },
  dXa = function* (e, t) {
    let r = (u) =>
        u.replace(/\\(n|t|r|'|"|`|\\|\n|\$)/g, (f, d) => {
          switch (d) {
            case "n":
              return `
`;
            case "t":
              return "\t";
            case "r":
              return "\r";
            case "'":
              return "'";
            case '"':
              return '"';
            case "`":
              return "`";
            case "\\":
              return "\\";
            case `
`:
              return `
`;
            case "$":
              return "$";
            default:
              return f;
          }
        }),
      s = r(t);
    if (e.includes(s)) yield s;
    let a = e.split(`
`),
      H = s.split(`
`);
    for (let u = 0; u <= a.length - H.length; u++) {
      let f = a.slice(u, u + H.length).join(`
`);
      if (r(f) === s) yield f;
    }
  },
  mXa = function* (e, t) {
    let r = 0;
    while (!0) {
      let s = e.indexOf(t, r);
      if (s === -1) break;
      (yield t, (r = s + t.length));
    }
  },
  _Xa = function* (e, t) {
    let r = t.trim();
    if (r === t) return;
    if (e.includes(r)) yield r;
    let s = e.split(`
`),
      a = t.split(`
`);
    for (let H = 0; H <= s.length - a.length; H++) {
      let u = s.slice(H, H + a.length).join(`
`);
      if (u.trim() === r) yield u;
    }
  },
  hXa = function* (e, t) {
    let r = t.split(`
`);
    if (r.length < 3) return;
    if (r[r.length - 1] === "") r.pop();
    let s = e.split(`
`),
      a = r[0].trim(),
      H = r[r.length - 1].trim();
    for (let u = 0; u < s.length; u++) {
      if (s[u].trim() !== a) continue;
      for (let f = u + 2; f < s.length; f++)
        if (s[f].trim() === H) {
          let d = s.slice(u, f + 1),
            _ = d.join(`
`);
          if (d.length === r.length) {
            let L = 0,
              I = 0;
            for (let D = 1; D < d.length - 1; D++) {
              let S = d[D].trim(),
                T = r[D].trim();
              if (S.length > 0 || T.length > 0) {
                if ((I++, S === T)) L++;
              }
            }
            if (I === 0 || L / I >= 0.5) {
              yield _;
              break;
            }
          }
          break;
        }
    }
  };