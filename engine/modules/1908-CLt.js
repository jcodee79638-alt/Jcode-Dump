
function CLt(e, t, r = !0) {
  if (tVe(e) === 0)
    (r ? Reflect.ownKeys(e) : oN.keys(e)).forEach((a) => {
      t(a, e[a], e);
    });
  else e.forEach((s, a) => t(a, s, e));
}