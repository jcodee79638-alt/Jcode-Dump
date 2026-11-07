
function z6i() {
  let e = [],
    t = null,
    r = !1,
    s = Bki(),
    a = () => {
      ((r = !0), s.resolve(), e.forEach((u) => u.cancel()), (e = []), t == null || t.close());
    },
    H = async () => {
      if (r && e.length === 0) {
        t == null || t.close();
        return;
      }
      if (e.length === 0) return ((s = Bki()), await s.promise, H());
      try {
        let { value: u, done: f } = await e[0].read();
        if (f)
          if ((e.shift(), e.length === 0 && r)) t == null || t.close();
          else await H();
        else t == null || t.enqueue(u);
      } catch (u) {
        (t == null || t.error(u), e.shift(), a());
      }
    };
  return {
    stream: new ReadableStream({
      start(u) {
        t = u;
      },
      pull: H,
      async cancel() {
        for (let u of e) await u.cancel();
        ((e = []), (r = !0));
      },
    }),
    addStream: (u) => {
      if (r) throw Error("Cannot add inner stream: outer stream is closed");
      (e.push(u.getReader()), s.resolve());
    },
    close: () => {
      if (((r = !0), s.resolve(), e.length === 0)) t == null || t.close();
    },
    terminate: a,
  };
}