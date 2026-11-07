
class aHn {
  array;
  mask;
  publisherIndex = 0;
  subscribers;
  subscriberCount = 0;
  subscribersIndex = 0;
  capacity;
  replayBuffer;
  constructor(e, t) {
    ((this.capacity = e),
      (this.replayBuffer = t),
      (this.array = Array.from({ length: e })),
      (this.mask = e - 1),
      (this.subscribers = Array.from({ length: e })));
  }
  replayWindow() {
    return this.replayBuffer ? new UBe(this.replayBuffer) : tft;
  }
  isEmpty() {
    return this.publisherIndex === this.subscribersIndex;
  }
  isFull() {
    return this.publisherIndex === this.subscribersIndex + this.capacity;
  }
  size() {
    return this.publisherIndex - this.subscribersIndex;
  }
  publish(e) {
    if (this.isFull()) return !1;
    if (this.subscriberCount !== 0) {
      let t = this.publisherIndex & this.mask;
      ((this.array[t] = e), (this.subscribers[t] = this.subscriberCount), (this.publisherIndex += 1));
    }
    if (this.replayBuffer) this.replayBuffer.offer(e);
    return !0;
  }
  publishAll(e) {
    if (this.subscriberCount === 0) {
      if (this.replayBuffer) this.replayBuffer.offerAll(e);
      return [];
    }
    let t = Xg(e),
      r = t.length,
      s = this.publisherIndex - this.subscribersIndex,
      a = this.capacity - s,
      H = Math.min(r, a);
    if (H === 0) return t;
    let u = 0,
      f = this.publisherIndex + H;
    while (this.publisherIndex !== f) {
      let d = t[u++],
        _ = this.publisherIndex & this.mask;
      if (
        ((this.array[_] = d),
        (this.subscribers[_] = this.subscriberCount),
        (this.publisherIndex += 1),
        this.replayBuffer)
      )
        this.replayBuffer.offer(d);
    }
    return t.slice(u);
  }
  slide() {
    if (this.subscribersIndex !== this.publisherIndex) {
      let e = this.subscribersIndex & this.mask;
      ((this.array[e] = dD), (this.subscribers[e] = 0), (this.subscribersIndex += 1));
    }
    if (this.replayBuffer) this.replayBuffer.slide();
  }
  subscribe() {
    return ((this.subscriberCount += 1), new HHn(this, this.publisherIndex, !1));
  }
}