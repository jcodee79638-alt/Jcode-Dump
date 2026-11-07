
var Vae = ne(async () => {
  Gt();
  Cf();
  nMt();
  uw();
  Srr();
  Ide();
  jA();
  OH();
  vy();
  await Jn([um(), fL(), Vae()]);
  ((C0i = Jo(["alpha", "beta", "deprecated"])),
    (j0i = Io([Jo(["reasoning", "reasoning_content", "reasoning_text"]), re])),
    (kAa = `opencode/${uV}/${VL}/${Ad.OPENCODE_CLIENT}`),
    (OAa = nt({
      input: mo,
      output: mo,
      cache_read: be(mo),
      cache_write: be(mo),
      tier: nt({ type: ri("context"), size: mo }),
    })),
    (P0i = nt({
      input: mo,
      output: mo,
      cache_read: be(mo),
      cache_write: be(mo),
      tiers: be(On(OAa)),
      context_over_200k: be(nt({ input: mo, output: mo, cache_read: be(mo), cache_write: be(mo) })),
    })),
    (UAa = Io([
      nt({ type: ri("effort"), values: On(w6(re)) }),
      nt({ type: ri("toggle") }),
      nt({ type: ri("budget_tokens"), min: be(mo), max: be(mo) }),
    ])),
    (NAa = nt({
      id: re,
      name: re,
      family: be(re),
      release_date: re,
      attachment: Vi,
      reasoning: Vi,
      temperature: Vi,
      tool_call: Vi,
      reasoning_options: be(On(UAa)),
      interleaved: be(Io([Vi, j0i, nt({ field: j0i })])),
      cost: be(P0i),
      limit: nt({ context: mo, input: be(mo), output: mo }),
      modalities: be(
        nt({
          input: On(Jo(["text", "audio", "image", "video", "pdf"])),
          output: On(Jo(["text", "audio", "image", "video", "pdf"])),
        }),
      ),
      experimental: be(
        nt({
          modes: be(
            ks(
              re,
              nt({ cost: be(P0i), provider: be(nt({ body: be(ks(re, IBs)), headers: be(ks(re, re)) })) }),
            ),
          ),
        }),
      ),
      status: be(C0i),
      provider: be(nt({ npm: be(re), api: be(re) })),
    })),
    (i0c = nt({ api: be(re), name: re, env: On(re), id: re, npm: be(re), models: ks(re, NAa) })),
    (w0i = b0i));
  Wae = class Wae extends _i()("@opencode/ModelsDev") {};
  ((FAa = Es(
    Wae,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* lL,
        r = RU(
          (yield* gy).pipe(SRe({ retryOn: "errors-and-responses", times: 2, schedule: slt(200).pipe(olt) })),
        ),
        s = Ad.OPENCODE_MODELS_URL || "https://models.opencode.ai",
        a = wAa.join(
          uH.cache,
          s === "https://models.opencode.ai" ? "models.json" : `models-${qU.fast(s)}.json`,
        ),
        H = Hie(5),
        u = `models-dev:${a}`,
        f = ni(function* () {
          let B = yield* e.stat(a).pipe($s(() => Jt(void 0)));
          if (!B) return !1;
          let V = uD(B.mtime, () => new Date(0)).getTime();
          return Date.now() - V < $E(H);
        }),
        d = Ge("ModelsDev.fetchApi")(function* () {
          return yield* KM(`${s}/api.json`).pipe(
            npt("User-Agent", kAa),
            r.execute,
            Hi((B) => B.text),
            vW("10 seconds"),
          );
        }),
        _ = e.readJson(Ad.OPENCODE_MODELS_PATH ?? a).pipe(
          $s((B) => {
            if (Ad.OPENCODE_MODELS_PATH === void 0 && B._tag === "FileSystemError" && B.method === "readJson")
              return e.remove(a, { force: !0 }).pipe(FA, eu(void 0));
            return Jt(void 0);
          }),
          Vn((B) => B),
        ),
        L = jn(() => (typeof {} > "u" ? void 0 : {})),
        I = Ge("ModelsDev.fetchAndWrite")(function* () {
          let B = yield* d(),
            V = `${a}.${process.pid}.${Date.now()}.tmp`;
          return (
            yield* e.writeWithDirs(V, B).pipe(
              Zu(e.rename(V, a)),
              $s((q) =>
                ft(function* () {
                  return (yield* e.remove(V, { force: !0 }).pipe(FA), yield* bn(q));
                }),
              ),
            ),
            B
          );
        }),
        D = ft(function* () {
          let B = yield* _;
          if (B) return B;
          let V = yield* L;
          if (V) return V;
          if (Ad.OPENCODE_DISABLE_MODELS_FETCH) return {};
          let q = yield* FL(
            ft(function* () {
              return (yield* Dde.effect(u), yield* I());
            }),
          );
          return JSON.parse(q);
        }).pipe(gI("ModelsDev.populate"), on),
        [S, T] = yield* hNs(D, SU),
        C = () => S,
        O = Ge("ModelsDev.refresh")(function* (B = !1) {
          if (!B && (yield* f())) return;
          yield* FL(
            ft(function* () {
              if ((yield* Dde.effect(u), !B && (yield* f()))) return;
              (yield* I(), yield* T, yield* t.publish(w0i.Refreshed, {}));
            }),
          ).pipe(
            Oye((V) => cf("Failed to fetch models.dev", { cause: V })),
            FA,
          );
        });
      if (!Ad.OPENCODE_DISABLE_MODELS_FETCH && !process.argv.includes("--get-yargs-completions"))
        yield* EI(O().pipe(xie(Die("60 minutes")), FA));
      return Wae.of({ get: C, refresh: O });
    }),
  )),
    (qhr = iA({ service: Wae, layer: FAa, deps: [ui.node, zS, Q0] })));
});
import zve from "path";