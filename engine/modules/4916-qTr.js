
var qTr = ne(() => {
  kl();
  uu();
  YKe = class YKe extends Ni {
    create(e, t, r) {
      return this._client.post(Cn`/projects/${e}/roles`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { project_id: s } = t;
      return this._client.get(Cn`/projects/${s}/roles/${e}`, { ...r, __security: { adminAPIKeyAuth: !0 } });
    }
    update(e, t, r) {
      let { project_id: s, ...a } = t;
      return this._client.post(Cn`/projects/${s}/roles/${e}`, {
        body: a,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/projects/${e}/roles`, $x, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { project_id: s } = t;
      return this._client.delete(Cn`/projects/${s}/roles/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});