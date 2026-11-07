
var Cmr = Ie(function (ALc, e_i) {
  var Ymi = eB()("en"),
    Zmi = Qj(),
    Tmr = Tae(),
    Ata = xmr(),
    vmr = Smr(),
    MB = Symbol("CONFLICT"),
    bmr = Symbol("OK"),
    y_e = Symbol("REPLACE"),
    jmr = Symbol("KEEP");
  class Pmr {
    constructor(e) {
      let {
        dep: t,
        target: r,
        edge: s,
        preferDedupe: a,
        parent: H = null,
        peerPath: u = [],
        explicitRequest: f = !1,
      } = e;
      if (
        (Tmr(() => {
          if (!t) throw Error("no dep provided to CanPlaceDep");
          if (!r) throw Error("no target provided to CanPlaceDep");
          if (!s) throw Error("no edge provided to CanPlaceDep");
          this._treeSnapshot = JSON.stringify(
            [...r.root.inventory.entries()]
              .map(([d, { packageName: _, version: L, resolved: I }]) => [d, _, L, I])
              .sort(([d], [_]) => Ymi(d, _)),
          );
        }),
        (this.canPlace = null),
        (this.canPlaceSelf = null),
        (this.dep = t),
        (this.target = r),
        (this.edge = s),
        (this.explicitRequest = f),
        (this.peerPath = u),
        (this.preferDedupe = !!a || s.peer),
        (this.parent = H),
        (this.children = []),
        (this.isSource = r === this.peerSetSource),
        (this.name = s.name),
        (this.current = r.children.get(this.name)),
        (this.targetEdge = r.edgesOut.get(this.name)),
        (this.conflicts = new Map()),
        (this.edgeOverride = !t.satisfies(s)),
        (this.canPlace = this.checkCanPlace()),
        !this.canPlaceSelf)
      )
        this.canPlaceSelf = this.canPlace;
      Tmr(() => {
        let d = JSON.stringify(
          [...r.root.inventory.entries()]
            .map(([_, { packageName: L, version: I, resolved: D }]) => [_, L, I, D])
            .sort(([_], [L]) => Ymi(_, L)),
        );
        if (this._treeSnapshot !== d)
          throw Object.assign(Error("tree changed in CanPlaceDep"), {
            expect: this._treeSnapshot,
            actual: d,
          });
      });
    }
    checkCanPlace() {
      let { target: e, targetEdge: t, current: r, dep: s } = this;
      if (s.errors.length) return r ? y_e : bmr;
      if (t && t.peer && !e.isTop) return MB;
      if (!r && t && !s.satisfies(t) && t !== this.edge) return MB;
      return r ? this.checkCanPlaceCurrent() : this.checkCanPlaceNoCurrent();
    }
    checkCanPlaceCurrent() {
      let { preferDedupe: e, explicitRequest: t, current: r, target: s, edge: a, dep: H } = this;
      if (H.matches(r)) {
        if (r.satisfies(a) || this.edgeOverride) return t ? y_e : jmr;
      }
      let { version: u } = r,
        { version: f } = H,
        d = u && f && Zmi.gte(f, u);
      if (d && H.canReplace(r)) {
        let I = this.canPlacePeers(y_e);
        if (I !== MB) return I;
      }
      if (r.satisfies(a) && (!t || e)) return jmr;
      if (e && !d && H.canReplace(r)) {
        let I = this.canPlacePeers(y_e);
        if (I !== MB) return I;
      }
      let _ = this.deepestNestingTarget;
      if (s !== _) return MB;
      if (!a.peer && s === a.from) return this.canPlacePeers(y_e);
      if (!this.parent && !a.peer) return MB;
      let L = !0;
      for (let [I, D] of Ata(r)) {
        if (I === this.edge || I === this.peerEntryEdge) continue;
        let S = I.to,
          T = H.parent.children.get(S.name);
        if (T) {
          if (T.canReplace(S, H.parent.children.keys())) continue;
        }
        let C = !T;
        if (!T) {
          let B = new Set([S]);
          e: for (let V of B)
            for (let q of V.edgesOut.values()) {
              if (!q.peer || !q.valid) continue;
              let Z = H.parent.children.get(q.name);
              if (!Z) {
                if (q.to) B.add(q.to);
                continue;
              }
              if (!Z.satisfies(q)) {
                C = !1;
                break e;
              }
            }
        }
        if (C) continue;
        let O = !0;
        for (let B of D) {
          if (!O) break;
          let V = vmr(I.from, B.name);
          if (V === s || s.isDescendantOf(V)) ((O = !1), (L = !1));
          if (O) continue;
        }
      }
      if (L) return this.canPlacePeers(y_e);
      return MB;
    }
    checkCanPlaceNoCurrent() {
      let { target: e, peerEntryEdge: t, dep: r, name: s } = this,
        a = e !== t.from && e.resolve(s);
      if (a) {
        for (let H of a.edgesIn.values())
          if (H.from.isDescendantOf(e) && H.valid) {
            if (!r.satisfies(H)) return MB;
          }
      }
      return this.canPlacePeers(bmr);
    }
    get deepestNestingTarget() {
      let e = this.parent ? this.parent.deepestNestingTarget : this.edge.from;
      return vmr(e, this.name);
    }
    get conflictChildren() {
      return this.allChildren.filter((e) => e.canPlace === MB);
    }
    get allChildren() {
      let e = new Set(this.children);
      for (let t of e) for (let r of t.children) e.add(r);
      return [...e];
    }
    get top() {
      return this.parent ? this.parent.top : this;
    }
    canPlacePeers(e) {
      if (((this.canPlaceSelf = e), this._canPlacePeers)) return this._canPlacePeers;
      let t = [...this.peerPath, this.dep],
        r = !1;
      for (let s of this.dep.edgesOut.values()) {
        if (!s.peer || !s.to || t.includes(s.to)) continue;
        let a = s.to,
          H = vmr(this.target, a.name),
          u = new Pmr({ dep: a, target: H, parent: this, edge: s, peerPath: t, preferDedupe: !0 });
        if (
          (Tmr(() => {
            if (this.children.some((f) => f.dep === u.dep)) throw Error("checking same dep repeatedly");
          }),
          this.children.push(u),
          u.canPlace === MB)
        )
          r = !0;
      }
      return ((this._canPlacePeers = r ? MB : e), this._canPlacePeers);
    }
    get peerSetSource() {
      return this.parent ? this.parent.peerSetSource : this.edge.from;
    }
    get peerEntryEdge() {
      return this.top.edge;
    }
    static get CONFLICT() {
      return MB;
    }
    static get OK() {
      return bmr;
    }
    static get REPLACE() {
      return y_e;
    }
    static get KEEP() {
      return jmr;
    }
    get description() {
      let { canPlace: e } = this;
      return (e && e.description) || e;
    }
  }
  e_i.exports = Pmr;
});