
class uYt {
  capacity;
  head = { value: dD, next: null };
  tail = this.head;
  size = 0;
  index = 0;
  constructor(e) {
    this.capacity = e;
  }
  slide() {
    this.index++;
  }
  offer(e) {
    if (
      ((this.tail.value = e),
      (this.tail.next = { value: dD, next: null }),
      (this.tail = this.tail.next),
      this.size === this.capacity)
    )
      this.head = this.head.next;
    else this.size += 1;
  }
  offerAll(e) {
    for (let t of e) this.offer(t);
  }
}