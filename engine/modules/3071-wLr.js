
var wLr = () => ({ stepStarted: !1, text: new Set(), reasoning: new Set() }),
  fP = (e, t) => {
    if (e.stepStarted) return e;
    return (t.push(tA.stepStart({ index: 0 })), { ...e, stepStarted: !0 });
  },
  wMt = (e, t, r, s) => {
    let a = fP(e, t);
    if (a.text.has(r)) return (t.push(tA.textDelta({ id: r, text: s })), a);
    return (
      t.push(tA.textStart({ id: r }), tA.textDelta({ id: r, text: s })),
      { ...a, text: new Set([...a.text, r]) }
    );
  },
  kMt = (e, t, r, s) => {
    if (e.reasoning.has(r)) return e;
    let a = fP(e, t);
    return (
      t.push(tA.reasoningStart({ id: r, providerMetadata: s })),
      { ...a, reasoning: new Set([...a.reasoning, r]) }
    );
  },
  OMt = (e, t, r, s, a) => {
    let H = kMt(e, t, r, a);
    return (t.push(tA.reasoningDelta({ id: r, text: s })), H);
  },
  Jae = (e, t, r, s) => {
    if (!e.reasoning.has(r)) return e;
    let a = fP(e, t);
    t.push(tA.reasoningEnd({ id: r, providerMetadata: s }));
    let H = new Set(a.reasoning);
    return (H.delete(r), { ...a, reasoning: H });
  },
  Ela = (e, t, r, s) => {
    if (!e.text.has(r)) return e;
    let a = fP(e, t);
    t.push(tA.textEnd({ id: r, providerMetadata: s }));
    let H = new Set(a.text);
    return (H.delete(r), { ...a, text: H });
  },
  Ila = (e, t) => {
    for (let r of e.reasoning) t.push(tA.reasoningEnd({ id: r }));
    for (let r of e.text) t.push(tA.textEnd({ id: r }));
    return { ...e, text: new Set(), reasoning: new Set() };
  },
  kLr = (e, t, r) => {
    let s = Ila(fP(e, t), t);
    return (
      t.push(
        tA.stepFinish({ index: 0, reason: r.reason, usage: r.usage, providerMetadata: r.providerMetadata }),
        tA.finish(r),
      ),
      { ...s, stepStarted: !1 }
    );
  };