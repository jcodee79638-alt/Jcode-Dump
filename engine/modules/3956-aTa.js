
function aTa(e) {
  let t = e.filter((r) => r.type === "text");
  if (t.length === 0) return;
  return t.map((r) => r.text).join("");
}