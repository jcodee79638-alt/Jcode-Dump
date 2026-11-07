
var _jt = ne(() => {
  _jt();
  Gt();
  Hu();
  g_();
  Hu();
  aw();
  ((Sxr = Io([
    nt({ type: ri("idle") }),
    nt({
      type: ri("retry"),
      attempt: Ko,
      message: re,
      action: Gn(nt({ reason: re, provider: re, title: re, message: re, label: re, link: Gn(re) })),
      next: Ko,
    }),
    nt({ type: ri("busy") }),
  ]).annotate({ identifier: "SessionStatus" })),
    (q3i = ua({ type: "session.status", schema: { sessionID: gf, status: Sxr } })),
    (G3i = ua({ type: "session.idle", schema: { sessionID: gf } })),
    (X3i = jl(q3i, G3i)));
});