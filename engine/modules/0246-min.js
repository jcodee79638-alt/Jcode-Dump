
class min {
  waiters = [];
  scheduled = !1;
  isOpen;
  constructor(e) {
    this.isOpen = e;
  }
  scheduleUnsafe(e) {
    if (this.scheduled || this.waiters.length === 0) return Grn;
    return ((this.scheduled = !0), e.currentDispatcher.scheduleTask(this.flushWaiters, 0), Grn);
  }
  flushWaiters = () => {
    this.scheduled = !1;
    let e = this.waiters;
    this.waiters = [];
    for (let t = 0; t < e.length; t++) e[t](p1);
  };
  open = Hl((e) => {
    if (this.isOpen) return Xrn;
    return ((this.isOpen = !0), this.scheduleUnsafe(e));
  });
  release = Hl((e) => (this.isOpen ? Xrn : this.scheduleUnsafe(e)));
  openUnsafe() {
    if (this.isOpen) return !1;
    return ((this.isOpen = !0), this.flushWaiters(), !0);
  }
  await = bS((e) => {
    if (this.isOpen) return e(Lp);
    return (
      this.waiters.push(e),
      $p(() => {
        let t = this.waiters.indexOf(e);
        if (t !== -1) this.waiters.splice(t, 1);
      })
    );
  });
  closeUnsafe() {
    if (!this.isOpen) return !1;
    return ((this.isOpen = !1), !0);
  }
  close = $p(() => this.closeUnsafe());
  whenOpen = (e) => Fu(this.await, () => e);
}