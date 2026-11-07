
function $Cr(e) {
  if (e.signal?.aborted) return bn(e.signal.reason ?? Error("Request aborted"));
  return Fd((t) => {
    let r = () => {
        (a(), t(bn(e.signal?.reason ?? Error("Request aborted"))));
      },
      s = (u) => {
        try {
          if (!e.fn(u)) return;
          (a(), t(ti));
        } catch (f) {
          (a(), t(bn(f)));
        }
      },
      a = () => {
        (clearTimeout(H), g$.off("event", s), e.signal?.removeEventListener("abort", r));
      },
      H = setTimeout(() => {
        (a(), t(bn(Error("Timed out waiting for global event"))));
      }, e.timeout);
    return (g$.on("event", s), e.signal?.addEventListener("abort", r, { once: !0 }), jn(a));
  });
}