
var gXi = ne(async () => {
  Gt();
  await Vy();
  ((ZXa = nt({ tool: re, error: re })),
    ($Xi = t_(
      "invalid",
      Jt({
        description: "Do not use",
        parameters: ZXa,
        execute: (e) =>
          Jt({
            title: "Invalid Tool",
            output: `The arguments provided to the tool are invalid: ${e.error}`,
            metadata: {},
          }),
      }),
    )));
});