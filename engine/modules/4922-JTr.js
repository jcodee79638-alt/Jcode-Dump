
var JTr = ne(() => {
  kl();
  uu();
  tze = class tze extends Ni {
    create(e, t, r) {
      let { project_id: s, ...a } = t;
      return this._client.post(Cn`/projects/${s}/groups/${e}/roles`, {
        body: a,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { project_id: s, group_id: a } = t;
      return this._client.get(Cn`/projects/${s}/groups/${a}/roles/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e, t, r) {
      let { project_id: s, ...a } = t;
      return this._client.getAPIList(Cn`/projects/${s}/groups/${e}/roles`, $x, {
        query: a,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { project_id: s, group_id: a } = t;
      return this._client.delete(Cn`/projects/${s}/groups/${a}/roles/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});