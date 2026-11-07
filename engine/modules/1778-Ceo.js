
function Ceo(e) {
  let t = YG(e);
  if (!("success" in t)) return t;
  return { ok: !0, value: t.intValue };
}