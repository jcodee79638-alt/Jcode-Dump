
var Oda = (e) => ({
    type: "media",
    mediaType: e.mime,
    data: e.uri,
    filename: e.name,
    metadata: e.description === void 0 ? void 0 : { description: e.description },
  }),
  Uda = (e) => {
    if (e.state.status !== "pending") return e.state.input;
    try {
      return JSON.parse(e.state.input);
    } catch {
      return e.state.input;
    }
  },
  Nda = (e, t) =>
    iWe.make({
      id: e.id,
      name: e.name,
      input: Uda(e),
      providerExecuted: e.provider?.executed,
      providerMetadata: t,
    }),
  xDi = (e, t) => {
    if (e.state.status === "completed") {
      let r =
        e.provider?.executed === !0 && e.state.result !== void 0
          ? e.state.result
          : _V.toResultValue({ structured: e.state.structured, content: e.state.content });
      return Ode.make({
        id: e.id,
        name: e.name,
        result: r,
        providerExecuted: e.provider?.executed,
        providerMetadata: t,
      });
    }
    if (e.state.status === "error")
      return Ode.make({
        id: e.id,
        name: e.name,
        result:
          e.provider?.executed === !0 && e.state.result !== void 0
            ? e.state.result
            : { error: e.state.error, content: e.state.content, structured: e.state.structured },
        resultType: "error",
        providerExecuted: e.provider?.executed,
        providerMetadata: t,
      });
  },
  Fda = (e, t) => {
    let r = String(e.model.providerID) === String(t.provider) && String(e.model.id) === String(t.id),
      s = r && e.error === void 0,
      H = e.content
        .flatMap((f) => {
          if (f.type === "text") return [{ type: "text", text: f.text }];
          if (f.type === "reasoning")
            return r
              ? [{ type: "reasoning", text: f.text, providerMetadata: s ? f.providerMetadata : void 0 }]
              : f.text.length > 0
                ? [{ type: "text", text: f.text }]
                : [];
          let d = Nda(f, s ? f.provider?.metadata : void 0);
          if (f.provider?.executed !== !0) return [d];
          let _ = xDi(f, s ? (f.provider.resultMetadata ?? f.provider.metadata) : void 0);
          return _ ? [d, _] : [d];
        })
        .filter((f) => {
          if (f.type === "text") return f.text !== "";
          if (f.type !== "reasoning") return !0;
          return (
            f.text !== "" || (f.providerMetadata !== void 0 && Object.keys(f.providerMetadata).length > 0)
          );
        }),
      u = e.content
        .filter((f) => f.type === "tool" && f.provider?.executed !== !0)
        .map((f) => xDi(f, s ? (f.provider?.resultMetadata ?? f.provider?.metadata) : void 0))
        .filter((f) => f !== void 0)
        .map(fg.tool);
    if (H.length === 0) return u;
    return [fg.make({ id: e.id, role: "assistant", content: H, metadata: e.metadata }), ...u];
  },
  SDi = (e, t) => e.flatMap((r) => Bda(r, t));