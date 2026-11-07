
var AAi = Ie(function (cAi) {
  Object.defineProperty(cAi, "__esModule", { value: !0 });
  cAi.extractJWTSubject = dJo;
  var HAi = L8();
  function dJo(e) {
    let t = e.split(".", 3),
      r = JSON.parse(HAi.encoding.base64Decode(t[1]));
    if (r.email) {
      if (!r.email_verified) throw Error("JWT email not verified by issuer");
      return r.email;
    }
    if (r.sub) return r.sub;
    else throw Error("JWT subject not found");
  }
});