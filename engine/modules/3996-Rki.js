
async function Rki(e, t, r) {
  let s = await LP({ text: e });
  if (!s.success)
    throw new BN({
      message: "No object generated: could not parse the response.",
      cause: s.error,
      text: e,
      response: r.response,
      usage: r.usage,
      finishReason: r.finishReason,
    });
  let a = await t.validateFinalResult(s.value, { text: e, response: r.response, usage: r.usage });
  if (!a.success)
    throw new BN({
      message: "No object generated: response did not match schema.",
      cause: a.error,
      text: e,
      response: r.response,
      usage: r.usage,
      finishReason: r.finishReason,
    });
  return a.value;
}