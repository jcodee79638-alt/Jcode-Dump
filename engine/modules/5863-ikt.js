
var ikt = ne(async () => {
  Gt();
  $H();
  xx();
  await Jn([bT(), Tx()]);
  ((znH = { event: "/event" }),
    (Wwe = kE("event").add(
      zd("event")
        .add(
          MH("subscribe", znH.event, {
            query: jo,
            success: re.pipe(MSi({ contentType: "text/event-stream" })),
          }).annotateMerge(
            Fn({ identifier: "event.subscribe", summary: "Subscribe to events", description: "Get events" }),
          ),
        )
        .middleware(Fm)
        .middleware(Nm)
        .middleware(tm)
        .annotateMerge(Fn({ title: "event", description: "Instance event stream route." })),
    )));
});