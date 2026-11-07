
var WQ = "~effect/platform/Path",
  rw,
  Ccn = function () {
    let t = "",
      r = !1,
      s = void 0;
    for (let a = arguments.length - 1; a >= -1 && !r; a--) {
      let H;
      if (a >= 0) H = arguments[a];
      else {
        let u = globalThis.process;
        if (
          s === void 0 &&
          "process" in globalThis &&
          typeof u === "object" &&
          u !== null &&
          typeof u.cwd === "function"
        )
          s = u.cwd();
        H = s;
      }
      if (H.length === 0) continue;
      ((t = H + "/" + t), (r = H.charCodeAt(0) === 47));
    }
    if (((t = Pcn(t, !r)), r))
      if (t.length > 0) return "/" + t;
      else return "/";
    else if (t.length > 0) return t;
    else return ".";
  },
  ZFs = 47,
  t2s,
  r2s,
  n2s,
  i2s,
  s2s,
  $ft,
  wcn;