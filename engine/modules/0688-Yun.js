
function Yun() {
  let e = new TextDecoder(),
    t = {
      state: m2.key,
      headers: Object.create(null),
      key: "",
      value: void 0,
      crlf: 0,
      previousChunk: void 0,
      pairs: 0,
      size: 0,
    };
  function r(H) {
    return (
      (t.state = m2.key),
      (t.headers = Object.create(null)),
      (t.key = ""),
      (t.value = void 0),
      (t.crlf = 0),
      (t.previousChunk = void 0),
      (t.pairs = 0),
      (t.size = 0),
      H
    );
  }
  function s(H, u) {
    let f = new Uint8Array(H.length + u.length);
    return (f.set(H), f.set(u, H.length), f);
  }
  function a(H) {
    return r({ _tag: "Failure", reason: H, headers: t.headers });
  }
  return function (u, f) {
    let d = 0,
      _;
    if (t.previousChunk !== void 0) {
      ((d = t.previousChunk.length), (_ = d));
      let I = new Uint8Array(u.length + d);
      (I.set(t.previousChunk), I.set(u, d), (t.previousChunk = void 0), (u = I));
    }
    let L = u.length;
    e: while (f < L) {
      if (t.state === m2.key) {
        let I = f;
        for (; I < L; I++) {
          if (t.size++ > 16384) return a("HeaderTooLarge");
          if (u[I] === 58) {
            if (((t.key += e.decode(u.subarray(f, I)).toLowerCase()), t.key.length === 0))
              return a("InvalidHeaderName");
            if (u[I + 1] === 32 && u[I + 2] !== 32 && u[I + 2] !== 9)
              ((f = I + 2), (t.state = m2.value), t.size++);
            else if (u[I + 1] !== 32 && u[I + 1] !== 9) ((f = I + 1), (t.state = m2.value));
            else ((f = I + 1), (t.state = m2.whitespace));
            break;
          } else if (NRs[u[I]] !== 1) return a("InvalidHeaderName");
        }
        if (I === L) return ((t.key += e.decode(u.subarray(f, L)).toLowerCase()), PRe);
      }
      if (t.state === m2.whitespace) {
        for (; f < L; f++) {
          if (t.size++ > 16384) return a("HeaderTooLarge");
          if (u[f] !== 32 && u[f] !== 9) {
            t.state = m2.value;
            break;
          }
        }
        if (f === L) return PRe;
      }
      if (t.state === m2.value) {
        let I = f;
        if (_ !== void 0) ((I = _), (_ = void 0));
        for (; I < L; I++) {
          if (t.size++ > 16384) return a("HeaderTooLarge");
          if (u[I] === 13 || t.crlf > 0) {
            let D = u[I];
            if (D === 13 && t.crlf === 0) ((t.crlf = 1), I++, t.size++, (D = u[I]));
            if (D === 10 && t.crlf === 1) ((t.crlf = 2), I++, t.size++, (D = u[I]));
            if (D === 13 && t.crlf === 2) ((t.crlf = 3), I++, t.size++, (D = u[I]));
            if (D === 10 && t.crlf === 3) ((t.crlf = 4), I++, t.size++);
            if (t.crlf < 4 && I >= L) return ((t.previousChunk = u.subarray(f)), PRe);
            else if (t.crlf >= 2) {
              t.value =
                t.value === void 0 ? u.subarray(f, I - t.crlf) : s(t.value, u.subarray(f, I - t.crlf));
              let S = e.decode(t.value);
              if (t.headers[t.key] === void 0) t.headers[t.key] = S;
              else if (typeof t.headers[t.key] === "string") t.headers[t.key] = [t.headers[t.key], S];
              else t.headers[t.key].push(S);
              if (((f = I), t.size--, t.crlf !== 4 && t.pairs === 100)) return a("TooManyHeaders");
              else if (t.crlf === 3) return a("InvalidHeaderValue");
              else if (t.crlf === 4) return r({ _tag: "Headers", headers: t.headers, endPosition: f - d });
              (t.pairs++, (t.key = ""), (t.value = void 0), (t.crlf = 0), (t.state = m2.key));
              continue e;
            }
          } else if (FRs[u[I]] !== 1) return a("InvalidHeaderValue");
        }
        if (I === L)
          return ((t.value = t.value === void 0 ? u.subarray(f, L) : s(t.value, u.subarray(f, L))), PRe);
      }
    }
    if (f > L) t.size += L - f;
    return PRe;
  };
}