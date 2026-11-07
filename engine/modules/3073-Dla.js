
var Dla,
  OLr = (e) => K_(e) && (Array.isArray(e.anyOf) || Array.isArray(e.oneOf) || Array.isArray(e.allOf)),
  yla = (e) => K_(e) && (OLr(e) || Dla.some((t) => t in e)),
  ULr = (e) => {
    if (!K_(e)) return Array.isArray(e) ? e.map(ULr) : e;
    let t = Object.fromEntries(
      Object.entries(e).map(([s, a]) => [s, s === "enum" && Array.isArray(a) ? a.map(String) : ULr(a)]),
    );
    if (Array.isArray(t.enum) && (t.type === "integer" || t.type === "number")) t.type = "string";
    let r = t.properties;
    if (t.type === "object" && K_(r) && Array.isArray(t.required))
      t.required = t.required.filter((s) => typeof s === "string" && s in r);
    if (t.type === "array" && !OLr(t)) {
      if (((t.items = t.items ?? {}), K_(t.items) && !yla(t.items))) t.items = { ...t.items, type: "string" };
    }
    if (typeof t.type === "string" && t.type !== "object" && !OLr(t))
      (delete t.properties, delete t.required);
    return t;
  },
  Mla = (e) =>
    e.type === "object" &&
    (!K_(e.properties) || Object.keys(e.properties).length === 0) &&
    !e.additionalProperties,
  Q_e = (e) => {
    if (!K_(e)) return;
    if (Mla(e)) return;
    return Object.fromEntries(
      [
        ["description", e.description],
        ["required", e.required],
        ["format", e.format],
        ["type", Array.isArray(e.type) ? e.type.filter((t) => t !== "null")[0] : e.type],
        ["nullable", Array.isArray(e.type) && e.type.includes("null") ? !0 : void 0],
        ["enum", e.const !== void 0 ? [e.const] : e.enum],
        [
          "properties",
          K_(e.properties)
            ? Object.fromEntries(Object.entries(e.properties).map(([t, r]) => [t, Q_e(r)]))
            : void 0,
        ],
        ["items", Array.isArray(e.items) ? e.items.map(Q_e) : e.items === void 0 ? void 0 : Q_e(e.items)],
        ["allOf", Array.isArray(e.allOf) ? e.allOf.map(Q_e) : void 0],
        ["anyOf", Array.isArray(e.anyOf) ? e.anyOf.map(Q_e) : void 0],
        ["oneOf", Array.isArray(e.oneOf) ? e.oneOf.map(Q_e) : void 0],
        ["minLength", e.minLength],
      ].filter((t) => t[1] !== void 0),
    );
  },
  xla = (e) => Q_e(ULr(e));