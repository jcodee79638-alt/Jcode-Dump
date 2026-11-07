
async function pMr(e) {
  if (!e) e = 43;
  if (e < 43 || e > 128) throw `Expected a length between 43 and 128. Received ${e}.`;
  let t = await O9a(e),
    r = await U9a(t);
  return { code_verifier: t, code_challenge: r };
}