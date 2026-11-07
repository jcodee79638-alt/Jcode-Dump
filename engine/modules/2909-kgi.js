
var kgi = Ie(function (q$c, Ehr) {
  var wgi = Cgi();
  Ehr.exports = Object.assign((e) => Bca(e), { process });
  var Bca = (e) => {
    let { process: t } = Ehr.exports,
      r = { loaded: !1 },
      s = () => {
        if (!r.loaded) return;
        for (let f of wgi)
          try {
            t.removeListener(f, r[f]);
          } catch {}
        (t.removeListener("beforeExit", a), (r.loaded = !1));
      },
      a = () => {
        (s(), t.kill(t.pid, H), setTimeout(() => {}, 500));
      },
      H = null,
      u = (f, d) => () => {
        if (((H = f), s(), t.listeners(f).length < 1)) t.once("beforeExit", a);
        d({ signal: f });
      };
    for (let f of wgi) {
      r[f] = u(f, e);
      let d = t.getMaxListeners();
      try {
        let { length: _ } = t.listeners(f);
        if (_ >= d) t.setMaxListeners(_ + 1);
        t.on(f, r[f]);
      } catch {}
    }
    return ((r.loaded = !0), s);
  };
});