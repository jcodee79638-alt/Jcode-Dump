
function jDr({ maxRetries: e, abortSignal: t }) {
  if (e != null) {
    if (!Number.isInteger(e))
      throw new UE({ parameter: "maxRetries", value: e, message: "maxRetries must be an integer" });
    if (e < 0) throw new UE({ parameter: "maxRetries", value: e, message: "maxRetries must be >= 0" });
  }
  let r = e != null ? e : 2;
  return { maxRetries: r, retry: iTa({ maxRetries: r, abortSignal: t }) };
}