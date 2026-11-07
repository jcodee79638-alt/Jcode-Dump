
var Ove = Ie(function (I$c, qLi) {
  var nHa = eX(),
    BLi = kve(),
    iHa = Symbol.for("Arborist.Node._loadDeps"),
    yqe = Symbol.for("_target"),
    { dirname: sHa } = cr("path"),
    RLi = Symbol.for("_delistFromMeta"),
    WLi = Symbol.for("_refreshLocation");
  class VLi extends BLi {
    constructor(e) {
      let { root: t, realpath: r, target: s, parent: a, fsParent: H, isStoreLink: u } = e;
      if (!r && !(s && s.path)) throw TypeError("must provide realpath for Link node");
      super({ ...e, realpath: r || s.path, root: t || (a ? a.root : H ? H.root : s ? s.root : null) });
      if (((this.isStoreLink = u || !1), s)) this.target = s;
      else if (this.realpath === this.root.path) this.target = this.root;
      else this.target = new BLi({ ...e, path: r, parent: null, fsParent: null, root: this.root });
    }
    get version() {
      return this.target ? this.target.version : this.package.version || "";
    }
    get target() {
      return this[yqe];
    }
    set target(e) {
      let t = this[yqe];
      if (e === t) return;
      if (!e) {
        if (t && t.linksIn) t.linksIn.delete(this);
        if (this.path) (this[RLi](), (this[yqe] = null), (this.package = {}), this[WLi]());
        else this[yqe] = null;
        return;
      }
      if (!this.path) {
        if (e.path) this.realpath = e.path;
        else e.path = e.realpath = this.realpath;
        ((e.root = this.root), (this[yqe] = e), e.linksIn.add(this), (this.package = e.package));
        return;
      }
      (this[RLi](), (this.package = e.package), (this.realpath = e.path), this[WLi](), (e.root = this.root));
    }
    get resolved() {
      return this.path && this.realpath ? `file:${nHa(sHa(this.path), this.realpath)}` : null;
    }
    set resolved(e) {}
    [iHa]() {}
    get children() {
      return new Map();
    }
    set children(e) {}
    get isLink() {
      return !0;
    }
  }
  qLi.exports = VLi;
});