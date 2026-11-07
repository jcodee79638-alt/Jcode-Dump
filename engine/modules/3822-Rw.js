
function Rw(e) {
  return e == null
    ? ub({ type: "object", properties: {}, additionalProperties: !1 })
    : UMa(e)
      ? e
      : "~standard" in e
        ? e["~standard"].vendor === "zod"
          ? nje(e)
          : NMa(e)
        : e();
}