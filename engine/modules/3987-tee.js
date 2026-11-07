
function tee(e) {
  let t = e.pipeThrough(new TransformStream());
  return (
    (t[Symbol.asyncIterator] = function () {
      let r = this.getReader(),
        s = !1;
      async function a(H) {
        var u;
        if (s) return;
        s = !0;
        try {
          if (H) await ((u = r.cancel) == null ? void 0 : u.call(r));
        } finally {
          try {
            r.releaseLock();
          } catch (f) {}
        }
      }
      return {
        async next() {
          if (s) return { done: !0, value: void 0 };
          let { done: H, value: u } = await r.read();
          if (H) return (await a(!0), { done: !0, value: void 0 });
          return { done: !1, value: u };
        },
        async return() {
          return (await a(!0), { done: !0, value: void 0 });
        },
        async throw(H) {
          throw (await a(!0), H);
        },
      };
    }),
    t
  );
}