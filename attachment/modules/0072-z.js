
class z {
  static #t = NaN;
  static #e = null;
  static #s = NaN;
  static #i = null;
  static initializeAndAddPointerId(t) {
    (z.#e ||= new Set()).add(t);
  }
  static setPointer(t, e) {
    ((z.#t ||= e), (z.#i ??= t));
  }
  static setTimeStamp(t) {
    z.#s = t;
  }
  static isSamePointerId(t) {
    return z.#t === t;
  }
  static isSamePointerIdOrRemove(t) {
    return z.#t === t ? !0 : (z.#e?.delete(t), !1);
  }
  static isSamePointerType(t) {
    return z.#i === t;
  }
  static isInitializedAndDifferentPointerType(t) {
    return z.#i !== null && !z.isSamePointerType(t);
  }
  static isSameTimeStamp(t) {
    return z.#s === t;
  }
  static isUsingMultiplePointers() {
    return z.#e?.size >= 1;
  }
  static clearPointerType() {
    z.#i = null;
  }
  static clearPointerIds() {
    ((z.#t = NaN), (z.#e = null));
  }
  static clearTimeStamp() {
    z.#s = NaN;
  }
}