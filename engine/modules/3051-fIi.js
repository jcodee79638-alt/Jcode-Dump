
var fIi,
  vLr,
  bLr = (e) =>
    /^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(e)
      ? ti
      : bn(new fIi({ name: e, message: `Invalid tool name: ${e}` })),
  jLr = (e, t) => {
    let r = Object.freeze({});
    return (vLr.set(r, { ...TMt(e), permission: t }), r);
  },
  pIi = (e, t) => TMt(e).permission ?? t,
  dIi = (e, t) => TMt(t).definition(e),
  mIi = (e, t, r) => TMt(e).settle(t, r);