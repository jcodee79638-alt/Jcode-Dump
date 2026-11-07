
function mtr(e) {
  let [t, ...r] = e.split("/");
  return { providerID: Kp.make(t), modelID: WL.make(r.join("/")) };
}