
var ise = ne(() => {
  YA();
  e2();
  BH();
  ler();
  Oie();
  Dd();
  Yu();
  Tv();
  Ov();
  fD();
  ((TRs = _i("effect/socket/Socket")), (bRs = new TextEncoder()), (fer = new TextDecoder()));
  Fv = class Fv {
    [$pt];
    code;
    reason;
    constructor(e = 1000, t) {
      ((this[$pt] = $pt), (this.code = e), (this.reason = t));
    }
    toString() {
      return this.reason ? `${this.code}: ${this.reason}` : `${this.code}`;
    }
  };
  per = class per extends (
    $y("effect/socket/Socket/SocketReadError")({ _tag: Vc("SocketReadError"), cause: yd() })
  ) {
    message = "An error occurred during Read";
  };
  qun = class qun extends (
    $y("effect/socket/Socket/SocketWriteError")({ _tag: Vc("SocketWriteError"), cause: yd() })
  ) {
    message = "An error occurred during Write";
  };
  Ept = class Ept extends (
    $y("effect/socket/Socket/SocketOpenError")({
      _tag: Vc("SocketOpenError"),
      kind: Jo(["Unknown", "Timeout"]),
      cause: yd(),
    })
  ) {
    get message() {
      return this.kind === "Timeout" ? 'timeout waiting for "open"' : "An error occurred during Open";
    }
  };
  Ipt = class Ipt extends (
    $y("effect/socket/Socket/SocketCloseError")({
      _tag: Vc("SocketCloseError"),
      code: Aa,
      closeReason: be(re),
    })
  ) {
    static filterClean(e) {
      return function (t) {
        return jRe.is(t) && t.reason._tag === "SocketCloseError" && e(t.reason.code) ? D$(t.reason) : dh(t);
      };
    }
    get message() {
      if (this.closeReason) return `${this.code}: ${this.closeReason}`;
      return `${this.code}`;
    }
  };
  CRs = Io([per, qun, Ept, Ipt]);
  jRe = class jRe extends ki(gpt)("SocketError", { _tag: Vc("SocketError"), reason: CRs }) {
    constructor(e) {
      if ("cause" in e.reason) super({ ...e, cause: e.reason.cause });
      else super(e);
    }
    [gpt] = gpt;
    static is(e) {
      return PRs(e);
    }
    message = this.reason.message;
  };
  Gun = class Gun extends _i()("~effect/socket/Socket/WebSocket") {};
  U1e = class U1e extends _i()("@effect/platform/Socket/WebSocketConstructor") {};
  Xun = bf(U1e)((e, t) => new globalThis.WebSocket(e, t));
});