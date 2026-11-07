
var o0 = ne(() => {
  Gt();
  au();
  YM();
  ghe();
  DSt();
  o0();
  Eg = class Eg extends _i()("@jaccode/Config") {};
  ((Swc = vm(Eg)),
    (iDa = bf(
      Eg,
      Eg.of({
        get: () =>
          ft(function* () {
            let e = G0r();
            return process.env.JAC_DESKTOP_MCP === "1" ? { ...e, mcp: yield* nA(KGe) } : e;
          }),
        getGlobal: () =>
          ft(function* () {
            let e = G0r();
            return process.env.JAC_DESKTOP_MCP === "1" ? { ...e, mcp: yield* nA(KGe) } : e;
          }),
        getConsoleState: () => Jt({ consoleManagedProviders: [], switchableOrgCount: 0 }),
        update: () => No(Error("Jac Code settings are managed by Jac.")),
        updateGlobal: () => No(Error("Jac Code settings are managed by Jac.")),
        invalidate: () => ti,
        directories: () => Jt([]),
        waitForDependencies: () => ti,
      }),
    )),
    (Ab = Ll({ service: Eg, layer: iDa, deps: [] })));
});