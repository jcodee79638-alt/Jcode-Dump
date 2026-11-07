
function yan(e, t) {
  if (e._tag === "Suspend" && t !== void 0) throw Error("Cannot add checks to Suspend");
  if (e.checks === t) return e;
  return bBe(e, (r) => {
    r.checks.value = t;
  });
}