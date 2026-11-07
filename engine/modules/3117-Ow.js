
function Ow(e, t, r, s, a, H, u) {
  if (typeof u === "function") u = { callback: u };
  if (!(u === null || u === void 0 ? void 0 : u.callback)) {
    let f = ehe(e, t, r, s, a, H, u);
    if (!f) return;
    return Zae(f, u === null || u === void 0 ? void 0 : u.headerOptions);
  } else {
    let { callback: f } = u;
    ehe(
      e,
      t,
      r,
      s,
      a,
      H,
      Object.assign(Object.assign({}, u), {
        callback: (d) => {
          if (!d) f(void 0);
          else f(Zae(d, u.headerOptions));
        },
      }),
    );
  }
}