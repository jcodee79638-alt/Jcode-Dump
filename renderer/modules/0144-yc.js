
function yc(e) {
  if (typeof e != "string" || e.length > Math.ceil(Ln.imageBytes / 3) * 4 + 32)
    throw new Error("Invalid image");
  const n = /^data:(image\/(?:jpeg|png));base64,([A-Za-z0-9+/]+={0,2})$/.exec(e);
  if (!n || n[2].length % 4) throw new Error("Invalid image");
  const i = atob(n[2]);
  if (!i.length || i.length > Ln.imageBytes || btoa(i) !== n[2]) throw new Error("Invalid image");
  const s = Math.min(i.length, 4096),
    l = new Uint8Array(s + 2);
  for (let c = 0; c < s; c++) l[c] = i.charCodeAt(c);
  ((l[s] = i.charCodeAt(i.length - 2)), (l[s + 1] = i.charCodeAt(i.length - 1)));
  const a = _c(l, n[1]);
  if (!a.width || !a.height || a.width > Ln.edge || a.height > Ln.edge) throw new Error("Invalid image");
  return { url: e, mime: n[1], bytes: i.length, ...a };
}