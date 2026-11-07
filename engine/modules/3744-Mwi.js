
async function Mwi(e, t) {
  if (e == null) return;
  let r = t == null ? void 0 : t.abortSignal;
  return new Promise((s, a) => {
    if (r == null ? void 0 : r.aborted) {
      a(hwi());
      return;
    }
    let H = setTimeout(() => {
        (u(), s());
      }, e),
      u = () => {
        (clearTimeout(H), r == null || r.removeEventListener("abort", f));
      },
      f = () => {
        (u(), a(hwi()));
      };
    r == null || r.addEventListener("abort", f);
  });
}