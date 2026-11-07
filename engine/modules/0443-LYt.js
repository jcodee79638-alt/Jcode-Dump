
class LYt {
  waiters = new Set();
  taken = 0;
  permits;
  constructor(e) {
    this.permits = e;
  }
  get free() {
    return this.permits - this.taken;
  }
  take(e) {
    let t = Gm(() => {
      if (this.free < e)
        return bS((r) => {
          if (this.free >= e) return r(t);
          let s = () => {
            if (this.free < e) return;
            (this.waiters.delete(s), r(t));
          };
          return (
            this.waiters.add(s),
            $p(() => {
              this.waiters.delete(s);
            })
          );
        });
      return ((this.taken += e), Mu(e));
    });
    return t;
  }
  updateTakenUnsafe(e, t) {
    if (((this.taken = t(this.taken)), this.waiters.size > 0))
      e.currentDispatcher.scheduleTask(() => {
        let r = this.waiters.values(),
          s = r.next();
        while (s.done === !1 && this.free > 0) (s.value(), (s = r.next()));
      }, 0);
    return this.free;
  }
  updateTaken(e) {
    return Hl((t) => Mu(this.updateTakenUnsafe(t, e)));
  }
  resize(e) {
    return Hl((t) => {
      if (((this.permits = e), this.free < 0)) return Lp;
      return (this.updateTakenUnsafe(t, (r) => r), Lp);
    });
  }
  release(e) {
    return this.updateTaken((t) => t - e);
  }
  get releaseAll() {
    return this.updateTaken((e) => 0);
  }
  withPermits(e) {
    return (t) =>
      E6((r) =>
        Fu(r(this.take(e)), (s) =>
          yQ(
            r(t),
            () => {
              this.updateTakenUnsafe(cpe(), (a) => a - s);
              return;
            },
            !0,
          ),
        ),
      );
  }
  withPermit = this.withPermits(1);
  withPermitsIfAvailable(e) {
    return (t) =>
      E6((r) => {
        if (this.free < e) return upe;
        return (
          (this.taken += e),
          yQ(
            r(lpe(t)),
            () => {
              this.updateTakenUnsafe(cpe(), (s) => s - e);
              return;
            },
            !0,
          )
        );
      });
  }
}