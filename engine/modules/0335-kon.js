
function kon(e) {
  return UQt((t) =>
    ZA({
      try: () => Lo(JSON.stringify(t, e?.replacer, e?.space)),
      catch: (r) => new hy(Lo(t), { message: globalThis.String(r) }),
    }),
  );
}