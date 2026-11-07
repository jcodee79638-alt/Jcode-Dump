
var MZ = ne(() => {
  MZ();
  Gt();
  ((QV = re.check(cRe(/^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._/-]*$/)).pipe(Jl("SystemContext.Key"))),
    (nbe = Symbol.for("@opencode/SystemContext.Unavailable")),
    (_Lr = Symbol.for("@opencode/SystemContext")),
    (Cua = nt({ value: Qie, removed: be(PAn) })),
    (wua = ks(QV, Cua)));
  XEi = class XEi extends ki()("SystemContext.InitializationBlocked", { keys: On(QV) }) {
    get message() {
      return `System context initialization blocked by unavailable sources: ${this.keys.join(", ")}`;
    }
  };
  JEi = class JEi extends ki()("SystemContext.DuplicateKeyError", { key: QV }) {
    get message() {
      return `Duplicate system context key: ${this.key}`;
    }
  };
  $Mt = $Lr([]);
});