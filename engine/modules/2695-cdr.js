
var cdr = Ie(function (vci) {
  Object.defineProperty(vci, "__esModule", { value: !0 });
  vci.toDER = xXo;
  vci.fromDER = SXo;
  var yXo = /-----BEGIN (.*)-----/,
    MXo = /-----END (.*)-----/;
  function xXo(e) {
    let t = "";
    return (
      e
        .split(
          `
`,
        )
        .forEach((r) => {
          if (r.match(yXo) || r.match(MXo)) return;
          t += r;
        }),
      Buffer.from(t, "base64")
    );
  }
  function SXo(e, t = "CERTIFICATE") {
    let s = e.toString("base64").match(/.{1,64}/g) || "";
    return [`-----BEGIN ${t}-----`, ...s, `-----END ${t}-----`].join(`
`).concat(`
`);
  }
});