
var Vti = Ie(function (ufc, Wti) {
  var vlr = (e, t, r = {}) => {
    for (let [s, a] of Object.entries(e))
      if (a === void 0) continue;
      else if (a === null || a === !1) r[`${t}${s}`] = "";
      else if (Array.isArray(a))
        a.forEach((H, u) => {
          vlr({ [`${s}_${u}`]: H }, `${t}`, r);
        });
      else if (typeof a === "object") vlr(a, `${t}${s}_`, r);
      else r[`${t}${s}`] = String(a);
    return r;
  };
  Wti.exports = (e) =>
    vlr(
      { name: e.name, version: e.version, config: e.config, engines: e.engines, bin: e.bin },
      "npm_package_",
    );
});