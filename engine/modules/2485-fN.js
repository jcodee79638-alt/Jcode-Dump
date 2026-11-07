
var fN = Ie(function (ouc, Xzn) {
  var { readFile: h6o, writeFile: L6o } = cr("fs/promises"),
    { resolve: Gzn } = cr("path"),
    $6o = m7e(),
    RAr = KJn(),
    g6o = QJn(),
    E6o = ZJn(),
    { normalize: BAr, syncNormalize: I6o } = Nzn(),
    { read: D6o, parse: y6o } = Wzn(),
    { packageSort: M6o } = qzn(),
    x6o = new Set([RAr, g6o, E6o]),
    S6o = new Set([...RAr.knownKeys, "scripts", "workspaces"]);
  class qme {
    static fixSteps = Object.freeze([
      "binRefs",
      "bundleDependencies",
      "fixName",
      "fixVersionField",
      "fixRepositoryField",
      "fixDependencies",
      "devDependencies",
      "scriptpath",
    ]);
    static normalizeSteps = Object.freeze([
      "_id",
      "_attributes",
      "bundledDependencies",
      "bundleDependencies",
      "optionalDedupe",
      "scripts",
      "funding",
      "bin",
      "binDir",
    ]);
    static prepareSteps = Object.freeze([
      "_id",
      "_attributes",
      "bundledDependencies",
      "bundleDependencies",
      "bundleDependenciesDeleteFalse",
      "gypfile",
      "serverjs",
      "scriptpath",
      "authors",
      "readme",
      "mans",
      "binDir",
      "gitHead",
      "fillTypes",
      "normalizeData",
      "binRefs",
    ]);
    static async create(e, t = {}) {
      let r = new qme();
      if ((await r.create(e), t.data)) return r.update(t.data);
      return r;
    }
    static async load(e, t = {}) {
      let r = new qme();
      if (!t.create) return r.load(e);
      try {
        return await r.load(e);
      } catch (s) {
        if (!s.message.startsWith("Could not read package.json")) throw s;
        return await r.create(e);
      }
    }
    static async fix(e, t) {
      let r = new qme();
      return (await r.load(e, !0), r.fix(t));
    }
    static async prepare(e, t) {
      let r = new qme();
      return (await r.load(e, !0), r.prepare(t));
    }
    static async normalize(e, t) {
      let r = new qme();
      return (await r.load(e), r.normalize(t));
    }
    #e;
    #r;
    #t = "";
    #n = !0;
    async load(e, t) {
      this.#e = e;
      let r;
      try {
        this.#t = await D6o(this.filename);
      } catch (s) {
        if (!t) throw s;
        r = s;
      }
      if (r) {
        let s = Gzn(this.path, "index.js"),
          a;
        try {
          a = await h6o(s, "utf8");
        } catch (H) {
          throw r;
        }
        try {
          this.fromComment(a);
        } catch (H) {
          throw r;
        }
        return ((this.#n = !1), this);
      }
      return this.fromJSON(this.#t);
    }
    fromJSON(e) {
      return ((this.#r = y6o(e)), this);
    }
    fromContent(e) {
      if (!e || typeof e !== "object") throw Error("Content data must be an object");
      return ((this.#r = e), (this.#n = !1), this);
    }
    fromComment(e) {
      if (((e = e.split(/^\/\*\*package(?:\s|$)/m)), e.length < 2))
        throw Error("File has no package in comments");
      if (((e = e[1]), (e = e.split(/\*\*\/$/m)), e.length < 2))
        throw Error("File has no package in comments");
      return ((e = e[0]), (e = e.replace(/^\s*\*/gm, "")), (this.#r = $6o(e)), this);
    }
    get content() {
      return this.#r;
    }
    get path() {
      return this.#e;
    }
    get filename() {
      if (this.path) return Gzn(this.path, "package.json");
      return;
    }
    create(e) {
      return ((this.#e = e), (this.#r = {}), this);
    }
    update(e) {
      if (!this.content) throw Error("Can not update without content.  Please `load` or `create`");
      for (let t of x6o) this.#r = t({ content: e, originalContent: this.content });
      for (let [t, r] of Object.entries(e)) if (!S6o.has(t)) this.content[t] = r;
      return this;
    }
    async save({ sort: e } = {}) {
      if (!this.#n) throw Error("No package.json to save to");
      let { [Symbol.for("indent")]: t, [Symbol.for("newline")]: r, ...s } = this.content,
        a = t === void 0 ? "  " : t,
        H =
          r === void 0
            ? `
`
            : r,
        u = e ? M6o(s) : s,
        f = `${JSON.stringify(u, null, a)}
`.replace(/\n/g, H);
      if (f.trim() !== this.#t.trim()) {
        let d = await L6o(this.filename, f);
        return ((this.#t = f), d);
      }
    }
    syncNormalize(e = {}) {
      return (
        (e.steps = this.constructor.normalizeSteps.filter((t) => t !== "_attributes")),
        I6o(this, e),
        this
      );
    }
    async normalize(e = {}) {
      if (!e.steps) e.steps = this.constructor.normalizeSteps;
      return (await BAr(this, e), this);
    }
    async prepare(e = {}) {
      if (!e.steps) e.steps = this.constructor.prepareSteps;
      return (await BAr(this, e), this);
    }
    async fix(e = {}) {
      return ((e.steps = this.constructor.fixSteps), await BAr(this, e), this);
    }
  }
  Xzn.exports = qme;
});