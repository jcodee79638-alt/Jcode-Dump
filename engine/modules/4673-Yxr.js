
function Yxr(e, t, r) {
  if (!t || !("parse" in (t.output_format ?? {})))
    return {
      ...e,
      content: e.content.map((s) => {
        if (s.type === "text") {
          let a = Object.defineProperty({ ...s }, "parsed_output", { value: null, enumerable: !1 });
          return Object.defineProperty(a, "parsed", {
            get() {
              return (
                r.logger.warn(
                  "The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead.",
                ),
                null
              );
            },
            enumerable: !1,
          });
        }
        return s;
      }),
      parsed_output: null,
    };
  return Zxr(e, t, r);
}