
function Ijt(e) {
  let t = Symbol.asyncIterator in e ? e[Symbol.asyncIterator]() : e[Symbol.iterator]();
  return kxr({
    start() {},
    async pull(r) {
      let { done: s, value: a } = await t.next();
      if (s) r.close();
      else r.enqueue(a);
    },
    async cancel() {
      await t.return?.();
    },
  });
}