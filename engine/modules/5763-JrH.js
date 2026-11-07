
function JrH(e, t) {
  let r = ui.mimeType(e),
    s = new Headers({ "content-type": r });
  if (r.startsWith("text/html")) s.set("content-security-policy", QZi(new TextDecoder().decode(t)));
  return lpt(t, { headers: s });
}