
function xKe(e, t) {
  let r = e.choices.map((s) => {
    if (s.finish_reason === "length") throw new mKe();
    if (s.finish_reason === "content_filter") throw new _Ke();
    return (
      VVi(s.message.tool_calls),
      {
        ...s,
        message: {
          ...s.message,
          ...(s.message.tool_calls
            ? { tool_calls: s.message.tool_calls?.map((a) => l3a(t, a)) ?? void 0 }
            : void 0),
          parsed: s.message.content && !s.message.refusal ? u3a(t, s.message.content) : null,
        },
      }
    );
  });
  return { ...e, choices: r };
}