
var c_i = Ie(function ($ta) {
  $ta.replaceDollarWithPercentPair = H_i;
  $ta.convertToSetCommand = a_i;
  $ta.convertToSetCommands = Lta;
  function a_i(e, t) {
    var r = "";
    if (((e = e || ""), (e = e.trim()), (t = t || ""), (t = t.trim()), e && t && t.length > 0))
      r =
        "@SET " +
        e +
        "=" +
        H_i(t) +
        `\r
`;
    return r;
  }
  function hta(e) {
    var t = {};
    return (
      e.map(function (r) {
        var s = r.split("=");
        t[s[0]] = s[1];
      }),
      t
    );
  }
  function Lta(e) {
    var t = hta(e.split(" ")),
      r = "";
    return (
      Object.keys(t).forEach(function (s) {
        r += a_i(s, t[s]);
      }),
      r
    );
  }
  function H_i(e) {
    var t = /\$\{?([^$@#?\- \t{}:]+)\}?/g,
      r = "",
      s = 0;
    do {
      var a = t.exec(e);
      if (a) {
        var H = e.substring(s, a.index) || "";
        ((r += H + "%" + a[1] + "%"), (s = t.lastIndex));
      }
    } while (t.lastIndex > 0);
    return ((r += e.slice(s)), r);
  }
});