
class mye {
  executionMode;
  setImmediate;
  constructor(e = "async", t = Trn) {
    ((this.executionMode = e), (this.setImmediate = t));
  }
  shouldYield(e) {
    return e.currentOpCount >= e.maxOpsBeforeYield;
  }
  makeDispatcher() {
    return new brn(this.setImmediate);
  }
}