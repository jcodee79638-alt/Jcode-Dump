
function Ltn(e, t, r) {
  let s = r ?? Date.now();
  if (s !== htn) ((htn = s), (zJt = 0));
  zJt++;
  let a = BigInt(s) * BigInt(4096) + BigInt(zJt);
  a = t === "descending" ? ~a : a;
  let H = Buffer.alloc(6);
  for (let u = 0; u < 6; u++) H[u] = Number((a >> BigInt(40 - 8 * u)) & BigInt(255));
  return e + "_" + H.toString("hex") + B8s(N8s - 12);
}