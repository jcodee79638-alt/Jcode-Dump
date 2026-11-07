
function MDa(e, t, r) {
  let s = r ? { ...r, async: !1, abortEarly: !0 } : { async: !1, abortEarly: !0 },
    a = e._zod.bag.fallbackRun,
    H;
  if (a) ((s[yDa] = !0), (H = a({ value: t, issues: [] }, s)));
  else H = e._zod.run({ value: t, issues: [] }, s);
  if (H instanceof Promise) throw new LX();
  return H.issues.length === 0;
}