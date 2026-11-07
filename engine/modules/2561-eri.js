
var eri = Ie(function (mfc, Zti) {
  var nBo = (e) => {
    if (typeof e !== "object" || !e) throw TypeError("invalid options object provided to runScript");
    let { event: t, path: r, scriptShell: s, env: a = {}, stdio: H = "pipe", args: u = [], cmd: f } = e;
    if (!t || typeof t !== "string") throw TypeError("valid event not provided to runScript");
    if (!r || typeof r !== "string") throw TypeError("valid path not provided to runScript");
    if (s !== void 0 && typeof s !== "string")
      throw TypeError("invalid scriptShell option provided to runScript");
    if (typeof a !== "object" || !a) throw TypeError("invalid env option provided to runScript");
    if (typeof H !== "string" && !Array.isArray(H))
      throw TypeError("invalid stdio option provided to runScript");
    if (!Array.isArray(u) || u.some((d) => typeof d !== "string"))
      throw TypeError("invalid args option provided to runScript");
    if (f !== void 0 && typeof f !== "string") throw TypeError("invalid cmd option provided to runScript");
  };
  Zti.exports = nBo;
});