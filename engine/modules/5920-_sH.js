
var _sH,
  hsH = (e) =>
    Io([
      ...e,
      ...(e.some((t) => t.type === "server.connected")
        ? []
        : [
            nt({ ..._sH, type: ri("server.connected"), data: nt({}) }).annotate({
              identifier: "V2Event.server.connected",
            }),
          ]),
    ]).annotate({ identifier: "V2Event" }),
  Wts = (e) => {
    let t = hsH(e);
    return {
      schema: t,
      group: zd("server.event")
        .add(
          MH("event.subscribe", "/api/event", { success: ISi({ data: t }) }).annotateMerge(
            Fn({
              identifier: "v2.event.subscribe",
              summary: "Subscribe to events",
              description: "Subscribe to native event payloads for the server.",
            }),
          ),
        )
        .annotateMerge(Fn({ title: "events", description: "Experimental event stream route." })),
    };
  },
  Vts = (e) => Wts(e).group,
  qts,
  Gts,
  Xts;