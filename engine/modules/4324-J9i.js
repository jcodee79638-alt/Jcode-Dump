
var J9i = Ie(function (VKc, lbt) {
  var {
      normalizeIPv6: N9i,
      removeDotSegments: FXe,
      removeDotSegmentsRelative: F9i,
      recomposeAuthority: O8a,
      normalizePercentEncoding: X1r,
      normalizePathEncoding: U8a,
      serializePathEncoding: w9i,
      normalizeQueryFragmentEncoding: k9i,
      encodeQuery: N8a,
      encodeFragment: F8a,
      reescapeHostDelimiters: B8a,
      isIPv4: B9i,
      nonSimpleDomain: R8a,
    } = V1r(),
    { SCHEMES: R9i, getSchemeHandler: J1r } = C9i(),
    W9i = /^[A-Za-z][A-Za-z0-9+.-]*$/u,
    W8a = /[\0-\x20"#/:<>?@[\\\]^`{|}\x7F]/u;
  function O9i(e) {
    let t = String(e);
    if (!W9i.test(t)) throw TypeError("URI scheme is malformed.");
    return t;
  }
  function V8a(e, t) {
    if (typeof e === "string") e = Z8a(e, t);
    else if (typeof e === "object") e = Abt(Zhe(e, t), t);
    return e;
  }
  function q8a(e, t, r) {
    let s = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" },
      {
        parsed: a,
        malformedAuthorityOrPort: H,
        malformedPercentEncoding: u,
        malformedSchemeSpecific: f,
        malformedHost: d,
        malformedScheme: _,
      } = cbt(e, s),
      {
        parsed: L,
        malformedAuthorityOrPort: I,
        malformedPercentEncoding: D,
        malformedSchemeSpecific: S,
        malformedHost: T,
        malformedScheme: C,
      } = cbt(t, s);
    if (H || I || u || D || f || S || d || T || _ || C)
      throw Error(a.error || L.error || "URI is malformed.");
    let O = V9i(a, L, s, !0),
      B = J1r((r && r.scheme) || O.scheme),
      V = O.host,
      q = V !== void 0 && V !== "" && (B9i(V) || N9i(V).isIPV6);
    if (G9i(O, r || {}, B, q)) throw Error("URI host is malformed.");
    q9i(O, r || {}, B, q);
    let Z = V && V.indexOf("%") !== -1 && !/\P{ASCII}/u.test(V);
    if (O.error && !Z) throw Error(O.error);
    return ((s.skipEscape = !0), Zhe(O, s));
  }
  function V9i(e, t, r, s) {
    let a = {};
    if (!s) ((e = Abt(Zhe(e, r), r)), (t = Abt(Zhe(t, r), r)));
    if (((r = r || {}), !r.tolerant && t.scheme))
      ((a.scheme = t.scheme),
        (a.userinfo = t.userinfo),
        (a.host = t.host),
        (a.port = t.port),
        (a.path = FXe(t.path || "")),
        (a.query = t.query));
    else {
      if (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0)
        ((a.userinfo = t.userinfo),
          (a.host = t.host),
          (a.port = t.port),
          (a.path = FXe(t.path || "")),
          (a.query = t.query));
      else {
        if (!t.path)
          if (((a.path = e.path), t.query !== void 0)) a.query = t.query;
          else a.query = e.query;
        else {
          if (t.path[0] === "/") a.path = FXe(t.path);
          else {
            let H = e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0;
            if (H && !e.path) a.path = "/" + t.path;
            else if (!e.path) a.path = t.path;
            else a.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path;
            a.path = e.scheme === void 0 && !H && a.path[0] !== "/" ? F9i(a.path) : FXe(a.path);
          }
          a.query = t.query;
        }
        ((a.userinfo = e.userinfo), (a.host = e.host), (a.port = e.port));
      }
      a.scheme = e.scheme;
    }
    return ((a.fragment = t.fragment), a);
  }
  function G8a(e, t, r) {
    let s = U9i(e, r),
      a = U9i(t, r);
    return s !== void 0 && a !== void 0 && s === a;
  }
  function Zhe(e, t) {
    let r = {
        host: e.host,
        scheme: e.scheme,
        userinfo: e.userinfo,
        port: e.port,
        path: e.path,
        query: e.query,
        nid: e.nid,
        nss: e.nss,
        uuid: e.uuid,
        fragment: e.fragment,
        reference: e.reference,
        resourceName: e.resourceName,
        secure: e.secure,
        error: "",
      },
      s = Object.assign({}, t),
      a = [];
    if (r.scheme) r.scheme = O9i(r.scheme);
    let H = J1r(s.scheme || r.scheme);
    if (H && H.serialize) H.serialize(r, s);
    let u = r.userinfo !== void 0 || r.host !== void 0 || r.port !== void 0,
      f = (r.scheme === void 0 || s.reference === "suffix") && !u,
      d = !s.skipEscape && f;
    if (r.path !== void 0)
      if (!s.skipEscape) r.path = w9i(r.path, d);
      else r.path = X1r(r.path);
    if (s.reference !== "suffix" && r.scheme) ((r.scheme = O9i(r.scheme)), a.push(r.scheme, ":"));
    let _ = O8a(r);
    if (_ !== void 0) {
      if (s.reference !== "suffix") a.push("//");
      if ((a.push(_), r.path && r.path[0] !== "/")) a.push("/");
    }
    if (r.path !== void 0) {
      let L = r.path;
      if (!s.absolutePath && (!H || !H.absolutePath)) L = f && L[0] !== "/" ? F9i(L) : FXe(L);
      if (f) L = w9i(L, !0);
      if (_ === void 0 && L[0] === "/" && L[1] === "/") L = "/%2F" + L.slice(2);
      a.push(L);
    }
    if (r.query !== void 0) a.push("?", N8a(r.query));
    if (r.fragment !== void 0) a.push("#", F8a(r.fragment));
    return a.join("");
  }
  var X8a =
      /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u,
    J8a = /^(?:[^#/:?]+:)?\/\/([^/?#]*)/,
    K8a = /^(?:[^#/:?]+:)?([/\\\t\n\r]*)/;
  function z8a(e, t) {
    if (t[2] !== void 0 && e.path && e.path[0] !== "/")
      return 'URI path must start with "/" when authority is present.';
    if (typeof e.port === "number" && (e.port < 0 || e.port > 65535)) return "URI port is malformed.";
    return;
  }
  function NXe(e) {
    if (e === void 0) return !1;
    let t = e.indexOf("%");
    while (t !== -1) {
      if (t + 2 >= e.length || !/^[\da-f]{2}$/iu.test(e.slice(t + 1, t + 3))) return !0;
      t = e.indexOf("%", t + 3);
    }
    return !1;
  }
  function ubt(e) {
    return e[0] === "[" && e[e.length - 1] === "]";
  }
  function Q8a(e) {
    let t = e[4];
    return NXe(e[3]) || (t !== void 0 && !ubt(t) && NXe(t)) || NXe(e[6]) || NXe(e[7]) || NXe(e[8]);
  }
  function q9i(e, t, r, s) {
    if (G9i(e, t, r, s)) return ((e.error = e.error || "URI host is malformed."), !0);
    if (
      !t.unicodeSupport &&
      (!r || !r.unicodeSupport) &&
      e.host &&
      !ubt(e.host) &&
      (t.domainHost || (r && r.domainHost)) &&
      s === !1 &&
      R8a(e.host)
    ) {
      let a;
      try {
        a = new URL("http://" + e.host);
      } catch (H) {
        return ((e.error = e.error || "Host's domain name can not be converted to ASCII: " + H), !0);
      }
      if (!Y8a(a)) return ((e.error = e.error || "URI host is malformed."), !0);
      e.host = a.hostname;
    }
    return !1;
  }
  function G9i(e, t, r, s) {
    return Boolean(
      e.host && s === !1 && !ubt(e.host) && (t.domainHost || (r && r.domainHost)) && W8a.test(e.host),
    );
  }
  function Y8a(e) {
    return (
      e.username === "" &&
      e.password === "" &&
      e.port === "" &&
      e.pathname === "/" &&
      e.search === "" &&
      e.hash === "" &&
      e.hostname !== ""
    );
  }
  function cbt(e, t) {
    let r = Object.assign({}, t),
      s = {
        scheme: void 0,
        userinfo: void 0,
        host: "",
        port: void 0,
        path: "",
        query: void 0,
        fragment: void 0,
      },
      a = !1,
      H = !1,
      u = !1,
      f = !1,
      d = !1,
      _ = !1,
      L = !1;
    if (r.reference === "suffix")
      if (r.scheme) e = r.scheme + ":" + e;
      else e = "//" + e;
    let I = e.match(J8a);
    if (I !== null && I[1].indexOf("\\") !== -1)
      ((s.error = "URI authority must not contain a literal backslash."), (a = !0));
    let D = e.match(K8a);
    if (D !== null) {
      let T = D[1],
        C = T.replace(/[\t\n\r]/g, "");
      if (C.length >= 2) {
        if (C.slice(0, 2) !== "//")
          ((s.error = s.error || "URI authority must not contain a literal backslash."), (a = !0));
        else if (T.length !== C.length)
          ((s.error = s.error || "URI authority introducer must not contain whitespace."), (a = !0));
      }
    }
    let S = e.match(X8a);
    if (S) {
      if (
        ((s.scheme = S[1]),
        (s.userinfo = S[3]),
        (s.host = S[4]),
        (s.port = parseInt(S[5], 10)),
        (s.path = S[6] || ""),
        (s.query = S[7]),
        (s.fragment = S[8]),
        s.scheme !== void 0)
      )
        if (W9i.test(s.scheme)) s.scheme = s.scheme.toLowerCase();
        else ((s.error = s.error || "URI scheme is malformed."), (_ = !0));
      if (((H = Q8a(S)), H)) s.error = s.error || "URI contains malformed percent-encoding.";
      if (isNaN(s.port)) s.port = S[5];
      let T = z8a(s, S);
      if (T !== void 0) ((s.error = s.error || T), (a = !0));
      if (s.host)
        if (B9i(s.host) === !1) {
          let B = ubt(s.host),
            V = s.host.indexOf("[") !== -1 || s.host.indexOf("]") !== -1,
            q = N9i(s.host);
          if (
            ((L = q.isIPV6 || q.isIPVFuture === !0),
            (d = V && (!B || q.error === !0)),
            (s.host = L ? q.host : q.host.toLowerCase()),
            d)
          )
            ((s.error = s.error || "URI host is malformed."), (a = !0));
        } else L = !0;
      if (
        s.scheme === void 0 &&
        s.userinfo === void 0 &&
        s.host === void 0 &&
        s.port === void 0 &&
        s.query === void 0 &&
        !s.path
      )
        s.reference = "same-document";
      else if (s.scheme === void 0) s.reference = "relative";
      else if (s.fragment === void 0) s.reference = "absolute";
      else s.reference = "uri";
      if (r.reference && r.reference !== "suffix" && r.reference !== s.reference)
        s.error = s.error || "URI is not a " + r.reference + " reference.";
      let C = J1r(r.scheme || s.scheme);
      if (!d) f = q9i(s, r, C, L);
      if (e.indexOf("%") !== -1 && s.host !== void 0 && !d) {
        let O = L ? s.host : X1r(s.host, !0);
        if (!L) O = X1r(O.toLowerCase());
        s.host = L || r.scheme !== "null" ? B8a(O, L) : O;
      }
      if (!C || (C && !C.skipNormalize)) {
        if (s.path) s.path = U8a(s.path);
        if (s.query) s.query = k9i(s.query);
        if (s.fragment) s.fragment = k9i(s.fragment);
      }
      if (C && C.parse) {
        if ((C.parse(s, r), C === R9i.urn && s.nid === void 0)) u = !0;
      }
    } else s.error = s.error || "URI can not be parsed.";
    return {
      parsed: s,
      malformedAuthorityOrPort: a,
      malformedPercentEncoding: H,
      malformedSchemeSpecific: u,
      malformedHost: f,
      malformedScheme: _,
    };
  }
  function Abt(e, t) {
    return cbt(e, t).parsed;
  }
  function Z8a(e, t) {
    return X9i(e, t).normalized;
  }
  function X9i(e, t) {
    let {
      parsed: r,
      malformedAuthorityOrPort: s,
      malformedPercentEncoding: a,
      malformedSchemeSpecific: H,
      malformedHost: u,
      malformedScheme: f,
    } = cbt(e, t);
    return {
      normalized: s || a || H || u || f ? e : Zhe(r, t),
      malformedAuthorityOrPort: s,
      malformedPercentEncoding: a,
      malformedSchemeSpecific: H,
      malformedHost: u,
      malformedScheme: f,
    };
  }
  function U9i(e, t) {
    if (typeof e !== "string" && typeof e !== "object") return;
    let r;
    try {
      r = typeof e === "string" ? e : Zhe(e, t);
    } catch {
      return;
    }
    let {
      normalized: s,
      malformedAuthorityOrPort: a,
      malformedPercentEncoding: H,
      malformedSchemeSpecific: u,
      malformedHost: f,
      malformedScheme: d,
    } = X9i(r, t);
    return a || H || u || f || d ? void 0 : s;
  }
  var K1r = {
    SCHEMES: R9i,
    normalize: V8a,
    resolve: q8a,
    resolveComponent: V9i,
    equal: G8a,
    serialize: Zhe,
    parse: Abt,
  };
  lbt.exports = K1r;
  lbt.exports.default = K1r;
  lbt.exports.fastUri = K1r;
});