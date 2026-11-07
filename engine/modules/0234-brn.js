
class brn {
  tasks = new vrn();
  running = void 0;
  setImmediate;
  constructor(e = Trn) {
    this.setImmediate = e;
  }
  scheduleTask(e, t) {
    if ((this.tasks.scheduleTask(e, t), this.running === void 0))
      this.running = this.setImmediate(this.afterScheduled);
  }
  afterScheduled = () => {
    ((this.running = void 0), this.runTasks());
  };
  runTasks() {
    let e = this.tasks.drain();
    for (let t = 0; t < e.length; t++) {
      let r = e[t][1];
      for (let s = 0; s < r.length; s++) r[s]();
    }
  }
  flush() {
    while (this.tasks.buckets.length > 0) {
      if (this.running !== void 0) (this.running(), (this.running = void 0));
      this.runTasks();
    }
  }
}