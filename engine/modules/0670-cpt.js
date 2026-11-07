
var cpt = ne(() => {
  Jg();
  YA();
  BH();
  KH();
  mI();
  Dd();
  Hf();
  R_();
  Yu();
  Tv();
  tBe();
  aL();
  gQ();
  U6();
  T1e();
  spt();
  apt();
  tse();
  DRe();
  KZt();
  ese();
  ((gy = _i("effect/HttpClient")),
    (xRe = Wr(2, (e, t) => Mun((r) => t(e.postprocess(r)), e.preprocess))),
    (RU = xRe(Hi(opt))),
    (aRs = {
      [Dun]: Dun,
      pipe() {
        return vA(this, arguments);
      },
      ...KF,
      toJSON() {
        return { _id: "effect/HttpClient" };
      },
      ...Object.fromEntries(
        _un.map(([e, t]) => [
          t,
          function (r, s) {
            return this.execute(P1e(e)(r, s));
          },
        ]),
      ),
    }),
    (SRe = Wr(2, (e, t) => {
      let r = Y2e(t),
        s = r ? "errors-and-responses" : (t.retryOn ?? "errors-and-responses"),
        a = r ? t : t.schedule,
        H = a && gpe(a),
        u = r ? void 0 : t.times;
      return xRe(
        e,
        mW(
          s === "errors-only" ? Za : xie({ schedule: H, times: u, while: Tun }),
          s === "response-only"
            ? Za
            : ult({ while: r || t.while === void 0 ? yun : btn(yun, t.while), schedule: a, times: u }),
        ),
      );
    })),
    (HRs = bA("effect/http/HttpClient/TracerDisabledWhen", { defaultValue: () => dW })),
    (QZt = bA("effect/HttpClient/TracerPropagationEnabled", { defaultValue: d6 })),
    (cRs = bA("effect/http/HttpClient/SpanNameGenerator", {
      defaultValue: () => (e) => `http.client ${e.method}`,
    })),
    (Hpt = (() => {
      if ("FinalizationRegistry" in globalThis && globalThis.FinalizationRegistry) {
        let t = new FinalizationRegistry((r) => {
          r.abort();
        });
        return {
          register(r, s) {
            t.register(r, s, r);
          },
          unregister(r) {
            t.unregister(r);
          },
        };
      }
      let e = new Map();
      return {
        register(t, r) {
          e.set(
            t,
            setTimeout(() => r.abort(), 5000),
          );
        },
        unregister(t) {
          let r = e.get(t);
          if (r === void 0) return;
          (clearTimeout(r), e.delete(t));
        },
      };
    })()),
    (ARs = new WeakMap()));
  zZt = class zZt {
    original;
    controller;
    constructor(e, t) {
      ((this.original = e), (this.controller = t));
    }
    [O1e] = O1e;
    [sw] = sw;
    applyInterrupt(e) {
      return yH(
        () => (
          Hpt.unregister(this.original),
          CU(e, () =>
            jn(() => {
              this.controller.abort();
            }),
          )
        ),
      );
    }
    get request() {
      return this.original.request;
    }
    get status() {
      return this.original.status;
    }
    get headers() {
      return this.original.headers;
    }
    get cookies() {
      return this.original.cookies;
    }
    get remoteAddress() {
      return this.original.remoteAddress;
    }
    get formData() {
      return this.applyInterrupt(this.original.formData);
    }
    get text() {
      return this.applyInterrupt(this.original.text);
    }
    get json() {
      return this.applyInterrupt(this.original.json);
    }
    get urlParamsBody() {
      return this.applyInterrupt(this.original.urlParamsBody);
    }
    get arrayBuffer() {
      return this.applyInterrupt(this.original.arrayBuffer);
    }
    get stream() {
      return JBe(
        () => (
          Hpt.unregister(this.original),
          m1e(
            this.original.stream,
            jn(() => {
              this.controller.abort();
            }),
          )
        ),
      );
    }
    toJSON() {
      return this.original.toJSON();
    }
    [F0]() {
      return this.original[F0]();
    }
    pipe() {
      return vA(this, arguments);
    }
  };
});