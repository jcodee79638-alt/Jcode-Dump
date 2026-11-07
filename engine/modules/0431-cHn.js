
class cHn {
  publisherIndex = 0;
  subscriberCount = 0;
  subscribers = 0;
  value = dD;
  capacity = 1;
  replayBuffer;
  constructor(e) {
    this.replayBuffer = e;
  }
  replayWindow() {
    return this.replayBuffer ? new UBe(this.replayBuffer) : tft;
  }
  pipe() {
    return vA(this, arguments);
  }
  isEmpty() {
    return this.subscribers === 0;
  }
  isFull() {
    return !this.isEmpty();
  }
  size() {
    return this.isEmpty() ? 0 : 1;
  }
  publish(e) {
    if (this.isFull()) return !1;
    if (this.subscriberCount !== 0)
      ((this.value = e), (this.subscribers = this.subscriberCount), (this.publisherIndex += 1));
    if (this.replayBuffer) this.replayBuffer.offer(e);
    return !0;
  }
  publishAll(e) {
    if (this.subscriberCount === 0) {
      if (this.replayBuffer) this.replayBuffer.offerAll(e);
      return [];
    }
    let t = Xg(e);
    if (t.length === 0) return t;
    if (this.publish(t[0])) return t.slice(1);
    else return t;
  }
  slide() {
    if (this.isFull()) ((this.subscribers = 0), (this.value = dD));
    if (this.replayBuffer) this.replayBuffer.slide();
  }
  subscribe() {
    return ((this.subscriberCount += 1), new AHn(this, this.publisherIndex, !1));
  }
}