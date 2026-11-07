
function l3a(e, t) {
  let r = e.tools?.find((s) => yKe(s) && s.function?.name === t.function.name);
  return {
    ...t,
    function: {
      ...t.function,
      parsed_arguments: yLe(r)
        ? r.$parseRaw(t.function.arguments)
        : r?.function.strict
          ? JSON.parse(t.function.arguments)
          : null,
    },
  };
}