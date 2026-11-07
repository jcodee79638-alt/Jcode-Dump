
function dYe(e) {
  return e.pipe(
    EA("SessionBusyError", (t) =>
      bn(new uAe({ sessionID: t.sessionID, message: `Session is busy: ${t.sessionID}` })),
    ),
  );
}