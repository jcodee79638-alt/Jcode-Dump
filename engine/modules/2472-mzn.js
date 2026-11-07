
var mzn = Ie(function (XAc, dzn) {
  var o8 = cr("process"),
    Azn = cr("os"),
    uzn = cr("fs");
  function Iko(e) {
    return e.includes("libc.musl-") || e.includes("ld-musl-");
  }
  function lzn() {
    return o8.platform;
  }
  function fzn() {
    return o8.arch;
  }
  var Dko = "/usr/bin/ldd";
  function yko() {
    try {
      let e = uzn.readFileSync(Dko, "utf-8");
      if (e.includes("musl")) return "musl";
      if (e.includes("GNU C Library")) return "glibc";
      return null;
    } catch {
      return;
    }
  }
  function Mko() {
    let e = o8.report.excludeNetwork;
    o8.report.excludeNetwork = !0;
    let t = o8.report.getReport();
    if (((o8.report.excludeNetwork = e), t.header?.glibcVersionRuntime)) XY = "glibc";
    else if (Array.isArray(t.sharedObjects) && t.sharedObjects.some(Iko)) XY = "musl";
    else XY = null;
    return XY;
  }
  var XY;
  function pzn(e) {
    if (e !== "linux") return;
    if (XY === void 0) {
      if (((XY = yko()), XY === void 0)) XY = Mko();
    }
    return XY;
  }
  function xko(e = {}) {
    let t = e.os || lzn();
    return {
      cpu: { name: e.cpu || fzn() },
      libc: { name: e.libc || pzn(t) },
      os: { name: t, version: e.osVersion || Azn.release() },
      packageManager: { name: "npm", version: e.npmVersion },
      runtime: { name: "node", version: e.nodeVersion || o8.version },
    };
  }
  dzn.exports = { cpu: fzn, libc: pzn, os: lzn, devEngines: xko };
});