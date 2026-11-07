
function kes(e) {
  if (e.pathname === "/session/status") return null;
  let t =
    e.pathname.match(/^\/session\/([^/]+)(?:\/|$)/)?.[1] ??
    e.pathname.match(/^\/experimental\/session\/([^/]+)\/background$/)?.[1];
  if (!t) return null;
  return Ec.make(t);
}