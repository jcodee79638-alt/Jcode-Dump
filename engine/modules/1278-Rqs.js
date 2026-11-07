
var Rqs = "db.system.name",
  CLn = "~@opencode-ai/core/database/SqliteBun",
  Wqs = (e) =>
    ft(function* () {
      let t = yield* Emt,
        r = Xdn(e.transformQueryNames),
        s = e.transformResultNames ? Jdn(e.transformResultNames).array : void 0,
        a = (I, D = []) =>
          hl((S) => {
            let T = t.query(I);
            T.safeIntegers(Pp(S.context, xtr));
            try {
              return Jt(T.all(...D) ?? []);
            } catch (C) {
              return bn(
                new dMe({ reason: P3e(C, { message: "Failed to execute statement", operation: "execute" }) }),
              );
            }
          }),
        H = (I, D = []) =>
          hl((S) => {
            let T = t.query(I);
            T.safeIntegers(Pp(S.context, xtr));
            try {
              return Jt(T.values(...D) ?? []);
            } catch (C) {
              return bn(
                new dMe({ reason: P3e(C, { message: "Failed to execute statement", operation: "execute" }) }),
              );
            }
          }),
        u = Za({
          execute(I, D, S) {
            return S ? Vn(a(I, D), S) : a(I, D);
          },
          executeRaw(I, D) {
            return a(I, D);
          },
          executeValues(I, D) {
            return H(I, D);
          },
          executeUnprepared(I, D, S) {
            return this.execute(I, D, S);
          },
          executeStream() {
            return fcn("executeStream not implemented");
          },
          export: ZA({
            try: () => t.serialize(),
            catch: (I) =>
              new dMe({ reason: P3e(I, { message: "Failed to export database", operation: "export" }) }),
          }),
          loadExtension: (I) =>
            ZA({
              try: () => t.loadExtension(I),
              catch: (D) =>
                new dMe({
                  reason: P3e(D, { message: "Failed to load extension", operation: "loadExtension" }),
                }),
            }),
        }),
        f = yield* EHn(1),
        d = f.withPermits(1)(Jt(u)),
        _ = q0((I) => {
          let D = ZC(),
            S = cg(D.context, $f);
          return eu(
            DE(I(f.take(1)), () => UL(S, f.release(1))),
            u,
          );
        });
      return Object.assign(
        yield* Ydn({
          acquirer: d,
          compiler: r,
          transactionAcquirer: _,
          spanAttributes: [...(e.spanAttributes ? Object.entries(e.spanAttributes) : []), [Rqs, "sqlite"]],
          transformRows: s,
        }),
        {
          [CLn]: CLn,
          config: e,
          export: Hi(d, (I) => I.export),
          loadExtension: (I) => Hi(d, (D) => D.loadExtension(I)),
        },
      );
    }),
  Vqs = (e) =>
    Es(
      Emt,
      ft(function* () {
        let t = new Bqs(e.filename, {
          readonly: e.readonly,
          readwrite: e.readwrite ?? !0,
          create: e.create ?? !0,
        });
        if ((yield* sL(() => jn(() => t.close())), e.disableWAL !== !0)) t.run("PRAGMA journal_mode = WAL;");
        return t;
      }),
    ),
  qqs = (e) => Es(Edt, Wqs(e)),
  Gqs,
  wLn = (e) => {
    let t = Vqs(e);
    return gie(t, gie(qqs(e), Gqs).pipe(ou(t))).pipe(ou(kdn));
  };