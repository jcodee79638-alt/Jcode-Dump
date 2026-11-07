
async function zne(e, t) {
  let r = new Headers(t?.headers ?? (e instanceof Request ? e.headers : void 0));
  Ren ??= c8s().catch(() => {
    return;
  });
  let s = await Ren;
  if (s) r.set("X-Jac-Device", s.device);
  if (s?.hardware) r.set("X-Jac-Hardware", s.hardware);
  return fetch(e, { ...t, headers: r });
}