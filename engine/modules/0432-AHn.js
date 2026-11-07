
class AHn {
  self;
  subscriberIndex;
  unsubscribed;
  constructor(e, t, r) {
    ((this.self = e), (this.subscriberIndex = t), (this.unsubscribed = r));
  }
  isEmpty() {
    return (
      this.unsubscribed || this.self.subscribers === 0 || this.subscriberIndex === this.self.publisherIndex
    );
  }
  size() {
    return this.isEmpty() ? 0 : 1;
  }
  poll() {
    if (this.isEmpty()) return o2;
    let e = this.self.value;
    if (((this.self.subscribers -= 1), this.self.subscribers === 0)) this.self.value = dD;
    return ((this.subscriberIndex += 1), e);
  }
  pollUpTo(e) {
    if (this.isEmpty() || e < 1) return [];
    let t = this.self.value;
    if (((this.self.subscribers -= 1), this.self.subscribers === 0)) this.self.value = dD;
    return ((this.subscriberIndex += 1), [t]);
  }
  unsubscribe() {
    if (!this.unsubscribed) {
      if (
        ((this.unsubscribed = !0),
        (this.self.subscriberCount -= 1),
        this.subscriberIndex !== this.self.publisherIndex)
      ) {
        if (((this.self.subscribers -= 1), this.self.subscribers === 0)) this.self.value = dD;
      }
    }
  }
}