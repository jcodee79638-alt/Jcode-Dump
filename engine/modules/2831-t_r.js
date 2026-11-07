
var t_r = Ie(function (ELc, S_i) {
  var { chmod: Qta, open: Yta, readFile: Zta } = cr("fs/promises"),
    era = 511 & ~process.umask(),
    tra = x_i(),
    rra = (e) => e[0] === 35 && e[1] === 33 && /^#![^\n]+\r\n/.test(e.toString()),
    nra = (e) => {
      let t = () => !1;
      return Yta(e, "r").then((r) => {
        let s = Buffer.alloc(2048);
        return r.read(s, 0, 2048, 0).then(
          () => {
            let a = rra(s);
            return r.close().then(
              () => a,
              () => a,
            );
          },
          () => r.close().then(t, t),
        );
      }, t);
    },
    ira = (e) =>
      Zta(e, "utf8").then((t) =>
        tra(
          e,
          t.replace(
            /^(#![^\n]+)\r\n/,
            `$1
`,
          ),
        ),
      ),
    sra = (e, t = era) =>
      Qta(e, t)
        .then(() => nra(e))
        .then((r) => (r ? ira(e) : null));
  S_i.exports = sra;
});