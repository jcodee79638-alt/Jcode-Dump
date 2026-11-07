
async function e8i(e, t, r, s) {
  try {
    return await Rki(e, t, s);
  } catch (a) {
    if (r != null && BN.isInstance(a) && (Jne.isInstance(a.cause) || dy.isInstance(a.cause))) {
      let H = await r({ text: e, error: a.cause });
      if (H === null) throw a;
      return await Rki(H, t, s);
    }
    throw a;
  }
}