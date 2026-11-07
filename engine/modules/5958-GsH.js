
function GsH(e) {
  if (!e.components?.schemas) return;
  ((e.components.schemas.BadRequestError = {
    type: "object",
    required: ["name", "data"],
    properties: {
      name: { type: "string", enum: ["BadRequest"] },
      data: {
        type: "object",
        required: ["message"],
        properties: {
          message: { type: "string" },
          kind: { type: "string", enum: ["Params", "Headers", "Query", "Body", "Payload"] },
        },
      },
    },
  }),
    (e.components.schemas.NotFoundError = {
      type: "object",
      required: ["name", "data"],
      properties: {
        name: { type: "string", enum: ["NotFoundError"] },
        data: { type: "object", required: ["message"], properties: { message: { type: "string" } } },
      },
    }));
}