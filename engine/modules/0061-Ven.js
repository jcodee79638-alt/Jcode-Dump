
function Ven(e) {
  if (e === null) return null;
  let t = QDe(e);
  if (
    typeof t.accessToken !== "string" ||
    !/^[A-Za-z0-9_.-]{20,24000}$/.test(t.accessToken) ||
    typeof t.refreshToken !== "string" ||
    !/^[A-Za-z0-9_.-]{20,512}$/.test(t.refreshToken) ||
    !Number.isSafeInteger(t.expiresAt) ||
    (t.refreshing !== void 0 && typeof t.refreshing !== "boolean")
  )
    throw new Sc("storage");
  return {
    accessToken: t.accessToken,
    refreshToken: t.refreshToken,
    expiresAt: Number(t.expiresAt),
    ...(t.refreshing ? { refreshing: !0 } : {}),
  };
}