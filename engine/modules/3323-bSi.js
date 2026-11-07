
function bSi(e, t) {
  let r = e.get(t);
  if (r === void 0) ((r = { bufferedContentTypes: new Set(), noContent: !1 }), e.set(t, r));
  return r;
}