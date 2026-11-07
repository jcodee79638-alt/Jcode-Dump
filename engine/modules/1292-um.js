
var um = ne(async () => {
  NLn();
  Gt();
  Srr();
  uw();
  OH();
  await um();
  ((Trr = Ise.join(Imt, C3e)),
    (WLn = Ise.join(ULn, C3e)),
    (iGs = Ise.join(Dmt, C3e)),
    (qLn = Ise.join(OLn, C3e)),
    (sGs = Ise.join(VLn.tmpdir(), C3e)),
    (oGs = {
      get home() {
        return process.env.OPENCODE_TEST_HOME ?? VLn.homedir();
      },
      data: Trr,
      bin: Ise.join(WLn, "bin"),
      log: Ise.join(Trr, "log"),
      repos: Ise.join(Trr, "repos"),
      cache: WLn,
      config: iGs,
      state: qLn,
      tmp: sGs,
    }),
    (uH = oGs));
  Dde.setGlobal({ state: qLn });
  await Promise.all([
    yde.mkdir(uH.data, { recursive: !0 }),
    yde.mkdir(uH.config, { recursive: !0 }),
    yde.mkdir(uH.state, { recursive: !0 }),
    yde.mkdir(uH.tmp, { recursive: !0 }),
    yde.mkdir(uH.log, { recursive: !0 }),
    yde.mkdir(uH.bin, { recursive: !0 }),
    yde.mkdir(uH.repos, { recursive: !0 }),
  ]);
  M1 = class M1 extends _i()("@opencode/Global") {};
  ((HGs = Es(
    M1,
    jn(() => M1.of(aGs())),
  )),
    (lw = iA({ service: M1, layer: HGs, deps: [] })));
});