
class Dx {
  fiber;
  immediate;
  interrupted = !1;
  constructor(e, t) {
    this.fiber = e;
    this.immediate = t;
  }
}