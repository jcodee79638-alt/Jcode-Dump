
class wde {
  id;
  provider;
  route;
  defaults;
  compatibility;
  constructor(e) {
    ((this.id = e.id),
      (this.provider = e.provider),
      (this.route = e.route),
      (this.defaults = e.defaults),
      (this.compatibility = e.compatibility));
  }
  static make(e) {
    return new wde({
      id: c_t.make(e.id),
      provider: IMe.make(e.provider),
      route: e.route,
      defaults: e.defaults === void 0 ? void 0 : xMe.make(e.defaults),
      compatibility: e.compatibility === void 0 ? void 0 : SMe.make(e.compatibility),
    });
  }
  static input(e) {
    return {
      id: e.id,
      provider: e.provider,
      route: e.route,
      defaults: e.defaults,
      compatibility: e.compatibility,
    };
  }
  static update(e, t) {
    if (Object.keys(t).length === 0) return e;
    return wde.make({ ...wde.input(e), ...t });
  }
}