
var vSi = "~effect/httpapi/HttpApiEndpoint",
  V0a,
  xGe = (e) => (t, r, s) => {
    let a = s?.disableCodecs ?? !1,
      H = a ? Za : D1e;
    return MGe({
      name: t,
      path: r,
      method: e,
      params: a0r(s?.params, H),
      query: a0r(s?.query, H),
      headers: a0r(s?.headers, H),
      payload: q0a(s?.payload, e, a),
      success: G0a(s?.success, e, a),
      error: X0a(s?.error, a),
      annotations: Hg(),
      middlewares: new Set(),
    });
  },
  jSi = "effect/httpapi/stream/failure",
  MH,
  sc,
  c0r,
  Cbe,
  P8;