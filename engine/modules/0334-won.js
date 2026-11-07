
function won(e) {
  return UQt((t) =>
    ZA({
      try: () => Lo(JSON.parse(t, e?.reviver)),
      catch: (r) => new hy(Lo(t), { message: globalThis.String(r) }),
    }),
  );
}