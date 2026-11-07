
function MaH(e, t, r) {
  return ft(function* () {
    if (e.mdns && t && e.hostname !== "127.0.0.1" && e.hostname !== "localhost" && e.hostname !== "::1") {
      let a = yield* pD(jn(() => zTi()));
      return (yield* jn(() => JIa(t, e.mdnsDomain)), yield* UL(r, a), a);
    }
    if (e.mdns) yield* lp("mDNS enabled but hostname is loopback; skipping mDNS publish");
    return ti;
  });
}