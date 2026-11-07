
var FKn = Ie(function (OAc, NKn) {
  class UKn {
    #e = 1;
    #r = null;
    #t = [];
    #n = null;
    #i;
    #s = null;
    #a;
    #c;
    #H = null;
    #f;
    constructor(e, t = {}) {
      if (
        ((this.#a = [...e]),
        (this.#c = [...e]),
        (this.#f = t.unref),
        (this.#i = t.maxRetryTime || 1 / 0),
        t.forever)
      )
        this.#r = [...this.#c];
    }
    get timeouts() {
      return [...this.#c];
    }
    get errors() {
      return [...this.#t];
    }
    get attempts() {
      return this.#e;
    }
    get mainError() {
      let e = null;
      if (this.#t.length) {
        let t = 0,
          r = {};
        for (let s = 0; s < this.#t.length; s++) {
          let a = this.#t[s],
            { message: H } = a;
          if (!r[H]) r[H] = 0;
          if ((r[H]++, r[H] >= t)) ((e = a), (t = r[H]));
        }
      }
      return e;
    }
    reset() {
      ((this.#e = 1), (this.#c = [...this.#a]));
    }
    stop() {
      if (this.#H) clearTimeout(this.#H);
      ((this.#c = []), (this.#r = null));
    }
    retry(e) {
      if ((this.#t.push(e), new Date().getTime() - this.#s >= this.#i))
        return (this.#t.unshift(Error("RetryOperation timeout occurred")), !1);
      let t = this.#c.shift();
      if (t === void 0)
        if (this.#r) (this.#t.pop(), (t = this.#r.at(-1)));
        else return !1;
      if (
        ((this.#H = setTimeout(() => {
          (this.#e++, this.#n(this.#e));
        }, t)),
        this.#f)
      )
        this.#H.unref();
      return !0;
    }
    attempt(e) {
      ((this.#n = e), (this.#s = new Date().getTime()), this.#n(this.#e));
    }
  }
  NKn.exports = { RetryOperation: UKn };
});