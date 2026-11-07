
function kCe(e, t) {
  return Object.entries(e).map(([r, s]) => {
    let a = t[r]?.status ?? "disabled";
    return {
      name: r,
      type: s.type,
      enabled: s.enabled !== !1,
      status: a,
      ...(["failed", "needs_client_registration"].includes(a)
        ? {
            detail:
              a === "failed"
                ? "Could not connect. Check this server's settings and try again."
                : "This server needs an OAuth client registration.",
          }
        : {}),
    };
  });
}