
var HEt = Ie(function (Puc, kYn) {
  var { log: POo } = mg(),
    COo = eB()("en"),
    wOo = ({ pkg: e, add: t, saveBundle: r, saveType: s }) => {
      for (let { name: a, rawSpec: H } of t) {
        let u = s;
        if (!u) u = kOo(e, a);
        if (u === "prod")
          (Jme(e, "devDependencies", a, "dependencies"), Jme(e, "peerDependencies", a, "dependencies"));
        else if (u === "dev") Jme(e, "dependencies", a, "devDependencies");
        else if (u === "optional") Jme(e, "peerDependencies", a, "optionalDependencies");
        else
          (Jme(e, "dependencies", a, "peerDependencies"),
            Jme(e, "optionalDependencies", a, "peerDependencies"));
        let f = O7e.get(u);
        if (((e[f] = e[f] || {}), H !== "*" || e[f][a] === void 0)) e[f][a] = H;
        if (u === "optional")
          ((e.dependencies = e.dependencies || {}), (e.dependencies[a] = e.optionalDependencies[a]));
        if (u === "peer" || u === "peerOptional") {
          let d = e.peerDependenciesMeta || {};
          if (u === "peer" && d[a] && d[a].optional) d[a].optional = !1;
          else if (u === "peerOptional")
            ((d[a] = d[a] || {}), (d[a].optional = !0), (e.peerDependenciesMeta = d));
          if (e.devDependencies && e.devDependencies[a] !== void 0)
            e.devDependencies[a] = e.peerDependencies[a];
        }
        if (r && u !== "peer" && u !== "peerOptional") {
          let d = new Set(e.bundleDependencies || []);
          (d.add(a), (e.bundleDependencies = [...d].sort(COo)));
        }
      }
      return e;
    },
    O7e = new Map([
      ["dev", "devDependencies"],
      ["optional", "optionalDependencies"],
      ["prod", "dependencies"],
      ["peerOptional", "peerDependencies"],
      ["peer", "peerDependencies"],
    ]),
    kOo = (e, t) => {
      for (let r of O7e.keys())
        if (aEt(e, O7e.get(r), t)) {
          if (
            r === "peerOptional" &&
            (!aEt(e, "peerDependenciesMeta", t) || !e.peerDependenciesMeta[t].optional)
          )
            return "peer";
          return r;
        }
      return "prod";
    },
    aEt = (e, t, r) => e[t] && Object.prototype.hasOwnProperty.call(e[t], r),
    Jme = (e, t, r, s) => {
      if (aEt(e, t, r)) {
        if (s) POo.warn("idealTree", `Removing ${t}.${r} in favor of ${s}.${r}`);
        if ((delete e[t][r], t === "peerDependencies" && e.peerDependenciesMeta)) {
          if ((delete e.peerDependenciesMeta[r], !Object.keys(e.peerDependenciesMeta).length))
            delete e.peerDependenciesMeta;
        }
        if (!Object.keys(e[t]).length) delete e[t];
      }
    },
    OOo = (e, t) => {
      for (let r of new Set(O7e.values())) for (let s of t) Jme(e, r, s);
      if (e.bundleDependencies) {
        if (
          ((e.bundleDependencies = e.bundleDependencies.filter((r) => !t.includes(r))),
          !e.bundleDependencies.length)
        )
          delete e.bundleDependencies;
      }
      return e;
    };
  kYn.exports = { add: wOo, rm: OOo, saveTypeMap: O7e, hasSubKey: aEt };
});