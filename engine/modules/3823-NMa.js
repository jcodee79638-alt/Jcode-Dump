
function NMa(e) {
  return ub(
    () => {
      if (!FMa(e))
        throw Error(
          `Standard schema vendor '${e["~standard"].vendor}' does not support JSON Schema conversion.`,
        );
      return eDr(e["~standard"].jsonSchema.input({ target: "draft-07" }));
    },
    {
      validate: async (t) => {
        let r = await e["~standard"].validate(t);
        return "value" in r
          ? { success: !0, value: r.value }
          : { success: !1, error: new dy({ value: t, cause: r.issues }) };
      },
    },
  );
}