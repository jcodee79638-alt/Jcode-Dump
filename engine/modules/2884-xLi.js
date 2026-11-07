
var xLi = Ie(function ($$c, MLi) {
  var J_r = ELi(),
    ILi = Symbol("arrayDelimiter"),
    Saa = (e) => e.replace(/\//g, "\\/"),
    DLi = (e) => e.replace(/\\\//g, "/"),
    K_r = (e) => {
      let t = [],
        r = {};
      for (let H of e.nodes) {
        let [u] = H.nodes;
        if (u.type === "tag") t.push(u.value);
      }
      let s = e.nodes.pop(),
        [a] = s.nodes;
      if (a.value === ":attr") {
        let H = K_r(a);
        if (
          (t.push(ILi, ...H.lookupProperties),
          (r.qualifiedAttribute = H.attributeMatcher.qualifiedAttribute),
          (r.operator = H.attributeMatcher.operator),
          (r.value = H.attributeMatcher.value),
          (r.attribute = H.attributeMatcher.attribute),
          H.attributeMatcher.insensitive)
        )
          r.insensitive = !0;
      } else {
        if (a.type !== "attribute")
          throw Object.assign(Error("`:attr` pseudo-class expects an attribute matcher as the last value"), {
            code: "EQUERYATTR",
          });
        if (
          ((r.qualifiedAttribute = DLi(a.qualifiedAttribute)),
          (r.operator = a.operator),
          (r.value = a.value),
          (r.attribute = r.qualifiedAttribute),
          a.insensitive)
        )
          r.insensitive = !0;
      }
      return ((e.lookupProperties = t), (e.attributeMatcher = r), (e.nodes.length = 0), e);
    },
    Taa = (e) => {
      let t = J_r.root();
      ((e.nestedNode = t), (t.nodes = [...e.nodes]), (e.nodes.length = 0));
      for (let r of t.nodes) r.parent = t;
      yLi(t);
    },
    vaa = (e) => {
      if (e.nodes.length === 3) {
        let t = e.nodes.pop().nodes[0];
        if (t.type === "tag") e.semverFunc = t.value;
        else if (t.type === "string") e.semverFunc = t.value.slice(1, -1);
        else
          throw Object.assign(Error("`:semver` pseudo-class expects a function name as last value"), {
            code: "ESEMVERFUNC",
          });
      }
      if (e.nodes.length === 1) {
        let t = e.nodes.pop();
        e.semverValue = t.nodes.reduce((r, s) => `${r}${String(s)}`, "");
      } else if (e.nodes.length === 2) {
        for (let t = 0; t < e.nodes.length; ++t) {
          let r = e.nodes[t].nodes[0].type;
          if (r === "tag" || r === "combinator") {
            let s = e.nodes.splice(t, 1)[0];
            ((e.semverValue = s.nodes.reduce((a, H) => `${a}${String(H)}`, "")), (e.semverPosition = t));
            break;
          }
        }
        if (typeof e.semverValue > "u")
          throw Object.assign(
            Error("`:semver` pseudo-class expects a static value in the first or second position"),
            { code: "ESEMVERVALUE" },
          );
      }
      if (e.nodes.length === 1) K_r(e);
      else
        ((e.attributeMatcher = { insensitive: !1, attribute: "version", qualifiedAttribute: "version" }),
          (e.lookupProperties = []));
      e.nodes.length = 0;
    },
    baa = (e) => {
      let [t] = e.nodes[0].nodes,
        { value: r } = t || {};
      ((e.typeValue = r), (e.nodes.length = 0));
    },
    jaa = (e) => {
      ((e.pathValue = DLi(String(e.nodes[0]))), (e.nodes.length = 0));
    },
    Paa = (e) => {
      if (e.nodes.length) ((e.outdatedKind = String(e.nodes[0])), (e.nodes.length = 0));
    },
    Caa = (e) => {
      let t = [];
      if (e.nodes.length) {
        for (let r of e.nodes) {
          let s = {};
          for (let a of r.nodes) {
            if (a.type !== "attribute")
              throw Object.assign(Error(':vuln pseudo-class only accepts attribute matchers or "cwe" tag'), {
                code: "EQUERYATTR",
              });
            if (!["severity", "cwe"].includes(a._attribute))
              throw Object.assign(Error(':vuln pseudo-class only matches "severity" and "cwe" attributes'), {
                code: "EQUERYATTR",
              });
            if (!a.operator) ((a.operator = "="), (a.value = "*"));
            if (a.operator !== "=")
              throw Object.assign(
                Error(':vuln pseudo-class attribute selector only accepts "=" operator', a),
                { code: "EQUERYATTR" },
              );
            if (!s[a._attribute]) s[a._attribute] = [];
            s[a._attribute].push(a._value);
          }
          t.push(s);
        }
        ((e.vulns = t), (e.nodes.length = 0));
      }
    },
    yLi = (e) => {
      e.walk((t) => {
        switch (t.value) {
          case ":attr":
            return K_r(t);
          case ":is":
          case ":has":
          case ":not":
            return Taa(t);
          case ":path":
            return jaa(t);
          case ":semver":
            return vaa(t);
          case ":type":
            return baa(t);
          case ":outdated":
            return Paa(t);
          case ":vuln":
            return Caa(t);
        }
      });
    },
    waa = (e) => {
      if (!e) return [];
      return J_r(yLi).astSync(Saa(e), { lossless: !1 });
    };
  MLi.exports = { parser: waa, arrayDelimiter: ILi };
});