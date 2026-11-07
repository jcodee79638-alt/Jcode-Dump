
function zwr(e) {
  if (typeof e !== "string" || !/^[A-Za-z0-9_-]+$/.test(e)) throw new UP();
  let t = Buffer.from(e, "base64url");
  if (t.toString("base64url") !== e) throw new UP();
  return t;
}