
var a_t = ne(() => {
  R0();
  YA();
  BH();
  KH();
  Dd();
  Hf();
  fD();
  gQ();
  TEn();
  kpt();
  Ppt();
  Opt();
  tde();
  eV();
  p2();
  ((Pde = _i("effect/http/HttpRouter")),
    (AKs = ft(function* () {
      let e = xEn(yield* xnr),
        t = new Set(),
        r = (s) =>
          M6((a) => {
            let H = CEn(a),
              u = (f) => {
                for (let d = 0; d < H.length; d++) f = H[d](f);
                return f;
              };
            for (let f = 0; f < s.length; f++) {
              let d = H.length === 0 ? s[f] : s_t({ ...s[f], handler: u(s[f].handler) });
              if (d.method === "*")
                if (d.path.endsWith("/*")) (e.all(d.path, d), e.all(d.path.slice(0, -2), d));
                else e.all(d.path, d);
              else if (d.path.endsWith("/*"))
                (e.on(d.method, d.path, d), e.on(d.method, d.path.slice(0, -2), d));
              else e.on(d.method, d.path, d);
            }
            return ti;
          });
      return Pde.of({
        [vEn]: vEn,
        prefixed(s) {
          return Pde.of({
            ...this,
            prefixed: (a) => this.prefixed(gMe(s, a)),
            addAll: (a) => r(a.map(fKs(s))),
            add: (a, H, u, f) =>
              r([
                s_t({
                  method: a,
                  path: gMe(H, s),
                  handler: F6(u) ? Jt(u) : ug(u) ? u : Hi(Md, u),
                  uninterruptible: f?.uninterruptible ?? !1,
                  prefix: s,
                }),
              ]),
          });
        },
        addAll: r,
        add: (s, a, H, u) => r([Snr(s, a, H, u)]),
        addGlobalMiddleware: (s) =>
          jn(() => {
            t.add(s);
          }),
        asHttpEffect() {
          let s = hl((a) => {
            let H = new Map(a.context.mapUnsafe),
              u = H.get(Md.key),
              f = e.find(u.method, u.url);
            if (f === void 0 && u.method === "HEAD") f = e.find("GET", u.url);
            if (f === void 0) return bn(new Nv({ reason: new ier({ request: u }) }));
            let d = f.handler;
            if (Nu(d.prefix)) H.set(Md.key, uKs(u, d.prefix.value));
            (H.set(ose.key, f.searchParams), H.set(eWe.key, { route: d, params: f.params }));
            let _ = H.get(IW.key);
            if (_ && _._tag === "Span") _.attribute("http.route", d.path);
            return m1(d.uninterruptible ? d.handler : S6(d.handler), B0(H));
          });
          if (t.size === 0) return s;
          for (let a of frn(t)) s = a(s);
          return s;
        },
      });
    })));
  xnr = bA("effect/http/HttpRouter/RouterConfig", { defaultValue: () => ({}) });
  eWe = class eWe extends _i()("effect/http/HttpRouter/RouteContext") {};
  ((i_t = Es(Pde)(AKs)),
    (gMe = Wr(2, (e, t) => {
      if (((t = lKs(t)), e === "*")) return `${t}/*`;
      else if (e === "/") return t;
      return t + e;
    })),
    (fKs = Wr(2, (e, t) =>
      s_t({
        ...e,
        path: gMe(e.path, t),
        prefix: xv(e.prefix, { onNone: () => t, onSome: (r) => gMe(r, t) }),
      }),
    )));
  Tnr = class Tnr {
    [pKs] = {};
    layerFn;
    dependencies;
    constructor(e, t) {
      ((this.layerFn = e), (this.dependencies = t));
      let r = `effect/http/HttpRouter/Middleware-${++dKs}`;
      this.layer = Xq(
        ft({ self: this }, function* () {
          let s = yield* Qg(),
            a = [s.mapUnsafe.get(Mnr)];
          if (this.dependencies) {
            let H = yield* hie,
              u = Pp(s, $f),
              f = yield* t2(this.dependencies, H, u);
            a.push(...CEn(f));
          }
          return B0(new Map([[r, a]]));
        }),
      ).pipe(ou(this.layerFn));
    }
    layer;
    combine(e) {
      return new Tnr(this.layerFn, this.dependencies ? Jm(this.dependencies, e.layer) : e.layer);
    }
  };
  ((PEn = new WeakMap()), (NBH = Cde(Dln).layer));
});