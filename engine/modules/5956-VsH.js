
function VsH(e) {
  let t = e;
  noH(t);
  for (let [r, s] of Object.entries(t.components?.schemas ?? {}))
    t.components.schemas[r] = m9(structuredClone(s));
  (JsH(t), XsH(t), zsH(t), QsH(t), GsH(t), delete t.components?.securitySchemes);
  for (let [r, s] of Object.entries(t.paths ?? {}))
    for (let a of ["get", "post", "put", "delete", "patch"]) {
      let H = s[a];
      if (!H) continue;
      let u = qsH(r);
      if (H.requestBody) {
        if (!u) delete H.requestBody.required;
        let d = H.requestBody.content?.["application/json"];
        if (d?.schema) d.schema = m9(structuredClone(d.schema));
        if (r === "/experimental/workspace" && a === "post") {
          let _ = H.requestBody.content?.["application/json"]?.schema?.$ref?.replace(
              "#/components/schemas/",
              "",
            ),
            L = _
              ? t.components?.schemas?.[_]?.properties
              : H.requestBody.content?.["application/json"]?.schema?.properties;
          if (L?.branch) L.branch = { anyOf: [L.branch, { type: "null" }] };
          if (L?.extra) L.extra = { anyOf: [L.extra, { type: "null" }] };
        }
        if (r === "/experimental/workspace/warp" && a === "post") {
          let _ = H.requestBody.content?.["application/json"]?.schema?.$ref?.replace(
              "#/components/schemas/",
              "",
            ),
            L = _
              ? t.components?.schemas?.[_]?.properties
              : H.requestBody.content?.["application/json"]?.schema?.properties;
          if (L?.id) L.id = { anyOf: [L.id, { type: "null" }] };
        }
      }
      for (let d of Object.values(H.responses ?? {}))
        for (let _ of Object.values(d.content ?? {})) if (_.schema) _.schema = m9(structuredClone(_.schema));
      if (!u) (delete H.security, delete H.responses?.["401"], ZsH(H));
      if ((toH(H, r, a), (r === "/event" || r === "/global/event" || r === "/api/event") && a === "get"))
        H.responses["200"] = {
          description: "Event stream",
          content: {
            "text/event-stream": {
              schema:
                r === "/event"
                  ? { $ref: "#/components/schemas/Event" }
                  : r === "/global/event"
                    ? { $ref: "#/components/schemas/GlobalEvent" }
                    : { $ref: "#/components/schemas/V2Event" },
            },
          },
        };
      let f = `${a.toUpperCase()} ${r}`;
      for (let d of H.parameters ?? []) aoH(d, f);
    }
  return (eoH(t), e);
}