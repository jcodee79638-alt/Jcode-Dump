
function Zxr(e, t, r) {
  let s = null,
    a = e.content.map((H) => {
      if (H.type === "text") {
        let u = nRa(t, H.text);
        if (s === null) s = u;
        let f = Object.defineProperty({ ...H }, "parsed_output", { value: u, enumerable: !1 });
        return Object.defineProperty(f, "parsed", {
          get() {
            return (
              r.logger.warn(
                "The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead.",
              ),
              u
            );
          },
          enumerable: !1,
        });
      }
      return H;
    });
  return { ...e, content: a, parsed_output: s };
}