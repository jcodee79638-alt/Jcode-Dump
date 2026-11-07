
function wVa(e) {
  try {
    let t = gbr(),
      r = Nze.dirname(t);
    T7.mkdirSync(r, { recursive: !0, mode: 448 });
    let s = { configs: Object.fromEntries(e), updatedAt: new Date().toISOString() };
    T7.writeFileSync(t, JSON.stringify(s, null, 2), { mode: 384 });
  } catch {}
}