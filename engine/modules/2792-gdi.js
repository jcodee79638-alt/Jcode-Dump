
var gdi = Ie(function ($di) {
  Object.defineProperty($di, "__esModule", { value: !0 });
  $di.verifyMerkleInclusion = pZo;
  var dve = L8(),
    pve = aP(),
    lZo = Buffer.from([0]),
    fZo = Buffer.from([1]);
  function pZo(e, t) {
    let r = e.inclusionProof,
      s = BigInt(r.logIndex),
      a = BigInt(t.logSize);
    if (s < 0n || s >= a)
      throw new pve.VerificationError({ code: "TLOG_INCLUSION_PROOF_ERROR", message: `invalid index: ${s}` });
    let { inner: H, border: u } = dZo(s, a);
    if (r.hashes.length !== H + u)
      throw new pve.VerificationError({ code: "TLOG_INCLUSION_PROOF_ERROR", message: "invalid hash count" });
    let f = r.hashes.slice(0, H),
      d = r.hashes.slice(H),
      _ = gZo(e.canonicalizedBody),
      L = _Zo(mZo(_, f, s), d);
    if (!dve.crypto.bufferEqual(L, t.logHash))
      throw new pve.VerificationError({
        code: "TLOG_INCLUSION_PROOF_ERROR",
        message: "calculated root hash does not match inclusion proof",
      });
  }
  function dZo(e, t) {
    let r = hZo(e, t),
      s = LZo(e >> BigInt(r));
    return { inner: r, border: s };
  }
  function mZo(e, t, r) {
    return t.reduce((s, a, H) => {
      if ((r >> BigInt(H)) & BigInt(1)) return pmr(a, s);
      else return pmr(s, a);
    }, e);
  }
  function _Zo(e, t) {
    return t.reduce((r, s) => pmr(s, r), e);
  }
  function hZo(e, t) {
    return $Zo(e ^ (t - BigInt(1)));
  }
  function LZo(e) {
    return e.toString(2).split("1").length - 1;
  }
  function $Zo(e) {
    if (e === 0n) return 0;
    return e.toString(2).length;
  }
  function pmr(e, t) {
    return dve.crypto.digest("sha256", fZo, e, t);
  }
  function gZo(e) {
    return dve.crypto.digest("sha256", lZo, e);
  }
});