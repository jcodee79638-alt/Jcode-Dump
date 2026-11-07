
async function VSr(e) {
  if (e === null || typeof e !== "object") return;
  if (e[Symbol.asyncIterator]) {
    await e[Symbol.asyncIterator]().return?.();
    return;
  }
  let t = e.getReader(),
    r = t.cancel();
  (t.releaseLock(), await r);
}