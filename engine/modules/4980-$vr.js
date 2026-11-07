
var $vr = ne(() => {
  dvr();
  dvr();
  Lvr();
  Lvr();
  H0();
  hvr();
  uu();
  wLe = class wLe extends Ni {
    constructor() {
      super(...arguments);
      ((this.runs = new iCe(this._client)), (this.messages = new lze(this._client)));
    }
    create(e = {}, t) {
      return this._client.post("/threads", {
        body: e,
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/threads/${e}`, {
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    update(e, t, r) {
      return this._client.post(Cn`/threads/${e}`, {
        body: t,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/threads/${e}`, {
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    createAndRun(e, t) {
      return this._client.post("/threads/runs", {
        body: e,
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        stream: e.stream ?? !1,
        __synthesizeEventData: !0,
        __security: { bearerAuth: !0 },
      });
    }
    async createAndRunPoll(e, t) {
      let r = await this.createAndRun(e, t);
      return await this.runs.poll(r.id, { thread_id: r.thread_id }, t);
    }
    createAndRunStream(e, t) {
      return Dce.createThreadAssistantStream(e, this._client.beta.threads, t);
    }
  };
  wLe.Runs = iCe;
  wLe.Messages = lze;
});