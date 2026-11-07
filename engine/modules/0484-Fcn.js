
function Fcn(e) {
  let t = e?.env ?? { ...globalThis?.process?.env, ...import.meta?.env },
    r = u2s(t);
  return Ucn((s) => Jt(f2s(r, t, s)));
}