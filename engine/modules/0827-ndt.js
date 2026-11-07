
function ndt(e, t = Date.now()) {
  if (t !== kpn) ((kpn = t), (ttr = 0));
  ttr++;
  let r = BigInt(t) * 0x1000n + BigInt(ttr),
    s = e ? ~r : r,
    a = Array.from({ length: 6 }, (u, f) =>
      Number((s >> BigInt(40 - 8 * f)) & 0xffn)
        .toString(16)
        .padStart(2, "0"),
    ).join(""),
    H = crypto.getRandomValues(new Uint8Array(14));
  return (
    a +
    Array.from(H, (u) => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[u % 62]).join("")
  );
}