
function dja(e) {
  let t, r, s;
  for (let H of e) {
    let u = H.info;
    if (u.role === "user" && pvt(u, t)) t = u;
    if (u.role === "assistant" && pvt(u, r)) r = u;
    if (u.role === "assistant" && u.finish && pvt(u, s)) s = u;
  }
  let a = e.flatMap((H) =>
    s && !pvt(H.info, s) ? [] : H.parts.filter((u) => u.type === "compaction" || u.type === "subtask"),
  );
  return { user: t, assistant: r, finished: s, tasks: a };
}