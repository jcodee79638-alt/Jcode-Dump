
function ght(e, t = !1) {
  let r = e.length,
    s = 0,
    a = "",
    H = 0,
    u = 16,
    f = 0,
    d = 0,
    _ = 0,
    L = 0,
    I = 0;
  function D(q, Z) {
    let se = 0,
      ae = 0;
    while (se < q || !Z) {
      let z = e.charCodeAt(s);
      if (z >= 48 && z <= 57) ae = ae * 16 + z - 48;
      else if (z >= 65 && z <= 70) ae = ae * 16 + z - 65 + 10;
      else if (z >= 97 && z <= 102) ae = ae * 16 + z - 97 + 10;
      else break;
      (s++, se++);
    }
    if (se < q) ae = -1;
    return ae;
  }
  function S(q) {
    ((s = q), (a = ""), (H = 0), (u = 16), (I = 0));
  }
  function T() {
    let q = s;
    if (e.charCodeAt(s) === 48) s++;
    else {
      s++;
      while (s < e.length && Hxe(e.charCodeAt(s))) s++;
    }
    if (s < e.length && e.charCodeAt(s) === 46)
      if ((s++, s < e.length && Hxe(e.charCodeAt(s)))) {
        s++;
        while (s < e.length && Hxe(e.charCodeAt(s))) s++;
      } else return ((I = 3), e.substring(q, s));
    let Z = s;
    if (s < e.length && (e.charCodeAt(s) === 69 || e.charCodeAt(s) === 101)) {
      if ((s++, (s < e.length && e.charCodeAt(s) === 43) || e.charCodeAt(s) === 45)) s++;
      if (s < e.length && Hxe(e.charCodeAt(s))) {
        s++;
        while (s < e.length && Hxe(e.charCodeAt(s))) s++;
        Z = s;
      } else I = 3;
    }
    return e.substring(q, Z);
  }
  function C() {
    let q = "",
      Z = s;
    while (!0) {
      if (s >= r) {
        ((q += e.substring(Z, s)), (I = 2));
        break;
      }
      let se = e.charCodeAt(s);
      if (se === 34) {
        ((q += e.substring(Z, s)), s++);
        break;
      }
      if (se === 92) {
        if (((q += e.substring(Z, s)), s++, s >= r)) {
          I = 2;
          break;
        }
        switch (e.charCodeAt(s++)) {
          case 34:
            q += '"';
            break;
          case 92:
            q += "\\";
            break;
          case 47:
            q += "/";
            break;
          case 98:
            q += "\b";
            break;
          case 102:
            q += "\f";
            break;
          case 110:
            q += `
`;
            break;
          case 114:
            q += "\r";
            break;
          case 116:
            q += "\t";
            break;
          case 117:
            let z = D(4, !0);
            if (z >= 0) q += String.fromCharCode(z);
            else I = 4;
            break;
          default:
            I = 5;
        }
        Z = s;
        continue;
      }
      if (se >= 0 && se <= 31)
        if (jWe(se)) {
          ((q += e.substring(Z, s)), (I = 2));
          break;
        } else I = 6;
      s++;
    }
    return q;
  }
  function O() {
    if (((a = ""), (I = 0), (H = s), (d = f), (L = _), s >= r)) return ((H = r), (u = 17));
    let q = e.charCodeAt(s);
    if (Jir(q)) {
      do (s++, (a += String.fromCharCode(q)), (q = e.charCodeAt(s)));
      while (Jir(q));
      return (u = 15);
    }
    if (jWe(q)) {
      if ((s++, (a += String.fromCharCode(q)), q === 13 && e.charCodeAt(s) === 10))
        (s++,
          (a += `
`));
      return (f++, (_ = s), (u = 14));
    }
    switch (q) {
      case 123:
        return (s++, (u = 1));
      case 125:
        return (s++, (u = 2));
      case 91:
        return (s++, (u = 3));
      case 93:
        return (s++, (u = 4));
      case 58:
        return (s++, (u = 6));
      case 44:
        return (s++, (u = 5));
      case 34:
        return (s++, (a = C()), (u = 10));
      case 47:
        let Z = s - 1;
        if (e.charCodeAt(s + 1) === 47) {
          s += 2;
          while (s < r) {
            if (jWe(e.charCodeAt(s))) break;
            s++;
          }
          return ((a = e.substring(Z, s)), (u = 12));
        }
        if (e.charCodeAt(s + 1) === 42) {
          s += 2;
          let se = r - 1,
            ae = !1;
          while (s < se) {
            let z = e.charCodeAt(s);
            if (z === 42 && e.charCodeAt(s + 1) === 47) {
              ((s += 2), (ae = !0));
              break;
            }
            if ((s++, jWe(z))) {
              if (z === 13 && e.charCodeAt(s) === 10) s++;
              (f++, (_ = s));
            }
          }
          if (!ae) (s++, (I = 1));
          return ((a = e.substring(Z, s)), (u = 13));
        }
        return ((a += String.fromCharCode(q)), s++, (u = 16));
      case 45:
        if (((a += String.fromCharCode(q)), s++, s === r || !Hxe(e.charCodeAt(s)))) return (u = 16);
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return ((a += T()), (u = 11));
      default:
        while (s < r && B(q)) (s++, (q = e.charCodeAt(s)));
        if (H !== s) {
          switch (((a = e.substring(H, s)), a)) {
            case "true":
              return (u = 8);
            case "false":
              return (u = 9);
            case "null":
              return (u = 7);
          }
          return (u = 16);
        }
        return ((a += String.fromCharCode(q)), s++, (u = 16));
    }
  }
  function B(q) {
    if (Jir(q) || jWe(q)) return !1;
    switch (q) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return !1;
    }
    return !0;
  }
  function V() {
    let q;
    do q = O();
    while (q >= 12 && q <= 15);
    return q;
  }
  return {
    setPosition: S,
    getPosition: () => s,
    scan: t ? V : O,
    getToken: () => u,
    getTokenValue: () => a,
    getTokenOffset: () => H,
    getTokenLength: () => s - H,
    getTokenStartLine: () => d,
    getTokenStartCharacter: () => H - L,
    getTokenError: () => I,
  };
}