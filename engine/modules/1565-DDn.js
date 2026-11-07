
var DDn = Ie(function (dQs, fir) {
  var lir = /([()\][%!^"`<>&|;, *?])/g;
  function fQs(e) {
    return ((e = e.replace(lir, "^$1")), e);
  }
  function pQs(e, t) {
    if (
      ((e = `${e}`),
      (e = e.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"')),
      (e = e.replace(/(?=(\\+?)?)\1$/, "$1$1")),
      (e = `"${e}"`),
      (e = e.replace(lir, "^$1")),
      t)
    )
      e = e.replace(lir, "^$1");
    return e;
  }
  dQs.command = fQs;
  dQs.argument = pQs;
});