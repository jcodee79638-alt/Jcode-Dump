
var GJi = Ie(function (JKa) {
  var qJi = uwe();
  function XKa(e, t) {
    var r = e.generatedLine,
      s = t.generatedLine,
      a = e.generatedColumn,
      H = t.generatedColumn;
    return s > r || (s == r && H >= a) || qJi.compareByGeneratedPositionsInflated(e, t) <= 0;
  }
  function WCt() {
    ((this._array = []), (this._sorted = !0), (this._last = { generatedLine: -1, generatedColumn: 0 }));
  }
  WCt.prototype.unsortedForEach = function (t, r) {
    this._array.forEach(t, r);
  };
  WCt.prototype.add = function (t) {
    if (XKa(this._last, t)) ((this._last = t), this._array.push(t));
    else ((this._sorted = !1), this._array.push(t));
  };
  WCt.prototype.toArray = function () {
    if (!this._sorted) (this._array.sort(qJi.compareByGeneratedPositionsInflated), (this._sorted = !0));
    return this._array;
  };
  JKa.MappingList = WCt;
});