
var Emr = Ie(function (Qhc, vmi) {
  var bea = eB()("en"),
    jea = ky(),
    Pea = I7e(),
    Cea = RYn(),
    wea = Smi(),
    { log: Kyt, time: Tmi } = mg(),
    kea = w4e();
  class gmr extends Map {
    #e;
    error = null;
    topVulns = new Map();
    static load(e, t) {
      return new gmr(e, t).run();
    }
    get auditReportVersion() {
      return 2;
    }
    toJSON() {
      let e = {
        auditReportVersion: this.auditReportVersion,
        vulnerabilities: {},
        metadata: {
          vulnerabilities: { info: 0, low: 0, moderate: 0, high: 0, critical: 0, total: this.size },
          dependencies: {
            prod: 0,
            dev: 0,
            optional: 0,
            peer: 0,
            peerOptional: 0,
            total: this.tree.inventory.size - 1,
          },
        },
      };
      for (let r of this.tree.inventory.values()) {
        let { dependencies: s } = e.metadata,
          a = !0;
        for (let H of ["dev", "optional", "peer", "peerOptional"]) if (r[H]) (s[H]++, (a = !1));
        if (a) s.prod++;
      }
      let t = [];
      for (let [r, s] of this.entries()) (t.push([r, s.toJSON()]), e.metadata.vulnerabilities[s.severity]++);
      return (
        (e.vulnerabilities = t.sort(([r], [s]) => bea(r, s)).reduce((r, [s, a]) => ((r[s] = a), r), {})),
        e
      );
    }
    constructor(e, t = {}) {
      super();
      ((this.#e = new Set(t.omit || [])),
        (this.calculator = new wea(t)),
        (this.options = t),
        (this.tree = e),
        (this.filterSet = t.filterSet));
    }
    async run() {
      if (((this.report = await this.#n()), Kyt.silly("audit report", this.report), this.report))
        await this.#r();
      return this;
    }
    isVulnerable(e) {
      let t = this.get(e.packageName);
      return !!(t && t.isVulnerable(e));
    }
    async #r() {
      let e = Tmi.start("auditReport:init"),
        t = [];
      for (let [a, H] of Object.entries(this.report))
        for (let u of H) t.push(this.calculator.calculate(a, u));
      let r = new Set(await Promise.all(t)),
        s = new Set();
      for (let a of r) {
        let { name: H, range: u } = a,
          f = `${H}@${u}`,
          d = this.get(H) || new Cea({ name: H, advisory: a });
        if (this.has(H)) d.addAdvisory(a);
        if ((super.set(H, d), !s.has(f))) {
          let _ = [];
          for (let L of this.tree.inventory.query("packageName", H)) {
            if (!this.shouldAudit(L)) continue;
            if (!a.testVersion(L.version)) continue;
            if (a.type === "metavuln") d.addVia(this.get(a.dependency));
            if (d.nodes.has(L)) continue;
            d.nodes.add(L);
            for (let { from: I, spec: D } of L.edgesIn)
              if (I.isTop && !d.topNodes.has(I)) {
                if (((d.fixAvailable = this.#t(d, D)), d.fixAvailable !== !0))
                  (this.topVulns.set(d.name, d), d.topNodes.add(I));
              } else {
                let S = this.calculator.calculate(I.packageName, a);
                _.push(
                  S.then((T) => {
                    if (T.testVersion(I.version, D)) r.add(T);
                  }),
                );
              }
          }
          (await Promise.all(_), s.add(f));
        }
        if (this.get(H).nodes.size === 0) {
          this.delete(H);
          continue;
        }
        for (let _ of d.advisories)
          if (![...d.nodes].some((I) => _.testVersion(I.version))) d.deleteAdvisory(_);
      }
      e();
    }
    #t(e, t) {
      if (!e.testSpec(t)) return !0;
      let r = jea(t);
      if (!r.registry) return !1;
      if (r.subSpec) t = r.subSpec.rawSpec;
      try {
        let {
          _isSemVerMajor: s,
          version: a,
          name: H,
        } = Pea(e.packument, t, { ...this.options, before: null, avoid: e.range, avoidStrict: !0 });
        return { name: H, version: a, isSemVerMajor: s };
      } catch (s) {
        return !1;
      }
    }
    set() {
      throw Error("do not call AuditReport.set() directly");
    }
    async #n() {
      if (this.options.audit === !1 || this.options.offline === !0 || this.tree.inventory.size === 1)
        return null;
      let e = Tmi.start("auditReport:getReport");
      try {
        let t = this.prepareBulkData();
        if ((Kyt.silly("audit", "bulk request", t), !Object.keys(t).length)) return null;
        return await (
          await kea("/-/npm/v1/security/advisories/bulk", {
            ...this.options,
            registry: this.options.auditRegistry || this.options.registry,
            method: "POST",
            gzip: !0,
            body: t,
          })
        ).json();
      } catch (t) {
        return (
          Kyt.verbose("audit error", t),
          Kyt.silly("audit error", String(t.body)),
          (this.error = t),
          null
        );
      } finally {
        e();
      }
    }
    shouldAudit(e) {
      if (!e.version || e.isRoot || (this.filterSet && this.filterSet?.size !== 0 && !this.filterSet?.has(e)))
        return !1;
      if (this.#e.size === 0) return !0;
      return !e.shouldOmit(this.#e);
    }
    prepareBulkData() {
      let e = {};
      for (let t of this.tree.inventory.query("packageName")) {
        let r = new Set();
        for (let s of this.tree.inventory.query("packageName", t)) {
          if (!this.shouldAudit(s)) continue;
          r.add(s.version);
        }
        if (r.size) e[t] = [...r];
      }
      return e;
    }
  }
  vmi.exports = gmr;
});