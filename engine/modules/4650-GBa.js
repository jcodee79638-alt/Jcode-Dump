
function GBa(e) {
  let t = typeof e === "function" ? e : e.fetch,
    r = LWi.get(t);
  if (r) return r;
  let s = (async () => {
    try {
      let a = "Response" in t ? t.Response : (await t("data:,")).constructor,
        H = new FormData();
      if (H.toString() === (await new a(H).text())) return !1;
      return !0;
    } catch {
      return !0;
    }
  })();
  return (LWi.set(t, s), s);
}