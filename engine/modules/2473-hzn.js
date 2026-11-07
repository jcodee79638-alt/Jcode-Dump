
var hzn = Ie(function (JAc, _zn) {
  var Sko = Vxe(),
    Tko = Qar(),
    vko = ["ignore", "warn", "error", "download"],
    bko = ["name", "version", "onFail"],
    jko = ["packageManager", "runtime", "cpu", "libc", "os"];
  function Pko(e, t, r) {
    let { engine: s } = r;
    if (typeof e !== "object" || e === null || Array.isArray(e))
      throw Error(`Invalid non-object value for "${s}"`);
    let a = Object.keys(e);
    for (let H of a) if (!bko.includes(H)) throw Error(`Invalid property "${H}" for "${s}"`);
    if (!a.includes("name")) throw Error(`Missing "name" property for "${s}"`);
    if (typeof e.name !== "string") throw Error(`Invalid non-string value for "name" within "${s}"`);
    if (typeof t.name !== "string" || t.name === "") throw Error(`Unable to determine "name" for "${s}"`);
    if (a.includes("onFail")) {
      if (typeof e.onFail !== "string") throw Error(`Invalid non-string value for "onFail" within "${s}"`);
      if (!vko.includes(e.onFail)) throw Error(`Invalid onFail value "${e.onFail}" for "${s}"`);
    }
    if (e.name !== t.name) return Error(`Invalid name "${e.name}" does not match "${t.name}" for "${s}"`);
    if (a.includes("version")) {
      if (typeof e.version !== "string") throw Error(`Invalid non-string value for "version" within "${s}"`);
      if (typeof t.version !== "string" || t.version === "")
        throw Error(`Unable to determine "version" for "${s}" "${e.name}"`);
      if (Tko(e.version)) {
        if (!Sko(t.version, e.version, r.semver))
          return Error(`Invalid semver version "${e.version}" does not match "${t.version}" for "${s}"`);
      } else if (e.version !== t.version)
        return Error(`Invalid version "${e.version}" does not match "${t.version}" for "${s}"`);
    }
  }
  function Cko(e, t = {}, r = {}) {
    if (typeof e !== "object" || e === null || Array.isArray(e))
      throw Error('Invalid non-object value for "devEngines"');
    let s = [];
    for (let a of Object.keys(e)) {
      if (!jko.includes(a)) throw Error(`Invalid property "devEngines.${a}"`);
      let H = e[a],
        u = [H].flat(),
        f = t[a] || {};
      if (u.length === 0) continue;
      let d = [];
      for (let L of u) {
        let I = Pko(L, f, { ...r, engine: a });
        if (I) d.push(I);
      }
      if (d.length === u.length) {
        let I = u[u.length - 1].onFail || "error";
        if (I === "download") I = "error";
        let D = Object.assign(Error(`Invalid devEngines.${a}`), {
          errors: d,
          engine: a,
          isWarn: I === "warn",
          isError: I === "error",
          current: f,
          required: H,
        });
        s.push(D);
      }
    }
    return s;
  }
  _zn.exports = { checkDevEngines: Cko };
});