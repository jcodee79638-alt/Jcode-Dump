
var Gvr = ne(() => {
  H0();
  uu();
  Mze = class Mze extends Ni {
    accept(e, t, r) {
      return this._client.post(Cn`/realtime/calls/${e}/accept`, {
        body: t,
        ...r,
        headers: Xa([{ Accept: "*/*" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    hangup(e, t) {
      return this._client.post(Cn`/realtime/calls/${e}/hangup`, {
        ...t,
        headers: Xa([{ Accept: "*/*" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    refer(e, t, r) {
      return this._client.post(Cn`/realtime/calls/${e}/refer`, {
        body: t,
        ...r,
        headers: Xa([{ Accept: "*/*" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    reject(e, t = {}, r) {
      return this._client.post(Cn`/realtime/calls/${e}/reject`, {
        body: t,
        ...r,
        headers: Xa([{ Accept: "*/*" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
  };
});