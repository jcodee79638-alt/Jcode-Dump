
var wLi = Ie(function (g$c, CLi) {
  var { resolve: kaa } = cr("path"),
    { parser: Oaa, arrayDelimiter: SLi } = xLi(),
    Uaa = eB()("en"),
    { log: vLi } = mg(),
    { minimatch: Naa } = v7e(),
    Faa = ky(),
    bLi = Mve(),
    N$ = Qj(),
    Baa = w4e();
  class jLi {
    #e;
    #r;
    #t;
    #n = new Map();
    #i;
    #s;
    #a = new Map();
    #c;
    constructor(e) {
      ((this.#e = e.rootAstNode.nodes[0]),
        (this.#t = e.inventory),
        (this.#r = e.initialItems),
        (this.#i = e.vulnCache),
        (this.#c = e.targetNode),
        (this.currentResults = this.#r),
        (this.flatOptions = e.flatOptions || {}),
        (this.currentAstNode = e.rootAstNode));
    }
    get currentResults() {
      return this.#a.get(this.#e);
    }
    set currentResults(e) {
      this.#a.set(this.#e, e);
    }
    get initialItems() {
      if (
        this.currentAstNode.parent.nodes[0] === this.currentAstNode &&
        this.currentAstNode.parent.parent.type === "root"
      )
        return this.#r;
      if (this.currentAstNode.prev().type === "combinator") return this.#t;
      return this.currentResults;
    }
    processPendingCombinator(e) {
      if (this.#s) {
        let t = this.#s(this.currentResults, e);
        ((this.#s = null), (this.currentResults = t));
      } else this.currentResults = e;
    }
    collect(e) {
      return new Set(e.nodes.flatMap((t) => this.#a.get(t)));
    }
    attributeType() {
      let e = this.initialItems.filter((t) => z_r(this.currentAstNode, t.package));
      this.processPendingCombinator(e);
    }
    classType() {
      let e = Waa[String(this.currentAstNode)];
      if (!e)
        throw Object.assign(Error(`\`${String(this.currentAstNode)}\` is not a supported dependency type.`), {
          code: "EQUERYNODEPTYPE",
        });
      let t = e(this.initialItems);
      this.processPendingCombinator(t);
    }
    combinatorType() {
      this.#s = Vaa[String(this.currentAstNode)];
    }
    idType() {
      let e = this.currentAstNode.value,
        t = this.initialItems.filter((r) => e === r.name || e === r.package.name);
      this.processPendingCombinator(t);
    }
    async pseudoType() {
      let e = `${this.currentAstNode.value.slice(1)}Pseudo`;
      if (!this[e])
        throw Object.assign(Error(`\`${this.currentAstNode.value}\` is not a supported pseudo selector.`), {
          code: "EQUERYNOPSEUDO",
        });
      let t = await this[e]();
      this.processPendingCombinator(t);
    }
    selectorType() {
      if (((this.#e = this.currentAstNode), !this.currentResults)) this.currentResults = [];
    }
    universalType() {
      this.processPendingCombinator(this.initialItems);
    }
    attrPseudo() {
      let { lookupProperties: e, attributeMatcher: t } = this.currentAstNode;
      return this.initialItems.filter((r) => {
        let s = [r.package];
        for (let a of e) {
          if (a === SLi) {
            s = s.flat();
            continue;
          }
          if (((s = s.flatMap((u) => u[a] || [])), s.every((u) => !u))) return !1;
        }
        return s.some((a) => z_r(t, a));
      });
    }
    emptyPseudo() {
      return this.initialItems.filter((e) => e.edgesOut.size === 0);
    }
    extraneousPseudo() {
      return this.initialItems.filter((e) => e.extraneous);
    }
    async hasPseudo() {
      let e = [];
      for (let t of this.initialItems)
        if (
          (
            await y1t({
              flatOptions: this.flatOptions,
              initialItems: [t],
              inventory: this.#t,
              rootAstNode: this.currentAstNode.nestedNode,
              targetNode: t,
              vulnCache: this.#i,
            })
          ).size > 0
        )
          e.push(t);
      return e;
    }
    invalidPseudo() {
      let e = [];
      for (let t of this.initialItems)
        for (let r of t.edgesIn)
          if (r.invalid) {
            e.push(t);
            break;
          }
      return e;
    }
    async isPseudo() {
      return [
        ...(await y1t({
          flatOptions: this.flatOptions,
          initialItems: this.initialItems,
          inventory: this.#t,
          rootAstNode: this.currentAstNode.nestedNode,
          targetNode: this.currentAstNode,
          vulnCache: this.#i,
        })),
      ];
    }
    linkPseudo() {
      return this.initialItems.filter((e) => e.isLink || (e.isTop && !e.isRoot));
    }
    missingPseudo() {
      return this.#t.reduce((e, t) => {
        for (let r of t.edgesOut.values())
          if (r.missing) {
            let s = { name: r.name, version: r.spec },
              a = new this.#c.constructor({ pkg: s });
            ((a.queryContext = { missing: !0 }), (a.edgesIn = new Set([r])), e.push(a));
          }
        return e;
      }, []);
    }
    async notPseudo() {
      let e = await y1t({
          flatOptions: this.flatOptions,
          initialItems: this.initialItems,
          inventory: this.#t,
          rootAstNode: this.currentAstNode.nestedNode,
          targetNode: this.currentAstNode,
          vulnCache: this.#i,
        }),
        t = new Set(e);
      return this.initialItems.filter((r) => !t.has(r));
    }
    overriddenPseudo() {
      return this.initialItems.filter((e) => e.overridden);
    }
    pathPseudo() {
      return this.initialItems.filter((e) => {
        if (!this.currentAstNode.pathValue) return !0;
        return Naa(
          e.realpath.replace(/\\+/g, "/"),
          kaa(e.root.realpath, this.currentAstNode.pathValue).replace(/\\+/g, "/"),
        );
      });
    }
    privatePseudo() {
      return this.initialItems.filter((e) => e.package.private);
    }
    rootPseudo() {
      return this.initialItems.filter((e) => e === this.#c.root);
    }
    scopePseudo() {
      return this.initialItems.filter((e) => e === this.#c);
    }
    semverPseudo() {
      let {
          attributeMatcher: e,
          lookupProperties: t,
          semverFunc: r = "infer",
          semverValue: s,
        } = this.currentAstNode,
        { qualifiedAttribute: a } = e;
      if (!s)
        return (vLi.warn("query", "usage of :semver() with no parameters is deprecated"), this.initialItems);
      if (!N$.valid(s) && !N$.validRange(s))
        throw Object.assign(Error(`\`${s}\` is not a valid semver version or range`), {
          code: "EQUERYINVALIDSEMVER",
        });
      let H = !!N$.valid(s),
        u = (f, d) => {
          if (e.operator) {
            if (!z_r(e, d)) return !1;
          }
          let _ = d[a];
          if ((!N$.valid(_) && !N$.validRange(_)) || typeof _ !== "string") return !1;
          let L = !!N$.valid(_),
            I = r;
          if (I === "infer")
            if (H && L) I = "eq";
            else if (!H && !L) I = "intersects";
            else I = "satisfies";
          if (["eq", "neq", "gt", "gte", "lt", "lte"].includes(I)) {
            if (!H || !L) return !1;
            return N$[I](_, s);
          } else if (["gtr", "ltr", "satisfies"].includes(I)) {
            if (!H && !L) return !1;
            return H ? N$[I](s, _) : N$[I](_, s);
          } else if (["intersects", "subset"].includes(I)) return N$[I](_, s);
          else
            throw Object.assign(Error(`\`semver.${I}\` is not a supported operator.`), {
              code: "EQUERYINVALIDOPERATOR",
            });
        };
      return this.initialItems.filter((f) => {
        if (!t.length) return u(f, f.package);
        let d = [f.package];
        for (let _ of t) {
          if (_ === SLi) {
            d = d.flat();
            continue;
          }
          if (((d = d.flatMap((I) => I[_] || [])), d.every((I) => !I))) return !1;
          return d.some((I) => u(f, I));
        }
      });
    }
    typePseudo() {
      if (!this.currentAstNode.typeValue) return this.initialItems;
      return this.initialItems.flatMap((e) => {
        let t = [],
          { typeValue: r } = this.currentAstNode;
        for (let s of e.edgesIn) {
          let a = Faa(`${s.name}@${s.spec}`);
          if (r === "registry") {
            if (a.registry) t.push(s.to);
          } else if (a.type === r) t.push(s.to);
        }
        return t;
      });
    }
    dedupedPseudo() {
      return this.initialItems.filter((e) => e.target.edgesIn.size > 1);
    }
    async vulnPseudo() {
      if (!this.initialItems.length) return this.initialItems;
      if (!this.#i) {
        let r = {};
        this.initialItems.map((a) => {
          if (a.isProjectRoot || a.package.private) return;
          if (!r[a.name]) r[a.name] = [];
          if (!r[a.name].includes(a.version)) r[a.name].push(a.version);
        });
        let s = await Baa("/-/npm/v1/security/advisories/bulk", {
          ...this.flatOptions,
          registry: this.flatOptions.auditRegistry || this.flatOptions.registry,
          method: "POST",
          gzip: !0,
          body: r,
        });
        this.#i = await s.json();
      }
      let e = this.#i,
        { vulns: t } = this.currentAstNode;
      return this.initialItems.filter((r) => {
        let s = e[r.name]?.filter((a) => {
          if (!N$.intersects(a.vulnerable_versions, r.version)) return !1;
          if (!t) return !0;
          for (let H of t) {
            if (H.severity && !H.severity.includes("*")) {
              if (!H.severity.includes(a.severity)) continue;
            }
            if (H?.cwe) {
              if (H.cwe.includes("*")) {
                if (!a.cwe.length) continue;
              } else if (!H.cwe.every((u) => a.cwe.includes(`CWE-${u}`))) continue;
            }
            return !0;
          }
        });
        if (s?.length) return ((r.queryContext = { advisories: s }), !0);
        return !1;
      });
    }
    async outdatedPseudo() {
      let { outdatedKind: e = "any" } = this.currentAstNode;
      return (
        await Promise.all(
          this.initialItems.map(async (r) => {
            if (r.isProjectRoot) return !1;
            if (r.package.private) return !1;
            if (!this.#n.has(r.name)) this.#n.set(r.name, qaa(r.name, this.flatOptions));
            let s = await this.#n.get(r.name);
            r.queryContext.versions = s;
            let a = s.filter((H) => N$.gt(H, r.version));
            if (!a.length) return !1;
            if (e === "any") return r;
            if (["major", "minor", "patch"].includes(e)) {
              if (!a.filter((u) => N$.diff(r.version, u) === e).length) return !1;
              return r;
            }
            if (e === "in-range") {
              let H = [];
              for (let u of r.edgesIn) {
                let f = a.filter((d) => N$.satisfies(d, u.spec));
                if (!f.length) continue;
                H.push({ from: u.from.location, versions: f });
              }
              if (!H.length) return !1;
              return ((r.queryContext.outdated = { ...r.queryContext.outdated, inRange: H }), r);
            }
            if (e === "out-of-range") {
              let H = [];
              for (let u of r.edgesIn) {
                let f = a.filter((d) => !N$.satisfies(d, u.spec));
                if (!f.length) continue;
                H.push({ from: u.from.location, versions: f });
              }
              if (!H.length) return !1;
              return ((r.queryContext.outdated = { ...r.queryContext.outdated, outOfRange: H }), r);
            }
            return !1;
          }),
        )
      ).filter(Boolean);
    }
  }
  var Raa = {
      "="({ attr: e, value: t }) {
        return e === t;
      },
      "~="({ attr: e, value: t }) {
        return (e.match(/\w+/g) || []).includes(t);
      },
      "*="({ attr: e, value: t }) {
        return e.includes(t);
      },
      "|="({ attr: e, value: t }) {
        return e.startsWith(`${t}-`);
      },
      "^="({ attr: e, value: t }) {
        return e.startsWith(t);
      },
      "$="({ attr: e, value: t }) {
        return e.endsWith(t);
      },
    },
    TLi = ({ attr: e, value: t, insensitive: r, operator: s }) => {
      if (typeof e === "number") e = String(e);
      if (typeof e !== "string") return !1;
      if (r) e = e.toLowerCase();
      return Raa[s]({ attr: e, insensitive: r, value: t });
    },
    z_r = (e, t) => {
      let r = !!e.insensitive,
        s = e.operator || "",
        a = e.qualifiedAttribute,
        H = e.value || "";
      if (s === "") return Boolean(t[a]);
      if (r) H = H.toLowerCase();
      if (Array.isArray(t[a]))
        return t[a].find((u, f) => {
          let d = t[a][f] || "";
          return TLi({ attr: d, value: H, insensitive: r, operator: s });
        });
      else {
        let u = t[a] || "";
        return TLi({ attr: u, value: H, insensitive: r, operator: s });
      }
    },
    PLi = (e, t, r = new Set()) => {
      for (let s of e.edgesIn) {
        if (r.has(s)) continue;
        if ((r.add(s), s.type === t || s.from[t] || PLi(s.from, t, r))) return !0;
      }
      return !1;
    },
    Q_r = (e, t) => {
      let r = [];
      for (let s of e) if (s[t] || PLi(s, t)) r.push(s);
      return r;
    },
    Waa = {
      ".prod"(e) {
        let t = [];
        for (let r of e) if (!r.dev) t.push(r);
        return t;
      },
      ".dev"(e) {
        return Q_r(e, "dev");
      },
      ".optional"(e) {
        return Q_r(e, "optional");
      },
      ".peer"(e) {
        return Q_r(e, "peer");
      },
      ".workspace"(e) {
        return e.filter((t) => t.isWorkspace);
      },
      ".bundled"(e) {
        return e.filter((t) => t.inBundle);
      },
    },
    Y_r = (e, t) => {
      for (let r of t) {
        if (r.isLink) r = r.target;
        if (e.isTop && e.resolveParent === r) return !0;
        for (let s of e.edgesIn) if (s && s.from === r) return !0;
      }
      return !1;
    },
    D1t = (e, t, r = new Set()) => {
      if (Y_r(e, t)) return !0;
      if (e.isTop && e.resolveParent) {
        if (D1t(e.resolveParent, t)) return !0;
      }
      for (let s of e.edgesIn) {
        if (r.has(s)) continue;
        if ((r.add(s), s && s.from && D1t(s.from, t, r))) return !0;
      }
      for (let s of e.linksIn) if (D1t(s, t, r)) return !0;
      return !1;
    },
    Vaa = {
      ">"(e, t) {
        return t.filter((r) => Y_r(r, e));
      },
      " "(e, t) {
        return t.filter((r) => D1t(r, e));
      },
      "~"(e, t) {
        let r = new Set();
        for (let s of e) for (let a of s.edgesIn) r.add(a.from);
        return t.filter((s) => !e.includes(s) && Y_r(s, [...r]));
      },
    },
    qaa = async (e, t) => {
      let r;
      try {
        r = await bLi.packument(e, { ...t, fullMetadata: !1 });
      } catch (a) {
        return (vLi.warn("query", `could not retrieve packument for ${e}: ${a.message}`), []);
      }
      let s = Object.keys(r.versions).sort(N$.compare);
      if (r.time && t.before)
        s = s.filter((a) => {
          if (!r.time[a]) return !1;
          return Date.parse(r.time[a]) <= t.before;
        });
      return s;
    },
    y1t = async (e) => {
      let t = e.rootAstNode;
      if (!t.nodes) return new Set();
      let r = new jLi(e),
        s = new Set();
      t.walk((a) => {
        s.add(a);
      });
      for (let a of s) {
        r.currentAstNode = a;
        let H = `${r.currentAstNode.type}Type`;
        if (typeof r[H] !== "function")
          throw Object.assign(Error(`\`${r.currentAstNode.type}\` is not a supported selector.`), {
            code: "EQUERYNOSELECTOR",
          });
        await r[H]();
      }
      return r.collect(t);
    },
    Gaa = async (e, t, r) => {
      let s = [...e.root.inventory.values()];
      return [
        ...(await y1t({ initialItems: s, inventory: s, flatOptions: r, rootAstNode: Oaa(t), targetNode: e })),
      ].sort((H, u) => Uaa(H.location, u.location));
    };
  CLi.exports = Gaa;
});