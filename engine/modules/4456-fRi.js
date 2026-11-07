
var fRi = ne(() => {
  RIr();
  IMr = class IMr extends Event {
    constructor(e, t) {
      var r, s;
      (super(e),
        (this.code = (r = t == null ? void 0 : t.code) != null ? r : void 0),
        (this.message = (s = t == null ? void 0 : t.message) != null ? s : void 0));
    }
    [Symbol.for("nodejs.util.inspect.custom")](e, t, r) {
      return r(ARi(this), t);
    }
    [Symbol.for("Deno.customInspect")](e, t) {
      return e(ARi(this), t);
    }
  };
  cPe = class cPe extends EventTarget {
    constructor(e, t) {
      var r, s;
      (super(),
        dx(this, I7),
        (this.CONNECTING = 0),
        (this.OPEN = 1),
        (this.CLOSED = 2),
        dx(this, Q8),
        dx(this, eLe),
        dx(this, iPe),
        dx(this, Kbt),
        dx(this, zbt),
        dx(this, qXe),
        dx(this, aPe),
        dx(this, GXe, null),
        dx(this, nce),
        dx(this, sPe),
        dx(this, HPe, null),
        dx(this, oPe, null),
        dx(this, WXe, null),
        dx(this, MMr, async (a) => {
          var H;
          dm(this, sPe).reset();
          let { body: u, redirected: f, status: d, headers: _ } = a;
          if (d === 204) {
            (hee(this, I7, VXe).call(this, "Server sent HTTP 204, not reconnecting", 204), this.close());
            return;
          }
          if ((f ? BE(this, iPe, new URL(a.url)) : BE(this, iPe, void 0), d !== 200)) {
            hee(this, I7, VXe).call(this, `Non-200 status code (${d})`, d);
            return;
          }
          if (!(_.get("content-type") || "").startsWith("text/event-stream")) {
            hee(this, I7, VXe).call(this, 'Invalid content type, expected "text/event-stream"', d);
            return;
          }
          if (dm(this, Q8) === this.CLOSED) return;
          BE(this, Q8, this.OPEN);
          let L = new Event("open");
          if (
            ((H = dm(this, WXe)) == null || H.call(this, L),
            this.dispatchEvent(L),
            typeof u != "object" || !u || !("getReader" in u))
          ) {
            (hee(this, I7, VXe).call(this, "Invalid response body, expected a web ReadableStream", d),
              this.close());
            return;
          }
          let I = new TextDecoder(),
            D = u.getReader(),
            S = !0;
          do {
            let { done: T, value: C } = await D.read();
            (C && dm(this, sPe).feed(I.decode(C, { stream: !T })),
              T && ((S = !1), dm(this, sPe).reset(), hee(this, I7, vMr).call(this)));
          } while (S);
        }),
        dx(this, xMr, (a) => {
          (BE(this, nce, void 0),
            !(a.name === "AbortError" || a.type === "aborted") && hee(this, I7, vMr).call(this, DMr(a)));
        }),
        dx(this, SMr, (a) => {
          typeof a.id == "string" && BE(this, GXe, a.id);
          let H = new MessageEvent(a.event || "message", {
            data: a.data,
            origin: dm(this, iPe) ? dm(this, iPe).origin : dm(this, eLe).origin,
            lastEventId: a.id || "",
          });
          (dm(this, oPe) && (!a.event || a.event === "message") && dm(this, oPe).call(this, H),
            this.dispatchEvent(H));
        }),
        dx(this, TMr, (a) => {
          BE(this, qXe, a);
        }),
        dx(this, bMr, () => {
          (BE(this, aPe, void 0), dm(this, Q8) === this.CONNECTING && hee(this, I7, yMr).call(this));
        }));
      try {
        if (e instanceof URL) BE(this, eLe, e);
        else if (typeof e == "string") BE(this, eLe, new URL(e, lFa()));
        else throw Error("Invalid URL");
      } catch {
        throw uFa("An invalid or illegal string was specified");
      }
      (BE(this, sPe, STt({ onEvent: dm(this, SMr), onRetry: dm(this, TMr) })),
        BE(this, Q8, this.CONNECTING),
        BE(this, qXe, 3000),
        BE(this, zbt, (r = t == null ? void 0 : t.fetch) != null ? r : globalThis.fetch),
        BE(this, Kbt, (s = t == null ? void 0 : t.withCredentials) != null ? s : !1),
        hee(this, I7, yMr).call(this));
    }
    get readyState() {
      return dm(this, Q8);
    }
    get url() {
      return dm(this, eLe).href;
    }
    get withCredentials() {
      return dm(this, Kbt);
    }
    get onerror() {
      return dm(this, HPe);
    }
    set onerror(e) {
      BE(this, HPe, e);
    }
    get onmessage() {
      return dm(this, oPe);
    }
    set onmessage(e) {
      BE(this, oPe, e);
    }
    get onopen() {
      return dm(this, WXe);
    }
    set onopen(e) {
      BE(this, WXe, e);
    }
    addEventListener(e, t, r) {
      let s = t;
      super.addEventListener(e, s, r);
    }
    removeEventListener(e, t, r) {
      let s = t;
      super.removeEventListener(e, s, r);
    }
    close() {
      (dm(this, aPe) && clearTimeout(dm(this, aPe)),
        dm(this, Q8) !== this.CLOSED &&
          (dm(this, nce) && dm(this, nce).abort(), BE(this, Q8, this.CLOSED), BE(this, nce, void 0)));
    }
  };
  ((Q8 = new WeakMap()),
    (eLe = new WeakMap()),
    (iPe = new WeakMap()),
    (Kbt = new WeakMap()),
    (zbt = new WeakMap()),
    (qXe = new WeakMap()),
    (aPe = new WeakMap()),
    (GXe = new WeakMap()),
    (nce = new WeakMap()),
    (sPe = new WeakMap()),
    (HPe = new WeakMap()),
    (oPe = new WeakMap()),
    (WXe = new WeakMap()),
    (I7 = new WeakSet()),
    (yMr = function () {
      (BE(this, Q8, this.CONNECTING),
        BE(this, nce, new AbortController()),
        dm(this, zbt)(dm(this, eLe), hee(this, I7, uRi).call(this))
          .then(dm(this, MMr))
          .catch(dm(this, xMr)));
    }),
    (MMr = new WeakMap()),
    (xMr = new WeakMap()),
    (uRi = function () {
      var e;
      let t = {
        mode: "cors",
        redirect: "follow",
        headers: {
          Accept: "text/event-stream",
          ...(dm(this, GXe) ? { "Last-Event-ID": dm(this, GXe) } : void 0),
        },
        cache: "no-store",
        signal: (e = dm(this, nce)) == null ? void 0 : e.signal,
      };
      return (
        "window" in globalThis && (t.credentials = this.withCredentials ? "include" : "same-origin"),
        t
      );
    }),
    (SMr = new WeakMap()),
    (TMr = new WeakMap()),
    (VXe = function (e, t) {
      var r;
      dm(this, Q8) !== this.CLOSED && BE(this, Q8, this.CLOSED);
      let s = new IMr("error", { code: t, message: e });
      ((r = dm(this, HPe)) == null || r.call(this, s), this.dispatchEvent(s));
    }),
    (vMr = function (e, t) {
      var r;
      if (dm(this, Q8) === this.CLOSED) return;
      BE(this, Q8, this.CONNECTING);
      let s = new IMr("error", { code: t, message: e });
      ((r = dm(this, HPe)) == null || r.call(this, s),
        this.dispatchEvent(s),
        BE(this, aPe, setTimeout(dm(this, bMr), dm(this, qXe))));
    }),
    (bMr = new WeakMap()),
    (cPe.CONNECTING = 0),
    (cPe.OPEN = 1),
    (cPe.CLOSED = 2));
});