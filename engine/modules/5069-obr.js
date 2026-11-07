
var obr = ne(() => {
  kl();
  H0();
  uu();
  Pze = class Pze extends Ni {
    create(e, t, r) {
      return this._client.post(Cn`/vector_stores/${e}/file_batches`, {
        body: t,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { vector_store_id: s } = t;
      return this._client.get(Cn`/vector_stores/${s}/file_batches/${e}`, {
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    cancel(e, t, r) {
      let { vector_store_id: s } = t;
      return this._client.post(Cn`/vector_stores/${s}/file_batches/${e}/cancel`, {
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    async createAndPoll(e, t, r) {
      let s = await this.create(e, t);
      return await this.poll(e, s.id, r);
    }
    listFiles(e, t, r) {
      let { vector_store_id: s, ...a } = t;
      return this._client.getAPIList(Cn`/vector_stores/${s}/file_batches/${e}/files`, Ff, {
        query: a,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
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
        let { data: a, response: H } = await this.retrieve(
          t,
          { vector_store_id: e },
          { ...r, headers: s },
        ).withResponse();
        switch (a.status) {
          case "in_progress":
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
          case "failed":
          case "cancelled":
          case "completed":
            return a;
        }
      }
    }
    async uploadAndPoll(e, { files: t, fileIds: r = [] }, s) {
      if (t == null || t.length == 0)
        throw Error(
          "No `files` provided to process. If you've already uploaded files you should use `.createAndPoll()` instead",
        );
      let a = s?.maxConcurrency ?? 5,
        H = Math.min(a, t.length),
        u = this._client,
        f = t.values(),
        d = [...r];
      async function _(I) {
        for (let D of I) {
          let S = await u.files.create({ file: D, purpose: "assistants" }, s);
          d.push(S.id);
        }
      }
      let L = Array(H).fill(f).map(_);
      return (await g7i(L), await this.createAndPoll(e, { file_ids: d }));
    }
  };
});