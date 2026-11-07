
var ZTr = ne(() => {
  kl();
  uu();
  nze = class nze extends Ni {
    create(e, t, r) {
      return this._client.post(Cn`/organization/users/${e}/roles`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { user_id: s } = t;
      return this._client.get(Cn`/organization/users/${s}/roles/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/organization/users/${e}/roles`, $x, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { user_id: s } = t;
      return this._client.delete(Cn`/organization/users/${s}/roles/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});