
var Fxr = ne(() => {
  Iee();
  ZB();
  Uxr();
  uLe();
  Mjt();
  ZB();
  zN = class zN {
    constructor(e, t, r) {
      ((this.iterator = e), _Je.set(this, void 0), (this.controller = t), Ic(this, _Je, r, "f"));
    }
    static fromSSEResponse(e, t, r) {
      let s = !1,
        a = r ? yT(r) : console;
      async function* H() {
        if (s) throw new Cu("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        s = !0;
        let u = !1;
        try {
          for await (let f of RBa(e, t)) {
            if (f.event === "completion")
              try {
                yield JSON.parse(f.data);
              } catch (d) {
                throw (
                  a.error("Could not parse message into JSON:", f.data),
                  a.error("From chunk:", f.raw),
                  d
                );
              }
            if (
              f.event === "message_start" ||
              f.event === "message_delta" ||
              f.event === "message_stop" ||
              f.event === "content_block_start" ||
              f.event === "content_block_delta" ||
              f.event === "content_block_stop"
            )
              try {
                yield JSON.parse(f.data);
              } catch (d) {
                throw (
                  a.error("Could not parse message into JSON:", f.data),
                  a.error("From chunk:", f.raw),
                  d
                );
              }
            if (f.event === "ping") continue;
            if (f.event === "error") throw new mx(void 0, Ejt(f.data) ?? f.data, void 0, e.headers);
          }
          u = !0;
        } catch (f) {
          if (Dee(f)) return;
          throw f;
        } finally {
          if (!u) t.abort();
        }
      }
      return new zN(H, t, r);
    }
    static fromReadableStream(e, t, r) {
      let s = !1;
      async function* a() {
        let u = new lce(),
          f = pJe(e);
        for await (let d of f) for (let _ of u.decode(d)) yield _;
        for (let d of u.flush()) yield d;
      }
      async function* H() {
        if (s) throw new Cu("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        s = !0;
        let u = !1;
        try {
          for await (let f of a()) {
            if (u) continue;
            if (f) yield JSON.parse(f);
          }
          u = !0;
        } catch (f) {
          if (Dee(f)) return;
          throw f;
        } finally {
          if (!u) t.abort();
        }
      }
      return new zN(H, t, r);
    }
    [((_Je = new WeakMap()), Symbol.asyncIterator)]() {
      return this.iterator();
    }
    tee() {
      let e = [],
        t = [],
        r = this.iterator(),
        s = (a) => ({
          next: () => {
            if (a.length === 0) {
              let H = r.next();
              (e.push(H), t.push(H));
            }
            return a.shift();
          },
        });
      return [
        new zN(() => s(e), this.controller, Ps(this, _Je, "f")),
        new zN(() => s(t), this.controller, Ps(this, _Je, "f")),
      ];
    }
    toReadableStream() {
      let e = this,
        t;
      return kxr({
        async start() {
          t = e[Symbol.asyncIterator]();
        },
        async pull(r) {
          try {
            let { value: s, done: a } = await t.next();
            if (a) return r.close();
            let H = dJe(
              JSON.stringify(s) +
                `
`,
            );
            r.enqueue(H);
          } catch (s) {
            r.error(s);
          }
        },
        async cancel() {
          await t.return?.();
        },
      });
    }
  };
});