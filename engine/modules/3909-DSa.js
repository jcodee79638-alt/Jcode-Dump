
function DSa(e) {
  if (e.specificationVersion === "v3") return e;
  return (
    ISa({ provider: e.provider, modelId: e.modelId }),
    new Proxy(e, {
      get(t, r) {
        switch (r) {
          case "specificationVersion":
            return "v3";
          case "doGenerate":
            return async (...s) => {
              let a = await t.doGenerate(...s);
              return { ...a, finishReason: T6i(a.finishReason), usage: v6i(a.usage) };
            };
          case "doStream":
            return async (...s) => {
              let a = await t.doStream(...s);
              return { ...a, stream: ySa(a.stream) };
            };
          default:
            return t[r];
        }
      },
    })
  );
}