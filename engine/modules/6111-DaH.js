
function DaH(e) {
  return ft(function* () {
    if (e.server.address._tag === "TcpAddress") return e.server.address;
    return (
      yield* cl(e.scope, M$).pipe(FA),
      yield* No(Error(`Unexpected HttpServer address tag: ${e.server.address._tag}`))
    );
  });
}