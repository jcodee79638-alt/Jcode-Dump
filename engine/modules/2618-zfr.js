
var zfr = Ie(function (_pc, Zii) {
  var pWo = jSe();
  class Yii extends pWo {
    #e = [];
    #r = new Map();
    constructor(e, ...t) {
      super();
      if (((this.#e = e.events), t.length)) this.push(...t);
    }
    on(e, t) {
      if (this.#e.includes(e) && this.#r.has(e)) return t(...this.#r.get(e));
      return super.on(e, t);
    }
    emit(e, ...t) {
      if (this.#e.includes(e)) this.#r.set(e, t);
      return super.emit(e, ...t);
    }
  }
  Zii.exports = Yii;
});