
var OTr = ne(() => {
  kl();
  uu();
  qKe = class qKe extends Ni {
    create(e, t, r) {
      return this._client.post(Cn`/organization/groups/${e}/users`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { group_id: s } = t;
      return this._client.get(Cn`/organization/groups/${s}/users/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/organization/groups/${e}/users`, $x, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { group_id: s } = t;
      return this._client.delete(Cn`/organization/groups/${s}/users/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});