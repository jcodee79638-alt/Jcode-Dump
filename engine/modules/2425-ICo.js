
async function ICo() {
  if (!E0t) return Lpe;
  let e = await Promise.resolve().then(() => (VGn(), {})),
    t = await Promise.resolve().then(() => (zXn(), {})),
    r = await Promise.resolve().then(() => Tl(t0t(), 1)),
    { AsyncLocalStorageContextManager: s } = await Promise.resolve().then(() => Tl(ZHr(), 1)),
    { context: a } = await Promise.resolve().then(() => Tl(kf(), 1)),
    H = new s();
  return (
    H.enable(),
    a.setGlobalContextManager(H),
    tPo(() => ({
      resource: YXn(),
      spanProcessor: new r.BatchSpanProcessor(new u7e({ url: `${E0t}/v1/traces`, headers: QXn })),
    }))
  );
}