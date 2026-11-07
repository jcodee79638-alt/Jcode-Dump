
var GTn,
  RLt,
  XTn = (e) =>
    FLt.make({
      admittedSeq: e.admitted_seq,
      id: wf.make(e.id),
      sessionID: Jj.make(e.session_id),
      prompt: GTn(e.prompt),
      delivery: e.delivery,
      timeCreated: Fye(e.time_created),
      ...(e.promoted_seq === null ? {} : { promotedSeq: e.promoted_seq }),
    }),
  WLt,
  dme,
  uHo,
  lHo,
  fHo,
  VLt,
  JTn = (e, t) => e.delivery === t.delivery && pHo(e, t),
  pHo = (e, t) =>
    e.sessionID === t.sessionID && JSON.stringify(RLt(e.prompt)) === JSON.stringify(RLt(t.prompt)),
  qTn = (e, t) => JTn(e, t) && bj(e.timeCreated) === bj(t.timeCreated),
  KTn,
  zTn,
  dHo;