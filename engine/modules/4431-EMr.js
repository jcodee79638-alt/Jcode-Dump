
async function EMr(e, t, r = fetch) {
  try {
    return await YX(r)(e, { headers: t });
  } catch (s) {
    if (s instanceof TypeError)
      if (t) return EMr(e, void 0, r);
      else return;
    throw s;
  }
}