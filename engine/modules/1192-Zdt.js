
function Zdt(e, t) {
  return (r, s, ...a) => {
    let H = [s, ...a].map((u) => ({ type: e, isAll: t, rightSelect: u }));
    for (let u of H)
      if (!hde(r.getSelectedFields(), u.rightSelect.getSelectedFields()))
        throw Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order",
        );
    return r.addSetOperators(H);
  };
}