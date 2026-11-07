
var DEt = Ie(function (wNo, IEt) {
  var sei = cr("crypto"),
    { withTempDir: jNo } = Qme(),
    EEt = cr("fs/promises"),
    Ooe = cr("path");
  wNo.mkdir = PNo;
  wNo.tmpName = function (t, r) {
    let s = sei.randomUUID();
    return Ooe.join(t, "tmp", r ? `${r}-${s}` : s);
  };
  async function PNo(e, t = {}) {
    let { tmpPrefix: r } = t,
      s = Ooe.join(e, "tmp");
    await EEt.mkdir(s, { recursive: !0, owner: "inherit" });
    let a = `${s}${Ooe.sep}${r || ""}`;
    return EEt.mkdtemp(a, { owner: "inherit" });
  }
  wNo.withTmp = CNo;
  function CNo(e, t, r) {
    if (!r) ((r = t), (t = {}));
    return jNo(Ooe.join(e, "tmp"), r, t);
  }
});