
function R_n(e, t) {
  if (typeof t === "function") {
    let s = t(e, iqs);
    return vi(s, pH)
      ? s
      : Array.isArray(s)
        ? s.length
          ? Zt.join(
              s.map((a) => (vi(a, pH) ? a : Qm(a))),
              Zt`, `,
            )
          : void 0
        : vi(s, Kl)
          ? Qm(s)
          : void 0;
  }
  let r = Object.entries(t).filter(([s, a]) => a);
  if (!r.length) return;
  return Zt.join(
    r.map(([s, a]) => (a === "asc" ? Qm : TE)(B_n(e, s))),
    Zt`, `,
  );
}