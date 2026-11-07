
function fa() {
  for (let e = 0, n = this.length; e < n; ++e) {
    const i = this[e]();
    if (i !== void 0) return i;
  }
}