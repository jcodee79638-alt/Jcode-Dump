
function ujt(e, t, r = fetch) {
  let s = e.origin,
    a = new Headers(t);
  return (H, u) => {
    if (new URL(H).origin !== s) return r(H, { ...u, redirect: "error" });
    let f = new Headers(a);
    return (
      new Headers(u?.headers).forEach((d, _) => f.set(_, d)),
      r(H, { ...u, headers: f, redirect: "error" })
    );
  };
}