
var Tae = Ie(function (oLc, Zyt) {
  var __dirname =
      "C:\\Users\\Jac\\Desktop\\Jac Code\\node_modules\\.bun\\@npmcli+arborist@9.4.0+759ce506b1ed1a42\\node_modules\\@npmcli\\arborist\\lib",
    ita =
      process.env.ARBORIST_DEBUG !== "0" &&
      (process.env.ARBORIST_DEBUG === "1" ||
        /\barborist\b/.test(process.env.NODE_DEBUG || "") ||
        (process.env.npm_package_name === "@npmcli/arborist" &&
          ["test", "snap"].includes(process.env.npm_lifecycle_event)) ||
        process.cwd() === cr("path").resolve(__dirname, ".."));
  Zyt.exports = ita ? (e) => e() : () => {};
  var sta = process.stderr.isTTY ? (e) => `\x1B[31m${e}\x1B[39m` : (e) => e;
  Zyt.exports.log = (...e) =>
    Zyt.exports(() => {
      let { format: t } = cr("util"),
        r = `
${process.pid} ${sta(t(e.shift()))} `;
      ((e = (
        r +
        t(...e)
          .trim()
          .split(
            `
`,
          )
          .join(r)
      ).trim()),
        console.error(e));
    });
});