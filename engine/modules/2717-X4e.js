
var X4e = Ie(function (G4e) {
  var PJo =
    (G4e && G4e.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(G4e, "__esModule", { value: !0 });
  G4e.fetchWithRetry = BJo;
  var UAi = L7e(),
    NAi = cr("http2"),
    CJo = PJo(C4e()),
    NDt = mg(),
    FAi = Hae(),
    BAi = UDt(),
    {
      HTTP2_HEADER_LOCATION: wJo,
      HTTP2_HEADER_CONTENT_TYPE: kJo,
      HTTP2_HEADER_USER_AGENT: OJo,
      HTTP_STATUS_INTERNAL_SERVER_ERROR: UJo,
      HTTP_STATUS_TOO_MANY_REQUESTS: NJo,
      HTTP_STATUS_REQUEST_TIMEOUT: FJo,
    } = NAi.constants;
  async function BJo(e, t) {
    return UAi.promiseRetry(async (r, s) => {
      let a = t.method || "POST",
        H = { [OJo]: FAi.ua.getUserAgent(), ...t.headers },
        u = await (0, CJo.default)(e, {
          method: a,
          headers: H,
          body: t.body,
          timeout: t.timeout,
          retry: !1,
        }).catch((f) => (NDt.log.http("fetch", `${a} ${e} attempt ${s} failed with ${f}`), r(f)));
      if (u.ok) return u;
      else {
        let f = await RJo(u);
        if ((NDt.log.http("fetch", `${a} ${e} attempt ${s} failed with ${u.status}`), WJo(u.status)))
          return r(f);
        else throw f;
      }
    }, VJo(t.retry));
  }
  var RJo = async (e) => {
      let t = e.statusText,
        r = e.headers.get(wJo) || void 0;
      if (e.headers.get(kJo)?.includes("application/json"))
        try {
          t = (await e.json()).message || t;
        } catch (a) {}
      return new BAi.HTTPError({ status: e.status, message: t, location: r });
    },
    WJo = (e) => [FJo, NJo].includes(e) || e >= UJo,
    VJo = (e) => {
      if (typeof e === "boolean") return { retries: e ? 1 : 0 };
      else if (typeof e === "number") return { retries: e };
      else return { retries: 0, ...e };
    };
});