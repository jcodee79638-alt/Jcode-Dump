
function LHo(e, t, r) {
  if (t.durable === void 0) return No("Durable Session event is missing aggregate sequence");
  let s = YTn(r),
    { id: a, type: H, ...u } = s;
  return e
    .insert(dA)
    .values({
      id: wf.make(a),
      session_id: t.data.sessionID,
      type: H,
      seq: t.durable.seq,
      time_created: bj(r.time.created),
      data: u,
    })
    .run()
    .pipe(on);
}