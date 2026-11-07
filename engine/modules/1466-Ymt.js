
class Ymt {
  dots;
  dotStart;
  #e;
  constructor(e, t, r) {
    ((this.dots = e), (this.dotStart = t), (this.#e = r));
  }
  state() {
    return new Y0n(++this.#e.gen);
  }
  done(e) {
    if (((e.ids = e.threads.map((t) => t.id).sort((t, r) => t - r)), e.match)) e.ids.unshift(fnr.id);
    return e;
  }
  #r(e, t) {
    let { seen: r } = this.#e;
    if (r[t.id] === e.gen) return !1;
    return ((r[t.id] = e.gen), !0);
  }
  #t(e, t) {
    let { has: r } = this.#e;
    if (r[t.id] === e.gen) return !1;
    return ((r[t.id] = e.gen), e.threads.push(t), !0);
  }
  restricted(e, t) {
    return t && (this.dots || (this.dotStart && e === 0));
  }
  add(e, t, r, s) {
    switch (t.t) {
      case "split":
        if (!this.#r(e, t)) return;
        for (let H of t.out) this.add(e, H, r, s);
        return;
      case "neg":
        if (!this.#r(e, t)) return;
        let a = this.state();
        return (
          this.add(a, t.sub, r, !1),
          this.done(a),
          this.addRun(e, { t: "run", neg: t, state: a }, r, s)
        );
      case "star":
        if (this.restricted(r, s)) return;
        if (this.#t(e, t)) this.add(e, t.next, r, s);
        return;
      case "match":
        e.match = !0;
        return;
      default:
        this.#t(e, t);
    }
  }
  addRun(e, t, r, s) {
    for (let a of e.runs) if (a.neg === t.neg && Z0n(a.state, t.state)) return;
    if ((e.runs.push(t), !t.state.match)) this.add(e, t.neg.next, r, s);
  }
  step(e, t, r, s) {
    let a = this.state();
    for (let H of e.threads)
      switch (H.t) {
        case "lit":
          if (pnr(H, t)) this.add(a, H.next, r + 1, s);
          break;
        case "any":
          if (!this.restricted(r, s)) this.add(a, H.next, r + 1, s);
          break;
        case "class":
          if (!this.restricted(r, s) && H.re.test(t)) this.add(a, H.next, r + 1, s);
          break;
        case "star":
          if (!this.restricted(r, s)) this.add(a, H, r + 1, s);
      }
    if (!this.restricted(r, s))
      for (let H of e.runs) {
        if (H.state.dead) {
          this.addRun(a, H, r + 1, s);
          continue;
        }
        let u = this.step(H.state, t, r, !1);
        this.addRun(a, { t: "run", neg: H.neg, state: u }, r + 1, s);
      }
    return this.done(a);
  }
}