
var YTr = ne(() => {
  NTr();
  NTr();
  FTr();
  FTr();
  BTr();
  BTr();
  RTr();
  RTr();
  WTr();
  WTr();
  VTr();
  VTr();
  qTr();
  qTr();
  GTr();
  GTr();
  XTr();
  XTr();
  KTr();
  KTr();
  QTr();
  QTr();
  kl();
  uu();
  jP = class jP extends Ni {
    constructor() {
      super(...arguments);
      ((this.users = new eCe(this._client)),
        (this.serviceAccounts = new ZKe(this._client)),
        (this.apiKeys = new GKe(this._client)),
        (this.rateLimits = new QKe(this._client)),
        (this.modelPermissions = new zKe(this._client)),
        (this.hostedToolPermissions = new KKe(this._client)),
        (this.groups = new ZPe(this._client)),
        (this.roles = new YKe(this._client)),
        (this.dataRetention = new JKe(this._client)),
        (this.spendAlerts = new eze(this._client)),
        (this.certificates = new XKe(this._client)));
    }
    create(e, t) {
      return this._client.post("/organization/projects", {
        body: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/organization/projects/${e}`, { ...t, __security: { adminAPIKeyAuth: !0 } });
    }
    update(e, t, r) {
      return this._client.post(Cn`/organization/projects/${e}`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/organization/projects", T_, {
        query: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    archive(e, t) {
      return this._client.post(Cn`/organization/projects/${e}/archive`, {
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
  jP.Users = eCe;
  jP.ServiceAccounts = ZKe;
  jP.APIKeys = GKe;
  jP.RateLimits = QKe;
  jP.ModelPermissions = zKe;
  jP.HostedToolPermissions = KKe;
  jP.Groups = ZPe;
  jP.Roles = YKe;
  jP.DataRetention = JKe;
  jP.SpendAlerts = eze;
  jP.Certificates = XKe;
});