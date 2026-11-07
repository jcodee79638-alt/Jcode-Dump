
var w0n = ne(() => {
  ((i0n = "\x00SLASH" + Math.random() + "\x00"),
    (s0n = "\x00OPEN" + Math.random() + "\x00"),
    (rnr = "\x00CLOSE" + Math.random() + "\x00"),
    (o0n = "\x00COMMA" + Math.random() + "\x00"),
    (a0n = "\x00PERIOD" + Math.random() + "\x00"),
    (p5s = new RegExp(i0n, "g")),
    (d5s = new RegExp(s0n, "g")),
    (m5s = new RegExp(rnr, "g")),
    (_5s = new RegExp(o0n, "g")),
    (h5s = new RegExp(a0n, "g")),
    (L5s = /\\\\/g),
    ($5s = /\\{/g),
    (g5s = /\\}/g),
    (E5s = /\\,/g),
    (I5s = /\\\./g));
  ((O5s = {
    "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}"],
    "[:alpha:]": ["\\p{L}\\p{Nl}"],
    "[:ascii:]": ["\\x00-\\x7f"],
    "[:blank:]": ["\\p{Zs}\\t"],
    "[:cntrl:]": ["\\p{Cc}"],
    "[:digit:]": ["\\p{Nd}"],
    "[:graph:]": ["\\p{Z}\\p{C}", !0],
    "[:lower:]": ["\\p{Ll}"],
    "[:print:]": ["\\p{C}", !0],
    "[:punct:]": ["\\p{P}\\p{S}"],
    "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f"],
    "[:upper:]": ["\\p{Lu}"],
    "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}"],
    "[:xdigit:]": ["A-Fa-f0-9"],
  }),
    (Orr = /$./),
    (zrr = { t: "match", id: 0 }),
    (Q5s = /[/\ud800-\udfff]/),
    (Y5s = /[\ud800-\udfff]/),
    (p0n =
      typeof process == "object" && process
        ? process.env?.__MINIMATCH_TESTING_PLATFORM__ || "win32"
        : "posix"),
    (kgn = { win32: { sep: "\\" }, posix: { sep: "/" } }),
    (Z5s = p0n === "win32" ? kgn.win32.sep : kgn.posix.sep));
  XU.sep = Z5s;
  yD = Symbol("globstar **");
  XU.GLOBSTAR = yD;
  XU.filter = eXs;
  XU.defaults = tXs;
  XU.braceExpand = d0n;
  XU.match = rXs;
  Ogn = /[?*]|[+@!]\(.*?\)|\[|\]/;
  XU.Minimatch = vde;
  XU.escape = inr;
  XU.unescape = f0n;
  ((qv = aXs("lru-cache:metrics")),
    (q3e = oXs("lru-cache")),
    (HXs =
      typeof performance == "object" && performance && typeof performance.now == "function"
        ? performance
        : Date),
    (_0n = new Set()),
    (Bgn = typeof process == "object" && process ? process : {}),
    (Fmt = class extends Array {
      constructor(e) {
        (super(e), this.fill(0));
      }
    }),
    (Gmt = class e {
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
        if (((this.#c = le ?? HXs), r !== 0 && !yse(r)))
          throw TypeError("max option must be a nonnegative integer");
        let Be = r ? h0n(r) : Array;
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
          (this.#h = uXs.create(r)),
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
          if (this.#r !== 0 && !yse(this.#r))
            throw TypeError("maxSize must be a positive integer if specified");
          if (!yse(this.maxEntrySize))
            throw TypeError("maxEntrySize must be a positive integer if specified");
          this.#V();
        }
        if (
          ((this.allowStale = !!d),
          (this.noDeleteOnStaleGet = !!Z),
          (this.updateAgeOnGet = !!u),
          (this.updateAgeOnHas = !!f),
          (this.ttlResolution = yse(a) || a === 0 ? a : 1),
          (this.ttlAutopurge = !!H),
          (this.ttl = s || 0),
          this.ttl)
        ) {
          if (!yse(this.ttl)) throw TypeError("ttl must be a positive integer if specified");
          this.#P();
        }
        if (this.#e === 0 && this.ttl === 0 && this.#r === 0)
          throw TypeError("At least one of max, maxSize, or ttl is required");
        if (!this.ttlAutopurge && !this.#e && !this.#r) {
          let Te = "LRU_CACHE_UNBOUNDED";
          AXs(Te) &&
            (_0n.add(Te),
            cXs(
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
        let t = new Fmt(this.#e),
          r = new Fmt(this.#e);
        ((this.#g = t), (this.#I = r));
        let s = this.ttlAutopurge ? Array.from({ length: this.#e }) : void 0;
        ((this.#E = s),
          (this.#U = (d, _, L = this.#c.now()) => {
            ((r[d] = _ !== 0 ? L : 0), (t[d] = _), a(d, _));
          }),
          (this.#x = (d) => {
            ((r[d] = t[d] !== 0 ? this.#c.now() : 0), a(d, t[d]));
          }));
        let a = this.ttlAutopurge
          ? (d, _) => {
              if ((s?.[d] && (clearTimeout(s[d]), (s[d] = void 0)), _ && _ !== 0 && s)) {
                let L = setTimeout(() => {
                  this.#M(d) ? (this.#O(this.#A[d], "expire"), (s[d] = void 0)) : a(d, f(d));
                }, _ + 1);
                (L.unref && L.unref(), (s[d] = L));
              }
            }
          : () => {};
        this.#T = (d, _) => {
          if (t[_]) {
            let L = t[_],
              I = r[_];
            if (!L || !I) return;
            ((d.ttl = L), (d.start = I), (d.now = H || u()));
            let D = d.now - I;
            d.remainingTTL = L - D;
          }
        };
        let H = 0,
          u = () => {
            let d = this.#c.now();
            if (this.ttlResolution > 0) {
              H = d;
              let _ = setTimeout(() => (H = 0), this.ttlResolution);
              _.unref && _.unref();
            }
            return d;
          };
        this.getRemainingTTL = (d) => {
          let _ = this.#l.get(d);
          return _ === void 0 ? 0 : f(_);
        };
        let f = (d) => {
          let _ = t[d],
            L = r[d];
          if (!_ || !L) return 1 / 0;
          let I = (H || u()) - L;
          return _ - I;
        };
        this.#M = (d) => {
          let _ = r[d],
            L = t[d];
          return !!L && !!_ && (H || u()) - _ > L;
        };
      }
      #x = () => {};
      #T = () => {};
      #U = () => {};
      #M = () => !1;
      #V() {
        let t = new Fmt(this.#e);
        ((this.#f = 0),
          (this.#y = t),
          (this.#w = (r) => {
            ((this.#f -= t[r]), (t[r] = 0));
          }),
          (this.#F = (r, s, a, H) => {
            if (!yse(a)) {
              if (this.#d(s)) return this.backgroundFetchSize;
              if (H) {
                if (typeof H != "function") throw TypeError("sizeCalculation must be a function");
                if (((a = H(s, r)), !yse(a)))
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
        let { status: a = qv.hasSubscribers ? {} : void 0 } = s;
        ((s.status = a), a && ((a.op = "set"), (a.key = t), r !== void 0 && (a.value = r), (a.cache = this)));
        let H = this.#k(t, r, s);
        return (a && qv.hasSubscribers && qv.publish(a), H);
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
        let { status: s = qv.hasSubscribers ? {} : void 0 } = r;
        ((r.status = s), s && ((s.op = "has"), (s.key = t), (s.cache = this)));
        let a = this.#J(t, r);
        return (qv.hasSubscribers && qv.publish(s), a);
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
        let { status: s = Brr() ? {} : void 0 } = r;
        (s && ((s.op = "peek"), (s.key = t), (s.cache = this)), (r.status = s));
        let a = this.#X(t, r);
        return (qv.hasSubscribers && qv.publish(s), a);
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
        let s = q3e.hasSubscribers,
          { status: a = Brr() ? {} : void 0 } = r;
        ((r.status = a), a && r.context && (a.context = r.context));
        let H = this.#K(t, r);
        return (a && s && ((a.trace = !0), q3e.tracePromise(() => H, a).catch(() => {})), H);
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
        let s = q3e.hasSubscribers,
          { status: a = Brr() ? {} : void 0 } = r;
        ((r.status = a), a && r.context && (a.context = r.context));
        let H = this.#W(t, r);
        return (a && s && ((a.trace = !0), q3e.tracePromise(() => H, a).catch(() => {})), H);
      }
      async #W(t, r = {}) {
        let s = await this.#K(t, r);
        if (s === void 0) throw Error("fetch() returned undefined");
        return s;
      }
      memo(t, r = {}) {
        let { status: s = qv.hasSubscribers ? {} : void 0 } = r;
        ((r.status = s),
          s && ((s.op = "memo"), (s.key = t), r.context && (s.context = r.context), (s.cache = this)));
        let a = this.#Y(t, r);
        return (s && (s.value = a), qv.hasSubscribers && qv.publish(s), a);
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
        let { status: s = qv.hasSubscribers ? {} : void 0 } = r;
        ((r.status = s), s && ((s.op = "get"), (s.key = t), (s.cache = this)));
        let a = this.#q(t, r);
        return (s && (a !== void 0 && (s.value = a), qv.hasSubscribers && qv.publish(s)), a);
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
        qv.hasSubscribers && qv.publish({ op: "delete", delete: r, key: t, cache: this });
        let s = !1;
        if (this.#H !== 0) {
          let a = this.#l.get(t);
          if (a !== void 0)
            if ((this.#E?.[a] && (clearTimeout(this.#E[a]), (this.#E[a] = void 0)), (s = !0), this.#H === 1))
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
    }),
    (Rgn = typeof process == "object" && process ? process : { stdout: null, stderr: null }),
    (dY = Symbol("EOF")),
    (mY = Symbol("maybeEmitEnd")),
    (Dse = Symbol("emittedEnd")),
    (vmt = Symbol("emittingEnd")),
    (F3e = Symbol("emittedError")),
    (bmt = Symbol("closed")),
    (Wgn = Symbol("read")),
    (jmt = Symbol("flush")),
    (Vgn = Symbol("flushChunk")),
    (lV = Symbol("encoding")),
    (_Me = Symbol("decoder")),
    (WS = Symbol("flowing")),
    (B3e = Symbol("paused")),
    (hMe = Symbol("resume")),
    (VS = Symbol("buffer")),
    (fw = Symbol("pipes")),
    (qS = Symbol("bufferLength")),
    (Rrr = Symbol("bufferPush")),
    (Pmt = Symbol("bufferShift")),
    (Rj = Symbol("objectMode")),
    (Ty = Symbol("destroyed")),
    (Wrr = Symbol("error")),
    (Vrr = Symbol("emitData")),
    (qgn = Symbol("emitEnd")),
    (qrr = Symbol("emitEnd2")),
    (PG = Symbol("async")),
    (Grr = Symbol("abort")),
    (Cmt = Symbol("aborted")),
    (R3e = Symbol("signal")),
    (xde = Symbol("dataListeners")),
    (GU = Symbol("discarded")),
    (jXs = class extends $0n {
      unpipe() {
        (this.src.removeListener("error", this.proxyErrors), super.unpipe());
      }
      constructor(e, t, r) {
        (super(e, t, r),
          (this.proxyErrors = (s) => this.dest.emit("error", s)),
          e.on("error", this.proxyErrors));
      }
    }),
    (Vmt = class extends snr {
      [WS] = !1;
      [B3e] = !1;
      [fw] = [];
      [VS] = [];
      [Rj];
      [lV];
      [PG];
      [_Me];
      [dY] = !1;
      [Dse] = !1;
      [vmt] = !1;
      [bmt] = !1;
      [F3e] = null;
      [qS] = 0;
      [Ty] = !1;
      [R3e];
      [Cmt] = !1;
      [xde] = 0;
      [GU] = !1;
      writable = !0;
      readable = !0;
      constructor(...e) {
        let t = e[0] || {};
        if ((super(), t.objectMode && typeof t.encoding == "string"))
          throw TypeError("Encoding and objectMode may not be used together");
        (PXs(t)
          ? ((this[Rj] = !0), (this[lV] = null))
          : CXs(t)
            ? ((this[lV] = t.encoding), (this[Rj] = !1))
            : ((this[Rj] = !1), (this[lV] = null)),
          (this[PG] = !!t.async),
          (this[_Me] = this[lV] ? new DXs(this[lV]) : null),
          t && t.debugExposeBuffer === !0 && Object.defineProperty(this, "buffer", { get: () => this[VS] }),
          t && t.debugExposePipes === !0 && Object.defineProperty(this, "pipes", { get: () => this[fw] }));
        let { signal: r } = t;
        r && ((this[R3e] = r), r.aborted ? this[Grr]() : r.addEventListener("abort", () => this[Grr]()));
      }
      get bufferLength() {
        return this[qS];
      }
      get encoding() {
        return this[lV];
      }
      set encoding(e) {
        throw Error("Encoding must be set at instantiation time");
      }
      setEncoding(e) {
        throw Error("Encoding must be set at instantiation time");
      }
      get objectMode() {
        return this[Rj];
      }
      set objectMode(e) {
        throw Error("objectMode must be set at instantiation time");
      }
      get async() {
        return this[PG];
      }
      set async(e) {
        this[PG] = this[PG] || !!e;
      }
      [Grr]() {
        ((this[Cmt] = !0), this.emit("abort", this[R3e]?.reason), this.destroy(this[R3e]?.reason));
      }
      get aborted() {
        return this[Cmt];
      }
      set aborted(e) {}
      write(e, t, r) {
        if (this[Cmt]) return !1;
        if (this[dY]) throw Error("write after end");
        if (this[Ty])
          return (
            this.emit(
              "error",
              Object.assign(Error("Cannot call write after a stream was destroyed"), {
                code: "ERR_STREAM_DESTROYED",
              }),
            ),
            !0
          );
        (typeof t == "function" && ((r = t), (t = "utf8")), t || (t = "utf8"));
        let s = this[PG] ? W3e : SXs;
        if (!this[Rj] && !Buffer.isBuffer(e)) {
          if (bXs(e)) e = Buffer.from(e.buffer, e.byteOffset, e.byteLength);
          else if (vXs(e)) e = Buffer.from(e);
          else if (typeof e != "string") throw Error("Non-contiguous data written to non-objectMode stream");
        }
        return this[Rj]
          ? (this[WS] && this[qS] !== 0 && this[jmt](!0),
            this[WS] ? this.emit("data", e) : this[Rrr](e),
            this[qS] !== 0 && this.emit("readable"),
            r && s(r),
            this[WS])
          : e.length
            ? (typeof e == "string" && !(t === this[lV] && !this[_Me]?.lastNeed) && (e = Buffer.from(e, t)),
              Buffer.isBuffer(e) && this[lV] && (e = this[_Me].write(e)),
              this[WS] && this[qS] !== 0 && this[jmt](!0),
              this[WS] ? this.emit("data", e) : this[Rrr](e),
              this[qS] !== 0 && this.emit("readable"),
              r && s(r),
              this[WS])
            : (this[qS] !== 0 && this.emit("readable"), r && s(r), this[WS]);
      }
      read(e) {
        if (this[Ty]) return null;
        if (((this[GU] = !1), this[qS] === 0 || e === 0 || (e && e > this[qS]))) return (this[mY](), null);
        (this[Rj] && (e = null),
          this[VS].length > 1 &&
            !this[Rj] &&
            (this[VS] = [this[lV] ? this[VS].join("") : Buffer.concat(this[VS], this[qS])]));
        let t = this[Wgn](e || null, this[VS][0]);
        return (this[mY](), t);
      }
      [Wgn](e, t) {
        if (this[Rj]) this[Pmt]();
        else {
          let r = t;
          e === r.length || e === null
            ? this[Pmt]()
            : typeof r == "string"
              ? ((this[VS][0] = r.slice(e)), (t = r.slice(0, e)), (this[qS] -= e))
              : ((this[VS][0] = r.subarray(e)), (t = r.subarray(0, e)), (this[qS] -= e));
        }
        return (this.emit("data", t), !this[VS].length && !this[dY] && this.emit("drain"), t);
      }
      end(e, t, r) {
        return (
          typeof e == "function" && ((r = e), (e = void 0)),
          typeof t == "function" && ((r = t), (t = "utf8")),
          e !== void 0 && this.write(e, t),
          r && this.once("end", r),
          (this[dY] = !0),
          (this.writable = !1),
          (this[WS] || !this[B3e]) && this[mY](),
          this
        );
      }
      [hMe]() {
        this[Ty] ||
          (!this[xde] && !this[fw].length && (this[GU] = !0),
          (this[B3e] = !1),
          (this[WS] = !0),
          this.emit("resume"),
          this[VS].length ? this[jmt]() : this[dY] ? this[mY]() : this.emit("drain"));
      }
      resume() {
        return this[hMe]();
      }
      pause() {
        ((this[WS] = !1), (this[B3e] = !0), (this[GU] = !1));
      }
      get destroyed() {
        return this[Ty];
      }
      get flowing() {
        return this[WS];
      }
      get paused() {
        return this[B3e];
      }
      [Rrr](e) {
        (this[Rj] ? (this[qS] += 1) : (this[qS] += e.length), this[VS].push(e));
      }
      [Pmt]() {
        return (this[Rj] ? (this[qS] -= 1) : (this[qS] -= this[VS][0].length), this[VS].shift());
      }
      [jmt](e = !1) {
        do;
        while (this[Vgn](this[Pmt]()) && this[VS].length);
        !e && !this[VS].length && !this[dY] && this.emit("drain");
      }
      [Vgn](e) {
        return (this.emit("data", e), this[WS]);
      }
      pipe(e, t) {
        if (this[Ty]) return e;
        this[GU] = !1;
        let r = this[Dse];
        return (
          (t = t || {}),
          e === Rgn.stdout || e === Rgn.stderr ? (t.end = !1) : (t.end = t.end !== !1),
          (t.proxyErrors = !!t.proxyErrors),
          r
            ? t.end && e.end()
            : (this[fw].push(t.proxyErrors ? new jXs(this, e, t) : new $0n(this, e, t)),
              this[PG] ? W3e(() => this[hMe]()) : this[hMe]()),
          e
        );
      }
      unpipe(e) {
        let t = this[fw].find((r) => r.dest === e);
        t &&
          (this[fw].length === 1
            ? (this[WS] && this[xde] === 0 && (this[WS] = !1), (this[fw] = []))
            : this[fw].splice(this[fw].indexOf(t), 1),
          t.unpipe());
      }
      addListener(e, t) {
        return this.on(e, t);
      }
      on(e, t) {
        let r = super.on(e, t);
        if (e === "data") ((this[GU] = !1), this[xde]++, !this[fw].length && !this[WS] && this[hMe]());
        else if (e === "readable" && this[qS] !== 0) super.emit("readable");
        else if (TXs(e) && this[Dse]) (super.emit(e), this.removeAllListeners(e));
        else if (e === "error" && this[F3e]) {
          let s = t;
          this[PG] ? W3e(() => s.call(this, this[F3e])) : s.call(this, this[F3e]);
        }
        return r;
      }
      removeListener(e, t) {
        return this.off(e, t);
      }
      off(e, t) {
        let r = super.off(e, t);
        return (
          e === "data" &&
            ((this[xde] = this.listeners("data").length),
            this[xde] === 0 && !this[GU] && !this[fw].length && (this[WS] = !1)),
          r
        );
      }
      removeAllListeners(e) {
        let t = super.removeAllListeners(e);
        return (
          (e === "data" || e === void 0) &&
            ((this[xde] = 0), !this[GU] && !this[fw].length && (this[WS] = !1)),
          t
        );
      }
      get emittedEnd() {
        return this[Dse];
      }
      [mY]() {
        !this[vmt] &&
          !this[Dse] &&
          !this[Ty] &&
          this[VS].length === 0 &&
          this[dY] &&
          ((this[vmt] = !0),
          this.emit("end"),
          this.emit("prefinish"),
          this.emit("finish"),
          this[bmt] && this.emit("close"),
          (this[vmt] = !1));
      }
      emit(e, ...t) {
        let r = t[0];
        if (e !== "error" && e !== "close" && e !== Ty && this[Ty]) return !1;
        if (e === "data")
          return !this[Rj] && !r ? !1 : this[PG] ? (W3e(() => this[Vrr](r)), !0) : this[Vrr](r);
        if (e === "end") return this[qgn]();
        if (e === "close") {
          if (((this[bmt] = !0), !this[Dse] && !this[Ty])) return !1;
          let a = super.emit("close");
          return (this.removeAllListeners("close"), a);
        } else if (e === "error") {
          ((this[F3e] = r), super.emit(Wrr, r));
          let a = !this[R3e] || this.listeners("error").length ? super.emit("error", r) : !1;
          return (this[mY](), a);
        } else if (e === "resume") {
          let a = super.emit("resume");
          return (this[mY](), a);
        } else if (e === "finish" || e === "prefinish") {
          let a = super.emit(e);
          return (this.removeAllListeners(e), a);
        }
        let s = super.emit(e, ...t);
        return (this[mY](), s);
      }
      [Vrr](e) {
        for (let r of this[fw]) r.dest.write(e) === !1 && this.pause();
        let t = this[GU] ? !1 : super.emit("data", e);
        return (this[mY](), t);
      }
      [qgn]() {
        return this[Dse]
          ? !1
          : ((this[Dse] = !0), (this.readable = !1), this[PG] ? (W3e(() => this[qrr]()), !0) : this[qrr]());
      }
      [qrr]() {
        if (this[_Me]) {
          let t = this[_Me].end();
          if (t) {
            for (let r of this[fw]) r.dest.write(t);
            this[GU] || super.emit("data", t);
          }
        }
        for (let t of this[fw]) t.end();
        let e = super.emit("end");
        return (this.removeAllListeners("end"), e);
      }
      async collect() {
        let e = Object.assign([], { dataLength: 0 });
        this[Rj] || (e.dataLength = 0);
        let t = this.promise();
        return (
          this.on("data", (r) => {
            (e.push(r), this[Rj] || (e.dataLength += r.length));
          }),
          await t,
          e
        );
      }
      async concat() {
        if (this[Rj]) throw Error("cannot concat in objectMode");
        let e = await this.collect();
        return this[lV] ? e.join("") : Buffer.concat(e, e.dataLength);
      }
      async promise() {
        return new Promise((e, t) => {
          (this.on(Ty, () => t(Error("stream destroyed"))),
            this.on("error", (r) => t(r)),
            this.on("end", () => e()));
        });
      }
      [Symbol.asyncIterator]() {
        this[GU] = !1;
        let e = !1,
          t = async () => (this.pause(), (e = !0), { value: void 0, done: !0 });
        return {
          next: () => {
            if (e) return t();
            let r = this.read();
            if (r !== null) return Promise.resolve({ done: !1, value: r });
            if (this[dY]) return t();
            let s,
              a,
              H = (_) => {
                (this.off("data", u), this.off("end", f), this.off(Ty, d), t(), a(_));
              },
              u = (_) => {
                (this.off("error", H),
                  this.off("end", f),
                  this.off(Ty, d),
                  this.pause(),
                  s({ value: _, done: !!this[dY] }));
              },
              f = () => {
                (this.off("error", H),
                  this.off("data", u),
                  this.off(Ty, d),
                  t(),
                  s({ done: !0, value: void 0 }));
              },
              d = () => H(Error("stream destroyed"));
            return new Promise((_, L) => {
              ((a = L),
                (s = _),
                this.once(Ty, d),
                this.once("error", H),
                this.once("end", f),
                this.once("data", u));
            });
          },
          throw: t,
          return: t,
          [Symbol.asyncIterator]() {
            return this;
          },
          [Symbol.asyncDispose]: async () => {},
        };
      }
      [Symbol.iterator]() {
        this[GU] = !1;
        let e = !1,
          t = () => (
            this.pause(),
            this.off(Wrr, t),
            this.off(Ty, t),
            this.off("end", t),
            (e = !0),
            { done: !0, value: void 0 }
          ),
          r = () => {
            if (e) return t();
            let s = this.read();
            return s === null ? t() : { done: !1, value: s };
          };
        return (
          this.once("end", t),
          this.once(Wrr, t),
          this.once(Ty, t),
          {
            next: r,
            throw: t,
            return: t,
            [Symbol.iterator]() {
              return this;
            },
            [Symbol.dispose]: () => {},
          }
        );
      }
      destroy(e) {
        if (this[Ty]) return (e ? this.emit("error", e) : this.emit(Ty), this);
        ((this[Ty] = !0), (this[GU] = !0), (this[VS].length = 0), (this[qS] = 0));
        let t = this;
        return (
          typeof t.close == "function" && !this[bmt] && t.close(),
          e ? this.emit("error", e) : this.emit(Ty),
          this
        );
      }
      static get isStream() {
        return yXs;
      }
    }),
    (wXs = hXs.native),
    (G3e = {
      lstatSync: pXs,
      readdir: dXs,
      readdirSync: mXs,
      readlinkSync: _Xs,
      realpathSync: wXs,
      promises: { lstat: $Xs, readdir: gXs, readlink: EXs, realpath: IXs },
    }),
    (kXs = /^\\\\\?\\([a-z]:)\\?$/i),
    (OXs = /^\\\\\?\\UNC\\([^\\]+\\[^\\]+)\\?$/i),
    (UXs = /^\\\\[^\\?]+\\[^\\]+$/),
    (NXs = /^[\\/]{2}\?[\\/]unc[\\/][^\\/]+[\\/][^\\/]+(?:[\\/]|$)/i),
    (FXs = /^[\\/]{2}\?[\\/](?=[a-z]:)/i),
    (BXs = /^[\\/]{2}\?[\\/]unc(?=[\\/][^\\/]+[\\/][^\\/])/i),
    (RXs = /[\\/]/),
    (V3e = ~D2),
    (Jgn = X3e | fV | Bmt),
    (Kgn = new Gmt({ max: 4096 })),
    (zgn = new Gmt({ max: 4096 })),
    (Qgn = class extends Gmt {
      constructor() {
        super({ max: 256 });
      }
    }),
    (VXs = class extends Gmt {
      constructor(e = 16384) {
        super({ maxSize: e, sizeCalculation: (t) => t.length + 1 });
      }
    }),
    (x0n = Symbol("PathScurry setAsCwd")),
    (V6 = class {
      name;
      root;
      roots;
      parent;
      nocase;
      isCWD = !1;
      #e;
      #r;
      get dev() {
        return this.#r;
      }
      #t;
      get mode() {
        return this.#t;
      }
      #n;
      get nlink() {
        return this.#n;
      }
      #i;
      get uid() {
        return this.#i;
      }
      #s;
      get gid() {
        return this.#s;
      }
      #a;
      get rdev() {
        return this.#a;
      }
      #c;
      get blksize() {
        return this.#c;
      }
      #H;
      get ino() {
        return this.#H;
      }
      #f;
      get size() {
        return this.#f;
      }
      #l;
      get blocks() {
        return this.#l;
      }
      #A;
      get atimeMs() {
        return this.#A;
      }
      #o;
      get mtimeMs() {
        return this.#o;
      }
      #m;
      get ctimeMs() {
        return this.#m;
      }
      #L;
      get birthtimeMs() {
        return this.#L;
      }
      #$;
      get atime() {
        return this.#$;
      }
      #p;
      get mtime() {
        return this.#p;
      }
      #h;
      get ctime() {
        return this.#h;
      }
      #_;
      get birthtime() {
        return this.#_;
      }
      #y;
      #I;
      #g;
      #E;
      #D;
      #b;
      #u;
      #j;
      #P;
      #x;
      get parentPath() {
        return (this.parent || this).fullpath();
      }
      get path() {
        return this.parentPath;
      }
      constructor(e, t = y2, r, s, a, H, u) {
        ((this.name = e),
          (this.#y = a ? kmt(e) : J3e(e)),
          (this.#u = t & WXs),
          (this.nocase = a),
          (this.roots = s),
          (this.root = r || this),
          (this.#j = H),
          (this.#g = u.fullpath),
          (this.#D = u.relative),
          (this.#b = u.relativePosix),
          (this.parent = u.parent),
          this.parent ? (this.#e = this.parent.#e) : (this.#e = g0n(u.fs)));
      }
      get fs() {
        return this.#e;
      }
      depth() {
        return this.#I !== void 0
          ? this.#I
          : this.parent
            ? (this.#I = this.parent.depth() + 1)
            : (this.#I = 0);
      }
      childrenCache() {
        return this.#j;
      }
      resolve(e) {
        if (!e) return this;
        let t = this.getRootString(e),
          r = e.substring(t.length).split(this.splitSep);
        return t ? this.getRoot(t).#T(r) : this.#T(r);
      }
      #T(e) {
        let t = this;
        for (let r of e) t = t.child(r);
        return t;
      }
      children() {
        let e = this.#j.get(this);
        if (e) return e;
        let t = Object.assign([], { provisional: 0 });
        return (this.#j.set(this, t), (this.#u &= ~Xrr), t);
      }
      child(e, t) {
        if (e === "" || e === ".") return this;
        if (e === "..") return this.parent || this;
        let r = this.children(),
          s = this.nocase ? kmt(e) : J3e(e);
        for (let f of r) if (f.#y === s) return f;
        let a = this.parent ? this.sep : "",
          H = this.#g ? this.#g + a + e : void 0,
          u = this.newChild(e, y2, { ...t, parent: this, fullpath: H });
        return (this.canReaddir() || (u.#u |= fV), r.push(u), u);
      }
      relative() {
        if (this.isCWD) return "";
        if (this.#D !== void 0) return this.#D;
        let e = this.name,
          t = this.parent;
        if (!t) return (this.#D = this.name);
        let r = t.relative();
        return r + (!r || !t.parent ? "" : this.sep) + e;
      }
      relativePosix() {
        if (this.sep === "/") return this.relative();
        if (this.isCWD) return "";
        if (this.#b !== void 0) return this.#b;
        let e = this.name,
          t = this.parent;
        if (!t) return (this.#b = this.fullpathPosix());
        let r = t.relativePosix();
        return r + (!r || !t.parent ? "" : "/") + e;
      }
      fullpath() {
        if (this.#g !== void 0) return this.#g;
        let e = this.name,
          t = this.parent;
        if (!t) return (this.#g = this.name);
        let r = t.fullpath() + (t.parent ? this.sep : "") + e;
        return (this.#g = r);
      }
      fullpathPosix() {
        if (this.#E !== void 0) return this.#E;
        if (this.sep === "/") return (this.#E = this.fullpath());
        if (!this.parent) {
          let s = this.fullpath().replace(/\\/g, "/");
          return /^[a-z]:\//i.test(s) ? (this.#E = `//?/${s}`) : (this.#E = s);
        }
        let e = this.parent,
          t = e.fullpathPosix(),
          r = t + (!t || !e.parent ? "" : "/") + this.name;
        return (this.#E = r);
      }
      isUnknown() {
        return (this.#u & D2) === y2;
      }
      isType(e) {
        return this[`is${e}`]();
      }
      getType() {
        return this.isUnknown()
          ? "Unknown"
          : this.isDirectory()
            ? "Directory"
            : this.isFile()
              ? "File"
              : this.isSymbolicLink()
                ? "SymbolicLink"
                : this.isFIFO()
                  ? "FIFO"
                  : this.isCharacterDevice()
                    ? "CharacterDevice"
                    : this.isBlockDevice()
                      ? "BlockDevice"
                      : this.isSocket()
                        ? "Socket"
                        : "Unknown";
      }
      isFile() {
        return (this.#u & D2) === y0n;
      }
      isDirectory() {
        return (this.#u & D2) === CG;
      }
      isCharacterDevice() {
        return (this.#u & D2) === I0n;
      }
      isBlockDevice() {
        return (this.#u & D2) === D0n;
      }
      isFIFO() {
        return (this.#u & D2) === E0n;
      }
      isSocket() {
        return (this.#u & D2) === M0n;
      }
      isSymbolicLink() {
        return (this.#u & Sde) === Sde;
      }
      lstatCached() {
        return this.#u & Xgn ? this : void 0;
      }
      readlinkCached() {
        return this.#P;
      }
      realpathCached() {
        return this.#x;
      }
      readdirCached() {
        let e = this.children();
        return e.slice(0, e.provisional);
      }
      canReadlink() {
        if (this.#P) return !0;
        if (!this.parent) return !1;
        let e = this.#u & D2;
        return !((e !== y2 && e !== Sde) || this.#u & wmt || this.#u & fV);
      }
      calledReaddir() {
        return !!(this.#u & Xrr);
      }
      isENOENT() {
        return !!(this.#u & fV);
      }
      isNamed(e) {
        return this.nocase ? this.#y === kmt(e) : this.#y === J3e(e);
      }
      async readlink() {
        let e = this.#P;
        if (e) return e;
        if (this.canReadlink() && this.parent)
          try {
            let t = await this.#e.promises.readlink(this.fullpath()),
              r = (await this.parent.realpath())?.resolve(t);
            if (r) return (this.#P = r);
          } catch (t) {
            this.#v(t.code);
            return;
          }
      }
      readlinkSync() {
        let e = this.#P;
        if (e) return e;
        if (this.canReadlink() && this.parent)
          try {
            let t = this.#e.readlinkSync(this.fullpath()),
              r = this.parent.realpathSync()?.resolve(t);
            if (r) return (this.#P = r);
          } catch (t) {
            this.#v(t.code);
            return;
          }
      }
      #U(e) {
        this.#u |= Xrr;
        for (let t = e.provisional; t < e.length; t++) {
          let r = e[t];
          r && r.#M();
        }
      }
      #M() {
        this.#u & fV || ((this.#u = (this.#u | fV) & V3e), this.#V());
      }
      #V() {
        let e = this.children();
        e.provisional = 0;
        for (let t of e) t.#M();
      }
      #w() {
        ((this.#u |= Bmt), this.#C());
      }
      #C() {
        if (this.#u & X3e) return;
        let e = this.#u;
        ((e & D2) === CG && (e &= V3e), (this.#u = e | X3e), this.#V());
      }
      #F(e = "") {
        e === "ENOTDIR" || e === "EPERM"
          ? this.#C()
          : e === "ENOENT"
            ? this.#M()
            : (this.children().provisional = 0);
      }
      #S(e = "") {
        e === "ENOTDIR" ? this.parent.#C() : e === "ENOENT" && this.#M();
      }
      #v(e = "") {
        let t = this.#u;
        ((t |= wmt),
          e === "ENOENT" && (t |= fV),
          (e === "EINVAL" || e === "UNKNOWN") && (t &= V3e),
          (this.#u = t),
          e === "ENOTDIR" && this.parent && this.parent.#C());
      }
      #B(e, t) {
        return this.#R(e, t) || this.#k(e, t);
      }
      #k(e, t) {
        let r = Jrr(e),
          s = this.newChild(e.name, r, { parent: this }),
          a = s.#u & D2;
        return (a !== CG && a !== Sde && a !== y2 && (s.#u |= X3e), t.unshift(s), t.provisional++, s);
      }
      #R(e, t) {
        for (let r = t.provisional; r < t.length; r++) {
          let s = t[r];
          if ((this.nocase ? kmt(e.name) : J3e(e.name)) === s.#y) return this.#J(e, s, r, t);
        }
      }
      #J(e, t, r, s) {
        let a = t.name;
        return (
          (t.#u = (t.#u & V3e) | Jrr(e)),
          a !== e.name && (t.name = e.name),
          r !== s.provisional && (r === s.length - 1 ? s.pop() : s.splice(r, 1), s.unshift(t)),
          s.provisional++,
          t
        );
      }
      async lstat() {
        if ((this.#u & fV) === 0)
          try {
            return (this.#X(await this.#e.promises.lstat(this.fullpath())), this);
          } catch (e) {
            this.#S(e.code);
          }
      }
      lstatSync() {
        if ((this.#u & fV) === 0)
          try {
            return (this.#X(this.#e.lstatSync(this.fullpath())), this);
          } catch (e) {
            this.#S(e.code);
          }
      }
      #X(e) {
        let {
          atime: t,
          atimeMs: r,
          birthtime: s,
          birthtimeMs: a,
          blksize: H,
          blocks: u,
          ctime: f,
          ctimeMs: d,
          dev: _,
          gid: L,
          ino: I,
          mode: D,
          mtime: S,
          mtimeMs: T,
          nlink: C,
          rdev: O,
          size: B,
          uid: V,
        } = e;
        ((this.#$ = t),
          (this.#A = r),
          (this.#_ = s),
          (this.#L = a),
          (this.#c = H),
          (this.#l = u),
          (this.#h = f),
          (this.#m = d),
          (this.#r = _),
          (this.#s = L),
          (this.#H = I),
          (this.#t = D),
          (this.#p = S),
          (this.#o = T),
          (this.#n = C),
          (this.#a = O),
          (this.#f = B),
          (this.#i = V));
        let q = Jrr(e);
        ((this.#u = (this.#u & V3e) | q | Xgn), q !== y2 && q !== CG && q !== Sde && (this.#u |= X3e));
      }
      #N = [];
      #d = !1;
      #K(e) {
        this.#d = !1;
        let t = this.#N.slice();
        ((this.#N.length = 0), t.forEach((r) => r(null, e)));
      }
      readdirCB(e, t = !1) {
        if (!this.canReaddir()) {
          t ? e(null, []) : queueMicrotask(() => e(null, []));
          return;
        }
        let r = this.children();
        if (this.calledReaddir()) {
          let a = r.slice(0, r.provisional);
          t ? e(null, a) : queueMicrotask(() => e(null, a));
          return;
        }
        if ((this.#N.push(e), this.#d)) return;
        this.#d = !0;
        let s = this.fullpath();
        this.#e.readdir(s, { withFileTypes: !0 }, (a, H) => {
          if (a) (this.#F(a.code), (r.provisional = 0));
          else {
            for (let u of H) this.#B(u, r);
            this.#U(r);
          }
          this.#K(r.slice(0, r.provisional));
        });
      }
      #W;
      async readdir() {
        if (!this.canReaddir()) return [];
        let e = this.children();
        if (this.calledReaddir()) return e.slice(0, e.provisional);
        let t = this.fullpath();
        if (this.#W) await this.#W;
        else {
          let r = () => {};
          this.#W = new Promise((s) => (r = s));
          try {
            for (let s of await this.#e.promises.readdir(t, { withFileTypes: !0 })) this.#B(s, e);
            this.#U(e);
          } catch (s) {
            (this.#F(s.code), (e.provisional = 0));
          }
          ((this.#W = void 0), r());
        }
        return e.slice(0, e.provisional);
      }
      readdirSync() {
        if (!this.canReaddir()) return [];
        let e = this.children();
        if (this.calledReaddir()) return e.slice(0, e.provisional);
        let t = this.fullpath();
        try {
          for (let r of this.#e.readdirSync(t, { withFileTypes: !0 })) this.#B(r, e);
          this.#U(e);
        } catch (r) {
          (this.#F(r.code), (e.provisional = 0));
        }
        return e.slice(0, e.provisional);
      }
      canReaddir() {
        if (this.#u & Jgn) return !1;
        let e = D2 & this.#u;
        return e === y2 || e === CG || e === Sde;
      }
      shouldWalk(e, t) {
        return (this.#u & CG) === CG && !(this.#u & Jgn) && !e.has(this) && (!t || t(this));
      }
      async realpath() {
        if (this.#x) return this.#x;
        if (!((Bmt | wmt | fV) & this.#u))
          try {
            let e = await this.#e.promises.realpath(this.fullpath());
            return (this.#x = this.resolve(e));
          } catch {
            this.#w();
          }
      }
      realpathSync() {
        if (this.#x) return this.#x;
        if (!((Bmt | wmt | fV) & this.#u))
          try {
            let e = this.#e.realpathSync(this.fullpath());
            return (this.#x = this.resolve(e));
          } catch {
            this.#w();
          }
      }
      [x0n](e) {
        if (e === this) return;
        ((e.isCWD = !1), (this.isCWD = !0));
        let t = new Set([]),
          r = [],
          s = this;
        for (; s && s.parent;)
          (t.add(s), (s.#D = r.join(this.sep)), (s.#b = r.join("/")), (s = s.parent), r.push(".."));
        for (s = e; s && s.parent && !t.has(s);) ((s.#D = void 0), (s.#b = void 0), (s = s.parent));
      }
    }),
    (qXs = class e extends V6 {
      sep = "\\";
      splitSep = RXs;
      constructor(t, r = y2, s, a, H, u, f) {
        super(t, r, s, a, H, u, f);
      }
      newChild(t, r = y2, s = {}) {
        return new e(t, r, this.root, this.roots, this.nocase, this.childrenCache(), s);
      }
      getRootString(t) {
        return NXs.exec(t)?.[0] ?? tnr.parse(t).root;
      }
      getRoot(t) {
        if (((t = Ggn(t.toUpperCase())), t === this.root.name || /^[\\/]$/.test(t))) return this.root;
        for (let [r, s] of Object.entries(this.roots)) if (this.sameRoot(t, r)) return (this.roots[t] = s);
        return (this.roots[t] = new onr(t, { nocase: this.nocase, fs: this.fs }).root);
      }
      sameRoot(t, r = this.root.name) {
        return Ggn(t.toUpperCase()) === r;
      }
    }),
    (GXs = class e extends V6 {
      splitSep = "/";
      sep = "/";
      constructor(t, r = y2, s, a, H, u, f) {
        super(t, r, s, a, H, u, f);
      }
      getRootString(t) {
        return t.startsWith("/") ? "/" : "";
      }
      getRoot(t) {
        return this.root;
      }
      newChild(t, r = y2, s = {}) {
        return new e(t, r, this.root, this.roots, this.nocase, this.childrenCache(), s);
      }
    }),
    (S0n = class {
      root;
      rootPath;
      roots;
      cwd;
      #e;
      #r;
      #t;
      nocase;
      #n;
      constructor(e = process.cwd(), t, r, { nocase: s, childrenCacheSize: a = 16384, fs: H = G3e } = {}) {
        ((this.#n = g0n(H)), (e instanceof URL || e.startsWith("file://")) && (e = fXs(e)));
        let u = t.resolve(e);
        ((this.roots = Object.create(null)),
          (this.rootPath = this.parseRootPath(u)),
          (this.#e = new Qgn()),
          (this.#r = new Qgn()),
          (this.#t = new VXs(a)));
        let f = u.substring(this.rootPath.length).split(r);
        if ((f.length === 1 && !f[0] && f.pop(), s === void 0))
          throw TypeError("must provide nocase setting to PathScurryBase ctor");
        ((this.nocase = s), (this.root = this.newRoot(this.#n)), (this.roots[this.rootPath] = this.root));
        let d = this.root,
          _ = f.length - 1,
          L = t.sep,
          I = this.rootPath,
          D = !1;
        for (let S of f) {
          let T = _--;
          ((d = d.child(S, {
            relative: Array(T).fill("..").join(L),
            relativePosix: Array(T).fill("..").join("/"),
            fullpath: (I += (D ? "" : L) + S),
          })),
            (D = !0));
        }
        this.cwd = d;
      }
      depth(e = this.cwd) {
        return (typeof e == "string" && (e = this.cwd.resolve(e)), e.depth());
      }
      childrenCache() {
        return this.#t;
      }
      resolve(...e) {
        let t = "";
        for (let a = e.length - 1; a >= 0; a--) {
          let H = e[a];
          if (!(!H || H === ".") && ((t = t ? `${H}/${t}` : H), this.isAbsolute(H))) break;
        }
        let r = this.#e.get(t);
        if (r !== void 0) return r;
        let s = this.cwd.resolve(t).fullpath();
        return (this.#e.set(t, s), s);
      }
      resolvePosix(...e) {
        let t = "";
        for (let a = e.length - 1; a >= 0; a--) {
          let H = e[a];
          if (!(!H || H === ".") && ((t = t ? `${H}/${t}` : H), this.isAbsolute(H))) break;
        }
        let r = this.#r.get(t);
        if (r !== void 0) return r;
        let s = this.cwd.resolve(t).fullpathPosix();
        return (this.#r.set(t, s), s);
      }
      relative(e = this.cwd) {
        return (typeof e == "string" && (e = this.cwd.resolve(e)), e.relative());
      }
      relativePosix(e = this.cwd) {
        return (typeof e == "string" && (e = this.cwd.resolve(e)), e.relativePosix());
      }
      basename(e = this.cwd) {
        return (typeof e == "string" && (e = this.cwd.resolve(e)), e.name);
      }
      dirname(e = this.cwd) {
        return (typeof e == "string" && (e = this.cwd.resolve(e)), (e.parent || e).fullpath());
      }
      async readdir(e = this.cwd, t = { withFileTypes: !0 }) {
        typeof e == "string" ? (e = this.cwd.resolve(e)) : e instanceof V6 || ((t = e), (e = this.cwd));
        let { withFileTypes: r } = t;
        if (e.canReaddir()) {
          let s = await e.readdir();
          return r ? s : s.map((a) => a.name);
        } else return [];
      }
      readdirSync(e = this.cwd, t = { withFileTypes: !0 }) {
        typeof e == "string" ? (e = this.cwd.resolve(e)) : e instanceof V6 || ((t = e), (e = this.cwd));
        let { withFileTypes: r = !0 } = t;
        return e.canReaddir() ? (r ? e.readdirSync() : e.readdirSync().map((s) => s.name)) : [];
      }
      async lstat(e = this.cwd) {
        return (typeof e == "string" && (e = this.cwd.resolve(e)), e.lstat());
      }
      lstatSync(e = this.cwd) {
        return (typeof e == "string" && (e = this.cwd.resolve(e)), e.lstatSync());
      }
      async readlink(e = this.cwd, { withFileTypes: t } = { withFileTypes: !1 }) {
        typeof e == "string"
          ? (e = this.cwd.resolve(e))
          : e instanceof V6 || ((t = e.withFileTypes), (e = this.cwd));
        let r = await e.readlink();
        return t ? r : r?.fullpath();
      }
      readlinkSync(e = this.cwd, { withFileTypes: t } = { withFileTypes: !1 }) {
        typeof e == "string"
          ? (e = this.cwd.resolve(e))
          : e instanceof V6 || ((t = e.withFileTypes), (e = this.cwd));
        let r = e.readlinkSync();
        return t ? r : r?.fullpath();
      }
      async realpath(e = this.cwd, { withFileTypes: t } = { withFileTypes: !1 }) {
        typeof e == "string"
          ? (e = this.cwd.resolve(e))
          : e instanceof V6 || ((t = e.withFileTypes), (e = this.cwd));
        let r = await e.realpath();
        return t ? r : r?.fullpath();
      }
      realpathSync(e = this.cwd, { withFileTypes: t } = { withFileTypes: !1 }) {
        typeof e == "string"
          ? (e = this.cwd.resolve(e))
          : e instanceof V6 || ((t = e.withFileTypes), (e = this.cwd));
        let r = e.realpathSync();
        return t ? r : r?.fullpath();
      }
      async walk(e = this.cwd, t = {}) {
        typeof e == "string" ? (e = this.cwd.resolve(e)) : e instanceof V6 || ((t = e), (e = this.cwd));
        let { withFileTypes: r = !0, follow: s = !1, filter: a, walkFilter: H } = t,
          u = [];
        (!a || a(e)) && u.push(r ? e : e.fullpath());
        let f = new Set(),
          d = (L, I) => {
            (f.add(L),
              L.readdirCB((D, S) => {
                if (D) return I(D);
                let T = S.length;
                if (!T) return I();
                let C = () => {
                  --T === 0 && I();
                };
                for (let O of S)
                  ((!a || a(O)) && u.push(r ? O : O.fullpath()),
                    s && O.isSymbolicLink()
                      ? O.realpath()
                          .then((B) => (B?.isUnknown() ? B.lstat() : B))
                          .then((B) => (B?.shouldWalk(f, H) ? d(B, C) : C()))
                      : O.shouldWalk(f, H)
                        ? d(O, C)
                        : C());
              }, !0));
          },
          _ = e;
        return new Promise((L, I) => {
          d(_, (D) => {
            if (D) return I(D);
            L(u);
          });
        });
      }
      walkSync(e = this.cwd, t = {}) {
        typeof e == "string" ? (e = this.cwd.resolve(e)) : e instanceof V6 || ((t = e), (e = this.cwd));
        let { withFileTypes: r = !0, follow: s = !1, filter: a, walkFilter: H } = t,
          u = [];
        (!a || a(e)) && u.push(r ? e : e.fullpath());
        let f = new Set([e]);
        for (let d of f) {
          let _ = d.readdirSync();
          for (let L of _) {
            (!a || a(L)) && u.push(r ? L : L.fullpath());
            let I = L;
            if (L.isSymbolicLink()) {
              if (!(s && (I = L.realpathSync()))) continue;
              I.isUnknown() && I.lstatSync();
            }
            I.shouldWalk(f, H) && f.add(I);
          }
        }
        return u;
      }
      [Symbol.asyncIterator]() {
        return this.iterate();
      }
      iterate(e = this.cwd, t = {}) {
        return (
          typeof e == "string" ? (e = this.cwd.resolve(e)) : e instanceof V6 || ((t = e), (e = this.cwd)),
          this.stream(e, t)[Symbol.asyncIterator]()
        );
      }
      [Symbol.iterator]() {
        return this.iterateSync();
      }
      *iterateSync(e = this.cwd, t = {}) {
        typeof e == "string" ? (e = this.cwd.resolve(e)) : e instanceof V6 || ((t = e), (e = this.cwd));
        let { withFileTypes: r = !0, follow: s = !1, filter: a, walkFilter: H } = t;
        (!a || a(e)) && (yield r ? e : e.fullpath());
        let u = new Set([e]);
        for (let f of u) {
          let d = f.readdirSync();
          for (let _ of d) {
            (!a || a(_)) && (yield r ? _ : _.fullpath());
            let L = _;
            if (_.isSymbolicLink()) {
              if (!(s && (L = _.realpathSync()))) continue;
              L.isUnknown() && L.lstatSync();
            }
            L.shouldWalk(u, H) && u.add(L);
          }
        }
      }
      stream(e = this.cwd, t = {}) {
        typeof e == "string" ? (e = this.cwd.resolve(e)) : e instanceof V6 || ((t = e), (e = this.cwd));
        let { withFileTypes: r = !0, follow: s = !1, filter: a, walkFilter: H } = t,
          u = new Vmt({ objectMode: !0 });
        (!a || a(e)) && u.write(r ? e : e.fullpath());
        let f = new Set(),
          d = [e],
          _ = 0,
          L = () => {
            let I = !1;
            for (; !I;) {
              let D = d.shift();
              if (!D) {
                _ === 0 && u.end();
                return;
              }
              (_++, f.add(D));
              let S = (C, O, B = !1) => {
                  if (C) return u.emit("error", C);
                  if (s && !B) {
                    let V = [];
                    for (let q of O)
                      q.isSymbolicLink() &&
                        V.push(q.realpath().then((Z) => (Z?.isUnknown() ? Z.lstat() : Z)));
                    if (V.length) {
                      Promise.all(V).then(() => S(null, O, !0));
                      return;
                    }
                  }
                  for (let V of O) V && (!a || a(V)) && (u.write(r ? V : V.fullpath()) || (I = !0));
                  _--;
                  for (let V of O) {
                    let q = V.realpathCached() || V;
                    q.shouldWalk(f, H) && d.push(q);
                  }
                  I && !u.flowing ? u.once("drain", L) : T || L();
                },
                T = !0;
              (D.readdirCB(S, !0), (T = !1));
            }
          };
        return (L(), u);
      }
      streamSync(e = this.cwd, t = {}) {
        typeof e == "string" ? (e = this.cwd.resolve(e)) : e instanceof V6 || ((t = e), (e = this.cwd));
        let { withFileTypes: r = !0, follow: s = !1, filter: a, walkFilter: H } = t,
          u = new Vmt({ objectMode: !0 }),
          f = new Set();
        (!a || a(e)) && u.write(r ? e : e.fullpath());
        let d = [e],
          _ = 0,
          L = () => {
            let I = !1;
            for (; !I;) {
              let D = d.shift();
              if (!D) {
                _ === 0 && u.end();
                return;
              }
              (_++, f.add(D));
              let S = D.readdirSync();
              for (let T of S) (!a || a(T)) && (u.write(r ? T : T.fullpath()) || (I = !0));
              _--;
              for (let T of S) {
                let C = T;
                if (T.isSymbolicLink()) {
                  if (!(s && (C = T.realpathSync()))) continue;
                  C.isUnknown() && C.lstatSync();
                }
                C.shouldWalk(f, H) && d.push(C);
              }
            }
            I && !u.flowing && u.once("drain", L);
          };
        return (L(), u);
      }
      chdir(e = this.cwd) {
        let t = this.cwd;
        ((this.cwd = typeof e == "string" ? this.cwd.resolve(e) : e), this.cwd[x0n](t));
      }
    }),
    (onr = class extends S0n {
      sep = "\\";
      constructor(e = process.cwd(), t = {}) {
        let { nocase: r = !0 } = t;
        (typeof e == "string" && !e.startsWith("file://") && (e = e.replace(FXs, "").replace(BXs, "\\")),
          super(e, tnr, "\\", { ...t, nocase: r }),
          (this.nocase = r));
        for (let s = this.cwd; s; s = s.parent) s.nocase = this.nocase;
      }
      parseRootPath(e) {
        return tnr.parse(e).root.toUpperCase();
      }
      newRoot(e) {
        return new qXs(this.rootPath, CG, void 0, this.roots, this.nocase, this.childrenCache(), { fs: e });
      }
      isAbsolute(e) {
        return e.startsWith("/") || e.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(e);
      }
    }),
    (T0n = class extends S0n {
      sep = "/";
      constructor(e = process.cwd(), t = {}) {
        let { nocase: r = !1 } = t;
        (super(e, lXs, "/", { ...t, nocase: r }), (this.nocase = r));
      }
      parseRootPath(e) {
        return "/";
      }
      newRoot(e) {
        return new GXs(this.rootPath, CG, void 0, this.roots, this.nocase, this.childrenCache(), { fs: e });
      }
      isAbsolute(e) {
        return e.startsWith("/");
      }
    }),
    (XXs = class extends T0n {
      constructor(e = process.cwd(), t = {}) {
        let { nocase: r = !0 } = t;
        super(e, { ...t, nocase: r });
      }
    }),
    (JXs = onr),
    (QXs = Symbol.for("nodejs.util.inspect.custom")),
    (v0n = class e {
      #e;
      #r;
      #t;
      length;
      #n;
      #i;
      #s;
      #a;
      #c;
      #H;
      #f = !0;
      constructor(t, r, s, a) {
        if (!KXs(t)) throw TypeError("empty pattern list");
        if (!zXs(r)) throw TypeError("empty glob list");
        if (r.length !== t.length) throw TypeError("mismatched pattern list and glob list lengths");
        if (((this.length = t.length), s < 0 || s >= this.length)) throw TypeError("index out of range");
        if (((this.#e = t), (this.#r = r), (this.#t = s), (this.#n = a), this.#t === 0)) {
          if (this.isUNC()) {
            let H = this.#l() ? 6 : 4,
              u = this.#e.slice(0, H),
              f = this.#r.slice(0, H),
              d = this.#e.slice(H),
              _ = this.#r.slice(H);
            d[0] === "" && (d.shift(), _.shift());
            let L = [...u, ""].join("/"),
              I = [...f, ""].join("/");
            ((this.#e = [L, ...d]), (this.#r = [I, ..._]), (this.length = this.#e.length));
          } else if (this.isDrive() || this.isAbsolute()) {
            let [H, ...u] = this.#e,
              [f, ...d] = this.#r;
            u[0] === "" && (u.shift(), d.shift());
            let _ = `${H}/`,
              L = `${f}/`;
            ((this.#e = [_, ...u]), (this.#r = [L, ...d]), (this.length = this.#e.length));
          }
        }
      }
      [QXs]() {
        return `Pattern <${this.#r.slice(this.#t).join("/")}>`;
      }
      pattern() {
        return this.#e[this.#t];
      }
      isString() {
        return typeof this.#e[this.#t] == "string";
      }
      isGlobstar() {
        return this.#e[this.#t] === yD;
      }
      isMatcher() {
        return typeof this.#e[this.#t] == "object";
      }
      globString() {
        return (this.#s =
          this.#s ||
          (this.#t === 0
            ? this.isAbsolute()
              ? this.#r[0] + this.#r.slice(1).join("/")
              : this.#r.join("/")
            : this.#r.slice(this.#t).join("/")));
      }
      hasMore() {
        return this.length > this.#t + 1;
      }
      rest() {
        return this.#i !== void 0
          ? this.#i
          : this.hasMore()
            ? ((this.#i = new e(this.#e, this.#r, this.#t + 1, this.#n)),
              (this.#i.#H = this.#H),
              (this.#i.#c = this.#c),
              (this.#i.#a = this.#a),
              this.#i)
            : (this.#i = null);
      }
      #l() {
        let t = this.#e;
        return t[2] === "?" && typeof t[3] == "string" && /^unc$/i.test(t[3]);
      }
      isUNC() {
        let t = this.#e,
          r = this.#l() ? 4 : 2;
        return this.#c !== void 0
          ? this.#c
          : (this.#c =
              this.#n === "win32" &&
              this.#t === 0 &&
              t[0] === "" &&
              t[1] === "" &&
              typeof t[r] == "string" &&
              !!t[r] &&
              typeof t[r + 1] == "string" &&
              !!t[r + 1]);
      }
      isDrive() {
        let t = this.#e;
        return this.#a !== void 0
          ? this.#a
          : (this.#a =
              this.#n === "win32" &&
              this.#t === 0 &&
              this.length > 1 &&
              typeof t[0] == "string" &&
              /^[a-z]:$/i.test(t[0]));
      }
      isAbsolute() {
        let t = this.#e;
        return this.#H !== void 0
          ? this.#H
          : (this.#H = (t[0] === "" && t.length > 1) || this.isDrive() || this.isUNC());
      }
      root() {
        let t = this.#e[0];
        return typeof t == "string" && this.isAbsolute() && this.#t === 0 ? t : "";
      }
      checkFollowGlobstar() {
        return !(this.#t === 0 || !this.isGlobstar() || !this.#f);
      }
      markFollowGlobstar() {
        return this.#t === 0 || !this.isGlobstar() || !this.#f ? !1 : ((this.#f = !1), !0);
      }
    }),
    (YXs = typeof process == "object" && process ? "win32" : "linux"),
    ({ ABSOLUTE: Omt, IF_DIR: Umt } = b0n),
    (e0n = class extends j0n {
      matches = [];
      constructor(e, t, r) {
        super(e, t, r);
      }
      matchEmit(e) {
        this.matches.push(e);
      }
      async walk() {
        if (this.signal?.aborted) throw this.signal.reason;
        return (
          this.path.isUnknown() && (await this.path.lstat()),
          await new Promise((e, t) => {
            this.walkCB(this.path, this.patterns, () => {
              this.signal?.aborted ? t(this.signal.reason) : e(this.matches);
            });
          }),
          this.matches
        );
      }
      walkSync() {
        if (this.signal?.aborted) throw this.signal.reason;
        return (
          this.path.isUnknown() && this.path.lstatSync(),
          this.walkCBSync(this.path, this.patterns, () => {
            if (this.signal?.aborted) throw this.signal.reason;
          }),
          this.matches
        );
      }
    }),
    (t0n = class extends j0n {
      results;
      constructor(e, t, r) {
        (super(e, t, r),
          (this.results = new Vmt({ signal: this.signal, objectMode: !0 })),
          this.results.on("drain", () => this.resume()),
          this.results.on("resume", () => this.resume()));
      }
      matchEmit(e) {
        (this.results.write(e), this.results.flowing || this.pause());
      }
      stream() {
        let e = this.path;
        return (
          e.isUnknown()
            ? e.lstat().then(() => {
                this.walkCB(e, this.patterns, () => this.results.end());
              })
            : this.walkCB(e, this.patterns, () => this.results.end()),
          this.results
        );
      }
      streamSync() {
        return (
          this.path.isUnknown() && this.path.lstatSync(),
          this.walkCBSync(this.path, this.patterns, () => this.results.end()),
          this.results
        );
      }
    }),
    (rJs = typeof process == "object" && process ? "win32" : "linux"),
    (bde = class {
      absolute;
      cwd;
      root;
      dot;
      dotRelative;
      follow;
      ignore;
      magicalBraces;
      mark;
      matchBase;
      maxDepth;
      nobrace;
      nocase;
      nodir;
      noext;
      noglobstar;
      pattern;
      platform;
      realpath;
      scurry;
      stat;
      signal;
      windowsPathsNoEscape;
      withFileTypes;
      includeChildMatches;
      opts;
      patterns;
      constructor(e, t) {
        if (!t) throw TypeError("glob options required");
        if (
          ((this.withFileTypes = !!t.withFileTypes),
          (this.signal = t.signal),
          (this.follow = !!t.follow),
          (this.dot = !!t.dot),
          (this.dotRelative = !!t.dotRelative),
          (this.nodir = !!t.nodir),
          (this.mark = !!t.mark),
          t.cwd
            ? (t.cwd instanceof URL || t.cwd.startsWith("file://")) && (t.cwd = sXs(t.cwd))
            : (this.cwd = ""),
          (this.cwd = t.cwd || ""),
          (this.root = t.root),
          (this.magicalBraces = !!t.magicalBraces),
          (this.nobrace = !!t.nobrace),
          (this.noext = !!t.noext),
          (this.realpath = !!t.realpath),
          (this.absolute = t.absolute),
          (this.includeChildMatches = t.includeChildMatches !== !1),
          (this.noglobstar = !!t.noglobstar),
          (this.matchBase = !!t.matchBase),
          (this.maxDepth = typeof t.maxDepth == "number" ? t.maxDepth : 1 / 0),
          (this.stat = !!t.stat),
          (this.ignore = t.ignore),
          this.withFileTypes && this.absolute !== void 0)
        )
          throw Error("cannot set absolute and withFileTypes:true");
        let r = typeof e == "string" ? [e] : e;
        if (
          ((this.windowsPathsNoEscape = !!t.windowsPathsNoEscape || t.allowWindowsEscape === !1),
          this.windowsPathsNoEscape && (r = r.map((d) => d.replace(/\\/g, "/"))),
          this.matchBase)
        ) {
          if (t.noglobstar) throw TypeError("base matching requires globstar");
          r = r.map((d) => (d.includes("/") ? d : `./**/${d}`));
        }
        if (
          ((this.pattern = r),
          (this.platform = t.platform || rJs),
          (this.opts = { ...t, platform: this.platform }),
          t.scurry)
        ) {
          if (((this.scurry = t.scurry), t.nocase !== void 0 && t.nocase !== t.scurry.nocase))
            throw Error("nocase option contradicts provided scurry option");
        } else {
          let d = t.platform === "win32" ? onr : t.platform === "darwin" ? XXs : t.platform ? T0n : JXs;
          this.scurry = new d(this.cwd, { nocase: t.nocase, fs: t.fs });
        }
        this.nocase = this.scurry.nocase;
        let s = this.platform === "darwin" || this.platform === "win32",
          a = {
            braceExpandMax: 1e4,
            ...t,
            dot: this.dot,
            matchBase: this.matchBase,
            nobrace: this.nobrace,
            nocase: this.nocase,
            nocaseMagicOnly: s,
            nocomment: !0,
            noext: this.noext,
            nonegate: !0,
            optimizationLevel: 2,
            platform: this.platform,
            windowsPathsNoEscape: this.windowsPathsNoEscape,
          },
          H = this.pattern.map((d) => new vde(d, a)),
          [u, f] = H.reduce((d, _) => (d[0].push(..._.set), d[1].push(..._.globParts), d), [[], []]);
        this.patterns = u.map((d, _) => {
          let L = f[_];
          if (!L) throw Error("invalid pattern object");
          return new v0n(d, L, 0, this.platform);
        });
      }
      async walk() {
        return await new e0n(this.patterns, this.scurry.cwd, {
          ...this.opts,
          maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
          platform: this.platform,
          nocase: this.nocase,
          includeChildMatches: this.includeChildMatches,
        }).walk();
      }
      walkSync() {
        return new e0n(this.patterns, this.scurry.cwd, {
          ...this.opts,
          maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
          platform: this.platform,
          nocase: this.nocase,
          includeChildMatches: this.includeChildMatches,
        }).walkSync();
      }
      stream() {
        return new t0n(this.patterns, this.scurry.cwd, {
          ...this.opts,
          maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
          platform: this.platform,
          nocase: this.nocase,
          includeChildMatches: this.includeChildMatches,
        }).stream();
      }
      streamSync() {
        return new t0n(this.patterns, this.scurry.cwd, {
          ...this.opts,
          maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
          platform: this.platform,
          nocase: this.nocase,
          includeChildMatches: this.includeChildMatches,
        }).streamSync();
      }
      iterateSync() {
        return this.streamSync()[Symbol.iterator]();
      }
      [Symbol.iterator]() {
        return this.iterateSync();
      }
      iterate() {
        return this.stream()[Symbol.asyncIterator]();
      }
      [Symbol.asyncIterator]() {
        return this.iterate();
      }
    }));
  ((iJs = Xmt),
    (sJs = Object.assign(P0n, { sync: Xmt })),
    (oJs = Kmt),
    (aJs = Object.assign(C0n, { sync: Kmt })),
    (HJs = Object.assign(Jmt, { stream: Xmt, iterate: Kmt })),
    (qmt = Object.assign(r0n, {
      glob: r0n,
      globSync: Jmt,
      sync: HJs,
      globStream: P0n,
      stream: sJs,
      globStreamSync: Xmt,
      streamSync: iJs,
      globIterate: C0n,
      iterate: aJs,
      globIterateSync: Kmt,
      iterateSync: oJs,
      Glob: bde,
      hasMagic: nJs,
      escape: inr,
      unescape: f0n,
    })));
  qmt.glob = qmt;
});