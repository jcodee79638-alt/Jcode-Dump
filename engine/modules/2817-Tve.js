
var Tve = Ie(function (aLc, Mmr) {
  var ota = Tae(),
    ata = (e, t = !0) => {
      let r = [["START TREE CHECK", e.path]];
      if (!e.root || !e.root.inventory) return e;
      let { inventory: s } = e.root,
        a = new Set(),
        H = (u, f = e, d = "self") => {
          if (
            (r.push([
              "CHECK",
              u && u.location,
              f && f.location,
              d,
              "seen=" + a.has(u),
              "promise=" + !!(u && u.then),
              "root=" + !!(u && u.isRoot),
            ]),
            !u || a.has(u) || u.then)
          )
            return;
          if ((a.add(u), u.isRoot && u !== e.root))
            throw Object.assign(Error("double root"), {
              node: u.path,
              realpath: u.realpath,
              tree: e.path,
              root: e.root.path,
              via: f.path,
              viaType: d,
              log: r,
            });
          if (u.root !== e.root)
            throw Object.assign(Error("node from other root in tree"), {
              node: u.path,
              realpath: u.realpath,
              tree: e.path,
              root: e.root.path,
              via: f.path,
              viaType: d,
              otherRoot: u.root && u.root.path,
              log: r,
            });
          if (!u.isRoot && u.inventory.size !== 0)
            throw Object.assign(Error("non-root has non-zero inventory"), {
              node: u.path,
              tree: e.path,
              root: e.root.path,
              via: f.path,
              viaType: d,
              inventory: [...u.inventory.values()].map((S) => [S.path, S.location]),
              log: r,
            });
          if (!u.isRoot && !s.has(u) && !u.dummy)
            throw Object.assign(Error("not in inventory"), {
              node: u.path,
              tree: e.path,
              root: e.root.path,
              via: f.path,
              viaType: d,
              log: r,
            });
          let _ = [...u.edgesOut.values()].filter((S) => S.dev);
          if (!u.isTop && _.length)
            throw Object.assign(Error("dev edges on non-top node"), {
              node: u.path,
              tree: e.path,
              root: e.root.path,
              via: f.path,
              viaType: d,
              devEdges: _.map((S) => [S.type, S.name, S.spec, S.error]),
              log: r,
            });
          if (u.path === e.root.path && u !== e.root && !e.root.isLink)
            throw Object.assign(Error("node with same path as root"), {
              node: u.path,
              tree: e.path,
              root: e.root.path,
              via: f.path,
              viaType: d,
              log: r,
            });
          if (!u.isLink && u.path !== u.realpath)
            throw Object.assign(Error("non-link with mismatched path/realpath"), {
              node: u.path,
              tree: e.path,
              realpath: u.realpath,
              root: e.root.path,
              via: f.path,
              viaType: d,
              log: r,
            });
          let { parent: L, fsParent: I, target: D } = u;
          (H(L, u, "parent"),
            H(I, u, "fsParent"),
            H(D, u, "target"),
            r.push(["CHILDREN", u.location, ...u.children.keys()]));
          for (let S of u.children.values()) H(S, u, "children");
          for (let S of u.fsChildren) H(S, u, "fsChildren");
          for (let S of u.linksIn) H(S, u, "linksIn");
          for (let S of u.tops) H(S, u, "tops");
          r.push(["DONE", u.location]);
        };
      if ((H(e), t)) {
        for (let u of s.values())
          if (!a.has(u) && u !== e.root)
            throw Object.assign(Error("unreachable in inventory"), {
              node: u.path,
              realpath: u.realpath,
              location: u.location,
              root: e.root.path,
              tree: e.path,
              log: r,
            });
      }
      return e;
    };
  Mmr.exports = (e) => e;
  ota(() => (Mmr.exports = ata));
});