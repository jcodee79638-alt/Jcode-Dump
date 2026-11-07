
var d7a,
  m7a = 20000,
  _7a = 40000,
  _4i = 2000,
  h7a,
  L7a = 2000,
  $7a = 15000,
  g7a = (e) =>
    e.length <= _4i
      ? e
      : `${e.slice(0, _4i)}
[truncated]`,
  Pbr = (e) => {
    if (e.info.role === "user") {
      let t = e.parts
          .filter((s) => s.type === "text" && !s.ignored)
          .map((s) => s.text)
          .filter(Boolean).join(`
`),
        r = e.parts.flatMap((s) =>
          s.type === "file" ? [`[Attached ${s.mime}: ${s.filename ?? "file"}]`] : [],
        );
      return [...(t ? [`[User]: ${t}`] : []), ...r].join(`
`);
    }
    return e.parts.flatMap((t) => {
      if (t.type === "text") return t.text ? [`[Assistant]: ${t.text}`] : [];
      if (t.type === "reasoning") return t.text ? [`[Assistant reasoning]: ${t.text}`] : [];
      if (t.type !== "tool") return [];
      let r = `[Assistant tool call]: ${t.tool}(${JSON.stringify(t.state.input)})`;
      if (t.state.status === "completed") {
        let s = (t.state.attachments ?? []).map((H) => `[Attached ${H.mime}: ${H.filename ?? "file"}]`),
          a = t.state.time.compacted
            ? "[Old tool result content cleared]"
            : g7a(
                [t.state.output, ...s].join(`
`),
              );
        return [r, `[Tool result]: ${a}`];
      }
      if (t.state.status === "error") return [r, `[Tool error]: ${t.state.error}`];
      return [r];
    }).join(`
`);
  },
  WLe,
  NhA,
  S7a,
  Cbr;