
var RMt = () => ({}),
  CIi = (e, t, r) => ({ ...e, [t]: r }),
  wIi = (e, t) => {
    let r = { ...e };
    return (delete r[t], r);
  },
  vla = (e) => tA.toolInputStart({ id: e.id, name: e.name, providerMetadata: e.providerMetadata }),
  bla = (e, t) => tA.toolInputDelta({ id: e.id, name: e.name, text: t }),
  FLr = (e, t, r) =>
    IIn(e, t.name, r ?? t.input).pipe(
      Vn((s) =>
        tA.toolCall({
          id: t.id,
          name: t.name,
          input: s,
          providerExecuted: t.providerExecuted ? !0 : void 0,
          providerMetadata: t.providerMetadata,
        }),
      ),
    ),
  kIi = (e, t, r, s) => {
    let a = [];
    if (!e[t]) a.push(vla(r));
    if (s.length > 0) a.push(bla(r, s));
    return { tools: CIi(e, t, r), tool: r, events: a };
  },
  BLr = (e) => e instanceof MD,
  RLr = (e, t, r) => CIi(e, t, { ...r, input: r.input ?? "" }),
  jla = (e, t, r, s, a) => {
    let H = t[r],
      u = s.id ?? H?.id,
      f = s.name ?? H?.name;
    if (!u || !f) return NG(e, a);
    let d = {
      id: u,
      name: f,
      input: `${H?.input ?? ""}${s.text}`,
      providerExecuted: H?.providerExecuted,
      providerMetadata: H?.providerMetadata,
    };
    if (H && s.text.length === 0 && H.id === u && H.name === f) return { tools: t, tool: H, events: [] };
    return kIi(t, r, d, s.text);
  },
  OIi = (e, t, r, s, a) => {
    let H = t[r];
    if (!H) return NG(e, a);
    if (s.length === 0) return { tools: t, tool: H, events: [] };
    return kIi(t, r, { ...H, input: `${H.input}${s}` }, s);
  },
  UIi = (e, t, r) =>
    ft(function* () {
      let s = t[r];
      if (!s) return { tools: t };
      return {
        tools: wIi(t, r),
        events: [
          tA.toolInputEnd({ id: s.id, name: s.name, providerMetadata: s.providerMetadata }),
          yield* FLr(e, s),
        ],
      };
    }),
  Pla = (e, t, r, s) =>
    ft(function* () {
      let a = t[r];
      if (!a) return { tools: t };
      return {
        tools: wIi(t, r),
        events: [
          tA.toolInputEnd({ id: a.id, name: a.name, providerMetadata: a.providerMetadata }),
          yield* FLr(e, a, s),
        ],
      };
    }),
  Cla = (e, t) =>
    ft(function* () {
      let r = Object.values(t).filter((s) => s !== void 0);
      return {
        tools: RMt(),
        events: yield* ja(r, (s) =>
          FLr(e, s).pipe(
            Vn((a) => [tA.toolInputEnd({ id: s.id, name: s.name, providerMetadata: s.providerMetadata }), a]),
          ),
        ).pipe(Vn((s) => s.flat())),
      };
    });