
var EQe = (e) => GW(e),
  lKi = (e) => JSON.stringify(e) ?? "unknown",
  vPr,
  Wza = (e) => (vPr.test(e) ? e : JSON.stringify(e)),
  Vza = (e) =>
    e.type === "string" &&
    Array.isArray(e.enum) &&
    e.enum.length === 1 &&
    (e.enum[0] === "NaN" || e.enum[0] === "Infinity" || e.enum[0] === "-Infinity"),
  SPr = (e) => {
    let t = e.filter((r) => r !== "unknown");
    if (t.length === 0) return "unknown";
    if (t.length === 1) return t[0] ?? "unknown";
    return t.map((r) => (r.includes(" | ") ? `(${r})` : r)).join(" & ");
  },
  qza = 8,
  TPr = (e, t, r = new Set(), s = new Set()) => {
    if (s.has(e)) return !1;
    let a = new Set([...s, e]);
    if (e.$ref !== void 0) {
      let H = e.$ref.match(/^#\/(?:\$defs|definitions)\/([^/]+)$/)?.[1],
        u = H === void 0 ? void 0 : Wpe(H);
      if (u === void 0 || t[u] === void 0 || r.has(u)) return !0;
      if (TPr(t[u], t, new Set([...r, u]), a)) return !0;
    }
    return [
      ...(e.anyOf ?? []),
      ...(e.oneOf ?? []),
      ...(e.allOf ?? []),
      ...Object.values(e.properties ?? {}),
      ...(e.items === void 0 ? [] : [e.items]),
      ...(typeof e.additionalProperties === "object" ? [e.additionalProperties] : []),
    ].some((H) => TPr(H, t, r, a));
  },
  Gza = (e) => {
    let t = [];
    if (e.deprecated === !0) t.push("@deprecated");
    if (e.default !== void 0)
      try {
        let r = JSON.stringify(e.default);
        if (r !== void 0) t.push(`@default ${r}`);
      } catch {}
    if (typeof e.format === "string") t.push(`@format ${e.format}`);
    if (typeof e.minItems === "number") t.push(`@minItems ${e.minItems}`);
    if (typeof e.maxItems === "number") t.push(`@maxItems ${e.maxItems}`);
    return t;
  },
  Xza = (e, t, r) => {
    let s = [
      ...(e === void 0
        ? []
        : e.split(`
`)),
      ...t,
    ].map((H) => H.replaceAll("*/", "* /").replace(/\s+$/, ""));
    while (s.length > 0 && s[0].trim() === "") s.shift();
    while (s.length > 0 && s[s.length - 1].trim() === "") s.pop();
    if (s.length === 0) return "";
    if (s.length === 1)
      return `${r}/** ${s[0]} */
`;
    let a = s.map((H) => `${r} *${H === "" ? "" : ` ${H}`}`).join(`
`);
    return `${r}/**
${a}
${r} */
`;
  },
  $R = (e, t, r = 0, s = new Set()) => {
    if (r > qza) return "unknown";
    let a =
      e.definitions === void 0 && e.$defs === void 0
        ? t
        : { ...t, definitions: { ...t.definitions, ...(e.definitions ?? {}), ...(e.$defs ?? {}) } };
    if (e.$ref) {
      let u = e.$ref.match(/^#\/(?:\$defs|definitions)\/([^/]+)$/)?.[1],
        f = u === void 0 ? void 0 : Wpe(u);
      if (!f || !a.definitions[f] || s.has(f)) return "unknown";
      return SPr([$R(a.definitions[f], a, r, new Set([...s, f])), $R({ ...e, $ref: void 0 }, a, r + 1, s)]);
    }
    if (e.const !== void 0) return lKi(e.const);
    if (e.enum) return e.enum.map(lKi).join(" | ");
    let H = e.anyOf ?? e.oneOf;
    if (H) {
      if (H.some((f) => f.type === "number") && H.every((f) => f.type === "number" || Vza(f)))
        return "number";
      if (
        H.length === 2 &&
        H[0]?.type === "object" &&
        H[0].properties === void 0 &&
        H[1]?.type === "array" &&
        H[1].items === void 0
      )
        return "{}";
      let u = H.map((f) => $R(f, a, r + 1, s));
      if (u.some((f) => f === "unknown")) return "unknown";
      return SPr([u.join(" | "), $R({ ...e, anyOf: void 0, oneOf: void 0 }, a, r + 1, s)]);
    }
    if (e.allOf) {
      let u = e.allOf.map((f) => $R(f, a, r + 1, s));
      if (e.allOf.some((f) => TPr(f, a.definitions))) return "unknown";
      return SPr([$R({ ...e, allOf: void 0 }, a, r + 1, s), ...u]);
    }
    if (Array.isArray(e.type)) return e.type.map((u) => $R({ ...e, type: u }, a, r + 1, s)).join(" | ");
    if (e.type === "string") return "string";
    if (e.type === "number" || e.type === "integer") return "number";
    if (e.type === "boolean") return "boolean";
    if (e.type === "null") return "null";
    if (e.type === "array") return `Array<${$R(e.items ?? {}, a, r + 1, s)}>`;
    if (e.type === "object" || e.properties) {
      let u = new Set(e.required ?? []),
        f = Object.entries(e.properties ?? {}),
        d = e.additionalProperties,
        _ = d && typeof d === "object" ? $R(d, a, r + 1, s) : void 0,
        L = ([S, T]) => `${Wza(S)}${u.has(S) ? "" : "?"}: ${$R(T, a, r + 1, s)}`;
      if (!t.pretty) {
        let S = f.map(L);
        if (_ !== void 0) S.push(`[key: string]: ${_}`);
        return S.length === 0 ? "{}" : `{ ${S.join("; ")} }`;
      }
      if (f.length === 0 && _ === void 0) return "{}";
      let I = "  ".repeat(r + 1),
        D = f.map((S) => `${Xza(S[1].description, Gza(S[1]), I)}${I}${L(S)},`);
      if (_ !== void 0) D.push(`${I}[key: string]: ${_},`);
      return `{
${D.join(`
`)}
${"  ".repeat(r)}}`;
    }
    return "unknown";
  },
  fKi = (e, t = !1, r = !1) => {
    try {
      let s = t ? I1e(e) : e,
        a = lRe(s);
      return $R(a.schema, { definitions: a.definitions ?? {}, pretty: r });
    } catch {
      return "unknown";
    }
  },
  pKi = (e, t = !1) => {
    try {
      return $R(e, { definitions: { ...(e.definitions ?? {}), ...(e.$defs ?? {}) }, pretty: t });
    } catch {
      return "unknown";
    }
  },
  dKi = (e) => {
    try {
      let t = EQe(e.input)
          ? lRe(e.input)
          : { schema: e.input, definitions: { ...(e.input.definitions ?? {}), ...(e.input.$defs ?? {}) } },
        r = t.definitions ?? {},
        s = t.schema;
      if (s.$ref !== void 0) {
        let H = s.$ref.match(/^#\/(?:\$defs|definitions)\/([^/]+)$/)?.[1],
          u = H === void 0 ? void 0 : Wpe(H),
          f = u === void 0 ? void 0 : r[u];
        if (f === void 0) return [];
        s = f;
      }
      let a = new Set(s.required ?? []);
      return Object.entries(s.properties ?? {}).map(([H, u]) => ({
        name: H,
        description: typeof u.description === "string" ? u.description : void 0,
        required: a.has(H),
      }));
    } catch {
      return [];
    }
  },
  mKi = (e, t = !1) => (EQe(e.input) ? fKi(e.input, !1, t) : pKi(e.input, t)),
  _Ki = (e, t = !1) =>
    e.output === void 0 ? "unknown" : EQe(e.output) ? fKi(e.output, !0, t) : pKi(e.output, t),
  hKi = (e, t) => (EQe(e.input) ? E1(e.input)(t) : t),
  LKi = (e, t) => (e.output !== void 0 && EQe(e.output) ? E1(e.output)(t) : t);