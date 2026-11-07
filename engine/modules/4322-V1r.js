
var V1r = Ie(function (RKc, T9i) {
  var t8a = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu),
    F1r = RegExp.prototype.test.bind(
      /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u,
    ),
    r8a = RegExp.prototype.test.bind(/^\d*$/u),
    Yhe = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu),
    B1r = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu),
    I9i = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/]$/u),
    R1r = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/?]$/u),
    n8a = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:]$/u),
    X8 = Array(256);
  for (let t = 0; t < 256; t++) X8[t] = "%" + "0123456789ABCDEF"[t >> 4] + "0123456789ABCDEF"[t & 15];
  function yP(e) {
    if (e < 2048) return X8[192 | (e >> 6)] + X8[128 | (e & 63)];
    if (e < 65536) return X8[224 | (e >> 12)] + X8[128 | ((e >> 6) & 63)] + X8[128 | (e & 63)];
    return X8[240 | (e >> 18)] + X8[128 | ((e >> 12) & 63)] + X8[128 | ((e >> 6) & 63)] + X8[128 | (e & 63)];
  }
  function i8a(e) {
    let t = "",
      r = 0,
      s = 0;
    for (s = 0; s < e.length; s++) {
      if (((r = e[s].charCodeAt(0)), r === 48)) continue;
      if (!((r >= 48 && r <= 57) || (r >= 65 && r <= 70) || (r >= 97 && r <= 102))) return "";
      t += e[s];
      break;
    }
    for (s += 1; s < e.length; s++) {
      if (
        ((r = e[s].charCodeAt(0)), !((r >= 48 && r <= 57) || (r >= 65 && r <= 70) || (r >= 97 && r <= 102)))
      )
        return "";
      t += e[s];
    }
    return t;
  }
  var s8a = RegExp.prototype.test.bind(/^[\dA-Fa-f]{1,4}$/),
    o8a = RegExp.prototype.test.bind(/^[vV][\dA-Fa-f]+\.[A-Za-z\d\-._~!$&'()*+,;=:]+$/),
    a8a = RegExp.prototype.test.bind(/^[A-Za-z\d\-._~]$/),
    H8a = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
  function c8a(e) {
    if (e.length === 0) return !1;
    for (let t = 0; t < e.length; t++) {
      if (a8a(e[t])) continue;
      if (e[t] === "%" && t + 2 < e.length && Yhe(e.slice(t + 1, t + 3))) {
        t += 2;
        continue;
      }
      return !1;
    }
    return !0;
  }
  function E9i(e) {
    let t = -1,
      r = 0,
      s = -1,
      a = 0;
    for (let f = 0; f < e.length; f++)
      if (e[f] === "0") {
        if (s === -1) s = f;
        if ((a++, a > r)) ((r = a), (t = s));
      } else ((s = -1), (a = 0));
    if (r < 2) return e.join(":");
    let H = e.slice(0, t).join(":"),
      u = e.slice(t + r).join(":");
    return H + "::" + u;
  }
  function A8a(e) {
    let t = e.indexOf("::");
    if (t !== -1 && e.indexOf("::", t + 1) !== -1) return;
    let r = t === -1 ? e.split(":") : e.slice(0, t).split(":"),
      s = t === -1 ? [] : e.slice(t + 2).split(":");
    if (t !== -1) {
      if (r.length === 1 && r[0] === "") r.length = 0;
      if (s.length === 1 && s[0] === "") s.length = 0;
    }
    let a = r.concat(s),
      H = 0;
    for (let f = 0; f < a.length; f++) {
      let d = a[f];
      if (d === "") return;
      if (d.indexOf(".") !== -1) {
        if (f !== a.length - 1 || (t !== -1 && s.length === 0) || !F1r(d)) return;
        H += 2;
        continue;
      }
      if (!s8a(d)) return;
      ((a[f] = parseInt(d, 16).toString(16)), H++);
    }
    if (t === -1) {
      if (H !== 8) return;
      return E9i(a);
    }
    if (H >= 8) return;
    let u = a.slice(0, r.length);
    for (let f = H; f < 8; f++) u.push("0");
    for (let f = r.length; f < a.length; f++) u.push(a[f]);
    return E9i(u);
  }
  function N1r(e) {
    let t = e[0] === "[" && e[e.length - 1] === "]";
    if ((e[0] === "[" || e[e.length - 1] === "]") && !t) return { host: e, isIPV6: !1, error: !0 };
    let s = t ? e.slice(1, -1) : e;
    if (t && o8a(s))
      return ((s = s.toLowerCase()), { host: `[${s}]`, escapedHost: s, isIPV6: !1, isIPVFuture: !0 });
    if (u8a(s, ":") < 2) return { host: e, isIPV6: !1, error: t };
    let a = "",
      H = s.indexOf("%");
    if (H !== -1) {
      let f = s.slice(H, H + 3).toLowerCase() === "%25" ? 3 : 1;
      if (((a = s.slice(H + f)), !c8a(a))) return { host: e, isIPV6: !1, error: !0 };
      s = s.slice(0, H);
    }
    let u = A8a(s);
    if (u === void 0) return { host: e, isIPV6: !1, error: !0 };
    return { host: u + (a ? "%" + a : ""), escapedHost: u + (a ? "%25" + a : ""), isIPV6: !0 };
  }
  function u8a(e, t) {
    let r = 0;
    for (let s = 0; s < e.length; s++) if (e[s] === t) r++;
    return r;
  }
  function D9i(e) {
    let t = e,
      r = [],
      s = -1,
      a = 0;
    while ((a = t.length)) {
      if (a === 1)
        if (t === ".") break;
        else if (t === "/") {
          r.push("/");
          break;
        } else {
          r.push(t);
          break;
        }
      else if (a === 2) {
        if (t[0] === ".") {
          if (t[1] === ".") break;
          else if (t[1] === "/") {
            t = t.slice(2);
            continue;
          }
        } else if (t[0] === "/") {
          if (t[1] === "." || t[1] === "/") {
            r.push("/");
            break;
          }
        }
      } else if (a === 3) {
        if (t === "/..") {
          if (r.length !== 0) r.pop();
          r.push("/");
          break;
        }
      }
      if (t[0] === ".") {
        if (t[1] === ".") {
          if (t[2] === "/") {
            t = t.slice(3);
            continue;
          }
        } else if (t[1] === "/") {
          t = t.slice(2);
          continue;
        }
      } else if (t[0] === "/") {
        if (t[1] === ".") {
          if (t[2] === "/") {
            t = t.slice(2);
            continue;
          } else if (t[2] === ".") {
            if (t[3] === "/") {
              if (((t = t.slice(3)), r.length !== 0)) r.pop();
              continue;
            }
          }
        }
      }
      if ((s = t.indexOf("/", 1)) === -1) {
        r.push(t);
        break;
      } else (r.push(t.slice(0, s)), (t = t.slice(s)));
    }
    return r.join("");
  }
  function l8a(e) {
    if (e === "" || e[0] === "/") return D9i(e);
    let t = e.split("/"),
      r = t.length - 1,
      s = [],
      a = !1;
    for (let H = 0; H <= r; H++) {
      let u = t[H];
      if (u === "." || u === "..") {
        if (u === "..")
          if (s.length !== 0 && s[s.length - 1] !== "..") s.pop();
          else s.push("..");
        a = H === r;
      } else s.push(u);
    }
    if (a && s[s.length - 1] !== "..") s.push("");
    if (s.length === 0 || s[0] === "" || s[0].includes(":")) s.unshift(".");
    return s.join("/");
  }
  var f8a = { "@": "%40", "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" },
    p8a = /[@/?#:]/g,
    d8a = /[@/?#]/g;
  function y9i(e, t) {
    let r = t ? d8a : p8a;
    return ((r.lastIndex = 0), e.replace(r, (s) => f8a[s]));
  }
  function M9i(e, t = !1) {
    if (e.indexOf("%") === -1) return e;
    let r = "";
    for (let s = 0; s < e.length; s++) {
      if (e[s] === "%" && s + 2 < e.length) {
        let a = e.slice(s + 1, s + 3);
        if (Yhe(a)) {
          let H = a.toUpperCase(),
            u = String.fromCharCode(parseInt(H, 16));
          if (t && B1r(u)) r += u;
          else r += "%" + H;
          s += 2;
          continue;
        }
      }
      r += e[s];
    }
    return r;
  }
  function m8a(e) {
    let t = "";
    for (let r = 0; r < e.length; r++) {
      let s = e[r];
      if (s === "%" && r + 2 < e.length) {
        let a = e.slice(r + 1, r + 3);
        if (Yhe(a)) {
          let H = a.toUpperCase(),
            u = String.fromCharCode(parseInt(H, 16));
          if (u !== "." && B1r(u)) t += u;
          else t += "%" + H;
          r += 2;
          continue;
        }
      }
      if (I9i(s)) t += s;
      else {
        let a = e.charCodeAt(r);
        if (a < 128) t += S9i(a) ? s : X8[a];
        else if (a < 55296 || a > 57343) t += yP(a);
        else if (a <= 56319 && r + 1 < e.length) {
          let H = e.charCodeAt(r + 1);
          if (H >= 56320 && H <= 57343) ((t += yP(65536 + ((a - 55296) << 10) + (H - 56320))), r++);
          else t += yP(65533);
        } else t += yP(65533);
      }
    }
    return t;
  }
  function _8a(e, t = !1) {
    let r = "",
      s = t && e[0] !== "/";
    for (let a = 0; a < e.length; a++) {
      let H = e[a];
      if (H === "%" && a + 2 < e.length) {
        let u = e.slice(a + 1, a + 3);
        if (Yhe(u)) {
          ((r += "%" + u.toUpperCase()), (a += 2));
          continue;
        }
      }
      if (H === "/") s = !1;
      if (I9i(H) && (H !== ":" || !s)) r += H;
      else {
        let u = e.charCodeAt(a);
        if (u < 128) r += X8[u];
        else if (u < 55296 || u > 57343) r += yP(u);
        else if (u <= 56319 && a + 1 < e.length) {
          let f = e.charCodeAt(a + 1);
          if (f >= 56320 && f <= 57343) ((r += yP(65536 + ((u - 55296) << 10) + (f - 56320))), a++);
          else r += yP(65533);
        } else r += yP(65533);
      }
    }
    return r;
  }
  function W1r(e, t) {
    let r = "";
    for (let s = 0; s < e.length; s++) {
      let a = e[s];
      if (a === "%" && s + 2 < e.length) {
        let H = e.slice(s + 1, s + 3);
        if (Yhe(H)) {
          ((r += "%" + H.toUpperCase()), (s += 2));
          continue;
        }
      }
      if (t(a)) r += a;
      else {
        let H = e.charCodeAt(s);
        if (H < 128) r += X8[H];
        else if (H < 55296 || H > 57343) r += yP(H);
        else if (H <= 56319 && s + 1 < e.length) {
          let u = e.charCodeAt(s + 1);
          if (u >= 56320 && u <= 57343) ((r += yP(65536 + ((H - 55296) << 10) + (u - 56320))), s++);
          else r += yP(65533);
        } else r += yP(65533);
      }
    }
    return r;
  }
  function x9i(e) {
    return W1r(e, n8a);
  }
  function h8a(e) {
    return W1r(e, R1r);
  }
  function L8a(e) {
    return W1r(e, R1r);
  }
  function S9i(e) {
    return (
      (e >= 48 && e <= 57) ||
      (e >= 65 && e <= 90) ||
      (e >= 97 && e <= 122) ||
      e === 42 ||
      e === 43 ||
      e === 45 ||
      e === 46 ||
      e === 47 ||
      e === 64 ||
      e === 95
    );
  }
  function $8a(e) {
    let t = "";
    for (let r = 0; r < e.length; r++) {
      let s = e[r];
      if (s === "%" && r + 2 < e.length) {
        let a = e.slice(r + 1, r + 3);
        if (Yhe(a)) {
          let H = a.toUpperCase(),
            u = String.fromCharCode(parseInt(H, 16));
          if (B1r(u)) t += u;
          else t += "%" + H;
          r += 2;
          continue;
        }
      }
      if (R1r(s)) t += s;
      else {
        let a = e.charCodeAt(r);
        if (a < 128) t += S9i(a) ? s : X8[a];
        else if (a < 55296 || a > 57343) t += yP(a);
        else if (a <= 56319 && r + 1 < e.length) {
          let H = e.charCodeAt(r + 1);
          if (H >= 56320 && H <= 57343) ((t += yP(65536 + ((a - 55296) << 10) + (H - 56320))), r++);
          else t += yP(65533);
        } else t += yP(65533);
      }
    }
    return t;
  }
  function g8a(e) {
    let t = "";
    for (let r = 0; r < e.length; r++) {
      if (e[r] === "%" && r + 2 < e.length) {
        let s = e.slice(r + 1, r + 3);
        if (Yhe(s)) {
          ((t += "%" + s.toUpperCase()), (r += 2));
          continue;
        }
      }
      t += escape(e[r]);
    }
    return t;
  }
  function E8a(e) {
    let t = [];
    if (e.userinfo !== void 0) (t.push(x9i(e.userinfo)), t.push("@"));
    if (e.host !== void 0) {
      let r = e.host;
      if (!F1r(r)) {
        let s = N1r(r);
        if (s.isIPV6 !== !0 && s.isIPVFuture !== !0) ((r = M9i(r, !0)), (s = N1r(r)));
        if (s.isIPV6 === !0 || s.isIPVFuture === !0) r = `[${s.escapedHost}]`;
        else r = y9i(r, !1);
      }
      t.push(r);
    }
    if (typeof e.port === "number" || typeof e.port === "string") {
      let r = String(e.port);
      if (!r8a(r)) throw TypeError("URI port is malformed.");
      (t.push(":"), t.push(r));
    }
    return t.length ? t.join("") : void 0;
  }
  T9i.exports = {
    nonSimpleDomain: H8a,
    recomposeAuthority: E8a,
    reescapeHostDelimiters: y9i,
    normalizePercentEncoding: M9i,
    normalizePathEncoding: m8a,
    serializePathEncoding: _8a,
    normalizeQueryFragmentEncoding: $8a,
    encodeUserinfo: x9i,
    encodeQuery: h8a,
    encodeFragment: L8a,
    escapePreservingEscapes: g8a,
    removeDotSegments: D9i,
    removeDotSegmentsRelative: l8a,
    isIPv4: F1r,
    isUUID: t8a,
    normalizeIPv6: N1r,
    stringArrayToHexStripped: i8a,
  };
});