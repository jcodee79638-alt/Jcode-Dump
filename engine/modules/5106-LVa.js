
function LVa(e, t, r) {
  let s = (t || "https://gitlab.com").replace(/\/$/, ""),
    a = r ? `${e}\x00${s}\x00${r}` : `${e}\x00${s}`;
  return V7i.createHash("sha256").update(a).digest("hex").slice(0, 12);
}