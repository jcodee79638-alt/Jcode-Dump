
var w3e = ne(() => {
  cV();
  ((j$ = z0("event_sequence", {
    aggregate_id: dH().notNull().primaryKey(),
    seq: Wd().notNull(),
    owner_id: dH(),
  })),
    (E_ = z0(
      "event",
      {
        id: dH().$type().primaryKey(),
        aggregate_id: dH()
          .notNull()
          .references(() => j$.aggregate_id, { onDelete: "cascade" }),
        seq: Wd().notNull(),
        type: dH().notNull(),
        data: dH({ mode: "json" }).$type().notNull(),
      },
      (e) => [
        uY("event_aggregate_seq_idx").on(e.aggregate_id, e.seq),
        Aw("event_aggregate_type_seq_idx").on(e.aggregate_id, e.type, e.seq),
      ],
    )));
});