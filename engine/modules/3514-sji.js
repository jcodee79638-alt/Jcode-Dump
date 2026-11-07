
function sji(e) {
  try {
    if (typeof URL < "u" && typeof URL.canParse === "function") return URL.canParse(e);
    return (new URL(e), !0);
  } catch {
    return !1;
  }
}