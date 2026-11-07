
var GKt = ne(() => {
  YA();
  ((qKt = bA("effect/Scheduler", { defaultValue: () => new mye() })),
    (Trn =
      "setImmediate" in globalThis
        ? (e) => {
            let t = globalThis.setImmediate(e);
            return () => globalThis.clearImmediate(t);
          }
        : (e) => {
            let t = setTimeout(e, 0);
            return () => clearTimeout(t);
          }));
  ((jrn = bA("effect/Scheduler/MaxOpsBeforeYield", { defaultValue: () => 2048 })),
    (Prn = bA("effect/Scheduler/PreventSchedulerYield", { defaultValue: () => !1 })));
});