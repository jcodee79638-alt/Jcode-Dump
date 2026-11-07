
class HHn {
  self;
  subscriberIndex;
  unsubscribed;
  constructor(e, t, r) {
    ((this.self = e), (this.subscriberIndex = t), (this.unsubscribed = r));
  }
  isEmpty() {
    return (
      this.unsubscribed ||
      this.self.publisherIndex === this.subscriberIndex ||
      this.self.publisherIndex === this.self.subscribersIndex
    );
  }
  size() {
    if (this.unsubscribed) return 0;
    return this.self.publisherIndex - Math.max(this.subscriberIndex, this.self.subscribersIndex);
  }
  poll() {
    if (this.unsubscribed) return o2;
    if (
      ((this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex)),
      this.subscriberIndex !== this.self.publisherIndex)
    ) {
      let e = this.subscriberIndex & this.self.mask,
        t = this.self.array[e];
      if (((this.self.subscribers[e] -= 1), this.self.subscribers[e] === 0))
        ((this.self.array[e] = dD), (this.self.subscribersIndex += 1));
      return ((this.subscriberIndex += 1), t);
    }
    return o2;
  }
  pollUpTo(e) {
    if (this.unsubscribed) return [];
    this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex);
    let t = this.self.publisherIndex - this.subscriberIndex,
      r = Math.min(e, t);
    if (r <= 0) return [];
    let s = [],
      a = this.subscriberIndex + r;
    while (this.subscriberIndex !== a) {
      let H = this.subscriberIndex & this.self.mask,
        u = this.self.array[H];
      if (((this.self.subscribers[H] -= 1), this.self.subscribers[H] === 0))
        ((this.self.array[H] = dD), (this.self.subscribersIndex += 1));
      (s.push(u), (this.subscriberIndex += 1));
    }
    return s;
  }
  unsubscribe() {
    if (!this.unsubscribed) {
      ((this.unsubscribed = !0),
        (this.self.subscriberCount -= 1),
        (this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex)));
      while (this.subscriberIndex !== this.self.publisherIndex) {
        let e = this.subscriberIndex & this.self.mask;
        if (((this.self.subscribers[e] -= 1), this.self.subscribers[e] === 0))
          ((this.self.array[e] = dD), (this.self.subscribersIndex += 1));
        this.subscriberIndex += 1;
      }
    }
  }
}