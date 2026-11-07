
class vrn {
  buckets = [];
  scheduleTask(e, t) {
    let r = this.buckets,
      s = r.length,
      a,
      H = 0;
    for (; H < s; H++) {
      if (r[H][0] > t) break;
      a = r[H];
    }
    if (a && a[0] === t) a[1].push(e);
    else if (H === s) r.push([t, [e]]);
    else r.splice(H, 0, [t, [e]]);
  }
  drain() {
    let e = this.buckets;
    return ((this.buckets = []), e);
  }
}