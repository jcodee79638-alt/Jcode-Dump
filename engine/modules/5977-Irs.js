
function Irs(e, t) {
  return {
    description: e,
    content: { "application/json": { schema: { $ref: `#/components/schemas/${t}` } } },
  };
}