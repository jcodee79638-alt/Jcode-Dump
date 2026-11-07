
var ngi = Ie(function (tgi) {
  Object.defineProperty(tgi, "__esModule", { value: !0 });
  tgi.commonAncestorPath = void 0;
  var y8 = cr("path");
  function* fca(e, t) {
    let [r, s] = e.length > t.length ? [e, t] : [t, e];
    for (let a of s)
      if (a === r.shift()) yield a;
      else break;
  }
  var pca = (e, t) =>
      e === t
        ? e
        : !e || !t
          ? null
          : y8.parse(e).root !== y8.parse(t).root
            ? null
            : [...fca(y8.normalize(e).split(y8.sep), y8.normalize(t).split(y8.sep))].join(y8.sep),
    dca = (...e) => e.reduce(pca);
  tgi.commonAncestorPath = dca;
});