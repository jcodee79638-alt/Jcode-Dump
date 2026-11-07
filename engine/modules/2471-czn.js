
var czn = Ie(function (gko) {
  var $ko = (e) => (e.fakePlatform || "win32") === "win32";
  gko.isWindows = $ko;
});