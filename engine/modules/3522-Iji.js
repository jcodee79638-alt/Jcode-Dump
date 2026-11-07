
function Iji(e) {
  if (e === "") return !0;
  if (/\s/.test(e)) return !1;
  if (e.length % 4 !== 0) return !1;
  try {
    return (atob(e), !0);
  } catch {
    return !1;
  }
}