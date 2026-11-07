
var yhe = ne(() => {
  k8();
  ((tEr = Object.freeze({ status: "aborted" })),
    (eEr = { value: void 0, enumerable: !1 }),
    (Nvi = "captureStackTrace" in Error ? Error : null));
  LX = class LX extends Error {
    constructor() {
      super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
  };
  r5e = class r5e extends Error {
    constructor(e) {
      super(`Encountered unidirectional transform during encode: ${e}`);
      this.name = "ZodEncodeError";
    }
  };
  (Uvi = globalThis).__zod_globalConfig ?? (Uvi.__zod_globalConfig = {});
  O8 = globalThis.__zod_globalConfig;
});