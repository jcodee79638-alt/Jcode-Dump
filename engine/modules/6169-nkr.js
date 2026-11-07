
async function nkr(e, t) {
  if (rkr) return;
  await Promise.resolve().then(() => WFe());
  let s = e.status === "current" ? "installed" : e.status === "error" ? "failed" : e.status;
  if (s === "available") return;
  await RFe({
    kind: "update",
    state: s,
    ...(t ? { code: t } : {}),
    ...(e.latest ? { targetVersion: e.latest } : {}),
  });
}