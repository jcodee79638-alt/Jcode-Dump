
function NZi(e) {
  return yH(() =>
    $Cr({
      timeout: e.timeout,
      signal: e.signal,
      fn(t) {
        return t.workspace === e.workspaceID || t.payload.type === "sync";
      },
    }).pipe(
      Zu(FZi(e.db, e.state)),
      Hi((t) => (t ? ti : NZi(e))),
    ),
  );
}