
var tpi = Ie(function (gB) {
  var jQo =
      (gB && gB.__createBinding) ||
      (Object.create
        ? function (e, t, r, s) {
            if (s === void 0) s = r;
            var a = Object.getOwnPropertyDescriptor(t, r);
            if (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable))
              a = {
                enumerable: !0,
                get: function () {
                  return t[r];
                },
              };
            Object.defineProperty(e, s, a);
          }
        : function (e, t, r, s) {
            if (s === void 0) s = r;
            e[s] = t[r];
          }),
    PQo =
      (gB && gB.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    tmr =
      (gB && gB.__importStar) ||
      (function () {
        var e = function (t) {
          return (
            (e =
              Object.getOwnPropertyNames ||
              function (r) {
                var s = [];
                for (var a in r) if (Object.prototype.hasOwnProperty.call(r, a)) s[s.length] = a;
                return s;
              }),
            e(t)
          );
        };
        return function (t) {
          if (t && t.__esModule) return t;
          var r = {};
          if (t != null) {
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") jQo(r, t, s[a]);
          }
          return (PQo(r, t), r);
        };
      })(),
    CQo =
      (gB && gB.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(gB, "__esModule", { value: !0 });
  gB.Updater = void 0;
  var F1 = Eyt(),
    wQo = CQo(A_e()),
    ove = tmr(cr("fs")),
    Syt = tmr(cr("path")),
    Tyt = Ffi(),
    Qfi = Wfi(),
    g8 = yyt(),
    Yfi = Zdr(),
    Zfi = Xfi(),
    Z4e = tmr(zfi()),
    emr = (0, wQo.default)("tuf:cache");
  class epi {
    dir;
    metadataBaseUrl;
    targetDir;
    targetBaseUrl;
    forceCache;
    trustedSet;
    config;
    fetcher;
    constructor(e) {
      let { metadataDir: t, metadataBaseUrl: r, targetDir: s, targetBaseUrl: a, fetcher: H, config: u } = e;
      ((this.dir = t),
        (this.metadataBaseUrl = r),
        (this.targetDir = s),
        (this.targetBaseUrl = a),
        (this.forceCache = e.forceCache ?? !1));
      let f = this.loadLocalMetadata(F1.MetadataKind.Root);
      ((this.trustedSet = new Zfi.TrustedMetadataStore(f)), (this.config = { ...Qfi.defaultConfig, ...u }));
      let d = u?.userAgent ? `${u.userAgent} tuf-js/${Tyt.version}` : `tuf-js/${Tyt.version}`;
      this.fetcher =
        H ||
        new Yfi.DefaultFetcher({
          userAgent: d,
          timeout: this.config.fetchTimeout,
          retry: this.config.fetchRetries ?? this.config.fetchRetry,
        });
    }
    async refresh() {
      if (this.forceCache)
        try {
          await this.loadTimestamp({ checkRemote: !1 });
        } catch (e) {
          (await this.loadRoot(), await this.loadTimestamp());
        }
      else (await this.loadRoot(), await this.loadTimestamp());
      (await this.loadSnapshot(), await this.loadTargets(F1.MetadataKind.Targets, F1.MetadataKind.Root));
    }
    async getTargetInfo(e) {
      if (!this.trustedSet.targets) await this.refresh();
      return this.preorderDepthFirstWalk(e);
    }
    async downloadTarget(e, t, r) {
      let s = t || this.generateTargetPath(e);
      if (!r) {
        if (!this.targetBaseUrl) throw new g8.ValueError("Target base URL not set");
        r = this.targetBaseUrl;
      }
      let a = e.path;
      if (this.trustedSet.root.signed.consistentSnapshot && this.config.prefixTargetsWithHash) {
        let f = Object.values(e.hashes),
          { dir: d, base: _ } = Syt.parse(a),
          L = `${f[0]}.${_}`;
        a = d ? `${d}/${L}` : L;
      }
      let u = Z4e.join(r, a);
      return (
        await this.fetcher.downloadFile(u, e.length, async (f) => {
          (await e.verify(ove.createReadStream(f)), emr("WRITE %s", s), ove.copyFileSync(f, s));
        }),
        s
      );
    }
    async findCachedTarget(e, t) {
      if (!t) t = this.generateTargetPath(e);
      try {
        if (ove.existsSync(t)) return (await e.verify(ove.createReadStream(t)), t);
      } catch (r) {
        return;
      }
      return;
    }
    loadLocalMetadata(e) {
      let t = Syt.join(this.dir, `${e}.json`);
      return (emr("READ %s", t), ove.readFileSync(t));
    }
    async loadRoot() {
      let t = this.trustedSet.root.signed.version + 1,
        r = t + this.config.maxRootRotations;
      for (let s = t; s < r; s++) {
        let a = Z4e.join(this.metadataBaseUrl, `${s}.root.json`);
        try {
          let H = await this.fetcher.downloadBytes(a, this.config.rootMaxLength);
          (this.trustedSet.updateRoot(H), this.persistMetadata(F1.MetadataKind.Root, H));
        } catch (H) {
          if (H instanceof g8.DownloadHTTPError) {
            if ([403, 404].includes(H.statusCode)) break;
          }
          throw H;
        }
      }
    }
    async loadTimestamp({ checkRemote: e } = { checkRemote: !0 }) {
      try {
        let s = this.loadLocalMetadata(F1.MetadataKind.Timestamp);
        if ((this.trustedSet.updateTimestamp(s), !e)) return;
      } catch (s) {}
      let t = Z4e.join(this.metadataBaseUrl, "timestamp.json"),
        r = await this.fetcher.downloadBytes(t, this.config.timestampMaxLength);
      try {
        this.trustedSet.updateTimestamp(r);
      } catch (s) {
        if (s instanceof g8.EqualVersionError) return;
        throw s;
      }
      this.persistMetadata(F1.MetadataKind.Timestamp, r);
    }
    async loadSnapshot() {
      try {
        let e = this.loadLocalMetadata(F1.MetadataKind.Snapshot);
        this.trustedSet.updateSnapshot(e, !0);
      } catch (e) {
        if (!this.trustedSet.timestamp) throw ReferenceError("No timestamp metadata");
        let t = this.trustedSet.timestamp.signed.snapshotMeta,
          r = t.length || this.config.snapshotMaxLength,
          s = this.trustedSet.root.signed.consistentSnapshot ? t.version : void 0,
          a = Z4e.join(this.metadataBaseUrl, s ? `${s}.snapshot.json` : "snapshot.json");
        try {
          let H = await this.fetcher.downloadBytes(a, r);
          (this.trustedSet.updateSnapshot(H), this.persistMetadata(F1.MetadataKind.Snapshot, H));
        } catch (H) {
          throw new g8.RuntimeError(`Unable to load snapshot metadata error ${H}`);
        }
      }
    }
    async loadTargets(e, t) {
      if (this.trustedSet.getRole(e)) return this.trustedSet.getRole(e);
      try {
        let r = this.loadLocalMetadata(e);
        this.trustedSet.updateDelegatedTargets(r, e, t);
      } catch (r) {
        if (!this.trustedSet.snapshot) throw ReferenceError("No snapshot metadata");
        let s = this.trustedSet.snapshot.signed.meta[`${e}.json`],
          a = s.length || this.config.targetsMaxLength,
          H = this.trustedSet.root.signed.consistentSnapshot ? s.version : void 0,
          u = encodeURIComponent(e),
          f = Z4e.join(this.metadataBaseUrl, H ? `${H}.${u}.json` : `${u}.json`);
        try {
          let d = await this.fetcher.downloadBytes(f, a);
          (this.trustedSet.updateDelegatedTargets(d, e, t), this.persistMetadata(e, d));
        } catch (d) {
          throw new g8.RuntimeError(`Unable to load targets error ${d}`);
        }
      }
      return this.trustedSet.getRole(e);
    }
    async preorderDepthFirstWalk(e) {
      let t = [{ roleName: F1.MetadataKind.Targets, parentRoleName: F1.MetadataKind.Root }],
        r = new Set();
      while (r.size <= this.config.maxDelegations && t.length > 0) {
        let { roleName: s, parentRoleName: a } = t.pop();
        if (r.has(s)) continue;
        let H = (await this.loadTargets(s, a))?.signed;
        if (!H) continue;
        let u = H.targets?.[e];
        if (u) return u;
        if ((r.add(s), H.delegations)) {
          let f = [],
            d = H.delegations.rolesForTarget(e);
          for (let { role: _, terminating: L } of d)
            if ((f.push({ roleName: _, parentRoleName: s }), L)) {
              t.splice(0);
              break;
            }
          (f.reverse(), t.push(...f));
        }
      }
      return;
    }
    generateTargetPath(e) {
      if (!this.targetDir) throw new g8.ValueError("Target directory not set");
      let t = encodeURIComponent(e.path);
      return Syt.join(this.targetDir, t);
    }
    persistMetadata(e, t) {
      let r = encodeURIComponent(e);
      try {
        let s = Syt.join(this.dir, `${r}.json`);
        (emr("WRITE %s", s), ove.writeFileSync(s, t.toString("utf8")));
      } catch (s) {
        throw new g8.PersistError(`Failed to persist metadata ${r} error: ${s}`);
      }
    }
  }
  gB.Updater = epi;
});