
function zFa(e, t) {
  return bl({
    try: () =>
      sjt(
        async (r) => {
          let s = r === void 0 ? void 0 : { cursor: r };
          try {
            return await e.listTools(s, { timeout: t });
          } catch (a) {
            if (!(a instanceof Error) || !QFa(a)) throw a;
            return e.request({ method: "tools/list", params: s }, VFa, { timeout: t });
          }
        },
        (r) => r.tools,
      ),
    catch: (r) => (r instanceof Error ? r : Error(String(r))),
  });
}