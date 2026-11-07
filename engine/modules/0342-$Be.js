
var $Be = ne(() => {
  BH();
  pBe();
  Hf();
  R_();
  Yu();
  bie();
  Esn();
  jie = class jie extends Jfe {
    run;
    constructor(e) {
      super();
      this.run = e;
    }
    map(e) {
      return new jie((t, r) => this.run(t, r).pipe(bW(YF(e))));
    }
    compose(e) {
      if (Ton(this)) return e;
      if (Ton(e)) return this;
      return new jie((t, r) => this.run(t, r).pipe(_1((s) => e.run(s, r))));
    }
  };
  von = new jie(Jt);
});