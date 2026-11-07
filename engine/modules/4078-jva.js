
async function jva(e, t, r) {
  try {
    if (r) await zTt(e, t, { mode: r });
    else await zTt(e, t);
  } catch (s) {
    if (bva(s)) {
      if ((await O8i(QTt(e), { recursive: !0 }), r)) await zTt(e, t, { mode: r });
      else await zTt(e, t);
      return;
    }
    throw s;
  }
}