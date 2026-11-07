
function E7a(e) {
  let t = e.history.findLast(
      (u) =>
        u.info.role === "user" &&
        !u.parts.some((f) => f.type === "compaction") &&
        u.parts.some((f) => f.type === "file" || (f.type === "text" && !f.synthetic && !f.ignored)),
    ),
    r =
      e.history
        .findLast((u) => u.info.role === "assistant" && !u.info.summary)
        ?.parts.flatMap((u) => (u.type === "text" && !u.ignored ? [u.text] : [])).join(`
`) ?? "",
    s = e.history.flatMap((u) =>
      u.parts.flatMap((f) =>
        f.type === "tool"
          ? [
              `${f.callID} ${f.tool}: ${f.state.status}${f.state.status === "completed" ? "; do not repeat this completed action" : "; inspect saved outcome before any further action"}`,
            ]
          : [],
      ),
    ),
    a = e.messages.map((u) => Cce(Pbr(u), 32768)).filter(Boolean).join(`

`),
    H = [
      jMt({
        previousSummary: e.previousSummary ? Cce(e.previousSummary, 65536) : void 0,
        context: [
          `[Current user task]
${Cce(t ? Pbr(t) : "See the previous summary for the active task.", 65536)}`,
          `[Saved tool ledger]
${Cce(
  s.join(`
`),
  65536,
)}`,
          `[Most recent unfinished assistant text]
${Cce(r, 65536)}`,
          `[Saved conversation excerpts]
${Cce(a, 196608)}`,
        ],
      }),
      Cce(
        [e.prompt, ...e.context].filter(Boolean).join(`

`),
        32768,
      ),
    ].filter(Boolean).join(`

`);
  return Cce(H, 524288);
}