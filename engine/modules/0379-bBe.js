
function bBe(e, t) {
  let r = Object.getOwnPropertyDescriptors(e);
  return (t(r), Object.create(Object.getPrototypeOf(e), r));
}