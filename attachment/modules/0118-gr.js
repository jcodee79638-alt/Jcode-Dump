
class gr {
  #t;
  constructor(t) {
    this.#t = t;
  }
  get path() {
    return j.isFloat16ArraySupported ? new Float16Array(this.#t) : new Float32Array(this.#t);
  }
}