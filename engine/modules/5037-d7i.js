
function d7i(e, t) {
  if (!t || !DWa(t))
    return {
      ...e,
      output_parsed: null,
      output: e.output.map((r) => {
        if (r.type === "function_call") return { ...r, parsed_arguments: null };
        if (r.type === "message") return { ...r, content: r.content.map((s) => ({ ...s, parsed: null })) };
        else return r;
      }),
    };
  return Kvr(e, t);
}