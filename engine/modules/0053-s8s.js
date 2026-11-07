
async function s8s(e, t) {
  if (
    e.status !== 503 ||
    e.headers.get(LZr) !== $Zr ||
    e.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json"
  )
    return !1;
  let r = e.clone().body?.getReader();
  if (!r) return !1;
  let s = AbortSignal.any([t, AbortSignal.timeout(2000)]),
    a = () => {
      r.cancel().catch(() => {});
    };
  s.addEventListener("abort", a, { once: !0 });
  try {
    let H = 0,
      u = [];
    while (!s.aborted) {
      let f = await r.read();
      if (s.aborted) return !1;
      if (f.done) {
        let d = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(Buffer.concat(u)));
        return (
          !!d &&
          typeof d === "object" &&
          "error" in d &&
          !!d.error &&
          typeof d.error === "object" &&
          "type" in d.error &&
          d.error.type === "gateway_error" &&
          "code" in d.error &&
          d.error.code === hZr
        );
      }
      if (((H += f.value.byteLength), H > 4096)) return !1;
      u.push(f.value);
    }
  } catch {
  } finally {
    (s.removeEventListener("abort", a), a(), r.releaseLock());
  }
  return !1;
}