
var sYn = Ie(function (huc, cur) {
  var { walkUp: O8o } = f7e(),
    nEt = sAr(),
    L5 = AAr(),
    { log: Z2, time: U8o } = mg(),
    { resolve: C7e, dirname: tEt, join: aur } = cr("path"),
    { homedir: N8o } = cr("os"),
    { readFile: F8o, writeFile: B8o, chmod: R8o, unlink: W8o, stat: eYn, mkdir: V8o } = cr("fs/promises"),
    q8o = ["npm-version", "global-prefix", "local-prefix"],
    Hur = (...e) =>
      eYn(C7e(...e))
        .then((t) => t.isFile())
        .catch(() => !1),
    G8o = (...e) =>
      eYn(C7e(...e))
        .then((t) => t.isDirectory())
        .catch(() => !1),
    rEt = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    $5 = $Se(),
    Xme = SJn(),
    X8o = fAr(),
    J8o = jJn(),
    K8o = kJn(),
    tYn = new Set(["global", "user", "project"]),
    j7e = new Set(["default", "builtin", ...tYn, "env", "cli"]);
  class rYn {
    #e = !1;
    #r;
    #t = null;
    #n = [];
    static get typeDefs() {
      return $5;
    }
    constructor({
      definitions: e,
      shorthands: t,
      flatten: r,
      nerfDarts: s = [],
      npmPath: a,
      env: H = process.env,
      argv: u = process.argv,
      platform: f = "win32",
      execPath: d = process.execPath,
      cwd: _ = process.cwd(),
      excludeNpmCwd: L = !1,
      warn: I = !0,
    }) {
      ((this.nerfDarts = s), (this.definitions = e));
      let { types: D, defaults: S, deprecated: T } = iYn(e);
      ((this.deprecated = T),
        (this.#r = r),
        (this.types = D),
        (this.shorthands = t),
        (this.defaults = S),
        (this.npmPath = a),
        (this.npmBin = aur(this.npmPath, "bin/npm-cli.js")),
        (this.argv = u),
        (this.env = H),
        (this.execPath = d),
        (this.platform = f),
        (this.cwd = _),
        (this.excludeNpmCwd = L),
        (this.globalPrefix = null),
        (this.localPrefix = null),
        (this.localPackage = null),
        (this.home = null));
      let C = [...j7e];
      this.data = new Map();
      let O = null;
      for (let B of C) this.data.set(B, (O = new nYn(O)));
      ((this.data.set = () => {
        throw Error("cannot change internal config data structure");
      }),
        (this.data.delete = () => {
          throw Error("cannot change internal config data structure");
        }),
        (this.sources = new Map([])));
      for (let { data: B } of this.data.values()) this.list.unshift(B);
      ((this.#e = !1), (this.warn = I));
    }
    get list() {
      let e = [];
      for (let { data: t } of this.data.values()) e.unshift(t);
      return e;
    }
    get loaded() {
      return this.#e;
    }
    get prefix() {
      return this.#i("global") ? this.globalPrefix : this.localPrefix;
    }
    find(e) {
      if (!this.loaded) throw Error("call config.load() before reading values");
      let t = [...this.data.entries()];
      for (let r = t.length - 1; r > -1; r--) {
        let [s, { data: a }] = t[r];
        if (rEt(a, e)) return s;
      }
      return null;
    }
    get(e, t) {
      if (!this.loaded) throw Error("call config.load() before reading values");
      return this.#i(e, t);
    }
    #i(e, t = null) {
      if (t !== null && !j7e.has(t)) throw Error("invalid config location param: " + t);
      let { data: r } = this.data.get(t || "cli");
      return t === null || rEt(r, e) ? r[e] : void 0;
    }
    set(e, t, r = "cli") {
      if (!this.loaded) throw Error("call config.load() before setting values");
      if (!j7e.has(r)) throw Error("invalid config location param: " + r);
      this.#c(e);
      let { data: s, raw: a } = this.data.get(r);
      if (((s[e] = t), ["global", "user", "project"].includes(r))) a[e] = t;
      ((this.data.get(r)[ySe] = null), (this.#t = null));
    }
    get flat() {
      if (this.#t) return this.#t;
      let e = U8o.start("config:load:flatten");
      this.#t = {};
      for (let { data: t } of this.data.values()) this.#r(t, this.#t);
      return ((this.#t.nodeBin = this.execPath), (this.#t.npmBin = this.npmBin), e(), this.#t);
    }
    delete(e, t = "cli") {
      if (!this.loaded) throw Error("call config.load() before deleting values");
      if (!j7e.has(t)) throw Error("invalid config location param: " + t);
      let { data: r, raw: s } = this.data.get(t);
      if ((delete r[e], ["global", "user", "project"].includes(t))) delete s[e];
    }
    async load() {
      if (this.loaded) throw Error("attempting to load npm config multiple times");
      (this.loadDefaults(),
        await this.loadBuiltinConfig(),
        this.loadCLI(),
        this.loadEnv(),
        await this.loadProjectConfig(),
        await this.loadUserConfig(),
        await this.loadGlobalConfig(),
        (this.#e = !0),
        (this.globalPrefix = this.get("prefix")),
        this.setEnvs());
    }
    loadDefaults() {
      (this.loadGlobalPrefix(), this.loadHome());
      let e = { ...this.defaults, prefix: this.globalPrefix };
      try {
        e["npm-version"] = cr(aur(this.npmPath, "package.json")).version;
      } catch {}
      this.#a(e, "default", "default values");
      let { data: t } = this.data.get("default");
      Object.defineProperty(t, "globalconfig", {
        get: () => C7e(this.#i("prefix"), "etc/npmrc"),
        set(r) {
          Object.defineProperty(t, "globalconfig", {
            value: r,
            configurable: !0,
            writable: !0,
            enumerable: !0,
          });
        },
        configurable: !0,
        enumerable: !0,
      });
    }
    loadHome() {
      this.home = this.env.HOME || N8o();
    }
    loadGlobalPrefix() {
      if (this.globalPrefix) throw Error("cannot load default global prefix more than once");
      if (this.env.PREFIX) this.globalPrefix = this.env.PREFIX;
      else if (this.platform === "win32") this.globalPrefix = tEt(this.execPath);
      else if (((this.globalPrefix = tEt(tEt(this.execPath))), this.env.DESTDIR))
        this.globalPrefix = aur(this.env.DESTDIR, this.globalPrefix);
    }
    loadEnv() {
      let e = Object.create(null);
      for (let [t, r] of Object.entries(this.env)) {
        if (!/^npm_config_/i.test(t) || r === "") continue;
        let s = t.slice(11);
        if (!s.startsWith("//")) s = s.replace(/(?!^)_/g, "-").toLowerCase();
        e[s] = r;
      }
      this.#a(e, "env", "environment");
    }
    loadCLI() {
      for (let t of Object.keys(this.shorthands))
        if (t.length > 1 && this.argv.includes(`-${t}`))
          Z2.warn(`-${t} is not a valid single-hyphen cli flag and will be removed in the future`);
      ((L5.invalidHandler = (t, r, s) => this.invalidHandler(t, r, s, "command line options", "cli")),
        (L5.unknownHandler = (t, r) => this.unknownHandler(t, r)),
        (L5.abbrevHandler = this.abbrevHandler));
      let e = L5(this.types, this.shorthands, this.argv);
      ((L5.invalidHandler = null),
        (L5.unknownHandler = null),
        (this.parsedArgv = e.argv),
        delete e.argv,
        this.#a(e, "cli", "command line options"));
    }
    get valid() {
      for (let [e, { valid: t }] of this.data.entries())
        if (t === !1 || (t === null && !this.validate(e))) return !1;
      return !0;
    }
    validate(e) {
      if (!e) {
        let t = !0,
          r = [];
        for (let s of this.data.keys()) {
          if (s === "default" || s === "builtin" || s === "cli") continue;
          let a = this.validate(s);
          if (((t = t && a), ["global", "user", "project"].includes(s))) {
            for (let u of ["_authtoken", "-authtoken"])
              if (this.get(u, s)) r.push({ action: "delete", key: u, where: s });
            let H = Xme(this.get("registry"));
            for (let u of ["_auth", "_authToken", "username", "_password"])
              if (this.get(u, s))
                if (u === "username" && !this.get("_password", s))
                  r.push({ action: "delete", key: u, where: s });
                else if (u === "_password" && !this.get("username", s))
                  r.push({ action: "delete", key: u, where: s });
                else r.push({ action: "rename", from: u, to: `${H}:${u}`, where: s });
          }
        }
        if (r.length) {
          let { ErrInvalidAuth: s } = NJn();
          throw new s(r);
        }
        return t;
      } else {
        let t = this.data.get(e);
        return (
          (t[ySe] = !0),
          (L5.invalidHandler = (r, s, a) => this.invalidHandler(r, s, a, t.source, e)),
          L5.clean(t.data, this.types, $5),
          (L5.invalidHandler = null),
          t[ySe]
        );
      }
    }
    repair(e) {
      if (!e)
        try {
          this.validate();
        } catch (t) {
          if (t.code !== "ERR_INVALID_AUTH") throw t;
          e = t.problems;
        } finally {
          if (!e) e = [];
        }
      for (let t of e)
        if (t.action === "delete") this.delete(t.key, t.where);
        else if (t.action === "rename") {
          let r = this.data.get(t.where).raw?.[t.from],
            s = this.get(t.from, t.where);
          (this.set(t.to, r || s, t.where), this.delete(t.from, t.where));
        }
    }
    isDefault(e) {
      let [t, ...r] = [...j7e],
        s = this.data.get(t).data;
      return (
        rEt(s, e) &&
        r.every((a) => {
          let H = this.data.get(a).data;
          return !rEt(H, e);
        })
      );
    }
    invalidHandler(e, t, r, s, a) {
      let H = RJn();
      if (
        (Z2.warn("invalid config", e + "=" + JSON.stringify(t), `set in ${s}`),
        (this.data.get(a)[ySe] = !1),
        Array.isArray(r))
      ) {
        if (r.includes($5.url.type)) r = $5.url.type;
        else if (r.includes($5.path.type)) r = $5.path.type;
      }
      let u = H(r),
        f = u.filter((L) => L !== void 0 && L !== Array),
        d = "Must be" + this.#s(f, u),
        _ =
          f.length === 1
            ? f[0]
            : [...new Set(f.map((L) => (typeof L === "string" ? L : JSON.stringify(L))))].join(", ");
      Z2.warn("invalid config", d, _);
    }
    abbrevHandler(e, t) {
      Z2.warn(`Expanding --${e} to --${t}. This will stop working in the next major version of npm.`);
    }
    unknownHandler(e, t) {
      if (t) this.queueWarning(`unknown:${t}`, `"${t}" is being parsed as a normal command line argument.`);
    }
    #s(e, t) {
      let r;
      if (e.length === 1 && t.includes(Array)) r = " one or more";
      else if (e.length > 1 && t.includes(Array)) r = " one or more of:";
      else if (e.length > 1) r = " one of:";
      else r = "";
      return r;
    }
    #a(e, t, r, s = null) {
      let a = this.data.get(t);
      if (a.source) {
        let H = `double-loading "${t}" configs from ${r}, previously loaded from ${a.source}`;
        throw Error(H);
      }
      if (this.sources.has(r)) {
        let H = `double-loading config "${r}" as "${t}", previously loaded as "${this.sources.get(r)}"`;
        throw Error(H);
      }
      if (((a.source = r), this.sources.set(r, t), s)) {
        if (((a.loadError = s), s.code !== "ENOENT")) Z2.verbose("config", `error loading ${t} config`, s);
      } else {
        a.raw = e;
        e: for (let [H, u] of Object.entries(e)) {
          let f = X8o(H, this.env),
            d = this.parseField(u, f);
          if (t !== "default") {
            if ((this.#c(f), this.definitions[H]?.exclusive)) {
              for (let _ of this.definitions[H].exclusive)
                if (!this.isDefault(_)) {
                  if (t === "env") {
                    let L = this.data.get("cli").data;
                    if (Object.hasOwn(L, _)) continue e;
                  }
                  throw TypeError(`--${H} cannot be provided when using --${_}`);
                }
            }
          }
          if (t !== "default" || H === "npm-version") this.checkUnknown(t, H);
          a.data[f] = d;
        }
      }
    }
    checkUnknown(e, t) {
      if (!this.definitions[t]) {
        if (q8o.includes(t)) return;
        let r = e !== "cli" ? " See `npm help npmrc` for supported config options." : "";
        if (!t.includes(":")) {
          this.queueWarning(
            t,
            `Unknown ${e} config "${e === "cli" ? "--" : ""}${t}". This will stop working in the next major version of npm.${r}`,
          );
          return;
        }
        let s = t.split(":").pop();
        if (!this.definitions[s] && !this.nerfDarts.includes(s))
          this.queueWarning(
            s,
            `Unknown ${e} config "${s}" (${t}). This will stop working in the next major version of npm.${r}`,
          );
      }
    }
    #c(e) {
      if (this.deprecated[e]) Z2.warn("config", e, this.deprecated[e]);
    }
    parseField(e, t, r = !1) {
      return J8o(e, t, this, r);
    }
    async #H(e, t) {
      (Z2.silly("config", `load:file:${e}`),
        await F8o(e, "utf8").then(
          (r) => {
            let s = nEt.parse(r);
            if (t === "project" && s.prefix)
              Z2.error("config", `prefix cannot be changed from project config: ${e}.`);
            return this.#a(s, t, e);
          },
          (r) => this.#a(null, t, e, r),
        ));
    }
    loadBuiltinConfig() {
      return this.#H(C7e(this.npmPath, "npmrc"), "builtin");
    }
    async loadProjectConfig() {
      if ((await this.loadLocalPrefix(), this.localPackage == null))
        this.localPackage = await Hur(this.localPrefix, "package.json");
      if (this.#i("global") === !0 || this.#i("location") === "global") {
        ((this.data.get("project").source = "(global mode enabled, ignored)"),
          this.sources.set(this.data.get("project").source, "project"));
        return;
      }
      let e = C7e(this.localPrefix, ".npmrc");
      if (e !== this.#i("userconfig")) return this.#H(e, "project");
      else
        ((this.data.get("project").source = '(same as "user" config, ignored)'),
          this.sources.set(this.data.get("project").source, "project"));
    }
    async loadLocalPrefix() {
      let e = this.#i("prefix", "cli");
      if (e) {
        this.localPrefix = e;
        return;
      }
      let t = this.#i("workspaces", "cli"),
        r = this.#i("global") || this.#i("location") === "global";
      for (let s of O8o(this.cwd)) {
        if (this.excludeNpmCwd && s === this.npmPath) break;
        let a = await Hur(s, "package.json");
        if (!this.localPrefix && (a || (await G8o(s, "node_modules")))) {
          if (((this.localPrefix = s), (this.localPackage = a), t === !1 || r)) return;
          continue;
        }
        if (this.localPrefix && a) {
          let H = fN(),
            { content: u } = await H.normalize(s).catch(() => ({ content: {} }));
          if (!u?.workspaces) continue;
          let d = await eEt()({ cwd: s, pkg: u });
          for (let _ of d.values())
            if (_ === this.localPrefix) {
              if (await Hur(this.localPrefix, ".npmrc"))
                Z2.warn("config", `ignoring workspace config at ${this.localPrefix}/.npmrc`);
              let { data: L } = this.data.get("default");
              ((L.workspace = [this.localPrefix]),
                (this.localPrefix = s),
                (this.localPackage = a),
                Z2.info("config", `found workspace root at ${this.localPrefix}`));
              return;
            }
        }
      }
      if (!this.localPrefix) this.localPrefix = this.cwd;
    }
    loadUserConfig() {
      return this.#H(this.#i("userconfig"), "user");
    }
    loadGlobalConfig() {
      return this.#H(this.#i("globalconfig"), "global");
    }
    async save(e) {
      if (!this.loaded) throw Error("call config.load() before saving");
      if (!tYn.has(e)) throw Error("invalid config location param: " + e);
      let t = this.data.get(e);
      if (((t[P7e] = null), e === "user")) {
        let H = Xme(this.get("registry")),
          u = this.get(`${H}:email`, "user");
        if (u) (this.delete(`${H}:email`, "user"), this.set("email", u, "user"));
      }
      let r =
        nEt.stringify(t.raw).trim() +
        `
`;
      if (!r.trim()) {
        await W8o(t.source).catch(() => {});
        return;
      }
      let s = tEt(t.source);
      (await V8o(s, { recursive: !0 }), await B8o(t.source, r, "utf8"));
      let a = e === "user" ? 384 : 438;
      await R8o(t.source, a);
    }
    clearCredentialsByURI(e, t = "user") {
      let r = Xme(e);
      if (Xme(this.get("registry")) === r) {
        (this.delete("-authtoken", t),
          this.delete("_authToken", t),
          this.delete("_authtoken", t),
          this.delete("_auth", t),
          this.delete("_password", t),
          this.delete("username", t));
        let a = this.get(`${r}:email`, t);
        if (a) this.set("email", a, t);
      }
      (this.delete(`${r}:_authToken`, t),
        this.delete(`${r}:_auth`, t),
        this.delete(`${r}:_password`, t),
        this.delete(`${r}:username`, t),
        this.delete(`${r}:email`, t),
        this.delete(`${r}:certfile`, t),
        this.delete(`${r}:keyfile`, t));
    }
    setCredentialsByURI(e, { token: t, username: r, password: s, certfile: a, keyfile: H }) {
      let u = Xme(e);
      if ((this.delete(`${u}:always-auth`, "user"), this.delete(`${u}:email`, "user"), a && H))
        (this.set(`${u}:certfile`, a, "user"), this.set(`${u}:keyfile`, H, "user"));
      if (t)
        (this.set(`${u}:_authToken`, t, "user"),
          this.delete(`${u}:_password`, "user"),
          this.delete(`${u}:username`, "user"));
      else if (r || s) {
        if (!r) throw Error("must include username");
        if (!s) throw Error("must include password");
        (this.delete(`${u}:_authToken`, "user"), this.set(`${u}:username`, r, "user"));
        let f = Buffer.from(s, "utf8").toString("base64");
        this.set(`${u}:_password`, f, "user");
      } else if (!a || !H) throw Error("No credentials to set.");
    }
    getCredentialsByURI(e) {
      let t = Xme(e),
        r = Xme(this.get("registry")),
        s = {},
        a = this.get(`${t}:email`) || this.get("email");
      if (a) {
        if (t === r) this.set("email", a, "user");
        s.email = a;
      }
      let H = this.get(`${t}:certfile`),
        u = this.get(`${t}:keyfile`);
      if (H && u) ((s.certfile = H), (s.keyfile = u));
      let f = this.get(`${t}:_authToken`);
      if (f) return ((s.token = f), s);
      let d = this.get(`${t}:username`),
        _ = this.get(`${t}:_password`);
      if (d && _) {
        ((s.username = d), (s.password = Buffer.from(_, "base64").toString("utf8")));
        let I = `${s.username}:${s.password}`;
        return ((s.auth = Buffer.from(I, "utf8").toString("base64")), s);
      }
      let L = this.get(`${t}:_auth`);
      if (L) {
        let D = Buffer.from(L, "base64").toString("utf8").split(":");
        return ((s.username = D.shift()), (s.password = D.join(":")), (s.auth = L), s);
      }
      return s;
    }
    setEnvs() {
      K8o(this);
    }
    removeWarning(e) {
      this.#n = this.#n.filter((t) => t.type !== e);
    }
    getUnknownPositionals() {
      return this.#n.filter((e) => e.type.startsWith("unknown:")).map((e) => e.type.slice(8));
    }
    removeUnknownPositional(e) {
      this.removeWarning(`unknown:${e}`);
    }
    queueWarning(e, ...t) {
      if (!this.warn) this.#n.push({ type: e, args: t });
      else Z2.warn(...t);
    }
    logWarnings() {
      for (let e of this.#n) Z2.warn(...e.args);
      this.#n = [];
    }
  }
  var P7e = Symbol("loadError"),
    ySe = Symbol("valid");
  class nYn {
    #e;
    #r = null;
    #t = null;
    constructor(e) {
      ((this.#e = Object.create(e && e.data)), (this.#t = {}), (this[ySe] = !0));
    }
    get data() {
      return this.#e;
    }
    get valid() {
      return this[ySe];
    }
    set source(e) {
      if (this.#r) throw Error("cannot set ConfigData source more than once");
      this.#r = e;
    }
    get source() {
      return this.#r;
    }
    set loadError(e) {
      if (this[P7e] || Object.keys(this.#t).length) throw Error("cannot set ConfigData loadError after load");
      this[P7e] = e;
    }
    get loadError() {
      return this[P7e];
    }
    set raw(e) {
      if (Object.keys(this.#t).length || this[P7e]) throw Error("cannot set ConfigData raw after load");
      this.#t = e;
    }
    get raw() {
      return this.#t;
    }
  }
  var iYn = (e) => {
    let t = {},
      r = {},
      s = {};
    for (let [a, H] of Object.entries(e))
      if (((r[a] = H.default), (t[a] = H.type), H.deprecated))
        s[a] = H.deprecated.trim().replace(
          /\n +/,
          `
`,
        );
    return { types: t, defaults: r, deprecated: s };
  };
  cur.exports = rYn;
  cur.exports.getTypesFromDefinitions = iYn;
});