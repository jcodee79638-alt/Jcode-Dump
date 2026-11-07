
class de {
  static #t = null;
  static #e = "";
  static get workerPort() {
    return this.#t;
  }
  static set workerPort(t) {
    if (!(typeof Worker < "u" && t instanceof Worker) && t !== null)
      throw new Error("Invalid `workerPort` type.");
    this.#t = t;
  }
  static get workerSrc() {
    return this.#e;
  }
  static set workerSrc(t) {
    if (typeof t != "string") throw new Error("Invalid `workerSrc` type.");
    this.#e = t;
  }
}