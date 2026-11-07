
function NVa(e) {
  if (!e || typeof e !== "object") return;
  let t = e,
    r = t.response && typeof t.response === "object" ? t.response : void 0,
    s = t.copilot_usage ?? r?.copilot_usage;
  if (!s || typeof s !== "object") return;
  let a = s.total_nano_aiu;
  if (typeof a !== "number" || !Number.isFinite(a) || a < 0) return;
  return a;
}