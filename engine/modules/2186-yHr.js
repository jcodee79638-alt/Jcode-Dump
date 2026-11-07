
var yHr = Ie(function (Jkn) {
  Object.defineProperty(Jkn, "__esModule", { value: !0 });
  Jkn.defaultTextMapSetter = Jkn.defaultTextMapGetter = void 0;
  Jkn.defaultTextMapGetter = {
    get(e, t) {
      if (e == null) return;
      return e[t];
    },
    keys(e) {
      if (e == null) return [];
      return Object.keys(e);
    },
  };
  Jkn.defaultTextMapSetter = {
    set(e, t, r) {
      if (e == null) return;
      e[t] = r;
    },
  };
});