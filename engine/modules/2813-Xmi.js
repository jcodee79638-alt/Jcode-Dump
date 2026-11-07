
var Xmi = Ie(function (nLc, Gmi) {
  var qmi = Vmi();
  Gmi.exports = (e) =>
    class extends e {
      #e = new Map();
      #r(r, s) {
        let a = new qmi.Tracker(s ?? r);
        (a.on("done", () => this.#e.delete(r)), this.#e.set(r, a));
      }
      addTracker(r, s = null, a = null) {
        if (r === null || r === void 0) this.#t("Tracker can't be null or undefined");
        if (a === null) a = s;
        let H = this.#e.has(r),
          u = this.#e.has(`${r}:${a}`);
        if (H && s === null) this.#t(`Tracker "${r}" already exists`);
        else if (!H && s === null) this.#r(r);
        else if (!H && s !== null) this.#t(`Parent tracker "${r}" does not exist`);
        else if (!H || !u) {
          let f = this.#e.get(r);
          (f.update(f.value, f.total + 1), this.#r(`${r}:${a}`, `${r}:${s}`));
        }
      }
      finishTracker(r, s = null, a = null) {
        if (r === null || r === void 0) this.#t("Tracker can't be null or undefined");
        if (a === null) a = s;
        let H = this.#e.has(r),
          u = this.#e.has(`${r}:${a}`);
        if (H && s === null) {
          let f = this.#e.keys();
          for (let d of f) if (d.match(new RegExp(r + ":"))) this.finishTracker(r, d);
          this.#e.get(r).finish();
        } else if (!H && s === null) this.#t(`Tracker "${r}" does not exist`);
        else if (!H || u) {
          let f = this.#e.get(r);
          (f.update(f.value + 1), this.#e.get(`${r}:${a}`).finish());
        }
      }
      #t(r) {
        throw Error(r);
      }
    };
});