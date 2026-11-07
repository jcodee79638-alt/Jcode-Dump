
var qZn = Ie(function (Ruc, VZn) {
  var RZn = cr("fs/promises"),
    fNo = Wur(),
    WZn = $Zn(),
    pNo = BZn(),
    dNo = WZn.satisfies(">=16.7.0"),
    mNo = async (e, t, r) => {
      let s = fNo(r, {
        copy: ["dereference", "errorOnExist", "filter", "force", "preserveTimestamps", "recursive"],
      });
      return dNo ? RZn.cp(e, t, s) : pNo(e, t, s);
    };
  VZn.exports = mNo;
});