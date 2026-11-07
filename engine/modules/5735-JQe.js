
var JQe = ne(async () => {
  Gt();
  OH();
  DY();
  bV();
  U2();
  BA();
  await Jn([JQe(), fL(), qd(), JS(), r5(), _me()]);
  ((grH = nt({ directory: bo }).annotate({ identifier: "MoveSession.Destination" })),
    (ErH = nt({ sessionID: Jj, destination: grH, moveChanges: be(Vi) }).annotate({
      identifier: "MoveSession.Input",
    })));
  TCr = class TCr extends (
    ki()("MoveSession.DestinationProjectMismatchError", { expected: z_, actual: z_ })
  ) {};
  Nwt = class Nwt extends ki()("MoveSession.ApplyChangesError", { message: re }) {};
  xCr = class xCr extends ki()("MoveSession.CaptureChangesError", { message: re }) {};
  SCr = class SCr extends (
    ki()("MoveSession.ResetSourceChangesError", { directory: bo, message: re, cause: be(yd()) })
  ) {};
  XQe = class XQe extends _i()("@opencode/ControlPlaneMoveSession") {};
  ((IrH = Es(
    XQe,
    ft(function* () {
      let e = yield* qG,
        t = yield* lL,
        r = yield* MY,
        s = yield* FY,
        a = Ge("MoveSession.moveSession")(function* (H) {
          let u = yield* s.get(H.sessionID);
          if (!u) return yield* new uVe({ sessionID: H.sessionID });
          let f = bo.make(H.destination.directory);
          if (u.location.directory === f) return;
          let d = yield* r.resolve(u.location.directory),
            _ = yield* r.resolve(f);
          if (u.projectID !== _.id) return yield* new TCr({ expected: u.projectID, actual: _.id });
          let L = H.moveChanges && d.directory !== _.directory,
            I = L ? yield* e.repo.discover(u.location.directory) : void 0;
          if (L && !I) return yield* new xCr({ message: "Source is not a Git repository" });
          let D = I
            ? yield* e.change
                .capture({ repository: I, path: u.location.directory })
                .pipe(Zo((S) => new xCr({ message: S.message })))
            : WDn.make("");
          if (D) {
            let S = yield* e.repo.discover(f);
            if (!S) return yield* new Nwt({ message: "Destination is not a Git repository" });
            yield* e.change
              .apply({ repository: S, path: f, changes: D })
              .pipe(Zo((T) => new Nwt({ message: T.message })));
          }
          if (
            (yield* t.publish(iht, {
              sessionID: H.sessionID,
              location: Rv.make({ directory: f }),
              subdirectory: du.make($rH.relative(_.directory, f).replaceAll("\\", "/")),
              timestamp: yield* kU,
            }),
            D)
          ) {
            let S = yield* e.repo.discover(u.location.directory);
            if (!S)
              return yield* new SCr({
                directory: u.location.directory,
                message: "Source is not a Git repository",
              });
            yield* e.change
              .discard({ repository: S, path: u.location.directory, index: "preserve", untracked: "remove" })
              .pipe(
                Zo((T) => new SCr({ directory: u.location.directory, message: T.message, cause: T.cause })),
              );
          }
        });
      return XQe.of({ moveSession: a });
    }),
  )),
    (DrH = iA({ service: XQe, layer: IrH, deps: [zMe, zS, hWe, oVe] })));
});