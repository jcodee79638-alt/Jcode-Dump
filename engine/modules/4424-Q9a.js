
function Q9a({ requestedScope: e, resourceMetadata: t, authServerMetadata: r, clientMetadata: s }) {
  let a = e || t?.scopes_supported?.join(" ") || s.scope;
  if (
    a &&
    r?.scopes_supported?.includes("offline_access") &&
    !a.split(" ").includes("offline_access") &&
    s.grant_types?.includes("refresh_token")
  )
    a = `${a} offline_access`;
  return a;
}