
function Ao(e, t, n) {
  if (R?.isFocused() || !P.Notification.isSupported()) return;
  let i = new P.Notification({ title: "Jac Code", body: e, silent: !0 });
  (i.on("click", () => {
    (R?.restore(), R?.focus(), de({ type: "launch", launch: { sessionId: t, directory: n } }));
  }),
    i.show());
}