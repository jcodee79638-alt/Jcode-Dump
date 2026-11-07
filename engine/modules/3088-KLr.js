
var KLr = ne(() => {
  Gt();
  kse();
  UG();
  gY();
  Bde();
  FMe();
  GS();
  FG();
  HWe();
  XMt();
  qqe();
  BMt();
  Gqe();
  KLr();
  ((iDi = nt({ type: Vc("input_text"), text: re })),
    (sDi = nt({ type: Vc("input_image"), image_url: re })),
    (jpa = Io([iDi, sDi])),
    (Ppa = nt({ type: Vc("output_text"), text: re })),
    (Cpa = nt({ type: Vc("summary_text"), text: re })),
    (wpa = nt({ type: Vc("reasoning"), id: nw(re), summary: On(Cpa), encrypted_content: AL(re) })),
    (kpa = nt({ type: Vc("item_reference"), id: re })),
    (Opa = Io([iDi, sDi])),
    (Upa = Io([re, On(Opa)])),
    (Npa = Io([
      nt({ role: Vc("system"), content: re }),
      nt({ role: Vc("user"), content: On(jpa) }),
      nt({ role: Vc("assistant"), content: On(Ppa) }),
      wpa,
      kpa,
      nt({ type: Vc("function_call"), call_id: re, name: re, arguments: re }),
      nt({ type: Vc("function_call_output"), call_id: re, output: Upa }),
    ])),
    (Fpa = nt({ type: Vc("function"), name: re, description: re, parameters: CMe, strict: be(Vi) })),
    (Bpa = Io([Jo(["auto", "none", "required"]), nt({ type: Vc("function"), name: re })])),
    (oDi = {
      model: re,
      input: On(Npa),
      instructions: be(re),
      tools: hV(Fpa),
      tool_choice: be(Bpa),
      store: be(Vi),
      service_tier: be(Bfa),
      prompt_cache_key: be(re),
      include: hV(Ffa),
      reasoning: be(nt({ effort: be(zIi), summary: be(ri("auto")) })),
      text: be(nt({ verbosity: be(Nfa) })),
      max_output_tokens: be(Aa),
      temperature: be(Aa),
      top_p: be(Aa),
    }),
    (Rpa = nt({ ...oDi, stream: ri(!0) })),
    (aDi = fG(nt({ type: Vc("response.create"), ...oDi }), [ks(re, PH)])),
    (Wpa = Kie(Cj(aDi))),
    (Vpa = nt({
      input_tokens: be(Aa),
      input_tokens_details: AL(nt({ cached_tokens: be(Aa) })),
      output_tokens: be(Aa),
      output_tokens_details: AL(nt({ reasoning_tokens: be(Aa) })),
      total_tokens: be(Aa),
    })),
    (qpa = nt({
      type: re,
      id: be(re),
      call_id: be(re),
      name: be(re),
      arguments: be(re),
      status: be(re),
      action: be(PH),
      queries: be(PH),
      results: be(PH),
      code: be(re),
      container_id: be(re),
      outputs: be(PH),
      server_label: be(re),
      output: be(PH),
      error: be(PH),
      encrypted_content: AL(re),
    })),
    (Gpa = nt({ code: AL(re), message: AL(re), param: AL(re) })),
    (Xpa = nt({
      type: re,
      delta: be(re),
      item_id: be(re),
      summary_index: be(Aa),
      item: be(qpa),
      response: be(
        fG(
          nt({
            id: be(re),
            service_tier: AL(re),
            incomplete_details: AL(nt({ reason: re })),
            usage: AL(Vpa),
            error: AL(Gpa),
          }),
          [ks(re, PH)],
        ),
      ),
      code: be(re),
      message: be(re),
      param: be(re),
    })),
    (Jpa = XS),
    (eda = Ge("OpenAIResponses.lowerUserContent")(function* (e) {
      if (e.type === "text") return { type: "input_text", text: e.text };
      if (e.type === "media")
        return { type: "input_image", image_url: (yield* v_t("OpenAI Responses", e, new Set(wMe))).dataUrl };
      return yield* $Y("OpenAI Responses", "user", ["text", "media"]);
    })),
    (tda = Ge("OpenAIResponses.lowerToolResultContentItem")(function* (e) {
      if (e.type === "text") return { type: "input_text", text: e.text };
      return { type: "input_image", image_url: (yield* DIn("OpenAI Responses", e, new Set(wMe))).dataUrl };
    })),
    (rda = Ge("OpenAIResponses.lowerToolResultOutput")(function* (e) {
      if (e.result.type !== "content") return qnr(e);
      let t = e.result.value;
      return yield* ja(t, tda);
    })),
    (nda = Ge("OpenAIResponses.lowerMessages")(function* (e) {
      let r = [...(e.system.length === 0 ? [] : [{ role: "system", content: T_t(e.system) }])],
        s = GMt(e);
      for (let a of e.messages) {
        if (a.role === "system") {
          let H = yield* Vnr("OpenAI Responses", a),
            u = r.at(-1);
          if (u && "role" in u && u.role === "user")
            r[r.length - 1] = { role: "user", content: [...u.content, { type: "input_text", text: H.text }] };
          else r.push({ role: "user", content: [{ type: "input_text", text: H.text }] });
          continue;
        }
        if (a.role === "user") {
          r.push({ role: "user", content: yield* ja(a.content, eda) });
          continue;
        }
        if (a.role === "assistant") {
          let H = [],
            u = {},
            f = new Set(),
            d = new Set(),
            _ = () => {
              if (H.length === 0) return;
              (r.push({ role: "assistant", content: H.map((L) => ({ type: "output_text", text: L.text })) }),
                H.splice(0, H.length));
            };
          for (let L of a.content) {
            if (L.type === "text") {
              H.push(L);
              continue;
            }
            if (L.type === "reasoning") {
              _();
              let I = Ypa(L);
              if (!I) continue;
              if (s !== !1) {
                if (!f.has(I.id)) r.push({ type: "item_reference", id: I.id });
                f.add(I.id);
                continue;
              }
              let D = u[I.id];
              if (D) {
                if ((D.summary.push(...I.summary), typeof I.encrypted_content === "string"))
                  D.encrypted_content = I.encrypted_content;
                continue;
              }
              let S = { type: I.type, summary: I.summary, encrypted_content: I.encrypted_content };
              ((u[I.id] = S), r.push(S));
              continue;
            }
            if (L.type === "tool-call") {
              if ((_(), L.providerExecuted === !0)) continue;
              r.push(Qpa(L));
              continue;
            }
            if (L.type === "tool-result" && L.providerExecuted === !0) {
              _();
              let I = Zpa(L);
              if (s !== !1 && I && !d.has(I)) r.push({ type: "item_reference", id: I });
              if (I) d.add(I);
              continue;
            }
            return yield* $Y("OpenAI Responses", "assistant", [
              "text",
              "reasoning",
              "tool-call",
              "tool-result",
            ]);
          }
          _();
          continue;
        }
        for (let H of a.content) {
          if (!aWe(H, ["tool-result"])) return yield* $Y("OpenAI Responses", "tool", ["tool-result"]);
          r.push({ type: "function_call_output", call_id: H.id, output: yield* rda(H) });
        }
      }
      return s === !1
        ? r.filter((a) => !("type" in a) || a.type !== "reasoning" || typeof a.encrypted_content === "string")
        : r;
    })),
    (ida = Ge("OpenAIResponses.lowerOptions")(function* (e) {
      let t = GMt(e),
        r = Gfa(e),
        s = YIi(e);
      if (s && !QIi(s)) return yield* Jpa(`OpenAI Responses does not support reasoning effort ${s}`);
      let a = Vfa(e),
        H = qfa(e),
        u = Xfa(e),
        f = Kfa(e),
        d = Jfa(e);
      return {
        ...(f ? { instructions: f } : {}),
        ...(t !== void 0 ? { store: t } : {}),
        ...(r ? { prompt_cache_key: r } : {}),
        ...(H ? { include: H } : {}),
        ...(s || a ? { reasoning: { effort: s, summary: a } } : {}),
        ...(u ? { text: { verbosity: u } } : {}),
        ...(d ? { service_tier: d } : {}),
      };
    })),
    (sda = Ge("OpenAIResponses.fromRequest")(function* (e) {
      let t = e.generation,
        r = yield* ida(e),
        s = e.model.compatibility?.toolSchema;
      return {
        model: e.model.id,
        input: yield* nda(e),
        tools:
          e.tools.length === 0
            ? void 0
            : e.tools.map((a) => Kpa(a, Kae.modelCompatibility(a.inputSchema, s))),
        tool_choice: e.toolChoice ? yield* zpa(e.toolChoice) : void 0,
        stream: !0,
        max_output_tokens: t?.maxTokens,
        temperature: t?.temperature,
        top_p: t?.topP,
        ...r,
      };
    })),
    (HDi = {
      web_search_call: { name: "web_search", input: (e) => e.action ?? {} },
      web_search_preview_call: { name: "web_search_preview", input: (e) => e.action ?? {} },
      file_search_call: { name: "file_search", input: (e) => ({ queries: e.queries ?? [] }) },
      code_interpreter_call: {
        name: "code_interpreter",
        input: (e) => ({ code: e.code, container_id: e.container_id }),
      },
      computer_use_call: { name: "computer_use", input: (e) => e.action ?? {} },
      image_generation_call: { name: "image_generation", input: () => ({}) },
      mcp_call: {
        name: "mcp",
        input: (e) => ({ server_label: e.server_label, name: e.name, arguments: e.arguments }),
      },
      local_shell_call: { name: "local_shell", input: (e) => e.action ?? {} },
    }),
    (xN = []),
    (uda = new Set(["response.completed", "response.incomplete", "response.failed"])),
    (hda = Ge("OpenAIResponses.onFunctionCallArgumentsDelta")(function* (e, t) {
      if (!t.item_id || !t.delta) return [e, xN];
      let r = OIi(
        Hbe,
        e.tools,
        t.item_id,
        t.delta,
        "OpenAI Responses tool argument delta is missing its tool call",
      );
      if (BLr(r)) return yield* r;
      let s = [],
        a = r.events.length ? fP(e.lifecycle, s) : e.lifecycle;
      return (s.push(...r.events), [{ ...e, lifecycle: a, tools: r.tools }, s]);
    })),
    (Lda = Ge("OpenAIResponses.onOutputItemDone")(function* (e, t) {
      let r = t.item;
      if (!r) return [e, xN];
      if (r.type === "function_call") {
        if (!r.id || !r.call_id || !r.name) return [e, xN];
        let s = e.tools[r.id] ? e.tools : RLr(e.tools, r.id, { id: r.call_id, name: r.name }),
          a = r.arguments === void 0 ? yield* UIi(Hbe, s, r.id) : yield* Pla(Hbe, s, r.id, r.arguments),
          H = [],
          u = a.events ?? [],
          f = u.length ? fP(e.lifecycle, H) : e.lifecycle;
        return (
          H.push(...u),
          [
            {
              ...e,
              lifecycle: f,
              hasFunctionCall: u.some(tA.is.toolCall) ? !0 : e.hasFunctionCall,
              tools: a.tools,
            },
            H,
          ]
        );
      }
      if (Hda(r)) {
        let s = [],
          a = fP(e.lifecycle, s);
        return (s.push(...Ada(r)), [{ ...e, lifecycle: a }, s]);
      }
      if (cDi(r)) {
        let s = [],
          a = ADi(r),
          H = e.reasoningItems[r.id];
        if (H) {
          let u = Object.entries(H.summaryParts)
              .filter((_) => _[1] === "active" || _[1] === "can-conclude")
              .reduce((_, L) => Jae(_, s, `${r.id}:${L[0]}`, a), e.lifecycle),
            { [r.id]: f, ...d } = e.reasoningItems;
          return [{ ...e, lifecycle: u, reasoningItems: d }, s];
        }
        if (!e.lifecycle.reasoning.has(r.id)) {
          let u = fP(e.lifecycle, s);
          return (
            s.push(tA.reasoningStart({ id: r.id, providerMetadata: a })),
            s.push(tA.reasoningEnd({ id: r.id, providerMetadata: a })),
            [{ ...e, lifecycle: u }, s]
          );
        }
        return [{ ...e, lifecycle: Jae(e.lifecycle, s, r.id, a) }, s];
      }
      return [e, xN];
    })),
    (lDi = nir({
      id: Hbe,
      body: { schema: Rpa, from: sda },
      stream: {
        event: iir(Xpa),
        initial: (e) => ({
          hasFunctionCall: !1,
          tools: RMt(),
          lifecycle: wLr(),
          reasoningItems: {},
          store: GMt(e),
        }),
        step: Dda,
        terminal: (e) => uda.has(e.type),
      },
    })),
    (fDi = b_t(bpa, { baseURL: vpa })),
    (pDi = Pse),
    (yda = RIn.with()),
    (dDi = RG.make({
      id: Hbe,
      provider: "openai",
      protocol: lDi,
      endpoint: fDi,
      auth: pDi,
      transport: yda,
      defaults: { providerOptions: { openai: { store: !1 } } },
    })),
    (Mda = Xnr(G_(aDi))),
    (Sda = k_t.jsonTransport.with({ toMessage: xda, encodeMessage: Wpa })),
    (m1c = RG.make({
      id: `${Hbe}-websocket`,
      provider: "openai",
      protocol: lDi,
      endpoint: fDi,
      auth: pDi,
      transport: Sda,
      defaults: { providerOptions: { openai: { store: !1 } } },
    })));
});