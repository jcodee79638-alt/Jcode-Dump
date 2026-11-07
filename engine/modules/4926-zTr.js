
var zTr = ne(() => {
  kl();
  uu();
  rze = class rze extends Ni {
    create(e, t, r) {
      let { project_id: s, ...a } = t;
      return this._client.post(Cn`/projects/${s}/users/${e}/roles`, {
        body: a,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { project_id: s, user_id: a } = t;
      return this._client.get(Cn`/projects/${s}/users/${a}/roles/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e, t, r) {
      let { project_id: s, ...a } = t;
      return this._client.getAPIList(Cn`/projects/${s}/users/${e}/roles`, $x, {
        query: a,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { project_id: s, user_id: a } = t;
      return this._client.delete(Cn`/projects/${s}/users/${a}/roles/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});