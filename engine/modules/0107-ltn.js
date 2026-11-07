
async function ltn(e) {
  let t = Pu.join(e.userData, "projects.json");
  return (await UM(t)) ? utn(JSON.parse((await dI(t, 1048576)).toString("utf8"))) : [];
}