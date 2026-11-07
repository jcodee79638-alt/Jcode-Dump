
var QLi = Ie(function (D$c, zLi) {
  var oHa = eB()("en"),
    { log: GLi } = mg(),
    { redact: aHa } = y4e(),
    XLi = Smr(),
    KLi = Cmr(),
    { KEEP: HHa, CONFLICT: b1t } = KLi,
    cHa = Tae(),
    AHa = Ove(),
    Mqe = f1t(),
    JLi = xmr();
  class rhr {
    constructor(e) {
      if (
        ((this.auditReport = e.auditReport),
        (this.dep = e.dep),
        (this.edge = e.edge),
        (this.explicitRequest = e.explicitRequest),
        (this.force = e.force),
        (this.installLinks = e.installLinks),
        (this.installStrategy = e.installStrategy),
        (this.legacyPeerDeps = e.legacyPeerDeps),
        (this.parent = e.parent || null),
        (this.preferDedupe = e.preferDedupe),
        (this.strictPeerDeps = e.strictPeerDeps),
        (this.updateNames = e.updateNames),
        (this.canPlace = null),
        (this.canPlaceSelf = null),
        (this.checks = new Map()),
        (this.children = []),
        (this.needEvaluation = new Set()),
        (this.peerConflict = null),
        (this.placed = null),
        (this.target = null),
        (this.current = this.edge.to),
        (this.name = this.edge.name),
        (this.top = this.parent?.top || this),
        this.edge.to &&
          !this.edge.error &&
          !this.explicitRequest &&
          !this.updateNames.includes(this.edge.name) &&
          !this.auditReport?.isVulnerable(this.edge.to))
      )
        return;
      let t = this.getStartNode();
      for (let H of t.ancestry()) {
        let u = H.edgesOut.get(this.edge.name);
        if (!H.isTop && u && u.peer) continue;
        let f = new KLi({
          dep: this.dep,
          edge: this.edge,
          parent: this.parent && this.parent.canPlace,
          target: H,
          preferDedupe: this.preferDedupe,
          explicitRequest: this.explicitRequest,
        });
        if ((this.checks.set(H, f), f.canPlaceSelf !== b1t)) this.canPlaceSelf = f;
        if (f.canPlace !== b1t) this.canPlace = f;
        else break;
        if (this.dep.errors.length) break;
        if (this.installStrategy === "nested") break;
        if (this.installStrategy === "shallow") {
          let d = H.resolveParent;
          if (d && d.isProjectRoot) break;
        }
      }
      if (!this.canPlace) {
        if (!this.force && (this.isMine || this.strictPeerDeps)) return this.failPeerConflict();
        if (!this.canPlaceSelf) {
          this.warnPeerConflict();
          return;
        }
        this.canPlace = this.canPlaceSelf;
      }
      if (!this.canPlace) {
        cHa(() => {
          throw Error("canPlace not set, but trying to place in tree");
        });
        return;
      }
      let { target: r } = this.canPlace;
      if (
        (GLi.silly(
          "placeDep",
          r.location || "ROOT",
          `${this.dep.name}@${this.dep.version}`,
          this.canPlace.description,
          `for: ${this.edge.from.package._id || this.edge.from.location}`,
          `want: ${aHa(this.edge.spec || "*")}`,
        ),
        (this.canPlace.canPlace === b1t ? this.canPlace.canPlaceSelf : this.canPlace.canPlace) === HHa)
      ) {
        if (this.edge.peer && !this.edge.valid) this.warnPeerConflict();
        this.pruneDedupable(r);
        return;
      }
      for (let H = r; H; H = H.resolveParent)
        if (H.matches(this.dep) && !H.isTop) {
          this.placed = new AHa({ parent: r, target: H });
          return;
        }
      let a = this.dep.parent;
      if (
        ((this.placed = new this.dep.constructor({
          name: this.dep.name,
          pkg: this.dep.package,
          resolved: this.dep.resolved,
          integrity: this.dep.integrity,
          installLinks: this.installLinks,
          legacyPeerDeps: this.legacyPeerDeps,
          error: this.dep.errors[0],
          ...(this.dep.overrides ? { overrides: this.dep.overrides } : {}),
          ...(this.dep.isLink ? { target: this.dep.target, realpath: this.dep.realpath } : {}),
        })),
        (this.oldDep = r.children.get(this.name)),
        this.oldDep)
      )
        this.replaceOldDep();
      else this.placed.parent = r;
      if (this.edge.peer && !this.placed.satisfies(this.edge)) this.warnPeerConflict();
      if (this.edge.valid && this.edge.to && this.edge.to !== this.placed)
        this.pruneDedupable(this.edge.to, !1);
      for (let H of r.root.inventory.query("name", this.name))
        if (H.isDescendantOf(r) && !H.isTop) {
          if ((this.pruneDedupable(H, !1), H.root === r.root))
            for (let u of H.children.values()) this.pruneDedupable(u, !1);
        }
      for (let H of this.placed.edgesOut.values()) {
        if (H.valid || !H.peer || H.peerConflicted) continue;
        let u = a.children.get(H.name);
        if (!u) continue;
        if (!u.satisfies(H)) continue;
        this.children.push(
          new rhr({
            auditReport: this.auditReport,
            explicitRequest: this.explicitRequest,
            force: this.force,
            installLinks: this.installLinks,
            installStrategy: this.installStrategy,
            legacyPeerDeps: this.legacyPeerDeps,
            preferDedupe: this.preferDedupe,
            strictPeerDeps: this.strictPeerDeps,
            updateNames: this.updateName,
            parent: this,
            dep: u,
            node: this.placed,
            edge: H,
          }),
        );
      }
    }
    replaceOldDep() {
      let e = this.oldDep.parent,
        t = [];
      for (let [s, a] of this.oldDep.edgesOut.entries())
        if (!this.placed.edgesOut.has(s) && a.to) t.push(...Mqe([a.to], (H) => H.to !== a.to));
      let r = [];
      for (let s of this.oldDep.edgesIn) {
        if (this.placed.satisfies(s) || !s.peer || s.from.parent !== e || s.peerConflicted) continue;
        for (let a of JLi(s.from).keys()) {
          let H = a.to;
          if (XLi(H) !== e && !(a.from.isProjectRoot || a.from.isWorkspace))
            r.push(...Mqe([H], (f) => f.to !== H && !f.peerConflicted));
          else this.warnPeerConflict(s, this.dep);
        }
      }
      (this.placed.replace(this.oldDep), this.pruneForReplacement(this.placed, t));
      for (let s of r) {
        for (let a of s.edgesIn) this.needEvaluation.add(a.from);
        s.root = null;
      }
    }
    pruneForReplacement(e, t) {
      let r = new Set([...e.edgesOut.values()].filter((a) => a.to && !a.valid).map((a) => a.to));
      for (let a of t) {
        let H = Mqe([a], (u) => u.to !== a && u.valid);
        for (let u of H) r.add(u);
      }
      let s = Mqe(r, (a) => a.from !== e && a.to !== e && a.valid);
      for (let a of s) a.root = null;
    }
    pruneDedupable(e, t = !0) {
      if (e.canDedupe(this.preferDedupe, this.explicitRequest)) {
        let r = Mqe([e], (s) => s.to !== e && s.valid);
        for (let s of r) s.root = null;
        return;
      }
      if (t) {
        let r = (H, u) => oHa(H.location, u.location),
          s = [...e.children.values()].sort(r);
        for (let H of s) this.pruneDedupable(H);
        let a = [...e.fsChildren].sort(r);
        for (let H of a) {
          let u = [...H.children.values()].sort(r);
          for (let f of u) this.pruneDedupable(f);
        }
      }
    }
    get isMine() {
      let { edge: e } = this.top,
        { from: t } = e;
      if (t.isWorkspace || t.isProjectRoot) return !0;
      if (!e.peer) return !1;
      let r = !1;
      for (let s of t.edgesIn) {
        if (s.peer) {
          r = !0;
          continue;
        }
        if (s.from.isWorkspace || s.from.isProjectRoot) return !0;
      }
      if (r) {
        for (let s of JLi(t).keys()) if (s.from.isWorkspace || s.from.isProjectRoot) return !0;
      }
      return !1;
    }
    warnPeerConflict(e, t) {
      ((e = e || this.edge), (t = t || this.dep), (e.peerConflicted = !0));
      let r = this.explainPeerConflict(e, t);
      GLi.warn("ERESOLVE", "overriding peer dependency", r);
    }
    failPeerConflict(e, t) {
      ((e = e || this.top.edge), (t = t || this.top.dep));
      let r = this.explainPeerConflict(e, t);
      throw Object.assign(Error("could not resolve"), r);
    }
    explainPeerConflict(e, t) {
      let { from: r } = e,
        s = r.resolve(e.name),
        a = {
          code: "ERESOLVE",
          edge: e.explain(),
          dep: t.explain(e),
          force: this.force,
          isMine: this.isMine,
          strictPeerDeps: this.strictPeerDeps,
        };
      if (this.parent)
        ((a.current = s && s.explain(e)), (a.peerConflict = this.current && this.current.explain(this.edge)));
      else if (
        ((a.current = s && s.explain()), this.canPlaceSelf && this.canPlaceSelf.canPlaceSelf !== b1t)
      ) {
        let H = this.canPlaceSelf;
        for (let u of H.conflictChildren)
          if (u.current) {
            a.peerConflict = { current: u.current.explain(), peer: u.dep.explain(u.edge) };
            break;
          }
      } else
        a.peerConflict = {
          current: this.current && this.current.explain(),
          peer: this.dep.explain(this.edge),
        };
      return a;
    }
    getStartNode() {
      let e = this.parent?.getStartNode() || this.edge.from;
      return XLi(e, this.name);
    }
    get allChildren() {
      let e = new Set(this.children);
      for (let t of e) for (let r of t.children) e.add(r);
      return [...e];
    }
  }
  zLi.exports = rhr;
});