
var Ign = Ie(function (b2H, Egn) {
  var Lgn = { "prs.": 100, "x-": 200, "x.": 300, "vnd.": 400, default: 900 },
    $gn = { nginx: 10, apache: 20, iana: 40, default: 30 },
    ggn = { application: 1, font: 2, audio: 2, video: 3, default: 0 };
  Egn.exports = function (t, r = "default") {
    if (t === "application/octet-stream") return 0;
    let [s, a] = t.split("/"),
      H = a.replace(/(\.|x-).*/, "$1"),
      u = Lgn[H] || Lgn.default,
      f = $gn[r] || $gn.default,
      d = ggn[s] || ggn.default,
      _ = 1 - t.length / 100;
    return u + f + d + _;
  };
});