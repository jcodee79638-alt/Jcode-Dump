
var vKn = Ie(function (CAc, TKn) {
  var { URL: IAr } = cr("url"),
    v0t = jVe(),
    kwo = yKn(),
    MKn = {
      dependancies: "dependencies",
      dependecies: "dependencies",
      depdenencies: "dependencies",
      devEependencies: "devDependencies",
      depends: "dependencies",
      "dev-dependencies": "devDependencies",
      devDependences: "devDependencies",
      devDepenencies: "devDependencies",
      devdependencies: "devDependencies",
      repostitory: "repository",
      repo: "repository",
      prefereGlobal: "preferGlobal",
      hompage: "homepage",
      hampage: "homepage",
      autohr: "author",
      autor: "author",
      contributers: "contributors",
      publicationConfig: "publishConfig",
      script: "scripts",
    },
    xKn = (e) => e.includes("@") && e.indexOf("@") < e.lastIndexOf(".");
  function Owo(e) {
    let t = e.trim().split(`
`),
      r = 0;
    while (t[r]?.trim().match(/^(#|$)/)) r++;
    let s = r + 1;
    while (s < t.length && t[s].trim()) s++;
    return t.slice(r, s).join(" ").trim();
  }
  function SKn(e) {
    if (typeof e !== "string") {
      let H = e.name || "",
        u = e.url || e.web,
        f = u ? " (" + u + ")" : "",
        d = e.email || e.mail,
        _ = d ? " <" + d + ">" : "";
      e = H + _ + f;
    }
    let t = e.match(/^([^(<]+)/),
      r = e.match(/\(([^()]+)\)/),
      s = e.match(/<([^<>]+)>/),
      a = {};
    if (t?.[0].trim()) a.name = t[0].trim();
    if (s) a.email = s[1];
    if (r) a.url = r[1];
    return a;
  }
  function Uwo(e, t) {
    if (e.description && typeof e.description !== "string")
      (t?.push("'description' field should be a string"), delete e.description);
    if (e.readme && !e.description && e.readme !== "ERROR: No README data found!")
      e.description = Owo(e.readme);
    if (e.description === void 0) delete e.description;
    if (!e.description) t?.push("No description");
    if (e.modules) (t?.push("modules field is deprecated"), delete e.modules);
    let r = e.files;
    if (r && !Array.isArray(r)) (t?.push("Invalid 'files' member"), delete e.files);
    else if (e.files)
      e.files = e.files.filter(function (u) {
        if (!u || typeof u !== "string") return (t?.push(`Invalid filename in 'files' list: ${u}`), !1);
        else return !0;
      });
    if (e.man && typeof e.man === "string") e.man = [e.man];
    if (!e.bugs && e.repository?.url) {
      let u = v0t.fromUrl(e.repository.url);
      if (u && u.bugs()) e.bugs = { url: u.bugs() };
    } else if (e.bugs) {
      if (typeof e.bugs === "string")
        if (xKn(e.bugs)) e.bugs = { email: e.bugs };
        else if (IAr.canParse(e.bugs)) e.bugs = { url: e.bugs };
        else t?.push("Bug string field must be url, email, or {email,url}");
      else {
        for (let f in e.bugs)
          if (["web", "name"].includes(f))
            (t?.push(`bugs['${f}'] should probably be bugs['url'].`),
              (e.bugs.url = e.bugs[f]),
              delete e.bugs[f]);
        let u = e.bugs;
        if (((e.bugs = {}), u.url))
          if (IAr.canParse(u.url)) e.bugs.url = u.url;
          else t?.push("bugs.url field must be a string url. Deleted.");
        if (u.email)
          if (typeof u.email === "string" && xKn(u.email)) e.bugs.email = u.email;
          else t?.push("bugs.email field must be a string email. Deleted.");
      }
      if (!e.bugs.email && !e.bugs.url)
        (delete e.bugs, t?.push("Normalized value of bugs field is an empty object. Deleted."));
    }
    if (typeof e.keywords === "string") e.keywords = e.keywords.split(/,\s+/);
    if (e.keywords && !Array.isArray(e.keywords))
      (delete e.keywords, t?.push("keywords should be an array of strings"));
    else if (e.keywords)
      e.keywords = e.keywords.filter(function (u) {
        if (typeof u !== "string" || !u) return (t?.push("keywords should be an array of strings"), !1);
        else return !0;
      });
    let s = "bundledDependencies",
      a = "bundleDependencies";
    if (e[s] && !e[a]) ((e[a] = e[s]), delete e[s]);
    if (e[a] && !Array.isArray(e[a]))
      (t?.push("Invalid 'bundleDependencies' list. Must be array of package names"), delete e[a]);
    else if (e[a])
      e[a] = e[a].filter(function (u) {
        if (!u || typeof u !== "string") return (t?.push(`Invalid bundleDependencies member: ${u}`), !1);
        else {
          if (!e.dependencies) e.dependencies = {};
          if (!Object.prototype.hasOwnProperty.call(e.dependencies, u))
            (t?.push(`Non-dependency in bundleDependencies: ${u}`), (e.dependencies[u] = "*"));
          return !0;
        }
      });
    if (!e.homepage && e.repository && e.repository.url) {
      let u = v0t.fromUrl(e.repository.url);
      if (u) e.homepage = u.docs();
    }
    if (e.homepage) {
      if (typeof e.homepage !== "string")
        (t?.push("homepage field must be a string url. Deleted."), delete e.homepage);
      else if (!IAr.canParse(e.homepage)) e.homepage = "http://" + e.homepage;
    }
    if (!e.readme) (t?.push("No README data"), (e.readme = "ERROR: No README data found!"));
    let H = e.license || e.licence;
    if (!H) t?.push("No license field.");
    else if (typeof H !== "string" || H.length < 1 || H.trim() === "")
      t?.push("license should be a valid SPDX license expression");
    else if (!kwo(H)) t?.push("license should be a valid SPDX license expression");
    if (e.author) e.author = SKn(e.author);
    ["maintainers", "contributors"].forEach(function (u) {
      if (!Array.isArray(e[u])) return;
      e[u] = e[u].map(SKn);
    });
    for (let u in MKn)
      if (Object.prototype.hasOwnProperty.call(e, u)) t?.push(`${u} should probably be ${MKn[u]}.`);
  }
  TKn.exports = { normalizeData: Uwo };
});