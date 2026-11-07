
async function iee(e, t, r) {
  let s = QTt(e);
  if (!N8i(s)) await O8i(s, { recursive: !0 });
  let a = t instanceof ReadableStream ? Tva.fromWeb(t) : t,
    H = xva(e);
  if ((await vva(a, H), r)) await Mva(e, r);
}