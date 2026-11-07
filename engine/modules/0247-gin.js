
class gin {
  currentTimeMillisUnsafe() {
    return Date.now();
  }
  currentTimeMillis = $p(() => this.currentTimeMillisUnsafe());
  currentTimeNanosUnsafe() {
    return TUs();
  }
  currentTimeNanos = $p(() => this.currentTimeNanosUnsafe());
  sleep(e) {
    let t = $E(e);
    if (t <= 0) return P2e;
    return bS((r) => {
      if (t > SUs) return;
      let s = setTimeout(() => r(Lp), t);
      return $p(() => clearTimeout(s));
    });
  }
}