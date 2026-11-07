
class Ccr {
  processors;
  forceFlushTimeoutMillis;
  constructor(e, t) {
    ((this.processors = e), (this.forceFlushTimeoutMillis = t));
  }
  async forceFlush() {
    let e = this.forceFlushTimeoutMillis;
    await Promise.all(this.processors.map((t) => LGn.callWithTimeout(t.forceFlush(), e)));
  }
  onEmit(e, t) {
    this.processors.forEach((r) => r.onEmit(e, t));
  }
  async shutdown() {
    await Promise.all(this.processors.map((e) => e.shutdown()));
  }
}