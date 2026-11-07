
var tTr = ne(() => {
  nR();
  iR();
  bVi();
  $Ke();
  iR();
  r9 = class r9 {
    constructor(e, t, r) {
      ((this.iterator = e), gKe.set(this, void 0), (this.controller = t), wu(this, gKe, r, "f"));
    }
    static fromSSEResponse(e, t, r, s) {
      let a = !1,
        H = r ? Wy(r) : console;
      async function* u() {
        if (a) throw new bc("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        a = !0;
        let f = !1;
        try {
          for await (let d of zRa(e, t)) {
            if (f) continue;
            if (d.data.startsWith("[DONE]")) {
              f = !0;
              continue;
            }
            if (d.event === null || !d.event.startsWith("thread.")) {
              let _;
              try {
                _ = JSON.parse(d.data);
              } catch (L) {
                throw (
                  H.error("Could not parse message into JSON:", d.data),
                  H.error("From chunk:", d.raw),
                  L
                );
              }
              if (_ && _.error) throw new CI(void 0, _.error, void 0, e.headers);
              yield s ? { event: d.event, data: _ } : _;
            } else {
              let _;
              try {
                _ = JSON.parse(d.data);
              } catch (L) {
                throw (
                  console.error("Could not parse message into JSON:", d.data),
                  console.error("From chunk:", d.raw),
                  L
                );
              }
              if (d.event == "error") throw new CI(void 0, _.error, _.message, void 0);
              yield { event: d.event, data: _ };
            }
          }
          f = !0;
        } catch (d) {
          if (oKe(d)) return;
          throw d;
        } finally {
          if (!f) t.abort();
        }
      }
      return new r9(u, t, r);
    }
    static fromReadableStream(e, t, r) {
      let s = !1;
      async function* a() {
        let u = new GPe(),
          f = WSr(e);
        for await (let d of f) for (let _ of u.decode(d)) yield _;
        for (let d of u.flush()) yield d;
      }
      async function* H() {
        if (s) throw new bc("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        s = !0;
        let u = !1;
        try {
          for await (let f of a()) {
            if (u) continue;
            if (f) yield JSON.parse(f);
          }
          u = !0;
        } catch (f) {
          if (oKe(f)) return;
          throw f;
        } finally {
          if (!u) t.abort();
        }
      }
      return new r9(H, t, r);
    }
    [((gKe = new WeakMap()), Symbol.asyncIterator)]() {
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
        new r9(() => s(e), this.controller, us(this, gKe, "f")),
        new r9(() => s(t), this.controller, us(this, gKe, "f")),
      ];
    }
    toReadableStream() {
      let e = this,
        t;
      return RSr({
        async start() {
          t = e[Symbol.asyncIterator]();
        },
        async pull(r) {
          try {
            let { value: s, done: a } = await t.next();
            if (a) return r.close();
            let H = qPe(
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