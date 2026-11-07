
function i8i(e) {
  let {
      model: t,
      output: r = "object",
      system: s,
      prompt: a,
      messages: H,
      maxRetries: u,
      abortSignal: f,
      headers: d,
      experimental_repairText: _,
      experimental_telemetry: L,
      experimental_download: I,
      providerOptions: D,
      onError: S = ({ error: Ae }) => {
        console.error(Ae);
      },
      onFinish: T,
      _internal: { generateId: C = FTa, currentDate: O = () => new Date(), now: B = B5e } = {},
      ...V
    } = e,
    q = "enum" in e && e.enum ? e.enum : void 0,
    { schema: Z, schemaDescription: se, schemaName: ae } = "schema" in e ? e : {};
  t8i({ output: r, schema: Z, schemaName: ae, schemaDescription: se, enumValues: q });
  let z = Z6i({ output: r, schema: Z, enumValues: q });
  return new BTa({
    model: t,
    telemetry: L,
    headers: d,
    settings: V,
    maxRetries: u,
    abortSignal: f,
    outputStrategy: z,
    system: s,
    prompt: a,
    messages: H,
    schemaName: ae,
    schemaDescription: se,
    providerOptions: D,
    repairText: _,
    onError: S,
    onFinish: T,
    download: I,
    generateId: C,
    currentDate: O,
    now: B,
  });
}