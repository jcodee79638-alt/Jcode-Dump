
var zSn = Ie(function (aXH, KSn) {
  /*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   */ KSn.exports = function (t) {
    if (typeof t !== "string" || t === "") return !1;
    var r;
    while ((r = /(\\).|([@?!+*]\(.*\))/g.exec(t))) {
      if (r[2]) return !0;
      t = t.slice(r.index + r[0].length);
    }
    return !1;
  };
});