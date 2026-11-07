
var Xfi = Ie(function (qfi) {
  Object.defineProperty(qfi, "__esModule", { value: !0 });
  qfi.TrustedMetadataStore = void 0;
  var ld = Eyt(),
    Of = yyt();
  class Vfi {
    trustedSet = {};
    referenceTime;
    constructor(e) {
      ((this.referenceTime = new Date()), this.loadTrustedRoot(e));
    }
    get root() {
      if (!this.trustedSet.root) throw ReferenceError("No trusted root metadata");
      return this.trustedSet.root;
    }
    get timestamp() {
      return this.trustedSet.timestamp;
    }
    get snapshot() {
      return this.trustedSet.snapshot;
    }
    get targets() {
      return this.trustedSet.targets;
    }
    getRole(e) {
      return this.trustedSet[e];
    }
    updateRoot(e) {
      let t = JSON.parse(e.toString("utf8")),
        r = ld.Metadata.fromJSON(ld.MetadataKind.Root, t);
      if (r.signed.type != ld.MetadataKind.Root)
        throw new Of.RepositoryError(`Expected 'root', got ${r.signed.type}`);
      if (
        (this.root.verifyDelegate(ld.MetadataKind.Root, r), r.signed.version != this.root.signed.version + 1)
      )
        throw new Of.BadVersionError(
          `Expected version ${this.root.signed.version + 1}, got ${r.signed.version}`,
        );
      return (r.verifyDelegate(ld.MetadataKind.Root, r), (this.trustedSet.root = r), r);
    }
    updateTimestamp(e) {
      if (this.snapshot) throw new Of.RuntimeError("Cannot update timestamp after snapshot");
      if (this.root.signed.isExpired(this.referenceTime))
        throw new Of.ExpiredMetadataError("Final root.json is expired");
      let t = JSON.parse(e.toString("utf8")),
        r = ld.Metadata.fromJSON(ld.MetadataKind.Timestamp, t);
      if (r.signed.type != ld.MetadataKind.Timestamp)
        throw new Of.RepositoryError(`Expected 'timestamp', got ${r.signed.type}`);
      if ((this.root.verifyDelegate(ld.MetadataKind.Timestamp, r), this.timestamp)) {
        if (r.signed.version < this.timestamp.signed.version)
          throw new Of.BadVersionError(
            `New timestamp version ${r.signed.version} is less than current version ${this.timestamp.signed.version}`,
          );
        if (r.signed.version === this.timestamp.signed.version)
          throw new Of.EqualVersionError(
            `New timestamp version ${r.signed.version} is equal to current version ${this.timestamp.signed.version}`,
          );
        let s = this.timestamp.signed.snapshotMeta,
          a = r.signed.snapshotMeta;
        if (a.version < s.version)
          throw new Of.BadVersionError(
            `New snapshot version ${a.version} is less than current version ${s.version}`,
          );
      }
      return ((this.trustedSet.timestamp = r), this.checkFinalTimestamp(), r);
    }
    updateSnapshot(e, t = !1) {
      if (!this.timestamp) throw new Of.RuntimeError("Cannot update snapshot before timestamp");
      if (this.targets) throw new Of.RuntimeError("Cannot update snapshot after targets");
      this.checkFinalTimestamp();
      let r = this.timestamp.signed.snapshotMeta;
      if (!t) r.verify(e);
      let s = JSON.parse(e.toString("utf8")),
        a = ld.Metadata.fromJSON(ld.MetadataKind.Snapshot, s);
      if (a.signed.type != ld.MetadataKind.Snapshot)
        throw new Of.RepositoryError(`Expected 'snapshot', got ${a.signed.type}`);
      if ((this.root.verifyDelegate(ld.MetadataKind.Snapshot, a), this.snapshot))
        Object.entries(this.snapshot.signed.meta).forEach(([H, u]) => {
          let f = a.signed.meta[H];
          if (!f) throw new Of.RepositoryError(`Missing file ${H} in new snapshot`);
          if (f.version < u.version)
            throw new Of.BadVersionError(
              `New version ${f.version} of ${H} is less than current version ${u.version}`,
            );
        });
      return ((this.trustedSet.snapshot = a), this.checkFinalSnapsnot(), a);
    }
    updateDelegatedTargets(e, t, r) {
      if (!this.snapshot) throw new Of.RuntimeError("Cannot update delegated targets before snapshot");
      this.checkFinalSnapsnot();
      let s = this.trustedSet[r];
      if (!s) throw new Of.RuntimeError(`No trusted ${r} metadata`);
      let a = this.snapshot.signed.meta?.[`${t}.json`];
      if (!a) throw new Of.RepositoryError(`Missing ${t}.json in snapshot`);
      a.verify(e);
      let H = JSON.parse(e.toString("utf8")),
        u = ld.Metadata.fromJSON(ld.MetadataKind.Targets, H);
      if (u.signed.type != ld.MetadataKind.Targets)
        throw new Of.RepositoryError(`Expected 'targets', got ${u.signed.type}`);
      s.verifyDelegate(t, u);
      let f = u.signed.version;
      if (f != a.version)
        throw new Of.BadVersionError(`Version ${f} of ${t} does not match snapshot version ${a.version}`);
      if (u.signed.isExpired(this.referenceTime)) throw new Of.ExpiredMetadataError(`${t}.json is expired`);
      this.trustedSet[t] = u;
    }
    loadTrustedRoot(e) {
      let t = JSON.parse(e.toString("utf8")),
        r = ld.Metadata.fromJSON(ld.MetadataKind.Root, t);
      if (r.signed.type != ld.MetadataKind.Root)
        throw new Of.RepositoryError(`Expected 'root', got ${r.signed.type}`);
      (r.verifyDelegate(ld.MetadataKind.Root, r), (this.trustedSet.root = r));
    }
    checkFinalTimestamp() {
      if (!this.timestamp) throw ReferenceError("No trusted timestamp metadata");
      if (this.timestamp.signed.isExpired(this.referenceTime))
        throw new Of.ExpiredMetadataError("Final timestamp.json is expired");
    }
    checkFinalSnapsnot() {
      if (!this.snapshot) throw ReferenceError("No trusted snapshot metadata");
      if (!this.timestamp) throw ReferenceError("No trusted timestamp metadata");
      if (this.snapshot.signed.isExpired(this.referenceTime))
        throw new Of.ExpiredMetadataError("snapshot.json is expired");
      let e = this.timestamp.signed.snapshotMeta;
      if (this.snapshot.signed.version !== e.version)
        throw new Of.BadVersionError("Snapshot version doesn't match timestamp");
    }
  }
  qfi.TrustedMetadataStore = Vfi;
});