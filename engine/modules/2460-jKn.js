
var jKn = Ie(function (wAc, bKn) {
  var Nwo = (e, t) => {
      if (!e.length) return '""';
      let r;
      if (!/[ \t\n\v"]/.test(e)) r = e;
      else {
        r = '"';
        for (let s = 0; s <= e.length; ++s) {
          let a = 0;
          while (e[s] === "\\") (++s, ++a);
          if (s === e.length) {
            r += "\\".repeat(a * 2);
            break;
          }
          if (e[s] === '"') ((r += "\\".repeat(a * 2 + 1)), (r += e[s]));
          else ((r += "\\".repeat(a)), (r += e[s]));
        }
        r += '"';
      }
      if (((r = r.replace(/[ !%^&()<>|"]/g, "^$&")), t)) r = r.replace(/[ !%^&()<>|"]/g, "^$&");
      return r;
    },
    Fwo = (e) => {
      if (!e.length) return "''";
      if (!/[\t\n\r "#$&'()*;<>?\\`|~]/.test(e)) return e;
      return `'${e.replace(/'/g, "'\\''")}'`.replace(/^(?:'')+(?!$)/, "").replace(/\\'''/g, "\\'");
    };
  bKn.exports = { cmd: Nwo, sh: Fwo };
});