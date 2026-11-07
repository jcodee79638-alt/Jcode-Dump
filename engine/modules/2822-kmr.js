
var kmr = Ie(function (lLc, n_i) {
  var { dirname: r_i, basename: lta } = cr("path"),
    wmr = new Map();
  n_i.exports = (e) => {
    if (wmr.has(e)) return wmr.get(e);
    let t = r_i(e),
      r = lta(t) === "node_modules" ? t : r_i(t);
    return (wmr.set(e, r), r);
  };
});