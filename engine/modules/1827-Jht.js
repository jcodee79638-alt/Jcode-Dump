
var Jht = Ie(function (YGH, kxn) {
  var { isexe: vro, sync: bro } = Sxn(),
    { join: jro, delimiter: Pro, sep: Txn, posix: vxn } = cr("path"),
    bxn = new RegExp(`[${vxn.sep}${Txn === vxn.sep ? "" : Txn}]`.replace(/(\\)/g, "\\$1")),
    Cro = new RegExp(`^\\.${bxn.source}`),
    jxn = (e) => Object.assign(Error(`not found: ${e}`), { code: "ENOENT" }),
    Pxn = (e, { path: t = process.env.PATH, pathExt: r = process.env.PATHEXT, delimiter: s = Pro }) => {
      let a = e.match(bxn) ? [""] : [process.cwd(), ...(t || "").split(s)];
      {
        let H = r || [".EXE", ".CMD", ".BAT", ".COM"].join(s),
          u = H.split(s).flatMap((f) => [f, f.toLowerCase()]);
        if (e.includes(".") && u[0] !== "") u.unshift("");
        return { pathEnv: a, pathExt: u, pathExtExe: H };
      }
      return { pathEnv: a, pathExt: [""] };
    },
    Cxn = (e, t) => {
      let r = /^".*"$/.test(e) ? e.slice(1, -1) : e;
      return (!r && Cro.test(t) ? t.slice(0, 2) : "") + jro(r, t);
    },
    wxn = async (e, t = {}) => {
      let { pathEnv: r, pathExt: s, pathExtExe: a } = Pxn(e, t),
        H = [];
      for (let u of r) {
        let f = Cxn(u, e);
        for (let d of s) {
          let _ = f + d;
          if (await vro(_, { pathExt: a, ignoreErrors: !0 })) {
            if (!t.all) return _;
            H.push(_);
          }
        }
      }
      if (t.all && H.length) return H;
      if (t.nothrow) return null;
      throw jxn(e);
    },
    wro = (e, t = {}) => {
      let { pathEnv: r, pathExt: s, pathExtExe: a } = Pxn(e, t),
        H = [];
      for (let u of r) {
        let f = Cxn(u, e);
        for (let d of s) {
          let _ = f + d;
          if (bro(_, { pathExt: a, ignoreErrors: !0 })) {
            if (!t.all) return _;
            H.push(_);
          }
        }
      }
      if (t.all && H.length) return H;
      if (t.nothrow) return null;
      throw jxn(e);
    };
  kxn.exports = wxn;
  wxn.sync = wro;
});
import kro from "path";