
var aoe = Ie(function (gPn) {
  var hPn = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Nfo = hPn((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.tracing = e.metrics = void 0));
      var t = cr("diagnostics_channel");
      ((e.metrics = (0, t.channel)("lru-cache:metrics")), (e.tracing = (0, t.tracingChannel)("lru-cache")));
    }),
    Ffo = hPn((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.defaultPerf = void 0),
        (e.defaultPerf =
          typeof performance == "object" && performance && typeof performance.now == "function"
            ? performance
            : Date));
    });
  Object.defineProperty(gPn, "__esModule", { value: !0 });
  gPn.LRUCache = void 0;
  var vD = Nfo(),
    Bfo = Ffo(),
    kar = () => vD.metrics.hasSubscribers || vD.tracing.hasSubscribers,
    LPn = new Set(),
    _Pn = typeof process == "object" && process ? process : {},
    Rfo = (e, t, r, s) => {
      typeof _Pn.emitWarning == "function" ? _Pn.emitWarning(e, t, r, s) : console.error(`[${r}] ${t}: ${e}`);
    },
    Wfo = (e) => !LPn.has(e),
    ooe = (e) => !!e && e === Math.floor(e) && e > 0 && isFinite(e),
    $Pn = (e) =>
      ooe(e)
        ? e <= Math.pow(2, 8)
          ? Uint8Array
          : e <= Math.pow(2, 16)
            ? Uint16Array
            : e <= Math.pow(2, 32)
              ? Uint32Array
              : e <= Number.MAX_SAFE_INTEGER
                ? x$t
                : null
        : null,
    x$t = class extends Array {
      constructor(e) {
        (super(e), this.fill(0));
      }
    },
    Vfo = class e {
      heap;
      length;
      static #e = !1;
      static create(t) {
        let r = $Pn(t);
        if (!r) return [];
        e.#e = !0;
        let s = new e(t, r);
        return ((e.#e = !1), s);
      }
      constructor(t, r) {
        if (!e.#e) throw TypeError("instantiate Stack using Stack.create(n)");
        ((this.heap = new r(t)), (this.length = 0));
      }
      push(t) {
        this.heap[this.length++] = t;
      }
      pop() {
        return this.heap[--this.length];
      }
    },
    qfo = class e {
      #e;
      #r;
      #t;
      #n;
      #i;
      #s;
      #a;
      #c;
      get perf() {
        return this.#c;
      }
      ttl;
      ttlResolution;
      ttlAutopurge;
      updateAgeOnGet;
      updateAgeOnHas;
      allowStale;
      noDisposeOnSet;
      noUpdateTTL;
      maxEntrySize;
      sizeCalculation;
      noDeleteOnFetchRejection;
      noDeleteOnStaleGet;
      allowStaleOnFetchAbort;
      allowStaleOnFetchRejection;
      ignoreFetchAbort;
      backgroundFetchSize;
      #H;
      #f;
      #l;
      #A;
      #o;
      #m;
      #L;
      #$;
      #p;
      #h;
      #_;
      #y;
      #I;
      #g;
      #E;
      #D;
      #b;
      #u;
      #j;
      static unsafeExposeInternals(t) {
        return {
          starts: t.#I,
          ttls: t.#g,
          autopurgeTimers: t.#E,
          sizes: t.#y,
          keyMap: t.#l,
          keyList: t.#A,
          valList: t.#o,
          next: t.#m,
          prev: t.#L,
          get head() {
            return t.#$;
          },
          get tail() {
            return t.#p;
          },
          free: t.#h,
          isBackgroundFetch: (r) => t.#d(r),
          backgroundFetch: (r, s, a, H) => t.#N(r, s, a, H),
          moveToTail: (r) => t.#G(r),
          indexes: (r) => t.#S(r),
          rindexes: (r) => t.#v(r),
          isStale: (r) => t.#M(r),
        };
      }
      get max() {
        return this.#e;
      }
      get maxSize() {
        return this.#r;
      }
      get calculatedSize() {
        return this.#f;
      }
      get size() {
        return this.#H;
      }
      get fetchMethod() {
        return this.#s;
      }
      get memoMethod() {
        return this.#a;
      }
      get dispose() {
        return this.#t;
      }
      get onInsert() {
        return this.#n;
      }
      get disposeAfter() {
        return this.#i;
      }
      constructor(t) {
        let {
          max: r = 0,
          ttl: s,
          ttlResolution: a = 1,
          ttlAutopurge: H,
          updateAgeOnGet: u,
          updateAgeOnHas: f,
          allowStale: d,
          dispose: _,
          onInsert: L,
          disposeAfter: I,
          noDisposeOnSet: D,
          noUpdateTTL: S,
          maxSize: T = 0,
          maxEntrySize: C = 0,
          sizeCalculation: O,
          fetchMethod: B,
          memoMethod: V,
          noDeleteOnFetchRejection: q,
          noDeleteOnStaleGet: Z,
          allowStaleOnFetchRejection: se,
          allowStaleOnFetchAbort: ae,
          ignoreFetchAbort: z,
          backgroundFetchSize: Ae = 1,
          perf: le,
        } = t;
        if (((this.backgroundFetchSize = Ae), le !== void 0 && typeof le?.now != "function"))
          throw TypeError("perf option must have a now() method if specified");
        if (((this.#c = le ?? Bfo.defaultPerf), r !== 0 && !ooe(r)))
          throw TypeError("max option must be a nonnegative integer");
        let Be = r ? $Pn(r) : Array;
        if (!Be) throw Error("invalid max value: " + r);
        if (
          ((this.#e = r),
          (this.#r = T),
          (this.maxEntrySize = C || this.#r),
          (this.sizeCalculation = O),
          this.sizeCalculation)
        ) {
          if (!this.#r && !this.maxEntrySize)
            throw TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
          if (typeof this.sizeCalculation != "function")
            throw TypeError("sizeCalculation set to non-function");
        }
        if (V !== void 0 && typeof V != "function")
          throw TypeError("memoMethod must be a function if defined");
        if (((this.#a = V), B !== void 0 && typeof B != "function"))
          throw TypeError("fetchMethod must be a function if specified");
        if (
          ((this.#s = B),
          (this.#b = !!B),
          (this.#l = new Map()),
          (this.#A = Array.from({ length: r }).fill(void 0)),
          (this.#o = Array.from({ length: r }).fill(void 0)),
          (this.#m = new Be(r)),
          (this.#L = new Be(r)),
          (this.#$ = 0),
          (this.#p = 0),
          (this.#h = Vfo.create(r)),
          (this.#H = 0),
          (this.#f = 0),
          typeof _ == "function" && (this.#t = _),
          typeof L == "function" && (this.#n = L),
          typeof I == "function" ? ((this.#i = I), (this.#_ = [])) : ((this.#i = void 0), (this.#_ = void 0)),
          (this.#D = !!this.#t),
          (this.#j = !!this.#n),
          (this.#u = !!this.#i),
          (this.noDisposeOnSet = !!D),
          (this.noUpdateTTL = !!S),
          (this.noDeleteOnFetchRejection = !!q),
          (this.allowStaleOnFetchRejection = !!se),
          (this.allowStaleOnFetchAbort = !!ae),
          (this.ignoreFetchAbort = !!z),
          this.maxEntrySize !== 0)
        ) {
          if (this.#r !== 0 && !ooe(this.#r))
            throw TypeError("maxSize must be a positive integer if specified");
          if (!ooe(this.maxEntrySize))
            throw TypeError("maxEntrySize must be a positive integer if specified");
          this.#V();
        }
        if (
          ((this.allowStale = !!d),
          (this.noDeleteOnStaleGet = !!Z),
          (this.updateAgeOnGet = !!u),
          (this.updateAgeOnHas = !!f),
          (this.ttlResolution = ooe(a) || a === 0 ? a : 1),
          (this.ttlAutopurge = !!H),
          (this.ttl = s || 0),
          this.ttl)
        ) {
          if (!ooe(this.ttl)) throw TypeError("ttl must be a positive integer if specified");
          this.#P();
        }
        if (this.#e === 0 && this.ttl === 0 && this.#r === 0)
          throw TypeError("At least one of max, maxSize, or ttl is required");
        if (!this.ttlAutopurge && !this.#e && !this.#r) {
          let Te = "LRU_CACHE_UNBOUNDED";
          Wfo(Te) &&
            (LPn.add(Te),
            Rfo(
              "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.",
              "UnboundedCacheWarning",
              Te,
              e,
            ));
        }
      }
      getRemainingTTL(t) {
        return this.#l.has(t) ? 1 / 0 : 0;
      }
      #P() {
        let t = new x$t(this.#e),
          r = new x$t(this.#e);
        ((this.#g = t), (this.#I = r));
        let s = this.ttlAutopurge ? Array.from({ length: this.#e }) : void 0;
        ((this.#E = s),
          (this.#U = (f, d, _ = this.#c.now()) => {
            ((r[f] = d !== 0 ? _ : 0), (t[f] = d), a(f, d));
          }),
          (this.#x = (f) => {
            ((r[f] = t[f] !== 0 ? this.#c.now() : 0), a(f, t[f]));
          }));
        let a = this.ttlAutopurge
          ? (f, d) => {
              if ((s?.[f] && (clearTimeout(s[f]), (s[f] = void 0)), d && d !== 0 && s)) {
                let _ = setTimeout(() => {
                  this.#M(f) && this.#O(this.#A[f], "expire");
                }, d + 1);
                (_.unref && _.unref(), (s[f] = _));
              }
            }
          : () => {};
        this.#T = (f, d) => {
          if (t[d]) {
            let _ = t[d],
              L = r[d];
            if (!_ || !L) return;
            ((f.ttl = _), (f.start = L), (f.now = H || u()));
            let I = f.now - L;
            f.remainingTTL = _ - I;
          }
        };
        let H = 0,
          u = () => {
            let f = this.#c.now();
            if (this.ttlResolution > 0) {
              H = f;
              let d = setTimeout(() => (H = 0), this.ttlResolution);
              d.unref && d.unref();
            }
            return f;
          };
        ((this.getRemainingTTL = (f) => {
          let d = this.#l.get(f);
          if (d === void 0) return 0;
          let _ = t[d],
            L = r[d];
          if (!_ || !L) return 1 / 0;
          let I = (H || u()) - L;
          return _ - I;
        }),
          (this.#M = (f) => {
            let d = r[f],
              _ = t[f];
            return !!_ && !!d && (H || u()) - d > _;
          }));
      }
      #x = () => {};
      #T = () => {};
      #U = () => {};
      #M = () => !1;
      #V() {
        let t = new x$t(this.#e);
        ((this.#f = 0),
          (this.#y = t),
          (this.#w = (r) => {
            ((this.#f -= t[r]), (t[r] = 0));
          }),
          (this.#F = (r, s, a, H) => {
            if (!ooe(a)) {
              if (this.#d(s)) return this.backgroundFetchSize;
              if (H) {
                if (typeof H != "function") throw TypeError("sizeCalculation must be a function");
                if (((a = H(s, r)), !ooe(a)))
                  throw TypeError("sizeCalculation return invalid (expect positive integer)");
              } else
                throw TypeError(
                  "invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.",
                );
            }
            return a;
          }),
          (this.#C = (r, s, a) => {
            if (((t[r] = s), this.#r)) {
              let H = this.#r - t[r];
              for (; this.#f > H;) this.#R(!0);
            }
            ((this.#f += t[r]), a && ((a.entrySize = s), (a.totalCalculatedSize = this.#f)));
          }));
      }
      #w = (t) => {};
      #C = (t, r, s) => {};
      #F = (t, r, s, a) => {
        if (s || a) throw TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
        return 0;
      };
      *#S({ allowStale: t = this.allowStale } = {}) {
        if (this.#H)
          for (let r = this.#p; this.#B(r) && ((t || !this.#M(r)) && (yield r), r !== this.#$);)
            r = this.#L[r];
      }
      *#v({ allowStale: t = this.allowStale } = {}) {
        if (this.#H)
          for (let r = this.#$; this.#B(r) && ((t || !this.#M(r)) && (yield r), r !== this.#p);)
            r = this.#m[r];
      }
      #B(t) {
        return t !== void 0 && this.#l.get(this.#A[t]) === t;
      }
      *entries() {
        for (let t of this.#S())
          this.#o[t] !== void 0 &&
            this.#A[t] !== void 0 &&
            !this.#d(this.#o[t]) &&
            (yield [this.#A[t], this.#o[t]]);
      }
      *rentries() {
        for (let t of this.#v())
          this.#o[t] !== void 0 &&
            this.#A[t] !== void 0 &&
            !this.#d(this.#o[t]) &&
            (yield [this.#A[t], this.#o[t]]);
      }
      *keys() {
        for (let t of this.#S()) {
          let r = this.#A[t];
          r !== void 0 && !this.#d(this.#o[t]) && (yield r);
        }
      }
      *rkeys() {
        for (let t of this.#v()) {
          let r = this.#A[t];
          r !== void 0 && !this.#d(this.#o[t]) && (yield r);
        }
      }
      *values() {
        for (let t of this.#S()) this.#o[t] !== void 0 && !this.#d(this.#o[t]) && (yield this.#o[t]);
      }
      *rvalues() {
        for (let t of this.#v()) this.#o[t] !== void 0 && !this.#d(this.#o[t]) && (yield this.#o[t]);
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      [Symbol.toStringTag] = "LRUCache";
      find(t, r = {}) {
        for (let s of this.#S()) {
          let a = this.#o[s],
            H = this.#d(a) ? a.__staleWhileFetching : a;
          if (H !== void 0 && t(H, this.#A[s], this)) return this.#q(this.#A[s], r);
        }
      }
      forEach(t, r = this) {
        for (let s of this.#S()) {
          let a = this.#o[s],
            H = this.#d(a) ? a.__staleWhileFetching : a;
          H !== void 0 && t.call(r, H, this.#A[s], this);
        }
      }
      rforEach(t, r = this) {
        for (let s of this.#v()) {
          let a = this.#o[s],
            H = this.#d(a) ? a.__staleWhileFetching : a;
          H !== void 0 && t.call(r, H, this.#A[s], this);
        }
      }
      purgeStale() {
        let t = !1;
        for (let r of this.#v({ allowStale: !0 })) this.#M(r) && (this.#O(this.#A[r], "expire"), (t = !0));
        return t;
      }
      info(t) {
        let r = this.#l.get(t);
        if (r === void 0) return;
        let s = this.#o[r],
          a = this.#d(s) ? s.__staleWhileFetching : s;
        if (a === void 0) return;
        let H = { value: a };
        if (this.#g && this.#I) {
          let u = this.#g[r],
            f = this.#I[r];
          if (u && f) {
            let d = u - (this.#c.now() - f);
            ((H.ttl = d), (H.start = Date.now()));
          }
        }
        return (this.#y && (H.size = this.#y[r]), H);
      }
      dump() {
        let t = [];
        for (let r of this.#S({ allowStale: !0 })) {
          let s = this.#A[r],
            a = this.#o[r],
            H = this.#d(a) ? a.__staleWhileFetching : a;
          if (H === void 0 || s === void 0) continue;
          let u = { value: H };
          if (this.#g && this.#I) {
            u.ttl = this.#g[r];
            let f = this.#c.now() - this.#I[r];
            u.start = Math.floor(Date.now() - f);
          }
          (this.#y && (u.size = this.#y[r]), t.unshift([s, u]));
        }
        return t;
      }
      load(t) {
        this.clear();
        for (let [r, s] of t) {
          if (s.start) {
            let a = Date.now() - s.start;
            s.start = this.#c.now() - a;
          }
          this.#k(r, s.value, s);
        }
      }
      set(t, r, s = {}) {
        let { status: a = vD.metrics.hasSubscribers ? {} : void 0 } = s;
        ((s.status = a), a && ((a.op = "set"), (a.key = t), r !== void 0 && (a.value = r), (a.cache = this)));
        let H = this.#k(t, r, s);
        return (a && vD.metrics.hasSubscribers && vD.metrics.publish(a), H);
      }
      #k(t, r, s, a) {
        let {
            ttl: H = this.ttl,
            start: u,
            noDisposeOnSet: f = this.noDisposeOnSet,
            sizeCalculation: d = this.sizeCalculation,
            status: _,
          } = s,
          L = this.#d(r);
        if (r === void 0) return (_ && (_.set = "deleted"), this.delete(t), this);
        let { noUpdateTTL: I = this.noUpdateTTL } = s;
        _ && !L && (_.value = r);
        let D = this.#F(t, r, s.size || 0, d, _);
        if (this.maxEntrySize && D > this.maxEntrySize)
          return (this.#O(t, "set"), _ && ((_.set = "miss"), (_.maxEntrySizeExceeded = !0)), this);
        let S = this.#H === 0 ? void 0 : this.#l.get(t);
        if (S === void 0)
          ((S =
            this.#H === 0
              ? this.#p
              : this.#h.length !== 0
                ? this.#h.pop()
                : this.#H === this.#e
                  ? this.#R(!1)
                  : this.#H),
            (this.#A[S] = t),
            (this.#o[S] = r),
            this.#l.set(t, S),
            (this.#m[this.#p] = S),
            (this.#L[S] = this.#p),
            (this.#p = S),
            this.#H++,
            this.#C(S, D, _),
            _ && (_.set = "add"),
            (I = !1),
            this.#j && !L && this.#n?.(r, t, "add"));
        else {
          this.#G(S);
          let T = this.#o[S];
          if (r !== T) {
            if (!f)
              if (this.#d(T)) {
                T !== a && T.__abortController.abort(Error("replaced"));
                let { __staleWhileFetching: C } = T;
                C !== void 0 &&
                  C !== r &&
                  (this.#D && this.#t?.(C, t, "set"), this.#u && this.#_?.push([C, t, "set"]));
              } else (this.#D && this.#t?.(T, t, "set"), this.#u && this.#_?.push([T, t, "set"]));
            if ((this.#w(S), this.#C(S, D, _), (this.#o[S] = r), !L)) {
              let C = T && this.#d(T) ? T.__staleWhileFetching : T,
                O = C === void 0 ? "add" : r !== C ? "replace" : "update";
              (_ && ((_.set = O), C !== void 0 && (_.oldValue = C)), this.#j && this.onInsert?.(r, t, O));
            }
          } else L || (_ && (_.set = "update"), this.#j && this.onInsert?.(r, t, "update"));
        }
        if (
          (H !== 0 && !this.#g && this.#P(),
          this.#g && (I || this.#U(S, H, u), _ && this.#T(_, S)),
          !f && this.#u && this.#_)
        ) {
          let T = this.#_,
            C;
          for (; (C = T?.shift());) this.#i?.(...C);
        }
        return this;
      }
      pop() {
        try {
          for (; this.#H;) {
            let t = this.#o[this.#$];
            if ((this.#R(!0), this.#d(t))) {
              if (t.__staleWhileFetching) return t.__staleWhileFetching;
            } else if (t !== void 0) return t;
          }
        } finally {
          if (this.#u && this.#_) {
            let t = this.#_,
              r;
            for (; (r = t?.shift());) this.#i?.(...r);
          }
        }
      }
      #R(t) {
        let r = this.#$,
          s = this.#A[r],
          a = this.#o[r],
          H = this.#d(a);
        H && a.__abortController.abort(Error("evicted"));
        let u = H ? a.__staleWhileFetching : a;
        return (
          (this.#D || this.#u) &&
            u !== void 0 &&
            (this.#D && this.#t?.(u, s, "evict"), this.#u && this.#_?.push([u, s, "evict"])),
          this.#w(r),
          this.#E?.[r] && (clearTimeout(this.#E[r]), (this.#E[r] = void 0)),
          t && ((this.#A[r] = void 0), (this.#o[r] = void 0), this.#h.push(r)),
          this.#H === 1 ? ((this.#$ = this.#p = 0), (this.#h.length = 0)) : (this.#$ = this.#m[r]),
          this.#l.delete(s),
          this.#H--,
          r
        );
      }
      has(t, r = {}) {
        let { status: s = vD.metrics.hasSubscribers ? {} : void 0 } = r;
        ((r.status = s), s && ((s.op = "has"), (s.key = t), (s.cache = this)));
        let a = this.#J(t, r);
        return (vD.metrics.hasSubscribers && vD.metrics.publish(s), a);
      }
      #J(t, r = {}) {
        let { updateAgeOnHas: s = this.updateAgeOnHas, status: a } = r,
          H = this.#l.get(t);
        if (H !== void 0) {
          let u = this.#o[H];
          if (this.#d(u) && u.__staleWhileFetching === void 0) return !1;
          if (this.#M(H)) a && ((a.has = "stale"), this.#T(a, H));
          else return (s && this.#x(H), a && ((a.has = "hit"), this.#T(a, H)), !0);
        } else a && (a.has = "miss");
        return !1;
      }
      peek(t, r = {}) {
        let { status: s = kar() ? {} : void 0 } = r;
        (s && ((s.op = "peek"), (s.key = t), (s.cache = this)), (r.status = s));
        let a = this.#X(t, r);
        return (vD.metrics.hasSubscribers && vD.metrics.publish(s), a);
      }
      #X(t, r) {
        let { status: s, allowStale: a = this.allowStale } = r,
          H = this.#l.get(t);
        if (H === void 0 || (!a && this.#M(H))) {
          s && (s.peek = H === void 0 ? "miss" : "stale");
          return;
        }
        let u = this.#o[H],
          f = this.#d(u) ? u.__staleWhileFetching : u;
        return (s && (f !== void 0 ? ((s.peek = "hit"), (s.value = f)) : (s.peek = "miss")), f);
      }
      #N(t, r, s, a) {
        let H = r === void 0 ? void 0 : this.#o[r];
        if (this.#d(H)) return H;
        let u = new AbortController(),
          { signal: f } = s;
        f?.addEventListener("abort", () => u.abort(f.reason), { signal: u.signal });
        let d = { signal: u.signal, options: s, context: a },
          _ = (C, O = !1) => {
            let { aborted: B } = u.signal,
              V = s.ignoreFetchAbort && C !== void 0,
              q = s.ignoreFetchAbort || !!(s.allowStaleOnFetchAbort && C !== void 0);
            if (
              (s.status &&
                (B && !O
                  ? ((s.status.fetchAborted = !0),
                    (s.status.fetchError = u.signal.reason),
                    V && (s.status.fetchAbortIgnored = !0))
                  : (s.status.fetchResolved = !0)),
              B && !V && !O)
            )
              return I(u.signal.reason, q);
            let Z = S,
              se = this.#o[r];
            return (
              (se === S || (se === void 0 && V && O)) &&
                (C === void 0
                  ? Z.__staleWhileFetching !== void 0
                    ? (this.#o[r] = Z.__staleWhileFetching)
                    : this.#O(t, "fetch")
                  : (s.status && (s.status.fetchUpdated = !0), this.#k(t, C, d.options, Z))),
              C
            );
          },
          L = (C) => (s.status && ((s.status.fetchRejected = !0), (s.status.fetchError = C)), I(C, !1)),
          I = (C, O) => {
            let { aborted: B } = u.signal,
              V = B && s.allowStaleOnFetchAbort,
              q = V || s.allowStaleOnFetchRejection,
              Z = q || s.noDeleteOnFetchRejection,
              se = S;
            if (
              (this.#o[r] === S &&
                (!Z || (!O && se.__staleWhileFetching === void 0)
                  ? this.#O(t, "fetch")
                  : V || (this.#o[r] = se.__staleWhileFetching)),
              q)
            )
              return (
                s.status && se.__staleWhileFetching !== void 0 && (s.status.returnedStale = !0),
                se.__staleWhileFetching
              );
            if (se.__returned === se) throw C;
          },
          D = (C, O) => {
            let B = this.#s?.(t, H, d);
            (u.signal.addEventListener("abort", () => {
              (!s.ignoreFetchAbort || s.allowStaleOnFetchAbort) &&
                (C(void 0), s.allowStaleOnFetchAbort && (C = (V) => _(V, !0)));
            }),
              B && B instanceof Promise
                ? B.then((V) => C(V === void 0 ? void 0 : V), O)
                : B !== void 0 && C(B));
          };
        s.status && (s.status.fetchDispatched = !0);
        let S = new Promise(D).then(_, L),
          T = Object.assign(S, { __abortController: u, __staleWhileFetching: H, __returned: void 0 });
        return (
          r === void 0
            ? (this.#k(t, T, { ...d.options, status: void 0 }), (r = this.#l.get(t)))
            : (this.#o[r] = T),
          T
        );
      }
      #d(t) {
        if (!this.#b) return !1;
        let r = t;
        return (
          !!r &&
          r instanceof Promise &&
          r.hasOwnProperty("__staleWhileFetching") &&
          r.__abortController instanceof AbortController
        );
      }
      fetch(t, r = {}) {
        let s = vD.tracing.hasSubscribers,
          { status: a = kar() ? {} : void 0 } = r;
        ((r.status = a), a && r.context && (a.context = r.context));
        let H = this.#K(t, r);
        return (a && s && ((a.trace = !0), vD.tracing.tracePromise(() => H, a).catch(() => {})), H);
      }
      async #K(t, r = {}) {
        let {
          allowStale: s = this.allowStale,
          updateAgeOnGet: a = this.updateAgeOnGet,
          noDeleteOnStaleGet: H = this.noDeleteOnStaleGet,
          ttl: u = this.ttl,
          noDisposeOnSet: f = this.noDisposeOnSet,
          size: d = 0,
          sizeCalculation: _ = this.sizeCalculation,
          noUpdateTTL: L = this.noUpdateTTL,
          noDeleteOnFetchRejection: I = this.noDeleteOnFetchRejection,
          allowStaleOnFetchRejection: D = this.allowStaleOnFetchRejection,
          ignoreFetchAbort: S = this.ignoreFetchAbort,
          allowStaleOnFetchAbort: T = this.allowStaleOnFetchAbort,
          context: C,
          forceRefresh: O = !1,
          status: B,
          signal: V,
        } = r;
        if ((B && ((B.op = "fetch"), (B.key = t), O && (B.forceRefresh = !0), (B.cache = this)), !this.#b))
          return (
            B && (B.fetch = "get"),
            this.#q(t, { allowStale: s, updateAgeOnGet: a, noDeleteOnStaleGet: H, status: B })
          );
        let q = {
            allowStale: s,
            updateAgeOnGet: a,
            noDeleteOnStaleGet: H,
            ttl: u,
            noDisposeOnSet: f,
            size: d,
            sizeCalculation: _,
            noUpdateTTL: L,
            noDeleteOnFetchRejection: I,
            allowStaleOnFetchRejection: D,
            allowStaleOnFetchAbort: T,
            ignoreFetchAbort: S,
            status: B,
            signal: V,
          },
          Z = this.#l.get(t);
        if (Z === void 0) {
          B && (B.fetch = "miss");
          let se = this.#N(t, Z, q, C);
          return (se.__returned = se);
        } else {
          let se = this.#o[Z];
          if (this.#d(se)) {
            let le = s && se.__staleWhileFetching !== void 0;
            return (
              B && ((B.fetch = "inflight"), le && (B.returnedStale = !0)),
              le ? se.__staleWhileFetching : (se.__returned = se)
            );
          }
          let ae = this.#M(Z);
          if (!O && !ae) return (B && (B.fetch = "hit"), this.#G(Z), a && this.#x(Z), B && this.#T(B, Z), se);
          let z = this.#N(t, Z, q, C),
            Ae = z.__staleWhileFetching !== void 0 && s;
          return (
            B && ((B.fetch = ae ? "stale" : "refresh"), Ae && ae && (B.returnedStale = !0)),
            Ae ? z.__staleWhileFetching : (z.__returned = z)
          );
        }
      }
      forceFetch(t, r = {}) {
        let s = vD.tracing.hasSubscribers,
          { status: a = kar() ? {} : void 0 } = r;
        ((r.status = a), a && r.context && (a.context = r.context));
        let H = this.#W(t, r);
        return (a && s && ((a.trace = !0), vD.tracing.tracePromise(() => H, a).catch(() => {})), H);
      }
      async #W(t, r = {}) {
        let s = await this.#K(t, r);
        if (s === void 0) throw Error("fetch() returned undefined");
        return s;
      }
      memo(t, r = {}) {
        let { status: s = vD.metrics.hasSubscribers ? {} : void 0 } = r;
        ((r.status = s),
          s && ((s.op = "memo"), (s.key = t), r.context && (s.context = r.context), (s.cache = this)));
        let a = this.#Y(t, r);
        return (s && (s.value = a), vD.metrics.hasSubscribers && vD.metrics.publish(s), a);
      }
      #Y(t, r = {}) {
        let s = this.#a;
        if (!s) throw Error("no memoMethod provided to constructor");
        let { context: a, status: H, forceRefresh: u, ...f } = r;
        H && u && (H.forceRefresh = !0);
        let d = this.#q(t, f),
          _ = u || d === void 0;
        if ((H && ((H.memo = _ ? "miss" : "hit"), _ || (H.value = d)), !_)) return d;
        let L = s(t, d, { options: f, context: a });
        return (H && (H.value = L), this.#k(t, L, f), L);
      }
      get(t, r = {}) {
        let { status: s = vD.metrics.hasSubscribers ? {} : void 0 } = r;
        ((r.status = s), s && ((s.op = "get"), (s.key = t), (s.cache = this)));
        let a = this.#q(t, r);
        return (s && (a !== void 0 && (s.value = a), vD.metrics.hasSubscribers && vD.metrics.publish(s)), a);
      }
      #q(t, r = {}) {
        let {
            allowStale: s = this.allowStale,
            updateAgeOnGet: a = this.updateAgeOnGet,
            noDeleteOnStaleGet: H = this.noDeleteOnStaleGet,
            status: u,
          } = r,
          f = this.#l.get(t);
        if (f === void 0) {
          u && (u.get = "miss");
          return;
        }
        let d = this.#o[f],
          _ = this.#d(d);
        return (
          u && this.#T(u, f),
          this.#M(f)
            ? _
              ? (u && (u.get = "stale-fetching"),
                s && d.__staleWhileFetching !== void 0
                  ? (u && (u.returnedStale = !0), d.__staleWhileFetching)
                  : void 0)
              : (H || this.#O(t, "expire"),
                u && (u.get = "stale"),
                s ? (u && (u.returnedStale = !0), d) : void 0)
            : (u && (u.get = _ ? "fetching" : "hit"),
              this.#G(f),
              a && this.#x(f),
              _ ? d.__staleWhileFetching : d)
        );
      }
      #z(t, r) {
        ((this.#L[r] = t), (this.#m[t] = r));
      }
      #G(t) {
        t !== this.#p &&
          (t === this.#$ ? (this.#$ = this.#m[t]) : this.#z(this.#L[t], this.#m[t]),
          this.#z(this.#p, t),
          (this.#p = t));
      }
      delete(t) {
        return this.#O(t, "delete");
      }
      #O(t, r) {
        vD.metrics.hasSubscribers && vD.metrics.publish({ op: "delete", delete: r, key: t, cache: this });
        let s = !1;
        if (this.#H !== 0) {
          let a = this.#l.get(t);
          if (a !== void 0)
            if (
              (this.#E?.[a] && (clearTimeout(this.#E?.[a]), (this.#E[a] = void 0)), (s = !0), this.#H === 1)
            )
              this.#Q(r);
            else {
              this.#w(a);
              let H = this.#o[a];
              if (
                (this.#d(H)
                  ? H.__abortController.abort(Error("deleted"))
                  : (this.#D || this.#u) &&
                    (this.#D && this.#t?.(H, t, r), this.#u && this.#_?.push([H, t, r])),
                this.#l.delete(t),
                (this.#A[a] = void 0),
                (this.#o[a] = void 0),
                a === this.#p)
              )
                this.#p = this.#L[a];
              else if (a === this.#$) this.#$ = this.#m[a];
              else {
                let u = this.#L[a];
                this.#m[u] = this.#m[a];
                let f = this.#m[a];
                this.#L[f] = this.#L[a];
              }
              (this.#H--, this.#h.push(a));
            }
        }
        if (this.#u && this.#_?.length) {
          let a = this.#_,
            H;
          for (; (H = a?.shift());) this.#i?.(...H);
        }
        return s;
      }
      clear() {
        return this.#Q("delete");
      }
      #Q(t) {
        for (let r of this.#v({ allowStale: !0 })) {
          let s = this.#o[r];
          if (this.#d(s)) s.__abortController.abort(Error("deleted"));
          else {
            let a = this.#A[r];
            (this.#D && this.#t?.(s, a, t), this.#u && this.#_?.push([s, a, t]));
          }
        }
        if ((this.#l.clear(), this.#o.fill(void 0), this.#A.fill(void 0), this.#g && this.#I)) {
          (this.#g.fill(0), this.#I.fill(0));
          for (let r of this.#E ?? []) r !== void 0 && clearTimeout(r);
          this.#E?.fill(void 0);
        }
        if (
          (this.#y && this.#y.fill(0),
          (this.#$ = 0),
          (this.#p = 0),
          (this.#h.length = 0),
          (this.#f = 0),
          (this.#H = 0),
          this.#u && this.#_)
        ) {
          let r = this.#_,
            s;
          for (; (s = r?.shift());) this.#i?.(...s);
        }
      }
    };
  gPn.LRUCache = qfo;
});