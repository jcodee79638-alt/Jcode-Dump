
class Y0n {
  gen;
  threads = [];
  match = !1;
  runs = [];
  ids = [];
  constructor(e) {
    this.gen = e;
  }
  get dead() {
    return !this.threads.length && !this.match && !this.runs.length;
  }
}