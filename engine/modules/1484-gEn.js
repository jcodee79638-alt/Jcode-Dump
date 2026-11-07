
class gEn {
  constructor(e = {}) {
    this.options = {
      ignoreTrailingSlash: !0,
      ignoreDuplicateSlashes: !0,
      caseSensitive: !1,
      maxParamLength: 100,
      ...e,
    };
  }
  options;
  routes = [];
  trees = {};
  on(e, t, r) {
    let s = t.match(Inr);
    if (s && s.index !== void 0) {
      tKs(
        t.length === s.index + s[0].length,
        "Optional Parameter needs to be the last parameter of the path",
      );
      let H = t.replace(Inr, "$1$2"),
        u = t.replace(Inr, "$2");
      (this.on(e, H, r), this.on(e, u, r));
      return;
    }
    if (this.options.ignoreDuplicateSlashes) t = _En(t);
    if (this.options.ignoreTrailingSlash) t = hEn(t);
    let a = typeof e === "string" ? [e] : e;
    for (let H of a) this._on(H, t, r);
  }
  all(e, t) {
    this.on(aKs, e, t);
  }
  _on(e, t, r) {
    if (this.trees[e] === void 0) this.trees[e] = new Z3e("/");
    let s = t;
    if (s === "*" && this.trees[e].prefix.length !== 0) {
      let d = this.trees[e];
      ((this.trees[e] = new Z3e("")), (this.trees[e].staticChildren["/"] = d));
    }
    let a = this.trees[e].prefix.length,
      H = this.trees[e],
      u = [];
    for (let d = 0; d <= s.length; d++) {
      if (s.charCodeAt(d) === 58 && s.charCodeAt(d + 1) === 58) {
        d++;
        continue;
      }
      let _ = s.charCodeAt(d) === 58 && s.charCodeAt(d + 1) !== 58,
        L = s.charCodeAt(d) === 42;
      if (_ || L || (d === s.length && d !== a)) {
        let I = s.slice(a, d);
        if (!this.options.caseSensitive) I = I.toLowerCase();
        ((I = I.split("::").join(":")), (I = I.split("%").join("%25")), (H = H.createStaticChild(I)));
      }
      if (_) {
        let I = !1,
          D = [],
          S = d + 1;
        for (let T = S; ; T++) {
          let C = s.charCodeAt(T),
            O = C === 40,
            B = C === 45 || C === 46,
            V = C === 47 || T === s.length;
          if (O || B || V) {
            let q = s.slice(S, T);
            if ((u.push(q), (I = I || O || B), O)) {
              let ae = nKs(s, T),
                z = s.slice(T, ae + 1);
              (D.push(iKs(z)), (T = ae + 1));
            } else D.push("(.*?)");
            let Z = T;
            for (; T < s.length; T++) {
              let ae = s.charCodeAt(T);
              if (ae === 47) break;
              if (ae === 58)
                if (s.charCodeAt(T + 1) === 58) T++;
                else break;
            }
            let se = s.slice(Z, T);
            if (se) ((se = se.split("::").join(":")), (se = se.split("%").join("%25")), D.push(sKs(se)));
            if (((S = T + 1), V || s.charCodeAt(T) === 47 || T === s.length)) {
              let ae = I ? "()" + se : se,
                z = s.slice(d, T);
              ((s = s.slice(0, d + 1) + ae + s.slice(T)), (d += ae.length));
              let Ae = I ? new RegExp("^" + D.join("") + "$") : void 0;
              ((H = H.createParametricChild(Ae, se, z)), (a = d + 1));
              break;
            }
          }
        }
      } else if (L) {
        if ((u.push("*"), (H = H.createWildcardChild()), (a = d + 1), d !== s.length - 1))
          throw Error("Wildcard must be the last character in the route");
      }
    }
    if (!this.options.caseSensitive) s = s.toLowerCase();
    if (s === "*") s = "/*";
    for (let d of this.routes)
      if (d.method === e && d.pattern === s) throw Error(`Method '${e}' already declared for route '${s}'`);
    let f = { method: e, path: t, pattern: s, params: u, handler: r };
    (this.routes.push(f), H.addRoute(f));
  }
  has(e, t) {
    let r = this.trees[e];
    if (r === void 0) return !1;
    let s = r.getStaticChild(t);
    if (s === void 0) return !1;
    return s.isLeafNode;
  }
  find(e, t) {
    let r = this.trees[e];
    if (r === void 0) return;
    if (t.charCodeAt(0) !== 47) t = t.replace(eKs, "/");
    if (this.options.ignoreDuplicateSlashes) t = _En(t);
    let s, a, H;
    try {
      ((s = oKs(t)), (t = s.path), (a = s.querystring), (H = s.shouldDecodeParam));
    } catch (D) {
      return;
    }
    if (this.options.ignoreTrailingSlash) t = hEn(t);
    let u = t;
    if (this.options.caseSensitive === !1) t = t.toLowerCase();
    let f = this.options.maxParamLength,
      d = r.prefix.length,
      _ = [],
      L = t.length,
      I = [];
    while (!0) {
      if (d === L && r.isLeafNode) {
        let S = r.handlerStorage?.find();
        if (S !== void 0) return { handler: S.handler, params: S.createParams(_), searchParams: dEn(a) };
      }
      let D = r.getNextNode(t, d, I, _.length);
      if (D === void 0) {
        if (I.length === 0) return;
        let S = I.pop();
        ((d = S.brotherPathIndex), _.splice(S.paramsCount), (D = S.brotherNode));
      }
      if (((r = D), r._tag === "StaticNode")) {
        d += r.prefix.length;
        continue;
      }
      if (r._tag === "WildcardNode") {
        let S = u.slice(d);
        if (H) S = LEn(S);
        (_.push(S), (d = L));
        continue;
      }
      if (r._tag === "ParametricNode") {
        let S = u.indexOf("/", d);
        if (S === -1) S = L;
        let T = u.slice(d, S);
        if (H) T = LEn(T);
        if (r.regex !== void 0) {
          let C = r.regex.exec(T);
          if (C === null) continue;
          for (let O = 1; O < C.length; O++) {
            let B = C[O];
            if (B.length > f) return;
            _.push(B);
          }
        } else {
          if (T.length > f) return;
          _.push(T);
        }
        d = S;
      }
    }
  }
}