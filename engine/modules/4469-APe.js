
function APe(e, t, r) {
  let s;
  return Promise.race([
    e.finally(() => {
      clearTimeout(s);
    }),
    new Promise((a, H) => {
      s = setTimeout(() => {
        H(Error(r ?? `Operation timed out after ${t}ms`));
      }, t);
    }),
  ]);
}