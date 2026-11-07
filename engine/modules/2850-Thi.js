
var Thi = Ie(function (BLc, Shi) {
  var p1t = eB()("en"),
    d1t = cr("util"),
    Mna = eX();
  class m1t {
    constructor(e, t) {
      if (((this.name = e.name), e.packageName && e.packageName !== this.name))
        this.packageName = e.packageName;
      if (e.version) this.version = e.version;
      if (((this.location = e.location), (this.path = e.path), e.realpath !== this.path))
        this.realpath = e.realpath;
      if (e.resolved !== null) this.resolved = e.resolved;
      if (e.extraneous) this.extraneous = !0;
      if (e.dev) this.dev = !0;
      if (e.optional) this.optional = !0;
      if (e.devOptional && !e.dev && !e.optional) this.devOptional = !0;
      if (e.peer) this.peer = !0;
      if (e.inBundle) this.bundled = !0;
      if (e.inDepBundle) this.bundler = e.getBundler().location;
      if (e.isProjectRoot) this.isProjectRoot = !0;
      if (e.isWorkspace) this.isWorkspace = !0;
      let r = e.package && e.package.bundleDependencies;
      if (r && r.length) this.bundleDependencies = r;
      if (e.inShrinkwrap) this.inShrinkwrap = !0;
      else if (e.hasShrinkwrap) this.hasShrinkwrap = !0;
      if (e.error) this.error = Ihi(e.error);
      if (e.errors && e.errors.length) this.errors = e.errors.map(Ihi);
      if (e.overrides)
        this.overrides = new Map([...e.overrides.ruleset.values()].map((s) => [s.key, s.value]));
      if (e.edgesOut.size)
        this.edgesOut = new Map(
          [...e.edgesOut.entries()].sort(([s], [a]) => p1t(s, a)).map(([s, a]) => [s, new Mhi(a)]),
        );
      if (e.edgesIn.size)
        this.edgesIn = new Set(
          [...e.edgesIn].sort((s, a) => p1t(s.from.location, a.from.location)).map((s) => new xhi(s)),
        );
      if (e.workspaces && e.workspaces.size)
        this.workspaces = new Map([...e.workspaces.entries()].map(([s, a]) => [s, Mna(e.root.realpath, a)]));
      if (e.fsChildren.size)
        this.fsChildren = new Set(
          [...e.fsChildren].sort(({ path: s }, { path: a }) => p1t(s, a)).map((s) => dqe(s, t)),
        );
      if (e.children.size)
        this.children = new Map(
          [...e.children.entries()].sort(([s], [a]) => p1t(s, a)).map(([s, a]) => [s, dqe(a, t)]),
        );
    }
  }
  class Dhi extends m1t {
    constructor(e, t) {
      super(e, t);
      this.sourceReference = dqe(e.sourceReference, t);
    }
  }
  class yhi extends m1t {
    constructor(e, t) {
      super(e, t);
      this.target = dqe(e.target, t);
    }
  }
  var Ihi = ({ code: e, path: t }) => ({ code: e, ...(t ? { path: t } : {}) });
  class p_r {
    constructor(e) {
      if (((this.type = e.type), (this.name = e.name), (this.spec = e.rawSpec || "*"), e.rawSpec !== e.spec))
        this.override = e.spec;
      if (e.error) this.error = e.error;
      if (e.peerConflicted) this.peerConflicted = e.peerConflicted;
    }
  }
  class Mhi extends p_r {
    constructor(e) {
      super(e);
      this.to = e.to && e.to.location;
    }
    [d1t.inspect.custom]() {
      return `{ ${this.type} ${this.name}@${this.spec}${this.override ? ` overridden:${this.override}` : ""}${this.to ? " -> " + this.to : ""}${this.error ? " " + this.error : ""}${this.peerConflicted ? " peerConflicted" : ""} }`;
    }
  }
  class xhi extends p_r {
    constructor(e) {
      super(e);
      this.from = e.from && e.from.location;
    }
    [d1t.inspect.custom]() {
      return `{ ${this.from || '""'} ${this.type} ${this.name}@${this.spec}${this.error ? " " + this.error : ""}${this.peerConflicted ? " peerConflicted" : ""} }`;
    }
  }
  var dqe = (e, t = []) => {
    if (!e) return e;
    let r = e.isLink ? yhi : e.sourceReference ? Dhi : m1t;
    if (t.includes(e)) {
      let s = Object.create(r.prototype);
      return Object.assign(s, { location: e.location });
    }
    return (t.push(e), new r(e, t));
  };
  Shi.exports = dqe;
});