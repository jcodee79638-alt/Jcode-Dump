
class TP {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid") this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted") this.value = "aborted";
  }
  static mergeArray(e, t) {
    let r = [];
    for (let s of t) {
      if (s.status === "aborted") return wl;
      if (s.status === "dirty") e.dirty();
      r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, t) {
    let r = [];
    for (let s of t) {
      let a = await s.key,
        H = await s.value;
      r.push({ key: a, value: H });
    }
    return TP.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, t) {
    let r = {};
    for (let s of t) {
      let { key: a, value: H } = s;
      if (a.status === "aborted") return wl;
      if (H.status === "aborted") return wl;
      if (a.status === "dirty") e.dirty();
      if (H.status === "dirty") e.dirty();
      if (a.value !== "__proto__" && (typeof H.value < "u" || s.alwaysSet)) r[a.value] = H.value;
    }
    return { status: e.value, value: r };
  }
}