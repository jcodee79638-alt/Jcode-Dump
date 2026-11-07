
var ZZt = "~effect/http/HttpServerResponse",
  F6 = (e) => Ma(e, ZZt),
  Rd = (e) =>
    hG({
      status: e?.status ?? 204,
      statusText: e?.statusText,
      headers: e?.headers ? SE(e.headers) : void 0,
      cookies: e?.cookies,
    }),
  eer = (e, t) => {
    let r = t?.headers ? SE(t.headers) : FU;
    return hG({
      status: t?.status ?? 200,
      statusText: t?.statusText,
      headers: r,
      cookies: t?.cookies ?? zft,
      body: v1e(e, vRe(t, r)),
    });
  },
  vRe = (e, t) => {
    if (e?.contentType) return e.contentType;
    else if (e?.headers) return t["content-type"];
  },
  YQ = (e, t) => {
    let r = t?.headers ? SE(t.headers) : FU;
    return hG({
      status: t?.status ?? 200,
      statusText: t?.statusText,
      headers: r,
      cookies: t?.cookies ?? zft,
      body: Ype(e, vRe(t, r)),
    });
  },
  ow = (e, t) => {
    let r = t?.headers ? SE(t.headers) : FU;
    return hG({
      status: t?.status ?? 200,
      statusText: t?.statusText,
      headers: r,
      cookies: t?.cookies,
      body: QW(e, vRe(t, r)),
    });
  },
  jun = (e, t) => {
    let r = t?.headers ? SE(t.headers) : FU;
    return hG({
      status: t?.status ?? 200,
      statusText: t?.statusText,
      headers: r,
      cookies: t?.cookies,
      body: Ype(Aun(zW(e)), vRe(t, r) ?? "application/x-www-form-urlencoded"),
    });
  },
  lpt = (e, t) =>
    hG({
      status: t?.status ?? 200,
      statusText: t?.statusText,
      headers: t?.headers && SE(t.headers),
      cookies: t?.cookies,
      body: WZt(e, { contentType: t?.contentType, contentLength: t?.contentLength }),
    }),
  f2 = (e, t) => {
    let r = t?.headers ? SE(t.headers) : FU;
    return hG({
      status: t?.status ?? 200,
      statusText: t?.statusText,
      headers: r,
      cookies: t?.cookies,
      body: Zpe(e, vRe(t, r), t?.contentLength),
    });
  },
  nse,
  Pun,
  ter,
  Cun = (e, t) => {
    let r = new globalThis.Headers(e.headers);
    if (!Qft(e.cookies)) {
      let a = Yft(e.cookies);
      for (let H of a) r.append("set-cookie", H);
    }
    if (t?.withoutBody)
      return new Response(void 0, { status: e.status, statusText: e.statusText, headers: r });
    let s = e.body;
    switch (s._tag) {
      case "Empty":
        return new Response(void 0, { status: e.status, statusText: e.statusText, headers: r });
      case "Uint8Array":
      case "Raw": {
        if (s.body instanceof Response) {
          for (let [a, H] of r) s.body.headers.set(a, H);
          return s.body;
        }
        return new Response(s.body, { status: e.status, statusText: e.statusText, headers: r });
      }
      case "FormData":
        return new Response(s.formData, { status: e.status, statusText: e.statusText, headers: r });
      case "Stream":
        return new Response(mft(s.stream, t?.context ?? Hg()), {
          status: e.status,
          statusText: e.statusText,
          headers: r,
        });
    }
  },
  mRs,
  hG = (e) => {
    let t = Object.create(mRs);
    if (
      ((t.status = e.status),
      (t.statusText = e.statusText),
      (t.cookies = e.cookies ?? zft),
      (t.body = e.body ?? Qpe),
      t.body._tag !== "Empty" && (t.body.contentType || t.body.contentLength))
    ) {
      let r = BU({ ...e.headers });
      if (t.body.contentType) r["content-type"] = t.body.contentType;
      if (t.body.contentLength) r["content-length"] = t.body.contentLength.toString();
      t.headers = r;
    } else t.headers = e.headers ?? FU;
    return t;
  };