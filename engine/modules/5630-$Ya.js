
function $Ya(e) {
  let { $schema: t, ...r } = e.schema;
  return MX({
    description: lYa,
    inputSchema: ub(r),
    async execute(s) {
      return (
        e.onSuccess(s),
        {
          output: "Structured output captured successfully.",
          title: "Structured Output",
          metadata: { valid: !0 },
        }
      );
    },
    toModelOutput({ output: s }) {
      return { type: "text", value: s.output };
    },
  });
}