
var gHo,
  Ror,
  ZTn,
  evn = (e) =>
    gHo({ ...e.data, id: e.id, type: e.type }).pipe(
      Zo(() => new xxe({ sessionID: Jj.make(e.session_id), messageID: wf.make(e.id) })),
    ),
  EHo,
  IHo,
  tvn;