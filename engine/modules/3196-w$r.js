
var w$r = Ie(function (Svc, Kyi) {
  var SZ = kD(),
    CB = (Kyi.exports = {
      valid: function (e) {
        return (
          SZ.assert(e, "list falsy"),
          SZ.assert(e._previousSibling, "previous falsy"),
          SZ.assert(e._nextSibling, "next falsy"),
          !0
        );
      },
      insertBefore: function (e, t) {
        SZ.assert(CB.valid(e) && CB.valid(t));
        var r = e,
          s = e._previousSibling,
          a = t,
          H = t._previousSibling;
        ((r._previousSibling = H),
          (s._nextSibling = a),
          (H._nextSibling = r),
          (a._previousSibling = s),
          SZ.assert(CB.valid(e) && CB.valid(t)));
      },
      replace: function (e, t) {
        if ((SZ.assert(CB.valid(e) && (t === null || CB.valid(t))), t !== null)) CB.insertBefore(t, e);
        (CB.remove(e), SZ.assert(CB.valid(e) && (t === null || CB.valid(t))));
      },
      remove: function (e) {
        SZ.assert(CB.valid(e));
        var t = e._previousSibling;
        if (t === e) return;
        var r = e._nextSibling;
        ((t._nextSibling = r),
          (r._previousSibling = t),
          (e._previousSibling = e._nextSibling = e),
          SZ.assert(CB.valid(e)));
      },
    });
});