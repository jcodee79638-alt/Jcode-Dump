
function v$e(e) {
  return (
    (vkt = e),
    ekr({ event: { type: "update", update: vkt } }),
    nkr(e).catch(() => {
      return;
    }),
    e
  );
}