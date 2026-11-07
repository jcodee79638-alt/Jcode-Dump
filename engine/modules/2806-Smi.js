
var Smi = Ie(function (zhc, xmi) {
  var ymi = Mve(),
    Jyt = e_e(),
    { time: aqe } = mg(),
    Tea = Lmi(),
    { homedir: vea } = cr("os"),
    $mi = m7e(),
    gmi = Symbol("packument"),
    Emi = Symbol("cachePut"),
    Imi = Symbol("cacheGet"),
    xve = Symbol("cacheData"),
    Hqe = Symbol("packuments"),
    cqe = Symbol("cache"),
    Sae = Symbol("options"),
    Aqe = Symbol("advisories"),
    Dmi = Symbol("calculate");
  class Mmi {
    constructor(e = {}) {
      ((this[Sae] = { ...e }),
        (this[cqe] = this[Sae].cache || vea() + "/.npm/_cacache"),
        (this[Sae].cache = this[cqe]),
        (this[Hqe] = new Map()),
        (this[xve] = new Map()),
        (this[Aqe] = new Map()));
    }
    get cache() {
      return this[cqe];
    }
    get options() {
      return { ...this[Sae] };
    }
    async calculate(e, t) {
      let r = `security-advisory:${e}:${t.id}`;
      if (this[Aqe].has(r)) return this[Aqe].get(r);
      let s = this[Dmi](e, t);
      return (this[Aqe].set(r, s), s);
    }
    async [Dmi](e, t) {
      let r = `security-advisory:${e}:${t.id}`,
        s = aqe.start(`metavuln:calculate:${r}`),
        a = new Tea(e, t, this[Sae]),
        [H, u] = await Promise.all([this[Imi](a), this[gmi](e)]),
        f = aqe.start(`metavuln:load:${r}`);
      if ((a.load(H, u), f(), a.updated)) await this[Emi](a);
      return (this[Aqe].set(r, a), s(), a);
    }
    async [Emi](e) {
      let { name: t, id: r } = e,
        s = `security-advisory:${t}:${r}`,
        a = aqe.start(`metavuln:cache:put:${s}`),
        H = JSON.stringify(e),
        u = { ...this[Sae] };
      (this[xve].set(s, $mi(H)), await Jyt.put(this[cqe], s, H, u).catch(() => {}), a());
    }
    async [Imi](e) {
      let { name: t, id: r } = e,
        s = `security-advisory:${t}:${r}`;
      if (this[xve].has(s)) return this[xve].get(s);
      let a = aqe.start(`metavuln:cache:get:${s}`),
        H = Jyt.get(this[cqe], s, { ...this[Sae] })
          .catch(() => ({ data: "{}" }))
          .then(({ data: u }) => ((u = $mi(u)), a(), this[xve].set(s, u), u));
      return (this[xve].set(s, H), H);
    }
    async [gmi](e) {
      if (this[Hqe].has(e)) return this[Hqe].get(e);
      let t = aqe.start(`metavuln:packument:${e}`),
        r = ymi
          .packument(e, { ...this[Sae] })
          .catch(() => ({ name: e, versions: {} }))
          .then((s) => (t(), this[Hqe].set(e, s), s));
      return (this[Hqe].set(e, r), r);
    }
  }
  xmi.exports = Mmi;
});