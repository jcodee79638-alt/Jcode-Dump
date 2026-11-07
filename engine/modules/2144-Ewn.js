
var Ewn = Ie(function (mtc, gwn) {
  var $wn = Lwn(),
    i_o = new RegExp("^(?:@([^/]+?)[/])?([^/]+?)$"),
    s_o = ["node_modules", "favicon.ico"];
  function o_o(e) {
    var t = [],
      r = [];
    if (e === null) return (r.push("name cannot be null"), UVe(t, r));
    if (e === void 0) return (r.push("name cannot be undefined"), UVe(t, r));
    if (typeof e !== "string") return (r.push("name must be a string"), UVe(t, r));
    if (!e.length) r.push("name length must be greater than zero");
    if (e.startsWith(".")) r.push("name cannot start with a period");
    if (e.startsWith("-")) r.push("name cannot start with a hyphen");
    if (e.match(/^_/)) r.push("name cannot start with an underscore");
    if (e.trim() !== e) r.push("name cannot contain leading or trailing spaces");
    if (
      (s_o.forEach(function (u) {
        if (e.toLowerCase() === u) r.push(u + " is not a valid package name");
      }),
      $wn.includes(e.toLowerCase()))
    )
      t.push(e + " is a core module name");
    if (e.length > 214) t.push("name can no longer contain more than 214 characters");
    if (e.toLowerCase() !== e) t.push("name can no longer contain capital letters");
    if (/[~'!()*]/.test(e.split("/").slice(-1)[0]))
      t.push(`name can no longer contain special characters ("~'!()*")`);
    if (encodeURIComponent(e) !== e) {
      var s = e.match(i_o);
      if (s) {
        var a = s[1],
          H = s[2];
        if (H.startsWith(".")) r.push("name cannot start with a period");
        if (encodeURIComponent(a) === a && encodeURIComponent(H) === H) return UVe(t, r);
      }
      r.push("name can only contain URL-friendly characters");
    }
    return UVe(t, r);
  }
  var UVe = function (e, t) {
    var r = {
      validForNewPackages: t.length === 0 && e.length === 0,
      validForOldPackages: t.length === 0,
      warnings: e,
      errors: t,
    };
    if (!r.warnings.length) delete r.warnings;
    if (!r.errors.length) delete r.errors;
    return r;
  };
  gwn.exports = o_o;
});