
var hsi = Ie(function (npr, jIt) {
  var dsi = cr("tty"),
    Xoe = cr("util");
  npr.init = KWo;
  npr.log = GWo;
  npr.formatArgs = VWo;
  npr.save = XWo;
  npr.load = JWo;
  npr.useColors = WWo;
  npr.destroy = Xoe.deprecate(
    () => {},
    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
  );
  npr.colors = [6, 2, 3, 4, 5, 1];
  try {
    let e = psi();
    if (e && (e.stderr || e).level >= 2)
      npr.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78,
        79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166,
        167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
        205, 206, 207, 208, 209, 214, 215, 220, 221,
      ];
  } catch (e) {}
  npr.inspectOpts = Object.keys(process.env)
    .filter((e) => /^debug_/i.test(e))
    .reduce((e, t) => {
      let r = t
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, (a, H) => H.toUpperCase()),
        s = process.env[t];
      if (/^(yes|on|true|enabled)$/i.test(s)) s = !0;
      else if (/^(no|off|false|disabled)$/i.test(s)) s = !1;
      else if (s === "null") s = null;
      else s = Number(s);
      return ((e[r] = s), e);
    }, {});
  function WWo() {
    return "colors" in npr.inspectOpts ? Boolean(npr.inspectOpts.colors) : dsi.isatty(process.stderr.fd);
  }
  function VWo(e) {
    let { namespace: t, useColors: r } = this;
    if (r) {
      let s = this.color,
        a = "\x1B[3" + (s < 8 ? s : "8;5;" + s),
        H = `  ${a};1m${t} \x1B[0m`;
      ((e[0] =
        H +
        e[0]
          .split(
            `
`,
          )
          .join(
            `
` + H,
          )),
        e.push(a + "m+" + jIt.exports.humanize(this.diff) + "\x1B[0m"));
    } else e[0] = qWo() + t + " " + e[0];
  }
  function qWo() {
    if (npr.inspectOpts.hideDate) return "";
    return new Date().toISOString() + " ";
  }
  function GWo(...e) {
    return process.stderr.write(
      Xoe.formatWithOptions(npr.inspectOpts, ...e) +
        `
`,
    );
  }
  function XWo(e) {
    if (e) process.env.DEBUG = e;
    else delete process.env.DEBUG;
  }
  function JWo() {
    return process.env.DEBUG;
  }
  function KWo(e) {
    e.inspectOpts = {};
    let t = Object.keys(npr.inspectOpts);
    for (let r = 0; r < t.length; r++) e.inspectOpts[t[r]] = npr.inspectOpts[t[r]];
  }
  jIt.exports = Zfr()(npr);
  var { formatters: msi } = jIt.exports;
  msi.o = function (e) {
    return (
      (this.inspectOpts.colors = this.useColors),
      Xoe.inspect(e, this.inspectOpts)
        .split(
          `
`,
        )
        .map((t) => t.trim())
        .join(" ")
    );
  };
  msi.O = function (e) {
    return ((this.inspectOpts.colors = this.useColors), Xoe.inspect(e, this.inspectOpts));
  };
});