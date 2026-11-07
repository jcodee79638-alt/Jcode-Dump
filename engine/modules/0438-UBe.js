
class UBe {
  head;
  index;
  remaining;
  buffer;
  constructor(e) {
    ((this.buffer = e), (this.index = e.index), (this.remaining = e.size), (this.head = e.head));
  }
  fastForward() {
    while (this.index < this.buffer.index) ((this.head = this.head.next), this.index++);
  }
  take() {
    if (this.remaining === 0) return;
    else if (this.index < this.buffer.index) this.fastForward();
    this.remaining--;
    let e = this.head.value;
    return ((this.head = this.head.next), e);
  }
  takeN(e) {
    if (this.remaining === 0) return [];
    else if (this.index < this.buffer.index) this.fastForward();
    let t = Math.min(e, this.remaining),
      r = Array(t);
    for (let s = 0; s < t; s++) {
      let a = this.head.value;
      ((this.head = this.head.next), (r[s] = a));
    }
    return ((this.remaining -= t), r);
  }
  takeAll() {
    return this.takeN(this.remaining);
  }
}