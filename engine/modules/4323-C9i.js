
var C9i = Ie(function (WKc, P9i) {
  var { isUUID: I8a } = V1r(),
    D8a = /^([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-./:;=@]|%[\da-f]{2})+)$/iu,
    y8a = ["http", "https", "ws", "wss", "urn", "urn:uuid"];
  function M8a(e) {
    return y8a.indexOf(e) !== -1;
  }
  function q1r(e) {
    if (e.secure === !0) return !0;
    else if (e.secure === !1) return !1;
    else if (e.scheme)
      return (
        e.scheme.length === 3 &&
        (e.scheme[0] === "w" || e.scheme[0] === "W") &&
        (e.scheme[1] === "s" || e.scheme[1] === "S") &&
        (e.scheme[2] === "s" || e.scheme[2] === "S")
      );
    else return !1;
  }
  function v9i(e) {
    if (!e.host) e.error = e.error || "HTTP URIs must have a host.";
    return e;
  }
  function b9i(e) {
    let t = String(e.scheme).toLowerCase() === "https";
    if (e.port === (t ? 443 : 80) || e.port === "") e.port = void 0;
    if (!e.path) e.path = "/";
    return e;
  }
  function x8a(e) {
    return (
      (e.secure = q1r(e)),
      (e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : "")),
      (e.path = void 0),
      (e.query = void 0),
      e
    );
  }
  function S8a(e) {
    if (e.port === (q1r(e) ? 443 : 80) || e.port === "") e.port = void 0;
    if (typeof e.secure === "boolean") ((e.scheme = e.secure ? "wss" : "ws"), (e.secure = void 0));
    if (e.resourceName) {
      let t = e.resourceName.indexOf("?"),
        r = t === -1 ? e.resourceName : e.resourceName.slice(0, t);
      ((e.path = r && r !== "/" ? r : void 0),
        (e.query = t === -1 ? void 0 : e.resourceName.slice(t + 1)),
        (e.resourceName = void 0));
    }
    return ((e.fragment = void 0), e);
  }
  function T8a(e, t) {
    if (!e.path) return ((e.error = "URN can not be parsed"), e);
    let r = e.path.match(D8a);
    if (r && r[0] === e.path) {
      let s = t.scheme || e.scheme || "urn";
      ((e.nid = r[1].toLowerCase()), (e.nss = r[2]));
      let a = `${s}:${t.nid || e.nid}`,
        H = G1r(a);
      if (((e.path = void 0), H)) e = H.parse(e, t);
    } else e.error = e.error || "URN can not be parsed.";
    return e;
  }
  function v8a(e, t) {
    if (e.nid === void 0) throw Error("URN without nid cannot be serialized");
    let r = t.scheme || e.scheme || "urn",
      s = e.nid.toLowerCase(),
      a = `${r}:${t.nid || s}`,
      H = G1r(a);
    if (H) e = H.serialize(e, t);
    let u = e,
      f = e.nss;
    return ((u.path = `${s || t.nid}:${f}`), (t.skipEscape = !0), u);
  }
  function b8a(e, t) {
    let r = e;
    if (((r.uuid = r.nss), (r.nss = void 0), !t.tolerant && (!r.uuid || !I8a(r.uuid))))
      r.error = r.error || "UUID is not valid.";
    return r;
  }
  function j8a(e) {
    let t = e;
    return ((t.nss = (e.uuid || "").toLowerCase()), t);
  }
  var j9i = { scheme: "http", domainHost: !0, parse: v9i, serialize: b9i },
    P8a = { scheme: "https", domainHost: j9i.domainHost, parse: v9i, serialize: b9i },
    abt = { scheme: "ws", domainHost: !0, parse: x8a, serialize: S8a },
    C8a = { scheme: "wss", domainHost: abt.domainHost, parse: abt.parse, serialize: abt.serialize },
    w8a = { scheme: "urn", parse: T8a, serialize: v8a, skipNormalize: !0 },
    k8a = { scheme: "urn:uuid", parse: b8a, serialize: j8a, skipNormalize: !0 },
    Hbt = { http: j9i, https: P8a, ws: abt, wss: C8a, urn: w8a, "urn:uuid": k8a };
  Object.setPrototypeOf(Hbt, null);
  function G1r(e) {
    return (e && (Hbt[e] || Hbt[e.toLowerCase()])) || void 0;
  }
  P9i.exports = { wsIsSecure: q1r, SCHEMES: Hbt, isValidSchemeName: M8a, getSchemeHandler: G1r };
});