
function Kvr(e, t) {
  let r = e.output.map((a) => {
      if (a.type === "function_call") return { ...a, parsed_arguments: xWa(t, a) };
      if (a.type === "message") {
        let H = a.content.map((u) => {
          if (u.type === "output_text") return { ...u, parsed: IWa(t, u.text) };
          return u;
        });
        return { ...a, content: H };
      }
      return a;
    }),
    s = Object.assign({}, e, { output: r });
  if (!Object.getOwnPropertyDescriptor(e, "output_text")) wPt(s);
  return (
    Object.defineProperty(s, "output_parsed", {
      enumerable: !0,
      get() {
        for (let a of s.output) {
          if (a.type !== "message") continue;
          for (let H of a.content) if (H.type === "output_text" && H.parsed !== null) return H.parsed;
        }
        return null;
      },
    }),
    s
  );
}