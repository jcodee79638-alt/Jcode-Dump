
class lHn {
  self;
  subscriberHead;
  subscriberIndex;
  unsubscribed;
  constructor(e, t, r, s) {
    ((this.self = e), (this.subscriberHead = t), (this.subscriberIndex = r), (this.unsubscribed = s));
  }
  isEmpty() {
    if (this.unsubscribed) return !0;
    let e = !0,
      t = !0;
    while (t)
      if (this.subscriberHead === this.self.publisherTail) t = !1;
      else if (this.subscriberHead.next.value !== dD) ((e = !1), (t = !1));
      else ((this.subscriberHead = this.subscriberHead.next), (this.subscriberIndex += 1));
    return e;
  }
  size() {
    if (this.unsubscribed) return 0;
    return this.self.publisherIndex - Math.max(this.subscriberIndex, this.self.subscribersIndex);
  }
  poll() {
    if (this.unsubscribed) return o2;
    let e = !0,
      t = o2;
    while (e)
      if (this.subscriberHead === this.self.publisherTail) e = !1;
      else {
        let r = this.subscriberHead.next.value;
        if (r !== dD) {
          if (((t = r), (this.subscriberHead.subscribers -= 1), this.subscriberHead.subscribers === 0))
            ((this.self.publisherHead = this.self.publisherHead.next),
              (this.self.publisherHead.value = dD),
              (this.self.subscribersIndex += 1));
          e = !1;
        }
        ((this.subscriberHead = this.subscriberHead.next), (this.subscriberIndex += 1));
      }
    return t;
  }
  pollUpTo(e) {
    let t = [],
      r = 0;
    while (r !== e) {
      let s = this.poll();
      if (s === o2) r = e;
      else (t.push(s), (r += 1));
    }
    return t;
  }
  unsubscribe() {
    if (!this.unsubscribed) {
      ((this.unsubscribed = !0), (this.self.publisherTail.subscribers -= 1));
      while (this.subscriberHead !== this.self.publisherTail) {
        if (this.subscriberHead.next.value !== dD) {
          if (((this.subscriberHead.subscribers -= 1), this.subscriberHead.subscribers === 0))
            ((this.self.publisherHead = this.self.publisherHead.next),
              (this.self.publisherHead.value = dD),
              (this.self.subscribersIndex += 1));
        }
        this.subscriberHead = this.subscriberHead.next;
      }
    }
  }
}