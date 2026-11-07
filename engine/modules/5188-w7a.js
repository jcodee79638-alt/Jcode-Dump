
function w7a(e, t, r, s) {
  return () =>
    ft(function* () {
      let a = typeof t === "function" ? { ...(yield* t()) } : { ...t },
        H = G_(a.parameters),
        u = a.execute;
      return (
        (a.execute = (f, d) => {
          let _ = {
            "tool.name": e,
            "session.id": d.sessionID,
            "message.id": d.messageID,
            ...(d.callID ? { "tool.call_id": d.callID } : {}),
          };
          return ft(function* () {
            let L = yield* H(f).pipe(
                Zo(
                  (T) =>
                    new L4i({
                      tool: e,
                      detail: a.formatValidationError ? a.formatValidationError(T) : String(T),
                    }),
                ),
              ),
              I = yield* u(L, d);
            if (I.metadata.truncated !== void 0) return I;
            let D = yield* s.get(d.agent),
              S = yield* r.output(I.output, {}, D);
            return {
              ...I,
              output: S.content,
              metadata: {
                ...I.metadata,
                truncated: S.truncated,
                ...(S.truncated && { outputPath: S.outputPath }),
              },
            };
          }).pipe(on, gI("Tool.execute", { attributes: _ }));
        }),
        a
      );
    });
}