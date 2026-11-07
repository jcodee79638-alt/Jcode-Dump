
function t8i({ output: e, schema: t, schemaName: r, schemaDescription: s, enumValues: a }) {
  if (e != null && e !== "object" && e !== "array" && e !== "enum" && e !== "no-schema")
    throw new UE({ parameter: "output", value: e, message: "Invalid output type." });
  if (e === "no-schema") {
    if (t != null)
      throw new UE({
        parameter: "schema",
        value: t,
        message: "Schema is not supported for no-schema output.",
      });
    if (s != null)
      throw new UE({
        parameter: "schemaDescription",
        value: s,
        message: "Schema description is not supported for no-schema output.",
      });
    if (r != null)
      throw new UE({
        parameter: "schemaName",
        value: r,
        message: "Schema name is not supported for no-schema output.",
      });
    if (a != null)
      throw new UE({
        parameter: "enumValues",
        value: a,
        message: "Enum values are not supported for no-schema output.",
      });
  }
  if (e === "object") {
    if (t == null)
      throw new UE({ parameter: "schema", value: t, message: "Schema is required for object output." });
    if (a != null)
      throw new UE({
        parameter: "enumValues",
        value: a,
        message: "Enum values are not supported for object output.",
      });
  }
  if (e === "array") {
    if (t == null)
      throw new UE({
        parameter: "schema",
        value: t,
        message: "Element schema is required for array output.",
      });
    if (a != null)
      throw new UE({
        parameter: "enumValues",
        value: a,
        message: "Enum values are not supported for array output.",
      });
  }
  if (e === "enum") {
    if (t != null)
      throw new UE({ parameter: "schema", value: t, message: "Schema is not supported for enum output." });
    if (s != null)
      throw new UE({
        parameter: "schemaDescription",
        value: s,
        message: "Schema description is not supported for enum output.",
      });
    if (r != null)
      throw new UE({
        parameter: "schemaName",
        value: r,
        message: "Schema name is not supported for enum output.",
      });
    if (a == null)
      throw new UE({
        parameter: "enumValues",
        value: a,
        message: "Enum values are required for enum output.",
      });
    for (let H of a)
      if (typeof H !== "string")
        throw new UE({ parameter: "enumValues", value: H, message: "Enum values must be strings." });
  }
}