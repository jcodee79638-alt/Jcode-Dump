
var ILr = (e) =>
  Object.entries(e).map(
    ([t, r]) =>
      new Wj({
        name: t,
        description: r._definition.description,
        inputSchema: r._definition.inputSchema,
        outputSchema: r._definition.outputSchema,
      }),
  );