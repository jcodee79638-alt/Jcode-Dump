
function GFa(e, t, r, s, a) {
  return bl({ try: () => r(t), catch: (H) => H }).pipe(
    kye((H) =>
      lp(`failed to get ${s}`, { clientName: e, error: H instanceof Error ? H.message : String(H) }),
    ),
    Vn((H) => {
      let u = mPe(e),
        f = e.replaceAll("%", "%25").replaceAll(":", "%3A");
      return Object.fromEntries(
        H.map((d) => [a ? f + ":" + a(d) : u + ":" + mPe(d.name), { ...d, client: e }]),
      );
    }),
    PU(() => {
      return;
    }),
  );
}