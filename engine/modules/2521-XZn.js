
var XZn = Ie(function (Wuc, GZn) {
  var { join: _No, sep: hNo } = cr("path"),
    LNo = Wur(),
    { mkdir: $No, mkdtemp: gNo, rm: ENo } = cr("fs/promises"),
    INo = async (e, t, r) => {
      let s = LNo(r, { copy: ["tmpPrefix"] });
      await $No(e, { recursive: !0 });
      let a = await gNo(_No(`${e}${hNo}`, s.tmpPrefix || "")),
        H,
        u;
      try {
        u = await t(a);
      } catch (f) {
        H = f;
      }
      try {
        await ENo(a, { force: !0, recursive: !0 });
      } catch {}
      if (H) throw H;
      return u;
    };
  GZn.exports = INo;
});