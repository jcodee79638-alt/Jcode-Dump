
var fYt = ne(() => {
  R0();
  YA();
  e2();
  BH();
  lD();
  KH();
  Oie();
  aYt();
  Zlt();
  lQt();
  R_();
  fD();
  ((eft = Wr(2, (e, t) =>
    yH(() => {
      if (e.shutdownFlag.current) return Jt(!1);
      if (e.pubsub.publish(t)) return (e.strategy.completeSubscribersUnsafe(e.pubsub, e.subscribers), Jt(!0));
      return e.strategy.handleSurplus(e.pubsub, e.subscribers, [t], e.shutdownFlag);
    }),
  )),
    (dD = Symbol.for("effect/PubSub/AbsentValue")));
  fHn = class fHn {
    [p9s] = { _A: Za };
    pubsub;
    subscribers;
    subscription;
    pollers;
    shutdownHook;
    shutdownFlag;
    strategy;
    replayWindow;
    constructor(e, t, r, s, a, H, u, f) {
      ((this.pubsub = e),
        (this.subscribers = t),
        (this.subscription = r),
        (this.pollers = s),
        (this.shutdownHook = a),
        (this.shutdownFlag = H),
        (this.strategy = u),
        (this.replayWindow = f));
    }
    pipe() {
      return vA(this, arguments);
    }
  };
  pHn = class pHn {
    [f9s] = { _A: Za };
    pubsub;
    subscribers;
    scope;
    shutdownHook;
    shutdownFlag;
    strategy;
    constructor(e, t, r, s, a, H) {
      ((this.pubsub = e),
        (this.subscribers = t),
        (this.scope = r),
        (this.shutdownHook = s),
        (this.shutdownFlag = a),
        (this.strategy = H));
    }
    pipe() {
      return vA(this, arguments);
    }
  };
  tft = {
    remaining: 0,
    take: () => {
      return;
    },
    takeN: () => [],
    takeAll: () => [],
  };
});