
var bPr = (e) => Math.max(0, Math.round(e.length / 4)),
  KCt = "$codemode",
  Jza = 2000,
  Kza = 10,
  zza,
  jPr,
  Qza,
  Yza,
  Zza,
  PPr = (e) =>
    "tools" +
    e
      .split(".")
      .map((t) => (vPr.test(t) ? `.${t}` : `[${JSON.stringify(t)}]`))
      .join(""),
  DKi = 32,
  yx,
  Zce = (e) => gKi(e),
  yKi = (e) =>
    e.pipe(
      jf((t) => {
        if (d1(t)) return PS;
        let r = hI(t);
        return bn(r instanceof zee ? r : i$e("Tool execution failed", r));
      }),
    ),
  eQa,
  TT = (e) => eQa.has(e),
  DJ = (e, t, r = !1) => pwe(e, t, 0, new Set(), r),
  pwe = (e, t, r, s, a) => {
    if (r > DKi) throw new yx("InvalidDataValue", `${t} exceeds the maximum value depth of ${DKi}.`);
    if (
      e === null ||
      e === void 0 ||
      typeof e === "string" ||
      typeof e === "boolean" ||
      typeof e === "number"
    )
      return e;
    if (typeof e !== "object") throw new yx("InvalidDataValue", `${t} must contain data only.`);
    if (e instanceof Dx)
      throw new yx(
        "InvalidDataValue",
        `${t} contains an un-awaited Promise; await tool calls (e.g. \`const result = await tools.ns.tool(...)\`) before using their results.`,
      );
    if (a) {
      if (
        e instanceof wI ||
        e instanceof qy ||
        e instanceof Gy ||
        e instanceof ST ||
        e instanceof Z1 ||
        e instanceof Sg
      )
        return e;
      if (e instanceof Date) return new wI(e.getTime());
      if (e instanceof RegExp) return new qy(e.source, e.flags);
      if (e instanceof Map) {
        let f = new Gy();
        for (let [d, _] of e.entries()) f.map.set(pwe(d, t, r + 1, s, !0), pwe(_, t, r + 1, s, !0));
        return f;
      }
      if (e instanceof Set) {
        let f = new ST();
        for (let d of e.values()) f.set.add(pwe(d, t, r + 1, s, !0));
        return f;
      }
      if (e instanceof URL) return new Z1(new URL(e.href));
      if (e instanceof URLSearchParams) return new Sg(new URLSearchParams(e));
    }
    if (e instanceof wI) return Number.isFinite(e.time) ? new Date(e.time).toISOString() : null;
    if (e instanceof Date) return Number.isFinite(e.getTime()) ? e.toISOString() : null;
    if (e instanceof Z1) return e.url.href;
    if (e instanceof URL) return e.href;
    if (
      e instanceof qy ||
      e instanceof Gy ||
      e instanceof ST ||
      e instanceof Sg ||
      e instanceof RegExp ||
      e instanceof Map ||
      e instanceof Set ||
      e instanceof URLSearchParams
    )
      return Object.create(null);
    if (s.has(e)) throw new yx("InvalidDataValue", `${t} contains a circular value.`);
    if ((s.add(e), Array.isArray(e))) {
      let f = e.map((d) => pwe(d, t, r + 1, s, a));
      return (s.delete(e), f);
    }
    let H = Object.getPrototypeOf(e);
    if (H !== Object.prototype && H !== null)
      throw new yx("InvalidDataValue", `${t} must contain plain objects only.`);
    let u = Object.create(null);
    for (let [f, d] of Object.entries(e)) {
      if (TT(f)) throw new yx("InvalidDataValue", `${t} contains blocked property '${f}'.`);
      u[f] = pwe(d, t, r + 1, s, a);
    }
    return (s.delete(e), u);
  },
  Qee = (e, t = !1) => {
    if (e === void 0 && t) return null;
    if (typeof e === "number" && !Number.isFinite(e)) return null;
    if (Array.isArray(e)) return e.map((r) => Qee(r, t));
    if (e !== null && typeof e === "object" && !(e instanceof oO))
      return Object.fromEntries(Object.entries(e).map(([r, s]) => [r, Qee(s, t)]));
    return e;
  },
  MKi = (e, t = []) => {
    let r = [];
    for (let [s, a] of Object.entries(e)) {
      let H = [...t, s];
      if (Zce(a)) r.push({ path: H.join("."), definition: a });
      else if (typeof a !== "function") r.push(...MKi(a, H));
    }
    return r;
  },
  xKi = (e, t) => ({
    path: e,
    description: t.description,
    signature: `${PPr(e)}(input: ${mKi(t, !0)}): Promise<${_Ki(t, !0)}>`,
  }),
  tQa = (e) =>
    MKi(e).map(({ path: t, definition: r }) => ({ path: t, definition: r, description: xKi(t, r) })),
  rQa = (e) =>
    e
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length > 0 && t !== "*"),
  nQa = (e) => {
    let t = [e];
    if (e.endsWith("es") && e.length > 3) t.push(e.slice(0, -2));
    if (e.endsWith("s") && e.length > 2) t.push(e.slice(0, -1));
    return t;
  },
  SKi = (e) => ({
    _tag: "CodeModeTool",
    description: "Search available Code Mode tools",
    input: Qza,
    output: Zza,
    run: (t) =>
      jn(() => {
        let r = t,
          s = r.query ?? "",
          a = r.offset ?? 0,
          H = r.namespace === void 0 ? e : e.filter((S) => S.namespace === r.namespace),
          u = s.trim(),
          f = u.startsWith("tools.") ? u.slice(6) : u,
          d = f === "" ? void 0 : H.find((S) => S.description.path === f || PPr(S.description.path) === u),
          _ = rQa(s).map(nQa),
          L =
            d !== void 0
              ? [d]
              : H.map((S) => {
                  let T = S.description.path.toLowerCase(),
                    C = S.description.description.toLowerCase(),
                    O = _.reduce(
                      (B, V) =>
                        B +
                        (V.some((q) => T === q || T.endsWith(`.${q}`)) ? 20 : 0) +
                        (V.some((q) => T.includes(q)) ? 8 : 0) +
                        (V.some((q) => C.includes(q)) ? 4 : 0) +
                        (V.some((q) => S.searchText.includes(q)) ? 2 : 0),
                      0,
                    );
                  return { entry: S, score: O };
                })
                  .filter(({ score: S }) => _.length === 0 || S > 0)
                  .sort(
                    (S, T) =>
                      T.score - S.score || S.entry.description.path.localeCompare(T.entry.description.path),
                  )
                  .map(({ entry: S }) => S),
          I = L.slice(a, a + (r.limit ?? Kza)).map(({ description: S }) => ({ ...S, path: PPr(S.path) })),
          D = Math.max(0, L.length - a - I.length);
        return { items: I, remaining: D, next: D > 0 ? { offset: a + I.length } : null };
      }),
  }),
  iQa,
  JCt = (e) => {
    let t = e.description
        .split(
          `
`,
          1,
        )[0]
        .trim(),
      r = t.length > 120 ? t.slice(0, 119) + "..." : t;
    return r === "" ? `  - ${e.signature}` : `  - ${e.signature} // ${r}`;
  },
  sQa = (e, t, r) => ({
    description: r,
    namespace: e.split(".", 1)[0],
    searchText: [
      e,
      t.description,
      ...dKi(t).flatMap(({ name: s, description: a }) => (a === void 0 ? [s] : [s, a])),
    ]
      .join(
        `
`,
      )
      .toLowerCase(),
  }),
  oQa = (e) => {
    if (Object.hasOwn(e, KCt))
      throw Error(`Tool namespace '${KCt}' is reserved for CodeMode discovery tools.`);
  },
  aQa = (e, t = Jza) => {
    if (!Number.isSafeInteger(t) || t < 0)
      throw RangeError("discovery.catalogBudget must be a non-negative safe integer");
    let r = tQa(e),
      s = r.map(({ description: q }) => q),
      a = new Map();
    for (let q of s) {
      let [Z = q.path] = q.path.split("."),
        se = a.get(Z) ?? [];
      (se.push(q), a.set(Z, se));
    }
    let H = [...a].sort(([q], [Z]) => q.localeCompare(Z)),
      u = H.map(([q, Z]) => ({
        namespace: q,
        picked: new Set(),
        queue: [...Z].sort((se, ae) => bPr(JCt(se)) - bPr(JCt(ae)) || se.path.localeCompare(ae.path)),
      })),
      f = 0,
      d = u.filter((q) => q.queue.length > 0);
    while (d.length > 0) {
      let q = [];
      for (let Z of d) {
        let se = Z.queue[0],
          ae = bPr(JCt(se));
        if (f + ae > t) continue;
        if ((Z.queue.shift(), Z.picked.add(se), (f += ae), Z.queue.length > 0)) q.push(Z);
      }
      d = q;
    }
    let _ = new Map(u.map(({ namespace: q, picked: Z }) => [q, Z])),
      L = u.reduce((q, { picked: Z }) => q + Z.size, 0),
      I = L === s.length,
      D = s.length === 0,
      S = [
        D
          ? "This is a restricted JavaScript language for calling tools, not a general-purpose runtime."
          : I
            ? "This is a restricted JavaScript language for calling tools, not a general-purpose runtime. Inside the confined interpreter, `tools` contains the Code Mode tools listed below and internal runtime tools; surrounding agent tools are not available."
            : "This is a restricted JavaScript language for calling tools, not a general-purpose runtime. Inside the confined interpreter, `tools` contains the Code Mode tools listed or searchable below and internal runtime tools; surrounding agent tools are not available.",
        ...(D
          ? []
          : [
              "Do not infer or normalize tool names; use only exact signatures shown below or returned by search.",
            ]),
      ],
      T = D
        ? []
        : [
            "",
            "## Workflow",
            "",
            ...(I
              ? [
                  "1. Pick a tool from the list under `## Available tools` - each line is the exact call signature; use it as-is rather than guessing segments.",
                  "2. Call it using the exact signature shown: `const result = await tools.<namespace>.<tool>(input)`; bracket notation and quotes are part of the path.",
                  "3. Return only the fields you need from structured results; narrow unknown results before reading fields, and avoid returning large raw payloads.",
                ]
              : [
                  '1. If needed, discover tools: `return await tools.$codemode.search({ query: "<intent + key nouns>" })`.',
                  "2. In the next execution, copy a returned path exactly, call it, and return only the needed fields.",
                ]),
          ],
      C = D
        ? []
        : [
            "",
            "## Rules",
            "",
            I
              ? "- Only Code Mode tools listed here and internal runtime tools are available; surrounding agent tools are not implicitly exposed."
              : "- Only Code Mode tools listed here or returned by `tools.$codemode.search` and internal runtime tools are available; surrounding agent tools are not implicitly exposed.",
            "- Filter, aggregate, and transform collections in code - never return them raw or call a tool per item across messages.",
            "- A result typed `Promise<unknown>` may be structured data or text. Before reading fields, check that it is a non-null object and not an array; otherwise handle the returned text or primitive directly.",
            '- Run independent calls in parallel: `await Promise.all(items.map((item) => tools.<namespace>.<tool>(item)))`, or use `tools.<namespace>["tool-name"](item)` when the listed signature uses bracket notation.',
            "- `Object.keys(tools)` lists namespaces; `Object.keys(tools.<namespace>)` lists its tools; `for...in` works on both.",
            ...(I
              ? []
              : [
                  '- Browse one namespace: `await tools.$codemode.search({ query: "", namespace: "<name>" })`.',
                  "- If search returns `next`, repeat the same search with `offset: next.offset`.",
                ]),
          ],
      O = [
        "",
        "## Language",
        "",
        "Use common JavaScript data operations, functions, control flow, selected standard-library methods, and awaited tool calls. Built-ins include Date, RegExp, Map, Set, URL, URLSearchParams, and URI encoding helpers.",
        "Modules/imports, classes, generators, timers, fetch, eval, prototype access, unlisted methods, and promise chaining are unavailable. Use Code Mode tools for external operations. Use await with try/catch.",
        "Dates and URLs serialize to strings at data boundaries; Map/Set/RegExp/URLSearchParams serialize to `{}`.",
      ],
      B = [""];
    if (D) B.push("## Available tools", "", "No tools are currently available.");
    else {
      B.push(
        I
          ? "## Available tools (COMPLETE list - every tool is shown below with its full call signature)"
          : `## Available tools (PARTIAL - ${L} of ${s.length} shown; find the rest with tools.$codemode.search)`,
        "",
      );
      for (let [q, Z] of H) {
        let se = _.get(q),
          ae = `${Z.length} tool${Z.length === 1 ? "" : "s"}`,
          z = se.size === Z.length ? ae : se.size === 0 ? `${ae}, none shown` : `${ae}, ${se.size} shown`;
        B.push(`- ${q} (${z})`);
        for (let Ae of Z) if (se.has(Ae)) B.push(JCt(Ae));
      }
      if (!I) B.push("", "Search returns complete callable signatures:", `- ${iQa.signature}`);
    }
    let V = [...S, ...T, ...C, ...O, ...B];
    return {
      catalog: s,
      instructions: V.join(`
`),
      searchIndex: r.map(({ path: q, definition: Z, description: se }) => sQa(q, Z, se)),
    };
  },
  HQa = (e, t) => {
    let r = e;
    for (let s of t) {
      if (TT(s) || typeof r === "function" || Zce(r) || !Object.hasOwn(r, s))
        throw new yx("UnknownTool", `Unknown tool namespace '${t.join(".")}'.`, [
          "Object.keys(tools) lists the available namespaces; tools.$codemode.search({ query }) finds described tools.",
        ]);
      r = r[s];
    }
    if (typeof r === "function" || Zce(r)) return [];
    return Object.keys(r);
  },
  cQa = (e, t) => {
    let r = e;
    for (let s of t) {
      if (TT(s) || typeof r === "function" || Zce(r) || !Object.hasOwn(r, s))
        throw new yx("UnknownTool", `Unknown tool '${t.join(".")}'.`, [
          "Use tools.$codemode.search({ query }) to find available described tools.",
        ]);
      r = r[s];
    }
    if (typeof r !== "function" && !Zce(r))
      throw new yx("UnknownTool", `Tool '${t.join(".")}' is not callable.`);
    return r;
  },
  AQa = (e, t, r, s) => {
    let a = [],
      H = { ...e, [KCt]: { search: SKi(r) } },
      u = (_, L) => {
        let I = s?.onToolCallEnd;
        if (I === void 0) return _;
        let D = Date.now();
        return _.pipe(
          DE(() => I({ ...L, durationMs: Date.now() - D, outcome: "success" })),
          kye((S) => {
            let T = S instanceof zee || S instanceof yx ? S.message : "Tool execution failed";
            return I({ ...L, durationMs: Date.now() - D, outcome: "failure", message: T });
          }),
        );
      },
      f = (_, L) =>
        ZA({
          try: () => DJ(_, `Result from tool '${L}'`),
          catch: () => new yx("InvalidToolOutput", `Invalid output from tool '${L}'.`),
        }),
      d = (_) => {
        if (t !== void 0 && a.length >= t)
          throw new yx("ToolCallLimitExceeded", `Execution exceeded its tool-call limit of ${t}.`);
        a.push(_);
      };
    return {
      root: new oO([]),
      calls: a,
      keys: (_) => HQa(H, _),
      invoke: (_, L) =>
        ft(function* () {
          let I = _.join("."),
            D = L.map((Z) => Qee(DJ(Z, `Arguments for tool '${I}'`))),
            S = { name: I },
            T = (Z) =>
              jn(() => (d(S), a.length - 1)).pipe(
                DE((se) => s?.onToolCallStart?.({ index: se, name: I, input: Z }) ?? ti),
              ),
            C = cQa(H, _),
            O;
          if (Zce(C)) {
            if (D.length !== 1)
              throw new yx("InvalidToolInput", `Tool '${I}' expects exactly one input object.`);
            O = yield* ZA({
              try: () => hKi(C, D[0]),
              catch: (Z) => new yx("InvalidToolInput", `Invalid input for tool '${I}': ${String(Z)}`),
            });
          }
          let B = Zce(C) ? O : D,
            q = { index: yield* T(B), name: I, input: B };
          if (Zce(C))
            return yield* u(
              ft(function* () {
                let Z = yield* yKi(yH(() => C.run(O))),
                  se = yield* ZA({
                    try: () => LKi(C, Z),
                    catch: () => new yx("InvalidToolOutput", `Invalid output from tool '${I}'.`),
                  });
                return yield* f(se, I);
              }),
              q,
            );
          return yield* u(
            ft(function* () {
              return yield* f(yield* yKi(yH(() => C(...D))), I);
            }),
            q,
          );
        }),
    };
  };