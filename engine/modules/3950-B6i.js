
async function B6i(e, { maxRetries: t, delayInMs: r, backoffFactor: s, abortSignal: a }, H = []) {
  try {
    return await e();
  } catch (u) {
    if ($He(u)) throw u;
    if (t === 0) throw u;
    let f = C5e(u),
      d = [...H, u],
      _ = d.length;
    if (_ > t)
      throw new Cki({
        message: `Failed after ${_} attempts. Last error: ${f}`,
        reason: "maxRetriesExceeded",
        errors: d,
      });
    if (u instanceof Error && U0.isInstance(u) && u.isRetryable === !0 && _ <= t)
      return (
        await Mwi(nTa({ error: u, exponentialBackoffDelay: r }), { abortSignal: a }),
        B6i(e, { maxRetries: t, delayInMs: s * r, backoffFactor: s, abortSignal: a }, d)
      );
    if (_ === 1) throw u;
    throw new Cki({
      message: `Failed after ${_} attempts with non-retryable error: '${f}'`,
      reason: "errorNotRetryable",
      errors: d,
    });
  }
}