
var wnr = ne(() => {
  Gt();
  MMe();
  Cnr = ri("context-overflow");
  f_t = class f_t extends Pa("LLM.HttpRequestDetails")({ method: re, url: re, headers: ks(re, re) }) {};
  p_t = class p_t extends Pa("LLM.HttpResponseDetails")({ status: Aa, headers: ks(re, re) }) {};
  sWe = class sWe extends (
    Pa("LLM.HttpRateLimitDetails")({
      retryAfterMs: be(Aa),
      limit: be(ks(re, re)),
      remaining: be(ks(re, re)),
      reset: be(ks(re, re)),
    })
  ) {};
  M2 = class M2 extends (
    Pa("LLM.HttpContext")({
      request: f_t,
      response: be(p_t),
      body: be(re),
      bodyTruncated: be(Vi),
      requestId: be(re),
      rateLimit: be(sWe),
    })
  ) {};
  bse = class bse extends (
    Pa("LLM.Error.InvalidRequest")({
      _tag: Vc("InvalidRequest"),
      message: re,
      parameter: be(re),
      classification: be(Cnr),
      providerMetadata: be(gp),
      http: be(M2),
    })
  ) {
    get retryable() {
      return !1;
    }
  };
  VEn = class VEn extends (
    Pa("LLM.Error.NoRoute")({ _tag: Vc("NoRoute"), route: H_t, provider: IMe, model: c_t })
  ) {
    get retryable() {
      return !1;
    }
    get message() {
      return `No LLM route for ${this.provider}/${this.model} using ${this.route}`;
    }
  };
  Ude = class Ude extends (
    Pa("LLM.Error.Authentication")({
      _tag: Vc("Authentication"),
      message: re,
      kind: Jo(["missing", "invalid", "expired", "insufficient-permissions", "unknown"]),
      providerMetadata: be(gp),
      http: be(M2),
    })
  ) {
    get retryable() {
      return !1;
    }
  };
  d_t = class d_t extends (
    Pa("LLM.Error.RateLimit")({
      _tag: Vc("RateLimit"),
      message: re,
      retryAfterMs: be(Aa),
      rateLimit: be(sWe),
      providerMetadata: be(gp),
      http: be(M2),
    })
  ) {
    get retryable() {
      return !0;
    }
  };
  m_t = class m_t extends (
    Pa("LLM.Error.QuotaExceeded")({
      _tag: Vc("QuotaExceeded"),
      message: re,
      providerMetadata: be(gp),
      http: be(M2),
    })
  ) {
    get retryable() {
      return !1;
    }
  };
  __t = class __t extends (
    Pa("LLM.Error.ContentPolicy")({
      _tag: Vc("ContentPolicy"),
      message: re,
      providerMetadata: be(gp),
      http: be(M2),
    })
  ) {
    get retryable() {
      return !1;
    }
  };
  h_t = class h_t extends (
    Pa("LLM.Error.ProviderInternal")({
      _tag: Vc("ProviderInternal"),
      message: re,
      status: Aa,
      retryAfterMs: be(Aa),
      providerMetadata: be(gp),
      http: be(M2),
    })
  ) {
    get retryable() {
      return !0;
    }
  };
  TMe = class TMe extends (
    Pa("LLM.Error.Transport")({ _tag: Vc("Transport"), message: re, kind: be(re), url: be(re), http: be(M2) })
  ) {
    get retryable() {
      return !1;
    }
  };
  Nde = class Nde extends (
    Pa("LLM.Error.InvalidProviderOutput")({
      _tag: Vc("InvalidProviderOutput"),
      message: re,
      route: be(re),
      raw: be(re),
      providerMetadata: be(gp),
    })
  ) {
    get retryable() {
      return !1;
    }
  };
  L_t = class L_t extends (
    Pa("LLM.Error.UnknownProvider")({
      _tag: Vc("UnknownProvider"),
      message: re,
      status: be(Aa),
      providerMetadata: be(gp),
      http: be(M2),
    })
  ) {
    get retryable() {
      return !1;
    }
  };
  SKs = Io([bse, VEn, Ude, d_t, m_t, __t, h_t, TMe, Nde, L_t]).pipe(_D("_tag"));
  MD = class MD extends ki()("LLM.Error", { module: re, method: re, reason: SKs }) {
    cause = this.reason;
    get retryable() {
      return this.reason.retryable;
    }
    get retryAfterMs() {
      return "retryAfterMs" in this.reason ? this.reason.retryAfterMs : void 0;
    }
    get message() {
      return `${this.module}.${this.method}: ${this.reason.message}`;
    }
  };
  zp = class zp extends (
    ki()("LLM.ToolFailure", { message: re, error: be(yd()), metadata: be(ks(re, PH)) })
  ) {};
});