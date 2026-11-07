
var rDc,
  nDc,
  DLr = (e) => {
    let {
      system: t,
      prompt: r,
      messages: s,
      tools: a,
      toolChoice: H,
      generation: u,
      providerOptions: f,
      http: d,
      ..._
    } = e;
    return new mV({
      ..._,
      system: nWe.content(t),
      messages: [...(s?.map(fg.make) ?? []), ...(r === void 0 ? [] : [fg.user(r)])],
      tools: a?.map(Wj.make) ?? [],
      toolChoice: H ? dV.make(H) : void 0,
      generation: u === void 0 ? void 0 : mw.make(u),
      providerOptions: f,
      http: d === void 0 ? void 0 : dw.make(d),
    });
  },
  IMt = "generate_object",
  iDc;