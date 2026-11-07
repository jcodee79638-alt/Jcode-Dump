
async function cFa(e, { metadata: t, clientMetadata: r, scope: s, fetchFn: a }) {
  let H;
  if (t) {
    if (!t.registration_endpoint)
      throw Error("Incompatible auth server: does not support dynamic client registration");
    H = new URL(t.registration_endpoint);
  } else H = new URL("/register", e);
  let u = await YX(a ?? fetch)(H, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...r, ...(s !== void 0 ? { scope: s } : {}) }),
  });
  if (!u.ok) throw await nRi(u);
  return z9a.parse(await u.json());
}