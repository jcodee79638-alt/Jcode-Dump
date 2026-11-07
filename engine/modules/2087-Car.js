
var Car = ne(async () => {
  Gt();
  h2();
  yht();
  Nxe();
  jA();
  zM();
  bht();
  kht();
  await Jn([Car(), e8(), Kv(), um()]);
  ((Ifo = [
    { pattern: "{agent,agents}/**/*.md", primary: !1 },
    { pattern: "{mode,modes}/*.md", primary: !0 },
  ]),
    (Dfo = kv(Zir)),
    (yfo = kv(j2)),
    (Mfo = kv(Oht)),
    (xfo = ["external_directory", "read", "edit"]),
    (Sfo = new Set([
      "model",
      "variant",
      "request",
      "system",
      "description",
      "mode",
      "hidden",
      "color",
      "steps",
      "disabled",
      "permissions",
    ])),
    (Tfo = TD({
      id: "config-agent",
      effect: Ge(function* (e) {
        let t = yield* ZM,
          r = yield* ui.Service,
          s = yield* M1;
        yield* e.agent.transform(
          Ge(function* (a) {
            let H = yield* ja(yield* t.entries(), (d) => {
                if (d.type === "document") return Jt([d]);
                return ft(function* () {
                  let _ = yield* jfo(r, d.path);
                  return yield* ja(_, (L) =>
                    r.readFileStringSafe(L.filepath).pipe(
                      Vn((I) => I && Pfo(L, I)),
                      $s(() => Jt(void 0)),
                    ),
                  ).pipe(Vn((L) => L.filter((I) => I !== void 0)));
                });
              }).pipe(Vn((d) => d.flat())),
              u = pPn(
                H.flatMap((d) => d.info.permissions ?? []),
                s.home,
              ),
              f = Uht(H, "default_agent");
            if (f !== void 0) a.default(US.make(f));
            for (let d of a.list()) a.update(d.id, (_) => _.permissions.push(...u));
            for (let d of H)
              for (let [_, L] of Object.entries(d.info.agents ?? {})) {
                let I = US.make(_);
                if (L.disabled) {
                  a.remove(I);
                  continue;
                }
                let D = a.get(I) !== void 0;
                a.update(I, (S) => {
                  if (!D) S.permissions.push(...u);
                  if (L.model !== void 0) {
                    let T = mtr(L.model);
                    S.model = { id: T.modelID, providerID: T.providerID, variant: S.model?.variant };
                  }
                  if (L.variant !== void 0 && S.model !== void 0) S.model.variant = H3e.make(L.variant);
                  if (L.request !== void 0)
                    (Object.assign(S.request.headers, L.request.headers ?? {}),
                      Object.assign(S.request.body, L.request.body ?? {}));
                  if (L.system !== void 0) S.system = L.system;
                  if (L.description !== void 0) S.description = L.description;
                  if (L.mode !== void 0) S.mode = L.mode;
                  if (L.hidden !== void 0) S.hidden = L.hidden;
                  if (L.color !== void 0) S.color = L.color;
                  if (L.steps !== void 0) S.steps = L.steps;
                  if (L.permissions !== void 0) S.permissions.push(...pPn(L.permissions, s.home));
                });
              }
          }),
        );
      }),
    })));
});
import Cfo from "path";