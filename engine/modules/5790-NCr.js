
var NCr = ne(() => {
  NCr();
  Gt();
  UCr = class UCr extends _i()("@opencode/ServerAuthConfig") {
    static configLayer(e) {
      return bf(this, this.of(e));
    }
    static get layer() {
      return Es(
        this,
        ft(function* () {
          return UCr.of(
            yield* Xpe({
              password: dG("OPENCODE_SERVER_PASSWORD").pipe(dRe),
              username: dG("OPENCODE_SERVER_USERNAME").pipe(XQ("opencode")),
            }),
          );
        }),
      );
    }
  };
});