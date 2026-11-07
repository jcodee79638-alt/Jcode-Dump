
async function On(e, t) {
  if (!(await X(e, t, !0)).exists) return null;
  return (await an(e, t, ie.fileBytes)).hash;
}