
function pJe(e) {
  if (e[Symbol.asyncIterator]) return e;
  let t = e.getReader();
  return {
    async next() {
      try {
        let r = await t.read();
        if (r?.done) t.releaseLock();
        return r;
      } catch (r) {
        throw (t.releaseLock(), r);
      }
    },
    async return() {
      let r = t.cancel();
      return (t.releaseLock(), await r, { done: !0, value: void 0 });
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}