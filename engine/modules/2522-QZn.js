
var QZn = Ie(function (Vuc, zZn) {
  var { readdir: JZn } = cr("fs/promises"),
    { join: KZn } = cr("path"),
    DNo = async (e) => {
      let t = [];
      for (let r of await JZn(e))
        if (r.startsWith("@")) for (let s of await JZn(KZn(e, r))) t.push(KZn(r, s));
        else t.push(r);
      return t;
    };
  zZn.exports = DNo;
});