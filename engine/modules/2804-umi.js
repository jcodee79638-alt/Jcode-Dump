
var umi = Ie(function (Jhc, Ami) {
  Ami.exports = (e, t) => {
    let { dependencies: r = {}, optionalDependencies: s = {}, peerDependencies: a = {} } = e;
    return r && typeof r[t] === "string"
      ? r[t]
      : s && typeof s[t] === "string"
        ? s[t]
        : a && typeof a[t] === "string"
          ? a[t]
          : null;
  };
});