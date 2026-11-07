
var vis = ne(() => {
  OY();
  Z5e();
  Gt();
  Cf();
  Tis = Cde()((e) =>
    e.pipe(
      jf((t) => {
        let r = t.reasons.filter(eQt).find((H) => {
          if (F6(H.defect)) return !1;
          if (LRs(H.defect)) return !1;
          if (rer(H.defect)) return !1;
          return !0;
        });
        if (!r) return NL(t);
        let s = r.defect;
        if (
          Eva.isInstance(s) ||
          Iva.isInstance(s) ||
          Y5e.isInstance(s) ||
          Dva.isInstance(s) ||
          yva.isInstance(s)
        )
          return Jt(ow(s.toObject(), { status: 400 }));
        let a = `err_${crypto.randomUUID().slice(0, 8)}`;
        return cf("failed", { ref: a, error: s, cause: BC(t) }).pipe(
          eu(
            ow(
              new ud.Unknown({
                message: "Unexpected server error. Check server logs for details.",
                ref: a,
              }).toObject(),
              { status: 500 },
            ),
          ),
        );
      }),
    ),
  ).layer;
});