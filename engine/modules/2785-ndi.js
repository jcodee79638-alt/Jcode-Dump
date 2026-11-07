
var ndi = Ie(function (rdi) {
  Object.defineProperty(rdi, "__esModule", { value: !0 });
  rdi.verifySubjectAlternativeName = bYo;
  rdi.verifyExtensions = jYo;
  rdi.verifyOIDs = PYo;
  var lve = aP();
  function bYo(e, t) {
    if (t === void 0 || !t.match(e))
      throw new lve.PolicyError({
        code: "UNTRUSTED_SIGNER_ERROR",
        message: `certificate identity error - expected ${e}, got ${t}`,
      });
  }
  function jYo(e, t = {}) {
    let r;
    for (r in e)
      if (t[r] !== e[r])
        throw new lve.PolicyError({
          code: "UNTRUSTED_SIGNER_ERROR",
          message: `invalid certificate extension - expected ${r}=${e[r]}, got ${r}=${t[r]}`,
        });
  }
  function PYo(e, t = []) {
    for (let r of e)
      if (!t.find((a) => CYo(r.oid?.id, a.oid?.id) && r.value.equals(a.value))) {
        let a = r.oid?.id.join(".") ?? "<unknown>";
        throw new lve.PolicyError({
          code: "UNTRUSTED_SIGNER_ERROR",
          message: `invalid certificate extension - missing OID ${a}`,
        });
      }
  }
  function CYo(e, t) {
    if (e === void 0 || t === void 0) return !1;
    return e.length === t.length && e.every((r, s) => r === t[s]);
  }
});