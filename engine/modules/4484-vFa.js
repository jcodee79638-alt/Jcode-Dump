
async function vFa(e) {
  let { port: t, path: r } = $Ri(e);
  if (D7 && (ejt !== t || NMr !== r)) await CFa();
  if (D7) return;
  if (await PFa(t)) return;
  ((ejt = t),
    (NMr = r),
    (D7 = MFa(TFa)),
    await new Promise((a, H) => {
      (D7.listen(ejt, xFa, () => {
        a();
      }),
        D7.on("error", H));
    }));
}