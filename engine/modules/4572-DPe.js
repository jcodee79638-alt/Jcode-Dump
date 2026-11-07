
var DPe = ne(async () => {
  au();
  YM();
  Ql();
  BA();
  lb();
  yy();
  Gt();
  await Jn([m7(), DPe()]);
  ((x3i = nt({ key: re, op: Jo(["eq", "neq"]), value: re })),
    (cBa = nt({ type: ri("text"), key: re, message: re, placeholder: Gn(re), when: Gn(x3i) })),
    (ABa = nt({ label: re, value: re, hint: Gn(re) })),
    (uBa = nt({ type: ri("select"), key: re, message: re, options: On(ABa), when: Gn(x3i) })),
    (lBa = Io([cBa, uBa])));
  S3i = class S3i extends (
    Pa("ProviderAuthMethod")({ type: Jo(["oauth", "api"]), label: re, prompts: Gn(On(lBa)) })
  ) {};
  T3i = ks(re, On(S3i));
  v3i = class v3i extends (
    Pa("ProviderAuthAuthorization")({ url: re, method: Jo(["auto", "code"]), instructions: re })
  ) {};
  ((b3i = nt({
    method: mo.annotate({ description: "Auth method index" }),
    inputs: be(ks(re, re)).annotate({ description: "Prompt inputs" }),
  })),
    (fBa = nt({
      method: mo.annotate({ description: "Auth method index" }),
      code: be(re).annotate({ description: "OAuth authorization code" }),
    })));
  _xr = class _xr extends ki()("ProviderAuthOauthMissing", { providerID: Kp }) {};
  hxr = class hxr extends ki()("ProviderAuthOauthCodeMissing", { providerID: Kp }) {};
  Lxr = class Lxr extends ki()("ProviderAuthOauthCallbackFailed", {}) {};
  $xr = class $xr extends ki()("ProviderAuthValidationFailed", { field: re, message: re }) {};
  IPe = class IPe extends _i()("@opencode/ProviderAuth") {};
  ((GeA = vm(IPe)),
    (pBa = Es(
      IPe,
      ft(function* () {
        let e = yield* TX,
          t = yield* IT,
          r = yield* cx(
            Ge("ProviderAuth.state")(function* () {
              let f = yield* t.list();
              return {
                hooks: POs(
                  VOs(f, (d) => (d.auth?.provider !== void 0 ? D$([Kp.make(d.auth.provider), d.auth]) : MOs)),
                ),
                pending: new Map(),
              };
            }),
          ),
          s = E1(T3i),
          a = Ge("ProviderAuth.methods")(function* () {
            let f = (yield* Eu(r)).hooks;
            return s(
              vv(f, (d) =>
                d.methods.map((_) => ({
                  type: _.type,
                  label: _.label,
                  ...(_.prompts && {
                    prompts: _.prompts.map((L) => {
                      if (L.type === "select")
                        return {
                          type: "select",
                          key: L.key,
                          message: L.message,
                          options: L.options,
                          ...(L.when && { when: L.when }),
                        };
                      return {
                        type: "text",
                        key: L.key,
                        message: L.message,
                        ...(L.placeholder && { placeholder: L.placeholder }),
                        ...(L.when && { when: L.when }),
                      };
                    }),
                  }),
                })),
              ),
            );
          }),
          H = Ge("ProviderAuth.authorize")(function* (f) {
            let { hooks: d, pending: _ } = yield* Eu(r),
              L = d[f.providerID].methods[f.method];
            if (L.type !== "oauth") return;
            if (L.prompts && f.inputs) {
              for (let D of L.prompts)
                if (D.type === "text" && D.validate && f.inputs[D.key] !== void 0) {
                  let S = D.validate(f.inputs[D.key]);
                  if (S) return yield* new $xr({ field: D.key, message: S });
                }
            }
            let I = yield* nA(() => L.authorize(f.inputs));
            return (_.set(f.providerID, I), { url: I.url, method: I.method, instructions: I.instructions });
          }),
          u = Ge("ProviderAuth.callback")(function* (f) {
            let _ = (yield* Eu(r)).pending.get(f.providerID);
            if (!_) return yield* new _xr({ providerID: f.providerID });
            if (_.method === "code" && !f.code) return yield* new hxr({ providerID: f.providerID });
            let L = yield* nA(() => (_.method === "code" ? _.callback(f.code) : _.callback()));
            if (!L || L.type !== "success") return yield* new Lxr({});
            if ("key" in L)
              yield* e.set(f.providerID, {
                type: "api",
                key: L.key,
                ...(L.metadata ? { metadata: L.metadata } : {}),
              });
            if ("refresh" in L) {
              let { type: I, provider: D, refresh: S, access: T, expires: C, ...O } = L;
              yield* e.set(f.providerID, { type: "oauth", access: T, refresh: S, expires: C, ...O });
            }
          });
        return IPe.of({ methods: a, authorize: H, callback: u });
      }),
    )),
    (j3i = Ll({ service: IPe, layer: pBa, deps: [pje, bX] })));
});