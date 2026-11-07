
function RVi(e, t) {
  if (!t || !ATr(t))
    return {
      ...e,
      choices: e.choices.map(
        (r) => (
          VVi(r.message.tool_calls),
          {
            ...r,
            message: {
              ...r.message,
              parsed: null,
              ...(r.message.tool_calls ? { tool_calls: r.message.tool_calls } : void 0),
            },
          }
        ),
      ),
    };
  return xKe(e, t);
}