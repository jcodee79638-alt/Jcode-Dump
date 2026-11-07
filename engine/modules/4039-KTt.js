
function KTt(e) {
  if (typeof e !== "string" || e.length > Math.ceil(DHe.imageBytes / 3) * 4 + 32)
    throw Error("Invalid image");
  let t = /^data:(image\/(?:jpeg|png));base64,([A-Za-z0-9+/]+={0,2})$/.exec(e);
  if (!t || t[2].length % 4) throw Error("Invalid image");
  let r = atob(t[2]);
  if (!r.length || r.length > DHe.imageBytes || btoa(r) !== t[2]) throw Error("Invalid image");
  let s = Math.min(r.length, 4096),
    a = new Uint8Array(s + 2);
  for (let u = 0; u < s; u++) a[u] = r.charCodeAt(u);
  ((a[s] = r.charCodeAt(r.length - 2)), (a[s + 1] = r.charCodeAt(r.length - 1)));
  let H = sva(a, t[1]);
  if (!H.width || !H.height || H.width > DHe.edge || H.height > DHe.edge) throw Error("Invalid image");
  return { url: e, mime: t[1], bytes: r.length, ...H };
}