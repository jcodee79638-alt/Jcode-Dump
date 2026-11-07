
async function A8s(e) {
  let t = e.body?.getReader();
  if (!t) return;
  let r = setTimeout(() => {
    t.cancel().catch(() => {});
  }, 2000);
  r.unref?.();
  try {
    if (e.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json") return;
    let s = [],
      a = 0;
    while (!0) {
      let D = await t.read();
      if (D.done) break;
      if (((a += D.value.length), a > 4096)) return;
      s.push(D.value);
    }
    let H = JSON.parse(new TextDecoder().decode(Buffer.concat(s)));
    if (
      !H ||
      typeof H !== "object" ||
      !("error" in H) ||
      !H.error ||
      typeof H.error !== "object" ||
      !("code" in H.error) ||
      typeof H.error.code !== "string"
    )
      return;
    let u = H.error.code,
      f =
        e.status === 429 && u === "provider_rate_limited"
          ? IAt
          : e.status >= 500 && e.status < 600 && Object.hasOwn(qfe, u)
            ? qfe[u]
            : void 0;
    if (f) {
      let D = e.headers.get("x-jac-support-id"),
        S =
          D?.length === 36 && /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(D)
            ? D
            : void 0;
      return { message: f, responseHeaders: S ? { "x-jac-support-id": S } : void 0 };
    }
    let d = PFe(u),
      _ = e.status === 503 && u === DZr && e.headers.get(wFe) === kFe;
    if (!d && !_) return;
    let L = MAt(e.headers.get("retry-after")),
      I = e.status === 429 && u === "global_concurrency" ? UFe(e.headers.get(OFe)) : void 0;
    return {
      message: _ ? yAt : d,
      responseHeaders: {
        ...(I === void 0 ? {} : { [OFe]: String(I) }),
        ...(_ ? { [wFe]: kFe } : {}),
        ...(L === void 0 ? {} : { "retry-after": String(Math.ceil(L / 1000)) }),
      },
    };
  } catch {
    return;
  } finally {
    (clearTimeout(r), await t.cancel().catch(() => {}), t.releaseLock());
  }
}