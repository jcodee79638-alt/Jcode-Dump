
var MJ,
  dQa = (e) => {
    let t = MJ.transpileModule(
        `async function __codemode__() {
${e}
}`,
        {
          reportDiagnostics: !0,
          compilerOptions: { target: MJ.ScriptTarget.ESNext, module: MJ.ModuleKind.ESNext },
        },
      ),
      r = t.diagnostics?.find((f) => f.category === MJ.DiagnosticCategory.Error);
    if (r)
      throw new is(
        `Failed to parse TypeScript: ${MJ.flattenDiagnosticMessageText(
          r.messageText,
          `
`,
        )}`,
        void 0,
        "ParseError",
      );
    let s = t.outputText.indexOf("{") + 1,
      a = t.outputText.lastIndexOf("}"),
      H = t.outputText.slice(s, a),
      u = bJi(H, {
        ecmaVersion: "latest",
        sourceType: "script",
        allowReturnOutsideFunction: !0,
        allowAwaitOutsideFunction: !0,
        locations: !0,
      });
    if (!mwe(u) || u.type !== "Program" || !Array.isArray(u.body))
      throw new is("Failed to parse script as a Program node.");
    return u;
  },
  rwt = (e) => e.replace(/\/(?:Users|home|private|tmp|var\/folders)\/[^\s"'`]+/g, "<redacted-path>"),
  OPr = (e) => {
    if (e instanceof is)
      return {
        kind: e.kind,
        message: `${e.message}${TKi(e.node)}`,
        ...(e.node?.loc ? { location: wPr(e.node) } : {}),
        ...(e.suggestions ? { suggestions: e.suggestions } : {}),
      };
    if (e instanceof yx)
      return {
        kind: e.kind,
        message: e.message,
        ...(e.suggestions.length > 0 ? { suggestions: e.suggestions } : {}),
      };
    if (e instanceof zee) return { kind: "ToolFailure", message: rwt(e.message) };
    if (e instanceof dwe) {
      let t = e.value,
        r;
      if (nwt(t)) r = "a non-data value";
      else if (typeof t === "string") r = t;
      else if (t !== null && typeof t === "object" && typeof t.message === "string") r = t.message;
      else
        try {
          r = JSON.stringify(Qee(t)) ?? String(t);
        } catch {
          r = String(t);
        }
      return { kind: "ExecutionFailure", message: `Uncaught: ${r}` };
    }
    if (e instanceof RangeError && /call stack|recursion/i.test(e.message))
      return { kind: "ExecutionFailure", message: "Execution exceeded the maximum nesting depth." };
    if (e instanceof Error)
      return { kind: e.name === "SyntaxError" ? "ParseError" : "ExecutionFailure", message: rwt(e.message) };
    return { kind: "ExecutionFailure", message: rwt(String(e)) };
  },
  Izi = (e) => {
    if (e instanceof dwe) return e.value;
    if (e instanceof is) return yQe(e.errorName, e.message);
    let t = e instanceof Error && QCt.has(e.name) ? e.name : "Error";
    return yQe(t, OPr(e).message);
  },
  tAe = (e) =>
    e instanceof A9 ||
    e instanceof oO ||
    e instanceof OP ||
    e instanceof Db ||
    e instanceof yJ ||
    e instanceof s$e ||
    e instanceof eAe ||
    e instanceof Dx ||
    e instanceof yb ||
    e instanceof aO ||
    e instanceof o$e ||
    sO(e),
  nwt = (e, t = new Set()) => {
    if (tAe(e)) return !0;
    if (e === null || typeof e !== "object") return !1;
    if (t.has(e)) return !1;
    t.add(e);
    let r = Array.isArray(e) ? e.some((s) => nwt(s, t)) : Object.values(e).some((s) => nwt(s, t));
    return (t.delete(e), r);
  },
  rAe = (e, t = new Set()) => {
    if (sO(e)) return !1;
    if (tAe(e)) return !0;
    if (e === null || typeof e !== "object") return !1;
    if (t.has(e)) return !1;
    t.add(e);
    let r = Array.isArray(e) ? e.some((s) => rAe(s, t)) : Object.values(e).some((s) => rAe(s, t));
    return (t.delete(e), r);
  },
  yzi = (e) => {
    if (
      e instanceof A9 ||
      e instanceof yb ||
      e instanceof OP ||
      e instanceof yJ ||
      e instanceof eAe ||
      e instanceof s$e ||
      e instanceof o$e
    )
      return "function";
    if (e instanceof aO) return "function";
    if (e instanceof oO) return e.path.length > 0 ? "function" : "object";
    if (e instanceof Db)
      return e.name === "Math" || e.name === "JSON" || e.name === "console" ? "object" : "function";
    return typeof e;
  },
  mQa = (e, t, r) => {
    if (t instanceof o$e) {
      let s = NKi(e);
      return s !== void 0 && (t.name === "Error" || s === t.name);
    }
    if (t instanceof Db)
      switch (t.name) {
        case "Date":
          return e instanceof wI;
        case "RegExp":
          return e instanceof qy;
        case "Map":
          return e instanceof Gy;
        case "Set":
          return e instanceof ST;
        case "URL":
          return e instanceof Z1;
        case "URLSearchParams":
          return e instanceof Sg;
        case "Array":
          return Array.isArray(e);
        case "Object":
          return e !== null && (typeof e === "object" || yzi(e) === "function");
      }
    if (t instanceof s$e) return e instanceof Dx;
    if (t instanceof yb && (t.name === "Number" || t.name === "String" || t.name === "Boolean")) return !1;
    throw new is(
      "The right-hand side of 'instanceof' must be a constructor CodeMode knows: Error (or a specific error type like TypeError), Date, RegExp, Map, Set, URL, URLSearchParams, Array, Object, or Promise.",
      r,
    );
  },
  _Qa = (e, t, r, s) => {
    let a = (_) => {
        let L = r[_];
        if (typeof L !== "string") throw new is(`String.${t} expects argument ${_ + 1} to be a string.`, s);
        return L;
      },
      H = (_) => {
        let L = r[_];
        if (typeof L !== "number") throw new is(`String.${t} expects argument ${_ + 1} to be a number.`, s);
        return L;
      },
      u = (_) => (r[_] === void 0 ? void 0 : H(_)),
      f = (_) => (r[_] === void 0 ? void 0 : a(_)),
      d;
    switch (t) {
      case "toLowerCase":
        d = e.toLowerCase();
        break;
      case "toUpperCase":
        d = e.toUpperCase();
        break;
      case "trim":
        d = e.trim();
        break;
      case "trimStart":
      case "trimLeft":
        d = e.trimStart();
        break;
      case "trimEnd":
      case "trimRight":
        d = e.trimEnd();
        break;
      case "localeCompare":
        d = e.localeCompare(a(0));
        break;
      case "normalize": {
        let _ = f(0);
        try {
          d = e.normalize(_);
        } catch {
          throw new is(
            `String.normalize expects the form "NFC", "NFD", "NFKC", or "NFKD" (got ${JSON.stringify(_)}).`,
            s,
          ).as("RangeError");
        }
        break;
      }
      case "split": {
        if (r.length === 0) {
          d = [e];
          break;
        }
        if (r[0] instanceof qy) {
          d = e.split(r[0].regex, u(1));
          break;
        }
        let _ = u(1);
        d = e.split(a(0), _ === void 0 ? void 0 : _ >>> 0);
        break;
      }
      case "slice":
        d = e.slice(u(0), u(1));
        break;
      case "includes":
        d = e.includes(a(0), u(1));
        break;
      case "startsWith":
        d = e.startsWith(a(0), u(1));
        break;
      case "endsWith":
        d = e.endsWith(a(0), u(1));
        break;
      case "indexOf":
        d = e.indexOf(a(0), u(1));
        break;
      case "lastIndexOf":
        d = e.lastIndexOf(a(0), u(1));
        break;
      case "replace":
      case "replaceAll": {
        if (r[0] instanceof qy) {
          let _ = r[0].regex,
            L = a(1);
          if (t === "replaceAll" && !_.global)
            throw new is(
              `String.replaceAll requires a regular expression with the global (g) flag: write /${_.source}/${_.flags}g, or use String.replace to replace only the first match.`,
              s,
            );
          d = t === "replace" ? e.replace(_, L) : e.replaceAll(_, L);
          break;
        }
        if (t === "replace") {
          d = e.replace(a(0), a(1));
          break;
        }
        d = e.replaceAll(a(0), a(1));
        break;
      }
      case "match": {
        let _ = ZCt(r[0], t, s),
          L = e.match(_);
        if (L === null) return null;
        if (_.global) return q$(L, "String.match result");
        return ewt(L);
      }
      case "matchAll": {
        let _ = ZCt(r[0], t, s, "g");
        if (!_.global)
          throw new is(
            `String.matchAll requires a regular expression with the global (g) flag: write /${_.source}/${_.flags}g, or use String.match for a single match.`,
            s,
          );
        return Array.from(e.matchAll(_), ewt);
      }
      case "search": {
        d = e.search(ZCt(r[0], t, s));
        break;
      }
      case "repeat": {
        let _ = H(0);
        if (!Number.isFinite(_) || _ < 0)
          throw new is("String.repeat expects a finite non-negative count.", s);
        d = e.repeat(_);
        break;
      }
      case "padStart":
        d = e.padStart(H(0), f(1));
        break;
      case "padEnd":
        d = e.padEnd(H(0), f(1));
        break;
      case "charAt":
        d = e.charAt(u(0) ?? 0);
        break;
      case "at":
        d = e.at(u(0) ?? 0);
        break;
      case "substring":
        d = e.substring(u(0) ?? 0, u(1));
        break;
      case "substr":
        d = e.substr(u(0) ?? 0, u(1));
        break;
      case "charCodeAt":
        d = e.charCodeAt(u(0) ?? 0);
        break;
      case "codePointAt":
        d = e.codePointAt(u(0) ?? 0);
        break;
      case "toString":
        d = e;
        break;
      case "concat": {
        d = e.concat(...r.map((_, L) => a(L)));
        break;
      }
      default:
        throw new is(`String method '${t}' is not available in CodeMode.`, s);
    }
    return q$(d, `String.${t} result`);
  },
  hQa = (e, t, r) => {
    switch (e) {
      case "isArray":
        return Array.isArray(t[0]);
      case "of":
        return [...t];
      case "from": {
        if (t.length > 1)
          throw new is(
            "Array.from(...) does not support a map function in CodeMode; call .map() on the result instead.",
            r,
            "UnsupportedSyntax",
            [Zee],
          );
        if (t[0] instanceof Gy) return Array.from(t[0].map.entries(), ([a, H]) => [a, H]);
        if (t[0] instanceof ST) return Array.from(t[0].set.values());
        if (t[0] instanceof Sg) return Array.from(t[0].params.entries(), ([a, H]) => [a, H]);
        let s = q$(t[0], "Array.from input");
        if (typeof s === "string") return Array.from(s);
        if (Array.isArray(s)) return [...s];
        if (s !== null && typeof s === "object" && typeof s.length === "number") return Array.from(s);
        throw new is("Array.from expects an array, string, Map, Set, or array-like value.", r);
      }
      default:
        throw new is(`Array.${e} is not available in CodeMode.`, r);
    }
  },
  LQa = (e, t, r) => {
    if (e.namespace === "console") throw new is(`console.${e.name} is not available in CodeMode.`, r);
    if (e.namespace === "Object") return rzi(e.name, t, r);
    if (e.namespace === "Math") return JKi(e.name, t, r);
    if (e.namespace === "Array") return hQa(e.name, t, r);
    if (e.namespace === "Number") return ezi(e.name, t, r);
    if (e.namespace === "String") return pzi(e.name, t, r);
    if (e.namespace === "URL") return $zi(e.name, t, r);
    if (e.namespace === "Date") {
      if (!BKi.has(e.name)) throw new is(`Date.${e.name} is not available in CodeMode.`, r);
      return RKi(e.name, t, r);
    }
    if (
      e.namespace === "RegExp" ||
      e.namespace === "Map" ||
      e.namespace === "Set" ||
      e.namespace === "URLSearchParams"
    )
      throw new is(`${e.namespace}.${e.name} is not available in CodeMode.`, r);
    return qKi(e.name, t, r);
  },
  xQe = (e, t = []) => {
    switch (e.type) {
      case "Identifier":
        t.push(A0(e, "name"));
        break;
      case "AssignmentPattern":
        xQe(_u(e, "left"), t);
        break;
      case "RestElement":
        xQe(_u(e, "argument"), t);
        break;
      case "ArrayPattern":
        for (let r of vT(e, "elements")) if (r !== null) xQe(eM(r, "elements"), t);
        break;
      case "ObjectPattern":
        for (let r of vT(e, "properties")) {
          let s = eM(r, "properties");
          xQe(s.type === "RestElement" ? _u(s, "argument") : _u(s, "value"), t);
        }
        break;
    }
    return t;
  },
  xzi = (e, t, r) => {
    let s = {
        ...(e.onToolCallStart === void 0 ? {} : { onToolCallStart: e.onToolCallStart }),
        ...(e.onToolCallEnd === void 0 ? {} : { onToolCallEnd: e.onToolCallEnd }),
      },
      a = AQa(e.tools ?? {}, t.maxToolCalls, r, s),
      H = [],
      u = () => (H.length > 0 ? { logs: [...H] } : {});
    if (e.code.trim().length === 0)
      return Jt({
        ok: !1,
        error: { kind: "ParseError", message: "Code cannot be empty." },
        toolCalls: a.calls,
      });
    return ft(function* () {
      let d = dQa(e.code),
        L = yield* new Mzi(a.invoke, a.keys, H).run(d);
      return { ok: !0, value: Qee(DJ(L, "Execution result"), !0), ...u(), toolCalls: a.calls };
    })
      .pipe((d) => {
        let _ = t.timeoutMs;
        if (_ === void 0) return d;
        return d.pipe(
          Tj({
            duration: _,
            orElse: () =>
              Jt({
                ok: !1,
                error: { kind: "TimeoutExceeded", message: `Execution timed out after ${_}ms.` },
                ...u(),
                toolCalls: a.calls,
              }),
          }),
        );
      })
      .pipe(
        jf((d) => (d1(d) ? PS : Jt({ ok: !1, error: OPr(hI(d)), ...u(), toolCalls: a.calls }))),
        Vn((d) => (t.maxOutputBytes === void 0 ? d : gQa(d, t.maxOutputBytes))),
      );
  },
  Dzi = (e) => new TextEncoder().encode(e).byteLength,
  $Qa = (e, t) => {
    let r = new TextEncoder().encode(e);
    if (r.byteLength <= t) return e;
    let s = new TextDecoder("utf-8").decode(r.slice(0, Math.max(0, t)));
    return s.endsWith("\uFFFD") ? s.slice(0, -1) : s;
  },
  gQa = (e, t) => {
    let r = !1,
      s = null,
      a = 0;
    if (e.ok) {
      let L = JSON.stringify(e.value) ?? "null",
        I = Dzi(L);
      if (I > t)
        ((r = !0),
          (s = `${$Qa(L, t)} [result truncated: ${I} bytes exceeds the ${t}-byte output limit; return a smaller value]`),
          (a = t));
      else ((s = e.value), (a = I));
    }
    let H = e.logs ?? [],
      u = [],
      f = Math.max(0, t - a),
      d = 0;
    for (let L of H) {
      let I = Dzi(L) + 1;
      if (d + I > f) break;
      ((d += I), u.push(L));
    }
    if (u.length < H.length) ((r = !0), u.push(`[logs truncated: showing ${u.length} of ${H.length} lines]`));
    if (!r) return e;
    let _ = u.length > 0 ? { logs: u } : {};
    return e.ok
      ? { ok: !0, value: s, ..._, truncated: !0, toolCalls: e.toolCalls }
      : { ok: !1, error: e.error, ..._, truncated: !0, toolCalls: e.toolCalls };
  };