
async function _ee(e, t) {
  try {
    return await LMr(e, t);
  } catch (r) {
    if (r instanceof Zje || r instanceof tPe)
      return (await e.invalidateCredentials?.("all"), await LMr(e, t));
    else if (r instanceof ePe) return (await e.invalidateCredentials?.("tokens"), await LMr(e, t));
    throw r;
  }
}