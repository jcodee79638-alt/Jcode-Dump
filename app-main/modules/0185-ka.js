
function ka(e) {
  return Object.hasOwn(Xt, e) ||
    ["ready", "suspended", "rejected", "quarantined", "update_required"].includes(e)
    ? e
    : "blocked";
}