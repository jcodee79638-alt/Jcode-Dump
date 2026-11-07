
class vr {
  #t = new Map();
  #e = Promise.resolve();
  postMessage(t, e) {
    const s = { data: structuredClone(t, e ? { transfer: e } : null) };
    this.#e.then(() => {
      for (const [i] of this.#t) i.call(this, s);
    });
  }
  addEventListener(t, e, s = null) {
    let i = null;
    if (s?.signal instanceof AbortSignal) {
      const { signal: n } = s;
      if (n.aborted) {
        H("LoopbackPort - cannot use an `aborted` signal.");
        return;
      }
      const r = () => this.removeEventListener(t, e);
      ((i = () => n.removeEventListener("abort", r)), n.addEventListener("abort", r));
    }
    this.#t.set(e, i);
  }
  removeEventListener(t, e) {
    (this.#t.get(e)?.(), this.#t.delete(e));
  }
  terminate() {
    for (const [, t] of this.#t) t?.();
    this.#t.clear();
  }
}