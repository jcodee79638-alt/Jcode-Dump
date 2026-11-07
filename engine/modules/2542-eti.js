
var eti = Ie(function (slc, e4e) {
  var { rm: dFo } = cr("fs/promises"),
    mFo = clr(),
    Qei = kSe(),
    JSe = z7e(),
    Yei = cr("path"),
    _Fo = zei();
  e4e.exports = Zei;
  e4e.exports.entry = Zei;
  function Zei(e, t, r) {
    return (JSe.clearMemoized(), Qei.delete(e, t, r));
  }
  e4e.exports.content = hFo;
  function hFo(e, t) {
    return (JSe.clearMemoized(), _Fo(e, t));
  }
  e4e.exports.all = LFo;
  async function LFo(e) {
    JSe.clearMemoized();
    let t = await mFo(Yei.join(e, "*(content-*|index-*)"), { silent: !0, nosort: !0 });
    return Promise.all(t.map((r) => dFo(r, { recursive: !0, force: !0 })));
  }
});