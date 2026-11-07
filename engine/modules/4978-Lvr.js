
var Lvr = ne(() => {
  mvr();
  mvr();
  kl();
  H0();
  hvr();
  uu();
  iCe = class iCe extends Ni {
    constructor() {
      super(...arguments);
      this.steps = new fze(this._client);
    }
    create(e, t, r) {
      let { include: s, ...a } = t;
      return this._client.post(Cn`/threads/${e}/runs`, {
        query: { include: s },
        body: a,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        stream: t.stream ?? !1,
        __synthesizeEventData: !0,
        __security: { bearerAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { thread_id: s } = t;
      return this._client.get(Cn`/threads/${s}/runs/${e}`, {
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    update(e, t, r) {
      let { thread_id: s, ...a } = t;
      return this._client.post(Cn`/threads/${s}/runs/${e}`, {
        body: a,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/threads/${e}/runs`, Ff, {
        query: t,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    cancel(e, t, r) {
      let { thread_id: s } = t;
      return this._client.post(Cn`/threads/${s}/runs/${e}/cancel`, {
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    async createAndPoll(e, t, r) {
      let s = await this.create(e, t, r);
      return await this.poll(s.id, { thread_id: e }, r);
    }
    createAndStream(e, t, r) {
      return Dce.createAssistantStream(e, this._client.beta.threads.runs, t, r);
    }
    async poll(e, t, r) {
      let s = Xa([
        r?.headers,
        {
          "X-Stainless-Poll-Helper": "true",
          "X-Stainless-Custom-Poll-Interval": r?.pollIntervalMs?.toString() ?? void 0,
        },
      ]);
      while (!0) {
        let { data: a, response: H } = await this.retrieve(e, t, {
          ...r,
          headers: { ...r?.headers, ...s },
        }).withResponse();
        switch (a.status) {
          case "queued":
          case "in_progress":
          case "cancelling":
            let u = 5000;
            if (r?.pollIntervalMs) u = r.pollIntervalMs;
            else {
              let f = H.headers.get("openai-poll-after-ms");
              if (f) {
                let d = parseInt(f);
                if (!isNaN(d)) u = d;
              }
            }
            await aJ(u);
            break;
          case "requires_action":
          case "incomplete":
          case "cancelled":
          case "completed":
          case "failed":
          case "expired":
            return a;
        }
      }
    }
    stream(e, t, r) {
      return Dce.createAssistantStream(e, this._client.beta.threads.runs, t, r);
    }
    submitToolOutputs(e, t, r) {
      let { thread_id: s, ...a } = t;
      return this._client.post(Cn`/threads/${s}/runs/${e}/submit_tool_outputs`, {
        body: a,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        stream: t.stream ?? !1,
        __synthesizeEventData: !0,
        __security: { bearerAuth: !0 },
      });
    }
    async submitToolOutputsAndPoll(e, t, r) {
      let s = await this.submitToolOutputs(e, t, r);
      return await this.poll(s.id, t, r);
    }
    submitToolOutputsStream(e, t, r) {
      return Dce.createToolAssistantStream(e, this._client.beta.threads.runs, t, r);
    }
  };
  iCe.Steps = fze;
});