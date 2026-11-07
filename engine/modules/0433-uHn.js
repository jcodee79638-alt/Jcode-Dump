
class uHn {
  publisherHead = { value: dD, subscribers: 0, next: null };
  publisherTail = this.publisherHead;
  publisherIndex = 0;
  subscribersIndex = 0;
  capacity = Number.MAX_SAFE_INTEGER;
  replayBuffer;
  constructor(e) {
    this.replayBuffer = e;
  }
  replayWindow() {
    return this.replayBuffer ? new UBe(this.replayBuffer) : tft;
  }
  isEmpty() {
    return this.publisherHead === this.publisherTail;
  }
  isFull() {
    return !1;
  }
  size() {
    return this.publisherIndex - this.subscribersIndex;
  }
  publish(e) {
    let t = this.publisherTail.subscribers;
    if (t !== 0)
      ((this.publisherTail.next = { value: e, subscribers: t, next: null }),
        (this.publisherTail = this.publisherTail.next),
        (this.publisherIndex += 1));
    if (this.replayBuffer) this.replayBuffer.offer(e);
    return !0;
  }
  publishAll(e) {
    if (this.publisherTail.subscribers !== 0) for (let t of e) this.publish(t);
    else if (this.replayBuffer) this.replayBuffer.offerAll(e);
    return [];
  }
  slide() {
    if (this.publisherHead !== this.publisherTail)
      ((this.publisherHead = this.publisherHead.next),
        (this.publisherHead.value = dD),
        (this.subscribersIndex += 1));
    if (this.replayBuffer) this.replayBuffer.slide();
  }
  subscribe() {
    return (
      (this.publisherTail.subscribers += 1),
      new lHn(this, this.publisherTail, this.publisherIndex, !1)
    );
  }
}