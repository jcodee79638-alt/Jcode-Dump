
async function U9a(e) {
  let t = await (await fMr).subtle.digest("SHA-256", new TextEncoder().encode(e));
  return btoa(String.fromCharCode(...new Uint8Array(t)))
    .replace(/\//g, "_")
    .replace(/\+/g, "-")
    .replace(/=/g, "");
}