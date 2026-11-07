
var jJs,
  z3e = (e) => e.replace(/[[\]\\-]/g, "\\$&"),
  lnr,
  W0n = (e, t, r = !1, s) => {
    let a = (B) => {
        let V = s ? B.normalize(s) : B;
        return [...V].length === 1 ? V : B;
      },
      H = t;
    if (e.charAt(H) !== "[") throw Error("not in a brace expression");
    let u = [],
      f = [],
      d = H + 1,
      _ = !1,
      L = !1,
      I = !1,
      D = H,
      S = "";
    e: while (d < e.length) {
      let B = String.fromCodePoint(e.codePointAt(d));
      if ((B === "!" || B === "^") && d === H + 1) {
        ((I = !0), d++);
        continue;
      }
      if (B === "]" && _ && !L) {
        D = d + 1;
        break;
      }
      if (((_ = !0), B === "\\")) {
        if (!L) {
          ((L = !0), d++);
          continue;
        }
      }
      if (B === "[" && !L) {
        for (let [q, [Z, se]] of Object.entries(jJs))
          if (e.startsWith(q, d)) {
            if (S) return [lnr, e.length - H];
            if (((d += q.length), se)) f.push(Z);
            else u.push(Z);
            continue e;
          }
      }
      L = !1;
      let V = a(B);
      if (S) {
        if (V.codePointAt(0) > S.codePointAt(0)) u.push(z3e(S) + "-" + z3e(V));
        else if (V === S) u.push(z3e(V));
        ((S = ""), (d += B.length));
        continue;
      }
      if (e.startsWith("-]", d + B.length)) {
        (u.push(z3e(V + "-")), (d += B.length + 1));
        continue;
      }
      if (e.startsWith("-", d + B.length)) {
        ((S = V), (d += B.length + 1));
        continue;
      }
      (u.push(z3e(V)), (d += B.length));
    }
    if (D < d) return [lnr, 0];
    if (!u.length && !f.length) return [lnr, e.length - H];
    let T = "[" + (I ? "^" : "") + u.join("") + "]",
      C = "[" + (I ? "" : "^") + f.join("") + "]",
      O = "^" + (u.length && f.length ? "(" + T + "|" + C + ")" : u.length ? T : C);
    return [new RegExp(O, r ? "iu" : "u"), D - H];
  };