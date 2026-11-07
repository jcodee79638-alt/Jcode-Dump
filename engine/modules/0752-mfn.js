
var mfn = "~effect/platform/Crypto",
  Oer,
  _fn = (e) => {
    let t = e.randomBytes,
      r = (H) => Vn(O3s("randomBytes", H), t),
      s = () => {
        let H = t(7);
        return (
          ((H[0] & 31) * 281474976710656 +
            H[1] * 1099511627776 +
            H[2] * 4294967296 +
            H[3] * 16777216 +
            H[4] * 65536 +
            H[5] * 256 +
            H[6]) /
          9007199254740992
        );
      },
      a = () =>
        Math.floor(s() * (Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER + 1)) + Number.MIN_SAFE_INTEGER;
    return Oer.of({
      [mfn]: mfn,
      randomBytes: r,
      nextDoubleUnsafe: s,
      nextIntUnsafe: a,
      digest: e.digest,
      random: jn(() => s()),
      randomBoolean: jn(() => s() > 0.5),
      randomInt: jn(() => a()),
      randomBetween: (H, u) => jn(() => s() * (u - H) + H),
      randomIntBetween(H, u, f) {
        let d = f?.halfOpen === !0 ? 0 : 1;
        return jn(() => {
          let _ = Math.ceil(H),
            L = Math.floor(u);
          return Math.floor(s() * (L - _ + d)) + _;
        });
      },
      randomShuffle: (H) =>
        jn(() => {
          let u = Array.from(H);
          for (let f = u.length - 1; f >= 1; f = f - 1) {
            let d = Math.min(f, Math.floor(s() * (f + 1))),
              _ = u[f];
            ((u[f] = u[d]), (u[d] = _));
          }
          return u;
        }),
      randomUUIDv4: jn(() => N3s(t(16))),
      randomUUIDv7: HBe((H) => Jt(B3s(H.currentTimeMillisUnsafe(), t(16)))),
    });
  },
  O3s = (e, t) =>
    Number.isSafeInteger(t) && t >= 0
      ? Jt(t)
      : bn(FQ({ module: "Crypto", method: e, description: "size must be a non-negative safe integer" })),
  U3s = (e) => e.toString(16).padStart(2, "0"),
  hfn = (e) =>
    [e.subarray(0, 4), e.subarray(4, 6), e.subarray(6, 8), e.subarray(8, 10), e.subarray(10, 16)]
      .map((r) => Array.from(r, U3s).join(""))
      .join("-"),
  N3s = (e) => ((e[6] = (e[6] & 15) | 64), (e[8] = (e[8] & 63) | 128), hfn(e)),
  F3s = 281474976710655,
  B3s = (e, t) => {
    let r = Math.min(Math.max(0, Math.trunc(e)), F3s);
    return (
      (t[0] = Math.floor(r / 1099511627776)),
      (t[1] = Math.floor(r / 4294967296) & 255),
      (t[2] = Math.floor(r / 16777216) & 255),
      (t[3] = Math.floor(r / 65536) & 255),
      (t[4] = Math.floor(r / 256) & 255),
      (t[5] = r & 255),
      (t[6] = (t[6] & 15) | 112),
      (t[8] = (t[8] & 63) | 128),
      hfn(t)
    );
  };