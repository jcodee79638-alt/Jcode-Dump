
async function ftn(e) {
  let t = Pu.join(e, ".references-v6.json");
  return (await UM(t))
    ? WJt(JSON.parse((await dI(t, 524288)).toString("utf8")))
    : { version: 1, sessions: [] };
}