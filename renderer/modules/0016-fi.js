
function fi() {
  if (this.sources && this.state)
    if (this.state === Nt) mn(this);
    else {
      const e = et;
      ((et = null), $n(() => Un(this), !1), (et = e));
    }
  if (Je) {
    const e = this.observers ? this.observers.length : 0;
    (Je.sources
      ? (Je.sources.push(this), Je.sourceSlots.push(e))
      : ((Je.sources = [this]), (Je.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(Je), this.observerSlots.push(Je.sources.length - 1))
        : ((this.observers = [Je]), (this.observerSlots = [Je.sources.length - 1])));
  }
  return this.value;
}