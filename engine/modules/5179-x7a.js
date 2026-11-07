
function x7a(e) {
  return ft(function* () {
    if (e.budget <= 0) return;
    if (e.turn.end - e.turn.start <= 1) return;
    for (let t = e.turn.start + 1; t < e.turn.end; t++) {
      if ((yield* e.estimate({ messages: e.messages.slice(t, e.turn.end), model: e.model })) > e.budget)
        continue;
      return { start: t, id: e.messages[t].info.id };
    }
    return;
  });
}