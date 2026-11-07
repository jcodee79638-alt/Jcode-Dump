
function uJa(e) {
  let t = e?.model;
  if (!t || typeof t !== "object") return;
  let r = "api" in t && t.api && typeof t.api === "object" ? t.api : void 0,
    s = r && "id" in r && typeof r.id === "string" ? r.id : void 0,
    a = "id" in t && typeof t.id === "string" ? t.id : void 0;
  return (s ?? a)?.slice(0, 100);
}