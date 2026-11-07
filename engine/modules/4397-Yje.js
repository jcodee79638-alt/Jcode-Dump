
function Yje(e, t) {
  if (e.type === "opaqueredirect")
    return "Redirect not followed: this runtime does not expose the redirect target";
  let r = e.url || t,
    s = WBi(e, r);
  if (!s) return;
  if (
    ((s.username = s.password = s.search = s.hash = ""),
    s.protocol === "http:" && new URL(r).protocol === "https:")
  )
    return ((s.protocol = "https:"), `Redirect to plain http not followed; try ${s.href} instead`);
  return `Redirect to ${s.href} not followed`;
}