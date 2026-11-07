
function OTt(e) {
  let t = e.startsWith(QL + "/") ? e.slice(QL.length + 1) : e;
  return { providerID: f7.providerID, modelID: WL.make(zDe(t)) };
}