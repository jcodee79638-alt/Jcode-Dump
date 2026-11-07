
var qRi = ne(() => {
  zMr();
  URi();
  zMr();
  ((u2a = c2a(A2a.execFile)),
    (l2a = (() => {
      let t;
      return async function () {
        if (t) return t;
        let r = "/etc/wsl.conf",
          s = !1;
        try {
          (await YMr.access(r, BRi.F_OK), (s = !0));
        } catch {}
        if (!s) return "/mnt/";
        let a = await YMr.readFile(r, { encoding: "utf8" }),
          H = NRi(a);
        if (H === void 0) return "/mnt/";
        return ((t = H), (t = t.endsWith("/") ? t : `${t}/`), t);
      };
    })()),
    (ajt = eJ ? f2a : QMr));
});
import GRi from "process";
import { Buffer as d2a } from "buffer";
import { promisify as m2a } from "util";
import _2a from "child_process";