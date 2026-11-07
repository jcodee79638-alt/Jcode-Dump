
var fwr = ne(() => {
  fwr();
  Gt();
  ((ysH = re.pipe(Jl("AccountID"))),
    (lrs = re.pipe(Jl("OrgID"))),
    (CFA = re.pipe(Jl("AccessToken"))),
    (wFA = re.pipe(Jl("RefreshToken"))),
    (MsH = re.pipe(Jl("DeviceCode"))),
    (xsH = re.pipe(Jl("UserCode"))));
  SsH = class SsH extends Pa("Account")({ id: ysH, email: re, url: re, active_org_id: w6(lrs) }) {};
  TsH = class TsH extends Pa("Org")({ id: lrs, name: re }) {};
  vsH = class vsH extends ki()("AccountRepoError", { message: re, cause: be(yd()) }) {};
  bsH = class bsH extends ki()("AccountServiceError", { message: re, cause: be(yd()) }) {};
  frs = class frs extends (
    ki()("AccountTransportError", { method: re, url: re, description: be(re), cause: be(yd()) })
  ) {
    static fromHttpClientError(e) {
      return new frs({
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
  jsH = class jsH extends (
    Pa("Login")({ code: MsH, user: xsH, url: re, server: re, expiry: uRe, interval: uRe })
  ) {};
  prs = class prs extends A2()("PollSuccess", { email: re }) {};
  drs = class drs extends A2()("PollPending", {}) {};
  mrs = class mrs extends A2()("PollSlow", {}) {};
  _rs = class _rs extends A2()("PollExpired", {}) {};
  hrs = class hrs extends A2()("PollDenied", {}) {};
  Lrs = class Lrs extends A2()("PollError", { cause: yd() }) {};
  kFA = Io([prs, drs, mrs, _rs, hrs, Lrs]);
});