
async function TTa({ stream: e, onError: t }) {
  let r = e.getReader();
  try {
    while (!0) {
      let { done: s } = await r.read();
      if (s) break;
    }
  } catch (s) {
    t == null || t(s);
  } finally {
    r.releaseLock();
  }
}