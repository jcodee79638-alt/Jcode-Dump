
var B6 = (e) => Hd(L3s(e)),
  L3s = (e) =>
    T$((t, r) =>
      $3s({
        scope: r,
        readable: e.evaluate(),
        onError: e.onError ?? Ter,
        chunkSize: e.chunkSize,
        closeOnDone: e.closeOnDone,
      }),
    ),
  jln = (e, t) => {
    let r = t?.maxBytes ? Number(t.maxBytes) : void 0,
      s = t?.onError ?? Ter,
      a = t?.encoding ?? "utf8";
    return Fd((H) => {
      let u = e();
      (u.setEncoding(a),
        u.once("error", (_) => {
          if ("closed" in u && !u.closed) u.destroy();
          H(bn(s(_)));
        }),
        u.once("error", (_) => {
          H(bn(s(_)));
        }));
      let f = "",
        d = 0;
      return (
        u.once("end", () => {
          H(Jt(f));
        }),
        u.on("data", (_) => {
          if (((f += _), (d += Buffer.byteLength(_)), r && d > r)) H(bn(s(Error("maxBytes exceeded"))));
        }),
        jn(() => {
          if ("closed" in u && !u.closed) u.destroy();
        })
      );
    });
  },
  Ser = (e, t) => {
    let r = t?.maxBytes ? Number(t.maxBytes) : void 0,
      s = t?.onError ?? Ter;
    return Fd((a) => {
      let H = e(),
        u = [],
        f = 0;
      return (
        H.once("error", (d) => {
          if ("closed" in H && !H.closed) H.destroy();
          a(bn(s(d)));
        }),
        H.once("end", () => {
          let d = u.length === 1 ? u[0] : Buffer.concat(u);
          if (d.byteOffset === 0 && d.buffer.byteLength === d.byteLength) return a(Jt(d.buffer));
          a(Jt(d.buffer.slice(d.byteOffset, d.byteOffset + d.byteLength)));
        }),
        H.on("data", (d) => {
          if ((u.push(d), (f += d.length), r && f > r)) a(bn(s(Error("maxBytes exceeded"))));
        }),
        jn(() => {
          if ("closed" in H && !H.closed) H.destroy();
        })
      );
    });
  },
  Pln = (e, t) => Vn(Ser(e, t), (r) => new Uint8Array(r)),
  $3s = (e) => {
    let t = e.readable;
    if (t.readableEnded) return Jt(Xp());
    let r = e.closeOnDone ?? !0,
      s = e.exit ?? wpe(void 0),
      a = CW(!1);
    function H() {
      a.openUnsafe();
    }
    function u(_) {
      ((s.current = WC(e.onError(_))), a.openUnsafe());
    }
    function f() {
      ((s.current = WC(W2e())), a.openUnsafe());
    }
    (t.on("readable", H), t.once("error", u), t.once("end", f));
    let d = yH(function _() {
      let L = e.readable.read(e.chunkSize);
      if (L === null) {
        if (s.current) return s.current;
        return (a.closeUnsafe(), Hi(a.await, _));
      }
      let I = vS(L);
      while (!0) {
        if (((L = e.readable.read(e.chunkSize)), L === null)) break;
        I.push(L);
      }
      return Jt(I);
    });
    return eu(
      UL(
        e.scope,
        jn(() => {
          if (
            (t.off("readable", H),
            t.off("error", u),
            t.off("end", f),
            r && "closed" in e.readable && !e.readable.closed)
          )
            e.readable.destroy();
        }),
      ),
      d,
    );
  },
  Ter = (e) => new Rin(e);