
function DEa(e) {
  let t = yEa(e);
  if (t === void 0) return;
  let r = MEa(e),
    s = vbe(t),
    a = t.contentType;
  if (DSi(t))
    return (u, f) => {
      if (!lg(u)) return r ? void 0 : ZSi(u);
      return Jt(f2(QBe(u, f), { status: s, contentType: a }));
    };
  let H = xEa(t);
  return (u, f) => {
    if (!lg(u)) return r ? void 0 : ZSi(u);
    return Jt(f2(QBe(SEa(u, H), f), { status: s, contentType: a }));
  };
}