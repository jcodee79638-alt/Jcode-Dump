
async function st(e) {
  if (typeof e !== "string" || hn(e))
    throw Error("Choose a project outside private, secret, or generated folders.");
  let t = await ot(e);
  if (hn(t) || he(t) !== he(e)) throw Error("Choose the canonical project folder without links.");
  return t;
}