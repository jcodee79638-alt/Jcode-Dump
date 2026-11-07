
var qxn = Ie(function (G5H, Vxn) {
  /*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   */ Vxn.exports = function (e) {
    if (typeof e === "number") return e - e === 0;
    if (typeof e === "string" && e.trim() !== "") return Number.isFinite ? Number.isFinite(+e) : isFinite(+e);
    return !1;
  };
});