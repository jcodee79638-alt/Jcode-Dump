
class mHn {
  get shutdown() {
    return ti;
  }
  handleSurplus(e, t, r, s) {
    return jn(() => (this.slidingPublishUnsafe(e, r), this.completeSubscribersUnsafe(e, t), !0));
  }
  onPubSubEmptySpaceUnsafe(e, t) {}
  completePollersUnsafe(e, t, r, s) {
    return _Hn(this, e, t, r, s);
  }
  completeSubscribersUnsafe(e, t) {
    return hHn(this, e, t);
  }
  slidingPublishUnsafe(e, t) {
    let r = t[Symbol.iterator](),
      s = r.next();
    if (!s.done && e.capacity > 0) {
      let a = s.value,
        H = !0;
      while (H) {
        e.slide();
        let u = e.publish(a);
        if (u && (s = r.next()) && !s.done) a = s.value;
        else if (u) H = !1;
      }
    }
  }
}