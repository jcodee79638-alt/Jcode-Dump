
var XGe = ne(async () => {
  au();
  vy();
  Gt();
  YM();
  Cf();
  kGe();
  GGe();
  GGe();
  await Jn([F0r(), XGe()]);
  rvi = class rvi extends Pa("RemoteConfig")({ config: ks(re, Qie) }) {};
  gSt = Aa.pipe(v$(uRe, { decode: Sm((e) => Pv(e)), encode: Sm((e) => Aut(e)) }));
  nvi = class nvi extends Pa("TokenRefresh")({ access_token: pSt, refresh_token: UGe, expires_in: gSt }) {};
  ivi = class ivi extends (
    Pa("DeviceAuth")({
      device_code: NGe,
      user_code: dSt,
      verification_uri_complete: re,
      expires_in: gSt,
      interval: gSt,
    })
  ) {};
  svi = class svi extends (
    Pa("DeviceTokenSuccess")({
      access_token: pSt,
      refresh_token: UGe,
      token_type: ri("Bearer"),
      expires_in: gSt,
    })
  ) {};
  q0r = class q0r extends Pa("DeviceTokenError")({ error: re, error_description: re }) {
    toPollResult() {
      if (this.error === "authorization_pending") return new BGe();
      if (this.error === "slow_down") return new RGe();
      if (this.error === "expired_token") return new WGe();
      if (this.error === "access_denied") return new VGe();
      return new qGe({ cause: this.error });
    }
  };
  YIa = Io([svi, q0r]);
  ovi = class ovi extends Pa("User")({ id: Fbe, email: re }) {};
  R0r = class R0r extends Pa("ClientId")({ client_id: re }) {};
  W0r = class W0r extends Pa("DeviceTokenRequest")({ grant_type: re, device_code: NGe, client_id: re }) {};
  V0r = class V0r extends Pa("TokenRefreshRequest")({ grant_type: re, refresh_token: UGe, client_id: re }) {};
  ((ZIa = Hie(5)), (eDa = $E(ZIa)));
  Wbe = class Wbe extends _i()("@opencode/Account") {};
  ((Awc = vm(Wbe)),
    (rDa = Es(
      Wbe,
      ft(function* () {
        let e = yield* Rbe,
          t = yield* gy,
          r = AHe(t),
          s = RU(t),
          a = RU(r),
          H = (z) => r.execute(z).pipe(a7("HTTP request failed")),
          u = (z) => a.execute(z).pipe(a7("HTTP request failed")),
          f = (z) =>
            z.pipe(
              Hi((Ae) => s.execute(Ae)),
              a7("HTTP request failed"),
            ),
          d = (z) =>
            z.pipe(
              Hi((Ae) => t.execute(Ae)),
              a7("HTTP request failed"),
            ),
          _ = ni(function* (z) {
            let Ae = yield* qC,
              le = yield* f(
                u2(`${z.url}/auth/device/token`).pipe(
                  _G,
                  MRe(V0r)(
                    new V0r({ grant_type: "refresh_token", refresh_token: z.refresh_token, client_id: B0r }),
                  ),
                ),
              ),
              Be = yield* l2(nvi)(le).pipe(a7("Failed to decode response")),
              Te = Lo(Ae + $E(Be.expires_in));
            return (
              yield* e.persistToken({
                accountID: z.id,
                accessToken: Be.access_token,
                refreshToken: Be.refresh_token,
                expiry: Te,
              }),
              Be.access_token
            );
          }),
          L = yield* Zfn({
            capacity: Number.POSITIVE_INFINITY,
            timeToLive: xU,
            lookup: ni(function* (z) {
              let Ae = yield* e.getRow(z);
              if (vl(Ae)) return yield* bn(new uHe({ message: "Account not found during token refresh" }));
              let le = Ae.value,
                Be = yield* qC;
              if (tvi(le.token_expiry, Be)) return le.access_token;
              return yield* _(le);
            }),
          }),
          I = ni(function* (z) {
            let Ae = yield* qC;
            if (tvi(z.token_expiry, Ae)) return z.access_token;
            return yield* pWs(L, z.id);
          }),
          D = ni(function* (z) {
            let Ae = yield* e.getRow(z);
            if (vl(Ae)) return eH();
            let le = Ae.value,
              Be = yield* I(le);
            return Lo({ account: le, accessToken: Be });
          }),
          S = ni(function* (z, Ae) {
            let le = yield* u(KM(`${z}/api/orgs`).pipe(_G, JZt(Ae)));
            return yield* l2(On(_St))(le).pipe(a7("Failed to decode response"));
          }),
          T = ni(function* (z, Ae) {
            let le = yield* u(KM(`${z}/api/user`).pipe(_G, JZt(Ae)));
            return yield* l2(ovi)(le).pipe(a7("Failed to decode response"));
          }),
          C = Ge("Account.token")((z) => D(z).pipe(Vn(YF((Ae) => Ae.accessToken)))),
          O = Ge("Account.activeOrg")(function* () {
            let z = yield* e.active();
            if (vl(z)) return eH();
            let Ae = z.value;
            if (!Ae.active_org_id) return eH();
            let Be = (yield* V(Ae.id)).find((Te) => Te.id === Ae.active_org_id);
            if (!Be) return eH();
            return Lo({ account: Ae, org: Be });
          }),
          B = Ge("Account.orgsByAccount")(function* () {
            let z = yield* e.list();
            return yield* ja(
              z,
              (Ae) =>
                V(Ae.id).pipe(
                  $s(() => Jt([])),
                  Vn((le) => ({ account: Ae, orgs: le })),
                ),
              { concurrency: 3 },
            );
          }),
          V = Ge("Account.orgs")(function* (z) {
            let Ae = yield* D(z);
            if (vl(Ae)) return [];
            let { account: le, accessToken: Be } = Ae.value;
            return yield* S(le.url, Be);
          }),
          q = Ge("Account.remove")(function* (z) {
            let Ae = yield* e.active();
            if ((yield* e.remove(z), vl(Ae) || Ae.value.id !== z)) return;
            let le = (yield* B()).flatMap((Be) =>
              Be.orgs.map((Te) => ({ accountID: Be.account.id, orgID: Te.id })),
            )[0];
            if (!le) return;
            yield* e.use(le.accountID, Lo(le.orgID));
          }),
          Z = Ge("Account.config")(function* (z, Ae) {
            let le = yield* D(z);
            if (vl(le)) return eH();
            let { account: Be, accessToken: Te } = le.value,
              Lt = yield* H(KM(`${Be.url}/api/config`).pipe(_G, JZt(Te), YW({ "x-org-id": Ae })));
            if (Lt.status === 404) return eH();
            let Ht = yield* opt(Lt).pipe(a7()),
              Se = yield* l2(rvi)(Ht).pipe(a7("Failed to decode response"));
            return Lo(Se.config);
          }),
          se = Ge("Account.login")(function* (z) {
            let Ae = $St(z),
              le = yield* f(u2(`${Ae}/auth/device/code`).pipe(_G, MRe(R0r)(new R0r({ client_id: B0r })))),
              Be = yield* l2(ivi)(le).pipe(a7("Failed to decode response")),
              Te = yield* ZA({
                try: () => {
                  let Lt = new URL(Be.verification_uri_complete, `${Ae}/`);
                  if (Lt.protocol !== "http:" && Lt.protocol !== "https:") throw Error("expected HTTP(S)");
                  return Lt.href;
                },
                catch: (Lt) => new uHe({ message: "Invalid device verification URL", cause: Lt }),
              });
            return new LSt({
              code: Be.device_code,
              user: Be.user_code,
              url: Te,
              server: Ae,
              expiry: Be.expires_in,
              interval: Be.interval,
            });
          }),
          ae = Ge("Account.poll")(function* (z) {
            let Ae = yield* d(
                u2(`${z.server}/auth/device/token`).pipe(
                  _G,
                  MRe(W0r)(
                    new W0r({
                      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
                      device_code: z.code,
                      client_id: B0r,
                    }),
                  ),
                ),
              ),
              le = yield* l2(YIa)(Ae).pipe(a7("Failed to decode response"));
            if (le instanceof q0r) return le.toPollResult();
            let Be = le.access_token,
              Te = T(z.server, Be),
              Lt = S(z.server, Be),
              [Ht, Se] = yield* Km([Te, Lt], { concurrency: 2 }),
              _e = Se.length > 0 ? Lo(Se[0].id) : eH(),
              Pe = (yield* qC) + $E(le.expires_in),
              ye = le.refresh_token;
            return (
              yield* e.persistAccount({
                id: Ht.id,
                email: Ht.email,
                url: z.server,
                accessToken: Be,
                refreshToken: ye,
                expiry: Pe,
                orgID: _e,
              }),
              new FGe({ email: Ht.email })
            );
          });
        return Wbe.of({
          active: e.active,
          activeOrg: O,
          list: e.list,
          orgsByAccount: B,
          remove: q,
          use: e.use,
          orgs: V,
          config: Z,
          token: C,
          login: se,
          poll: ae,
        });
      }),
    )),
    (avi = Ll({ service: Wbe, layer: rDa, deps: [QIa, Q0] })));
});