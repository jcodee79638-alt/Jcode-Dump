
var abr = ne(() => {
  kl();
  H0();
  pze();
  uu();
  Cze = class Cze extends Ni {
    create(e, t, r) {
      return this._client.post(Cn`/vector_stores/${e}/files`, {
        body: t,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { vector_store_id: s } = t;
      return this._client.get(Cn`/vector_stores/${s}/files/${e}`, {
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    update(e, t, r) {
      let { vector_store_id: s, ...a } = t;
      return this._client.post(Cn`/vector_stores/${s}/files/${e}`, {
        body: a,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/vector_stores/${e}/files`, Ff, {
        query: t,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { vector_store_id: s } = t;
      return this._client.delete(Cn`/vector_stores/${s}/files/${e}`, {
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    async createAndPoll(e, t, r) {
      let s = await this.create(e, t, r);
      return await this.poll(e, s.id, r);
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
        let a = await this.retrieve(t, { vector_store_id: e }, { ...r, headers: s }).withResponse(),
          H = a.data;
        switch (H.status) {
          case "in_progress":
            let u = 5000;
            if (r?.pollIntervalMs) u = r.pollIntervalMs;
            else {
              let f = a.response.headers.get("openai-poll-after-ms");
              if (f) {
                let d = parseInt(f);
                if (!isNaN(d)) u = d;
              }
            }
            await aJ(u);
            break;
          case "failed":
          case "completed":
            return H;
        }
      }
    }
    async upload(e, t, r) {
      let s = await this._client.files.create({ file: t, purpose: "assistants" }, r);
      return this.create(e, { file_id: s.id }, r);
    }
    async uploadAndPoll(e, t, r) {
      let s = await this.upload(e, t, r);
      return await this.poll(e, s.id, r);
    }
    content(e, t, r) {
      let { vector_store_id: s } = t;
      return this._client.getAPIList(Cn`/vector_stores/${s}/files/${e}/content`, Yw, {
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
  };
});