
var F0r = ne(async () => {
  au();
  Ef();
  YM();
  Gt();
  YTi();
  GGe();
  await Jn([qL(), F0r()]);
  Rbe = class Rbe extends _i()("@opencode/AccountRepo") {};
  ((QCc = vm(Rbe)),
    (zIa = Es(
      Rbe,
      ft(function* () {
        let { db: e } = yield* Vd,
          t = E1(mSt),
          r = (D) => D.pipe(Zo((S) => new hSt({ message: "Database operation failed", cause: S }))),
          s = ni(function* () {
            let D = yield* e.select().from(Lhe).where(Pi(Lhe.id, ZTi)).get();
            if (!D?.active_account_id) return;
            let S = yield* e.select().from(CN).where(Pi(CN.id, D.active_account_id)).get();
            if (!S) return;
            return { ...S, active_org_id: D.active_org_id ?? null };
          }),
          a = (D, S) => {
            let T = TKt(S);
            return e
              .insert(Lhe)
              .values({ id: ZTi, active_account_id: D, active_org_id: T })
              .onConflictDoUpdate({ target: Lhe.id, set: { active_account_id: D, active_org_id: T } })
              .run();
          },
          H = Ge("AccountRepo.active")(() => r(s()).pipe(Vn((D) => (D ? Lo(t(D)) : eH())))),
          u = Ge("AccountRepo.list")(() =>
            r(
              e
                .select()
                .from(CN)
                .all()
                .pipe(Vn((D) => D.map((S) => t({ ...S, active_org_id: null })))),
            ),
          ),
          f = Ge("AccountRepo.remove")((D) =>
            r(
              e.transaction((S) =>
                ft(function* () {
                  (yield* S.update(Lhe)
                    .set({ active_account_id: null, active_org_id: null })
                    .where(Pi(Lhe.active_account_id, D))
                    .run(),
                    yield* S.delete(CN).where(Pi(CN.id, D)).run());
                }),
              ),
            ).pipe(Qf),
          ),
          d = Ge("AccountRepo.use")((D, S) => r(a(D, S)).pipe(Qf)),
          _ = Ge("AccountRepo.getRow")((D) => r(e.select().from(CN).where(Pi(CN.id, D)).get()).pipe(Vn(Sv))),
          L = Ge("AccountRepo.persistToken")((D) =>
            r(
              e
                .update(CN)
                .set({
                  access_token: D.accessToken,
                  refresh_token: D.refreshToken,
                  token_expiry: TKt(D.expiry),
                })
                .where(Pi(CN.id, D.accountID))
                .run(),
            ).pipe(Qf),
          ),
          I = Ge("AccountRepo.persistAccount")((D) =>
            r(
              e.transaction((S) =>
                ft(function* () {
                  let T = $St(D.url);
                  (yield* S.insert(CN)
                    .values({
                      id: D.id,
                      email: D.email,
                      url: T,
                      access_token: D.accessToken,
                      refresh_token: D.refreshToken,
                      token_expiry: D.expiry,
                    })
                    .onConflictDoUpdate({
                      target: CN.id,
                      set: {
                        email: D.email,
                        url: T,
                        access_token: D.accessToken,
                        refresh_token: D.refreshToken,
                        token_expiry: D.expiry,
                      },
                    })
                    .run(),
                    yield* a(D.id, D.orgID));
                }),
              ),
            ).pipe(Qf),
          );
        return Rbe.of({
          active: H,
          list: u,
          remove: f,
          use: d,
          getRow: _,
          persistToken: L,
          persistAccount: I,
        });
      }),
    )),
    (QIa = Ll({ service: Rbe, layer: zIa, deps: [DD] })));
});