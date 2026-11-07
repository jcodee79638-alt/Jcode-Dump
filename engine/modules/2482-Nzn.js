
var Nzn = Ie(function (nuc, Uzn) {
  var s6o = P$t(),
    o6o = Var(),
    Zj = cr("fs/promises"),
    Af = cr("path"),
    { log: wzn } = mg(),
    kzn = cr("module"),
    NAr;
  function Pzn() {
    if (!NAr) NAr = jVe();
    return NAr;
  }
  var FAr;
  function R0t() {
    if (!FAr) FAr = T0t().glob;
    return FAr;
  }
  function a6o(e, t) {
    if (e.bin) {
      if (typeof e.bin === "string" && e.name)
        (t?.push('"bin" was converted to an object'), (e.bin = { [e.name]: e.bin }));
      else if (Array.isArray(e.bin))
        (t?.push('"bin" was converted to an object'),
          (e.bin = e.bin.reduce((r, s) => ((r[Af.basename(s)] = s), r), {})));
      if (typeof e.bin === "object") {
        for (let r in e.bin) {
          if (typeof e.bin[r] !== "string") {
            (delete e.bin[r], t?.push(`removed invalid "bin[${r}]"`));
            continue;
          }
          let s = Af.basename(ISe(r));
          if (!s) {
            (delete e.bin[r], t?.push(`removed invalid "bin[${r}]"`));
            continue;
          }
          let a = ISe(e.bin[r]);
          if (!a) {
            (delete e.bin[r], t?.push(`removed invalid "bin[${r}]"`));
            continue;
          }
          if (s !== r) (delete e.bin[r], t?.push(`"bin[${r}]" was renamed to "bin[${s}]"`));
          if (a !== e.bin[r]) t?.push(`"bin[${s}]" script name ${a} was invalid and removed`);
          e.bin[s] = a;
        }
        if (Object.keys(e.bin).length === 0) (t?.push('empty "bin" was removed'), delete e.bin);
        return e;
      }
    }
    delete e.bin;
  }
  function H6o(e, t) {
    if (e.man) {
      let r = [];
      for (let s of Array.isArray(e.man) ? e.man : [e.man])
        if (typeof s !== "string") t?.push(`removed invalid "man [${s}]"`);
        else r.push(ISe(s));
      if (!r.length) t?.push('empty "man" was removed');
      else return ((e.man = r), e);
    }
    delete e.man;
  }
  function c6o(e) {
    return !e.match(/[/@\s+%:]/) && e === encodeURIComponent(e);
  }
  function A6o(e) {
    if (e.charAt(0) !== "@") return !1;
    let t = e.slice(1).split("/");
    if (t.length !== 2) return !1;
    return t[0] && t[1] && t[0] === encodeURIComponent(t[0]) && t[1] === encodeURIComponent(t[1]);
  }
  function Czn(e) {
    return e.replace(/\\|:/g, "/");
  }
  function ISe(e) {
    let t = Czn(Af.join(".", Af.join("/", Czn(e))));
    return t.startsWith("./") ? "" : t;
  }
  function Ozn(e, { strict: t, steps: r, changes: s, allowLegacyCase: a }) {
    let H = e.content,
      u = `${H.name ?? ""}@${H.version ?? ""}`;
    if (r.includes("fixName") || r.includes("fixNameField") || r.includes("normalizeData"))
      if (!H.name && !t) (s?.push('Missing "name" field was set to an empty string'), (H.name = ""));
      else {
        if (typeof H.name !== "string") throw Error("name field must be a string.");
        if (!t) {
          let f = H.name.trim();
          if (H.name !== f) (s?.push('Whitespace was trimmed from "name"'), (H.name = f));
        }
        if (
          H.name.startsWith(".") ||
          !(A6o(H.name) || c6o(H.name)) ||
          (t && !a && H.name !== H.name.toLowerCase()) ||
          H.name.toLowerCase() === "node_modules" ||
          H.name.toLowerCase() === "favicon.ico"
        )
          throw Error("Invalid name: " + JSON.stringify(H.name));
      }
    if (r.includes("fixName")) {
      if (kzn.builtinModules.includes(H.name))
        wzn.warn("package-json", u, `Package name "${H.name}" conflicts with a Node.js built-in module name`);
    }
    if (r.includes("fixVersionField") || r.includes("normalizeData")) {
      let f = !t;
      if (!H.version) H.version = "";
      else {
        if (!s6o(H.version, f)) throw Error(`Invalid version: "${H.version}"`);
        let d = o6o(H.version, f);
        if (d !== H.version) (s?.push(`"version" was cleaned and set to "${d}"`), (H.version = d));
      }
    }
    if (r.includes("_attributes")) {
      for (let f in H) if (f.startsWith("_")) (s?.push(`"${f}" was removed`), delete e.content[f]);
    }
    if (r.includes("_id")) {
      if (H.name && H.version) (s?.push(`"_id" was set to ${u}`), (H._id = u));
    }
    if (r.includes("bundledDependencies")) {
      if (H.bundleDependencies === void 0 && H.bundledDependencies !== void 0)
        ((H.bundleDependencies = H.bundledDependencies), s?.push('Deleted incorrect "bundledDependencies"'));
      delete H.bundledDependencies;
    }
    if (r.includes("bundleDependencies")) {
      let f = H.bundleDependencies;
      if (f === !1 && !r.includes("bundleDependenciesDeleteFalse"))
        (s?.push('"bundleDependencies" was changed from "false" to "[]"'), (H.bundleDependencies = []));
      else if (f === !0)
        (s?.push('"bundleDependencies" was auto-populated from "dependencies"'),
          (H.bundleDependencies = Object.keys(H.dependencies || {})));
      else if (f && typeof f === "object") {
        if (!Array.isArray(f))
          (s?.push('"bundleDependencies" was changed from an object to an array'),
            (H.bundleDependencies = Object.keys(f)));
      } else if ("bundleDependencies" in H)
        (s?.push('"bundleDependencies" was removed'), delete H.bundleDependencies);
    }
    if (r.includes("optionalDedupe")) {
      if (H.dependencies && H.optionalDependencies && typeof H.optionalDependencies === "object") {
        for (let f in H.optionalDependencies)
          (s?.push(`optionalDependencies."${f}" was removed`), delete H.dependencies[f]);
        if (!Object.keys(H.dependencies).length)
          (s?.push('Empty "optionalDependencies" was removed'), delete H.dependencies);
      }
    }
    if ((r.includes("scripts") || r.includes("scriptpath")) && H.scripts !== void 0) {
      let f = /^(\.[/\\])?node_modules[/\\].bin[\\/]/;
      if (typeof H.scripts === "object") {
        for (let d in H.scripts)
          if (typeof H.scripts[d] !== "string")
            (delete H.scripts[d], s?.push(`Invalid scripts."${d}" was removed`));
          else if (r.includes("scriptpath") && f.test(H.scripts[d]))
            ((H.scripts[d] = H.scripts[d].replace(f, "")),
              s?.push(`scripts entry "${d}" was fixed to remove node_modules/.bin reference`));
      } else (s?.push('Removed invalid "scripts"'), delete H.scripts);
    }
    if (r.includes("funding")) {
      if (H.funding && typeof H.funding === "string")
        ((H.funding = { url: H.funding }),
          s?.push('"funding" was changed to an object with a url attribute'));
    }
    if (r.includes("fixRepositoryField") || r.includes("normalizeData")) {
      if (H.repositories)
        (s?.push(`"repository" was set to the first entry in "repositories" (${H.repository})`),
          (H.repository = H.repositories[0]));
      if (H.repository) {
        if (typeof H.repository === "string")
          (s?.push('"repository" was changed from a string to an object'),
            (H.repository = { type: "git", url: H.repository }));
        if (H.repository.url) {
          let f = Pzn().fromUrl(H.repository.url),
            d;
          if (f) {
            if (f.getDefaultRepresentation() === "shortcut") d = f.https();
            else d = f.toString();
            if (d !== H.repository.url)
              (s?.push(`"repository.url" was normalized to "${d}"`), (H.repository.url = d));
          }
        }
      }
    }
    if (r.includes("fixDependencies") || r.includes("normalizeData")) {
      for (let f of ["dependencies", "devDependencies", "optionalDependencies"])
        if (H[f]) {
          let d = !0;
          if (typeof H[f] === "string")
            (s?.push(`"${f}" was converted from a string into an object`),
              (H[f] = H[f].trim().split(/[\n\r\s\t ,]+/)),
              (d = !1));
          if (Array.isArray(H[f])) {
            if (d) s?.push(`"${f}" was converted from an array into an object`);
            let _ = {};
            for (let L of H[f])
              if (typeof L === "string") {
                let I = L.trim().split(/(:?[@\s><=])/),
                  D = I.shift(),
                  S = I.join("").replace(/^@/, "").trim();
                _[D] = S;
              }
            H[f] = _;
          }
        }
      for (let f of ["dependencies", "devDependencies"])
        if (f in H)
          if (!H[f] || typeof H[f] !== "object") (s?.push(`Removed invalid "${f}"`), delete H[f]);
          else
            for (let d in H[f]) {
              if (typeof H[f][d] !== "string") (s?.push(`Removed invalid "${f}.${d}"`), delete H[f][d]);
              let L = Pzn().fromUrl(H[f][d])?.toString();
              if (L && L !== H[f][d])
                (s?.push(`Normalized git reference to "${f}.${d}"`), (H[f][d] = L.toString()));
            }
    }
    if (r.includes("normalizeData")) {
      let { normalizeData: f } = vKn();
      f(H, s);
    }
  }
  async function u6o(e, { steps: t, root: r, changes: s }) {
    let a = e.content,
      H = a.scripts || {},
      u = `${a.name ?? ""}@${a.version ?? ""}`;
    if (t.includes("gypfile")) {
      if (!H.install && !H.preinstall && a.gypfile !== !1) {
        if ((await R0t()("*.gyp", { cwd: e.path })).length)
          ((H.install = "node-gyp rebuild"),
            (a.scripts = H),
            (a.gypfile = !0),
            s?.push('"scripts.install" was set to "node-gyp rebuild"'),
            s?.push('"gypfile" was set to "true"'));
      }
    }
    if (t.includes("serverjs") && !H.start)
      try {
        (await Zj.access(Af.join(e.path, "server.js")),
          (H.start = "node server.js"),
          (a.scripts = H),
          s?.push('"scripts.start" was set to "node server.js"'));
      } catch {}
    if (t.includes("authors") && !a.contributors)
      try {
        let d = (await Zj.readFile(Af.join(e.path, "AUTHORS"), "utf8"))
          .split(/\r?\n/g)
          .map((_) => _.replace(/^\s*#.*$/, "").trim())
          .filter((_) => _);
        ((a.contributors = d),
          s?.push('"contributors" was auto-populated with the contents of the "AUTHORS" file'));
      } catch {}
    if (t.includes("readme") && !a.readme) {
      let f = /\.m?a?r?k?d?o?w?n?$/i,
        d = await R0t()("{README,README.*}", { cwd: e.path, nocase: !0, mark: !0 }),
        _;
      for (let L of d)
        if (!L.endsWith(Af.sep)) {
          if (L.match(f)) {
            _ = L;
            break;
          }
          if (L.endsWith("README")) _ = L;
        }
      if (_) {
        let L = await Zj.readFile(Af.join(e.path, _), "utf8");
        ((a.readme = L),
          (a.readmeFilename = _),
          s?.push(`"readme" was set to the contents of ${_}`),
          s?.push(`"readmeFilename" was set to ${_}`));
      }
      if (!a.readme) a.readme = "ERROR: No README data found!";
    }
    if (t.includes("mans")) {
      if (a.directories?.man && !a.man) {
        let f = ISe(a.directories.man),
          d = Af.resolve(e.path, f),
          _ = await R0t()("**/*.[0-9]", { cwd: d });
        a.man = _.map((L) => Af.relative(e.path, Af.join(d, L)).split(Af.sep).join("/"));
      }
      H6o(a, s);
    }
    if (t.includes("binDir") && a.directories?.bin && !a.bin && e.path) {
      let f = ISe(a.directories.bin),
        d = await R0t()("**", { cwd: Af.resolve(e.path, f) });
      a.bin = d.reduce((_, L) => {
        if (L && !L.startsWith(".")) {
          let I = Af.basename(L);
          _[I] = `${f}/${ISe(L)}`;
        }
        return _;
      }, {});
    } else if (t.includes("bin") || t.includes("binDir") || t.includes("binRefs")) a6o(a, s);
    if (t.includes("gitHead") && !a.gitHead) {
      let f = UAr(),
        d = await f.find({ cwd: e.path, root: r }),
        _;
      if (d)
        try {
          _ = await Zj.readFile(Af.resolve(d, ".git/HEAD"), "utf8");
        } catch (I) {}
      let L;
      if (_)
        if (_.startsWith("ref: ")) {
          let I = _.replace(/^ref: /, "").trim(),
            D = Af.resolve(d, ".git", I);
          try {
            ((L = await Zj.readFile(D, "utf8")), (L = L.replace(/^ref: /, "").trim()));
          } catch (S) {}
          if (!L) {
            let S = Af.resolve(d, ".git/packed-refs");
            try {
              let T = await Zj.readFile(S, "utf8");
              if (T) {
                T = T.split(`
`);
                for (let C = 0; C < T.length; C++) {
                  let O = T[C].match(/^([0-9a-f]{40}) (.+)$/);
                  if (O && O[2].trim() === I) {
                    L = O[1];
                    break;
                  }
                }
              }
            } catch {}
          }
        } else L = _.trim();
      if (L) a.gitHead = L;
    }
    if (t.includes("fillTypes")) {
      let f = a.main || "index.js";
      if (typeof f !== "string") throw TypeError('The "main" attribute must be of type string.');
      let _ = `./${Af.join(Af.dirname(f), Af.basename(f, Af.extname(f)))}.d.ts`;
      if (!("types" in a || "typings" in a))
        try {
          (await Zj.access(Af.join(e.path, _)), (a.types = _.split(Af.sep).join("/")));
        } catch {}
    }
    if (t.includes("binRefs") && a.bin instanceof Object)
      for (let f in a.bin)
        try {
          await Zj.access(Af.resolve(e.path, a.bin[f]));
        } catch {
          wzn.warn("package-json", u, `No bin file found at ${a.bin[f]}`);
        }
  }
  async function l6o(e, t) {
    if (!e.content) throw Error("Can not normalize without content");
    (await u6o(e, t), Ozn(e, t));
  }
  function f6o(e, t) {
    Ozn(e, t);
  }
  Uzn.exports = { normalize: l6o, syncNormalize: f6o };
});