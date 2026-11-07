
function qt(e) {
  if (typeof e !== "string" || e.length > Math.ceil(ze.imageBytes / 3) * 4 + 32) throw Error("Invalid image");
  let t = /^data:(image\/(?:jpeg|png));base64,([A-Za-z0-9+/]+={0,2})$/.exec(e);
  if (!t || t[2].length % 4) throw Error("Invalid image");
  let n = atob(t[2]);
  if (!n.length || n.length > ze.imageBytes || btoa(n) !== t[2]) throw Error("Invalid image");
  let i = Math.min(n.length, 4096),
    r = new Uint8Array(i + 2);
  for (let o = 0; o < i; o++) r[o] = n.charCodeAt(o);
  ((r[i] = n.charCodeAt(n.length - 2)), (r[i + 1] = n.charCodeAt(n.length - 1)));
  let s = la(r, t[1]);
  if (!s.width || !s.height || s.width > ze.edge || s.height > ze.edge) throw Error("Invalid image");
  return { url: e, mime: t[1], bytes: n.length, ...s };
}