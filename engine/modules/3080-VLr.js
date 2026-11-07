
var VLr = ne(() => {
  Gt();
  kse();
  UG();
  gY();
  OMe();
  FMe();
  GS();
  FG();
  HWe();
  qqe();
  BMt();
  Gqe();
  VLr();
  ((zae = nt({ type: Vc("ephemeral"), ttl: be(Jo(["5m", "1h"])) })),
    (Xqe = nt({ type: Vc("text"), text: re, cache_control: be(zae) })),
    (BIi = nt({
      type: Vc("image"),
      source: nt({ type: Vc("base64"), media_type: re, data: re }),
      cache_control: be(zae),
    })),
    (Ola = nt({ type: Vc("thinking"), thinking: re, signature: be(re), cache_control: be(zae) })),
    (Ula = nt({ type: Vc("tool_use"), id: re, name: re, input: PH, cache_control: be(zae) })),
    (Nla = nt({ type: Vc("server_tool_use"), id: re, name: re, input: PH, cache_control: be(zae) })),
    (Fla = Jo(["web_search_tool_result", "code_execution_tool_result", "web_fetch_tool_result"])),
    (Bla = nt({ type: Fla, tool_use_id: re, content: PH, cache_control: be(zae) })),
    (Rla = Io([Xqe, BIi])),
    (Wla = nt({
      type: Vc("tool_result"),
      tool_use_id: re,
      content: Io([re, On(Rla)]),
      is_error: be(Vi),
      cache_control: be(zae),
    })),
    (Vla = Io([Xqe, BIi, Wla])),
    (qla = Io([Xqe, Ola, Ula, Nla, Bla])),
    (Gla = Io([
      nt({ role: ri("user"), content: On(Vla) }),
      nt({ role: ri("assistant"), content: On(qla) }),
      nt({ role: ri("system"), content: On(Xqe) }),
    ]).pipe(_D("role"))),
    (Xla = nt({ name: re, description: re, input_schema: CMe, cache_control: be(zae) })),
    (Jla = Io([nt({ type: Jo(["auto", "any"]) }), nt({ type: Vc("tool"), name: re })])),
    (Kla = nt({ type: Vc("enabled"), budget_tokens: Aa })),
    (zla = {
      model: re,
      system: hV(Xqe),
      messages: On(Gla),
      tools: hV(Xla),
      tool_choice: be(Jla),
      stream: ri(!0),
      max_tokens: Aa,
      temperature: be(Aa),
      top_p: be(Aa),
      top_k: be(Aa),
      stop_sequences: hV(re),
      thinking: be(Kla),
    }),
    (Qla = nt(zla)),
    (NIi = nt({
      input_tokens: be(Aa),
      output_tokens: be(Aa),
      cache_creation_input_tokens: AL(Aa),
      cache_read_input_tokens: AL(Aa),
    })),
    (Yla = nt({
      type: re,
      id: be(re),
      name: be(re),
      text: be(re),
      thinking: be(re),
      signature: be(re),
      input: be(PH),
      tool_use_id: be(re),
      content: be(PH),
    })),
    (Zla = nt({
      type: be(re),
      text: be(re),
      thinking: be(re),
      partial_json: be(re),
      signature: be(re),
      stop_reason: AL(re),
      stop_sequence: AL(re),
    })),
    (efa = nt({
      type: re,
      index: be(Aa),
      message: be(nt({ usage: be(NIi) })),
      content_block: be(Yla),
      delta: be(Zla),
      usage: be(NIi),
      error: be(nt({ type: be(re), message: be(re) })),
    })),
    (VMt = XS),
    (tfa = { type: "ephemeral" }),
    (rfa = { type: "ephemeral", ttl: "1h" }),
    (cfa = Ge("AnthropicMessages.lowerServerToolResult")(function* (e) {
      let t = Hfa(e.name);
      if (!t)
        return yield* VMt(
          `Anthropic Messages does not know how to round-trip server tool result for ${e.name}`,
        );
      return { type: t, tool_use_id: e.id, content: e.result.value };
    })),
    (Afa = Ge("AnthropicMessages.lowerImage")(function* (e) {
      let t = yield* v_t("Anthropic Messages", e, new Set(wMe));
      return { type: "image", source: { type: "base64", media_type: t.mime, data: t.base64 } };
    })),
    (ufa = Ge("AnthropicMessages.lowerToolResultContentItem")(function* (e) {
      if (e.type === "text") return { type: "text", text: e.text };
      let t = yield* DIn("Anthropic Messages", e, new Set(wMe));
      return { type: "image", source: { type: "base64", media_type: t.mime, data: t.base64 } };
    })),
    (lfa = Ge("AnthropicMessages.lowerToolResultContent")(function* (e) {
      if (e.result.type !== "content") return qnr(e);
      let t = e.result.value;
      return yield* ja(t, ufa);
    })),
    (_fa = Ge("AnthropicMessages.lowerNativeSystemUpdate")(function* (e, t) {
      return {
        role: "system",
        content: (yield* EIn("Anthropic Messages", e)).map((s) => ({
          type: "text",
          text: s.text,
          cache_control: Y_e(t, s.cache),
        })),
      };
    })),
    (hfa = Ge("AnthropicMessages.lowerMessages")(function* (e, t) {
      let r = [];
      for (let [s, a] of e.messages.entries()) {
        if (a.role === "system") {
          if (mfa(e.messages, s))
            return yield* VMt(
              "Anthropic Messages system updates cannot split a local tool call from its tool result",
            );
          if (ffa(e) && dfa(e.messages, s)) {
            r.push(yield* _fa(a, t));
            continue;
          }
          let u = yield* Vnr("Anthropic Messages", a),
            f = { type: "text", text: u.text, cache_control: Y_e(t, u.cache) },
            d = r.at(-1);
          if (d?.role === "user") r[r.length - 1] = { role: "user", content: [...d.content, f] };
          else r.push({ role: "user", content: [f] });
          continue;
        }
        if (a.role === "user") {
          let u = [];
          for (let f of a.content) {
            if (f.type === "text") {
              u.push({ type: "text", text: f.text, cache_control: Y_e(t, f.cache) });
              continue;
            }
            if (f.type === "media") {
              u.push(yield* Afa(f));
              continue;
            }
            return yield* $Y("Anthropic Messages", "user", ["text", "media"]);
          }
          r.push({ role: "user", content: u });
          continue;
        }
        if (a.role === "assistant") {
          let u = [];
          for (let f of a.content) {
            if (f.type === "text") {
              u.push({ type: "text", text: f.text, cache_control: Y_e(t, f.cache) });
              continue;
            }
            if (f.type === "reasoning") {
              u.push({
                type: "thinking",
                thinking: f.text,
                signature: f.encrypted ?? nfa(f.providerMetadata),
              });
              continue;
            }
            if (f.type === "tool-call") {
              u.push(f.providerExecuted ? afa(f) : ofa(f));
              continue;
            }
            if (f.type === "tool-result" && f.providerExecuted) {
              u.push(yield* cfa(f));
              continue;
            }
            return yield* VMt(
              "Anthropic Messages assistant messages only support text, reasoning, and tool-call content for now",
            );
          }
          r.push({ role: "assistant", content: u });
          continue;
        }
        let H = [];
        for (let u of a.content) {
          if (!aWe(u, ["tool-result"])) return yield* $Y("Anthropic Messages", "tool", ["tool-result"]);
          H.push({
            type: "tool_result",
            tool_use_id: u.id,
            content: yield* lfa(u),
            is_error: u.result.type === "error" ? !0 : void 0,
            cache_control: Y_e(t, u.cache),
          });
        }
        r.push({ role: "user", content: H });
      }
      return r;
    })),
    ($fa = Ge("AnthropicMessages.lowerThinking")(function* (e) {
      let t = Lfa(e)?.thinking;
      if (!K_(t) || t.type !== "enabled") return;
      let r =
        typeof t.budgetTokens === "number"
          ? t.budgetTokens
          : typeof t.budget_tokens === "number"
            ? t.budget_tokens
            : void 0;
      if (r === void 0) return yield* VMt("Anthropic thinking provider option requires budgetTokens");
      return { type: "enabled", budget_tokens: r };
    })),
    (gfa = Ge("AnthropicMessages.fromRequest")(function* (e) {
      let t = e.toolChoice ? yield* sfa(e.toolChoice) : void 0,
        r = e.generation,
        s = e.model.compatibility?.toolSchema,
        a = e.model.defaults?.limits?.output ?? e.model.route.defaults.limits?.output ?? 4096,
        H = SIi(FIi),
        u =
          e.tools.length === 0 || e.toolChoice?.type === "none"
            ? void 0
            : e.tools.map((_) => ifa(H, _, Kae.modelCompatibility(_.inputSchema, s))),
        f =
          e.system.length === 0
            ? void 0
            : e.system.map((_) => ({ type: "text", text: _.text, cache_control: Y_e(H, _.cache) })),
        d = yield* hfa(e, H);
      if (H.dropped > 0)
        yield* lp(
          `Anthropic Messages: dropped ${H.dropped} cache breakpoint(s); the API allows at most ${FIi} per request.`,
        );
      return {
        model: e.model.id,
        system: f,
        messages: d,
        tools: u,
        tool_choice: t,
        stream: !0,
        max_tokens: r?.maxTokens ?? a,
        temperature: r?.temperature,
        top_p: r?.topP,
        top_k: r?.topK,
        stop_sequences: r?.stop,
        thinking: yield* $fa(e),
      };
    })),
    (VIi = {
      web_search_tool_result: "web_search",
      code_execution_tool_result: "code_execution",
      web_fetch_tool_result: "web_fetch",
    }),
    (Z_e = []),
    (xfa = Ge("AnthropicMessages.onContentBlockDelta")(function* (e, t) {
      let r = t.delta;
      if (r?.type === "text_delta" && r.text) {
        let s = [];
        return [{ ...e, lifecycle: wMt(e.lifecycle, s, `text-${t.index ?? 0}`, r.text) }, s];
      }
      if (r?.type === "thinking_delta" && r.thinking) {
        let s = [];
        return [{ ...e, lifecycle: OMt(e.lifecycle, s, `reasoning-${t.index ?? 0}`, r.thinking) }, s];
      }
      if (r?.type === "signature_delta" && r.signature) {
        let s = [];
        return [
          {
            ...e,
            lifecycle: Jae(e.lifecycle, s, `reasoning-${t.index ?? 0}`, WLr({ signature: r.signature })),
          },
          s,
        ];
      }
      if (r?.type === "input_json_delta" && t.index !== void 0) {
        if (!r.partial_json) return [e, Z_e];
        let s = OIi(
          qMt,
          e.tools,
          t.index,
          r.partial_json,
          "Anthropic Messages tool argument delta is missing its tool call",
        );
        if (BLr(s)) return yield* s;
        let a = [],
          H = s.events.length ? fP(e.lifecycle, a) : e.lifecycle;
        return (a.push(...s.events), [{ ...e, lifecycle: H, tools: s.tools }, a]);
      }
      return [e, Z_e];
    })),
    (Sfa = Ge("AnthropicMessages.onContentBlockStop")(function* (e, t) {
      if (t.index === void 0) return [e, Z_e];
      let r = yield* UIi(qMt, e.tools, t.index),
        s = [],
        a = r.events ?? [],
        H = a.length
          ? fP(e.lifecycle, s)
          : Jae(Ela(e.lifecycle, s, `text-${t.index}`), s, `reasoning-${t.index}`);
      return (s.push(...a), [{ ...e, lifecycle: H, tools: r.tools }, s]);
    })),
    (Pfa = nir({
      id: qMt,
      body: { schema: Qla, from: gfa },
      stream: { event: iir(efa), initial: () => ({ tools: RMt(), lifecycle: wLr() }), step: jfa },
    })),
    (qIi = RG.make({
      id: qMt,
      provider: "anthropic",
      protocol: Pfa,
      endpoint: b_t(kla, { baseURL: wla }),
      auth: Pse,
      framing: znr,
      headers: () => ({ "anthropic-version": "2023-06-01" }),
    })));
});