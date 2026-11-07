
var Kj = ne(() => {
  cV();
  Dir();
  yY();
  YMe();
  ((la = z0(
    "session",
    {
      id: dH().$type().primaryKey(),
      project_id: dH()
        .$type()
        .notNull()
        .references(() => If.id, { onDelete: "cascade" }),
      workspace_id: dH().$type(),
      parent_id: dH().$type(),
      slug: dH().notNull(),
      directory: KDn().notNull(),
      path: zDn(),
      title: dH().notNull(),
      version: dH().notNull(),
      share_url: dH(),
      summary_additions: Wd(),
      summary_deletions: Wd(),
      summary_files: Wd(),
      summary_diffs: dH({ mode: "json" }).$type(),
      metadata: dH({ mode: "json" }).$type(),
      cost: I3e().notNull().default(0),
      tokens_input: Wd().notNull().default(0),
      tokens_output: Wd().notNull().default(0),
      tokens_reasoning: Wd().notNull().default(0),
      tokens_cache_read: Wd().notNull().default(0),
      tokens_cache_write: Wd().notNull().default(0),
      revert: dH({ mode: "json" }).$type(),
      permission: dH({ mode: "json" }).$type(),
      agent: dH(),
      model: dH({ mode: "json" }).$type(),
      ...Lw,
      time_compacting: Wd(),
      time_archived: Wd(),
    },
    (e) => [
      Aw("session_project_idx").on(e.project_id),
      Aw("session_workspace_idx").on(e.workspace_id),
      Aw("session_parent_idx").on(e.parent_id),
    ],
  )),
    (tx = z0(
      "message",
      {
        id: dH().$type().primaryKey(),
        session_id: dH()
          .$type()
          .notNull()
          .references(() => la.id, { onDelete: "cascade" }),
        ...Lw,
        data: dH({ mode: "json" }).notNull().$type(),
      },
      (e) => [Aw("message_session_time_created_id_idx").on(e.session_id, e.time_created, e.id)],
    )),
    (dg = z0(
      "part",
      {
        id: dH().$type().primaryKey(),
        message_id: dH()
          .$type()
          .notNull()
          .references(() => tx.id, { onDelete: "cascade" }),
        session_id: dH().$type().notNull(),
        ...Lw,
        data: dH({ mode: "json" }).notNull().$type(),
      },
      (e) => [Aw("part_message_id_id_idx").on(e.message_id, e.id), Aw("part_session_idx").on(e.session_id)],
    )),
    (Q6 = z0(
      "todo",
      {
        session_id: dH()
          .$type()
          .notNull()
          .references(() => la.id, { onDelete: "cascade" }),
        content: dH().notNull(),
        status: dH().notNull(),
        priority: dH().notNull(),
        position: Wd().notNull(),
        ...Lw,
      },
      (e) => [$de({ columns: [e.session_id, e.position] }), Aw("todo_session_idx").on(e.session_id)],
    )),
    (dA = z0(
      "session_message",
      {
        id: dH().$type().primaryKey(),
        session_id: dH()
          .$type()
          .notNull()
          .references(() => la.id, { onDelete: "cascade" }),
        type: dH().$type().notNull(),
        seq: Wd().notNull(),
        ...Lw,
        data: dH({ mode: "json" }).notNull().$type(),
      },
      (e) => [
        uY("session_message_session_seq_idx").on(e.session_id, e.seq),
        Aw("session_message_session_type_seq_idx").on(e.session_id, e.type, e.seq),
        Aw("session_message_session_time_created_id_idx").on(e.session_id, e.time_created, e.id),
        Aw("session_message_time_created_idx").on(e.time_created),
      ],
    )),
    (Uh = z0(
      "session_input",
      {
        id: dH().$type().primaryKey(),
        session_id: dH()
          .$type()
          .notNull()
          .references(() => la.id, { onDelete: "cascade" }),
        prompt: dH({ mode: "json" }).notNull().$type(),
        delivery: dH().$type().notNull(),
        admitted_seq: Wd().notNull(),
        promoted_seq: Wd(),
        time_created: Wd()
          .notNull()
          .$default(() => Date.now()),
      },
      (e) => [
        Aw("session_input_session_pending_delivery_seq_idx").on(
          e.session_id,
          e.promoted_seq,
          e.delivery,
          e.admitted_seq,
        ),
        uY("session_input_session_admitted_seq_idx").on(e.session_id, e.admitted_seq),
        uY("session_input_session_promoted_seq_idx").on(e.session_id, e.promoted_seq),
      ],
    )),
    (rx = z0("session_context_epoch", {
      session_id: dH()
        .$type()
        .primaryKey()
        .references(() => la.id, { onDelete: "cascade" }),
      baseline: dH().notNull(),
      snapshot: dH({ mode: "json" }).notNull().$type(),
      baseline_seq: Wd().notNull(),
    })));
});