
var jgi = Ie(function (W$c, bgi) {
  var { depth: xgi } = Poe(),
    { existsSync: Uca } = cr("fs"),
    Sgi = BV();
  class K1t {
    constructor({ actual: e, ideal: t, filterSet: r, shrinkwrapInflated: s, omit: a }) {
      if (
        ((this.omit = a),
        (this.filterSet = r),
        (this.shrinkwrapInflated = s),
        (this.children = []),
        (this.actual = e),
        (this.ideal = t),
        this.ideal)
      )
        ((this.resolved = this.ideal.resolved), (this.integrity = this.ideal.integrity));
      ((this.action = Tgi(this)),
        (this.parent = null),
        (this.leaves = []),
        (this.unchanged = []),
        (this.removed = []));
    }
    static calculate({
      actual: e,
      ideal: t,
      filterNodes: r = [],
      shrinkwrapInflated: s = new Set(),
      omit: a = new Set(),
    }) {
      let H = new Set(),
        u = new Set();
      for (let f of r) {
        let { root: d } = f;
        if (d !== t && d !== e) throw Error("invalid filterNode: outside idealTree/actualTree");
        let _ = d.target,
          L = [..._.edgesOut.values()].filter((I) => I.to && (I.to === f || I.to.target === f))[0];
        if ((H.add(d), H.add(_), H.add(t), H.add(e), L && L.to)) (H.add(L.to), H.add(L.to.target));
        (H.add(f),
          xgi({
            tree: f,
            visit: (I) => H.add(I),
            getChildren: (I) => {
              I = I.target;
              let D = I.location,
                S = t.inventory.get(D),
                T = !S ? [] : [...S.edgesOut.values()].filter((B) => B.to).map((B) => B.to),
                C = e.inventory.get(D),
                O = !C ? [] : [...C.edgesOut.values()].filter((B) => B.to).map((B) => B.to);
              if (C) {
                for (let B of C.children.values()) if (B.extraneous) u.add(B);
              }
              return T.concat(O);
            },
          }));
      }
      for (let f of u) H.add(f);
      return xgi({
        tree: new K1t({ actual: e, ideal: t, filterSet: H, shrinkwrapInflated: s, omit: a }),
        getChildren: vgi,
        leave: Fca,
      });
    }
  }
  var Tgi = ({ actual: e, ideal: t }) => {
      if (!t) return "REMOVE";
      if (!e) return t.inDepBundle ? null : "ADD";
      if (t.isRoot && e.isRoot) return null;
      if (t.version !== e.version) return "CHANGE";
      let r = t.binPaths.every((f) => Uca(f)),
        s = !t.integrity && !e.integrity,
        a = !t.resolved && !e.resolved,
        H = t.resolved && t.resolved === e.resolved;
      if (s && r && (H || a)) return null;
      if (!t.integrity || !e.integrity || !Sgi.parse(t.integrity).match(e.integrity) || !r) return "CHANGE";
      return null;
    },
    ghr = (e) => {
      if (!e) return new Map();
      if (e.isRoot && e.isLink) return ghr(e.target);
      let t = new Map();
      for (let r of [e, ...e.fsChildren]) for (let s of r.children.values()) t.set(s.path, s);
      return t;
    },
    vgi = (e) => {
      let t = [],
        { actual: r, ideal: s, unchanged: a, removed: H, filterSet: u, shrinkwrapInflated: f, omit: d } = e,
        _ = ghr(r),
        L = ghr(s);
      if (s && s.hasShrinkwrap && !f.has(s)) return (e.leaves.push(e), t);
      let I = new Set([..._.keys(), ...L.keys()]);
      for (let D of I) {
        let S = _.get(D),
          T = L.get(D);
        Nca({
          actual: S,
          ideal: T,
          children: t,
          unchanged: a,
          removed: H,
          filterSet: u,
          shrinkwrapInflated: f,
          omit: d,
        });
      }
      if (e.leaves && !t.length) e.leaves.push(e);
      return t;
    },
    Nca = ({
      actual: e,
      ideal: t,
      children: r,
      unchanged: s,
      removed: a,
      filterSet: H,
      shrinkwrapInflated: u,
      omit: f,
    }) => {
      if (H.size && !(H.has(t) || H.has(e))) return;
      if (t?.shouldOmit?.(f)) t.inert = !0;
      if (t?.inert) t = void 0;
      if (!e && !t) return;
      let d = Tgi({ actual: e, ideal: t });
      if (d || (!u.has(t) && t.hasShrinkwrap)) {
        if (d === "REMOVE") a.push(e);
        r.push(new K1t({ actual: e, ideal: t, filterSet: H, shrinkwrapInflated: u, omit: f }));
      } else {
        s.push(t);
        let _ = t.package.bundleDependencies;
        if (e && _ && _.length) {
          let L = [];
          for (let I of e.children.values()) if (I.inBundle) L.push(I);
          for (let I of L) I.parent = t;
        }
        r.push(
          ...vgi({
            actual: e,
            ideal: t,
            unchanged: s,
            removed: a,
            filterSet: H,
            shrinkwrapInflated: u,
            omit: f,
          }),
        );
      }
    },
    Fca = (e, t) => (
      t.forEach((r) => {
        ((r.parent = e),
          e.leaves.push(...r.leaves),
          e.unchanged.push(...r.unchanged),
          e.removed.push(...r.removed));
      }),
      (e.children = t),
      e
    );
  bgi.exports = K1t;
});