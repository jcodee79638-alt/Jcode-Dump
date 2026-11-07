
var eai = Ie(function (Zpc, Zoi) {
  var pqo = cr("net"),
    dqo = cr("tls"),
    { once: Qoi } = cr("events"),
    Yoi = cr("timers/promises"),
    { normalizeOptions: mqo, cacheOptions: _qo } = Yfr(),
    { getProxy: hqo, getProxyAgent: Lqo, proxyCache: gpr } = $pr(),
    zoe = Lpr(),
    { Agent: $qo } = x4e();
  Zoi.exports = class extends $qo {
    #e;
    #r;
    #t;
    #n;
    #i;
    constructor(t = {}) {
      let { timeouts: r, proxy: s, noProxy: a, ...H } = mqo(t);
      super(H);
      if (((this.#e = H), (this.#r = r), s)) ((this.#t = new URL(s)), (this.#n = a), (this.#i = Lqo(s)));
    }
    get proxy() {
      return this.#t ? { url: this.#t.toString() } : {};
    }
    #s(t) {
      if (!this.#t) return;
      let r = hqo(`${t.protocol}//${t.host}:${t.port}`, { proxy: this.#t, noProxy: this.#n });
      if (!r) return;
      let s = _qo({ ...t, ...this.#e, timeouts: this.#r, proxy: r });
      if (gpr.has(s)) return gpr.get(s);
      let a = this.#i;
      if (Array.isArray(a)) a = this.isSecureEndpoint(t) ? a[1] : a[0];
      let H = new a(r, { ...this.#e, socketOptions: { family: this.#e.family } });
      return (gpr.set(s, H), H);
    }
    async #a({ promises: t, options: r, timeout: s }, a = new AbortController()) {
      if (s) {
        let u = Yoi.setTimeout(s, null, { signal: a.signal })
          .then(() => {
            throw new zoe.ConnectionTimeoutError(`${r.host}:${r.port}`);
          })
          .catch((f) => {
            if (f.name === "AbortError") return;
            throw f;
          });
        t.push(u);
      }
      let H;
      try {
        ((H = await Promise.race(t)), a.abort());
      } catch (u) {
        throw (a.abort(), u);
      }
      return H;
    }
    async connect(t, r) {
      r.lookup ??= this.#e.lookup;
      let s,
        a = this.#r.connection,
        H = this.isSecureEndpoint(r),
        u = this.#s(r);
      if (u) {
        let L = Date.now();
        if (((s = await this.#a({ options: r, timeout: a, promises: [u.connect(t, r)] })), a))
          a = a - (Date.now() - L);
      } else s = (H ? dqo : pqo).connect(r);
      (s.setKeepAlive(this.keepAlive, this.keepAliveMsecs), s.setNoDelay(this.keepAlive));
      let f = new AbortController(),
        { signal: d } = f,
        _ = s[H ? "secureConnecting" : "connecting"]
          ? Qoi(s, H ? "secureConnect" : "connect", { signal: d })
          : Promise.resolve();
      if (
        (await this.#a(
          {
            options: r,
            timeout: a,
            promises: [
              _,
              Qoi(s, "error", { signal: d }).then((L) => {
                throw L[0];
              }),
            ],
          },
          f,
        ),
        this.#r.idle)
      )
        s.setTimeout(this.#r.idle, () => {
          s.destroy(new zoe.IdleTimeoutError(`${r.host}:${r.port}`));
        });
      return s;
    }
    addRequest(t, r) {
      let s = this.#s(r);
      if (s?.setRequestProps) s.setRequestProps(t, r);
      if ((t.setHeader("connection", this.keepAlive ? "keep-alive" : "close"), this.#r.response)) {
        let a;
        (t.once("finish", () => {
          setTimeout(() => {
            t.destroy(new zoe.ResponseTimeoutError(t, this.#t));
          }, this.#r.response);
        }),
          t.once("response", () => {
            clearTimeout(a);
          }));
      }
      if (this.#r.transfer) {
        let a;
        t.once("response", (H) => {
          (setTimeout(() => {
            H.destroy(new zoe.TransferTimeoutError(t, this.#t));
          }, this.#r.transfer),
            H.once("close", () => {
              clearTimeout(a);
            }));
        });
      }
      return super.addRequest(t, r);
    }
    createSocket(t, r, s) {
      super.createSocket(t, r, (a, H) => {
        if (a) this.#c(t, r);
        s(a, H);
      });
    }
    #c(t, r) {
      let s = this.getName(r),
        a = this.requests[s];
      if (!a || a.length === 0) return;
      let H = a.indexOf(t);
      if (H !== -1) a.splice(H, 1);
      if (a.length === 0) {
        delete this.requests[s];
        return;
      }
      if (
        (this.sockets[s] ? this.sockets[s].length : 0) >= this.maxSockets ||
        this.totalSocketCount >= this.maxTotalSockets
      )
        return;
      let f = a.shift();
      if (a.length === 0) delete this.requests[s];
      this.createSocket(f, r, (d, _) => {
        if (d) f.onSocket(null, d);
        else f.onSocket(_);
      });
    }
  };
});