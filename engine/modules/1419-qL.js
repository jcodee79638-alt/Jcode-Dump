
var qL = ne(async () => {
  drr();
  kLn();
  Gt();
  uw();
  OH();
  await Jn([qL(), um(), brr()]);
  QGs = bqs();
  Vd = class Vd extends _i()("@opencode/v2/storage/Database") {};
  YGs = Es(
    Vd,
    ft(function* () {
      let e = yield* QGs;
      return (
        yield* e.run("PRAGMA journal_mode = WAL"),
        yield* e.run("PRAGMA synchronous = NORMAL"),
        yield* e.run("PRAGMA busy_timeout = 5000"),
        yield* e.run("PRAGMA cache_size = -64000"),
        yield* e.run("PRAGMA foreign_keys = ON"),
        yield* e.run("PRAGMA wal_checkpoint(PASSIVE)"),
        yield* JGs(e),
        { db: e }
      );
    }).pipe(on),
  );
  DD = iA({ service: Vd, layer: ZGs(e5s()), deps: [] });
});