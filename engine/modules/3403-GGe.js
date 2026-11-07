
var GGe = ne(() => {
  Gt();
  ((Fbe = re.pipe(Jl("AccountID"))),
    (OGe = re.pipe(Jl("OrgID"))),
    (pSt = re.pipe(Jl("AccessToken"))),
    (UGe = re.pipe(Jl("RefreshToken"))),
    (NGe = re.pipe(Jl("DeviceCode"))),
    (dSt = re.pipe(Jl("UserCode"))));
  mSt = class mSt extends Pa("Account")({ id: Fbe, email: re, url: re, active_org_id: w6(OGe) }) {};
  _St = class _St extends Pa("Org")({ id: OGe, name: re }) {};
  hSt = class hSt extends ki()("AccountRepoError", { message: re, cause: be(yd()) }) {};
  uHe = class uHe extends ki()("AccountServiceError", { message: re, cause: be(yd()) }) {};
  Bbe = class Bbe extends (
    ki()("AccountTransportError", { method: re, url: re, description: be(re), cause: be(yd()) })
  ) {
    static fromHttpClientError(e) {
      return new Bbe({
        method: e.request.method,
        url: e.request.url,
        description: e.description,
        cause: e.cause,
      });
    }
    get message() {
      return [
        `Could not reach ${this.method} ${this.url}.`,
        "This failed before the server returned an HTTP response.",
        this.description,
        "Check your network, proxy, or VPN configuration and try again.",
      ].filter(Boolean).join(`
`);
    }
  };
  LSt = class LSt extends (
    Pa("Login")({ code: NGe, user: dSt, url: re, server: re, expiry: uRe, interval: uRe })
  ) {};
  FGe = class FGe extends A2()("PollSuccess", { email: re }) {};
  BGe = class BGe extends A2()("PollPending", {}) {};
  RGe = class RGe extends A2()("PollSlow", {}) {};
  WGe = class WGe extends A2()("PollExpired", {}) {};
  VGe = class VGe extends A2()("PollDenied", {}) {};
  qGe = class qGe extends A2()("PollError", { cause: yd() }) {};
  KIa = Io([FGe, BGe, RGe, WGe, VGe, qGe]);
});