
var lPr = Ie(function (qKa) {
  var APr = uwe(),
    uPr = Object.prototype.hasOwnProperty,
    r$e = typeof Map < "u";
  function Kee() {
    ((this._array = []), (this._set = r$e ? new Map() : Object.create(null)));
  }
  Kee.fromArray = function (t, r) {
    var s = new Kee();
    for (var a = 0, H = t.length; a < H; a++) s.add(t[a], r);
    return s;
  };
  Kee.prototype.size = function () {
    return r$e ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  };
  Kee.prototype.add = function (t, r) {
    var s = r$e ? t : APr.toSetString(t),
      a = r$e ? this.has(t) : uPr.call(this._set, s),
      H = this._array.length;
    if (!a || r) this._array.push(t);
    if (!a)
      if (r$e) this._set.set(t, H);
      else this._set[s] = H;
  };
  Kee.prototype.has = function (t) {
    if (r$e) return this._set.has(t);
    else {
      var r = APr.toSetString(t);
      return uPr.call(this._set, r);
    }
  };
  Kee.prototype.indexOf = function (t) {
    if (r$e) {
      var r = this._set.get(t);
      if (r >= 0) return r;
    } else {
      var s = APr.toSetString(t);
      if (uPr.call(this._set, s)) return this._set[s];
    }
    throw Error('"' + t + '" is not in the set.');
  };
  Kee.prototype.at = function (t) {
    if (t >= 0 && t < this._array.length) return this._array[t];
    throw Error("No element indexed by " + t);
  };
  Kee.prototype.toArray = function () {
    return this._array.slice();
  };
  qKa.ArraySet = Kee;
});