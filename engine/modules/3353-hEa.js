
function hEa(e, t, r) {
  let s = t.endpoint;
  return Snr(s.method, s.path, _Ea(e, s, r, t.handler, t.isRaw), { uninterruptible: t.uninterruptible });
}