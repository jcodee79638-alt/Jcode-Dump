
async function fs(e, t) {
  let n = await De(e, t),
    i = await oe.stat(n.target);
  if (!i.isFile() || i.size > qr) throw Error("Choose a text file smaller than 5 MB.");
  let r = await oe.readFile(n.target);
  if (r.includes(0) || !us.isUtf8(r)) return { path: n.relative, type: "binary", content: "" };
  let s = new TextDecoder("utf8", { fatal: !0 }).decode(r);
  return { path: n.relative, type: "text", content: s };
}