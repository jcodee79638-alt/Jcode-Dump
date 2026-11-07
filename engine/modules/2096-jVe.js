
var jVe = Ie(function (Iec, bPn) {
  var { LRUCache: Qfo } = aoe(),
    Yfo = yPn(),
    Zfo = vPn(),
    epo = Uar(),
    Nar = new Qfo({ max: 1000 });
  function tpo(e) {
    try {
      let { protocol: t, hostname: r, pathname: s } = new URL(e);
      if (!r) return null;
      let a = /(?:git\+)http:$/.test(t) ? "http:" : "https:",
        H = s.replace(/\.git$/, "");
      return `${a}//${r}${H}`;
    } catch {
      return null;
    }
  }
  class HN {
    constructor(e, t, r, s, a, H, u = {}) {
      Object.assign(this, HN.#e[e], {
        type: e,
        user: t,
        auth: r,
        project: s,
        committish: a,
        default: H,
        opts: u,
      });
    }
    static #e = { byShortcut: {}, byDomain: {} };
    static #r = {
      "git+ssh:": { name: "sshurl" },
      "ssh:": { name: "sshurl" },
      "git+https:": { name: "https", auth: !0 },
      "git:": { auth: !0 },
      "http:": { auth: !0 },
      "https:": { auth: !0 },
      "git+http:": { auth: !0 },
    };
    static addHost(e, t) {
      ((HN.#e[e] = t),
        (HN.#e.byDomain[t.domain] = e),
        (HN.#e.byShortcut[`${e}:`] = e),
        (HN.#r[`${e}:`] = { name: e }));
    }
    static fromUrl(e, t) {
      if (typeof e !== "string") return;
      let r = e + JSON.stringify(t || {});
      if (!Nar.has(r)) {
        let s = Zfo(e, t, { gitHosts: HN.#e, protocols: HN.#r });
        Nar.set(r, s ? new HN(...s) : void 0);
      }
      return Nar.get(r);
    }
    static fromManifest(e, t = {}) {
      if (!e || typeof e !== "object") return;
      let r = e.repository,
        s =
          r &&
          (typeof r === "string" ? r : typeof r === "object" && typeof r.url === "string" ? r.url : null);
      if (!s) throw Error("no repository");
      let a = (s && HN.fromUrl(s.replace(/^git\+/, ""), t)) || null;
      if (a) return a;
      let H = tpo(s);
      return HN.fromUrl(H, t) || H;
    }
    static parseUrl(e) {
      return epo(e);
    }
    #t(e, t) {
      if (typeof e !== "function") return null;
      let r = { ...this, ...this.opts, ...t };
      if (!r.path) r.path = "";
      if (r.path.startsWith("/")) r.path = r.path.slice(1);
      if (r.noCommittish) r.committish = null;
      let s = e(r);
      return r.noGitPlus && s.startsWith("git+") ? s.slice(4) : s;
    }
    hash() {
      return this.committish ? `#${this.committish}` : "";
    }
    ssh(e) {
      return this.#t(this.sshtemplate, e);
    }
    sshurl(e) {
      return this.#t(this.sshurltemplate, e);
    }
    browse(e, ...t) {
      if (typeof e !== "string") return this.#t(this.browsetemplate, e);
      if (typeof t[0] !== "string") return this.#t(this.browsetreetemplate, { ...t[0], path: e });
      return this.#t(this.browsetreetemplate, { ...t[1], fragment: t[0], path: e });
    }
    browseFile(e, ...t) {
      if (typeof t[0] !== "string") return this.#t(this.browseblobtemplate, { ...t[0], path: e });
      return this.#t(this.browseblobtemplate, { ...t[1], fragment: t[0], path: e });
    }
    docs(e) {
      return this.#t(this.docstemplate, e);
    }
    bugs(e) {
      return this.#t(this.bugstemplate, e);
    }
    https(e) {
      return this.#t(this.httpstemplate, e);
    }
    git(e) {
      return this.#t(this.gittemplate, e);
    }
    shortcut(e) {
      return this.#t(this.shortcuttemplate, e);
    }
    path(e) {
      return this.#t(this.pathtemplate, e);
    }
    tarball(e) {
      return this.#t(this.tarballtemplate, { ...e, noCommittish: !1 });
    }
    file(e, t) {
      return this.#t(this.filetemplate, { ...t, path: e });
    }
    edit(e, t) {
      return this.#t(this.edittemplate, { ...t, path: e });
    }
    getDefaultRepresentation() {
      return this.default;
    }
    toString(e) {
      if (this.default && typeof this[this.default] === "function") return this[this.default](e);
      return this.sshurl(e);
    }
  }
  for (let [e, t] of Object.entries(Yfo)) HN.addHost(e, t);
  bPn.exports = HN;
});