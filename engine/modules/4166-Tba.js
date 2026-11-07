
function Tba(e) {
  var t,
    r,
    s,
    a,
    H = 0,
    u = new this(1),
    f = [];
  if (e === void 0) e = this.precision;
  else V8(e, 1, SHe);
  if (((s = Math.ceil(e / Cl)), !this.crypto)) for (; H < s;) f[H++] = (Math.random() * 1e7) | 0;
  else if (crypto.getRandomValues) {
    t = crypto.getRandomValues(new Uint32Array(s));
    for (; H < s;)
      if (((a = t[H]), a >= 4290000000)) t[H] = crypto.getRandomValues(new Uint32Array(1))[0];
      else f[H++] = a % 1e7;
  } else if (crypto.randomBytes) {
    t = crypto.randomBytes((s *= 4));
    for (; H < s;)
      if (((a = t[H] + (t[H + 1] << 8) + (t[H + 2] << 16) + ((t[H + 3] & 127) << 24)), a >= 2140000000))
        crypto.randomBytes(4).copy(t, H);
      else (f.push(a % 1e7), (H += 4));
    H = s / 4;
  } else throw Error(rOi);
  if (((s = f[--H]), (e %= Cl), s && e)) ((a = lx(10, Cl - e)), (f[H] = ((s / a) | 0) * a));
  for (; f[H] === 0; H--) f.pop();
  if (H < 0) ((r = 0), (f = [0]));
  else {
    r = -1;
    for (; f[0] === 0; r -= Cl) f.shift();
    for (s = 1, a = f[0]; a >= 10; a /= 10) s++;
    if (s < Cl) r -= Cl - s;
  }
  return ((u.e = r), (u.d = f), u);
}